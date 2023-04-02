/* jshint devel:true, sub:true, esversion: 6 */
/**
 * Ad Manager
 *
 * This file contains code used to deal with ads on the page
 *
 * @author Regina
 * @requires  jQuery
 */
(function (contextScope) {
  // There needs to be ad settings on the page if we will be displaying ads
  // at all
  // We're not using Phoenix.hasAds here because that would make the logic to
  // see if we have ads on the page too long.  Also, this needs to work on
  // GameFAQs as is, without any Phoenix level helper js.
  if (!document.getElementById('ad-settings')) {
    return;
  }

  /***************************************************************************
     * Localized vars from global
     **************************************************************************/
  /**
     * Global jQuery object
     *
     * @type {Object}
     */
  const $ = contextScope.$;

  /**
     * What we will feeding logs to
     *
     * @type {Function}
     */
  const debugLog = contextScope.siteAdsDebugLog || function () {};

  /**
     * Global Phoenix reference
     *
     * @type {Object}
     */
  const Phoenix = contextScope.Phoenix;

  /**
     * Global Phoenix Events reference
     *
     * @type {Object}
     */
  const PhoenixEvents = Phoenix && Phoenix.Events ? Phoenix.Events : null;

  /**
     * Global PhoenixLoader reference
     *
     * @type {Object}
     */
  const PhoenixLoader = contextScope.PhoenixLoader;

  /***************************************************************************
     * Variables
     **************************************************************************/
  /**
     * Constants
     **************************************************************************/
  /**
     * Ad block detection element
     *
     * @type {Object} jQuery object containing ad block status
     */
  const $adblockDetectionLoader = $('#xdetstatus');

  /**
     * Keeps track of whether ad refreshes are allowed for the ad context
     *
     * @type {Object}
     */
  const adRefreshAllowed = {};

  /**
     * Ad refresh blackout duration.  An ad refresh is used to request new ads
     * for the page. This blackout duration determines how much time must elapse
     * before the code will allow another refresh.
     *
     * @type {Number}
     * @private
     */
  const adRefreshBlackoutDuration = 5000;

  /**
     * Keep track of ad settings for all ad contexts
     *
     * @type {Object}
     */
  const adSettings = {};

  /**
     * Attribute that we will be using to retrieve ad settings
     *
     * @type {String}
     */
  const adSettingsAttribute = 'data-settings';

  /**
     * Keep track of ad slots ids for all ad contexts
     *
     * This will contain a map of each adContext to an array of ad slot ids
     *
     * @type {Object}
     */
  const adSlotIds = {};

  /**
     * Keep track of how many ads for each ad context have rendered
     *
     * @type {Object}
     */
  const adSlotsRendered = {};

  /**
     * Attribute that holds ad type value
     *
     * @type {String}
     */
  const adTypeAttribute = 'data-ad-type';

  /**
     * Keep track of how many of each ad type is on the page.  Used for making
     * sure the ad divs have unique div ids.
     *
     * @type {Object}
     */
  const adTypeCounts = {};

  /**
     * Keep track of all ad divs on the page keyed by adSlotId.
     *
     * One ad unit consists of the following:
     * - el: the main ad div that contains the ad
     * - type: the ad type that this ad div contains
     * - wrapper: the site element that contains the ad div for site styles
     * - context: the adContext that the ad div belongs to
     *
     * @type {Object}
     */
  const adUnits = {};

  /**
     * Default ad context when for the page
     *
     * @type {String}
     */
  const defaultAdContext = 'pageLoad';

  /**
     * Default ad settings element id
     *
     * @type {String}
     */
  const defaultAdSettingsId = 'ad-settings';

  /**
     * Reference to document body element
     *
     * @type {Element}
     */
  const docBody = document.body;

  /**
     * Keep track of when we are allowed to refresh ads again for the context
     *
     * @type {Object}
     */
  const reenableRefreshTimeouts = {};

  /**
     * States
     **************************************************************************/
  /**
     * Keep track of whether the user is using an adblocker or not. True means
     * user is blocking ads.  False means user is not blocking ads.
     *
     * Defaults to false.
     *
     * @type {Boolean}
     */
  let isGuilty = false;

  /**
     * Keep track of whether the initial page load has completed yet.
     *
     * Defaults to true.  Gets set to false after initial page load is done.
     *
     * @type {Boolean}
     */
  let isInitialPageLoad = true;

  /**
     * Keeps track of whether the page needs event listeners or not.
     *
     * Defaults to false.  Gets set to true when we process ad divs on the page
     * and we detect that there are ads for ad contexts that are not the
     * default ad context.
     *
     * @type {Boolean}
     */
  let needsPageEventListeners = false;

  /***************************************************************************
     * Ad Methods
     **************************************************************************/
  /**
     * JS to load ads.  Waits for bidbarrel to be ready before we request ads.
     *
     * @param  {String} adContext Context of ads being loaded
     *
     * @private
     * @function
     */
  const loadAds = function (adContext) {
    try {
      waitForBidBarrel(function () {
        // adRefreshAllowed for the adContext will be undefined if we
        // have never requested ads for the adContext before.
        // adRefreshAllowed for the adContext gets set to false when we
        // request ads for the adContext and will be set to true once
        // all ads for the adContext have rendered and we are past the
        // blackout timer.
        // We don't want ads to get interupted before they can render
        if (adRefreshAllowed[adContext] === false) {
          return;
        }

        const adSlotIdsForAdContext = getAdSlotIds(adContext);
        const BidBarrel = window.BidBarrel;

        if (!isInitialPageLoad) {
          BidBarrel.resetTargeting(null, null, true);
          BidBarrel.resetTargeting(null, adSlotIdsForAdContext, true);
          BidBarrel.setConfig(getBidBarrelConfig(adContext));
        }

        isInitialPageLoad = false;

        // No ads to load
        if (!Array.isArray(adSlotIdsForAdContext)) {
          debugLog('No ads to load for [' + adContext + ']');
          return;
        }

        triggerAdEvent('pre_ad_refresh', {
          adSlotIdsForAdContext,
          adUnits,
          bidbarrelAdUnits: BidBarrel.UNITS
        });

        adSlotsRendered[adContext] = 0;

        // Disable ad refresh until all ads for this adContext have
        // rendered
        toggleAdRefreshable(adContext, false);

        debugLog('REQUEST ads: [' + adSlotIdsForAdContext.join(', ') + ']');

        BidBarrel.auction(getAuctionConfig(adContext, adSlotIdsForAdContext));

        triggerAdEvent('ad_refresh', {
          adSlotIdsForAdContext
        });
      });
    } catch (e) {
      debugLog('error', 'Failed to load ads');
    }
  };

  /**
     * Check for a geo cookie from instart logic if we have one send it to the
     * googletag
     *
     * @private
     * @function
     */
  const checkInstartGeoCookie = function () {
    if (!$ || !$.cookie) {
      return;
    }

    const ilgeo = $.cookie('il_geo');

    if (ilgeo && typeof googletag !== 'undefined') {
      const geoData = JSON.parse(ilgeo);

      if (geoData.postal_code && geoData.country_code) {
        const location = geoData.postal_code + ',' + geoData.country_code;
        queueGoogleTagCall(function () {
          window.googletag.pubads().setLocation(location);
        });
      }
    }
  };

  /**
     * Queue any GPT method calls in both GPT's queue manager as well as
     * BidBarrel's queue manager to ensure that the calls are fired in the
     * correct order and only after both ad libraries are fully initialized.
     *
     * @param  {Function} callback GPT method
     *
     * @private
     * @function
     */
  const queueGoogleTagCall = function (callback) {
    waitForBidBarrel(function () {
      window.googletag.cmd.push(function () {
        callback();
      });
    });
  };

  /**
     * Code to remove ads.
     *
     * @param  {String}  adContext     Context of ads being removed
     * @param  {Boolean} isDestructive Whether the units should be permanently
     *                                 destroyed or merely cleared (and thus
     *                                 still refreshable)
     *
     * @private
     * @function
     */
  const removeAds = function (adContext, isDestructive) {
    try {
      waitForBidBarrel(function () {
        const adSlotIdsForAdContext = getAdSlotIds(adContext);
        const BidBarrel = window.BidBarrel;

        if (isDestructive) {
          if (!adContext) {
            debugLog('Page is requesting to permanently destroy ALL ad units');
            BidBarrel.destroyAllSlots();
          } else {
            debugLog('Page is requesting to permanently destroy select ad units:', adSlotIdsForAdContext);
            BidBarrel.destroySlots(adSlotIdsForAdContext);
          }
        } else {
          debugLog('Page is requesting to clear select ad units:', adSlotIdsForAdContext);
          BidBarrel.clearSlots(adSlotIdsForAdContext);
        }
      });
    } catch (e) {
      debugLog('error', 'Failed to remove ads');
    }
  };

  /**
     * Enable/disable ad refresh.
     *
     * If true is passed in for the enable parameter, ad refresh will be
     * re-enabled using setTimeout with a delay of adRefreshBlackoutDuration.
     *
     * If false is passed in for the enable parameter, ad refresh will be
     * disabled immediately.
     *
     * @param {String}  adContext Context of ad refresh
     * @param {Boolean} enable True to enable, false to disable
     *
     * @private
     * @function
     */
  const toggleAdRefreshable = (function () {
    /**
         * Helper method used only by toggleAdRefreshable that clears timeout
         * id for timeout object passed in
         *
         * @param  {Object} timeout Object containing timeout id to clear
         *
         * @private
         * @function
         */
    const clearAdRefreshableTimeoutId = function (timeout) {
      if (timeout) {
        clearTimeout(timeout.id);
        timeout.id = null;
      }
    };

    /**
         * @function toggleAdREfreshable
         */
    return function (adContext, enable) {
      if (!adContext) {
        adContext = defaultAdContext;
      }

      let refreshAllowed = adRefreshAllowed[adContext];
      let timeout = reenableRefreshTimeouts[adContext];

      // If we want to allow ads to be refreshed for the adContext and ad
      // refreshing is currently disabled
      if (enable === true && refreshAllowed !== enable) {
        if (timeout && timeout.id !== null) {
          debugLog('Refresh will be re-enabled for [' + adContext + '] in ' + (timeout.start + adRefreshBlackoutDuration - Date.now()) + ' milliseconds');
          // we already set a timeout to re-enable ad refresh
          return;
        }

        debugLog('RE-ENABLE REFRESH for [' + adContext + '] in ' + adRefreshBlackoutDuration + ' milliseconds');

        timeout = {
          id: null,
          start: Date.now()
        };

        timeout.id = setTimeout(
          function () {
            debugLog('RE-ENABLE REFRESH for [' + adContext + '] now');
            adRefreshAllowed[adContext] = true;
            clearAdRefreshableTimeoutId(timeout);
          },
          adRefreshBlackoutDuration
        );
      } else {
        if (enable === true) {
          clearAdRefreshableTimeoutId(timeout);
        }

        refreshAllowed = enable;
      }

      adRefreshAllowed[adContext] = refreshAllowed;
      reenableRefreshTimeouts[adContext] = timeout;
    };
  })();

  /***************************************************************************
     * Ad Div Methods
     **************************************************************************/
  /**
     * Returns a string that will be used as the div id of an adDiv based on
     * the adType passed in and how many of that adType already exists
     *
     * @param  {String} adType      Type of ad
     * @param  {Number} adTypeCount How many of the ad type exists
     *
     * @returns {String}
     *
     * @private
     * @function
     */
  const generateAdDivId = function (adType, adTypeCount) {
    let adDivId = adType;

    if (adTypeCount > 1) {
      adDivId = adType + '-' + adTypeCount;
    }

    debugLog('Generate ad div id: ', adDivId);

    return adDivId;
  };

  /**
     * Process all ad divs on the page and make sure they have ad ids.
     *
     * @param  {Element} [adContextElement] Optional context element used to
     *                                      look for ad divs
     * @private
     * @function
     */
  const processAdDivs = (function () {
    /**
         * Ad event data attribute.  Used for ads that only appear when a
         * specified context event is requested.
         *
         * @type {String}
         * @private
         */
    const adContextAttribute = 'data-ad-event';

    /**
         * Get ad slot event from ad div element
         *
         * @param {Element} adDiv Ad div html element
         *
         * @returns {String}
         *
         * @private
         * @function
         */
    const getAdContext = function (adDiv) {
      let adContext;

      if (adDiv.hasAttribute(adContextAttribute)) {
        adContext = adDiv.getAttribute(adContextAttribute);
      } else {
        adContext = defaultAdContext;
      }

      return adContext;
    };

    /**
         * @function processAdDivs
         */
    return function (adContext, adContextElement) {
      if (!adContextElement) {
        adContextElement = document.body;
      }

      triggerAdEvent('process_ad_divs', {
        adContextElement
      });

      const adDivWrappers = adContextElement.querySelectorAll('.js-mapped-ad');

      if (adDivWrappers.length < 1) {
        return;
      }

      for (let i = 0; i < adDivWrappers.length; i++) {
        const adDivWrapper = adDivWrappers[i];
        const adDiv = adDivWrapper.firstElementChild;

        // Ignore adDiv if it already has an id (already processed)
        // or if the adDivWrapper doesn't have an ad type defined
        if (adDiv.id ||
                    !adDivWrapper.hasAttribute(adTypeAttribute) ||
                    !adDivWrapper.getAttribute(adTypeAttribute)
        ) {
          continue;
        }

        const adType = adDivWrapper.getAttribute(adTypeAttribute);

        const adTypeCount = getAdTypeCount(adType, true);

        const adDivId = generateAdDivId(adType, adTypeCount);

        adDiv.id = adDivId;

        let adDivAdContext = adContext;

        if (!adDivAdContext) {
          adDivAdContext = getAdContext(adDiv);
        }

        let adSlotIdsForAdContext = adSlotIds[adDivAdContext];

        // Initialize ad slots for context array if it doesn't exist
        if (!adSlotIdsForAdContext) {
          adSlotIds[adDivAdContext] = adSlotIdsForAdContext = [];

          // We need to ad page event listeners to handle the
          // adContext if it's not the defaultAdContext
          if (!needsPageEventListeners && adDivAdContext !== defaultAdContext) {
            needsPageEventListeners = true;
          }
        }

        adSlotIdsForAdContext.push(adDivId);

        adUnits[adDivId] = {
          el: adDiv,
          type: adType,
          instanceNumber: adTypeCount,
          wrapper: adDivWrapper,
          context: adDivAdContext
        };

        debugLog('Processed ad div: ', adUnits[adDivId]);
      }
    };
  })();

  /***************************************************************************
     * Ad Event Methods
     **************************************************************************/
  /**
     * Trigger ad events so that if there is JS outside of this file that need
     * to know when specific ad events have happened, they can add event
     * listeners and handle the events on their own outside of this file.
     *
     * @param {String|Event} eventType Event type string or Event object
     * @param {Object} [extraParameters] extraParameters to pass to trigger
     *
     * @private
     * @function
     */
  const triggerAdEvent = function (eventType, extraParameters) {
    // make sure we have the element we want to trigger our ad event on
    // before we actually trigger the event
    if (PhoenixEvents) {
      PhoenixEvents.trigger(eventType, extraParameters);
    }
  };

  /***************************************************************************
     * BidBarrel Ad Event Handlers
     **************************************************************************/
  /**
     * Handles when an ad requested by bidbarrel loads.  This happens after the
     * ad render event.
     *
     * @param  {Object} unitConfig  BidBarrel unit config
     * @param  {Object} gptEventObj GPT event object
     *
     * @private
     * @function
     */
  const bidBarrelAdLoadedHandler = function (unitConfig, gptEventObj) {
    const adDivId = unitConfig.code;

    const adUnit = adUnits[adDivId];

    // Trigger an ad_load event for the adDivId
    triggerAdEvent('ad_load_' + adDivId, {
      adData: {
        adEvent: adUnit.context,
        divId: adDivId
      },
      adUnit,
      bbUnitConfig: unitConfig,
      gptEventObj
    });
  };

  /**
     * Handles when an ad requested by bidbarrel renders.  This happens before
     * the ad load event.
     *
     * @param  {Object} unitConfig  BidBarrel unit config
     * @param  {Object} gptEventObj GPT event object
     *
     * @private
     * @function
     */
  const bidBarrelAdRenderedHandler = function (unitConfig, gptEventObj) {
    const adDivId = unitConfig.code;

    const adUnit = adUnits[adDivId];

    // Scheduled blank ads won't have isEmpty, but will style display none
    // on the ad element, so we need to check if the ad element has this
    // style to consider it blank
    const isBlank = adUnit.el.style.display === 'none' || adUnit.el.style.height.indexOf('0') === 0;

    const adData = {
      adEvent: adUnit.context,
      divId: adDivId,
      isBlank: isBlank || gptEventObj.isEmpty,
      isBlocked: isGuilty,
      adUnit
    };

    const adEventParameters = {
      adData,
      bbUnitConfig: unitConfig,
      gptEventObj
    };

    triggerAdEvent('ad_rendered', adEventParameters);
    triggerAdEvent('ad_rendered_' + adUnit.type, adEventParameters);

    const adContext = adUnit.context;

    adSlotsRendered[adContext]++;

    // All ads for the adContext have rendered, let's enable ad refreshes
    if (adSlotsRendered[adContext] === adSlotIds[adContext].length) {
      toggleAdRefreshable(adContext, true);
    }
  };

  /**
     * Initialize BidBarrel events
     *
     * @private
     * @function
     */
  const initBidBarrelEvents = function () {
    const BidBarrel = window.BidBarrel;

    BidBarrel.on('rendered', bidBarrelAdRenderedHandler);
    BidBarrel.on('loaded', bidBarrelAdLoadedHandler);
  };

  /**
     * NOTE: All public methods should have their contents wrapped by this
     * method to avoid potential race conditions.
     *
     * BidBarrel utilizes a queuing system to ensure that any calls to its
     * service occur after the framework has fully loaded.
     *
     * @param {function} callback
     *
     * @private
     * @function
     */
  const waitForBidBarrel = function (callback) {
    window.BidBarrel.queue.push(function (resolve) {
      callback();
      resolve();
    });
  };

  /***************************************************************************
     * Getter Methods
     **************************************************************************/
  /**
     * Returns ad settings for the adContext passed in.
     *
     * @param  {String} adContext Context to get settings for
     *
     * @returns {Object}
     *
     * @private
     * @function
     */
  const getAdSettings = function (adContext) {
    let adSettingsElement,
      adSettingsElementId,
      adContextSettings;

    if (!adContext) {
      adContext = defaultAdContext;
    }

    if (adContext === defaultAdContext) {
      adSettingsElementId = defaultAdSettingsId;
    } else {
      adSettingsElementId = adContext + '-' + defaultAdSettingsId;
    }

    adContextSettings = adSettings[adContext];

    // If there are no settings for the adContext passed in, check the DOM
    // to see if there is a meta element containing ad settings for the
    // adContext
    if (undefined === adContextSettings) {
      adSettingsElement = document.getElementById(adSettingsElementId);

      // No meta element
      if (!adSettingsElement || !adSettingsElement.hasAttribute(adSettingsAttribute)) {
        adContextSettings = {};
      } else {
        // Check if we have ad settings stored in the meta element
        try {
          adContextSettings = JSON.parse(adSettingsElement.getAttribute(adSettingsAttribute));
        } catch (e) {
          adContextSettings = {};
        }
      }

      setAdSettings(adContext, adContextSettings);
    }

    return adContextSettings;
  };

  /**
     * Gets array of ad slot ids for adContext passed in.  Returns undefined
     * if there are no ad slot ids for the adContext passed in.
     *
     * @param  {String} adContext Context to get ad slot ids for
     * @return {Array|undefined}
     *
     * @private
     * @function
     */
  const getAdSlotIds = function (adContext) {
    if (!adContext) {
      adContext = defaultAdContext;
    }

    return adSlotIds[adContext];
  };

  /**
     * Returns adSlot config from BidBarrel for the adType passed in
     *
     * @param  {String} adType Ad type
     * @return {Object}
     *
     * @private
     * @function
     */
  const getAdSlotConfig = function (adType) {
    const BidBarrel = window.BidBarrel;
    const bidBarrelAdUnitConfig = BidBarrel && BidBarrel.UNITS && BidBarrel.UNITS[adType] ? BidBarrel.UNITS[adType] : {};

    return bidBarrelAdUnitConfig;
  };

  /**
     * Returns the ad slot targeting for the adContext and adType passed in
     *
     * @param  {String} adContext Context for ad type
     * @param  {Object} adUnit Ad unit to get targeting for
     *
     * @return {Object}
     *
     * @private
     * @function
     */
  const getAdSlotTargeting = function (adContext, adUnit) {
    const adContextSettings = getAdSettings(adContext);
    const adType = adUnit.type;
    const bidBarrelAdUnitConfig = getAdSlotConfig(adType);

    const adSlotTargeting = Object.assign({}, bidBarrelAdUnitConfig.targeting);

    if (adType && adContextSettings && adContextSettings.mapped_units) {
      // Get the ad unit's targeting set via the AdService.
      const siteAdUnitConfig = adContextSettings.mapped_units[adType];

      // Override with site config targeting
      if (siteAdUnitConfig && siteAdUnitConfig.target) {
        Object.assign(adSlotTargeting, siteAdUnitConfig.target);
      }
    }

    if (!isNaN(adSlotTargeting.pos)) {
      adSlotTargeting.pos = parseInt(adSlotTargeting.pos);
    }

    // Update incremental ad unit pos with numeric value
    if (bidBarrelAdUnitConfig.incremental && (adSlotTargeting.pos === 'inc' || adSlotTargeting.pos === 1)) {
      adSlotTargeting.pos = adUnit.instanceNumber;
    }

    return adSlotTargeting;
  };

  /**
     * Returns the count of the adType passed in.
     *
     * If increment is true, we will increment the count for the adType before
     * return the count.
     *
     * @param  {String} adType    TYpe of ad to return count for
     * @param  {Boolean} increment True to increment count
     *
     * @return {Number}
     *
     * @private
     * @function
     */
  const getAdTypeCount = function (adType, increment) {
    let adTypeCount = adTypeCounts[adType];

    if (undefined === adTypeCount) {
      adTypeCount = 0;
    }

    if (increment) {
      adTypeCount = adTypeCount + 1;
      adTypeCounts[adType] = adTypeCount;
    }

    return adTypeCount;
  };

  /**
     * Generates the auction config object for the ad context and list of
     * adSlotIds passed in.
     *
     * @param  {String} adContext             Context for ads
     * @param  {Array} adSlotIdsForAdContext  Ad slot ids to auction
     *
     * @return {Object}
     *
     * @private
     * @function
     */
  const getAuctionConfig = function (adContext, adSlotIdsForAdContext) {
    const auctionConfig = [];

    adSlotIdsForAdContext.forEach(function (adDivId) {
      const adUnit = adUnits[adDivId];
      const adType = adUnit.type;
      const instanceNumber = adUnit.instanceNumber;
      const adSlotTargeting = getAdSlotTargeting(adContext, adUnit);
      const BidBarrel = window.BidBarrel;

      if (BidBarrel.adUnitsObj && BidBarrel.adUnitsObj[adType] && BidBarrel.adUnitsObj[adType].incremental && instanceNumber) {
        // BidBarrel does not properly support setTargeting on incremental ad units; targeting must be set alternatively.
        auctionConfig.push([adType, instanceNumber, adSlotTargeting]);
      } else {
        auctionConfig.push(adType);

        debugLog('SET SLOT [' + adDivId + '] TARGETING: ', JSON.stringify(adSlotTargeting));

        BidBarrel.setTargeting(adSlotTargeting, adDivId);
      }
    });

    debugLog('Auction config: ', auctionConfig);

    return auctionConfig;
  };

  /**
     * Creates BidBarrel config for adContext passed in.
     *
     * @param  {String} adContext Ad context to get config for
     *
     * @return {Object}
     *
     * @private
     * @function
     */
  const getBidBarrelConfig = function (adContext) {
    const bidBarrelConfigForContext = {
      dfpPath: getDfpPath(adContext),
      generateIncrementalUnitCode: generateAdDivId,
      pageTargeting: getPageTargeting(adContext),
      targeting: {
        auto: true,
        cookie: {
          consolidate: true
        }
      }
    };

    debugLog('BidBarrel config for [' + adContext + ']: ', bidBarrelConfigForContext);

    return bidBarrelConfigForContext;
  };

  /**
     * Returns campaignParams for campaign. Campaign params usually come from
     * things like newsletters or links from third-party sites like faceboook.
     *
     * Campaign params will be null if there were no campaign params or
     * Phoenix.CampaignParams does not exist.
     *
     * @requires Phoenix.CampaignParams
     *
     * @param {Object} [targetParams] Optional targeting params to extend
     *
     * @returns {Object|null}
     *
     * @private
     * @function
     */
  const getCampaignParams = function () {
    /**
         * List of campaign params to manually pass to ad targeting.
         * BidBarrel autotargeting gets ftag and ttag already.
         *
         * - vndid - This is used to track audience acquisition efforts
         */
    if (Phoenix && Phoenix.CampaignParams && typeof Phoenix.CampaignParams.getParams === 'function') {
      return Phoenix.CampaignParams.getParams({
        queryParamKeys: ['vndid']
      });
    }

    return null;
  };

  /**
     * Returns dfp path for adContext
     *
     * @param  {String} adContext Ad context to get dfp path for
     *
     * @return {String}
     *
     * @private
     * @function
     */
  const getDfpPath = function (adContext) {
    const adContextSettings = getAdSettings(adContext);

    let dfpPath = adContextSettings.unit_name;

    // Get dfp path from default ad context if the current ad context
    // isn't the default ad context and the current ad context doesn't have
    // the dfp path defined
    if (!dfpPath && adContext !== defaultAdContext) {
      const defaultAdContextSettings = getAdSettings(defaultAdContext);

      dfpPath = adContextSettings.unit_name = defaultAdContextSettings.unit_name;
    }

    return dfpPath;
  };

  /**
     * Returns an object containing targeting
     *
     * @return {Object}
     *
     * @private
     * @function
     */
  const getTargetingOverrides = function () {
    const customOverrides = {
      vguid: getViewGuid(),
      st: isGuilty ? '1' : '0'
    };

    return Object.assign(
      {},
      getCampaignParams(),
      customOverrides
    );
  };

  /**
     * Returns page targeting for the adContext passed in
     *
     * @param  {String} adContext Ad context to get page targeting for
     *
     * @return {Object}
     *
     * @private
     * @function
     */
  const getPageTargeting = function (adContext) {
    const adContextSettings = getAdSettings(adContext);
    const targetingOverrides = getTargetingOverrides();

    let adContextTargeting = adContextSettings.target_params;

    // Get targeting from default ad context if the current ad context
    // isn't the default ad context and the current ad context doesn't have
    // the targeting defined
    if (!adContextTargeting && adContext !== defaultAdContext) {
      const defaultAdContextSettings = getAdSettings(defaultAdContext);
      adContextTargeting = adContextSettings.target_params = defaultAdContextSettings.target_params;
    }

    const pageTargeting = Object.assign(
      {},
      adContextTargeting,
      targetingOverrides
    );

    return pageTargeting;
  };

  /**
     * Get view guid from element on the page so that it matches the same
     * view guid used for tracking.
     *
     * @private
     * @function
     */
  const getViewGuid = function () {
    const el = document.getElementById('view-guid-meta');
    const key = 'content';

    let guid;

    try {
      if (el && el.hasAttribute(key)) {
        guid = el.getAttribute(key);
      }
    } catch (e) {}

    return guid;
  };

  /***************************************************************************
     * Setter Methods
     **************************************************************************/
  /**
     * Stores ad settings for adContext passed in
     *
     * @param {String} adContext         Ad context to store settings for
     * @param {Object} adContextSettings Ad settings to store
     *
     * @private
     * @function
     */
  const setAdSettings = function (adContext, adContextSettings) {
    adSettings[adContext] = adContextSettings;

    debugLog('Storing ad settings for [' + adContext + ']: ', adContextSettings);
  };

  /**
     * Stores ad slot ids for adContext passed in
     *
     * @param {String} adContext             Ad context to store ad slot ids for
     * @param {Array} adSlotIdsForAdContext Ad slot ids to store
     *
     * @private
     * @function
     */
  const setAdSlotIds = function (adContext, adSlotIdsForAdContext) {
    if (!adContext) {
      adContext = defaultAdContext;
    }

    return adSlotIds[adContext];
  };

  /***************************************************************************
     * Page Event Methods
     *
     * These are events that get triggered on the document element for ajax
     * events that need ads to be updated.
     **************************************************************************/
  /**
     * Initialize page event listeners.
     *
     * @requires jQuery
     *
     * @private
     * @function
     */
  const initPageEventListeners = (function () {
    if (!$) {
      return function () {};
    }

    let initialized = false;

    /**
         * This object gets passed to a jQuery .on() method
         *
         * @type {Object}
         */
    const pageEvents = {
      /**
             * Handles normal async page event
             *
             * @param  {Event} e         Event object
             * @param  {string} adContext Ad context for page event
             *
             * @function
             * @private
             */
      on_page_event (e, adContext) {
        if (!adContext) {
          return;
        }

        debugLog('ASYNC AD EVENT [' + adContext + ']');

        loadAds(adContext);
      },
      /**
             * This page event tells our js that the async page event is over
             * for the adContext and that we need to clear out the ads that
             * were requested for the adContext
             *
             * @param  {Event} e         Event object
             * @param  {String} adContext Ad context for page event
             *
             * @function
             * @private
             */
      remove_page_event (e, adContext) {
        if (!adContext) {
          return;
        }

        debugLog('REMOVE AD EVENT [' + adContext + ']');

        removeAds(adContext);

        toggleAdRefreshable(adContext, true);
      },

      /**
             * Handles special async page events that extend an existing
             * adContext and may contain overrides.
             *
             * @param  {Event} e                  Event object
             * @param  {String} adContext          Ad context for page event
             * @param  {Object} adContextOverrides Settings for adContext
             *
             * @private
             * @function
             */
      on_ad_event (e, adContext, adContextOverrides) {
        if (!adContext) {
          return;
        }

        debugLog('ASYNC AD EVENT [' + adContext + ']: ', adContextOverrides);

        if (adContextOverrides.adContextElement) {
          processAdDivs(adContext, adContextOverrides.adContextElement);
        }

        if (adContextOverrides.slotIdsToLoad) {
          setAdSlotIds(adContext, adContextOverrides.slotIdsToLoad);
        }

        // Get adContextSettings
        let adContextSettings;

        if (Object.prototype.hasOwnProperty.call(adSettings, adContext)) {
          adContextSettings = getAdSettings(adContext);
        } else {
          const baseAdContext = adContextOverrides.extendsAdContext || defaultAdContext;

          // make a copy of the settings for the base ad settings and
          // use them for the current ad context
          adContextSettings = Object.assign(
            {},
            getAdSettings(baseAdContext)
          );
        }

        // Only replace the target params object if an object was passed
        if (typeof adContextOverrides.newTargeting === 'object') {
          adContextSettings.target_params = adContextOverrides.newTargeting;
        }

        processAdSlotTargetingOverrides(adContextSettings, adContextOverrides.adSlotTargetingMap);

        setAdSettings(adContext, adContextSettings);

        loadAds(adContext);
      }
    };

    /**
         * Figure out how to override ad slot targeting
         *
         * @param  {Object} adContextSettings  Ad context settings to override
         * @param  {Object} adSlotTargetingMap Used to override targeting
         *
         * @private
         * @function
         */
    const processAdSlotTargetingOverrides = function (adContextSettings, adSlotTargetingMap) {
      if (adSlotTargetingMap) {
        const adSlotsDataForAdContext = adContextSettings.mapped_units;
        const adSlotTypes = Object.keys(adSlotsDataForAdContext);

        for (let i = 0; i < adSlotTypes.length; i++) {
          const adSlotType = adSlotTypes[i];
          const adSlotTargeting = adSlotsDataForAdContext[adSlotType].target;
          let adSlotTargetingOverrides = adSlotTargetingMap[adSlotType];

          if (adSlotTargetingOverrides === undefined) {
            adSlotTargetingOverrides = adSlotTargetingMap.default;
          }

          adSlotsDataForAdContext[adSlotType].target = Object.assign(
            {},
            adSlotTargeting,
            adSlotTargetingOverrides
          );
        }
      }
    };

    /**
         * @function initPageEventListeners
         */
    return function () {
      if (initialized) {
        return;
      }

      initialized = true;

      // Check if we actually need page event listeners
      if (!needsPageEventListeners &&
                !docBody.className.includes('has-page-events')
      ) {
        return;
      }

      // attach page events to document using jQuery
      $(document).on(pageEvents);
    };
  })();

  /***************************************************************************
     * Initialize
     **************************************************************************/
  /**
     * Init Roadblocks
     *
     * This is for keeping track of things that we need to wait for before we
     * can initialize ads on the page.
     *
     * False means we need to wait for the component to be ready before we
     * initialize.
     *
     * True means the component isn't present and therefore we don't need to
     * wait for it before initializing.
     *
     * @type {Object}
     */
  const initRoadblocksReady = {
    PhoenixLoader: !PhoenixLoader,
    xdetstatus: !($adblockDetectionLoader && $adblockDetectionLoader.length)
  };

  let adsInitialized = false;

  /**
     * Initialize ads manager
     *
     * @private
     * @function
     */
  const initialize = function () {
    if (adsInitialized || !isReadyToInit()) {
      return;
    }

    debugLog('Initializing ad manager w/ bidbarrel');

    adsInitialized = true;

    if (!window.BidBarrel) {
      window.BidBarrel = {};
      window.BidBarrel.queue = [];
    }

    processAdDivs();

    triggerAdEvent('page_load_ad_divs_processed', {
      adContextSettings: getAdSettings(),
      adUnits
    });

    waitForBidBarrel(function () {
      window.BidBarrel.initialize(getBidBarrelConfig(defaultAdContext));

      initBidBarrelEvents();

      checkInstartGeoCookie();

      loadAds(defaultAdContext);

      // set up event listeners
      initPageEventListeners();

      // We are done now
      triggerAdEvent('ads_initialized');
    });
  };

  /**
     * Check if we are ready to initialize before
     *
     * @returns {Boolean} Returns true if we are ready, false otherwise
     *
     * @private
     * @function
     */
  const isReadyToInit = function () {
    let roadblockValues;

    if (Object.values) {
      roadblockValues = Object.values(initRoadblocksReady);
    } else {
      roadblockValues = [];
      for (const prop in initRoadblocksReady) {
        if (Object.prototype.hasOwnProperty.call(initRoadblocksReady, prop)) {
          roadblockValues.push(initRoadblocksReady[prop]);
        }
      }
    }

    // There are no roadblocks, ready to init!
    if (roadblockValues.length < 1) {
      return true;
    }

    // All roadblocks ready, init!
    return roadblockValues.every(function (value) {
      return value === true;
    });
  };

  /**
     * Init blocker - PhoenixLoader
     *
     * If PhoenixLoader exists, we need to wrap the initialize in the
     * gdprConsentCallback method for GDPR.
     *
     * @param  {Object} PhoenixLoader GDPR handler
     */
  if (initRoadblocksReady.PhoenixLoader === false) {
    PhoenixLoader.gdprConsentCallback('bidbarrel', function () {
      // PhoenixLoader is ready
      initRoadblocksReady.PhoenixLoader = true;
      initialize();
    }, null, 'Ads');
  }

  /**
     * Init blocker - xdetstatus (adblock detection)
     *
     * Check for adblock detection depdency.  We have to wait for this to be
     * known before we can initialize ads.
     *
     * @private
     */
  if (initRoadblocksReady.xdetstatus === false) {
    let status = 'unknown';

    const statusDataKey = 'status';

    const statusLoaded = function (adblockStatusDetected) {
      initRoadblocksReady.xdetstatus = true;
      isGuilty = adblockStatusDetected;
      initialize();
    };

    // we have the adblock detection loader, check if its status has
    // been set
    status = $adblockDetectionLoader.data(statusDataKey);

    // If we already have the result, there's no need for an event
    // handler, just send the tracking now
    if (status !== 'unknown') {
      statusLoaded(status);
    } else {
      // ...otherwise put the event handler in.
      $adblockDetectionLoader.one(
        'statusChange',
        function (e) {
          statusLoaded($adblockDetectionLoader.data(statusDataKey));
        }
      );
    }
  }

  /**
     * Fire initialize.  Make sure you add any init blockers above this call.
     */
  initialize();
}(this));
