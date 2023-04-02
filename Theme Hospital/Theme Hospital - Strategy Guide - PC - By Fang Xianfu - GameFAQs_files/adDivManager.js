/*jshint devel:true, sub:true, esversion: 6 */
/**
 * Ad Manager
 *
 * This file contains code used to deal with ads on the page
 *
 * @author Regina
 * @requires  jQuery
 */
;(function (contextScope, $) {
    // There needs to be ad settings on the page if we will be displaying ads
    // at all
    if (!document.getElementById('ad-settings')) {
        return;
    }

    /***************************************************************************
     * Phoenix Events
     *
     * Since we aren't using Phoenix js, let's create a replacement so that we
     * can use events triggered from adManager.js
     **************************************************************************/
    /**
     * Creates a Phoenix object and puts it into the global scope if Phoenix
     * does not already exist.  This is so that adManager can have access to the
     * same Phoenix object.
     *
     * @return {Object}
     */
    const Phoenix = contextScope.Phoenix || function () {};
    if (!contextScope.Phoenix) {
        contextScope.Phoenix = Phoenix;
    }

    /**
     * Creates a jQuery object that can be used to track when adManager triggers
     * ad events if Phoenix and Phoenix.Events does not exist.
     *
     * If Phoenix.Events does not exist and jQuery is not available to create
     * an appropriate substitute, then quit.
     *
     * @requires  jQuery
     *
     * @type {Object|null}
     */
    const PhoenixEvents = Phoenix && Phoenix.Events ? Phoenix.Events : ($ ? $('#ad-settings') : null);
    if (!Phoenix.Events && PhoenixEvents) {
        Phoenix.Events = PhoenixEvents;
    }
    if (!PhoenixEvents) {
        return;
    }

    /***************************************************************************
     * Variables
     **************************************************************************/
    /**
     * Constants
     **************************************************************************/
    /**
     * What we will feeding logs to
     *
     * @return {Function}
     */
    const debugLog = contextScope.siteAdsDebugLog || function () {};


    /***************************************************************************
     * Ad Specific Methods - In Content Skybox Ad Divs
     **************************************************************************/
    /**
     * Check if it was the incontent skybox that loaded or something else
     *
     * @param  {Object} adEventParameters Ad event data
     *
     * @private
     * @function
     */
    const checkForRenderedInContentSkybox = function (adEventParameters) {
        const gptEvent = adEventParameters.gptEventObj;

        // This should never be true, but who knows what craziness can happen
        if (gptEvent.size.length !== 2) {
            return;
        }

        const gptWidth = gptEvent.size[0];
        const gptHeight = gptEvent.size[1];

        if (gptWidth === 5 && gptHeight === 5) {
            adEventParameters.adData.adUnit.wrapper.classList.add('incontent-skybox-loaded');
        }
    };


    /***************************************************************************
     * Ad Event Methods
     **************************************************************************/
    /**
     * Process rendered ads.  Returns true if ad was not blank, false otherwise.
     *
     * @param  {Object} adEventParameters Ad event data
     *
     * @private
     * @function
     */
    const processRenderedAd = function (adEventParameters) {
        const adData = adEventParameters.adData;
        const adDiv = adData.adUnit.el;

        debugLog("Process Rendered [" + adData.divId + "] Ad: ", adEventParameters);

        if (!adData.isBlank && adDiv.className.indexOf('skybox-inContent') >= 0) {
            checkForRenderedInContentSkybox(adEventParameters);
        }
    };


    /***************************************************************************
     * Initialize
     **************************************************************************/
    PhoenixEvents.on({
        // Deal with ads when they render
        ad_rendered: function (e, adEventParameters) {
            processRenderedAd(adEventParameters);
        }
    });

}(this, this.jQuery));
