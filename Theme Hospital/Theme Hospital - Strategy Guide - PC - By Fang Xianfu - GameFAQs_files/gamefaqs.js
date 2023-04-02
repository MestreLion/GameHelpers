var ck_timeout;

function submit_login()
{
	if (!$('#login_email').val())
	{
		$('#login_email').effect('highlight', 1000);
		$('#login_email').focus();
		return false;
	}
	if (!$('#login_password').val())
	{
		$('#login_password').effect('highlight', 1000);
		$('#login_password').focus();
		return false;
	}
	return true;
}


function show_signup(from)
{
	if($(document).width() < 500)
		var box_width = "98%";
	else
		var box_width = "400px";
	$.ajax({
		type: 'GET',
        url: '/ajax/user_signup?from=' + from + '&uri=' + window.location,
        success: function(response)
		{
			if(response=='')
			{
				window.location = ('/user/register');
			}
			else
			{
				$('#site_dialog').html(response);
				$('#site_dialog').dialog({	resizable: false, dialogClass: "reg_dialog", closeText: "X", height: "auto", width: box_width, modal: true, open: function(){$('.ui-widget-overlay').bind('click',function(){$('#site_dialog').dialog('close');$('body').removeClass('modal_active');});$('body').addClass('modal_active');}, close: function(){$('body').removeClass('modal_active');} });
			}
        }

    });
    return false;
}
function show_login()
{
	if($(document).width() < 500)
		var box_width = "98%";
	else
		var box_width = "30%";
	$('#login_dialog').dialog({	resizable: false, dialogClass: "reg_dialog", closeText: "X", height: "auto", width: box_width, modal: true, open: function(){$('.ui-widget-overlay').bind('click',function(){$('#login_dialog').dialog('close');$('body').removeClass('modal_active');});$('body').addClass('modal_active');}, close: function(){$('body').removeClass('modal_active');} });
	return false;
}


function show_topic_flair(bid,tid,mid)
{
	if($(document).width() < 500)
		var box_width = "75%";
	else
		var box_width = "35%";
	$('.flair_dialog').dialog({ resizable: false, dialogClass: "reg_dialog", closeText: "X", height: "auto", width: box_width, modal: true, open: function(){$('.ui-widget-overlay').bind('click',function(){$('.flair_dialog').dialog('close');});} });
	return false;
}

function show_pm_dialog()
{
	$('.pm_dialog input[name="subject"]').val('');
	$('.pm_dialog textarea[name="message"]').val('');

	if($(document).width() < 500)
		var box_width = "75%";
	else
		var box_width = "35%";
	$('.pm_dialog').dialog({ resizable: false, dialogClass: "reg_dialog", closeText: "X", height: "auto", width: box_width, modal: true, open: function(){$('.ui-widget-overlay').bind('click',function(){$('.pm_dialog').dialog('close');});} });
	return false;
}


function track_event(event_id)
{
	if(typeof(om)==='object')
	{
		om.trackEvent(event_id);
		return true;
	}
	if(typeof somni=='undefined')
		return true;
	somni.linkTrackVars=null;
	somni.linkTrackEvents=somni.events="event" + event_id;
	var s_code = somni.tl(this,'o','eventTrack');
	if(s_code)document.write(s_code);
	return true;
}

function pm_click(url, key, user_name)
{
	var newForm = $('<form>', {
		'action': url,
		'method': 'post'
	});
	newForm.append($('<input>', {
		'name': 'key',
		'value': key,
		'type': 'hidden'
	}));
	newForm.append($('<input>', {
		'name': 'to',
		'value': user_name,
		'type': 'hidden'
	}));
	newForm.appendTo( document.body );
    newForm.submit();
}

function clear_all_notifications()
{
	$.ajax({
		type: 'GET',
        url: '/ajax/notification_clear_all',
        success: function(response)
		{
			if(response=='')
			{
				$('#ndrop_span').html('<a class="top_user_icon" href="/user/notifications"><i class="fa fa-bell-o dim" title="No Unread Notifications"></i></a>');
			}
        }
    });
	return false;
}

function clear_all_badge_notifications(user_name)
{
	$.ajax({
		type: 'GET',
        url: '/ajax/badge_notification_clear_all',
        success: function(response)
		{
			if(response=='')
			{
				$('#bndrop_span').html('<a class="top_user_icon" href="/community/'+user_name+'/badges"><i class="fa fa-trophy dim" title="No New Badges"></i></a>');
			}
        }
    });
	return false;
}

function topnav_side_open()
{
	$("#sidenav").addClass("sidenav_open");
	$(".wrapper").append('<div id="fso" class="fs_overlay"></div>');
	$("#fso").click(function() { topnav_side_close();});
}

function topnav_side_close()
{
	$("#sidenav").removeClass("sidenav_open");
	$("#fso").remove();
}

function topnav_show_search()
{
	$('.masthead_search').toggle();
	$('#searchtextbox').focus();
}

function count_chars_uc(field_id, field_name, max_chars, allow_unicode, warning_id)
{
	var check = $('#' + field_id).val().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
	var cnt = check.length;
	if(cnt > max_chars)
	{
		$('#' + warning_id).html('Error: ' + field_name + ' submissions cannot be longer than ' + max_chars + ' characters (currently ' + cnt + ')');
	}
	else if(cnt > (max_chars * 0.8))
	{
		$('#' + warning_id).html('Warning: ' + (max_chars - cnt) + ' characters remaining (maximum ' + max_chars + ')');
	}
	else if(!allow_unicode)
	{
		if($('#' + field_id).val().match(/[\u0100-\u2017\u201E-\uffff]/))
		{
			$('#' + warning_id).html('Warning: Unicode characters are automatically removed from ' + field_name + ' submissions');
		}
	}
	else
	{
		$('#' + warning_id).html('');
	}
}

function ad_report()
{
	var dbg = 'No data available';
	if (storageAvailable('localStorage'))
		if(localStorage.getItem("revdbg")!=null)
			dbg=localStorage.getItem("revdbg");
	var newForm = $('<form>', {
		'action': '/feedback?type=62',
		'method': 'post'
	});
	newForm.append($('<input>', {
		'name': 'pre_message',
		'value': dbg,
		'type': 'hidden'
	}));
	newForm.appendTo( document.body );
	newForm.submit();
}

function toggle_mygames_track(product, track_type, key)
{
	$.ajax({
		type: 'POST',
        url: '/ajax/gamespace_mygames',
        data: { pid: product, type: track_type, key: key },
        success: function(response)
		{
			var d = $.parseJSON(response);
			if(d.error)
				alert(d.error);
			else
			{
				$('#track_' + track_type + ' i').toggleClass('fa-bell').toggleClass('fa-bell-o');
				if($('#gs_noty i').hasClass('fa-bell'))
					$('.gs_hb_notify i').addClass('fa-bell').removeClass('fa-bell-o');
				else
					$('.gs_hb_notify i').addClass('fa-bell-o').removeClass('fa-bell');
			}
        }
    });
	return false;
}

function toggle_mygames_list(product, track_type, set, key)
{
	$.ajax({
		type: 'POST',
        url: '/ajax/gamespace_mygames',
        data: { pid: product, type: track_type, set: set, key: key },
        success: function(response)
		{
			var d = $.parseJSON(response);
			if(d.error)
				alert(d.error);
			else
			{
				$('#mygames_' + track_type + ' i').toggleClass('fa-heart').toggleClass('fa-heart-o');
				if($('#gs_fav i').hasClass('fa-heart'))
					$('.gs_hb_favorite i').addClass('fa-heart').removeClass('fa-heart-o');
				else
					$('.gs_hb_favorite i').addClass('fa-heart-o').removeClass('fa-heart');
			}
        }
    });
	return false;
}

function save_gamespace_notes(product, key)
{
	$.ajax({
		type: 'POST',
        url: '/ajax/gamespace_mygames',
        data: { pid: product, type: 'notes', set: $('#gs_note_text').val(), key: key },
        success: function(response)
		{
			var d = $.parseJSON(response);
			if(d.success)
			{
				$('#note_save').show().html('Notes saved').fadeOut(1500);
				if($('#gs_note_text').val()!='')
					$('.gs_hb_notes i').addClass('fa-pencil-square').removeClass('fa-pencil-square-o');
				else
					$('.gs_hb_notes i').addClass('fa-pencil-square-o').removeClass('fa-pencil-square');
			}
        }
    });
	return false;
}

function toggle_qna_notify(product, question, key)
{
	$.ajax({
		type: 'POST',
        url: '/ajax/qna_notify',
        data: { p: product, q: question, key: key },
        success: function(response)
		{
			if(question)
			{
				if(response==1)
				{
					$('#text_qna_notify').hide().html('You are now tracking this Question').fadeIn(250);
					$('#btn_qna_notify').hide().html('Stop Tracking').fadeIn(250);
				}
				else
				{
					$('#text_qna_notify').hide().html('Let me know when there are new Answers for this Question:').fadeIn(250);
					$('#btn_qna_notify').hide().html('Notify Me').fadeIn(250);
				}
			}
			else
			{
				if(response==1)
				{
					$('#btn_qna_notify').hide().html('&#x2714; Tracking Questions').fadeIn(250);
					$('#qna_track i').addClass('fa-bell').removeClass('fa-bell-o');
				}
				else
				{
					$('#btn_qna_notify').hide().html('Track New Questions').fadeIn(250);
					$('#qna_track i').addClass('fa-bell-o').removeClass('fa-bell');
				}
				if($('#gs_noty i').hasClass('fa-bell'))
					$('.gs_hb_notify i').addClass('fa-bell').removeClass('fa-bell-o');
				else
					$('.gs_hb_notify i').addClass('fa-bell-o').removeClass('fa-bell');

			}
        }
    });
	return false;
}

function toggle_news_notify(game, key)
{
	$.ajax({
		type: 'POST',
        url: '/ajax/news_notify',
        data: { g: game, key: key },
        success: function(response)
		{
			if(response==1)
			{
				$('#btn_news_notify').hide().html('&#x2714; Tracking News').fadeIn(250);
				$('#news_track i').addClass('fa-bell').removeClass('fa-bell-o');
			}
			else if(response==0)
			{
				$('#btn_news_notify').hide().html('Track News').fadeIn(250);
				$('#news_track i').addClass('fa-bell-o').removeClass('fa-bell');
			}
			else
			{
				alert(response);
				return false;
			}
			if($('#gs_noty i').hasClass('fa-bell'))
				$('.gs_hb_notify i').addClass('fa-bell').removeClass('fa-bell-o');
			else
				$('.gs_hb_notify i').addClass('fa-bell-o').removeClass('fa-bell');
        }
    });
	return false;
}

function escape_html(data)
{
    return data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function storageAvailable(type)
{
	try  { var storage = window[type], x = '__storage_test__'; storage.setItem(x, x); storage.removeItem(x); return true; } catch(e) {return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && storage.length !== 0; }
}

function revdbg(e)
{
	if(!e.isEmpty)
	{
		if (storageAvailable('localStorage'))
		{
			var maxPages = 20;
			var dbg = [];
			if(localStorage.getItem("revdbg")!=null) dbg=JSON.parse(localStorage.getItem("revdbg"));
			var adsList=[]; var thisPage=[];
			while(dbg.length>maxPages) dbg.shift();
			if(dbg.length) { if(dbg[dbg.length-1]["v"]==vguid) { thisPage=dbg.pop(); adsList=thisPage.al; }}
			var adinfo=new Object(); adinfo.a=e.advertiserId; adinfo.ca=e.campaignId; adinfo.cr=e.creativeId; adinfo.l=e.lineItemId; adinfo.s=e.size; adinfo.sac=e.sourceAgnosticCreativeId; adinfo.sal=e.sourceAgnosticLineItemId;
			adsList.push(adinfo); dbg.push({"v": vguid, "u":location.pathname, "t":new Date(), "al":adsList});
			//console.log(JSON.stringify(dbg));
			localStorage.setItem("revdbg",JSON.stringify(dbg));
		}
	}
}


if(!$.cookie('spt'))
{
window._sp_ = window._sp_ || {}; window._sp_.config = window._sp_.config || {}; window._sp_.config.account_id = 68;
!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=479)}([function(t,e,n){var r,o;!function(i){"use strict";var u={};u.VERSION="1.3.0";var a,c={},f=function(t,e){return function(){return e.apply(t,arguments)}},s=function(){var t,e,n=arguments,r=n[0];for(e=1;e<n.length;e++)for(t in n[e])t in r||!n[e].hasOwnProperty(t)||(r[t]=n[e][t]);return r},l=function(t,e){return{value:t,name:e}};u.DEBUG=l(1,"DEBUG"),u.INFO=l(2,"INFO"),u.TIME=l(3,"TIME"),u.WARN=l(4,"WARN"),u.ERROR=l(8,"ERROR"),u.OFF=l(99,"OFF");var p=function(t){this.context=t,this.setLevel(t.filterLevel),this.log=this.info};p.prototype={setLevel:function(t){t&&"value"in t&&(this.context.filterLevel=t)},enabledFor:function(t){var e=this.context.filterLevel;return t.value>=e.value},debug:function(){this.invoke(u.DEBUG,arguments)},info:function(){this.invoke(u.INFO,arguments)},warn:function(){this.invoke(u.WARN,arguments)},error:function(){this.invoke(u.ERROR,arguments)},time:function(t){"string"==typeof t&&t.length>0&&this.invoke(u.TIME,[t,"start"])},timeEnd:function(t){"string"==typeof t&&t.length>0&&this.invoke(u.TIME,[t,"end"])},invoke:function(t,e){a&&this.enabledFor(t)&&a(e,s({level:t},this.context))}};var h=new p({filterLevel:u.OFF});!function(){var t=u;t.enabledFor=f(h,h.enabledFor),t.debug=f(h,h.debug),t.time=f(h,h.time),t.timeEnd=f(h,h.timeEnd),t.info=f(h,h.info),t.warn=f(h,h.warn),t.error=f(h,h.error),t.log=t.info}(),u.setHandler=function(t){a=t},u.setLevel=function(t){h.setLevel(t);for(var e in c)c.hasOwnProperty(e)&&c[e].setLevel(t)},u.get=function(t){return c[t]||(c[t]=new p(s({name:t},h.context)))},u.createDefaultHandler=function(t){t=t||{},t.formatter=t.formatter||function(t,e){e.name&&t.unshift("["+e.name+"]")};var e={},n=function(t,e){Function.prototype.apply.call(t,console,e)};return"undefined"==typeof console?function(){}:function(r,o){r=Array.prototype.slice.call(r);var i,a=console.log;o.level===u.TIME?(i=(o.name?"["+o.name+"] ":"")+r[0],"start"===r[1]?console.time?console.time(i):e[i]=(new Date).getTime():console.timeEnd?console.timeEnd(i):n(a,[i+": "+((new Date).getTime()-e[i])+"ms"])):(o.level===u.WARN&&console.warn?a=console.warn:o.level===u.ERROR&&console.error?a=console.error:o.level===u.INFO&&console.info&&(a=console.info),t.formatter(r,o),n(a,r))}},u.useDefaults=function(t){u.setLevel(t&&t.defaultLevel||u.DEBUG),u.setHandler(u.createDefaultHandler(t))},r=u,void 0!==(o="function"==typeof r?r.call(e,n,e,t):r)&&(t.exports=o)}()},function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t){return t instanceof h}function a(t){return t instanceof d}function c(t){return t instanceof _}function f(t){return t instanceof y}function s(t){return t instanceof b}n.d(e,"k",function(){return b}),n.d(e,"g",function(){return v}),n.d(e,"j",function(){return g}),n.d(e,"h",function(){return m}),n.d(e,"i",function(){return E}),n.d(e,"x",function(){return O}),n.d(e,"y",function(){return w}),n.d(e,"w",function(){return S}),n.d(e,"u",function(){return R}),n.d(e,"v",function(){return P}),n.d(e,"r",function(){return j}),n.d(e,"s",function(){return A}),n.d(e,"q",function(){return C}),n.d(e,"t",function(){return x}),n.d(e,"p",function(){return I}),e.l=u,e.m=a,e.n=c,e.d=f,e.o=s,n.d(e,"b",function(){return L}),n.d(e,"c",function(){return B}),n.d(e,"f",function(){return G}),n.d(e,"a",function(){return Y});var l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("detection:test_result:attribute:index"),function(){function t(e){i(this,t),this._str=e}return l(t,[{key:"is",value:function(t){return t.name()===this.name()&&t.toString()===this.toString()}},{key:"name",value:function(){return"at"}},{key:"toString",value:function(){return this._str}}]),t}());e.e=p;var h=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),l(e,[{key:"name",value:function(){return"tat"}}]),e}(p),d=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),l(e,[{key:"name",value:function(){return"teat"}}]),e}(p),_=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),l(e,[{key:"name",value:function(){return"rat"}}]),e}(p),y=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),l(e,[{key:"name",value:function(){return"reat"}}]),e}(p),b=function(t){function e(t,n){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t+"="+n))}return o(e,t),e}(p),v=function(t){function e(t){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"url",t))}return o(e,t),e}(b),g=function(t){function e(t){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"err",t.toString()))}return o(e,t),e}(b),m=function(t){function e(t){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"st",t.toFixed()))}return o(e,t),e}(b),E=function(t){function e(t){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"ts",t.toFixed(3)))}return o(e,t),e}(b),O=function(t){function e(t){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"dom",t))}return o(e,t),e}(b),w=function(t){function e(t){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"ch",t.toString()))}return o(e,t),e}(b),T=function(t){function e(t,n){i(this,e);var o=t?"_"+t:"";return r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"sel"+o,n))}return o(e,t),e}(b),S=function(t){function e(t){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"",t))}return o(e,t),e}(T),R=function(t){function e(t){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"br",t))}return o(e,t),e}(T),P=function(t){function e(t){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"nc",t))}return o(e,t),e}(T),k=function(t){function e(t,n,o){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"net_"+t,JSON.stringify({src:n,tag:o})))}return o(e,t),e}(b),j=function(t){function e(t,n){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"ld",t,n))}return o(e,t),e}(k),A=function(t){function e(t,n){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"err",t,n))}return o(e,t),e}(k),N=function(t){function e(t,n,o,u){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"netr_"+t,JSON.stringify({rule:n,lds:o.map(function(t){return t.toString()}),errs:u.map(function(t){return t.toString()})})))}return o(e,t),e}(b),C=function(t){function e(t,n,o){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"bl",t,n,o))}return o(e,t),e}(N),x=function(t){function e(t,n,o){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"wl",t,n,o))}return o(e,t),e}(N),I=function(t){function e(t,n,o){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"bkrl",JSON.stringify({name:t,bls:n.map(function(t){return t.toString()}),wls:o.map(function(t){return t.toString()})})))}return o(e,t),e}(b),L={},D={INTERFERENCE:"in",DFP_INTERFERENCE:"dfpi",ADBLOCKER:"ad",GENERIC_ADBLOCKER:"gad",STAND_DOWN:"sd",PRIVATE:"pr",RECOVERY_INTERFERENCE:"rin",FSM_DATA:"fda",ACCEPTABLE_AD:"aad"};for(var M in D)L[M]=new h(D[M]);var B={},F={INFERENCE:"inf",NETWORK:"ne",IMAGE:"im",SCRIPT:"sc",IFRAME:"if",ELEMENT:"el",ARTIFACT:"ar",STYLE_SHEET:"ss",STYLE_PROPERTY:"sp",HIDDEN_PROPERTY:"hp",CUSTOM_PROPERTY:"cp",HIDING:"hi",USER_AGENT:"ua",BOT:"bo",PROXY_HOST:"ph",NATIVE_OVERRIDE:"no",FEATURE_ACCESS:"fa",AJAX:"aj",FSM:"fsm",NETWORK_LISTENER:"nel",HIDING_DATA:"hid"};for(var U in F)B[U]=new d(F[U]);var G={},H={NO_LOAD_BLOCK:"nlb",LOAD_BLOCK:"lb",ELEMENT_HIDDEN:"eh",CONTROL_ELEMENT_HIDDEN:"ceh",NO_ELEMENT_HIDDEN:"neh",URL_REWRITTEN:"ur",NO_URL_REWRITTEN:"nur",DATA_URL_REWRITTEN:"dur",NO_ARTIFACT_PRESENT:"nap",ARTIFACT_PRESENT:"ap",NO_STYLE_SHEET_PRESENT:"nssp",STYLE_SHEET_PRESENT:"ssp",NO_STYLE_PROPERTY_PRESENT:"nspp",STYLE_PROPERTY_PRESENT:"spp",NO_HIDDEN_PROPERTY_PRESENT:"nhpp",HIDDEN_PROPERTY_PRESENT:"hpp",NO_CUSTOM_PROPERTY_PRESENT:"ncpp",CUSTOM_PROPERTY_PRESENT:"cpp",TIMEOUT:"to",NO_BOT_USER_AGENT:"nbua",GOOGLE_BOT_USER_AGENT:"gbua",BING_BOT_USER_AGENT:"bbua",NO_PROXY_HOST:"nph",GOOGLE_WEBCACHE_PROXY_HOST:"gwph",NO_NATIVE_OVERRIDE:"nno",SHADOW_ROOT_NATIVE_OVERRIDE:"srno",REQUEST_FILE_SYSTEM_SUCCESS:"rfss",REQUEST_FILE_SYSTEM_ERROR:"rfse",NO_REQUEST_FILE_SYSTEM:"nrfs",INDEXED_DB_OPEN_SUCCESS:"idos",INDEXED_DB_OPEN_ERROR:"idoe",NO_INDEXED_DB:"nid",INDEXED_DB_EXISTS:"ide",LOCAL_STORAGE_SET_SUCCESS:"lsss",LOCAL_STORAGE_SET_ERROR:"lsse",NO_LOCAL_STORAGE:"nls",AJAX_LOAD_BLOCK:"alb",AJAX_LOAD_SUCCESS:"als",AJAX_LOAD_ERROR:"ale",AJAX_OPEN_BLOCK:"aob",AJAX_SEND_BLOCK:"asb",PROTOCOL_MISMATCH:"pm",EXA_BOT_USER_AGENT:"ebua",CANNOT_TEST:"cnt",GOOGLE_WEB_LIGHT_USER_AGENT:"gwl",OPTIMIZELY_PREVIEW_PROXY_HOST:"opph",NO_BLOCKER_RULES:"nbr",BROKEN_ELEMENT_HIDING_RULE:"behr",NO_ELEMENT_HIDING_RULES:"nehr",HIDE_MATCHING_BLACKLIST:"hmbl",NO_MATCHING_BLACKLIST:"nmbl",ERROR_MATCHING_BLACKLIST:"embl",LOAD_MATCHING_BLACKLIST:"lmbl",ERROR_MATCHING_WHITELIST:"emwl",LOAD_MATCHING_WHITELIST:"lmwl",NO_NETWORK_LISTENER_DATA:"nnld",NO_NETWORK_BLOCKING_RULES:"nnbr"};for(var K in H)G[K]=new _(H[K]);var Y={},W={ADBLOCK:"ab",ADBLOCK_PLUS:"abp",ADGUARD:"ag",UBLOCK:"ub",UBLOCK_ORIGIN:"ubo",NATIVE:"na",PRESENT:"pr",NOT_PRESENT:"npr",UNKNOWN_ADBLOCKER:"ua"};for(var V in W)Y[V]=new y(W[V])},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return new(Function.prototype.bind.apply(Error,[null].concat(["Uncaught in promise: "+(null==t?"":t.toString()+t.stack||"")],n)))}function i(t){return new s(function(e,n){t.then(function(t){e(t)},function(t){n(t)})})}Object.defineProperty(e,"__esModule",{value:!0});var u=n(26);n.d(e,"UtilPromise",function(){return s});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(0).get("util:promise"),f=0,s=function(){function t(e){if(r(this,t),this._state=f,this._resolveCallbacks=[],this._rejectCallbacks=[],this._catchListenerAdded=!1,null!=e)try{e(this._resolve.bind(this),this._reject.bind(this))}catch(t){if(t.message&&t.message.match(/^Uncaught in promise: /))throw t;this._reject(t)}}return a(t,null,[{key:"resolve",value:function(e){return new t(function(t){t(e)})}},{key:"reject",value:function(e){return new t(function(t,n){return n(e)})}},{key:"all",value:function(e){var n=this;if(0===e.length)return t.resolve([]);var r=0,o=[];return new t(function(i,u){function a(t,n){o[t]=n,++r===e.length&&i(o)}e.forEach(function(e,r){t.resolve(e).then(a.bind(n,r),u)})})}},{key:"race",value:function(e){return 0===e.length?l:new t(function(t,n){e.forEach(function(e){e.then(t,n)})})}}]),a(t,[{key:"then",value:function(e,n){var r=this;return new t(function(t,o){r._then(function(n){return t(e(n))}),r._catch(function(e){null==n?o(e):t(n(e))})})}},{key:"catch",value:function(t){return this.then(function(t){return t},t)}},{key:"_resolve",value:function(e){if(this._state===f){var n=this._resolve.bind(this),r=this._reject.bind(this);e instanceof t?e.then(n,r):e&&e instanceof Object&&e.then&&"function"==typeof e.then&&e["catch"]&&"function"==typeof e["catch"]?i(e).then(n,r):(this._state=1,this._result=e,this._resolveCallbacks.forEach(function(t){t(e)}),this._clearCallbacks())}}},{key:"_reject",value:function(t){var e=this;this._state===f&&(this._state=2,this._error=t,this._catchListenerAdded?c.debug("caught promise error",t):(c.error("uncaught promise error",t),setTimeout(function(){if(!e._catchListenerAdded)throw o(t)},0)),this._rejectCallbacks.forEach(function(e){e(t)}),this._clearCallbacks())}},{key:"_clearCallbacks",value:function(){this._resolveCallbacks=[],this._rejectCallbacks=[]}},{key:"_then",value:function(t){1===this._state?t(this._result):this._state===f&&this._resolveCallbacks.push(t)}},{key:"_catch",value:function(t){this._catchListenerAdded=!0,2===this._state?t(this._error):this._state===f&&this._rejectCallbacks.push(t)}}]),t}(),l=s.resolve(null),p=n.i(u.a)(window.Promise)?window.Promise:s;e["default"]=p},function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var u=n(2);n.d(e,"a",function(){return p});var a=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=(n(0).get("detection:test"),new Error("not implemented")),s=function(){function t(){var e=this;i(this,t),this.runPromise=new u["default"](function(t){e.resolve=t.bind(e.runPromise)})}return c(t,null,[{key:"getSchema",value:function(){throw f}},{key:"testMethod",value:function(){throw f}},{key:"has",value:function(){var t;return(t=this.getSchema()).has.apply(t,arguments)}}]),c(t,[{key:"waitForResult",value:function(){return this.runPromise}}]),t}(),l=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),c(e,[{key:"run",value:function(){var t,e=this;return u["default"].resolve((t=this.constructor).testMethod.apply(t,arguments)).then(function(t){return e.resolve(t),e.runPromise})}}],[{key:"testMethod",value:function(){throw f}},{key:"bindArgs",value:function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){function n(){return i(this,n),r(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return o(n,t),c(n,null,[{key:"testMethod",value:function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];return a(n.__proto__||Object.getPrototypeOf(n),"testMethod",this).apply(this,e.concat(r))}}]),n}(this)}}]),e}(s);e.b=l;var p=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),c(e,[{key:"run",value:function(t){for(var e,n=this,r=arguments.length,o=Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return u["default"].resolve((e=this.constructor).testMethod.apply(e,[t].concat(o))).then(function(t){return n.resolve(t),n.runPromise})}}],[{key:"findDependency",value:function(){throw f}},{key:"bindArgs",value:function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(t){function n(){return i(this,n),r(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return o(n,t),c(n,null,[{key:"testMethod",value:function(t){for(var r,o=arguments.length,i=Array(o>1?o-1:0),u=1;u<o;u++)i[u-1]=arguments[u];return(r=a(n.__proto__||Object.getPrototypeOf(n),"testMethod",this)).call.apply(r,[this,t].concat(e,i))}}]),n}(this)}}]),e}(s)},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(298),a=n(145),c=n(144),f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=(n(0).get("detection:test_result:schema"),function(t){function e(){var t;r(this,e);for(var i=arguments.length,u=Array(i),a=0;a<i;a++)u[a]=arguments[a];var f=o(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(u))),s=n.i(c.a)(f.attributes);if(0===s.types.length||0===s.tests.length)throw new Error("missing required types or tests from schema");return f}return i(e,t),f(e,[{key:"createResult",value:function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return new(Function.prototype.bind.apply(u.a,[null].concat([this.attributes],e)))}},{key:"addAttribute",value:function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return new(Function.prototype.bind.apply(e,[null].concat([this.attributes],n)))}},{key:"removeAttribute",value:function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];var o=new(Function.prototype.bind.apply(a.a,[null].concat(n)));return new e(this.attributes.filter(function(t){return!o.attributes.some(function(e){return e.is(t)})}))}}]),e}(a.a));e.a=s},function(t,e,n){"use strict";function r(){if(!window._sp_||!window._sp_.config)throw new Error("_sp_.config is not defined");window._sp_.config.hasBeenRead||(n.i(O.a)(["config","hasBeenRead"],!0),n.i(O.a)(["config","has_been_read"],!0)),o.apply(void 0,arguments),a(M)}function o(){B=new E.a(L.getSearchParam()),D=window._sp_.config;for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];M=i(e),u(M)}function i(t){return t.reduce(function(t,e){return b()(t,e),t},{})}function u(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:D,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];Object.keys(e).forEach(function(r){var o=n.concat(r).join(".");if(t[r]){var i=s(e[r],t[r]);if(t[r].type!==(void 0===i?"undefined":T(i)))throw new Error("invalid value: '"+JSON.stringify(i)+"' for option: '"+o+"' expected: '"+t[r].type+"'");if(t[r].validation&&!t[r].validation(i)){var a=t[r].validationMessage||"";throw new Error("invalid value: '"+JSON.stringify(i)+"' for option: '"+o+"' "+a)}t[r].keys&&u(t[r].keys,i,n.concat(r))}}),Object.keys(t).forEach(function(e){var r=n.concat(e).join(".");if(t[e].required&&!D.hasOwnProperty(e))throw new Error("required option: '"+r+"' not specified in config")})}function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:D,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];Object.keys(e).forEach(function(r){var o=n.concat(r).join(".");if(!t.hasOwnProperty(r))throw new Error("invalid option: '"+o+"' valid keys are: '"+JSON.stringify(Object.keys(t).map(function(t){return n.concat(t).join(".")}))+"'");t[r].keys&&a(t[r].keys,e[r],n.concat(r))})}function c(t){return"config value: "+JSON.stringify([].concat(t))+" does not exist in spec"}function f(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:D,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:M,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=void 0,i=[];if(Array.isArray(t)?(o=t[0],i=t.slice(1)):o=t,!n)throw new Error('config value: "'+o+'" fetched before initialization');if(!n[o])throw new Error(c(r.concat(t)));var u=void 0;e&&e.hasOwnProperty(o)&&(u=e[o]);var a=n[o],l=a.keys;if(i.length>0)return f(i,u,l,r.concat(o));if(l){var p={};for(var h in l)p[h]=f(h,u,l,r.concat(o));return p}if(a.mapQueryParam){var d=r.concat(o).join("_"),_=B.getSearchParam("_sp_"+d);if(_){var y=a.mapQueryParam(_);if(void 0!==y)return s(y,a)}}if(void 0!==u)return s(u,a);var b=a.fallback?a.fallback():null;return null!=b?s(b,a):s(a["default"],a)}function s(t,e){return e.mapConfigParam?e.mapConfigParam(t):t}function l(t){var e=void 0;try{e=f(t)}catch(e){if(e.message.indexOf(c(t))>-1)return!1;throw e}return void 0!==e}function p(){return Object.keys(M)}function h(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];var r=e.reduce(function(t,e){return Object.keys(e).forEach(function(n){t[n]=f(n,D,e)}),t},{});return JSON.stringify(r)}function d(t){D=JSON.parse(t);for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];M=i(n),B=B||new E.a(L.getSearchParam())}function _(){return window.location.search}Object.defineProperty(e,"__esModule",{value:!0});var y=n(201),b=n.n(y),v=n(107),g=n.n(v),m=n(168),E=n(25),O=n(11),w=n(32),T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S=(n(0).get("config:client_api"),"boolean"),R="string",P="object",k={hasBeenRead:{type:S,"default":!1},has_been_read:{type:S,"default":!1},accountId:{type:"number",required:!0},clientId:{type:R},cmd:{type:P,"default":[],validation:function(t){return Array.isArray(t)},validationMessage:"must be an array"},debug:{type:P,keys:{level:{type:R,"default":"OFF",mapQueryParam:function(t){return t},mapConfigParam:function(t){return t.toUpperCase()},validation:function(t){return"string"==typeof t&&m.a.indexOf(t)>-1},validationMessage:"expected one of "+m.a.join(",")}}},beacon:{type:P,keys:{pageViewEndpoint:{type:R,fallback:function(){return w.d}},contentControlEndpoint:{type:R,fallback:function(){return w.e}},customEntries:{type:P,validation:function(t){return Array.isArray(t)&&t.length<=3&&t.every(function(t){return"string"==typeof t})},validationMessage:"expected an array of at most 3 string values"}}},bootstrap:{type:P,keys:{contentControlCallback:{type:"function","default":function(){}}}},detection:{type:P,keys:{useNetworkBlockerTests:{type:S,"default":!1},useDFPNetworkBlockerTests:{type:S,"default":!1},useGenericContentBlockerTests:{type:S,"default":!0},useSpecificContentBlockerTests:{type:S,"default":!0},internal:{type:P,keys:{useNetworkBlockerTests:{type:S,"default":!1},useDFPNetworkBlockerTests:{type:S,"default":!1},useGenericContentBlockerTests:{type:S,"default":!0},useSpecificContentBlockerTests:{type:S,"default":!0}}},fsm:{type:P,keys:{enable:{type:S,"default":!1,mapQueryParam:function(t){if("true"===t)return!0}},endpoint:{type:R,fallback:function(){return w.f}},enableNetwork:{type:S,"default":!1,mapQueryParam:function(t){if("true"===t)return!0}}}},exposeSpecificContentBlockerData:{type:S,"default":!1}}},dfp:{type:P,keys:{targetingKey:{type:R,"default":"sp.block"}}},events:{type:P,keys:{onDetectionComplete:{type:"function","default":function(){}}}},rid:{type:P,keys:{enable:{type:S,fallback:function(){return f(["rid","enableForgivenessCookie"])},"default":!1},enableForgivenessCookie:{type:S,"default":!1},contentControlCallback:{type:"function","default":function(){}}}},siteCssLocation:{type:R},disableBlockerStyleSheets:{type:S,"default":!0},styleManager:{type:P,keys:{enable:{type:S,"default":!0},enableSimple:{type:S,"default":!0,mapQueryParam:function(t){if("true"===t)return!0}},enableMorphingOutsideAdHierarchy:{type:S,"default":!1}}},vid:{type:P,keys:{enable:{type:S,fallback:function(){return f(["vid","enableInIFrame"])||f(["vid","enableGeneric"])},"default":!1},enableInIFrame:{type:S,"default":!1},enableGeneric:{type:S,"default":!1},contentControlCallback:{type:"function","default":function(){}}}},runImmediately:{type:S,"default":!1}},j={events:{type:P,keys:{onReceiveMessageData:{type:"function",fallback:function(){return f(["msg","clientDataCallback"])}},onMessageChoiceSelect:{type:"function",fallback:function(){return f(["msg","selectChoiceCallback"])}}}},msg:{type:P,keys:{zIndex:{type:"number","default":1e4},domain:{type:R,"default":""},clientDataCallback:{type:"function"},selectChoiceCallback:{type:"function"}}},vid:{type:P,keys:{enable:{fallback:null,"default":!0}}}},A={smart:{type:P,keys:{libURL:{type:R},targetingKey:{type:R,"default":"sp_block"}}}},N={publisherBase:{type:R,required:!0},events:{type:P,keys:{onReadyToReloadAdLibrary:{type:"function","default":function(){}}}}},C={accountId:{type:"number",required:!1,fallback:function(){return f("clientId")}}},x={publisherBase:N.publisherBase,accountId:k.accountId,debug:g()(k.debug,["type","keys.level"]),vid:g()(k.vid,["type","keys.enableInIFrame"]),styleManager:g()(k.styleManager,["type","styleManager.enableMorphingOutsideAdHierarchy"])},I={BASE:k,SMART:A,RECOVERY_LIB_API_IFRAME:x,MESSAGING:j,PROXY:N,ANALYTICS:C},L={init:r,internalInit:o,get:f,has:l,availableConfigKeys:p,serialize:h,initFromSerialized:d,specs:I,getSearchParam:_},D=void 0,M=void 0,B=void 0;e["default"]=L},function(t,e,n){function r(t){if(!t)return[];if(a(t))return c(t)?p(t):i(t);if(y&&t[y])return f(t[y]());var e=u(t);return(e==d?s:e==_?l:h)(t)}var o=n(116),i=n(65),u=n(77),a=n(47),c=n(238),f=n(235),s=n(236),l=n(118),p=n(122),h=n(126),d="[object Map]",_="[object Set]",y=o?o.iterator:void 0;t.exports=r},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=n(2);n.d(e,"b",function(){return a});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=(n(0).get("detection:artifact:finder_record"),function(){function t(e,n,o){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];r(this,t),this._type=e,this._foundAdblocker=n,this._elementMatchMethod=o,this._adblockerStyleSheets=i}return i(t,[{key:"type",value:function(){return this._type}},{key:"foundAdblocker",value:function(){return this._foundAdblocker}},{key:"findElementMatches",value:function(){if(this._foundAdblocker&&this._elementMatchMethod)return o["default"].resolve(this._elementMatchMethod.apply(this,arguments));throw new Error("no adblocker or element match method")}},{key:"supportsElementMatching",value:function(){return null!=this._elementMatchMethod}},{key:"getAdblockerStyleSheets",value:function(){return this._adblockerStyleSheets}}]),t}());e.a=u;var a={ADBLOCK:"adblock",ADBLOCK_PLUS:"adblock_plus",ADGUARD:"adguard",UBLOCK:"ublock",UBLOCK_ORIGIN:"ublock_origin",OPERA:"opera"}},function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"a",function(){return o}),n.d(e,"k",function(){return i}),n.d(e,"j",function(){return u}),n.d(e,"i",function(){return a}),n.d(e,"h",function(){return c}),n.d(e,"c",function(){return f}),n.d(e,"d",function(){return s}),n.d(e,"e",function(){return l}),n.d(e,"f",function(){return p}),n.d(e,"g",function(){return h});var r=(n(0).get("util:dom:get_elements_from_selector:selector_text_matchers"),/^([a-zA-Z0-9\-_]|\\.)+/),o=/^( *\+ *| *~ *| *> *| +)/,i=/^ *> */,u=/^ +/,a=/^ *\+ */,c=/^ *~ */,f=/^\*/,s=/^[#.[:]/,l=/^([~^$*]?=|])/,p=/.*?[^\\](\\\\)*]/,h=/^['"]?(.*?)['"]?( i)?]$/},function(t,e){var n=Array.isArray;t.exports=n},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e,r){return s()(t.filter(function(t){return!(t.ownerNode&&t.ownerNode.disabled)}).map(function(t){return n.i(T.a)(t)})).filter(function(t){var o=n.i(R.b)(t.selectorText),i=!1;try{i=n.i(S.a)(e,o)}catch(t){}return(a(t.style)||c(t.style))&&i&&(!r||o.indexOf(r.trim())>-1)})}function a(t){return"none"===t.getPropertyValue("display")}function c(t){return(t.getPropertyValue("-moz-binding")||"").indexOf("abp-elemhide")>-1}var f=n(21),s=n.n(f),l=n(166),p=n.n(l),h=n(100),d=n.n(h),_=n(101),y=n.n(_),b=n(218),v=n.n(b),g=n(6),m=n.n(g),E=n(72),O=n.n(E),w=n(57),T=n(49),S=n(114),R=n(164),P=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),k=(n(0).get("detection:test_result:attribute:data:element_hiding"),function(t){function e(t){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))}return i(e,t),P(e,null,[{key:"fromStyleSheets",value:function(t){return new e(new j({documentSheets:t.document,shadowSheets:t.shadow}))}},{key:"fromElement",value:function(t,e){var n=O()(m()(t.ownerDocument.querySelectorAll("link, style")).map(function(t){return t.sheet})),r=[];try{r=O()(m()(t.ownerDocument.querySelectorAll("::shadow link, ::shadow style")).map(function(t){return t.sheet}))}catch(t){}return this.fromElementAndStyleSheets(t,{document:n,shadow:r},e)}},{key:"fromElementAndStyleSheets",value:function(t,r,o){var i=t.ownerDocument.defaultView,f={hasNone:a(t.style),hasImportant:"important"===t.style.getPropertyPriority("display")},s=i.getComputedStyle(t),l=c(s),p=null!=t.shadowRoot,h=t.hidden,d=["id","class","hidden","disabled","style"],_=v()(t.attributes,function(t){return-1===d.indexOf(t.name)&&""===t.value}),b=_.map(function(t){var e=i.document.createElement("div");return e.hidden=!0,e.setAttribute(t.name,""),e.style.setProperty("display","block"),i.document.body.appendChild(e),e}),g=null;b.forEach(function(t,e){if(null==g){var n=i.getComputedStyle(t);n&&"none"===n.display&&(g=_[e].name)}}),b.forEach(function(t){t.parentElement&&t.parentElement.removeChild(t)});var m=null;o&&(m=n.i(R.a)(o,t.ownerDocument)||o);var E=u(r.document||[],t,m),w=u(r.shadow||[],t,m),T=y()(O()(E.map(function(t){return t.parentStyleSheet}))),S=y()(O()(w.map(function(t){return t.parentStyleSheet}))),P=E.concat(w);return new e(new j({inlineDisplay:f,isHidden:h,hidingId:g,hasShadowRoot:p,hasMozBinding:l,documentSheets:T,shadowSheets:S,hidingCSSRules:P}))}}]),P(e,[{key:"is",value:function(t){if(t instanceof e){var n=t,r=this.getValue(),o=n.getValue();if(r instanceof j&&o instanceof j)return r.is(o)}return!1}}]),e}(w.a));e.a=k;var j=function(){function t(e){var n=e.documentSheets,o=void 0===n?[]:n,i=e.shadowSheets,u=void 0===i?[]:i,a=e.hidingCSSRules,c=void 0===a?[]:a,f=e.inlineDisplay,s=void 0===f?{hasNone:!1,hasImportant:!1}:f,l=e.isHidden,p=void 0!==l&&l,h=e.hidingId,_=e.hasMozBinding,y=void 0!==_&&_,b=e.hasShadowRoot,v=void 0!==b&&b;r(this,t),this.documentSheets=o,this.shadowSheets=u,this.hidingCSSRules=c,this.inlineDisplay=d()({},s),this.isHidden=p,this.hidingId=h||null,this.hasMozBinding=y,this.hasShadowRoot=v}return P(t,[{key:"is",value:function(t){return p()(this,t)}}]),t}()},function(t,e,n){"use strict";function r(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window._sp_,r=[].concat(t),o=r.pop();r.reduce(function(t,e){return t[e]=t[e]||{},t[e]},n)[o]=e}e.a=r;n(0).get("life_cycle:util:set_sp_key")},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){return"string"==typeof e?"_sp_"+e:"number"==typeof e?e.toString():"boolean"==typeof e?String(e):null==e?String(e):e[t]||null}var i=n(26),u=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&a["return"]&&a["return"]()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=(n(0).get("util:map"),function(){function t(){r(this,t),this._guid="_sp_map_key_"+Math.random().toString(),this._insertionCount=0,this.clear()}return a(t,[{key:"clear",value:function(){this._data={},this.size=0}},{key:"set",value:function(t,e){this.has(t)||(this.size++,this._insertionCount++);var n=o(this._guid,t);null==n&&(n="o_sp_"+this._insertionCount,Object.defineProperty(t,this._guid,{enumerable:!1,configurable:!0,writable:!0,value:n}));var r=this._data[n]?this._data[n][2]:this._insertionCount;this._data[n]=[t,e,r]}},{key:"has",value:function(t){return null!=this._getKeyIfInMap(t)}},{key:"get",value:function(t){var e=this._getKeyIfInMap(t);if(null!=e)return this._data[e][1]}},{key:"delete",value:function(t){var e=this._getKeyIfInMap(t);return null!=e&&(this.size--,delete this._data[e],!0)}},{key:"forEach",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,r=Object.keys(this._data);r.sort(function(t,n){return e._data[t][2]-e._data[n][2]}),r.forEach(function(r){var o=u(e._data[r],2),i=o[0],a=o[1];t.call(n,a,i)})}},{key:"_getKeyIfInMap",value:function(t){var e=o(this._guid,t);return null==e?null:e in this._data?e:null}}]),t}());e.a=n.i(i.a)(window.Map)?window.Map:c},function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var u=n(149),a=n(2);n.d(e,"a",function(){return l}),n.d(e,"f",function(){return p}),n.d(e,"d",function(){return h}),n.d(e,"b",function(){return d}),n.d(e,"c",function(){return _}),n.d(e,"e",function(){return y});var c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=(n(0).get("life_cycle:feature"),function(){function t(){i(this,t),this.eventMap={},this.startPromise=a["default"].resolve(!0),this.resolutionPromise=a["default"].resolve(!0)}return c(t,[{key:"on",value:function(t,e){this.eventMap[t]=this.eventMap[t]||[],this.eventMap[t].push(e)}},{key:"emit",value:function(t){var e=this;(this.eventMap[t]||[]).forEach(function(t){return t.call(e)})}}]),t}()),s=new u.a(function(t){return function(t){function e(t){i(this,e);var n=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.detection=t,n}return o(e,t),e}(t)}),l=new u.a,p=new u.a,h=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),e}(f),d=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),e}(s.to(f)),_=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),e}(s.to(f)),y=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),e}(s.to(f))},function(t,e){function n(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}t.exports=n},function(t,e,n){"use strict";function r(t){return o.indexOf(t)>-1}var o=(n(0).get("util:ua_detection"),(navigator.userAgent||navigator.vendor||window.opera).toLowerCase()),i={chrome:function(){return r("chrome")&&!i.edge()&&!i.android_chrome()&&!i.opera()},phantom:function(){return r("phantom")},mobile:function(){return r("mobi")},android:function(){return r("android")},firefox:function(){return r("firefox")},safari:function(){return r("safari")&&r("mozilla")&&!i.edge()&&!i.chrome()&&!i.mobile()&&!i.mobile_safari()&&!i.opera()&&!i.phantom()},ie:function(){return r("trident")||r("msie")},edge:function(){return r("edge")},ipad:function(){return r("ipad")},mobile_safari:function(){return null!==o.match(/(ipod|iphone|ipad)/gi)&&null!==o.match(/AppleWebKit/gi)&&!r("crios")},android_chrome:function(){return r("chrome")&&r("android")},googlebot:function(){return r("googlebot")||r("adsbot-google")||r("mediapartners-google")},googleweblight:function(){return r("googleweblight")},bingbot:function(){return r("bingbot")||r("bingpreview")},exabot:function(){return r("exabot")},opera:function(){return r("opera")||r("opr/")},contains:r};e.a=i},function(t,e,n){"use strict";function r(t){return("div"===t.tagName.toLowerCase()||"img"===t.tagName.toLowerCase()||"iframe"===t.tagName.toLowerCase())&&(!!o(t)||i(t))}function o(t){return 0===t.clientHeight||0===t.offsetHeight||0===t.offsetWidth||0===t.clientWidth}function i(t){if(window.getComputedStyle){var e=window.getComputedStyle(t,null);if("none"===e.getPropertyValue("display")||"hidden"===e.getPropertyValue("visibility"))return!0}return!1}function u(t){return a([t])[0]}function a(t){return t.map(function(t){var e=document.createElement("div");return Object.defineProperty(e,"_sp_isMarker",{writable:!1,configurable:!0,enumerable:!1,value:!0}),e.style.height="2px",e.style.width="2px",e.style.position="absolute",e.style.top="-9999px",e.style.left="-9999px",t.appendChild(e),[t,e]}).map(function(t){var e=f(t,2),n=e[0],r=e[1],i=o(r);return r.parentElement&&r.parentElement.removeChild(r),!(o(n)&&i)})}function c(t){return t._sp_isMarker||!1}e.b=o,e.c=a,e.a=c;var f=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&a["return"]&&a["return"]()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();n(0).get("util:dom:element_hidden");r.elementIsCollapsed=o,r.elementIsDisplayable=u,r.batchedElementIsDisplayable=a,r.isMarkerElement=c},function(t,e,n){"use strict";function r(t,e){return i(t.querySelectorAll("style,link"),e)}function o(t,e){return i(t.querySelectorAll("::shadow style,::shadow link"),e)}function i(t,e){return f()(t).map(function(t){return t.sheet}).filter(function(t){return a(t,e)})}function u(t,e){return t.some(function(t){return n.i(s.a)(t).some(e)})}function a(t,e){if(!t)return!1;var r=void 0;try{r=n.i(s.a)(t)}catch(t){return!1}return!(!r||0===r.length)&&r.every(e)}var c=n(6),f=n.n(c),s=n(49);n.d(e,"b",function(){return l}),e.a=r,e.d=o,e.c=u;var l=(n(0).get("detection:artifact:get_sheets_with_rules"),{ONLY_DISPLAY_NONE:/{\s*display:\s*none\s*!\s*important;\s*}/,ROOT:/:root/,DISPLAY_NONE_AND_ORPHAN:/display\s*:\s*none\s*!\s*important.*orphans\s*:\s*4321/})},function(t,e,n){function r(t,e,n,r){var u=!n;n||(n={});for(var a=-1,c=e.length;++a<c;){var f=e[a],s=r?r(n[f],t[f],f,n,t):void 0;void 0===s&&(s=t[f]),u?i(n,f,s):o(n,f,s)}return n}var o=n(44),i=n(27);t.exports=r},function(t,e,n){function r(t){return(null==t?0:t.length)?o(t,i):[]}var o=n(62),i=1/0;t.exports=r},function(t,e,n){"use strict";function r(t,e,n){return new s.a(e,n.length>0,o.bind(null,t,n),n)}function o(t,e){for(var r=arguments.length,o=Array(r>2?r-2:0),u=2;u<r;u++)o[u-2]=arguments[u];return f()(e.map(function(e){return n.i(p.a)(e).map(function(e){var n=e.selectorText,r=n.replace(/::content/g,""),u=t.querySelectorAll(r);return a()(u).filter(function(t){return o.some(function(e){return e.contains(t)||t.contains(e)})}).map(function(e){var n=i(t,r,e);return new l.a(l.b.STYLE,e,n)})})}))}function i(t,e,n){return e.replace(/(\[[^\]]*),/g,"$1"+h).split(",").map(function(t){return t.trim().replace(h,",")}).filter(function(e){return a()(t.querySelectorAll(e)).some(function(t){return t===n})}).join(",")}var u=n(6),a=n.n(u),c=n(19),f=n.n(c),s=n(7),l=n(63),p=n(49);e.b=r,e.a=o;var h=(n(0).get("detection:artifact:get_cosmetic_finder_record"),"__SP__COMMA_PLACEHOLDER")},function(t,e,n){function r(t){return(null==t?0:t.length)?o(t,1):[]}var o=n(62);t.exports=r},function(t,e,n){"use strict";function r(t,e){return p()(t,e)}function o(t){return s()(t,c).join("")}function i(){return o(r(arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,arguments.length>1&&void 0!==arguments[1]?arguments[1]:25))}function u(){var t=i();return document.getElementsByClassName(t).length>0?u():t}function a(){var t=i();return null!=document.getElementById(t)?a():t}function c(){return String.fromCharCode(r(97,122))}var f=n(113),s=n.n(f),l=n(220),p=n.n(l);e.a=r,e.b=i,e.d=u,e.c=a;n(0).get("util:random_generators")},function(t,e,n){function r(t,e){return o(t)?t:i(t,e)?[t]:u(a(t))}var o=n(9),i=n(185),u=n(196),a=n(48);t.exports=r},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(86),a=(n(0).get("util:dom:get_elements_from_selector:consumers:attribute_consumer:element_attribute_modification_record"),function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.key=t,i.value=n,i}return i(e,t),e}(u.a));e.a=a},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t){var e=t.match(/\?(.*)/);return null==e?new i.a:e[1].trim().split("&").reduce(function(t,e){var n=e.indexOf("=");if(-1===n)return t.set(e,""),t;var r=e.substring(0,n),o=e.substring(n+1);return t.set(r,o),t},new i.a)}var i=n(12),u=n(94),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=(n(0).get("util:url"),function(){function t(e){r(this,t),this._parser=window.document.createElement("a"),this._parser.href=e,this._searchParams=o(this._parser.search)}return a(t,[{key:"_formatPathname",value:function(t){return"/"===t[0]?t:"/"+t}},{key:"toString",value:function(){var t=this.port?":"+this.port:"";return this.protocol+"//"+this.hostname+t+this.pathname+this.search+this.hash}},{key:"getSearchParam",value:function(t){var e=this._searchParams.get(encodeURIComponent(t));return null==e?e:decodeURIComponent(e)}},{key:"setSearchParam",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return this._searchParams.set(encodeURIComponent(t),encodeURIComponent(e))}},{key:"deleteSearchParam",value:function(t){return this._searchParams["delete"](encodeURIComponent(t))}},{key:"forEachSearchParam",value:function(t){return this._searchParams.forEach(function(e,n){t(decodeURIComponent(e),decodeURIComponent(n))})}},{key:"protocol",get:function(){return this._parser.protocol||window.location.protocol},set:function(t){return this._parser.protocol=t}},{key:"hostname",get:function(){return this._parser.hostname},set:function(t){return this._parser.hostname=t}},{key:"port",get:function(){return"21"===this._parser.port||"80"===this._parser.port||"443"===this._parser.port?"":this._parser.port},set:function(t){return this._parser.port=t}},{key:"pathname",get:function(){return this._formatPathname(this._parser.pathname)},set:function(t){var e=this._formatPathname(t);return this._parser.pathname=e}},{key:"search",get:function(){var t=this,e=n.i(u.a)(this._searchParams).map(function(e){return e+"="+t._searchParams.get(e)}).join("&");return e.length>0?"?"+e:e},set:function(t){var e="?"===t[0]?t:"?"+t;this._searchParams=o(e)}},{key:"hash",get:function(){return this._parser.hash},set:function(t){return this._parser.hash=t}}]),t}());e.a=c},function(t,e,n){"use strict";function r(t){try{return i()(t)}catch(t){return!1}}var o=n(199),i=n.n(o);e.a=r;n(0).get("util:is_native")},function(t,e,n){function r(t,e,n){"__proto__"==e&&o?o(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}var o=n(182);t.exports=r},function(t,e,n){var r=n(183),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();t.exports=i},function(t,e,n){var r=n(66),o=r(Object.keys,Object);t.exports=o},function(t,e,n){function r(t,e){for(var n=t.length;n--;)if(o(t[n][0],e))return n;return-1}var o=n(35);t.exports=r},function(t,e,n){function r(t){if(!i(t))return!1;var e=o(t);return e==a||e==c||e==u||e==f}var o=n(53),i=n(14),u="[object AsyncFunction]",a="[object Function]",c="[object GeneratorFunction]",f="[object Proxy]";t.exports=r},function(t,e,n){"use strict";function r(t){return t.join("")}n.d(e,"a",function(){return o}),n.d(e,"d",function(){return i}),n.d(e,"e",function(){return u}),n.d(e,"f",function(){return a}),n.d(e,"g",function(){return c}),n.d(e,"c",function(){return f}),n.d(e,"b",function(){return s});var o=(n(0).get("config:index"),"2.0.926"),i=r(["w","w","w",".","s","u","m","m","e","r","h","a","m","s","t","e","r",".","c","o","m"]),u=r(["w","w","w",".","r","o","o","s","t","e","r","f","i","r","e","w","o","r","k",".","c","o","m"]),a=r(["/","/","f","s","m","1","0","1","9",".","g","l","o","b","a","l",".","s","s","l",".","f","a","s","t","l","y",".","n","e","t","/","f","s","m","/","d","s"]),c=r(["h","t","t","p","s",":","/","/","d","2","z","v","5","r","k","i","i","4","6","m","i","q",".","c","l","o","u","d","f","r","o","n","t",".","n","e","t","/","0","/","2",".","0",".","9","2","6","/","r","e","c","o","v","e","r","y","_","d","f","p","_","i","n","t","e","r","n","a","l","-","v","2",".","0",".","9","2","6",".","j","s"]),f=r(["h","t","t","p","s",":","/","/","d","2","z","v","5","r","k","i","i","4","6","m","i","q",".","c","l","o","u","d","f","r","o","n","t",".","n","e","t","/","0","/","2",".","0",".","9","2","6","/","r","e","c","o","v","e","r","y","_","l","i","b","_","a","p","i","_","i","f","r","a","m","e","-","v","2",".","0",".","9","2","6",".","h","t","m","l"]),s=r(["h","t","t","p","s",":","/","/","d","2","z","v","5","r","k","i","i","4","6","m","i","q",".","c","l","o","u","d","f","r","o","n","t",".","n","e","t","/","0","/","2",".","0",".","9","2","6","/","r","e","c","o","v","e","r","y","_","l","i","b","_","r","i","d","_","i","f","r","a","m","e","-","v","2",".","0",".","9","2","6",".","h","t","m","l"])},function(t,e){function n(t){return t}t.exports=n},function(t,e){function n(t){return t}t.exports=n},function(t,e){function n(t,e){return t===e||t!==t&&e!==e}t.exports=n},function(t,e){function n(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}t.exports=n},,function(t,e,n){n(0).get("util:beacon:beacon_types");t.exports={BEACON:"bcn",IMPRESSION:"imp",CLICK:"clk",CONTEXT_CLICK:"ctx",CONTENT_CONTROL:"cct",MSG:"msg"}},function(t,e){function n(t){return null!=t&&"object"==typeof t}t.exports=n},function(t,e,n){"use strict";function r(){for(var t=n.i(o.a)(0,5),e=[],r=0;r<t;r++)e.push(n.i(o.b)());return e}var o=n(22);e.a=r;n(0).get("util:dom:get_elements_from_selector:consumers:attribute_consumer:generate_random_words")},function(t,e,n){"use strict";function r(t){return o.g.exec(t)[1]}var o=n(8);e.a=r;n(0).get("util:dom:get_elements_from_selector:consumers:attribute_consumer:unwrap_attribute_value")},function(t,e,n){"use strict";function r(t){var e=t.lookAheadRegex(f.b,f.c);e.length>0&&t.consumeCharacters(e);var n=void 0;n="*"===e||0===e.length?new o.b("div"):new o.b(e);for(var r=t.lookAheadRegex(f.d);r.length>0;){var i=s[r];n.addElementModificationRecord(i(t)),r=t.lookAheadRegex(f.d)}return n}var o=n(87),i=n(306),u=n(309),a=n(310),c=n(314),f=n(8);e.a=r;var s=(n(0).get("util:dom:get_elements_from_selector:consumers:element_consumer"),{"[":i.a,".":u.a,"#":c.a,":":a.a})},function(t,e,n){"use strict";function r(t){return new Error("Unsupported Selector: "+t)}function o(t){return new Error("Unparseable Selector: "+t)}function i(t){return new Error("Non-Matching Selector: "+t)}function u(t){return new Error("Network Request Triggering Selector: "+t)}e.c=r,e.a=o,e.b=i,e.d=u;n(0).get("util:dom:get_elements_from_selector:error")},function(t,e,n){function r(t,e,n){var r=t[e];a.call(t,e)&&i(r,n)&&(void 0!==n||e in t)||o(t,e,n)}var o=n(27),i=n(35),u=Object.prototype,a=u.hasOwnProperty;t.exports=r},function(t,e,n){"use strict";function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t){var e=f(t);if(!e)return[];var n=g()(e.data,m),r=b()(n);return _()(r,function(t){return t.net_list}).map(function(t){return h()(t,function(t,e){return l()(e)})})}function i(t){return c(t,m)}function u(t){return c(t,E)}function a(t){var e=f(t);if(!e)return null;var n=e.data.test_urls;return{img:n.i_url,script:n.s_url}}function c(t,e){var n=[],o=f(t);if(!o)return n;var i=g()(o.data,e);for(var u in i){var a=i[u];if(a.hasOwnProperty("css")){var c=a.css,s=c.blacklist,l=c.non_specific_blacklist;n.push.apply(n,r(s)),n.push.apply(n,r(l))}}return n}function f(t){return t.responseText?JSON.parse(t.responseText):null}var s=n(347),l=n.n(s),p=n(351),h=n.n(p),d=n(60),_=n.n(d),y=n(126),b=n.n(y),v=n(107),g=n.n(v);e.c=o,e.d=i,e.a=u,e.b=a;var m=(n(0).get("detection:fsm:parse_data"),["reg","exception"]),E=["legacy"]},function(t,e,n){n(0).get("util:beacon:beacon_keys");t.exports={USER_ID:"uid",SCRIPT_VERSION:"v",ACCOUNT_ID:"cid",PAGE_URL:"u",CORRELATION_ID:"bid",REASON_CODE:"rc",SENTINEL_FLAG:"sntl",ADBLOCK_DETECTED:"abl",FIRST_ACCESS:"fa",SESSION_START:"ss",PRIVACY_LIST_BLOCKED:"pl",UNSUPPORTED_OPERATING_SYSTEM:"unsupos",UNSUPPORTED_NEW_BROWSER:"unsupnb",UNSUPPORTED_USER_AGENT:"unsupua",RECOVERY_FLAG:"rcv",WHITELISTED_SESSION:"wnsk",INJECTION_STATE:"st",INJECTION_DOMAINS:"noq.id",INJECTION_CLASSES:"noq.ic",INJECTION_IDS:"noq.ii",DEBUG_0:"d0",DEBUG_1:"d1",DEBUG_2:"d2",CUSTOMER_1:"c0",CUSTOMER_2:"c1",CUSTOMER_3:"c2",EXCEPTION_RULES:"er",cct:{LOCK:"l",CONTROL_TYPE:"ct"},msg:{MSG_ID:"mid",MSG_EVENT_TYPE:"met"}}},function(t,e,n){function r(t){return null!=t&&i(t.length)&&!o(t)}var o=n(31),i=n(93);t.exports=r},function(t,e){function n(t){return t}t.exports=n},function(t,e,n){"use strict";function r(t){var e=void 0;try{if(null==t.cssRules)return[];e=c()(t.cssRules)}catch(t){return[]}return u()(c()(e).map(function(t){return o(t)}))}function o(t){return t.type===CSSRule.STYLE_RULE?t:null!=t.cssRules?c()(t.cssRules).map(function(t){return o(t)}):[]}var i=n(19),u=n.n(i),a=n(6),c=n.n(a);e.a=r;n(0).get("util:css:extract_style_rules_from_style_sheet")},function(t,e,n){"use strict";function r(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return n.some(function(e){return t.nodeName.toLowerCase()===e})}function o(t){return r(t,"iframe")}function i(t){return r(t,"img")}function u(t){return r(t,"video")}function a(t){return o(t)&&(!t.src||"about:blank"===t.src||0===t.src.indexOf("javascript"))}function c(t,e){try{return"complete"===t.contentDocument.readyState&&t.contentDocument.body&&b()(t.contentDocument.querySelectorAll("*")).some(e)}catch(t){}}function f(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return c(t,function(n){return!r(n,"html","head","body")&&(e||!r(n,"link","script")&&!t.contentDocument.head.contains(n))})}function s(t){return c(t,function(t){return!r(t,"html","head","body")&&_(t)})}function l(t){return a(t)&&f(t)}function p(){function t(t){o(t.target)&&n.add(t.target)}var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;if(m&&!E.has(e)){var n=m.get(e)||new g.a;n&&(m.set(e,n),E.set(e,t),e.document.addEventListener("load",t,!0))}}function h(t){if(f(t,!0))return!0;if(!m)return!1;var e=m.get(t.ownerDocument.defaultView);return!!e&&e.has(t)}function d(t){if(r.apply(void 0,[t].concat(w)))return!0;if(i(t)&&(!t.naturalHeight||1===t.naturalHeight||!t.complete))return!0;if(t.ownerDocument.head.contains(t))return!0;if(o(t)){if(!1===s(t))return!0}return!1}function _(t){return!d(t)&&(0===t.children.length||(!!b()(t.childNodes).some(function(t){return 3===t.nodeType&&t.data.trim().length>0})||(!!r.apply(void 0,[t].concat(O))||t.ownerDocument.defaultView.getComputedStyle(t).backgroundImage.toLowerCase().indexOf("url(")>-1)))}var y=n(6),b=n.n(y),v=n(12),g=n(51);e.d=r,e.c=o,e.g=i,e.h=u,e.b=l,e.a=p,e.f=h,e.i=d,e.e=_;var m=(n(0).get("util:dom:is_element"),new v.a),E=new v.a,O=["iframe","img","video","object","input","button","select","textarea"],w=["link","script"]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=n(12),i=n(26),u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=(n(0).get("util:set"),function(){function t(){r(this,t),this._data=new o.a}return u(t,[{key:"add",value:function(t){this._data.set(t,t)}},{key:"has",value:function(t){return this._data.has(t)}},{key:"delete",value:function(t){return this._data["delete"](t)}},{key:"clear",value:function(){return this._data.clear()}},{key:"forEach",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this._data.forEach(function(n){t.call(e,n)})}},{key:"size",get:function(){return this._data.size}}]),t}());e.a=n.i(i.a)(window.Set)?window.Set:a},function(t,e,n){var r=n(333),o=n(123),i=r(o);t.exports=i},function(t,e){function n(t){return o.call(t)}var r=Object.prototype,o=r.toString;t.exports=n},function(t,e){function n(){return!1}t.exports=n},function(t,e,n){"use strict";function r(t){var e=t.document;return n.i(o.a)(e).then(function(t){return n.i(o.b)(t)?[]:t}).then(function(t){return new i.a(i.b.UBLOCK,t.length>0,o.c.bind(null,e),t)})}var o=n(81),i=n(7);e.a=r;n(0).get("detection:artifact:generic:ublock")},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(84),c=n(1),f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=(n(0).get("detection:fsm:data_dependent_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),f(e,null,[{key:"findDependency",value:function(t){return t.has(c.b.FSM_DATA)}},{key:"getFSMData",value:function(t,e){return t.map(function(t){return t.getData(a.a)}).filter(function(t){return t}).map(function(t){return e(t)}).filter(function(t){return t})}}]),e}(u.a));e.a=s},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);
t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(1),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=(n(0).get("detection:test_result:attribute:data:index"),function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,"DataAttribute"));return n._value=t,n}return i(e,t),a(e,[{key:"is",value:function(t){return t instanceof e&&t.getValue()===this._value}},{key:"getValue",value:function(){return this._value}}]),e}(u.e));e.a=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=(n(0).get("util:dom:get_elements_from_selector:element_hierarchy_modification_record"),function(){function t(e){r(this,t),this.elementRecord=e}return o(t,[{key:"applyToElementRecord",value:function(t){throw new Error("not implemented")}},{key:"getElementRecord",value:function(){return this.elementRecord}}]),t}());e.a=i},function(t,e,n){function r(t,e){return u(i(t,e,o),t+"")}var o=n(124),i=n(194),u=n(195);t.exports=r},function(t,e,n){function r(t,e){return o(i(t,e),1)}var o=n(62),i=n(200);t.exports=r},function(t,e){function n(){}t.exports=n},function(t,e,n){function r(t,e,n,u,a){var c=-1,f=t.length;for(n||(n=i),a||(a=[]);++c<f;){var s=t[c];e>0&&n(s)?e>1?r(s,e-1,n,u,a):o(a,s):u||(a[a.length]=s)}return a}var o=n(229),i=n(234);t.exports=r},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"b",function(){return i});var o=(n(0).get("detection:artifact:element_match_record"),function t(e,n,o){r(this,t),this.type=e,this.element=n,this.info=o});e.a=o;var i={STYLE:"s",MOZ:"m"}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(10),f=n(2),s=n(16),l=n(147),p=n(1),h=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),d=(n(0).get("detection:generic_adblocker:element_hiding_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),h(e,null,[{key:"getSchema",value:function(){return new a.a(p.b.GENERIC_ADBLOCKER,p.c.INFERENCE,p.c.ELEMENT,p.c.HIDING,p.c.HIDING_DATA)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".plainAd",e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:30;return new f["default"](function(i){function u(){if(n.i(s.b)(f))return h(p.a.NOT_PRESENT,p.f.CONTROL_ELEMENT_HIDDEN);n.i(s.b)(a)&&h(p.a.PRESENT,p.f.ELEMENT_HIDDEN,c.a.fromElement(a,t))}var a=n.i(l.a)(t,r.document)[0];a.style.position="absolute",a.style.top="-2000px",a.style.left="-2000px",a.style.height="30px",a.style.width="30px";var f=a.cloneNode(!1);f.removeAttribute("class"),f.removeAttribute("id"),r.document.body.appendChild(a),r.document.body.appendChild(f);var h=function(){for(var n,o=arguments.length,u=Array(o),c=0;c<o;c++)u[c]=arguments[c];r.clearInterval(_),a.parentElement&&r.document.body.removeChild(a),f.parentElement&&r.document.body.removeChild(f),i((n=e.getSchema()).createResult.apply(n,[new p.w(t)].concat(u)))},d=0,_=r.setInterval(function(){if(++d===o)return void h(p.a.NOT_PRESENT,p.f.NO_ELEMENT_HIDDEN);u()},10);u()})}}]),e}(u.b));e.a=d},function(t,e){function n(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}t.exports=n},function(t,e){function n(t,e){return function(n){return t(e(n))}}t.exports=n},,function(t,e,n){function r(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}var o=n(188),i=n(189),u=n(190),a=n(191),c=n(192);r.prototype.clear=o,r.prototype["delete"]=i,r.prototype.get=u,r.prototype.has=a,r.prototype.set=c,t.exports=r},function(t,e,n){function r(t){return o(function(e,n){var r=-1,o=n.length,u=o>1?n[o-1]:void 0,a=o>2?n[2]:void 0;for(u=t.length>3&&"function"==typeof u?(o--,u):void 0,a&&i(n[0],n[1],a)&&(u=o<3?void 0:u,o=1),e=Object(e);++r<o;){var c=n[r];c&&t(e,c,r,u)}return e})}var o=n(59),i=n(74);t.exports=r},function(t,e){function n(){return!1}t.exports=n},function(t,e,n){function r(t,e){e=o(e,t);for(var n=0,r=e.length;null!=t&&n<r;)t=t[i(e[n++])];return n&&n==r?t:void 0}var o=n(23),i=n(34);t.exports=r},function(t,e){function n(t){for(var e=-1,n=null==t?0:t.length,r=0,o=[];++e<n;){var i=t[e];i&&(o[r++]=i)}return o}t.exports=n},function(t,e){function n(t,e){for(var n=-1,r=null==t?0:t.length,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}t.exports=n},function(t,e){function n(){return!1}t.exports=n},,function(t,e,n){function r(t,e,n){var r=-1,l=i,p=t.length,h=!0,d=[],_=d;if(n)h=!1,l=u;else if(p>=s){var y=e?null:c(t);if(y)return f(y);h=!1,l=a,_=new o}else _=e?[]:d;t:for(;++r<p;){var b=t[r],v=e?e(b):b;if(b=n||0!==b?b:0,h&&v===v){for(var g=_.length;g--;)if(_[g]===v)continue t;e&&_.push(v),d.push(b)}else l(_,v,n)||(_!==d&&_.push(v),d.push(b))}return d}var o=n(119),i=n(227),u=n(228),a=n(120),c=n(233),f=n(118),s=200;t.exports=r},function(t,e){function n(t){return o.call(t)}var r=Object.prototype,o=r.toString;t.exports=n},function(t,e,n){"use strict";function r(t){d="OFF"!==t;var e={defaultLevel:h[t]},n={};p.a.ie()||p.a.edge()?e.formatter=function(t,e){e.name&&t.unshift("[SP:"+e.name+"]")}:e.formatter=function(t,e){var r=e.name;if(r){if(!(r in n)){var o=f(c(u(i(r))));n[r]=o}t.unshift("%c[SP:"+r+"]","color: "+n[r])}},l.a.useDefaults(e)}function o(){return d}function i(t){for(var e=0,n=0;n<t.length;n++){e=(e<<5)-e+t.charCodeAt(n),e|=0}return e}function u(t){return[(16711680&t)>>16,(65280&t)>>8,255&t]}function a(t){return.299*t[0]+.587*t[1]+.114*t[2]}function c(t){var e=a(t);if(e>_){var n=_/e;return[Math.floor(t[0]*n),Math.floor(t[1]*n),Math.floor(t[2]*n)]}return t}function f(t){return"#"+t.map(function(t){return t.toString(16)}).join("")}Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),l=n.n(s),p=n(15);e["default"]=r,e.isLoggerEnabled=o;var h=(n(0).get("util:logger:init"),{DEBUG:l.a.DEBUG,INFO:l.a.INFO,TIME:l.a.TIME,WARN:l.a.WARN,ERROR:l.a.ERROR,OFF:l.a.OFF}),d=!1,_=100},function(t,e,n){"use strict";function r(t){var e=t.document;return n.i(o.a)(e).then(function(t){return n.i(o.b)(t)?t:[]}).then(function(t){return new i.a(i.b.UBLOCK_ORIGIN,t.length>0,o.c.bind(null,e),t)})}var o=n(81),i=n(7);e.a=r;n(0).get("detection:artifact:generic:ublock_origin")},function(t,e,n){"use strict";function r(){return i++,i%=o.length,o[i]}n.d(e,"a",function(){return o}),e.b=r;var o=(n(0).get("detection:artifact:get_easylist_classnames"),["ad-space","placeholder-ad","placeholderAd","plainAd","play-page-ads","playAds1","playAds2","player-ads","player-leaderboard-ad-wrapper","player-under-ad","playerAd","player_ad","player_ad2","player_ad_box","player_hover_ad","player_page_ad_box"]),i=Math.floor(Math.random()*o.length)},function(t,e,n){"use strict";function r(t){return o(t,function(){var e=n.i(p.a)(t,function(t){return p.b.ONLY_DISPLAY_NONE.test(t.cssText)}),r=e.length>0&&e.every(function(t){return t.cssRules.length<50}),o=n.i(p.c)(e,function(t){return s.a.some(function(e){return t.selectorText.toLowerCase().indexOf(e.toLowerCase())>-1})});return r&&o?e:[]})}function o(t,e){var r=t.createElement("div");return new f["default"](function(e){r.className=n.i(s.b)();var o=new MutationObserver(function(n){n.some(function(t){return c()(t.addedNodes).some(function(t){return t===r})})&&(o.disconnect(),t.defaultView.setTimeout(function(){e()},1))});o.observe(t.body,{childList:!0}),t.body.appendChild(r)}).then(function(){return new f["default"](function(n){t.defaultView.setTimeout(function(){n(e(r)),r.parentElement&&t.body.removeChild(r)},150)})})}function i(t){return n.i(p.c)(t,function(t){return p.b.ROOT.test(t.cssText)})}function u(t){for(var e=arguments.length,n=Array(e>1?e-1:0),o=1;o<e;o++)n[o-1]=arguments[o];return r(t).then(function(e){return l.a.apply(void 0,[t,e].concat(n))})}var a=n(6),c=n.n(a),f=n(2),s=n(80),l=n(20),p=n(17);e.a=r,e.d=o,e.b=i,e.c=u;n(0).get("detection:artifact:get_ublock_sheets")},function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t){return new i["default"](function(e){n.i(a.f)(t,function(n,r,o,i,a){p.info("ajax test finished",{blocked:n,succeeded:r,info:o,coreType:i,xhr:a});var f=n?h[i]:d[i],s=[];if(o.indexOf("::")>-1){var _=o.split("::"),y=l(_,2),b=y[0],v=y[1];s.push(new c.h(parseInt(b)),new c.i(parseFloat(v)))}else s.push(new c.j(o));s.push(new c.g(t),new c.k("onl",navigator.onLine?"1":"0")),e({blocked:n,succeeded:r,reasonAttribute:f,infoAttributes:s,xhrData:a&&new u.a(a)})})})}var i=n(2),u=n(84),a=n(163),c=n(1);e.a=o;var f,s,l=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(n.push(u.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&a["return"]&&a["return"]()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),p=n(0).get("detection:interference:ajax_network_test:promise"),h=(f={},r(f,a.a,c.f.AJAX_LOAD_BLOCK),r(f,a.b,c.f.AJAX_OPEN_BLOCK),r(f,a.c,c.f.AJAX_SEND_BLOCK),f),d=(s={},r(s,a.d,c.f.AJAX_LOAD_SUCCESS),r(s,a.a,c.f.AJAX_LOAD_ERROR),r(s,a.e,c.f.PROTOCOL_MISMATCH),s)},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){return new p["default"](function(n){var r=document.createElement("div");r.style.position="absolute",r.style.left="-9999px",r.style.top="-9999px",r.style.width="1px",r.style.height="1px";var o=new Image;o.setAttribute("height","1"),o.setAttribute("width","1"),r.appendChild(o);var i=c()(function(o,i,u){r.parentElement&&document.body.removeChild(r),n(t.createResult(o,i,new h.g(e),new l.a(u)))});o.addEventListener("load",function(t){o.src===y?i(h.a.PRESENT,h.f.URL_REWRITTEN,t):i(h.a.NOT_PRESENT,h.f.NO_LOAD_BLOCK,t)},!0),o.addEventListener("error",function(t){i(h.a.PRESENT,h.f.LOAD_BLOCK,t)},!0),o.src=e,document.body.appendChild(r)})}var a=n(157),c=n.n(a),f=n(3),s=n(4),l=n(143),p=n(2),h=n(1),d=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),_=(n(0).get("detection:interference:image_network_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),d(e,null,[{key:"getSchema",value:function(){return new s.a(h.b.INTERFERENCE,h.c.INFERENCE,h.c.IMAGE,h.c.NETWORK)}},{key:"testMethod",value:function(t){return null==t?this.getSchema().createResult(h.a.NOT_PRESENT,h.f.CANNOT_TEST):u(this.getSchema(),t)}}]),e}(f.b));e.a=_;var y="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs="},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(57),a=(n(0).get("detection:test_result:attribute:data:xhr"),function(t){function e(t){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))}return i(e,t),e}(u.a));e.a=a},,function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=(n(0).get("util:dom:get_elements_from_selector:element_modification_record"),function(){function t(){r(this,t)}return o(t,[{key:"applyToElement",value:function(t){throw new Error("not implemented")}}]),t}());e.a=i},function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){return(t instanceof a.a?1:-1)-(e instanceof a.a?1:-1)}var a=n(24);n.d(e,"a",function(){return f});var c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=(n(0).get("util:dom:get_elements_from_selector:element_record"),function(){function t(){i(this,t),this._childElementRecords=[]}return c(t,[{key:"appendChildElementRecord",value:function(t){t.setParentElementRecord(this),this._childElementRecords.push(t)}},{key:"generateElementHierarchy",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;return this._childElementRecords.map(function(e){return e.generateElement(t)})}}]),t}()),s=function(t){function e(t){i(this,e);var n=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n._nodeName=t,n._elementModificationRecords=[],n}return o(e,t),c(e,[{key:"addElementModificationRecord",value:function(t){this._elementModificationRecords.push(t)}},{key:"setParentElementRecord",value:function(t){this._parentElementRecord=t}},{key:"getParentElementRecord",value:function(){return this._parentElementRecord}},{key:"generateElement",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,e=t.createElement(this._nodeName);return this._elementModificationRecords.slice().sort(u).forEach(function(t){t.applyToElement(e)}),this.generateElementHierarchy(t).forEach(function(t){e.appendChild(t)}),e}}]),e}(f);e.b=s},function(t,e,n){function r(t,e,n){(void 0===n||i(t[e],n))&&(void 0!==n||e in t)||o(t,e,n)}var o=n(27),i=n(35);t.exports=r},function(t,e,n){var r=n(181),o=r();t.exports=o},function(t,e,n){var r=n(28),o=r["__core-js_shared__"];t.exports=o},function(t,e,n){var r=n(66),o=r(Object.getPrototypeOf,Object);t.exports=o},function(t,e){function n(t,e){return!!(e=null==e?r:e)&&("number"==typeof t||o.test(t))&&t>-1&&t%1==0&&t<e}var r=9007199254740991,o=/^(?:0|[1-9]\d*)$/;t.exports=n},function(t,e){function n(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=r}var r=9007199254740991;t.exports=n},function(t,e,n){"use strict";function r(t){if(t instanceof o.a){if("function"==typeof t.keys&&"function"==typeof Array.from&&n.i(u.a)(Array.from)){return Array.from.bind(Array)(t.keys())}var e=[];return t.forEach(function(t,n){return e.push(n)}),e}if(t instanceof i.a){if("function"==typeof t.keys&&"function"==typeof Array.from&&n.i(u.a)(Array.from)){return Array.from.bind(Array)(t.keys())}var r=[];return t.forEach(function(t){return r.push(t)}),r}throw new Error("non es6 structure")}var o=n(12),i=n(51),u=n(26);e.a=r;n(0).get("util:es6_keys")},function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e,n,r){var o=t.charCodeAt(0),i=r-n;if(o<n||o>r)return o;var u=o-n;return u=(u+e+i)%i,String.fromCharCode(u+n)}n.d(e,"a",function(){return s});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=(n(0).get("util:shift_cipher"),function(){function t(e){i(this,t),this._shift=e}return a(t,[{key:"encode",value:function(t){return this._encode(t,this._shift)}},{key:"decode",value:function(t){return this._encode(t,-this._shift)}}]),t}()),f=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),a(e,[{key:"_encode",value:function(t,e){return t.split("").map(function(t){return u(t,e,33,127)}).join("")}}]),e}(c);e.b=f;var s=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),a(e,[{key:"_encode",value:function(t,e){return t.replace(/[A-Z]/g,function(t){return u(t,e,65,91)}).replace(/[a-z]/g,function(t){return u(t,e,97,123)})}}]),e}(c)},,function(t,e,n){"use strict";function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t){R||(t._sp_&&t._sp_._artifactDetectorMap?R=t._sp_._artifactDetectorMap:(R=new l.a,n.i(E.a)("_artifactDetectorMap",R)));var e=R.get(t);return null==e&&(e=new S(t),R.set(t,e)),e}function c(){R&&R.clear()}Object.defineProperty(e,"__esModule",{value:!0});var f=n(61),s=n.n(f),l=n(12),p=n(2),h=n(148),d=n(265),_=n(5),y=n(266),b=n(268),v=n(269),g=n(138),m=n(15),E=n(11),O=n(13),w=n(7);n.d(e,"ArtifactDetector",function(){return S}),e.getArtifactDetector=a,e.resetArtifactDetectors=c;var T=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),S=(n(0).get("detection:artifact:index"),function(){function t(e){var r=this;u(this,t),this._windowObject=e;var o=[];m.a.chrome()?o=d.a:m.a.firefox()?o=y.a:m.a.safari()?o=v.a:m.a.ie()?o=b.a:m.a.opera()&&(o=g.b),this._artifactFinderPromise=n.i(h.a)(this._windowObject.document).then(function(){return o.map(function(t){return t(r._windowObject)}).map(function(t){return p["default"].resolve(t)})}).then(function(t){return p["default"].all(t)}).then(function(t){return t.filter(function(t){return t.foundAdblocker()})}),this.hasUblock(s.a)}return T(t,[{key:"hasUblock",value:function(t){var e=this;null==this._hasUblock?this._hasUblock=this.getAllFinders().then(function(n){var r=n.some(function(t){return t.type()===w.b.UBLOCK||t.type()===w.b.UBLOCK_ORIGIN});return t(r),e._hasUblock=r,r}):this._hasUblock instanceof p["default"]?this._hasUblock.then(function(e){t(e)}):"boolean"==typeof this._hasUblock&&t(this._hasUblock)}},{key:"getAllFinders",value:function(){return this._artifactFinderPromise}},{key:"hasArtifact",value:function(){return this.getAllFinders().then(function(t){return t.length>0})}},{key:"getFirstFinder",value:function(){var t=this;return new p["default"](function(e){t.getAllFinders().then(function(t){e(t[0]||null)})})}}]),t}()),R=void 0,P=function(t){function e(t){u(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return _["default"].get(["detection","exposeSpecificContentBlockerData"])&&(n._artifactDetector=a(window),n.exposePublicApi()),n}return i(e,t),T(e,[{key:"exposePublicApi",value:function(){var t=this,e=function(e){t._artifactDetector.getAllFinders().then(function(t){return e.apply(void 0,r(t))})};n.i(E.a)("getContentBlockers",e),n.i(E.a)("getAdblockers",e)}}]),e}(O.b);e["default"]=P},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=n(5),i=n(11),u=n(95),a=n(32),c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(0).get("util:beacon:core"),s=n(223).beacon,l=n(38),p=n(46),h=new u.a(s.shiftKey),d=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l.BEACON,u=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o["default"].get(["beacon","pageViewEndpoint"]),a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];r(this,t),window._sp_&&window._sp_._bid?this._bid=window._sp_._bid:(this._bid=Math.floor(1e9*Math.random()),n.i(i.a)("_bid",this._bid)),this._beaconType=e,this._data={},this._endpoint=u,this._sent=!1,this._shouldCipher=a}return c(t,[{key:"set",value:function(t,e){this._data[t]=String(e)}},{key:"get",value:function(t){return this._data[t]}},{key:"unset",value:function(t){delete this._data[t]}},{key:"send",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};if(!0===this._sent)return void t(new Error("Beacon already sent"));this._sent=!0,this.set("cb",(new Date).getTime()),this.populateBeaconFields(),this._sendBeacon(t)}},{key:"populateBeaconFields",value:function(){this.set(p.SCRIPT_VERSION,a.a),this.set(p.CORRELATION_ID,this._bid),this.set(p.ACCOUNT_ID,o["default"].get("accountId"))}},{key:"getBeaconUrl",value:function(){return"//"+this._getEndpoint()+"/"+this._beaconType+"?"+this._encodeData()}},{key:"_sendBeacon",value:function(t){var e=this.getBeaconUrl(),n=new Image;f.info("firing "+this._beaconType+" beacon: "+e),f.info("beacon data",this._data),n.addEventListener("load",function(){return t()}),n.addEventListener("error",function(e){return t(e)}),n.src=e}},{key:"_getEndpoint",value:function(){return this.processEndpoint(this._endpoint)}},{key:"processEndpoint",value:function(t){return t}},{key:"_encodeData",value:function(){var t=this,e=Object.keys(this._data).map(function(e){return encodeURIComponent(t._shouldCipher?h.encode(e):e)+"="+encodeURIComponent(t._shouldCipher?h.encode(t._data[e]):t._data[e])});return e=this.dataPostProcessing(e),e.join("&")}},{key:"dataPostProcessing",value:function(t){return t}}]),t}();e.a=d},function(t,e,n){"use strict";function r(t){for(var e=[],r=t;r&&!n.i(u.d)(r,"html","head","body");)e.push(r),r=r.parentElement;e.reverse();var o=t.querySelectorAll("*");return e.concat(i()(o))}var o=n(6),i=n.n(o),u=n(50);e.a=r;n(0).get("util:dom:get_all_elements_in_hierarchy")},function(t,e,n){var r=n(44),o=n(18),i=n(69),u=n(47),a=n(105),c=n(29),f=Object.prototype,s=f.hasOwnProperty,l=i(function(t,e){if(a(e)||u(e))return void o(e,c(e),t);for(var n in e)s.call(e,n)&&r(t,n,e[n])});t.exports=l},function(t,e,n){function r(t){return t&&t.length?o(t):[]}var o=n(76);t.exports=r},function(t,e){function n(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}t.exports=n},function(t,e,n){(function(t){function r(t,e){if(e)return t.slice();var n=t.length,r=f?f(n):new t.constructor(n);return t.copy(r),r}var o=n(28),i="object"==typeof e&&e&&!e.nodeType&&e,u=i&&"object"==typeof t&&t&&!t.nodeType&&t,a=u&&u.exports===i,c=a?o.Buffer:void 0,f=c?c.allocUnsafe:void 0;t.exports=r}).call(e,n(205)(t))},function(t,e,n){function r(t){return"function"!=typeof t.constructor||u(t)?{}:o(i(t))}var o=n(171),i=n(91),u=n(105);t.exports=r},function(t,e){function n(){return!1}t.exports=n},function(t,e){function n(){return!1}t.exports=n},function(t,e,n){var r=n(176),o=n(111),i=o(function(t,e){return null==t?{}:r(t,e)});t.exports=i},function(t,e,n){function r(t,e,n,r){if(!a(t))return t;e=i(e,t);for(var f=-1,s=e.length,l=s-1,p=t;null!=p&&++f<s;){var h=c(e[f]),d=n;if(f!=l){var _=p[h];d=r?r(_,h,p):void 0,void 0===d&&(d=a(_)?_:u(e[f+1])?[]:{})}o(p,h,d),p=p[h]}return t}var o=n(44),i=n(23),u=n(92),a=n(14),c=n(34);t.exports=r},function(t,e,n){function r(t,e,n){e=o(e,t);for(var r=-1,s=e.length,l=!1;++r<s;){var p=f(e[r]);if(!(l=null!=t&&n(t,p)))break;t=t[p]}return l||++r!=s?l:!!(s=null==t?0:t.length)&&c(s)&&a(p,s)&&(u(t)||i(t))}var o=n(23),i=n(54),u=n(9),a=n(92),c=n(93),f=n(34);t.exports=r},function(t,e,n){function r(t){return i(t)&&o(t)}var o=n(47),i=n(39);t.exports=r},function(t,e){function n(t){return t}t.exports=n},function(t,e,n){function r(t){if(!u(t)||o(t)!=a)return!1;var e=i(t);if(null===e)return!0;var n=l.call(e,"constructor")&&e.constructor;return"function"==typeof n&&n instanceof n&&s.call(n)==p}var o=n(53),i=n(91),u=n(39),a="[object Object]",c=Function.prototype,f=Object.prototype,s=c.toString,l=f.hasOwnProperty,p=s.call(Object);t.exports=r},function(t,e){function n(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}t.exports=n},function(t,e,n){"use strict";function r(t,e){return(Element.prototype.matches||Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(t){var e=this,n=(this.document||this.ownerDocument).querySelectorAll(t);return i()(n).some(function(t){return t===e})}).call(t,e)}var o=n(6),i=n.n(o);e.a=r;n(0).get("util:dom:matches_selector")},,function(t,e,n){var r=n(28),o=r.Symbol;t.exports=o},function(t,e){function n(t,e,n){for(var r=n-1,o=t.length;++r<o;)if(t[r]===e)return r;return-1}t.exports=n},function(t,e){function n(){return[]}t.exports=n},function(t,e,n){function r(){if(!arguments.length)return[];var t=arguments[0];return o(t)?t:[t]}var o=n(9);t.exports=r},function(t,e,n){function r(t,e){return!!(null==t?0:t.length)&&o(t,e,0)>-1}var o=n(117);t.exports=r},function(t,e){function n(){return!1}t.exports=n},function(t,e,n){function r(t){return i(t)?u(t):o(t)}var o=n(230),i=n(121),u=n(237);t.exports=r},function(t,e,n){function r(t,e,n){var r=null==t?0:t.length;if(!r)return-1;var c=null==n?0:u(n);return c<0&&(c=a(r+c,0)),o(t,i(e,3),c)}var o=n(231),i=n(33),u=n(125),a=Math.max;t.exports=r},function(t,e){function n(t){return t}t.exports=n},function(t,e){function n(t){return t}t.exports=n},function(t,e,n){function r(t){return null==t?[]:o(t,i(t))}var o=n(232),i=n(29);t.exports=r},function(t,e){function n(){return!1}t.exports=n},function(t,e,n){"use strict";function r(){return["/","/","a","d",".","d","o","u","b","l","e","c","l","i","c","k",".","n","e","t","/","d","d","m","/","a","d","/",o(),"/",";","o","r","d","=",Date.now(),"?"].join("")}function o(){return u()(n.i(a.a)(1,5),function(){return n.i(a.b)(2,11)}).join("/")}var i=n(113),u=n.n(i),a=n(22);e.a=r;n(0).get("config:network_test_uri")},function(t,e,n){"use strict";var r=n(255);n(0).get("detection:adblocker:generic:ublock:index");e.a=[r.a]},function(t,e,n){"use strict";var r=n(256);n(0).get("detection:adblocker:generic:ublock_origin:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t){var e=t.document,r=n.i(u.d)(e,function(t){return u.b.ONLY_DISPLAY_NONE.test(t.cssText)}),a=1===r.length&&r[0].cssRules.length<200?r:[];return n.i(o.b)(e,i.b.ADBLOCK,a)}var o=n(20),i=n(7),u=n(17);e.a=r;n(0).get("detection:artifact:chrome:adblock")},function(t,e,n){"use strict";function r(t){var e=t.document,r=n.i(u.d)(e,function(t){return u.b.ONLY_DISPLAY_NONE.test(t.cssText)}),a=1===r.length&&r[0].cssRules.length<200?r:[];return n.i(o.b)(e,i.b.ADBLOCK_PLUS,a)}var o=n(20),i=n(7),u=n(17);e.a=r;n(0).get("detection:artifact:chrome:adblock_plus")},function(t,e,n){"use strict";function r(t){var e=t.document,r=n.i(u.d)(e,function(t){return u.b.ONLY_DISPLAY_NONE.test(t.cssText)}),a=2===r.length||3===r.length?r:[];return n.i(o.b)(e,i.b.ADGUARD,a)}var o=n(20),i=n(7),u=n(17);e.a=r;n(0).get("detection:artifact:chrome:adguard")},function(t,e,n){"use strict";function r(t){var e=t.document,r=o(e,n.i(b.b)()),a=o(e);return e.body.appendChild(r),e.body.appendChild(a),new _["default"](function(e){i(t,r)&&n.i(v.b)(r)&&!n.i(v.b)(a)?window.setTimeout(function(){window.setTimeout(function(){e(n.i(v.b)(r))},300)},1):e(!1)}).then(function(n){return r.parentElement&&e.body.removeChild(r),a.parentElement&&e.body.removeChild(a),u(n,t)})}function o(t,e){var n=t.createElement("div");return n.className=e||"",n.style.width="1px",n.style.height="1px",n.style.position="absolute",n.style.top="-9999px",n}function i(t,e){return((t.getComputedStyle(e)||{}).MozBinding||"").indexOf("abp-elemhide")>-1}function u(t,e){return new h.a(h.b.ADBLOCK_PLUS,t,a.bind(null,e))}function a(t){for(var e=arguments.length,r=Array(e>1?e-1:0),o=1;o<e;o++)r[o-1]=arguments[o];var u=p()(r,function(t){return n.i(y.a)(t)}).filter(function(e){return i(t,e)}).map(function(t){return new d.a(d.b.MOZ,t,c(t))});return s()(u,function(t){return t.element})}function c(t){return t.nodeName.toLowerCase()+"#"+t.id+"."+t.className}var f=n(154),s=n.n(f),l=n(60),p=n.n(l),h=n(7),d=n(63),_=n(2),y=n(99),b=n(80),v=n(16);e.a=r;n(0).get("detection:artifact:firefox:adblock_plus")},function(t,e,n){"use strict";function r(t){var e=t.document,r=n.i(u.a)(e,function(t){return u.b.ONLY_DISPLAY_NONE.test(t.cssText)}),a=(2===r.length||3===r.length)&&r[0].cssRules.length>300?r:[];return n.i(o.b)(e,i.b.ADGUARD,a)}var o=n(20),i=n(7),u=n(17);e.a=r;n(0).get("detection:artifact:firefox:adguard")},function(t,e,n){"use strict";function r(t){return n.i(E.d)(t.document,function(e){var n=c(e);return new g.a(g.b.UBLOCK_ORIGIN,i(t,e)&&null!=n,o.bind(null,t,n))})}function o(t,e){for(var r=arguments.length,o=Array(r>2?r-2:0),u=2;u<r;u++)o[u-2]=arguments[u];var c=b()(o,function(t){return n.i(m.a)(t)}).filter(function(n){return i(t,n)||f(t,e,n)}).map(function(t){return new v.a(v.b.STYLE,t,a(t))});return _()(c,function(t){return t.element})}function i(t,e){return u(t,e)&&e.hidden}function u(t,e){return"none"===((t.getComputedStyle(e)||{}).display||"")}function a(t){return t.nodeName.toLowerCase()+"#"+t.id+"."+t.className}function c(t){var e=h()(t.attributes,function(t){return-1===O.indexOf(t.name)&&""===t.value});return e?e.name:null}function f(t,e,n){return u(t,n)&&l()(n.attributes).some(function(t){return t.name===e})}var s=n(6),l=n.n(s),p=n(52),h=n.n(p),d=n(154),_=n.n(d),y=n(60),b=n.n(y),v=n(63),g=n(7),m=n(99),E=n(81);e.a=r;var O=(n(0).get("detection:artifact:firefox:ublock_origin_1_11"),["id","class","hidden"])},function(t,e,n){"use strict";function r(t){return new o.a(o.b.ADBLOCK_PLUS,"0"===t.document.body.getAttribute("abp"))}var o=n(7);e.a=r;n(0).get("detection:artifact:internet_explorer:adblock_plus")},function(t,e,n){"use strict";function r(t){return new o["default"](function(e){var r=t.document.createElement("div");r.className=n.i(u.b)(),t.document.body.appendChild(r),t.setTimeout(function(){var n="none"===r.style.display;t.document.body.removeChild(r),e(new i.a(i.b.OPERA,n))},1)})}var o=n(2),i=n(7),u=n(80);e.a=r;var a=(n(0).get("detection:artifact:opera:index"),[r]);e.b=a},function(t,e,n){"use strict";function r(t){var e=t.document,r=n.i(u.a)(e,function(t){return u.b.DISPLAY_NONE_AND_ORPHAN.test(t.cssText)});return n.i(o.b)(e,i.b.ADBLOCK,r)}var o=n(20),i=n(7),u=n(17);e.a=r;n(0).get("detection:artifact:safari:adblock")},function(t,e,n){"use strict";function r(t){var e=t.document,r=n.i(u.a)(e,function(t){return u.b.ONLY_DISPLAY_NONE.test(t.cssText)}),a=1===r.length&&r[0].cssRules.length>50&&r[0].cssRules.length<200?r:[];return n.i(o.b)(e,i.b.ADBLOCK_PLUS,a)}var o=n(20),i=n(7),u=n(17);e.a=r;n(0).get("detection:artifact:safari:adblock_plus")},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(){return d+Date.now().toString()}var a=n(83),c=n(2),f=n(82),s=n(1);e.a=u;var l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},h=(n(0).get("detection:interference:image_ajax_network_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,null,[{key:"getSchema",value:function(){return p(e.__proto__||Object.getPrototypeOf(e),"getSchema",this).call(this).addAttribute(s.c.AJAX)}},{key:"testMethod",value:function(){var t=u();return c["default"].resolve(p(e.__proto__||Object.getPrototypeOf(e),"testMethod",this).call(this,t)).then(function(e){return e.has(s.a.NOT_PRESENT)?e:n.i(f.a)(t).then(function(t){return t.blocked||t.succeeded?e.addAttribute(t.reasonAttribute,t.infoAttributes):e.addAttribute(s.a.NOT_PRESENT,t.reasonAttribute,t.infoAttributes).removeAttribute(s.a.PRESENT)})})}}]),e}(a.a));e.b=h;var d=["/","/","0","9","1","4",".","g","l","o","b","a","l",".","s","s","l",".","f","a","s","t","l","y",".","n","e","t","/","a","d","2","/","i","m","g","/","x",".","g","i","f","?","c","b","="].join("")},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){return t+"?cb="+Date.now()}function a(t,e){var n=document.createElement("script");return new l["default"](function(r){n.addEventListener("load",function(n){r(t.createResult(d.a.NOT_PRESENT,d.f.NO_LOAD_BLOCK,new d.g(e),new s.a(n)))}),n.addEventListener("error",function(n){r(t.createResult(d.a.PRESENT,d.f.LOAD_BLOCK,new d.g(e),new s.a(n)))}),h.a.safari()&&window.setTimeout(function(){r(t.createResult(d.a.NOT_PRESENT,d.f.TIMEOUT,new d.g(e)))},1e4),n.src=e,document.body.appendChild(n)}).then(function(t){return n.parentElement&&n.parentElement.removeChild(n),t})}var c=n(3),f=n(4),s=n(143),l=n(2),p=n(82),h=n(15),d=n(1),_=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),y=(n(0).get("detection:interference:script_network_test"),["/","/","d","3","u","j","i","d","s6","8","p","6x","m","q",".","c","l","o","ud","f","r","o","n","t",".","ne","t","/","x",".","j","s"].join("")),b=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),_(e,null,[{key:"getSchema",value:function(){return new f.a(d.b.INTERFERENCE,d.c.INFERENCE,d.c.SCRIPT,d.c.AJAX,d.c.NETWORK)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,e=u(t);return a(this.getSchema(),e).then(function(t){return t.has(d.a.NOT_PRESENT)?t:n.i(p.a)(e).then(function(e){return e.blocked||e.succeeded?t.addAttribute(e.reasonAttribute,e.infoAttributes):t.addAttribute(d.a.NOT_PRESENT,e.reasonAttribute,e.infoAttributes).removeAttribute(d.a.PRESENT)})})}}]),e}(c.b);e.a=b},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(57),a=(n(0).get("detection:test_result:attribute:data:event"),function(t){function e(t){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))}return i(e,t),e}(u.a));e.a=a},function(t,e,n){"use strict";function r(t){var e={};for(var n in u)!function(n){e[n]=t.filter(function(t){return u[n](t)})}(n);return e}var o=n(57),i=n(1);e.a=r;var u=(n(0).get("detection:test_result:attribute:group_attributes_by_type"),{types:i.l,tests:i.m,reasons:i.n,results:i.d,info:i.o,data:function(t){return t instanceof o.a}})},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=n(72),i=n.n(o),u=n(21),a=n.n(u),c=n(155),f=n.n(c),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("detection:test_result:core"),function(){function t(){r(this,t);for(var e=arguments.length,n=Array(e),o=0;o<e;o++)n[o]=arguments[o];this.attributes=f()(a()(i()(n)),function(t,e){return t.is(e)})}return s(t,[{key:"has",value:function(){for(var t=this,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return n.every(function(e){return t.attributes.some(function(t){return t.is(e)})})}}]),t}());e.a=l},function(t,e,n){"use strict";function r(){for(var t=n.i(i.a)(0,5),e=[],r=0;r<t;r++){var a=u[n.i(i.a)(0,u.length)];e.push(new o.b(a))}return e}var o=n(87),i=n(22);e.a=r;var u=(n(0).get("util:dom:get_elements_from_selector:consumers:generate_random_element_records"),["li","span","div"])},function(t,e,n){"use strict";function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document;try{e.querySelector(t)}catch(e){throw n.i(a.a)(t.toString())}var r=n.i(u.a)(new i.a(t.trim())).generateElementHierarchy(e);return o(t,r,e),r}function o(t,e,r){var o=r.createElement("div");if(e.forEach(function(t){o.appendChild(t)}),!(null!=o.querySelector(t)))throw n.i(a.b)(t)}var i=n(316),u=n(311),a=n(43);e.a=r;n(0).get("util:dom:get_elements_from_selector:index")},function(t,e,n){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document;return new o["default"](function(e){function r(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,u=t.createElement("div");u.style.setProperty("display","block","important"),u.style.setProperty("height","10px","important"),t.body.appendChild(u),n.i(i.b)(t.body)&&o-- >0?(u.parentElement&&t.body.removeChild(u),setTimeout(function(){r(o)},100)):(u.parentElement&&t.body.removeChild(u),e())}"loading"===t.readyState?t.addEventListener("DOMContentLoaded",function(){r()}):r()})}var o=n(2),i=n(16);e.a=r;n(0).get("util:dom:ready")},function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t){return function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),e}(t)}var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=(n(0).get("util:mixin"),function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u;i(this,t),this._toCallback=e,this._mixinClasses=[]}return a(t,[{key:"to",value:function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var o=this._toCallback.apply(this,[t].concat(n));return this._mixinClasses.push(o),o}},{key:"test",value:function(t){var e=t.hasOwnProperty("prototype")?t.prototype:t;return this._mixinClasses.some(function(n){return e instanceof n||t===n})}}]),t}());e.a=c},function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",function(){return a}),n.d(e,"b",function(){return c});var u=(n(0).get("util:network_event"),function t(e,n){i(this,t),this.src=e,this.tagName=n}),a=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),e}(u),c=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),e}(u)},function(t,e){function n(t,e,n){var r=-1,o=t.length;e<0&&(e=-e>o?0:o+e),n=n>o?o:n,n<0&&(n+=o),o=e>n?0:n-e>>>0,e>>>=0;for(var i=Array(o);++r<o;)i[r]=t[r+e];return i}t.exports=n},function(t,e,n){var r=n(66),o=r(Object.keys,Object);t.exports=o},function(t,e){function n(t){var e=null==t?0:t.length;return e?t[e-1]:void 0}t.exports=n},function(t,e,n){function r(t,e){return t&&t.length?i(t,o(e,2)):[]}var o=n(33),i=n(76);t.exports=r},function(t,e,n){function r(t,e){return e="function"==typeof e?e:void 0,t&&t.length?o(t,void 0,e):[]}var o=n(76);t.exports=r},,function(t,e,n){function r(t){return o(2,t)}var o=n(346);t.exports=r},function(t,e,n){"use strict";var r=n(19),o=n.n(r),i=n(242),u=n(244),a=n(247),c=n(129),f=n(130);n(0).get("detection:adblocker:chrome:index");e.a=o()([i.a,u.a,a.a,c.a,f.a])},function(t,e,n){"use strict";var r=n(19),o=n.n(r),i=n(249),u=n(251),a=n(253),c=n(130);n(0).get("detection:adblocker:firefox:index");e.a=o()([i.a,u.a,a.a,c.a])},function(t,e,n){"use strict";var r=n(19),o=n.n(r),i=n(258);n(0).get("detection:adblocker:internet_explorer:index");e.a=o()([i.a])},function(t,e,n){"use strict";var r=n(19),o=n.n(r),i=n(259);n(0).get("detection:adblocker:opera:index");e.a=o()([i.a])},function(t,e,n){"use strict";var r=n(19),o=n.n(r),i=n(261),u=n(263),a=n(129);n(0).get("detection:adblocker:safari:index");e.a=o()([i.a,u.a,a.a])},function(t,e,n){"use strict";function r(t,e){function n(t){try{return t&&t.timeStamp?t.timeStamp:window.performance.now()}catch(t){return Date.now()}}var r=document.createElement("a");if(r.href=t,"https:"===window.location.protocol&&r.protocol!==window.location.protocol)return void e(!1,!1,r.protocol,c);var f=new XMLHttpRequest;try{f.open("GET",t)}catch(t){return void e(!0,!1,t.toString(),u,f)}var s=void 0,l=void 0;f.onloadstart=function(t){s=n(t)},f.onreadystatechange=function(t){if(4===this.readyState){l=n(t)-s;var r=0===this.status,u="2"===this.status.toString()[0],a=u?i:o;return void e(r,u,this.status+"::"+l,a,f)}};try{f.send()}catch(t){return void e(!0,!1,t.toString(),a,f)}}n.d(e,"a",function(){return o}),n.d(e,"d",function(){return i}),n.d(e,"b",function(){return u}),n.d(e,"c",function(){return a}),n.d(e,"e",function(){return c}),e.f=r;var o=(n(0).get("detection:interference:ajax_network_test:core"),"n"),i="nx",u="xo",a="xs",c="p"},function(t,e,n){"use strict";function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document,n=e.createElement("style");e.head.appendChild(n);var r=o(t),i=r+" { no_affect_rule: 0; }";n.sheet&&"function"==typeof n.sheet.insertRule?n.sheet.insertRule(i,0):n.innerHTML=i;var u=n.sheet&&n.sheet.cssRules&&"function"==typeof n.sheet.cssRules.item?n.sheet.cssRules.item(0).selectorText:null;return n.parentElement&&n.parentElement.removeChild(n),u}function o(t){return t.replace(/::content/g,"").trim()}e.a=r,e.b=o;n(0).get("util:css:normalize_selector")},function(t,e){function n(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}t.exports=n},function(t,e,n){function r(t,e){return o(t,e)}var o=n(326);t.exports=r},function(t,e,n){"use strict";function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(72),u=n.n(i),a=n(155),c=n.n(a),f=n(52),s=n.n(f),l=n(350),p=n.n(l),h=n(300),d=n(10),_=n(84),y=n(241),b=n(158),v=n(286),g=n(148),m=n(159),E=n(288),O=n(282),w=n(275),T=n(284),S=n(271),R=n(160),P=n(290),k=n(161),j=n(162),A=n(292),N=n(296),C=n(15),x=n(1),I=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),L=(n(0).get("detection:index"),function(){function t(e,r){o(this,t),this._options=p()({},e||{},{useInterference:!1,useDFPInterference:!1,useGenericAdblocker:!0,useAdblocker:!0,runImmediately:!1,internal:{}}),this._options.internal=p()({},this._options.internal,{useInterference:!1,useDFPInterference:!1,useGenericAdblocker:!0,useAdblocker:!0}),this._testClasses=r||[N.a,T.a,S.a,O.a,y.a,C.a.chrome()?b.a:[],C.a.firefox()?m.a:[],C.a.safari()?j.a:[],C.a.ie()?R.a:[],C.a.opera()?k.a:[],C.a.chrome()?v.a:[],C.a.firefox()?E.a:[],C.a.safari()?A.a:[],C.a.ie()?P.a:[],n.i(w.a)()],this.rerun()}return I(t,[{key:"rerun",value:function(){var t=this,e=new(Function.prototype.bind.apply(h.a,[null].concat(r(this._testClasses))));return this._runner=e,this._options.runImmediately?this._runner.run():n.i(g.a)().then(function(){t._runner===e&&t._runner.run()}),this}},{key:"serializeResults",value:function(){return this._runner.waitForResultsWhere().then(function(t){return t.join("|")})}},{key:"isStandingDown",value:function(){return this._runner.someResultPresentWhere(function(t){return t.has(x.b.STAND_DOWN)})}},{key:"isInterfering",value:function(){return this._isNotStandDownAnd(this._runner.someResultPresentWhere(function(t){return t.has(x.b.INTERFERENCE)||t.has(x.b.GENERIC_ADBLOCKER)||t.has(x.b.ADBLOCKER)}))}},{key:"isDFPInterfering",value:function(){return this._isNotStandDownAnd(this._runner.someResultPresentWhere(function(t){return t.has(x.b.DFP_INTERFERENCE)}))}},{key:"allowsAcceptableAds",value:function(){var t=this;return this.isContentBlockerPresent().then(function(e){return e&&t._runner.someResultPresentWhere(function(t){return t.has(x.b.ACCEPTABLE_AD)})})}},{key:"isFSM",value:function(){return this._isNotStandDownAnd(this._runner.waitForResultsWhere(function(t){return t.has(x.c.FSM)}).then(function(t){return t.some(function(t){return!t.has(x.a.NOT_PRESENT)})}))}},{key:"isPrivate",value:function(){return this._isNotStandDownAnd(this._runner.someResultPresentWhere(function(t){return t.has(x.b.PRIVATE)}))}},{key:"isContentBlockerPresent",value:function(){return this._isContentBlockerPresent(this._options)}},{key:"internalIsContentBlockerPresent",value:function(){return this._isContentBlockerPresent(this._options.internal)}},{key:"getContentBlocker",value:function(){var t=this;return this.isContentBlockerPresent().then(function(e){return e?t._runner.waitForResultsWhere(function(t){return t.has(x.b.ADBLOCKER)}).then(function(t){var e=void 0,r=s()(t,function(t){return!t.has(x.a.NOT_PRESENT)});return r&&(e=s()(r.attributes,function(t){return n.i(x.d)(t)&&t!==x.a.PRESENT})),e||x.a.UNKNOWN_ADBLOCKER}):null})}},{key:"getFSMData",value:function(){return this._runner.waitForResultsWhere(function(t){return t.has(x.c.FSM)}).then(function(t){return s()(t.map(function(t){return t.getData(_.a)}),function(t){return null!=t})||null})}},{key:"getAllElementHidingData",value:function(){return this._runner.waitForResultsWhere(function(t){return t.has(x.c.HIDING_DATA)}).then(function(t){return c()(u()(t.map(function(t){return t.getData(d.a)})),function(t,e){return t.is(e)})})}},{key:"_isContentBlockerPresent",value:function(t){return this._isNotStandDownAnd(this._runner.someResultPresentWhere(function(e){return t.useInterference&&e.has(x.b.INTERFERENCE)||t.useDFPInterference&&e.has(x.b.DFP_INTERFERENCE)||t.useGenericAdblocker&&e.has(x.b.GENERIC_ADBLOCKER)||t.useAdblocker&&e.has(x.b.ADBLOCKER)}))}},{key:"_isNotStandDownAnd",value:function(t){return this.isStandingDown().then(function(e){return!e&&t})}}]),t}());e.a=L},function(t,e,n){"use strict";n(0).get("util:logger:levels");e.a=["DEBUG","INFO","TIME","WARN","ERROR","OFF"]},function(t,e,n){var r=n(28),o=r.Uint8Array;t.exports=o},function(t,e,n){function r(t,e,n,N,C,x){var I,L=e&w,D=e&T,M=e&S;if(n&&(I=C?n(t,N,C,x):n(t)),void 0!==I)return I;if(!E(t))return t;var B=g(t);if(B){if(I=y(t),!L)return s(t,I)}else{var F=_(t),U=F==P||F==k;if(m(t))return f(t,L);if(F==j||F==R||U&&!C){if(I=D||U?{}:v(t),!L)return D?p(t,c(I,t)):l(t,a(I,t))}else{if(!A[F])return C?t:{};I=b(t,F,r,L)}}x||(x=new o);var G=x.get(t);if(G)return G;x.set(t,I);var H=M?D?d:h:D?keysIn:O,K=B?void 0:H(t);return i(K||t,function(o,i){K&&(i=o,o=t[i]),u(I,i,r(o,e,n,i,t,x))}),I}var o=n(68),i=n(319),u=n(44),a=n(323),c=n(324),f=n(103),s=n(65),l=n(329),p=n(330),h=n(152),d=n(165),_=n(77),y=n(341),b=n(342),v=n(104),g=n(9),m=n(70),E=n(14),O=n(29),w=1,T=2,S=4,R="[object Arguments]",P="[object Function]",k="[object GeneratorFunction]",j="[object Object]",A={};A[R]=A["[object Array]"]=A["[object ArrayBuffer]"]=A["[object DataView]"]=A["[object Boolean]"]=A["[object Date]"]=A["[object Float32Array]"]=A["[object Float64Array]"]=A["[object Int8Array]"]=A["[object Int16Array]"]=A["[object Int32Array]"]=A["[object Map]"]=A["[object Number]"]=A[j]=A["[object RegExp]"]=A["[object Set]"]=A["[object String]"]=A["[object Symbol]"]=A["[object Uint8Array]"]=A["[object Uint8ClampedArray]"]=A["[object Uint16Array]"]=A["[object Uint32Array]"]=!0,A["[object Error]"]=A[P]=A["[object WeakMap]"]=!1,t.exports=r},function(t,e,n){var r=n(14),o=Object.create,i=function(){function t(){}return function(e){if(!r(e))return{};if(o)return o(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}();t.exports=i},function(t,e){function n(t,e){return null!=t&&e in Object(t)}t.exports=n},function(t,e,n){function r(t){return!(!u(t)||i(t))&&(o(t)?d:f).test(a(t))}var o=n(31),i=n(187),u=n(14),a=n(197),c=/[\\^$.*+?()[\]{}|]/g,f=/^\[object .+?Constructor\]$/,s=Function.prototype,l=Object.prototype,p=s.toString,h=l.hasOwnProperty,d=RegExp("^"+p.call(h).replace(c,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=r},function(t,e,n){function r(t,e,n,s,l){t!==e&&u(e,function(u,f){if(c(u))l||(l=new o),a(t,e,f,n,r,s,l);else{var p=s?s(t[f],u,f+"",t,e,l):void 0;void 0===p&&(p=u),i(t,f,p)}},f)}var o=n(68),i=n(88),u=n(89),a=n(175),c=n(14),f=n(36);t.exports=r},function(t,e,n){function r(t,e,n,r,v,g,m){var E=t[n],O=e[n],w=m.get(O);if(w)return void o(t,n,w);var T=g?g(E,O,n+"",t,e,m):void 0,S=void 0===T;if(S){var R=s(O),P=!R&&p(O),k=!R&&!P&&y(O);T=O,R||P||k?s(E)?T=E:l(E)?T=a(E):P?(S=!1,T=i(O,!0)):k?(S=!1,T=u(O,!0)):T=[]:_(O)||f(O)?(T=E,f(E)?T=b(E):(!d(E)||r&&h(E))&&(T=c(O))):S=!1}S&&(m.set(O,T),v(T,O,r,g,m),m["delete"](O)),o(t,n,T)}var o=n(88),i=n(103),u=n(180),a=n(65),c=n(104),f=n(54),s=n(9),l=n(110),p=n(70),h=n(31),d=n(14),_=n(112),y=n(106),b=n(203);t.exports=r},function(t,e,n){function r(t,e){return o(t,e,function(e,n){return i(t,n)})}var o=n(177),i=n(198);t.exports=r},function(t,e,n){function r(t,e,n){for(var r=-1,a=e.length,c={};++r<a;){var f=e[r],s=o(t,f);n(s,f)&&i(c,u(f,t),s)}return c}var o=n(71),i=n(108),u=n(23);t.exports=r},function(t,e,n){function r(t,e){return e=o(e,t),null==(t=u(t,e))||delete t[a(i(e))]}var o=n(23),i=n(153),u=n(343),a=n(34);t.exports=r},function(t,e,n){function r(t){var e=new t.constructor(t.byteLength);return new o(e).set(new o(t)),e}var o=n(169);t.exports=r},function(t,e,n){function r(t,e){var n=e?o(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}var o=n(179);t.exports=r},function(t,e){function n(t){return function(e,n,r){for(var o=-1,i=Object(e),u=r(e),a=u.length;a--;){var c=u[t?a:++o];if(!1===n(i[c],c,i))break}return e}}t.exports=n},function(t,e,n){var r=n(184),o=function(){try{var t=r(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();t.exports=o},function(t,e,n){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(e,n(204))},function(t,e){function n(t,e){return null==t?void 0:t[e]}t.exports=n},function(t,e,n){function r(t,e){if(o(t))return!1;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!i(t))||(a.test(t)||!u.test(t)||null!=e&&t in Object(e))}var o=n(9),i=n(127),u=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,a=/^\w*$/;t.exports=r},function(t,e,n){var r=n(90),o=n(31),i=n(202),u=r?o:i;t.exports=u},function(t,e,n){function r(t){return!!i&&i in t}var o=n(90),i=function(){var t=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();t.exports=r},function(t,e){function n(){this.__data__=[],this.size=0}t.exports=n},function(t,e,n){function r(t){var e=this.__data__,n=o(e,t);return!(n<0)&&(n==e.length-1?e.pop():u.call(e,n,1),--this.size,!0)}var o=n(30),i=Array.prototype,u=i.splice;t.exports=r},function(t,e,n){function r(t){var e=this.__data__,n=o(e,t);return n<0?void 0:e[n][1]}var o=n(30);t.exports=r},function(t,e,n){function r(t){return o(this.__data__,t)>-1}var o=n(30);t.exports=r},function(t,e,n){function r(t,e){var n=this.__data__,r=o(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this}var o=n(30);t.exports=r},function(t,e){function n(t){return t}t.exports=n},function(t,e,n){function r(t,e,n){return e=i(void 0===e?t.length-1:e,0),function(){for(var r=arguments,u=-1,a=i(r.length-e,0),c=Array(a);++u<a;)c[u]=r[e+u];u=-1;for(var f=Array(e+1);++u<e;)f[u]=r[u];return f[e]=n(c),o(t,this,f)}}var o=n(102),i=Math.max;t.exports=r},function(t,e){function n(t){return t}t.exports=n},function(t,e,n){var r=n(193),o=/^\./,i=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,u=/\\(\\)?/g,a=r(function(t){var e=[];return o.test(t)&&e.push(""),t.replace(i,function(t,n,r,o){e.push(r?o.replace(u,"$1"):n||t)}),e});t.exports=a},function(t,e){function n(t){if(null!=t){try{return o.call(t)}catch(t){}try{return t+""}catch(t){}}return""}var r=Function.prototype,o=r.toString;t.exports=n},function(t,e,n){function r(t,e){return null!=t&&i(t,e,o)}var o=n(172),i=n(109);
t.exports=r},function(t,e,n){function r(t){if(i(t))throw new Error(u);return o(t)}var o=n(173),i=n(186),u="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.";t.exports=r},function(t,e){function n(t,e){for(var n=-1,r=null==t?0:t.length,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}t.exports=n},function(t,e,n){var r=n(174),o=n(69),i=o(function(t,e,n){r(t,e,n)});t.exports=i},function(t,e){function n(){return!1}t.exports=n},function(t,e,n){function r(t){return o(t,i(t))}var o=n(18),i=n(36);t.exports=r},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},,function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(226),a=n(13),c=n(2),f=n(25),s=n(5);n.d(e,"AdblockBeacon",function(){return y});var l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},h=n(0).get("analytics:pageview_beacon"),d=n(38),_=n(46),y=function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,d.BEACON));return c["default"].all([t.isInterfering().then(function(t){n._isInterfering=t}),t.isDFPInterfering().then(function(t){n._isDFPInterfering=t}),t.isContentBlockerPresent().then(function(t){n._isContentBlockerPresent=t}),t.isPrivate().then(function(t){n._isPrivate=t}),t.isFSM().then(function(t){n._isFSM=t}),t.serializeResults().then(function(t){n._serializedResults=t}),t.allowsAcceptableAds().then(function(t){n._allowsAcceptableAds=t})]).then(function(){n.send()}),n}return i(e,t),l(e,[{key:"populateBeaconFields",value:function(){p(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"populateBeaconFields",this).call(this),this.set(_.SENTINEL_FLAG,1),this._isInterfering||this._isDFPInterfering?this.set(_.ADBLOCK_DETECTED,1):null!=this._isInterfering&&null!=this._isDFPInterfering&&this.set(_.ADBLOCK_DETECTED,0),null!=this._serializedResults&&this.set(_.DEBUG_0,this._serializedResults),null!=this._allowsAcceptableAds&&this.set(_.EXCEPTION_RULES,this._allowsAcceptableAds?1:0);var t=[this._isInterfering,this._isContentBlockerPresent,this._isPrivate,this._isFSM,this._isDFPInterfering].map(function(t){return null==t?-1:t?1:0}).join("::");this.set(_.DEBUG_2,t)}},{key:"send",value:function(t){p(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"send",this).call(this,function(e){if(null!=e&&s["default"].has(["msg","domain"])){var n=e;if(n.target&&"string"==typeof n.target.src){var r=n.target.src,o=new f.a(r);o.hostname=s["default"].get(["msg","domain"]),o.pathname="/pv";var i=new Image;i.src=o.toString(),h.info("firing msg pv error beacon",i.src)}}t&&(e?t(e):t())})}}]),e}(u["default"]),b=function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return new y(t),n.on("pagechange",function(){new y(t)}),n}return i(e,t),e}(a.b);e["default"]=b},function(t,e,n){"use strict";function r(t){t.events=t.events||{},t.events.onDetectionComplete=t.events.onDetectionComplete||function(t){n.i(o.a)(t?"sp.blocking":"sp.not_blocking")}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(222);e["default"]=r;n(0).get("backwards_compatibility:config:apply_default_params")},function(t,e,n){"use strict";function r(t){function e(e,r){l()(t,e)&&(l()(t,r)||f()(n,r,a()(t,e)),i()(n,e))}var n=h()(t);return e("account_id","accountId"),e("client_id","clientId"),e("publisher_base","publisherBase"),e("beacon_endpoint",["beacon","pageViewEndpoint"]),e("content_control_beacon_endpoint",["beacon","contentControlEndpoint"]),e("custom_beacon_entries",["beacon","customEntries"]),e("content_control_callback",["bootstrap","contentControlCallback"]),e("content_control_callback",["rid","contentControlCallback"]),e("enable_rid",["rid","enable"]),e("enable_rid_retry",["rid","enableForgivenessCookie"]),e("dfp_targeting_key",["dfp","targetingKey"]),e("enable_vid",["vid","enable"]),e("enable_generic_vid",["vid","enableGeneric"]),e("enable_iframe_vid",["vid","enableInIFrame"]),e("vid_control_callback",["vid","contentControlCallback"]),e("enable_artifact_detection",["detection","exposeSpecificContentBlockerData"]),e("enable_fsm_detection",["detection","fsm","enable"]),e("enable_fsm_network_detection",["detection","fsm","enableNetwork"]),e("fsm_endpoint",["detection","fsm","endpoint"]),e("use_network_detection",["detection","useNetworkBlockerTests"]),e("site_css_url","siteCssLocation"),e("enable_blocker_style_sheet_disabling","disableBlockerStyleSheets"),e("disable_blocker_style_sheets","disableBlockerStyleSheets"),e("run_immediately","runImmediately"),e("mms_domain",["msg","domain"]),e("mms_client_data_callback",["events","onReceiveMessageData"]),e("mms_choice_selected_callback",["events","onMessageChoiceSelect"]),e("msg_z_index",["msg","zIndex"]),e("enable_style_manager",["styleManager","enable"]),e("enable_simple_style_manager",["styleManager","enableSimple"]),e("enable_full_morph",["styleManager","enableMorphingOutsideAdHierarchy"]),e("smart_lib_url",["smart","libURL"]),e("smart_targeting_key",["smart","targetingKey"]),i()(n,"rid_asset_base"),i()(n,"gpt_auto_load"),i()(n,"converge_recovery_domain"),i()(n,"msg_lib_location"),i()(n,"smart_auto_load"),n}Object.defineProperty(e,"__esModule",{value:!0});var o=n(376),i=n.n(o),u=n(372),a=n.n(u),c=n(375),f=n.n(c),s=n(374),l=n.n(s),p=n(371),h=n.n(p);e["default"]=r;n(0).get("backwards_compatibility:config:index")},function(t,e,n){"use strict";function r(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:window.location.search,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:window,c=i()(e),f=r&&new u.a(r).getSearchParam("_sp_scriptVersion");if(!f)return void c(!1);var s=o.document.createElement("script");s.id="_sp_override",s.addEventListener("load",function(){c(!0)}),s.addEventListener("error",function(){c(!1)});var l="latest"===f?"":"-v"+f;s.src=n+"/0/"+f+"/"+t+l+".js",o.document.head?o.document.head.appendChild(s):o.document.documentElement.appendChild(s)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(157),i=n.n(o),u=n(25);e["default"]=r;var a=(n(0).get("delivery:override_script_version"),["h","t","t","p","s",":","/","/","s","p","-","j","s","-","r","e","l","e","a","s","e","s",".","s","3",".","a","m","a","z","o","n","a","w","s",".","c","o","m"].join(""))},function(t,e,n){n(0).get("delivery:stand_down");window._sp_=window._sp_||{};var r={checkState:function(t){t(!1)},isAdBlocking:function(t){t(!1)},getSafeUri:function(t){return t},pageChange:function(){},setupSmartBeacons:function(){}};t.exports.mockApi=function(t){for(var e=0;e<t.length;e++)window._sp_[t[e]]=r[t[e]]}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){t.forEach(function(t){try{t()}catch(t){p.error("Failed to execute command function",t)}})}Object.defineProperty(e,"__esModule",{value:!0});var a=n(61),c=n.n(a),f=n(2),s=n(5),l=n(13),p=n(0).get("life_cycle:command_queue_feature"),h=function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.resolutionPromise=new f["default"](function(t){var e=s["default"].get("cmd");u(e),Object.defineProperty(e,"push",{get:function(){return function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];u(e)}},set:c.a}),t(!0)}),n}return i(e,t),e}(l.f.to(l.b));e["default"]=h},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){var e=Date.now();t.isContentBlockerPresent().then(function(t){function n(){f.info("triggering on detection complete",t),a["default"].get(["events","onDetectionComplete"])(t)}var r=Date.now(),o=a["default"].get("runImmediately")?0:Math.max(200-(r-e),0);o>0?window.setTimeout(function(){n()},o):n()})}Object.defineProperty(e,"__esModule",{value:!0});var a=n(5),c=n(13),f=n(0).get("life_cycle:events:on_detection_complete_feature"),s=function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.on("pagechange",function(){u(t)}),u(t),n}return i(e,t),e}(c.f.to(c.b));e["default"]=s},function(t,e,n){"use strict";function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t,e){function o(t,e){var n=t[0].map(function(t){return e?new t(e):new t});return u.push.apply(u,r(n)),f["default"].all(n.map(function(t){return t.startPromise})).then(function(){var o=t[1].map(function(t){return e?new t(e):new t});return u.push.apply(u,r(o)),f["default"].all(n.map(function(t){return t.resolutionPromise}).concat(o.map(function(t){return t.resolutionPromise})))})}n.i(p["default"])(l["default"].get(["debug","level"])),b.info("client config",window._sp_.config);var u=[];n.i(h.a)("pageChange",function(){u.forEach(function(t){t.emit("pagechange")})}),n.i(h.a)("scriptName",t),n.i(h.a)("version",_.a),b.info("build version",window._sp_.version),window._sp_._networkListenerData||n.i(h.a)("_networkListenerData",n.i(d.a)());var a=n.i(s.a)(),v=e.filter(function(t){return t.prototype&&t.prototype instanceof y.d}),g=e.filter(function(t){return t.prototype&&t.prototype instanceof y.b}),m=e.filter(function(t){return t.prototype&&t.prototype instanceof y.c}),E=e.filter(function(t){return t.prototype&&t.prototype instanceof y.e});o(i(v)).then(function(){var t=l["default"].get("detection"),e=t.internal,n=new c.a({runImmediately:l["default"].get("runImmediately"),useInterference:t.useNetworkBlockerTests,useDFPInterference:t.useDFPNetworkBlockerTests,useGenericAdblocker:t.useGenericContentBlockerTests,useAdblocker:t.useSpecificContentBlockerTests,internal:{useInterference:e.useNetworkBlockerTests,useDFPInterference:e.useDFPNetworkBlockerTests,useGenericAdblocker:e.useGenericContentBlockerTests,useAdblocker:e.useSpecificContentBlockerTests}});return n.isContentBlockerPresent().then(function(t){a(t)}),o(i(g),n).then(function(){return o(i(m),n)}).then(function(){return o(i(E),n)})})}function i(t){var e=a()(t,function(t){return y.f.test(t)?"1":"0"});return[e[0]||[],e[1]||[]]}Object.defineProperty(e,"__esModule",{value:!0});var u=n(373),a=n.n(u),c=n(167),f=n(2),s=n(359),l=n(5),p=n(78),h=n(11),d=n(362),_=n(32),y=n(13);e["default"]=o;var b=n(0).get("life_cycle:index")},function(t,e,n){n(0).get("util:detect_stand_down_browser");t.exports=function(t){t=(t||navigator.userAgent||navigator.vendor||window.opera).toLowerCase();var e=t.match(/(msie|trident)\s*(\d+)\./),n=e&&window.parseInt(e[2]);return!!n&&n<11}},function(t,e,n){n(0).get("util:force_util_promise");t.exports=function(){var t=window.Promise;delete window.Promise,n(2),window.Promise=t}},,function(t,e){function n(t,e){for(var n=-1,r=null==t?0:t.length,o=0,i=[];++n<r;){var u=t[n];e(u,n,t)&&(i[o++]=u)}return i}t.exports=n},function(t,e){function n(t,e){return t+r(o()*(e-t+1))}var r=Math.floor,o=Math.random;t.exports=n},function(t,e,n){function r(t,e,n){if(n&&"boolean"!=typeof n&&i(t,e,n)&&(e=n=void 0),void 0===n&&("boolean"==typeof e?(n=e,e=void 0):"boolean"==typeof t&&(n=t,t=void 0)),void 0===t&&void 0===e?(t=0,e=1):(t=u(t),void 0===e?(e=t,t=0):e=u(e)),t>e){var r=t;t=e,e=r}if(n||t%1||e%1){var s=f();return c(t+s*(e-t+a("1e-"+((s+"").length-1))),e)}return o(t,e)}var o=n(219),i=n(74),u=n(221),a=parseFloat,c=Math.min,f=Math.random;t.exports=r},function(t,e){function n(t){return t}t.exports=n},function(t,e,n){"use strict";function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document,n=void 0;try{n=new Event(t,{bubbles:!0,cancelable:!1})}catch(e){n=document.createEvent("Event"),"function"==typeof n.initEvent&&n.initEvent(t,!0,!1)}e.dispatchEvent(n)}e.a=r;n(0).get("util:dom:dispatch_event")},function(t,e,n){n(0).get("config:config");t.exports={bugsnagKey:"00eac706c084cf17802b8cba591a1128",detection:{elementDetection:{waitInterval:100,maxRetries:1}},beacon:{shiftKey:3}}},,,function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(98),a=n(5),c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},s=(n(0).get("util:beacon:index"),n(318)),l=n(46),p=n(38),h=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p.BEACON;r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return s(function(){return n.send()}),n}return i(e,t),c(e,[{key:"populateBeaconFields",value:function(){f(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"populateBeaconFields",this).call(this),this._populateCommonFields(),this._populateCustomerFields()}},{key:"_populateCommonFields",value:function(){this.set(l.PAGE_URL,document.location.hostname+document.location.pathname)}},{key:"_populateCustomerFields",value:function(){var t=this,e=a["default"].get(["beacon","customEntries"]);e&&e.forEach(function(e,n){t.set(l["CUSTOMER_"+(n+1).toString()],e)})}},{key:"processEndpoint",value:function(t){return t.replace(/^(https?:)?\/\//,"")}},{key:"dataPostProcessing",value:function(t){if(t=t.slice(),t.length>0&&0===t[0].indexOf("id")){var e=Math.floor(Math.random()*(t.length-1)+1),n=t[0];t[0]=t[e],t[e]=n}return t}}]),e}(u.a);e["default"]=h},function(t,e,n){function r(t,e){return!!(null==t?0:t.length)&&o(t,e,0)>-1}var o=n(117);t.exports=r},function(t,e){function n(t,e,n){for(var r=-1,o=null==t?0:t.length;++r<o;)if(n(e,t[r]))return!0;return!1}t.exports=n},function(t,e){function n(t,e){for(var n=-1,r=e.length,o=t.length;++n<r;)t[o+n]=e[n];return t}t.exports=n},function(t,e){function n(t){return t.split("")}t.exports=n},function(t,e){function n(t,e,n,r){for(var o=t.length,i=n+(r?1:-1);r?i--:++i<o;)if(e(t[i],i,t))return i;return-1}t.exports=n},function(t,e,n){function r(t,e){return o(e,function(e){return t[e]})}var o=n(73);t.exports=r},function(t,e){function n(){}t.exports=n},function(t,e,n){function r(t){return u(t)||i(t)||!!(a&&t&&t[a])}var o=n(116),i=n(54),u=n(9),a=o?o.isConcatSpreadable:void 0;t.exports=r},function(t,e){function n(t){for(var e,n=[];!(e=t.next()).done;)n.push(e.value);return n}t.exports=n},function(t,e){function n(){return[]}t.exports=n},function(t,e){function n(t){return t.split("")}t.exports=n},function(t,e,n){function r(t){return"string"==typeof t||!i(t)&&u(t)&&o(t)==a}var o=n(53),i=n(9),u=n(39),a="[object String]";t.exports=r},,function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(64),a=n(1),c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},s=(n(0).get("detection:acceptable_ad:element_hiding_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),c(e,null,[{key:"getSchema",value:function(){return f(e.__proto__||Object.getPrototypeOf(e),"getSchema",this).call(this).addAttribute([a.b.ACCEPTABLE_AD])}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".abp_ob_exist",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window;return f(e.__proto__||Object.getPrototypeOf(e),"testMethod",this).call(this,t,n)}}]),e}(u.a));e.a=s},function(t,e,n){"use strict";var r=n(240);n(0).get("detection:acceptable_ad:index");e.a=[r.a]},function(t,e,n){"use strict";var r=n(243);n(0).get("detection:adblocker:chrome:adblock:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(10),f=n(131),s=n(1),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("detection:adblocker:chrome:adblock:style_sheet_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,null,[{key:"getSchema",value:function(){return new a.a(s.b.ADBLOCKER,s.c.ARTIFACT,s.c.STYLE_SHEET,s.c.HIDING_DATA)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window,e=n.i(f.a)(t),r=e.foundAdblocker();return this.getSchema().createResult(r?s.a.ADBLOCK:s.a.NOT_PRESENT,r?s.f.STYLE_SHEET_PRESENT:s.f.NO_STYLE_SHEET_PRESENT,c.a.fromStyleSheets({shadow:e.getAdblockerStyleSheets()}))}}]),e}(u.b));e.a=p},function(t,e,n){"use strict";var r=n(245),o=n(246);n(0).get("detection:adblocker:chrome:adblock_plus:index");e.a=[r.a,o.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(4),a=n(26),c=n(3),f=n(299),s=n(1),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("detection:adblocker:chrome:adblock_plus:native_shadow_root_override_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,null,[{key:"getSchema",value:function(){return new u.a(s.b.ADBLOCKER,s.c.ARTIFACT,s.c.NATIVE_OVERRIDE)}},{key:"findDependency",value:function(t){return t.has(s.b.GENERIC_ADBLOCKER,s.c.HIDING)}},{key:"testMethod",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window,r=Object.getOwnPropertyDescriptor(e.Element.prototype,"shadowRoot").get;return n.i(a.a)(r)?this.getSchema().createResult(s.f.NO_NATIVE_OVERRIDE,s.a.NOT_PRESENT):n.i(f.a)(t)?this.getSchema().createResult(s.f.SHADOW_ROOT_NATIVE_OVERRIDE,s.a.ADBLOCK_PLUS):this.getSchema().createResult(s.f.NO_ELEMENT_HIDDEN,s.a.NOT_PRESENT)}}]),e}(c.a));e.a=p},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(10),f=n(132),s=n(1),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("detection:adblocker:chrome:adblock_plus:style_sheet_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,null,[{key:"getSchema",value:function(){return new a.a(s.b.ADBLOCKER,s.c.ARTIFACT,s.c.STYLE_SHEET,s.c.HIDING_DATA)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window,e=n.i(f.a)(t),r=e.foundAdblocker();return this.getSchema().createResult(r?s.a.ADBLOCK_PLUS:s.a.NOT_PRESENT,r?s.f.STYLE_SHEET_PRESENT:s.f.NO_STYLE_SHEET_PRESENT,c.a.fromStyleSheets({shadow:e.getAdblockerStyleSheets()}))}}]),e}(u.b));e.a=p},function(t,e,n){"use strict";var r=n(248);n(0).get("detection:adblocker:chrome:adguard:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(10),f=n(133),s=n(1),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("detection:adblocker:chrome:adguard:style_sheet_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,null,[{key:"getSchema",value:function(){return new a.a(s.b.ADBLOCKER,s.c.ARTIFACT,s.c.STYLE_SHEET,s.c.HIDING_DATA)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window,e=n.i(f.a)(t),r=e.foundAdblocker();return this.getSchema().createResult(r?s.a.ADGUARD:s.a.NOT_PRESENT,r?s.f.STYLE_SHEET_PRESENT:s.f.NO_STYLE_SHEET_PRESENT,c.a.fromStyleSheets({shadow:e.getAdblockerStyleSheets()}))}}]),e}(u.b));e.a=p},function(t,e,n){"use strict";var r=n(250);n(0).get("detection:adblocker:firefox:adblock_plus:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(1),f=n(134),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("detection:adblocker:firefox:adblock_plus:style_property_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,null,[{key:"getSchema",value:function(){return new a.a(c.b.ADBLOCKER,c.c.ARTIFACT,c.c.STYLE_PROPERTY)}},{key:"testMethod",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return n.i(f.a)(e).then(function(e){var n=e.foundAdblocker();return t.getSchema().createResult(n?c.a.ADBLOCK_PLUS:c.a.NOT_PRESENT,n?c.f.STYLE_PROPERTY_PRESENT:c.f.NO_STYLE_PROPERTY_PRESENT)})}}]),e}(u.b));e.a=l},function(t,e,n){"use strict";var r=n(252);n(0).get("detection:adblocker:firefox:adguard:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(10),a=n(3),c=n(4),f=n(135),s=n(1),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("detection:adblocker:firefox:adguard:style_sheet_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,null,[{key:"getSchema",value:function(){return new c.a(s.b.ADBLOCKER,s.c.ARTIFACT,s.c.STYLE_SHEET,s.c.HIDING_DATA)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window,e=n.i(f.a)(t),r=e.foundAdblocker();return this.getSchema().createResult(r?s.a.ADGUARD:s.a.NOT_PRESENT,r?s.f.STYLE_SHEET_PRESENT:s.f.NO_STYLE_SHEET_PRESENT,u.a.fromStyleSheets({document:e.getAdblockerStyleSheets()}))}}]),e}(a.b));e.a=p},function(t,e,n){"use strict";var r=n(254);n(0).get("detection:adblocker:firefox:ublock_origin:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(1),f=n(136),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("detection:adblocker:firefox:ublock_origin:style_property_and_hidden_property_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,null,[{key:"getSchema",value:function(){return new a.a(c.b.ADBLOCKER,c.c.ARTIFACT,c.c.STYLE_PROPERTY,c.c.HIDDEN_PROPERTY)}},{key:"testMethod",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return n.i(f.a)(e).then(function(e){var n=e.foundAdblocker();return t.getSchema().createResult(n?c.a.UBLOCK_ORIGIN:c.a.NOT_PRESENT,n?c.f.STYLE_PROPERTY_PRESENT:c.f.NO_STYLE_PROPERTY_PRESENT,n?c.f.HIDDEN_PROPERTY_PRESENT:c.f.NO_HIDDEN_PROPERTY_PRESENT)})}}]),e}(u.b));e.a=l},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(10),f=n(55),s=n(1),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("detection:adblocker:generic:ublock:style_sheet_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,null,[{key:"getSchema",value:function(){return new a.a(s.b.ADBLOCKER,s.c.ARTIFACT,s.c.STYLE_SHEET,s.c.HIDING_DATA)}},{key:"testMethod",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return n.i(f.a)(e).then(function(e){var n=e.foundAdblocker();return t.getSchema().createResult(n?s.a.UBLOCK:s.a.NOT_PRESENT,n?s.f.STYLE_SHEET_PRESENT:s.f.NO_STYLE_SHEET_PRESENT,c.a.fromStyleSheets({document:e.getAdblockerStyleSheets()}))})}}]),e}(u.b));e.a=p},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(10),f=n(79),s=n(1),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("detection:adblocker:generic:ublock_origin:style_sheet_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,null,[{key:"getSchema",value:function(){return new a.a(s.b.ADBLOCKER,s.c.ARTIFACT,s.c.STYLE_SHEET,s.c.HIDING_DATA)}},{key:"testMethod",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return n.i(f.a)(e).then(function(e){var n=e.foundAdblocker();return t.getSchema().createResult(n?s.a.UBLOCK_ORIGIN:s.a.NOT_PRESENT,n?s.f.STYLE_SHEET_PRESENT:s.f.NO_STYLE_SHEET_PRESENT,c.a.fromStyleSheets({document:e.getAdblockerStyleSheets()}))})}}]),e}(u.b));e.a=p},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(1),f=n(137),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("detection:adblocker:internet_explorer:adblock_plus:custom_property_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,null,[{key:"getSchema",value:function(){return new a.a(c.b.ADBLOCKER,c.c.ARTIFACT,c.c.CUSTOM_PROPERTY)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window,e=n.i(f.a)(t).foundAdblocker();return this.getSchema().createResult(e?c.a.ADBLOCK_PLUS:c.a.NOT_PRESENT,e?c.f.CUSTOM_PROPERTY_PRESENT:c.f.NO_CUSTOM_PROPERTY_PRESENT)}}]),e}(u.b));e.a=l},function(t,e,n){"use strict";var r=n(257);n(0).get("detection:adblocker:internet_explorer:adblock_plus:index");e.a=[r.a]},function(t,e,n){"use strict";var r=n(260);n(0).get("detection:adblocker:opera:native:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(1),f=n(138),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("detection:adblocker:opera:native:style_property_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,null,[{key:"getSchema",value:function(){return new a.a(c.b.ADBLOCKER,c.c.ARTIFACT,c.c.STYLE_PROPERTY)}},{key:"testMethod",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return n.i(f.a)(e).then(function(e){var n=e.foundAdblocker();return t.getSchema().createResult(n?c.a.NATIVE:c.a.NOT_PRESENT,n?c.f.STYLE_PROPERTY_PRESENT:c.f.NO_STYLE_PROPERTY_PRESENT)})}}]),e}(u.b));e.a=l},function(t,e,n){"use strict";var r=n(262);n(0).get("detection:adblocker:safari:adblock:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(10),a=n(3),c=n(4),f=n(139),s=n(1),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("detection:adblocker:safari:adblock:style_sheet_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,null,[{key:"getSchema",value:function(){return new c.a(s.b.ADBLOCKER,s.c.ARTIFACT,s.c.STYLE_SHEET,s.c.HIDING_DATA)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window,e=n.i(f.a)(t),r=e.foundAdblocker();return this.getSchema().createResult(r?s.a.ADBLOCK:s.a.NOT_PRESENT,r?s.f.STYLE_SHEET_PRESENT:s.f.NO_STYLE_SHEET_PRESENT,u.a.fromStyleSheets({document:e.getAdblockerStyleSheets()}))}}]),e}(a.b));e.a=p},function(t,e,n){"use strict";var r=n(264);n(0).get("detection:adblocker:safari:adblock_plus:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(10),f=n(140),s=n(1),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("detection:adblocker:safari:adblock_plus:style_sheet_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,null,[{key:"getSchema",value:function(){return new a.a(s.b.ADBLOCKER,s.c.ARTIFACT,s.c.STYLE_SHEET,s.c.HIDING_DATA)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window,e=n.i(f.a)(t),r=e.foundAdblocker();return this.getSchema().createResult(r?s.a.ADBLOCK_PLUS:s.a.NOT_PRESENT,r?s.f.STYLE_SHEET_PRESENT:s.f.NO_STYLE_SHEET_PRESENT,c.a.fromStyleSheets({document:e.getAdblockerStyleSheets()}))}}]),e}(u.b));e.a=p},function(t,e,n){"use strict";var r=n(131),o=n(132),i=n(133),u=n(79),a=n(55),c=(n(0).get("detection:artifact:chrome:index"),[r.a,o.a,i.a,a.a,u.a]);e.a=c},function(t,e,n){"use strict";var r=n(134),o=n(135),i=n(136),u=n(79),a=n(55),c=(n(0).get("detection:artifact:firefox:index"),[r.a,o.a,i.a,a.a,u.a]);e.a=c},function(t,e,n){"use strict";function r(t){var e=t.document;return new i["default"](function(n){"complete"===e.readyState?n():t.addEventListener("load",function(){n()})}).then(function(){return new i["default"](function(t){window.setTimeout(function(){t(o(e))},100)})})}function o(t){var e=n.i(c.a)(t,function(t){return c.b.ONLY_DISPLAY_NONE.test(t.cssText)}),r=1===e.length&&e[0].cssRules.length>100?e:[];return n.i(a.b)(t,u.b.ADBLOCK_PLUS,r)}var i=n(2),u=n(7),a=n(20),c=n(17);e.a=r;n(0).get("detection:artifact:internet_explorer:adblock_plus_1_6")},function(t,e,n){"use strict";var r=n(137),o=n(267),i=(n(0).get("detection:artifact:internet_explorer:index"),[r.a,o.a]);e.a=i},function(t,e,n){"use strict";var r=n(55),o=n(139),i=n(140),u=(n(0).get("detection:artifact:safari:index"),[r.a,o.a,i.a]);e.a=u},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(83),a=n(128),c=n(1),f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},l=(n(0).get("detection:dfp_interference:image_network_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),f(e,null,[{key:"getSchema",value:function(){return s(e.__proto__||Object.getPrototypeOf(e),"getSchema",this).call(this).addAttribute(c.b.DFP_INTERFERENCE).removeAttribute(c.b.INTERFERENCE)}},{key:"testMethod",value:function(){return s(e.__proto__||Object.getPrototypeOf(e),"testMethod",this).call(this,n.i(a.a)())}}]),e}(u.a));e.a=l},function(t,e,n){"use strict";var r=n(270);n(0).get("detection:dfp_interference:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){return t+"/"+e}var a=n(3),c=n(4),f=n(82),s=n(1),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=n(0).get("detection:fsm:ajax_data_test"),h=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,null,[{key:"getSchema",value:function(){return new c.a(s.b.GENERIC_ADBLOCKER,s.b.FSM_DATA,s.c.NETWORK,s.c.INFERENCE,s.c.AJAX,s.c.FSM)}},{key:"testMethod",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return e&&r?(p.info("loading fsm data",e,r),n.i(f.a)(u(e,r)).then(function(e){return t.getSchema().createResult(e.blocked?s.a.PRESENT:s.a.NOT_PRESENT,e.reasonAttribute,e.infoAttributes,e.xhrData,new s.x(r))})):(p.error("cannot load fsm data",e,r),this.getSchema().createResult(s.a.NOT_PRESENT,s.f.CANNOT_TEST))}}]),e}(a.b);e.a=h},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){var r=document.createElement(O[n.i(g.a)(0,O.length)]);r.className=n.i(g.b)(),document.body.appendChild(r);var o=document.createElement("style");return document.head.appendChild(o),o.innerHTML="\n        "+r.nodeName.toLowerCase()+"."+r.className+" {\n            position: absolute !important;\n            top: -9999px !important;\n            left: -9999px !important;\n        }\n    ",d["default"].all(a(o,r,t,e)).then(function(t){r.parentElement&&document.body.removeChild(r),o.parentElement&&document.head.removeChild(o);var e=t.reduce(function(t,e){return t.addAttribute(e.attributes)});return e.has(v.a.PRESENT)?e.removeAttribute(v.a.NOT_PRESENT,v.f.NO_MATCHING_BLACKLIST):e})}function a(t,e,r,o){var i=!1;return o.map(function(o){var u=document.createElement(O[n.i(g.a)(0,O.length)]);u.className=n.i(g.b)(),e.appendChild(u);var a=void 0;try{a=n.i(y.a)(o)}catch(t){return E.warn("broken rule",o),r.createResult(v.a.NOT_PRESENT,v.f.NO_MATCHING_BLACKLIST,new v.u(o))}var f=u.nodeName.toLowerCase()+"."+u.className+" > "+o,s="\n            "+f+" {\n                display: block;\n                height: 5px !important;\n                width: 5px !important;\n            }\n        ";return null==t.sheet||"function"!=typeof t.sheet.insertRule?t.innerHTML+=s:t.sheet.insertRule(s,0),a.forEach(function(t){u.appendChild(t)}),c().then(function(){return new d["default"](function(t){var e=document.querySelector(f);if(!e)return void t(r.createResult(v.a.NOT_PRESENT,v.f.NO_MATCHING_BLACKLIST,new v.v(o)));if(n.i(_.b)(e)){E.debug("hiding rule",o);var u=void 0;i||(i=!0,u=p.a.fromElement(e,o)),t(r.createResult(v.a.PRESENT,v.f.HIDE_MATCHING_BLACKLIST,u,new v.w(o)))}else t(r.createResult(v.a.NOT_PRESENT,v.f.NO_MATCHING_BLACKLIST))})}).then(function(t){return u.parentElement&&e.removeChild(u),t})})}function c(){return new d["default"](function(t){setTimeout(function(){setTimeout(function(){t()},150)},1)})}var f=n(21),s=n.n(f),l=n(4),p=n(10),h=n(56),d=n(2),_=n(16),y=n(147),b=n(45),v=n(1),g=n(22),m=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),E=n(0).get("detection:fsm:element_hiding_test"),O=["div","span","li","section"],w=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),m(e,null,[{key:"getSchema",value:function(){return new l.a(v.b.GENERIC_ADBLOCKER,v.c.INFERENCE,v.c.FSM,v.c.ELEMENT,v.c.HIDING,v.c.HIDING_DATA)}},{key:"testMethod",value:function(t){var e=s()(this.getFSMData(t,b.d));return 0===e.length?(E.debug("no hiding rules"),this.getSchema().createResult(v.a.NOT_PRESENT,v.f.NO_ELEMENT_HIDING_RULES)):u(this.getSchema(),e)}}]),e}(h.a);e.a=w},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(56),a=n(83),c=n(45),f=n(1),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(0).get("detection:fsm:image_network_test"),p=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,null,[{key:"getSchema",value:function(){return a.a.getSchema().addAttribute(f.c.FSM)}},{key:"testMethod",value:function(t){var e=this.getFSMData(t,c.b).pop(),n=e&&e.img;return l.debug("fsm image network url",n),null==n?this.getSchema().createResult(f.a.NOT_PRESENT,f.f.CANNOT_TEST):a.a.testMethod.call(this,n+"?cb="+Date.now())}}]),e}(u.a);e.a=p},function(t,e,n){"use strict";function r(){if(!f["default"].get(["detection","fsm","enable"]))return[];var t=o.a.bindArgs(f["default"].get(["detection","fsm","endpoint"]),document.domain);return f["default"].get(["detection","fsm","enableNetwork"])?[t,i.a,a.a,u.a,c.a]:[t,i.a]}var o=n(272),i=n(273),u=n(274),a=n(277),c=n(279),f=n(5);e.a=r;n(0).get("detection:fsm:index")},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=(n(0).get("detection:fsm:network_blocker_list"),function(){function t(e,n,o,i){r(this,t),this._name=e,this._domain=n||"",this._blacklistRules=o,this._whitelistRules=i}return o(t,[{key:"getName",value:function(){return this._name}},{key:"allMatchingBlacklistRules",value:function(t,e){return this._allMatchingRules(this._blacklistRules,t,e)}},{key:"allMatchingWhitelistRules",value:function(t,e){return this._allMatchingRules(this._whitelistRules,t,e)}},{key:"_allMatchingRules",value:function(t,e,n){var r=this;return t.reduce(function(t,o){var i=e.filter(function(t){return o.test(t.src,{tagName:t.tagName,domain:r._domain})}),a=n.filter(function(t){return o.test(t.src,{tagName:t.tagName,domain:r._domain})});return 0===i.length&&0===a.length?t:t.concat(new u(o,i,a))},[])}}]),t}());e.a=i;var u=function t(e,n,o){r(this,t),this.rule=e,this.loadEvents=n,this.errorEvents=o}},function(t,e,n){"use strict";function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e,o){var i=n.i(g.a)(window._sp_._networkListenerData);if(null==i)return t.createResult(E.a.NOT_PRESENT,E.f.NO_NETWORK_LISTENER_DATA);var u=i.loadEvents,a=i.errorEvents;S.debug("fsm load/error events",u,a);var f=e.reduce(function(t,e){var n,o,i=p()(t,function(t){return t.listName===e.listName});return-1===i?(t.push(e),t):((n=t[i].blacklist).push.apply(n,r(e.blacklist)),(o=t[i].whitelist).push.apply(o,r(e.whitelist)),t)},[]);S.debug("network rules by list",f);var l=f.map(function(t){return new b.a(t.listName,document.domain,t.blacklist.map(function(t){return new O.a(t)}),t.whitelist.map(function(t){return new O.b(t)}))});if(0===l.length)return t.createResult(E.a.NOT_PRESENT,E.f.NO_NETWORK_BLOCKING_RULES);var h=u.map(function(t){return new w.a(c(t.src,o.location.protocol),t.tagName)}),d=a.map(function(t){return new w.b(c(t.src,o.location.protocol),t.tagName)});return l.reduce(function(t,e){S.debug("fsm networker blocker list:",e.getName());var n=e.allMatchingBlacklistRules(h,d);S.debug("blacklist rule matches:",n);var r=e.allMatchingWhitelistRules(h,d);S.debug("whitelist rule matches:",r);var o=n.some(function(t){return t.loadEvents.length>0}),i=n.some(function(t){return t.errorEvents.length>0}),u=r.some(function(t){return t.loadEvents.length>0}),a=r.some(function(t){return t.errorEvents.length>0}),c=new E.p(e.getName(),n.map(function(t){return new E.q(t.rule.toString(),t.loadEvents.map(function(t){return new E.r(t.src,t.tagName)}),t.errorEvents.map(function(t){return new E.s(t.src,t.tagName)}))}),r.map(function(t){return new E.t(t.rule.toString(),t.loadEvents.map(function(t){return new E.r(t.src,t.tagName)}),t.errorEvents.map(function(t){return new E.s(t.src,t.tagName)}))}));if(S.debug("blacklist load",o),S.debug("blacklist error",i),S.debug("whitelist load",u),S.debug("whitelist error",a),S.debug(c),t.has(E.a.PRESENT))return o||i||u||a?t.addAttribute(c):t;if(i&&!o)return t.addAttribute(E.a.PRESENT,E.f.ERROR_MATCHING_BLACKLIST,c).removeAttribute(E.a.NOT_PRESENT,E.f.NO_MATCHING_BLACKLIST);if(i&&o){var f=s()(n.map(function(t){return t.loadEvents})),p=f.every(function(t){return l.some(function(e){return e.allMatchingWhitelistRules([t],[]).length>0})});return S.debug("all loads matching whitelist",p),p?t.addAttribute(E.a.PRESENT,E.f.ERROR_MATCHING_BLACKLIST,E.f.LOAD_MATCHING_WHITELIST,c).removeAttribute(E.a.NOT_PRESENT,E.f.NO_MATCHING_BLACKLIST):t.addAttribute(E.f.LOAD_MATCHING_BLACKLIST,c).removeAttribute(E.f.NO_MATCHING_BLACKLIST)}return!i&&o?t.addAttribute(E.f.LOAD_MATCHING_BLACKLIST,c).removeAttribute(E.f.NO_MATCHING_BLACKLIST):u||a?t.addAttribute(c):t},t.createResult(E.a.NOT_PRESENT,E.f.NO_MATCHING_BLACKLIST))}function c(t,e){return 0===t.indexOf("//")?e+t:t}var f=n(19),s=n.n(f),l=n(123),p=n.n(l),h=n(21),d=n.n(h),_=n(4),y=n(56),b=n(276),v=n(2),g=n(317),m=n(45),E=n(1),O=n(278),w=n(150),T=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),S=n(0).get("detection:fsm:network_listener_test"),R=function(t){function e(){return o(this,e),i(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return u(e,t),T(e,null,[{key:"getSchema",value:function(){return new _.a(E.b.GENERIC_ADBLOCKER,E.c.FSM,E.c.NETWORK_LISTENER,E.c.INFERENCE)}},{key:"testMethod",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window,r=d()(this.getFSMData(t,m.c));return S.debug("fsm network rules",r),new v["default"](function(t){"complete"===n.document.readyState?t(a(e.getSchema(),r,n)):n.addEventListener("load",function(){t(a(e.getSchema(),r,n))})})}}]),e}(y.a);e.a=R},function(t,e,n){"use strict";function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t){return new RegExp(t.replace(/\*+/g,"*").replace(/\^\|$/,"^").replace(/\W/g,"\\$&").replace(/\\\*/g,".*").replace(/\\\^/g,"(?:[\\x00-\\x24\\x26-\\x2C\\x2F\\x3A-\\x40\\x5B-\\x5E\\x60\\x7B-\\x7F]|$)").replace(/^\\\|\\\|/,"^[\\w\\-]+:\\/+(?!\\/)(?:[^\\/]+\\.)?").replace(/^\\\|/,"^").replace(/\\\|$/,"$").replace(/^(\.\*)/,"").replace(/(\.\*)$/,""))}function a(t){return t.split(",").map(function(t){if(0===t.indexOf("domain=")){var e=t.slice("domain=".length);return new P("domain",e.split("|").map(s))}var n=t.indexOf("third-party");return 0===n||1===n?f(t):c(t)})}function c(t){return l(t,T)}function f(t){return l(t,S)}function s(t){return l(t,R)}function l(t,e){var n=t.match(/(~)?(.*)/);return null==n?new e(t):new e(n[2],"~"===n[1])}function p(t,e,n){if(0===t.length)return!0;var r=t.filter(function(t){return t instanceof O&&!t.not}),o=t.filter(function(t){return t instanceof E&&!t.not}),i=t.filter(function(t){return t.not});
return!o.some(function(t){return!t.test(e,n)})&&(!(r.length>0&&r.every(function(t){return!t.test(e,n)}))&&!i.some(function(t){return t.test(e,n)}))}var h=n(153),d=n.n(h),_=n(25);n.d(e,"a",function(){return v}),n.d(e,"b",function(){return g});var y=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),b=(n(0).get("detection:fsm:network_rule"),function(){function t(e){i(this,t);var n=e.indexOf("$"),r=e,o=[];n>-1&&(o=a(e.slice(n+1)),r=e.slice(0,n)),this._ruleStr=e,this.regExp=u(r),this.options=o}return y(t,[{key:"toString",value:function(){return this._ruleStr}},{key:"test",value:function(t,e){return this.regExp.test(t)&&this._testOptions(t,e)}},{key:"_testOptions",value:function(t,e){return p(this.options,t,e)}}]),t}()),v=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),e}(b),g=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),e}(b),m=function t(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];i(this,t),this.name=e,this.not=n},E=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),e}(m),O=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),e}(m),w={img:"image",iframe:"subdocument"},T=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),y(e,[{key:"test",value:function(t,e){var n=e.tagName,r=w[n]||n;return this.name===r}}]),e}(O),S=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),y(e,[{key:"test",value:function(t,e){var n=new _.a(t),r=n.hostname;if(r.indexOf(e.domain)>-1)return!1;var o=r.split("."),i=e.domain.split(".");if(d()(o)!==d()(i))return!0;if("co"===o[o.length-2]&&"uk"===d()(o)){if("co"!==i[i.length-2]||"uk"!==d()(i))return!0;o.pop(),i.pop()}return o.pop(),i.pop(),d()(o)!==d()(i)}}]),e}(E),R=function(t){function e(){return i(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return o(e,t),y(e,[{key:"test",value:function(t,e){return e.domain.indexOf(this.name)>-1}}]),e}(O),P=function(t){function e(t,n){i(this,e);var o=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return o.domains=n,o}return o(e,t),y(e,[{key:"test",value:function(t,e){return p(this.domains,t,e)}}]),e}(E)},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(56),a=n(142),c=n(45),f=n(1),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(0).get("detection:fsm:script_network_test"),p=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,null,[{key:"getSchema",value:function(){return a.a.getSchema().addAttribute(f.c.FSM)}},{key:"findDependency",value:function(t){return t.has(f.b.FSM_DATA)}},{key:"testMethod",value:function(t){var e=this.getFSMData(t,c.b).pop(),n=e&&e.script;return l.debug("fsm script network url",n),null==n?this.getSchema().createResult(f.a.NOT_PRESENT,f.f.CANNOT_TEST):a.a.testMethod.call(this,n)}}]),e}(u.a);e.a=p},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(281),a=n(141),c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},s=(n(0).get("detection:generic_adblocker:image_hiding_fastly_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),c(e,null,[{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return f(e.__proto__||Object.getPrototypeOf(e),"testMethod",this).call(this,t,n.i(a.a)())}}]),e}(u.a));e.a=s},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e,r){return new f["default"](function(o){function i(){function i(){u(),window.clearInterval(f)}var c=0;a.style.display="block",d.debug("first client height",a.clientHeight);var f=e.setInterval(function(){var e=n.i(l.b)(a),u=new p.g(r),f=new p.y(a.clientHeight);e?(i(),o(t.createResult(p.a.PRESENT,p.f.ELEMENT_HIDDEN,p.f.LOAD_BLOCK,u,f))):10==++c&&(i(),o(t.createResult(p.a.NOT_PRESENT,p.f.NO_ELEMENT_HIDDEN,p.f.LOAD_BLOCK,u,f)))},100)}function u(){a.parentElement&&e.document.body.removeChild(a)}if("complete"===e.document.readyState)return void o(t.createResult(p.a.NOT_PRESENT,p.f.CANNOT_TEST));var a=new e.Image;a.style.setProperty("display","block"),a.style.setProperty("position","absolute","important"),a.style.setProperty("top","-9999px","important"),a.style.setProperty("height","5px","important"),a.style.setProperty("min-height","5px","important"),a.style.setProperty("width","5px","important"),a.style.setProperty("min-width","5px","important"),a.addEventListener("load",function(){u(),o(t.createResult(p.a.NOT_PRESENT,p.f.NO_LOAD_BLOCK,new p.g(r)))}),a.addEventListener("error",function(){i()}),a.src=r,e.document.body.appendChild(a)})}var a=n(3),c=n(4),f=n(2),s=n(128),l=n(16),p=n(1),h=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),d=n(0).get("detection:generic_adblocker:image_hiding_test"),_=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),h(e,null,[{key:"getSchema",value:function(){return new c.a(p.b.GENERIC_ADBLOCKER,p.c.HIDING,p.c.IMAGE,p.c.INFERENCE)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n.i(s.a)();return u(this.getSchema(),t,e)}}]),e}(a.b);e.a=_},function(t,e,n){"use strict";var r=n(64),o=n(280),i=n(283);n(0).get("detection:generic_adblocker:index");e.a=[r.a,o.a,i.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(64),a=n(2),c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},s=(n(0).get("detection:generic_adblocker:on_load_element_hiding_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),c(e,null,[{key:"testMethod",value:function(t){var n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;return"complete"===r.document.readyState?f(e.__proto__||Object.getPrototypeOf(e),"testMethod",this).call(this,t,r,o):new a["default"](function(i){r.addEventListener("load",function(){i(f(e.__proto__||Object.getPrototypeOf(e),"testMethod",n).call(n,t,r,o))})})}}]),e}(u.a));e.a=s},function(t,e,n){"use strict";var r=n(141),o=n(285);n(0).get("detection:interference:index");e.a=[r.b,o.a]},function(t,e,n){"use strict";var r=n(142),o=(n(0).get("detection:interference:script_network_fastly_test"),["/","/","0","9","1","4",".","g","l","o","b","a","l",".","s","s","l",".","f","a","s","t","l","y",".","n","e","t","/","a","d","2","/","s","c","r","i","p","t","/","x",".","j","s"].join(""));e.a=r.a.bindArgs(o)},function(t,e,n){"use strict";var r=n(287);n(0).get("detection:private:chrome:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(2),f=n(1),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("detection:private:chrome:request_file_system_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,null,[{key:"getSchema",value:function(){return new a.a(f.b.PRIVATE,f.c.FEATURE_ACCESS)}},{key:"testMethod",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return new c["default"](function(n){e.webkitRequestFileSystem?e.webkitRequestFileSystem(window.TEMPORARY,1,function(){n(t.getSchema().createResult(f.a.NOT_PRESENT,f.f.REQUEST_FILE_SYSTEM_SUCCESS))},function(e){n("SecurityError"===e.name?t.getSchema().createResult(f.a.PRESENT,f.f.REQUEST_FILE_SYSTEM_ERROR,new f.j(e.name)):t.getSchema().createResult(f.a.NOT_PRESENT,f.f.REQUEST_FILE_SYSTEM_ERROR,new f.j(e.name)))}):n(t.getSchema().createResult(f.a.NOT_PRESENT,f.f.NO_REQUEST_FILE_SYSTEM))})}}]),e}(u.b));e.a=l},function(t,e,n){"use strict";var r=n(289);n(0).get("detection:private:firefox:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(2),f=n(1),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("detection:private:firefox:indexed_db_open_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,null,[{key:"getSchema",value:function(){return new a.a(f.b.PRIVATE,f.c.FEATURE_ACCESS)}},{key:"testMethod",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;return new c["default"](function(n){if(e.indexedDB){var r=e.indexedDB.open("test");r.onsuccess=function(){n(t.getSchema().createResult(f.a.NOT_PRESENT,f.f.INDEXED_DB_OPEN_SUCCESS))},r.onerror=function(){n(t.getSchema().createResult(f.a.PRESENT,f.f.INDEXED_DB_OPEN_ERROR))}}else n(t.getSchema().createResult(f.a.NOT_PRESENT,f.f.NO_INDEXED_DB))})}}]),e}(u.b));e.a=l},function(t,e,n){"use strict";var r=n(291);n(0).get("detection:private:internet_explorer:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(1),f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=(n(0).get("detection:private:internet_explorer:indexed_db_exists_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),f(e,null,[{key:"getSchema",value:function(){return new a.a(c.b.PRIVATE,c.c.FEATURE_ACCESS)}},{key:"testMethod",value:function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:window).indexedDB?this.getSchema().createResult(c.a.NOT_PRESENT,c.f.INDEXED_DB_EXISTS):this.getSchema().createResult(c.a.PRESENT,c.f.NO_INDEXED_DB)}}]),e}(u.b));e.a=s},function(t,e,n){"use strict";var r=n(293);n(0).get("detection:private:safari:index");e.a=[r.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(1),f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=(n(0).get("detection:private:safari:local_storage_set_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),f(e,null,[{key:"getSchema",value:function(){return new a.a(c.b.PRIVATE,c.c.FEATURE_ACCESS)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window;if(!t.localStorage)return this.getSchema().createResult(c.a.NOT_PRESENT,c.f.NO_LOCAL_STORAGE);try{return t.localStorage.setItem("sp","1"),t.localStorage.removeItem("sp"),this.getSchema().createResult(c.a.NOT_PRESENT,c.f.LOCAL_STORAGE_SET_SUCCESS)}catch(t){return"QuotaExceededError"===t.name?this.getSchema().createResult(c.a.PRESENT,c.f.LOCAL_STORAGE_SET_ERROR,new c.j(t.name)):this.getSchema().createResult(c.a.NOT_PRESENT,c.f.LOCAL_STORAGE_SET_ERROR,new c.j(t.name))}}}]),e}(u.b));e.a=s},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(){return new c["default"](function(t){window.setTimeout(function(){t()},500)})}var a=n(149),c=n(2),f=n(1),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)};n(0).get("detection:rerun_test_mixin");e.a=new a.a(function(t){return function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,null,[{key:"testMethod",value:function(){for(var t=this,n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];var i=function(n){return n.has(f.a.NOT_PRESENT)?n:u().then(function(){return l(e.__proto__||Object.getPrototypeOf(e),"testMethod",t).apply(t,r)})};return c["default"].resolve(l(e.__proto__||Object.getPrototypeOf(e),"testMethod",this).apply(this,r)).then(function(t){return i(t)}).then(function(t){return i(t)})}}]),e}(t)})},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(15),f=n(1),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("detection:stand_down:bot_ua_test"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,null,[{key:"getSchema",value:function(){return new a.a(f.b.STAND_DOWN,f.c.USER_AGENT,f.c.BOT)}},{key:"testMethod",value:function(){return c.a.googlebot()?this.getSchema().createResult(f.a.PRESENT,f.f.GOOGLE_BOT_USER_AGENT):c.a.googleweblight()?this.getSchema().createResult(f.a.PRESENT,f.f.GOOGLE_WEB_LIGHT_USER_AGENT):c.a.bingbot()?this.getSchema().createResult(f.a.PRESENT,f.f.BING_BOT_USER_AGENT):c.a.exabot()?this.getSchema().createResult(f.a.PRESENT,f.f.EXA_BOT_USER_AGENT):this.getSchema().createResult(f.a.NOT_PRESENT,f.f.NO_BOT_USER_AGENT)}}]),e}(u.b));e.a=l},function(t,e,n){"use strict";var r=n(295),o=n(297);n(0).get("detection:stand_down:index");e.a=[r.a,o.a]},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(3),a=n(4),c=n(1),f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=(n(0).get("detection:stand_down:proxy_host_test"),["w","e","b","c","a","c","h","e",".","g","o","o","g","l","e","u","s","e","r","c","o","n","t","e","n","t",".","c","o","m"].join("")),l=["o","p","t","i","m","i","z","e","l","y","p","r","e","v","i","e","w",".","c","o","m"].join(""),p=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),f(e,null,[{key:"getSchema",value:function(){return new a.a(c.b.STAND_DOWN,c.c.PROXY_HOST)}},{key:"testMethod",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.location.host;return t===s?this.getSchema().createResult(c.a.PRESENT,c.f.GOOGLE_WEBCACHE_PROXY_HOST):t.indexOf(l)>-1?this.getSchema().createResult(c.a.PRESENT,c.f.OPTIMIZELY_PREVIEW_PROXY_HOST):this.getSchema().createResult(c.a.NOT_PRESENT,c.f.NO_PROXY_HOST)}}]),e}(u.b);e.a=p},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n(52),a=n.n(u),c=n(145),f=n(144),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("detection:test_result:index"),["types","tests","reasons","results"]),p=function(t){function e(){var t;r(this,e);for(var i=arguments.length,u=Array(i),a=0;a<i;a++)u[a]=arguments[a];var c=o(this,(t=e.__proto__||Object.getPrototypeOf(e)).call.apply(t,[this].concat(u))),s=n.i(f.a)(c.attributes);return l.forEach(function(t){if(0===s[t].length)throw new Error("did not provide attribute type: "+t)}),c}return i(e,t),s(e,[{key:"toString",value:function(){var t=n.i(f.a)(this.attributes);return l.concat("info").filter(function(e){return t[e].length>0}).map(function(e){return t[e].slice().sort().join(",")}).join("::")}},{key:"addAttribute",value:function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];return new(Function.prototype.bind.apply(e,[null].concat([this.attributes],n)))}},{key:"removeAttribute",value:function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];var o=new(Function.prototype.bind.apply(c.a,[null].concat(n)));return new e(this.attributes.filter(function(t){return!o.attributes.some(function(e){return e.is(t)})}))}},{key:"getData",value:function(t){var e=a()(this.attributes,function(e){return e instanceof t});return e?e.getValue():null}}]),e}(c.a);e.a=p},function(t,e,n){"use strict";function r(t){return t.some(function(t){return!t.has(o.a.NOT_PRESENT)&&!t.has(o.c.FSM)})}var o=n(1);e.a=r;n(0).get("detection:test_result:util")},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=n(21),i=n.n(o),u=n(3),a=n(2),c=n(294),f=n(1),s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("detection:test_runner"),function(){function t(){r(this,t);for(var e=arguments.length,n=Array(e),o=0;o<e;o++)n[o]=arguments[o];this._tests=i()(n).map(function(t){return t.has(f.c.NETWORK)?c.a.to(t):t}).map(function(t){return new t}),this._running=!1}return s(t,[{key:"run",value:function(){var t=this;if(this._running)throw new Error("already running");this._running=!0,this._tests.forEach(function(e){if(e instanceof u.a){var n=e,r=t._tests.filter(function(t){return t!==n&&n.constructor.findDependency(t.constructor)});a["default"].all(r.map(function(t){return t.waitForResult()})).then(function(t){return e.run(t)})}else e.run()})}},{key:"waitForResultsWhere",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){return!0};return a["default"].all(this._getTestResultsWhere(t))}},{key:"someResultPresentWhere",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){return!0};return new a["default"](function(n){var r=t._getTestResultsWhere(e);if(0===r.length)return n(!1);var o=!1,i=0;r.forEach(function(t){t.then(function(t){if(!o){if(i++,!t.has(f.a.NOT_PRESENT))return o=!0,void n(!0);i===r.length&&(o=!0,n(!1))}})})})}},{key:"_getTestResultsWhere",value:function(t){return this._tests.filter(function(e){return t(e.constructor)}).map(function(t){return t.waitForResult()})}}]),t}());e.a=l},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){return t.consumeCharacters("]"),new s(e)}var a=n(24),c=n(40);e.a=u;var f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=(n(0).get("util:dom:get_elements_from_selector:consumers:attribute_consumer:any_value_consumer"),function(t){function e(t){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n.i(c.a)().join(" ")))}return i(e,t),f(e,[{key:"applyToElement",value:function(t){t.setAttribute(this.key,t.hasAttribute(this.key)?t.getAttribute(this.key)||"":this.value)}}]),e}(a.a))},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){t.consumeCharacters("*=");var r=t.consumeRegex(l.f),o=n.i(f.a)(r);return new h(e,o)}var a=n(24),c=n(40),f=n(41),s=n(22),l=n(8);e.a=u;var p=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),h=(n(0).get("util:dom:get_elements_from_selector:consumers:attribute_consumer:contains_value_consumer"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),p(e,[{key:"applyToElement",value:function(t){if(t.hasAttribute(this.key)){var e=(t.getAttribute(this.key)||"").split(" ");e.splice(n.i(s.a)(0,e.length),0,this.value),t.setAttribute(this.key,e.join(" "))}else{var r=n.i(c.a)().join(" "),o=n.i(s.a)(0,r.length);t.setAttribute(this.key,r.slice(0,o)+this.value+r.slice(o))}}}]),e}(a.a))},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){t.consumeCharacters("$=");var r=t.consumeRegex(s.f),o=n.i(f.a)(r);return new p(e,o)}var a=n(24),c=n(40),f=n(41),s=n(8);e.a=u;var l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("util:dom:get_elements_from_selector:consumers:attribute_consumer:ends_with_value_consumer"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,[{key:"applyToElement",value:function(t){var e=t.hasAttribute(this.key)?t.getAttribute(this.key)||"":n.i(c.a)().join(" ");t.setAttribute(this.key,e+" "+this.value)}}]),e}(a.a))},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){t.consumeCharacters("=");var r=t.consumeRegex(f.f),o=n.i(c.a)(r);return new l(e,o)}var a=n(24),c=n(41),f=n(8);e.a=u;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("util:dom:get_elements_from_selector:consumers:attribute_consumer:equals_value_consumer"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,[{key:"applyToElement",value:function(t){t.setAttribute(this.key,this.value)}}]),e}(a.a))},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){t.consumeCharacters("~=");var r=t.consumeRegex(l.f),o=n.i(f.a)(r);return new h(e,o)}var a=n(24),c=n(40),f=n(41),s=n(22),l=n(8);e.a=u;var p=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),h=(n(0).get("util:dom:get_elements_from_selector:consumers:attribute_consumer:equals_word_value_consumer"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),p(e,[{key:"applyToElement",value:function(t){var e=t.hasAttribute(this.key)?(t.getAttribute(this.key)||"").split(" "):n.i(c.a)(),r=n.i(s.a)(0,e.length);e.splice(r,0,this.value),t.setAttribute(this.key,e.join(" "))}}]),e}(a.a))},function(t,e,n){"use strict";function r(t){t.consumeCharacters("[");var e=t.consumeRegex(s.b);if(p.indexOf(e)>-1)throw n.i(l.d)(t.getSelector());var r=t.lookAheadRegex(s.e),o=h[r];if(!o)throw n.i(l.a)(t.getSelector());return o(t,e)}var o=n(301),i=n(302),u=n(304),a=n(303),c=n(307),f=n(305),s=n(8),l=n(43);e.a=r;var p=(n(0).get("util:dom:get_elements_from_selector:consumers:attribute_consumer:index"),["src"]),h={"=":u.a,"~=":f.a,"^=":c.a,"$=":a.a,"*=":i.a,"]":o.a}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){t.consumeCharacters("^=");var r=t.consumeRegex(s.f),o=n.i(f.a)(r);return new p(e,o)}var a=n(24),c=n(40),f=n(41),s=n(8);e.a=u;var l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("util:dom:get_elements_from_selector:consumers:attribute_consumer:starts_with_value_consumer"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,[{key:"applyToElement",value:function(t){var e=t.hasAttribute(this.key)?t.getAttribute(this.key)||"":n.i(c.a)().join(" ");t.setAttribute(this.key,this.value+" "+e)}}]),e}(a.a))},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){return t.consumeRegex(f.k),new l(n.i(c.a)(t))}var a=n(58),c=n(42),f=n(8);e.a=u;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("util:dom:get_elements_from_selector:consumers:child_element_consumer"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,[{key:"applyToElementRecord",value:function(t){t.appendChildElementRecord(this.elementRecord)}}]),e}(a.a))},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){return t.consumeCharacters("."),new s(t.consumeRegex(c.b))}var a=n(86),c=n(8);e.a=u;var f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=(n(0).get("util:dom:get_elements_from_selector:consumers:class_name_consumer"),function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n._className=t,n}return i(e,t),f(e,[{key:"applyToElement",value:function(t){t.className=t.className?t.className+" "+this._className:this._className}}]),e}(a.a))},function(t,e,n){"use strict";function r(t){throw t.consumeCharacters(":"),n.i(o.c)(t.getSelector())}var o=n(43);e.a=r;n(0).get("util:dom:get_elements_from_selector:consumers:custom_selector_method_consumer")},function(t,e,n){"use strict";function r(t){var e=new f.a,r=n.i(c.a)(t);e.appendChildElementRecord(r);for(var o=r;!t.isDone();){var i=t.lookAheadRegex(s.a);if(""===i)throw n.i(l.a)(t.getSelector());var u=p[i.trim()];if(!u)throw n.i(l.a)(t.getSelector());var a=u(t);a.applyToElementRecord(o),o=a.getElementRecord()}return e}var o=n(308),i=n(312),u=n(313),a=n(315),c=n(42),f=n(87),s=n(8),l=n(43);e.a=r;var p=(n(0).get("util:dom:get_elements_from_selector:consumers:element_hierarchy_consumer"),{">":o.a,"":i.a,"+":a.a,"~":u.a})},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){return t.consumeRegex(s.j),new p(n.i(c.a)(t))}var a=n(58),c=n(42),f=n(146),s=n(8);e.a=u;var l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("util:dom:get_elements_from_selector:consumers:grand_child_element_consumer"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,[{key:"applyToElementRecord",value:function(t){var e=n.i(f.a)();e.push(this.elementRecord),e.forEach(function(t,n){n>0&&e[n-1].appendChildElementRecord(t)}),t.appendChildElementRecord(e[0])}}]),e}(a.a))},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){return t.consumeRegex(s.h),new p(n.i(c.a)(t))}var a=n(58),c=n(42),f=n(146),s=n(8);e.a=u;var l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=(n(0).get("util:dom:get_elements_from_selector:consumers:grand_sibling_element_consumer"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),l(e,[{key:"applyToElementRecord",value:function(t){var e=t.getParentElementRecord(),r=n.i(f.a)();r.push(this.elementRecord),r.forEach(function(t){e.appendChildElementRecord(t)})}}]),e}(a.a))},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){return t.consumeCharacters("#"),new s(t.consumeRegex(c.b))}var a=n(86),c=n(8);e.a=u;var f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=(n(0).get("util:dom:get_elements_from_selector:consumers:id_consumer"),function(t){function e(t){r(this,e);var n=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n._id=t,n}return i(e,t),f(e,[{key:"applyToElement",value:function(t){t.id=this._id}}]),e}(a.a))},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){return t.consumeRegex(f.i),new l(n.i(c.a)(t))}var a=n(58),c=n(42),f=n(8);e.a=u;var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=(n(0).get("util:dom:get_elements_from_selector:consumers:sibling_element_consumer"),function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),s(e,[{key:"applyToElementRecord",value:function(t){t.getParentElementRecord().appendChildElementRecord(this.elementRecord)}}]),e}(a.a))},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=n(43),i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=(n(0).get("util:dom:get_elements_from_selector:selector_reader"),function(){function t(e){r(this,t),this._selector=e,this._index=0}return i(t,[{key:"lookAheadRegex",value:function(){var t=this._getCharsWithRegex.apply(this,arguments);return this._validateNoSkippedChars(t),t}},{key:"consumeRegex",value:function(){var t=this._getCharsWithRegex.apply(this,arguments);return this._validateConsumed(t),this._advanceReader(t.length),t}},{key:"consumeCharacters",value:function(t){return this._validateConsumed(t),this._advanceReader(t.length),t}},{key:"getSelector",value:function(){return this._selector}},{key:"isDone",value:function(){return this._index>=this._selector.length}},{key:"_getCharsWithRegex",value:function(){for(var t=this._getRemainingCharacters(),e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var o=n.reduce(function(e,n){return e||n.exec(t)},null);return o?o[0]:""}},{key:"_getRemainingCharacters",value:function(){return this._selector.slice(this._index)}},{key:"_advanceReader",value:function(t){this._index+=t}},{key:"_validateConsumed",value:function(t){if(0===t.length)throw n.i(o.a)(this.getSelector());this._validateNoSkippedChars(t)}},{key:"_validateNoSkippedChars",value:function(t){if(0!==this._getRemainingCharacters().indexOf(t))throw n.i(o.a)(this.getSelector())}}]),t}());e.a=u},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=n(150);n(0).get("util:get_network_listener_data");e.a=function(t){return null==t?null:new i(t.load.events.map(function(t){return new o.a(t.src,t.tagName)}),t.error.events.map(function(t){return new o.b(t.src,t.tagName)}))};var i=function t(e,n){r(this,t),this.loadEvents=e,this.errorEvents=n}},function(t,e,n){function r(t){var e=window.document,n=e.addEventListener,r=n?"addEventListener":"attachEvent",o=n?"":"on";window[r](o+"unload",t,!1)}n(0).get("util:unload");t.exports=r},function(t,e){function n(t,e){for(var n=-1,r=null==t?0:t.length;++n<r&&!1!==e(t[n],n,t););return t}t.exports=n},function(t,e){function n(t,e,n,r){var o=-1,i=null==t?0:t.length;for(r&&i&&(n=t[++o]);++o<i;)n=e(n,t[o],o,t);return n}t.exports=n},function(t,e){function n(t,e){for(var n=-1,r=null==t?0:t.length;++n<r;)if(e(t[n],n,t))return!0;return!1}t.exports=n},function(t,e){function n(t){return t.match(r)||[]}var r=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;t.exports=n},function(t,e,n){function r(t,e){return t&&o(e,i(e),t)}var o=n(18),i=n(29);t.exports=r},function(t,e,n){function r(t,e){return t&&o(e,i(e),t)}var o=n(18),i=n(36);t.exports=r},function(t,e,n){function r(t,e){return t&&o(t,e,i)}var o=n(89),i=n(29);t.exports=r},function(t,e,n){function r(t,e,n,u,a){return t===e||(null==t||null==e||!i(t)&&!i(e)?t!==t&&e!==e:o(t,e,n,u,r,a))}var o=n(327),i=n(39);t.exports=r},function(t,e,n){function r(t,e,n,r,y,v){var g=f(t),m=f(e),E=g?d:c(t),O=m?d:c(e);E=E==h?_:E,O=O==h?_:O;var w=E==_,T=O==_,S=E==O;if(S&&s(t)){if(!s(e))return!1;g=!0,w=!1}if(S&&!w)return v||(v=new o),g||l(t)?i(t,e,n,r,y,v):u(t,e,E,n,r,y,v);if(!(n&p)){var R=w&&b.call(t,"__wrapped__"),P=T&&b.call(e,"__wrapped__");if(R||P){var k=R?t.value():t,j=P?e.value():e;return v||(v=new o),y(k,j,n,r,v)}}return!!S&&(v||(v=new o),a(t,e,n,r,y,v))}var o=n(68),i=n(335),u=n(336),a=n(337),c=n(77),f=n(9),s=n(70),l=n(106),p=1,h="[object Arguments]",d="[object Array]",_="[object Object]",y=Object.prototype,b=y.hasOwnProperty;t.exports=r},function(t,e,n){function r(t,e,n){var r=t.length;return n=void 0===n?r:n,!e&&n>=r?t:o(t,e,n)}var o=n(151);t.exports=r},function(t,e,n){function r(t,e){return o(t,i(t),e)}var o=n(18),i=n(338);t.exports=r},function(t,e,n){function r(t,e){return o(t,i(t),e)}var o=n(18),i=n(339);t.exports=r},function(t,e,n){function r(t){return function(e){e=a(e);var n=i(e)?u(e):void 0,r=n?n[0]:e.charAt(0),c=n?o(n,1).join(""):e.slice(1);return r[t]()+c}}var o=n(328),i=n(121),u=n(122),a=n(48);t.exports=r},function(t,e,n){function r(t){return function(e){return o(u(i(e).replace(a,"")),t,"")}}var o=n(320),i=n(349),u=n(353),a=RegExp("['’]","g");t.exports=r},function(t,e,n){function r(t){return function(e,n,r){var a=Object(e);if(!i(e)){var c=o(n,3);e=u(e),n=function(t){return c(a[t],t,a)}}var f=t(e,n,r);return f>-1?a[c?e[f]:f]:void 0}}var o=n(33),i=n(47),u=n(29);t.exports=r},function(t,e,n){function r(t,e,n,r){return void 0===t||o(t,i[n])&&!u.call(r,n)?e:t}var o=n(35),i=Object.prototype,u=i.hasOwnProperty;t.exports=r},function(t,e,n){function r(t,e,n,r,f,s){var l=n&a,p=t.length,h=e.length;if(p!=h&&!(l&&h>p))return!1;var d=s.get(t);if(d&&s.get(e))return d==e;var _=-1,y=!0,b=n&c?new o:void 0;for(s.set(t,e),s.set(e,t);++_<p;){var v=t[_],g=e[_];if(r)var m=l?r(g,v,_,e,t,s):r(v,g,_,t,e,s);if(void 0!==m){if(m)continue;y=!1;break}if(b){if(!i(e,function(t,e){if(!u(b,e)&&(v===t||f(v,t,n,r,s)))return b.push(e)})){y=!1;break}}else if(v!==g&&!f(v,g,n,r,s)){y=!1;break}}return s["delete"](t),s["delete"](e),y}var o=n(119),i=n(321),u=n(120),a=1,c=2;t.exports=r},function(t,e){function n(t,e){return t===e||t!==t&&e!==e}t.exports=n},function(t,e,n){function r(t,e,n,r,u,c){var f=n&i,s=o(t),l=s.length;if(l!=o(e).length&&!f)return!1;for(var p=l;p--;){var h=s[p];if(!(f?h in e:a.call(e,h)))return!1}var d=c.get(t);if(d&&c.get(e))return d==e;var _=!0;c.set(t,e),c.set(e,t);for(var y=f;++p<l;){h=s[p];var b=t[h],v=e[h];if(r)var g=f?r(v,b,h,e,t,c):r(b,v,h,t,e,c);if(!(void 0===g?b===v||u(b,v,n,r,c):g)){_=!1;break}y||(y="constructor"==h)}if(_&&!y){var m=t.constructor,E=e.constructor;m!=E&&"constructor"in t&&"constructor"in e&&!("function"==typeof m&&m instanceof m&&"function"==typeof E&&E instanceof E)&&(_=!1)}return c["delete"](t),c["delete"](e),_}var o=n(152),i=1,u=Object.prototype,a=u.hasOwnProperty;t.exports=r},function(t,e){function n(){return[]}t.exports=n},function(t,e){function n(){return[]}t.exports=n},function(t,e){function n(){return!1}t.exports=n},function(t,e){function n(t){var e=t.length,n=t.constructor(e);return e&&"string"==typeof t[0]&&o.call(t,"index")&&(n.index=t.index,n.input=t.input),n}var r=Object.prototype,o=r.hasOwnProperty;t.exports=n},function(t,e){function n(t){return t}t.exports=n},function(t,e,n){function r(t,e){return e.length<2?t:o(t,i(e,0,-1))}var o=n(71),i=n(151);t.exports=r},function(t,e){function n(t){return t.match(r)||[]}var r=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;t.exports=n},function(t,e,n){var r=n(18),o=n(69),i=n(36),u=o(function(t,e,n,o){r(e,i(e),t,o)});t.exports=u},function(t,e,n){function r(t,e){var n;if("function"!=typeof e)throw new TypeError(i);return t=o(t),function(){return--t>0&&(n=e.apply(this,arguments)),t<=1&&(e=void 0),n}}var o=n(125),i="Expected a function";t.exports=r},function(t,e,n){var r=n(348),o=n(332),i=o(function(t,e,n){return e=e.toLowerCase(),t+(n?r(e):e)});t.exports=i},function(t,e,n){function r(t){return i(o(t).toLowerCase())}var o=n(48),i=n(352);t.exports=r},function(t,e){function n(t){return t}t.exports=n},function(t,e,n){var r=n(102),o=n(345),i=n(59),u=n(334),a=i(function(t){return t.push(void 0,u),r(o,void 0,t)});t.exports=a},function(t,e,n){function r(t,e){var n={};return e=u(e,3),i(t,function(t,r,i){o(n,e(t,r,i),t)}),n}var o=n(27),i=n(325),u=n(33);t.exports=r},function(t,e,n){var r=n(331),o=r("toUpperCase");t.exports=o},function(t,e,n){function r(t,e,n){return t=u(t),e=n?void 0:e,void 0===e?i(t)?a(t):o(t):t.match(e)||[]}var o=n(322),i=n(340),u=n(48),a=n(344);t.exports=r},,,,,,function(t,e,n){"use strict";function r(){var t=i.a,e=new u["default"](function(e){t=e});return n.i(a.a)("checkState",function(t){e.then(function(e){t(e)})}),t}var o=n(61),i=n.n(o),u=n(2),a=n(11);e.a=r;n(0).get("backwards_compatibility:life_cycle:check_state")},,,function(t,e,n){"use strict";function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,e=[],n=[],r=o.bind(null,e),i=o.bind(null,n);return t.addEventListener("load",r,!0),t.addEventListener("error",i,!0),{load:{events:e,listener:r},error:{events:n,listener:i}}}function o(t,e){if(e.target){var n="string"==typeof e.target.tagName?e.target.tagName.toLowerCase():"",r=e.target.src||"";"iframe"!==n&&t.push({tagName:n,src:r})}}e.a=r;n(0).get("util:setup_network_listeners")},,function(t,e){function n(t,e,n,r){for(var o=-1,i=null==t?0:t.length;++o<i;){var u=t[o];e(r,u,n(u),t)}return r}t.exports=n},,function(t,e){function n(t,e,n,r){for(var o=-1,i=null==t?0:t.length;++o<i;){var u=t[o];e(r,u,n(u),t)}return r}t.exports=n},function(t,e){function n(t,e){return null!=t&&o.call(t,e)}var r=Object.prototype,o=r.hasOwnProperty;t.exports=n},,,function(t,e,n){function r(t,e){return function(n,r){var c=a(n)?o:i,f=e?e():{};return c(n,t,u(r,2),f)}}var o=n(364),i=n(366),u=n(33),a=n(9);t.exports=r},function(t,e,n){function r(t){return o(t,i|u)}var o=n(170),i=1,u=4;t.exports=r},function(t,e,n){function r(t,e,n){var r=null==t?void 0:o(t,e);return void 0===r?n:r}var o=n(71);t.exports=r},function(t,e,n){var r=n(27),o=n(370),i=Object.prototype,u=i.hasOwnProperty,a=o(function(t,e,n){u.call(t,n)?t[n].push(e):r(t,n,[e])});t.exports=a},function(t,e,n){function r(t,e){return null!=t&&i(t,e,o)}var o=n(367),i=n(109);t.exports=r},function(t,e,n){function r(t,e,n){return null==t?t:o(t,e,n)}var o=n(108);t.exports=r},function(t,e,n){function r(t,e){return null==t||o(t,e)}var o=n(178);t.exports=r},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(13),a=n(11),c=(n(0).get("detection:is_content_blocker_present_feature"),function(t){function e(t){function i(e){t.isContentBlockerPresent().then(function(t){e(t)})}r(this,e);var u=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.i(a.a)("isContentBlockerPresent",i),n.i(a.a)("rerunDetection",function(){t.rerun()}),n.i(a.a)("isAdblocking",i),n.i(a.a)("isAdBlocking",i),u}return i(e,t),e}(u.b));e["default"]=c},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){n(0).get("detection");if(n(215)())n(211).mockApi(["checkState","isAdBlocking","pageChange"]);else{var r=function(){if(window._sp_&&window._sp_.config&&window._sp_.config.runImmediately&&n(216)(),window._sp_&&window._sp_.config){var t=n(209)["default"],e=n(208)["default"];window._sp_.config=t(window._sp_.config),e(window._sp_.config)}var r=n(5)["default"];r.init(r.specs.BASE),(0,n(214)["default"])("detection",[n(207)["default"],n(97)["default"],n(407)["default"],n(212)["default"],n(213)["default"]])};document.getElementById("_sp_override")?r():(0,n(210)["default"])("detection",function(t){if(t)throw new Error("overridden");r()})}}]);
document.addEventListener('sp.blocking', function (e) {	$.cookie('spt', 'yes', { path: '/' }); }); document.addEventListener('sp.not_blocking', function (e) {$.cookie('spt', 'no', { path: '/' }); });
}

$().ready( function () {
	setTimeout(cookie_check, 2500);

});

function cookie_check()
{
	if(document.cookie.length > 2048)
	{
		var cookies = $.cookie();
		var out = '';
		$.each(cookies,  function(c, v) {
			if(v.length > 568)
			{
				$.removeCookie(c);
				$.removeCookie(c, { domain: '.gamefaqs.com' });
				$.removeCookie(c, { domain: '.gamespot.com' });
				out += ' | ' + v.length + ' - ' + c;
			}
		});
	}
}

function qna_show_edit_module(pid, qid, xsrf_key)
{
	if($(document).width() < 750)
		var box_width = "95%";
	else
		var box_width = "60%";
	$.ajax({
		type: 'POST',
		url: '/ajax/qna_edit_dialog',
		data: {pid: pid, qid: qid, key: xsrf_key},
		success: function(response)
		{
			if(response.error)
				alert(response.error.replace(/&quot;/g, '"'));
			else
			{
				$('#site_dialog').html(response);
				$('#site_dialog').dialog({	resizable: false, dialogClass: "reg_dialog", closeText: "X", height: "auto", width: box_width, modal: true });
			}
		}

	});
    return false;
}

function qna_post_question_edit(pid, qid)
{
	if($('.flair_select .flair.current'))
		category = $('.flair_select .flair.current').attr('data-id');
	else
		category = 1;
	var question_edit = $("#question.qedit").val().trim();
	if($("#spoiler.qedit").prop('checked'))
		var spoiler_edit = 1;
	else
		var spoiler_edit = 0;
	var details_edit = $("#details.qedit").val().trim();

	$.ajax({
		type: 'POST',
		url: '/ajax/qna_edit_dialog?update=1',
		data: {pid: pid, qid: qid, title: question_edit, cat: category, message: details_edit, spoiler: spoiler_edit, key: xsrf_key},
		success: function(response)
		{
			if(response.error)
				alert(response.error);
			else
			{
				alert('Question has been successfully edited.');
				location.reload(true);
			}
		}
	});

	return;
}

function recaptcha_success(response)
{
	captcha_good = true;
	captcha_data = response;
	reg_ready_check();
}

function recaptcha_expired(response)
{
	captcha_good = false;
	captcha_data = '';
	reg_ready_check();
}

function toggle_pass()
{
	if(document.getElementById('password').type == 'password')
		document.getElementById('password').type = 'text';
	else
		document.getElementById('password').type = 'password';
}

function user_name_check()
{
	$('#reg_create').attr('disabled', true);
	clearTimeout(ck_timeout);
	var name_check = $('#user_name').val();
	if(name_check.length < 1)
	{
		$('#name_icon').removeClass();
		$('#name_error').html('');
	}
	else if(name_check.length < 3 || name_check.length > 15)
	{
		$('#name_error').html("User names must be between 3 and 15 characters long");
		$('#name_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else if(name_check.match(/[^a-zA-Z0-9_-]/))
	{
		$('#name_error').html("User names may only include letters, numbers, dashes, and underscores");
		$('#name_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else
	{
		$('#name_icon').removeClass().addClass('fa fa-pulse fa-spinner');
		ck_timeout = setTimeout(name_ajax_check, 500);
	}
}

function name_ajax_check()
{
	$.ajax({
		type: 'POST',
		url: '/ajax/username_check',
		data:  { name: $('#user_name').val(), key: xsrf_key },
		success: function(response)
		{
			if(response)
			{
				$('#name_icon').removeClass().addClass('fa reg_invalid fa-remove');
				$('#name_error').html("This user name is not available");
			}
			else
			{
				$('#name_icon').removeClass().addClass('fa reg_valid fa-check');
				$('#name_error').html('');
				reg_ready_check();
			}
		}
	});
}


function password_check()
{
	$('#reg_create').attr('disabled', true);
	var pass_check = $('#password').val();
	if(pass_check.length < 1)
	{
		$('#pass_icon').removeClass();
		$('#pass_error').html('');
	}
	else if(pass_check.length < 8)
	{
		$('#pass_error').html("Your password must be at least 8 characters long");
		$('#pass_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else if(!pass_check.match(/[a-z]/))
	{
		$('#pass_error').html("You must include at least one lower-case letter");
		$('#pass_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else if(!pass_check.match(/[A-Z]/))
	{
		$('#pass_error').html("You must include at least one upper-case letter");
		$('#pass_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else if(!pass_check.match(/[0-9!"#\$\%\&\'\(\)\*\+,-\.\/:;<=>\?@\[\\\]\^_`{\|}~]/))
	{
		$('#pass_error').html("You must include at least one number or symbol");
		$('#pass_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else if(pass_check == $('#user_name').val())
	{
		$('#pass_icon').removeClass().addClass('fa reg_invalid fa-remove');
		$('#pass_error').html('Your password may not be identical to your username');
	}
	else
	{
		$('#pass_icon').removeClass().addClass('fa reg_valid fa-check');
		$('#pass_error').html('');
		reg_ready_check();
	}
}

function email_check()
{
	$('#reg_create').attr('disabled', true);
	clearTimeout(ck_timeout);
	var mail_check = $('#email').val();
	if(mail_check.length < 1)
	{
		$('#mail_icon').removeClass();
		$('#mail_error').html('');
	}
	else if(!mail_check.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/))
	{
		$('#mail_error').html("You must enter a valid email address");
		$('#mail_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else
	{
		ck_timeout = setTimeout(mail_ajax_check, 500);
		$('#mail_icon').removeClass().addClass('fa fa-pulse fa-spinner');
	}
}

function mail_ajax_check()
{
	$.ajax({
		type: 'POST',
		url: '/ajax/full_email_check',
		data:   { email: $('#email').val(), key: xsrf_key },
		success: function(response)
		{
			if(response==0)
			{
				$('#mail_icon').removeClass().addClass('fa reg_valid fa-check');
				$('#mail_error').html('');
				reg_ready_check();
			}
			else
			{
				$('#mail_icon').removeClass().addClass('fa reg_invalid fa-remove');
				if(response==5)
					$('#mail_error').html('This email address is in use with another account');
				else
					$('#mail_error').html("You must enter a valid email address");
			}
		}
	});
}

function reg_ready_check()
{
	if($('#mail_icon').hasClass('reg_valid') == true && $('#pass_icon').hasClass('reg_valid') && $('#name_icon').hasClass('reg_valid') && captcha_good == true)
		$('#reg_create').attr('disabled', false);
	else
		$('#reg_create').attr('disabled', true);
}

function register_account()
{
	$('#reg_create').attr('disabled', true).html('Creating Account...');
	$.ajax({
		type: 'POST',
		url: '/ajax/register_account',
		data:   { user_name: $('#user_name').val(), password: $('#password').val(), email: $('#email').val(), captcha_data: captcha_data, key: xsrf_key },
		success: function(response)
		{
			if(response != 'OK')
			{
				alert(response);
				$('#reg_create').attr('disabled', false).html('Create a New Account');
			}
			else
			{
				location.reload(true);
			}
		}
	});

}


function clean_alert(text)
{
	return text.replace(/<br \/>/gi,"\n").replace(/\&quot;/gi,"\"");
}

function warning_prompt(text)
{
	return confirm(text + "\n\nAre you sure you still want to post this?");
}

function show_quoted_message(board_id, topic_id, message_id, xsrf_key)
{
	$.ajax({
		type: 'POST',
		url: '/ajax/forum_get_message',
		data:   { board: board_id, topic: topic_id, message: message_id, key: xsrf_key },
		success: function(response)
		{
			$("#quoted_message").html(response);
			$("#quoted_message").dialog({resizable: true, dialogClass: "reg_dialog", closeText: "X", height: "auto", maxHeight: $(window).height(), width: "80%", modal: true, open: function(){$('.ui-widget-overlay').bind('click',function(){$('#quoted_message').dialog('close');});} });
		}
	});
	return false;
}


function forum_show_topic_module(board_id)
{
	if($(document).width() < 750)
		var box_width = "95%";
	else
		var box_width = "60%";

	$.ajax({
		type: 'POST',
		url: '/ajax/forum_topic_module',
		data: {board: board_id, key: xsrf_key},
		success: function(response)
		{
			$('#site_dialog').html(response.content);
			$('#site_dialog').dialog({ resizable: false, dialogClass: "reg_dialog", closeText: "X", height: "auto", width: box_width, modal: true, open: function(){$('.ui-widget-overlay').bind('click',function(){$('#site_dialog').dialog('close');});} });
		},
		error: function (xhr)
     	{
     		var message = JSON.parse(xhr.responseText);
     		alert(message.error);
  		}
	});
    return false;
}

function forum_topic_check()
{
	var topic_title = $("#topic_title").val().trim();

	$(".forum_nt_err").css("text-decoration","none");
	if(topic_title=='')
		$("#post_new_topic").attr("disabled", true);
	else if(topic_title.length < 5)
	{
		$("#post_new_topic").attr("disabled", true);
		$("#topic_err_5").css("text-decoration","underline");
	}
	else if(topic_title.length > 80)
	{
		$("#post_new_topic").attr("disabled", true);
		$("#topic_err_80").css("text-decoration","underline");
	}
	else if(topic_title.match(/[^\x20-\x7f\u2018\u2019\u201C\u201D\u20AC]/))
	{
		$("#post_new_topic").attr("disabled", true);
		$("#topic_err_emoji").css("text-decoration","underline");
	}
	else if(topic_title.toLowerCase() != topic_title && topic_title.toUpperCase() == topic_title )
	{
		$("#post_new_topic").attr("disabled", true);
		$("#topic_err_caps").css("text-decoration","underline");
	}
	else
	{
		$("#post_new_topic").attr("disabled", false);
	}

}

function forum_poll_check()
{
	var poll_ready;
	poll_data['poll_title'] = $("#poll_title").val();
	poll_data['min_level'] = $("#min_level").val();
	var poll_option = {};
	for(var i=1;i<=10;i++)
	{
		if($("#poll_option_" + i).val())
		{
			poll_option[i] = $("#poll_option_" + i).val();
			if(i>1 && poll_data['poll_title'])
				poll_ready = true;
		}
	}
	poll_data['poll_option'] = poll_option;
	if(poll_ready)
		$(".forum_nt_next").attr("disabled", false);
	else
		$(".forum_nt_next").attr("disabled", true);
}


function forum_topic_flair_set(new_id)
{
	$(".flair_option").removeClass("current");
	$("#flair_" + new_id).addClass("current");
}

function gamespace_rate_game(rate_name, score, gameid, key)
{
	$.ajax({
		type: 'POST',
		url: '/ajax/mygames_rate_game',
		data:  { type: rate_name, key: key, score: score, game: gameid },
		success: function(response)
		{
			if(!score)
				score = 0;
			$('#gs_' + rate_name).attr('data-score', score)
			var oldcolor = $("#gs_hint_" + rate_name).css('color');
			$("#gs_hint_" + rate_name).css({ "color": "green" }).animate({ "color": oldcolor }, 500);
			track_event(69);
		}
	});
}

var toggle_block = false;
function toggle_release(gameid,releaseid,xsrf_key,value)
{
	if(toggle_block)
		return;
	toggle_block = true;
	$('.mg_check').attr('disabled', true);
	$.ajax({
		type: 'POST',
		url: '/ajax/mygames_release_toggle',
		data:  { game: gameid, release: releaseid, key: xsrf_key, value: value},
		success: function(response)
		{
			$('#release_select_' + gameid).html(response);
			$('.mg_check').attr('disabled', false);
			toggle_block = false;
		}
	});

}

let vguid_place = '__VIEW_GUID__';
let ccid_place = '[subid_value]';

function uuidv4(){var b="",a,c;for(a=0;32>a;a++){c=16*Math.random()|0;if(8==a||12==a||16==a||20==a)b+="-";b+=(12==a?4:16==a?c&3|8:c).toString(16)}return b};

function add_vguid(el)
{
	el.href = el.href.replace(vguid_place, window.vguid);
}

function add_ccid(el)
{
	var commerceClickId = uuidv4();
	utag_data.commerceClickId = window.commerceClickId = commerceClickId;
	window.commerceClickId = window.commerceClickId.replaceAll('-','');
	el.href = el.href.replace(ccid_place, window.commerceClickId);
}

function lead_click(el, pid)
{
	add_vguid(el);
	add_ccid(el);

	if(typeof(om)==='object')
	{
		var leadTrackData = {
			leadDestUrl: el.href,
			leadType: 'LINK',
			merchantName: el.dataset.merchant,
			text: el.dataset.vendorprice
		};
		om.trackLeadClick(leadTrackData);
	}

	setTimeout(function(){el.href = el.href.replace(window.commerceClickId, ccid_place);utag_data.commerceClickId=window.commerceClickId=null;}, 500);
}

function mod_report_show(item_type, item_id, item_name, sub_action = 0, topicality = 0)
{
	var html = '<div class="forum_report"><div class="forum_report_title">Why are you reporting this ' + item_name + '?</div>';

	html += '<div class="forum_report_type">';

	html += '<button id="reason_1" onclick="mod_report_set_reason(1);"><span class="forum_report_type_title">Abusive Behavior</span>Insulting, racist, sexist, threatening, bullying, or other vulgar messages</button>';
	html += '<button id="reason_2" onclick="mod_report_set_reason(2);"><span class="forum_report_type_title">Spamming</span>Advertising a site, channel, or items for sale; asking for codes or money</button>';
	html += '<button id="reason_3" onclick="mod_report_set_reason(3);"><span class="forum_report_type_title">Offensive</span>Sexually explicit, gory, or other obscene content</button>';
	html += '<button id="reason_4" onclick="mod_report_set_reason(4);"><span class="forum_report_type_title">Unmarked Spoilers</span>Plot details not hidden with the spoilers tag</button>';
	if((item_name == 'topic' || item_name == 'comment') && topicality == 1)
		html += '<button id="reason_5" onclick="mod_report_set_reason(5);"><span class="forum_report_type_title">Off-Topic</span>Topics that do not relate to the subject of a message board</button>';
	else if(item_name == 'question')
		html += '<button id="reason_5" onclick="mod_report_set_reason(5);"><span class="forum_report_type_title">Wrong Game / Not a Question</span>This has nothing to do with this game or is not a question</button>';
	html += '<button id="reason_6" onclick="mod_report_set_reason(6);"><span class="forum_report_type_title">Trolling</span>Deliberately provoking users to react negatively</button>';
	html += '<button id="reason_7" onclick="mod_report_set_reason(7);"><span class="forum_report_type_title">None of the Above</span>I\'m reporting this for another reason</button>';
	
	html += '</div>	<div class="forum_report_details">Additional details (<span id="forum_report_not"></span>optional):<input id="reason_text" type="text" /></div>';
	html += '<div class="forum_report_footer"><button id="report_abuse" class="btn btn_primary" disabled="disable" onclick="mod_report_abuse(' + item_type + ', \'' + item_id + '\', 0);">Report Abuse</button>';
	if(sub_action==1)
		html += '<button id="ignore_user" class="btn" disabled="disable" onclick="mod_report_abuse(' + item_type + ', \'' + item_id + '\', 1);">Report and Ignore This User</button>';
	if(sub_action==2)
		html += '<button id="ignore_user" class="btn" disabled="disable" onclick="mod_report_abuse(' + item_type + ', \'' + item_id + '\', 2);">Moderate This Item</button>';
	html += '</div></div>';

	$("#report_dialog").html(html);
	$("#report_dialog").dialog({resizable: true, dialogClass: "reg_dialog", closeText: "X", height: "auto", maxHeight: $(window).height(), width: 400, maxWidth: "90%", modal: true, open: function(){$('.ui-widget-overlay').bind('click',function(){$('#report_dialog').dialog('close');});} });

}

function mod_report_set_reason(reason_id)
{
	$(".forum_report_type button").removeClass("selected");
	$("#reason_" + reason_id).addClass("selected");
	$("#report_abuse, #ignore_user").attr("disabled", false);
	$("#reason_text").focus();
	if(reason_id==4 || reason_id==6 || reason_id == 7)
		$("#forum_report_not").html('<b>*not*</b> ');
	else
		$("#forum_report_not").html('');
}

function mod_report_abuse(item_type, item_id, sub_action)
{
	var reason_id = $(".forum_report_type .selected").attr("id").substr(7);
	var reason_text = $("#reason_text").val();

	$.ajax({
		type: 'POST',
		url: '/ajax/mod_report_abuse',
		data:  { item_id: item_id, 
				 item_type: item_type, 
				 key: xsrf_key, 
				 sub_action: sub_action, 
				 reason_id: reason_id, 
				 reason_text: reason_text },
		success: function(response)
		{
			if(response.jump)
				window.location.href = '/moderation/reports?id=' + item_type + '&item=' + item_id;
			else
			{
				$('#report_dialog').dialog('close');
				if(response.success)
					flyover_message(response.success);
			}
		},
		error: function (xhr)
     	{
     		var message = JSON.parse(xhr.responseText);
     		alert(message.error);
  		}
	});


}

function flyover_message(message)
{
	$("#flyover").html(message).stop(true, true).slideDown(150).delay(2500).slideUp(500);
}

function user_relationship_set(name, type, tag = '', callback = '')
{
	if(!name || !type)
		return;

	$.ajax({
		type: 'POST',
		url: '/ajax/user_relationship_set',
		data:  { name: name, 
				 type: type, 
				 key: xsrf_key, 
				 tag: tag },
		success: function(response)
		{
			if(response.success)
				flyover_message(response.success);
			if(callback)
				window[callback](response);
		},
		error: function (xhr)
     	{
     		var message = JSON.parse(xhr.responseText);
     		alert(message.error);
  		}
	});
}

function forum_toggle_favorite(board_id)
{
	var toggle = 0;
	if($("#board_favorite i").hasClass("fa-heart-o"))
		toggle = 1;

	$.ajax({
		type: 'POST',
		url: '/ajax/forum_toggle_favorite',
		data:  { board_id: board_id, 
				 toggle: toggle,
				 key: xsrf_key },
		success: function(response)
		{
			if(response.success)
				flyover_message(response.success);
			if(toggle == 1)
				$("#board_favorite i").removeClass("fa-heart-o").addClass("fa-heart");
			else
			{
				$("#board_favorite i").removeClass("fa-heart").addClass("fa-heart-o");
				$("#board_track i").removeClass("fa-bell").addClass("fa-bell-o");
				$("#board_msg_track i").removeClass("fa-bell").addClass("fa-bell-o");
			}
			if($('#gs_noty i').hasClass('fa-bell'))
				$('.gs_hb_notify i').addClass('fa-bell').removeClass('fa-bell-o');
			else
				$('.gs_hb_notify i').addClass('fa-bell-o').removeClass('fa-bell');		
			if($('#gs_fav i').hasClass('fa-heart'))
				$('.gs_hb_favorite i').addClass('fa-heart').removeClass('fa-heart-o');
			else
				$('.gs_hb_favorite i').addClass('fa-heart-o').removeClass('fa-heart');			
		},
		error: function (xhr)
     	{
     		var message = JSON.parse(xhr.responseText);
     		alert(message.error);
  		}
	});

}

function forum_toggle_tracking(board_id, track_type)
{
	var toggle_board = 0;
	var toggle_topic = 0;
	if($("#board_favorite i").hasClass("fa-heart-o"))
		toggle_board = 1;
	if(track_type == 1) // Topics
	{
		if($("#board_track i").hasClass("fa-bell-o"))
			toggle_topic = 1;
		else
			toggle_topic = 0;
	}
	if(track_type == 2) // Messages
	{
		if($("#board_msg_track i").hasClass("fa-bell-o"))
			toggle_topic = 2;
		else
			toggle_topic = 1;
	}

	$.ajax({
		type: 'POST',
		url: '/ajax/forum_toggle_tracking',
		data:  { board_id: board_id, 
				 toggle_board: toggle_board,
				 toggle_topic: toggle_topic,
				 key: xsrf_key },
		success: function(response)
		{
			if(response.success)
				flyover_message(response.success);
			if(toggle_board == 1)
				$("#board_favorite i").removeClass("fa-heart-o").addClass("fa-heart");
			if(toggle_topic == 1)
			{
				$("#board_msg_track i").removeClass("fa-bell").addClass("fa-bell-o");
				$("#board_track i").removeClass("fa-bell-o").addClass("fa-bell");
			}
			else if(toggle_topic == 2)
			{
				$("#board_msg_track i").removeClass("fa-bell-o").addClass("fa-bell");
				$("#board_track i").removeClass("fa-bell-o").addClass("fa-bell");
			}
			else
			{
				$("#board_msg_track i").removeClass("fa-bell").addClass("fa-bell-o");
				$("#board_track i").removeClass("fa-bell").addClass("fa-bell-o");
			}
			if($('#gs_noty i').hasClass('fa-bell'))
				$('.gs_hb_notify i').addClass('fa-bell').removeClass('fa-bell-o');
			else
				$('.gs_hb_notify i').addClass('fa-bell-o').removeClass('fa-bell');		
			if($('#gs_fav i').hasClass('fa-heart'))
				$('.gs_hb_favorite i').addClass('fa-heart').removeClass('fa-heart-o');
			else
				$('.gs_hb_favorite i').addClass('fa-heart-o').removeClass('fa-heart');					
		},
		error: function (xhr)
     	{
     		var message = JSON.parse(xhr.responseText);
     		alert(message.error);
  		}
	});
	
}

function forum_toggle_topic_tracking(board_id, topic_id)
{
	var toggle_topic = 0;
	if($(".track_topic").hasClass("fa-flag-o"))
		toggle_topic = 1;

	$.ajax({
		type: 'POST',
		url: '/ajax/forum_toggle_topic_tracking',
		data:  { board_id: board_id, 
				 topic_id: topic_id, 
				 toggle_topic: toggle_topic,
				 key: xsrf_key },
		success: function(response)
		{
			if(response.success)
				flyover_message(response.success);
			if(toggle_topic == 1)
				$(".track_topic").removeClass("fa-flag-o").addClass("fa-flag");
			else
				$(".track_topic").removeClass("fa-flag").addClass("fa-flag-o");
		},
		error: function (xhr)
     	{
     		var message = JSON.parse(xhr.responseText);
     		alert(message.error);
  		}
	});
	
}

function forum_embed_media( str ) 
{
	var matcha;
	var extra = '';
	var auto_url = '';

	if(matcha = str.match(/(?:https?:\/\/)(?:[a-z]+\.dev\.)?gamefaqs\.gamespot\.com\/a\/user_image\/([0-9]\/[0-9]\/[0-9])\/([0-9a-zA-Z_\-\+\/]{12})\.(jpg|png)/i))
	{
		return '<div class="embed_frame"><img src="' + str + '" /></div>';
	}
	else if (matcha = str.match(/(?:https?:\/\/)(?:www\.|m\.)?(?:youtu\.be\/|youtube\.(?:com|jp|co\.uk|com\.au)\/(?:watch|shorts)(?:\?v=|\/){1})([a-zA-Z0-9\-_]{11})((?:\?|\&amp;)t=[0-9]+(?:(?:m|s)?(?:[0-9]+s)?)?)?/i))
	{
		if(matcha[2])
			extra = matcha[2].replace(/(\?|&)t=/, '&start=');
		return '<div class="embed_frame"><iframe width="540" height="315" class="yt_iframe" src="https://www.youtube.com/embed/' + matcha[1] +'?rel=0'+ extra +'" frameborder="0" allow="encrypted-media" allowfullscreen></iframe></div>';
	}
	else if (matcha = str.match(/(?:https?:\/\/)(?:www\.|m\.|i\.)?imgur\.com\/(?:a|gallery)\/([a-zA-Z0-9_]{5,10})/i))
	{
		return '<div class="embed_frame"><blockquote class="imgur-embed-pub" lang="en" data-id="a/'+matcha[1]+'"><a href="//imgur.com/a/'+matcha[1]+'">via Imgur</a></blockquote><scr'+'ipt async src="//s.imgur.com/min/embed.js" charset="utf-8"></scr'+'ipt></div>';
	}
	else if (matcha = str.match(/(?:https?:\/\/)(?:www\.|m\.|i\.)?imgur\.com\/([a-zA-Z0-9_]{5,10})(\.(?:gif|jpg|jpeg|webm))?/i))
	{
		return '<div class="embed_frame"><blockquote class="imgur-embed-pub" lang="en" data-id="'+matcha[1]+'"><a href="//imgur.com/'+matcha[1]+'">via Imgur</a></blockquote><scr'+'ipt async src="//s.imgur.com/min/embed.js" charset="utf-8"></scr'+'ipt></div>';
	}
	else if (matcha = str.match(/(?:https?:\/\/)(?:[a-zA-Z]{3,10}\.)?(?:gfycat\.com\/([a-zA-Z_]{5,60}))(\.(?:gif|webm))?/i))
	{
		auto_url = ''; // auto_url = '?autoplay=0';
		return '<div class="embed_frame"><iframe width="540" height="315" src="https://gfycat.com/ifr/'+matcha[1]+auto_url+'" frameborder="0" allowfullscreen><p><a href="https://gfycat.com/'+matcha[1]+'">via Gfycat</a></iframe></div>';		
	}
	else if (matcha = str.match(/(?:https?:\/\/)streamable\.com\/([a-zA-Z0-9_\-]{4,60})/i))
	{
		return '<div class="embed_frame"><iframe width="540" height="315" src="https://streamable.com/e/'+matcha[1]+'" frameborder="0" autoplay="on" allowfullscreen></iframe></div>';
	}
	else if (matcha = str.match(/(?:https?:\/\/)giphy\.com\/(?:gifs\/|.*-)([a-zA-Z0-9_\-]{5,60})/i))
	{
		return '<div class="embed_frame"><iframe src="https://giphy.com/embed/'+matcha[1]+'" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>';
	}
	else if (matcha = str.match(/(?:https?:\/\/)(?:www\.|mobile\.|i\.)?twitter\.com\/([a-z0-9_\-]{1,60})\/status\/([0-9]{10,60})/i))
	{
		return '<div class="embed_frame"><blockquote class="twitter-tweet"><a href="//twitter.com/'+matcha[1]+'/status/'+matcha[2]+'">via Twitter</a></blockquote><scr'+'ipt async src="https://platform.twitter.com/widgets.js"" charset="utf-8"></sc'+'ript></div>';
	}
	else if (matcha = str.match(/(?:https?:\/\/)(?:www\.)?twitch.tv\/videos\/([0-9]{5,60})/i))
	{
		return '<div class="embed_frame"><iframe src="https://player.twitch.tv/?video='+matcha[1]+'&parent=gamefaqs.gamespot.com" height="315" width="540" allowfullscreen="allowfullscreen"></iframe></div>';
	}
	else
		return '<a rel="nofollow" href="' + str + '">' + str + '<\/a>';
}

function forum_click_to_embed( str ) 
{
	var embed = false;

	if(str.match(/(?:https?:\/\/)(?:[a-z]+\.dev\.)?gamefaqs\.gamespot\.com\/a\/user_image\/([0-9]\/[0-9]\/[0-9])\/([0-9a-zA-Z_\-\+\/]{12})\.(jpg|png)/i))
		embed = true;
	else if (str.match(/(?:https?:\/\/)(?:www\.|m\.)?(?:youtu\.be\/|youtube\.(?:com|jp|co\.uk|com\.au)\/(?:watch|shorts)(?:\?v=|\/){1})([a-zA-Z0-9\-_]{11})((?:\?|\&amp;)t=[0-9]+(?:(?:m|s)?(?:[0-9]+s)?)?)?/i))
		embed = true;
	else if (str.match(/(?:https?:\/\/)(?:www\.|m\.|i\.)?imgur\.com\/(?:a|gallery)\/([a-zA-Z0-9_]{5,10})/i))
		embed = true;
	else if (str.match(/(?:https?:\/\/)(?:www\.|m\.|i\.)?imgur\.com\/([a-zA-Z0-9_]{5,10})(\.(?:gif|jpg|jpeg|webm))?/i))
		embed = true;
	else if (str.match(/(?:https?:\/\/)(?:[a-zA-Z]{3,10}\.)?(?:gfycat\.com\/([a-zA-Z_]{5,60}))(\.(?:gif|webm))?/i))
		embed = true;
	else if (str.match(/(?:https?:\/\/)streamable\.com\/([a-zA-Z0-9_\-]{4,60})/i))
		embed = true;
	else if (str.match(/(?:https?:\/\/)giphy\.com\/(?:gifs\/|.*-)([a-zA-Z0-9_\-]{5,60})/i))
		embed = true;
	else if (str.match(/(?:https?:\/\/)(?:www\.|mobile\.|i\.)?twitter\.com\/([a-z0-9_\-]{1,60})\/status\/([0-9]{10,60})/i))
		embed = true;
	else if (str.match(/(?:https?:\/\/)(?:www\.)?twitch.tv\/videos\/([0-9]{5,60})/i))
		embed = true;

	if(embed)
		return '<span class="click_embed" data-src="' + str + '"><i class="plusbox fa fa-plus-square-o"></i>&nbsp;' + str + '<\/span> <a rel="nofollow" class="embed_link" href="' + str + '"><i class="fa fa-external-link"></i></a>';
	else
		return '<a rel="nofollow" href="' + str + '">' + str + '<\/a>';
}

function forum_embed_image( str )
{
	if(matcha = str.match(/(?:https?:\/\/)(?:[a-z]+\.dev\.)?gamefaqs\.gamespot\.com\/a\/user_image\/([0-9]\/[0-9]\/[0-9])\/([0-9a-zA-Z_\-\+\/]{12})\.(jpg|png)/i))
		return '<img src="' + str + '" />';
	else
		return forum_click_to_embed(str);
}

function forum_link_media( str ) 
{
	return '<a rel="nofollow" href="' + str + '">' + str + '<\/a>';
}

function forum_convert_links(link_type, target)
{
	if(link_type==1 || link_type == 0)
		$(target).each(function() {
			$(this).html( $(this).html().replace(/http(s)?:\/\/([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&amp;\*\(\)_\-\=\+\\\/\?\.\:\;'\,]*[^!@\^()\[\]\{\}|\\\:;'",.?<>`\s])?/ig, forum_embed_image));
		});
	if(link_type==2)
		return;
	if(link_type==3)
		$(target).each(function() {
			$(this).html( $(this).html().replace(/http(s)?:\/\/([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&amp;\*\(\)_\-\=\+\\\/\?\.\:\;'\,]*[^!@\^()\[\]\{\}|\\\:;'",.?<>`\s])?/ig, forum_embed_media));
		});
	if(link_type==4)
		$(target).each(function() {
			$(this).html( $(this).html().replace(/http(s)?:\/\/([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&amp;\*\(\)_\-\=\+\\\/\?\.\:\;'\,]*[^!@\^()\[\]\{\}|\\\:;'",.?<>`\s])?/ig, forum_click_to_embed));
		});
	if(link_type==5)
		$(target).each(function() {
			$(this).html( $(this).html().replace(/http(s)?:\/\/([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&amp;\*\(\)_\-\=\+\\\/\?\.\:\;'\,]*[^!@\^()\[\]\{\}|\\\:;'",.?<>`\s])?/ig, forum_link_media));
		});

	$(target + " .click_embed").click( function() {
		if(!$(this).hasClass('opened'))
		{
			$(this).addClass('opened');
			$(this).children('.plusbox').removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
			$(this).next('.embed_link').hide();
			$(this).after(forum_embed_media($(this).attr("data-src")));
		}
		else
		{
			$(this).removeClass('opened');
			$(this).children('.plusbox').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
			$(this).next('.embed_frame').remove();
			$(this).next('.embed_link').show();
		}
	});

	if(link_type==0)
		$(".click_embed").first().click();
}

function forum_google_set_rec_val(val, board_id, topic_id)
{
	if(val==1 || val==5)
	{
		$('#rec_one, #rec_two').hide();
		$('#rec_three').show();
		setTimeout(function()
		{
			$('#contrib_rec').slideUp(300, function(){ $(this).remove(); });
		}, 2000);
	}
	else if(val==2)
	{
		$('#rec_one').hide();
		$('#rec_two').show();
	}
	else
	{
		$('#contrib_rec').remove();
	}

	if(val>=1 && val<=5)
	{
		$.ajax({
			type: 'POST',
			url: '/ajax/forum_google_log',
			data:  { b: board_id, t: topic_id, btn: val, key: xsrf_key}
		});
	}
	return;
}


function forum_toggle_quotes(mid)
{
	$('.msg_body[name="'+mid+'"] blockquote > blockquote > blockquote:not(.expand_quote)').css('display','block');
	$('blockquote.expand_quote[data-msgid="'+mid+'"]').remove();
}


function forum_textcomplete_init(name)
{
	$('textarea[name="'+name+'"]').textcomplete(
		[{
			match: /(^|\B)@([\-\w\d]{2,})$/,
			search: function (term, callback) {
				term = term.toLowerCase();
				callback($.map(user_list, function(word) {
					return word.toLowerCase().indexOf(term) === 0 ? word : null;
				}));
			},
			index: 2,
			replace: function(word) {
				return '@' + word;
			}
	}]);
}


function forum_toggle_user_menu(mid, name)
{
	$('.user_tag_input').hide();
	if($('#userpop_' + mid + ' .user_submenu').length == 0)
	{
		$('.user_submenu').remove();

		$.ajax({
				type: 'POST',
				url: '/ajax/community_profile_popup',
					data:  { name: name, callback: 'forum_update_message_list', key: xsrf_key},
					success: function(response)
					{
						$('#userpop_' + mid).append(response);
						$('#userpop_' + mid + ' .user_submenu').show();
					}
		});
	}
	else
	{
		$('#userpop_' + mid + ' .user_submenu').remove();
	}
}

function forum_update_message_list(response)
{
	if(response.tag)
	{
		if(!$('.tag_' + response.tag).length )
			$('.uid_' + response.tag).append('<span class="tag tag_' + response.tag + '"></span>');
		$('.tag_' + response.tag).html(escape_html(response.tag_text));
	}
	if(response.follow)
		$(".uid_" + response.follow).parent('.msg_infobox').addClass("friend");
	if(response.unfollow)
		$(".uid_" + response.unfollow).parent('.msg_infobox').removeClass("friend");
	if(response.mute)
		$(".uid_" + response.mute).parent('.msg_infobox').parent('.msg').hide();
}

function forum_cb_update(board_id, action, user_name)
{
	if(action=='remove')
		if(!confirm('Are you certain you want to remove ' + user_name + ' from this board?'))
			return;
	if(action=='promote')
		if(!confirm('Are you certain you want to promote ' + user_name + ' to leadership of this board? Leaders can add and remove members, as well as delete topics and messages'))
			return;
	if(action=='demote')
		if(!confirm('Are you certain you want to demote ' + user_name + ' from leadership of this board?'))
			return;
	if(action=='unblock')
		if(!confirm('Are you certain you want to unblock ' + user_name + ' from this board?'))
			return;
	if(action=='accept')
		if(!confirm('Are you certain you want to accept the invitation request of ' + user_name + ' for this board?'))
			return;
	if(action=='reject')
		if(!confirm('Are you certain you want to reject the invitation request of ' + user_name + ' for this board?'))
			return;

	$.ajax({
		type: 'POST',
		url: '/ajax/forum_cb_update',
		data:  { board_id: board_id, user_name: user_name, action: action, key: xsrf_key },
		success: function(response)
		{
			if(response.success)
				flyover_message(response.success);
			if(response.refresh)
				window.location.reload();
			if(response.add_row)
				$('#member_list').append(response.add_row);
			if(response.remove_row)
				$('#member_list_' + response.remove_row).remove();

		},
		error: function (xhr)
     	{
     		var message = JSON.parse(xhr.responseText);
     		alert(message.error);
  		}
	});


}

function forum_topic_control(board_id, topic_id, action, target_id = 0)
{

	if(action == 'end_poll')
	{
		if(!confirm('Are you certain you want to end this poll? No more voting will be allowed and this action cannot be undone.'))
			return;
	}
	else if(action != 'flair')
	{
		if(!confirm('Are you certain you want to ' + action + ' this topic?'))
			return;
	}

	$.ajax({
		type: 'POST',
		url: '/ajax/forum_topic_control',
		data:  { board_id: board_id, topic_id: topic_id, action: action, target_id: target_id, key: xsrf_key },
		success: function(response)
		{
			if(response.success)
				flyover_message(response.success);
			if(response.refresh)
				window.location.reload();
			if(response.location)
				window.location = response.location;
			if(response.remove)
				$(response.remove).remove();
		},
		error: function (xhr)
     	{
     		var message = JSON.parse(xhr.responseText);
     		alert(message.error);
  		}
	});
}

function forum_message_control(board_id, topic_id, message_id, action)
{

	if(!confirm('Are you certain you want to ' + action + ' this message?'))
		return;

	$.ajax({
		type: 'POST',
		url: '/ajax/forum_message_control',
		data:  { board_id: board_id, topic_id: topic_id, action: action, message_id: message_id, key: xsrf_key },
		success: function(response)
		{
			if(response.success)
				flyover_message(response.success);
			if(response.refresh)
				window.location.reload();
			if(response.location)
				window.location = response.location;
			if(response.remove)
				$(response.remove).remove();
		},
		error: function (xhr)
     	{
     		var message = JSON.parse(xhr.responseText);
     		alert(message.error);
  		}
	});
}

function get_msg_tag_buttons(msgid,cnt,post)
{
	var tags = '<span class="tagbuttons '+msgid+'">' +
		'<input tabindex="-1" title="Ctrl+B" name="b" class="btn btn_mini btnbold" type="button" value="Bold" onclick="txtTag(\'b\',\''+msgid+'\')"/>' +
		'<input tabindex="-1" title="Ctrl+I" name="i" class="btn btn_mini btnitalic" type="button" value="Italic" onclick="txtTag(\'i\',\''+msgid+'\')"/>';
	if(post==1)
		tags += '<input tabindex="-1" title="Ctrl+S" name="spoiler" class="btn btn_mini" type="button" value="Spoiler" onclick="txtTag(\'spoiler\',\''+msgid+'\')"/>' +
		'<input tabindex="-1" title="Ctrl+E" name="cite" class="btn btn_mini btncite" type="button" value="Cite" onclick="txtTag(\'cite\',\''+msgid+'\')"/>' +
		'<input tabindex="-1" title="Ctrl+Q" name="quote" class="btn btn_mini" type="button" value="Quote" onclick="txtTag(\'quote\',\''+msgid+'\')"/>' +
		'<input tabindex="-1" title="Ctrl+D" name="code" class="btn btn_mini btncode" type="button" value="Code" onclick="txtTag(\'code\',\''+msgid+'\')"/>';
	tags += '</span>';
	tags += '<br/>';
	var ctrlBtn = false;
	var ctrlHeld = false;
	var msgArea = $('textarea[name="'+msgid+'"]');

	$(msgArea).before(tags);

	$(msgArea).blur(function(){ctrlBtn=false;ctrlHeld=false;});

	$(msgArea).keyup(function(e){
		if(e.which==17){ctrlBtn=false;ctrlHeld=false;}
		if(e.which==18 && ctrlHeld) ctrlBtn=true;
		if(post==1)
			msg_cc($(msgArea),cnt,'post');
	});

	$(msgArea).keydown(function(e){
		if(e.which==17){ctrlBtn=true;ctrlHeld=true;}
		if(e.which==18) ctrlBtn=false;
		if(e.which==66 && ctrlBtn){e.stopPropagation();e.preventDefault();txtTag('b',msgid);}
		else if(e.which==68 && ctrlBtn && post==1){e.stopPropagation();e.preventDefault();txtTag('code',msgid);}
		else if(e.which==69 && ctrlBtn && post==1){e.stopPropagation();e.preventDefault();txtTag('cite',msgid);}
		else if(e.which==73 && ctrlBtn){e.stopPropagation();e.preventDefault();txtTag('i',msgid);}
		else if(e.which==81 && ctrlBtn && post==1){e.stopPropagation();e.preventDefault();txtTag('quote',msgid);}
		else if(e.which==83 && ctrlBtn && post==1){e.stopPropagation();e.preventDefault();txtTag('spoiler',msgid);}
		if(post==1)
			msg_cc($(msgArea),cnt,'post');
	});

	if(post==1)
		msg_cc($(msgArea),cnt,'post');
	return;
}

function msg_cc(field,cnt,type)
{
	var msg = $(field);
	var cntdisp = (cnt*0.25);
	if($(field).val().length < (cnt * 0.75))
	{
		$('.charcount.'+$(field).attr('name')).empty();
		return;
	}
	if(type=='post')
		cnt -= (($(field).val().split(/\n|\r|"/).length - 1) * 5) + (($(field).val().split(/&/).length - 1) * 4) + (($(field).val().split(/>|</).length - 1) * 3);
	else if(type=='pm')
		cnt -= (($(field).val().split(/\n|\r/).length) - 1);
	cnt -= ($(msg).val().length);
	var cc = $('.charcount.'+$(field).attr('name'));
	if(cnt<=cntdisp)
		$(cc).html(cnt+' characters remaining');
	else
		$(cc).empty();
	$(cc).css(cnt<0 ? {color:'#f00'} : {color:''});
}

function sub_cc(field,type)
{
	var sub = $(field);
	if(type=='topictitle')
	{
		if($(sub).val().match(/[\u0100-\u2017\u201E-\uffff]/))
		{
			$('.charcount.'+$(field).attr('name')).html('Warning: Unicode characters are removed from topic titles');
			return;
		}
		var cnt = 80;
		var cntdisp = 20;
		cnt -= $(sub).val().length + (($(field).val().split(/>|</).length - 1) * 3) + (($(field).val().split(/&/).length - 1) * 4) + (($(field).val().split(/"/).length - 1) * 5);
	}
	else if(type=='subject')
	{
		if($(sub).val().match(/[\u0100-\u2017\u201E-\uffff]/))
		{
			$('.charcount.'+$(field).attr('name')).html('Warning: Unicode characters are removed from PM subjects');
			return;
		}
		var cnt = 100;
		var cntdisp = 25;
		cnt -= $(sub).val().length;
	}
	else if(type=='poll_text')
	{
		if($(sub).val().match(/[\u0100-\u2017\u201E-\uffff]/))
		{
			$('.charcount.'+$(field).attr('name')).html('Warning: Unicode characters are removed from poll titles');
			return;
		}
		var cnt = 200;
		var cntdisp = 50;
		cnt -= $(sub).val().length + (($(field).val().split(/>|</).length - 1) * 3) + (($(field).val().split(/&/).length - 1) * 4) + (($(field).val().split(/"/).length - 1) * 5);
	}
	var cc = $('.charcount.'+$(field).attr('name'));
	if(type=='topictitle' && cnt<=cntdisp)
		$(cc).html(cnt+' characters remaining (5-80 characters allowed)');
	else if(type=='subject' && cnt<=cntdisp)
		$(cc).html(cnt+' characters remaining (2-100 characters allowed)');
	else if(type=='poll_text' && cnt<=cntdisp)
		$(cc).html(cnt+' characters remaining (5-200 characters allowed)');
	else
		$(cc).empty();
	$(cc).css(cnt<0 ? {color:'#f00'} : {color:''});
}

function txtTag(tag,name)
{
	var msgArea = $('textarea[name="'+name+'"]');
	var currTag = $('.tagbuttons.'+name+' input[name="'+tag+'"]');
	var tagStart = "<"+tag+">";
	var tagEnd = "</"+tag+">";
	var c = $(msgArea)[0].selectionStart;
	var selPre = $(msgArea).val().substr(0,c);
	var selPost = $(msgArea).val().substr($(msgArea)[0].selectionEnd);
	var selTxt;

	if(c!=undefined)
	{
		selTxt = $(msgArea).val().substr(c,$(msgArea)[0].selectionEnd-c);
	}
	if(selTxt.length<1)
	{
		if($(currTag).hasClass('active'))
		{
			$(msgArea).val([$(msgArea).val().slice(0,c),tagEnd,$(msgArea).val().slice(c)].join(''));
			$(currTag).removeClass('active').css('color','#000');
			var p = c+tagEnd.length;
			setPos($(msgArea),p);
		}
		else
		{
			$(msgArea).val([$(msgArea).val().slice(0,c),tagStart,$(msgArea).val().slice(c)].join(''));
			var p = c+tagStart.length;
			$(currTag).addClass('active').css('color','#6564ff');
			setPos($(msgArea),p);
		}
	}
	else
	{
		$(msgArea).val(selPre+tagStart+selTxt+tagEnd+selPost);
		var p = c+tagStart.length+selTxt.length+tagEnd.length;
		setPos($(msgArea),p);
	}
}

function setPos(m,p)
{
	if($(m)[0].setSelectionRange)
	{
		$(m)[0].focus();
		$(m)[0].setSelectionRange(p,p);
	}
	else if($(m)[0].createTextRange)
	{
		var r = $(m)[0].createTextRange();
		r.collapse(true);
		r.moveEnd('character',p);
		r.moveStart('character',p);
		r.select();
	}
}

function quick_quote(board_id,topic_id,message_id,xsrf_key,wysiwyg)
{
	if(window.getSelection().toString().length>0)
	{
		var mb = window.getSelection().getRangeAt(0).startContainer;
		var msghi = mb.parentNode.getAttribute('name');
		if(msghi==null)
		{
			while(mb.className!='msg_body' && mb.className!='msg_body newbeta')
				mb = mb.parentNode;
			msghi = mb.getAttribute('name');
		}
		var msghitxt = window.getSelection().toString();
		if(msghi==message_id)
		{
			$.ajax({
				type: 'POST',
				url: '/ajax/forum_quote_message',
				data: {bid: board_id, tid: topic_id, mid: message_id, hi: 1, key: xsrf_key},
				success: function(response)
				{
					var d = response.quote;
					if(response.error)
					{
						alert(clean_alert(response.error));
					}
					else if(wysiwyg)
					{
						d += "<br /><blockquote>"+msghitxt.replace(/\r\n|\r|\n/gi, "<br />")+"</blockquote>";
						if($('#quill_message_new .ql-editor').text())
							quill_new.clipboard.dangerouslyPasteHTML($('#quill_message_new .ql-editor').html() + d);
						else
							quill_new.clipboard.dangerouslyPasteHTML(d);
						quill_new.insertText(quill_new.getLength(), '\n');
						quill_new.setSelection(quill_new.getLength());
						quill_new.focus();

					}
					else
					{
						var msg = $('textarea[name="messagetext"]');
						d += "&lt;quote&gt;"+msghitxt+"&lt;/quote&gt;";
						var s = d.replace(/\&lt;/gi,"<").replace(/\&gt;/gi,">").replace(/\&amp;/gi,"&").replace(/\&quot;/gi,'"');
						$(msg).val($(msg).val()+s+"\r");
						var val = $(msg).val();
						setPos(document.getElementsByName('messagetext')[0],val.length);
					}
				}
			});
		}
	}
	else
	{
		$.ajax({
			type: 'POST',
			url: '/ajax/forum_quote_message',
			data: {bid: board_id, tid: topic_id, mid: message_id, wysi: wysiwyg, key: xsrf_key},
			success: function(response)
			{
				var d = response.quote;
				if(response.error)
				{
					alert(clean_alert(response.error));
				}
				else if(wysiwyg)
				{
					if($('#quill_message_new .ql-editor').text())
						quill_new.clipboard.dangerouslyPasteHTML($('#quill_message_new .ql-editor').html() + d);
					else
						quill_new.clipboard.dangerouslyPasteHTML(d);
					quill_new.insertText(quill_new.getLength(), '\n');
					quill_new.setSelection(quill_new.getLength());
					quill_new.focus();

				}
				else
				{
					var msg = $('textarea[name="messagetext"]');
					var s = d.replace(/\&lt;/gi,"<").replace(/\&gt;/gi,">").replace(/\&amp;/gi,"&").replace(/\&quot;/gi,'"');
					$(msg).val($(msg).val() + s);
					var val = $(msg).val();
					setPos(document.getElementsByName('messagetext')[0],val.length);
				}
			}
		});
	}
}

function forum_post_new_message(board_id, topic_id, override = 0)
{

	if(!$("#quill_message_new").length)
	{
		var message_text = $("#messagetext").val();
		var is_wysiwyg = 0;
	}
	else
	{
		var is_wysiwyg = 1;
		var message_text = $("#quill_message_new .ql-editor").html()
		if($("#quill_message_new .ql-editor").html().length > 1024 * 1024 * 4)
		{
			alert("The maximum size of a post with images is 4MB. You need to remove some images or include smaller versions of them.");
			return;
		}
	}

	$("#post_new_message").prop('disabled', true).text('Processing...');

	$.ajax({
		type: 'POST',
		url: '/ajax/forum_post_message',
		data: {board: board_id, topic: topic_id, message: message_text, is_wysiwyg: is_wysiwyg, key: xsrf_key, override: override},
		success: function(d)
		{
			if(d.status=='error')
			{
				alert(clean_alert(d.status_text));
				$("#post_new_message").prop('disabled', false).text('Post New Message');
			}
			else if(d.status=='warning')
			{
				if(warning_prompt(clean_alert(d.warnings)))
				{
					forum_post_new_message(board_id, topic_id, 1);
				}
				else
					$("#post_new_message").prop('disabled', false).text('Post New Message');
			}
			else
			{
				var new_location = d.message_url.substr(0, d.message_url.indexOf('#'));
				var current_location = window.location.pathname + window.location.search;
				window.location.href = d.message_url;
				if(new_location == current_location)
					location.reload(true);
			}


		}
	});
}

function edit_message(board_id, topic_id, message_id, div_id)
{
	$.ajax({
		type: 'POST',
		url: '/ajax/forum_get_edit_message',
		data: {board: board_id, topic: topic_id, message: message_id, div_id: div_id, key: xsrf_key},
		success: function(response)
		{
			if(response)
			{
				if($("#msg_edit").attr('data-id'))
				{
					$("#msg_" + $("#msg_edit").attr('data-id') + " .msg_body").show();
					$("#msg_" + $("#msg_edit").attr('data-id') + " .msg_below").show();
				}

				$("#msg_edit").remove();
				$("#msg_" + div_id + " .msg_body").hide();
				$("#msg_" + div_id + " .msg_below").hide();
				$("#msg_" + div_id).prepend('<div id="msg_edit" data-id="' + div_id + '"></div>');
				$("#msg_edit").html(response);
			}
			else
			{
				$("#msg_" + div_id + " .action_after").text("This message cannot be edited at this time");
			}
		}
	});

}

function cancel_edit(div_id)
{
	$("#msg_" + div_id + " .msg_body").show();
	$("#msg_" + div_id + " .msg_below").show();
	$("#msg_edit").remove();
}

function forum_save_edit(board_id, topic_id, message_id, override = 0)
{
	if(!$("#quill_message_edit").length)
	{
		var message_text = $("#edit_" + message_id).val();
		var is_wysiwyg = 0;
	}
	else
	{
		var is_wysiwyg = 1;
		var message_text = $("#quill_message_edit .ql-editor").html()
		if($("#quill_message_edit .ql-editor").html().length > 1024 * 1024 * 4)
		{
			alert("The maximum size of a post with images is 4MB. You need to remove some images or include smaller versions of them.");
			return;
		}
	}

	$("#save_edit").prop('disabled', true).text('Processing...');

	$.ajax({
		type: 'POST',
		url: '/ajax/forum_save_edit_message',
		data: {board: board_id, topic: topic_id, message: message_id, message_text: message_text, is_wysiwyg: is_wysiwyg, key: xsrf_key, override: override},
		success: function(d)
		{
			if(d.status=='error')
			{
				alert(clean_alert(d.status_text));
				$("#save_edit").prop('disabled', false).text('Save Changes');

			}
			else if(d.status=='warning')
			{
				if(warning_prompt(clean_alert(d.warnings)))
					forum_save_edit(board_id, topic_id, message_id, 1);
				else
					$("#save_edit").prop('disabled', false).text('Save Changes');
			}
			else
			{
				window.location.href = d.message_url;
				location.reload(true);
			}
		}
	});
}

function forum_post_new_topic(board_id, override = 0)
{
	if(!$("#quill_message_topic").length)
	{
		var message_text = $("#messagetext").val();
		var is_wysiwyg = 0;
	}
	else
	{
		var is_wysiwyg = 1;
		var message_text = $("#quill_message_topic .ql-editor").html()
		if($("#quill_message_topic .ql-editor").html().length > 1024 * 1024 * 4)
		{
			alert("The maximum size of a post with images is 4MB. You need to remove some images or include smaller versions of them.");
			return;
		}
	}

	if($('.flair_select .flair.current').length)
		var flair_id = $('.flair_select .flair.current').attr('id').substr(6);
	else
		var flair_id = 1;

	$("#post_new_topic").prop('disabled', true).text('Processing...');

	var poll_data = {};
	if($("#forum_nt_poll").is(':visible'))
	{
		poll_data['poll_title'] = $("#poll_title").val();
		poll_data['min_level'] = $("#min_level").val();
		var poll_option = {};
		for(var i=1;i<=10;i++)
		{
			if($("#poll_option_" + i).val())
				poll_option[i] = $("#poll_option_" + i).val();
		}
		poll_data['poll_option'] = poll_option;
	}

	$.ajax({
		type: 'POST',
		url: '/ajax/forum_post_topic',
		data: {board: board_id, topic: $("#topic_title").val(), flair: flair_id, poll: JSON.stringify(poll_data), message: message_text, override: override, key: xsrf_key, is_wysiwyg: is_wysiwyg},
		success: function(d)
		{
			if(d.status=='error')
			{
				alert(clean_alert(d.status_text));
				$("#post_new_topic").prop('disabled', false).text('Create New Topic');
			}
			else if(d.status=='warning')
			{
				if(warning_prompt(clean_alert(d.warnings)))
					forum_post_new_topic(board_id, 1);
				else
					$("#post_new_topic").prop('disabled', false).text('Create New Topic');
			}
			else
			{
				window.location.href = d.topic_url;
			}

		}
	});
}

function forum_preview_new_message(board_id, topic_id)
{
	if($("#quill_message_new").length)
	{
		var is_wysiwyg = 1;
		var message_text = $("#quill_message_new .ql-editor").html()
		if($("#quill_message_new .ql-editor").html().length > 1024 * 1024 * 4)
		{
			alert("The maximum size of a post with images is 4MB. You need to remove some images or include smaller versions of them.");
			return;
		}
	}
	else if ($("#quill_message_topic").length)
	{
		var is_wysiwyg = 1;
		var message_text = $("#quill_message_topic .ql-editor").html()
		if($("#quill_message_topic .ql-editor").html().length > 1024 * 1024 * 4)
		{
			alert("The maximum size of a post with images is 4MB. You need to remove some images or include smaller versions of them.");
			return;
		}
	}	
	else 
	{
		var message_text = $("#messagetext").val();
		var is_wysiwyg = 0;
	}

	if($('.flair_select .flair.current').length)
		var flair_id = $('.flair_select .flair.current').attr('id').substr(6);
	else
		var flair_id = 1;

	var poll_data = {};
	if($("#forum_nt_poll").is(':visible'))
	{
		poll_data['poll_title'] = $("#poll_title").val();
		poll_data['min_level'] = $("#min_level").val();
		var poll_option = {};
		for(var i=1;i<=10;i++)
		{
			if($("#poll_option_" + i).val())
				poll_option[i] = $("#poll_option_" + i).val();
		}
		poll_data['poll_option'] = poll_option;
	}

	$.ajax({
		type: 'POST',
		url: '/ajax/forum_preview_message',
		data: {board: board_id, topic: topic_id, topic_title: $("#topic_title").val(), flair: flair_id, poll: JSON.stringify(poll_data), message: message_text, key: xsrf_key, is_wysiwyg: is_wysiwyg},
		success: function(d)
		{
			if(d.status=='error')
			{
				alert(clean_alert(d.status_text));
			}
			else
			{
				$("#quoted_message").html(d.formatted_message_text);
				$("#quoted_message").dialog({resizable: true, dialogClass: "reg_dialog", closeText: "X", height: "auto", maxHeight: $(window).height(), width: "80%", modal: true, open: function(){$('.ui-widget-overlay').bind('click',function(){$('#quoted_message').dialog('close');});} });
			}


		}
	});
}


function qna_show_ask_module(pid, page_type = '')
{
	if($(document).width() < 750)
		var box_width = "95%";
	else
		var box_width = "60%";

	$.ajax({
		type: 'POST',
		url: '/ajax/qna_ask_module',
		data: {pid: pid, ptt: page_type, key: xsrf_key},
		success: function(response)
		{
			$('#site_dialog').html(response);
			$('#site_dialog').dialog({	resizable: false, dialogClass: "reg_dialog", closeText: "X", height: "auto", width: box_width, modal: true });
		},
		error: function (xhr)
     	{
     		var message = JSON.parse(xhr.responseText);
     		alert(message.error);
  		}
	});
}

function qna_question_check()
{
	var question = $("#question").val().trim();

	$(".qna_err").css("text-decoration","none");
	$(".qna_ask_warning.qtitle").html('');
	if(question=='')
		$(".qna_ask_next").attr("disabled", true);
	else if(question.split(" ").length < 3)
	{
		$(".qna_ask_next").attr("disabled", true);
		$("#qna_err_words").css("text-decoration","underline");
	}
	else if(question.length < 15)
	{
		$(".qna_ask_next").attr("disabled", true);
		$("#qna_err_15").css("text-decoration","underline");
	}
	else if(question.substr(-1, 1)!='?')
	{
		$(".qna_ask_next").attr("disabled", true);
		$("#qna_err_mark").css("text-decoration","underline");
	}
	else if(question.length > 120)
	{
		$(".qna_ask_next").attr("disabled", true);
		$("#qna_err_120").css("text-decoration","underline");
	}
	else
	{
		$(".qna_ask_next").attr("disabled", false);
		$(".qna_ask_question").text(question);
		if(question.match(/(fuck|shit|bitch)/i))
			$(".qna_ask_warning.qtitle").html("Please do not use inappropriate language in your question.");
		else if(question.match(/(give me|trade|event code|friend code|send me|friend safari)/i))
			$(".qna_ask_warning.qtitle").html("Please do not use Q&amp;A to trade items or exchange codes; use the message boards instead.");
		else if (!question.match(/^(can|who|why|where|when|what|is|do|how|does|will|which|are|should|could)/i))
			$(".qna_ask_warning.qtitle").html("Make sure your question is a full sentence; &quot;How&quot;, &quot;Where&quot;, and &quot;What&quot; are the most common ways to start.");
		else if(question.match(/(worth buying)/i))
			$(".qna_ask_warning.qtitle").html("Please do not use Q&amp;A to ask if a game is worth buying; use the message boards or read its reviews instead.");
		else
			$(".qna_ask_warning.qtitle").html('');
	}

	if($('.flair_select .flair.current').length==0)
	{
		$('.qna_ask_warning.qflair').html('You must select a valid question type.');
		$('.qna_ask_next').attr('disabled', true);
	}
	else
	{
		$('.qna_ask_warning.qflair').html('');
		$(".qna_ask_flair").text($('.flair_select .flair.current').text());
	}
}

function qna_details_check()
{
	var details = $("#details").val().trim();

	$(".qna_err").css("text-decoration","none");
	$(".qna_ask_warning.qbody").html('');

	if(details=='')
		$(".qna_ask_next").attr("disabled", true);
	else if(details.split(" ").length < 5)
	{
		$(".qna_ask_next").attr("disabled", true);
		$("#qna_err_words").css("text-decoration","underline");
	}
	else if(details.length < 25)
	{
		$(".qna_ask_next").attr("disabled", true);
		$("#qna_err_25").css("text-decoration","underline");
	}
	else if(details.length > 4000)
	{
		$(".qna_ask_next").attr("disabled", true);
		$("#qna_err_4000").css("text-decoration","underline");
	}
	else
	{
		$(".qna_ask_next").attr("disabled", false);
		$(".qna_ask_details").html(details.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/\n/g, "<br />"));
		if(details.match(/(fuck|shit|bitch|nig|cunt)/i))
			$(".qna_ask_warning.qbody").html("Please do not use inappropriate language in your question details.");
		else if(details.match(/https:\/\/(?!gamefaqs\.gamespot\.com)/i))
			$(".qna_ask_warning.qbody").html("Only links to other GameFAQs pages are allowed in Q&amp;A.");
	}
}

function qna_spoiler()
{
	$("#qna_spoiler").html('');
	if($("#spoiler").prop('checked'))
		$("#qna_spoiler").html("This question contains spoilers, so we'll hide the title for people who haven't finished the game yet.");
}

function qna_email_check()
{
	$('.qna_ask_next').attr('disabled', true);
	clearTimeout(ck_timeout);
	var mail_check = $('#qna_email').val();
	if(mail_check.length < 1)
	{
		$('#mail_icon').removeClass();
		$('#mail_error').html('');
	}
	else if(!mail_check.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/))
	{
		$('#mail_error').html("You must enter a valid email address");
		$('#mail_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else
	{
		ck_timeout = setTimeout(qna_mail_ajax_check, 500);
		$('#mail_icon').removeClass().addClass('fa fa-pulse fa-spinner');
	}
}

function qna_mail_ajax_check()
{
	$.ajax({
		type: 'POST',
		url: '/ajax/full_email_check',
		data:   { email: $('#qna_email').val(), key: xsrf_key },
		success: function(response)
		{
			if(response==0)
			{
				$('#mail_icon').removeClass().addClass('fa reg_valid fa-check');
				$('#mail_error').html('');
				$('.qna_ask_next').attr('disabled', false);
				$('#email_exists').hide();
				$('#new_email').show();
			}
			else if(response==5)
			{
				$('#mail_icon').removeClass().addClass('fa reg_valid fa-check');
				$('#mail_error').html('');
				$('.qna_ask_next').attr('disabled', false);
				$('#email_exists').show();
				$('#new_email').hide();
			}
			else
			{
				$('#mail_icon').removeClass().addClass('fa reg_invalid fa-remove');
				$('#mail_error').html("You must enter a valid email address");
			}
		}
	});
}

function qna_password_check()
{
	$('.qna_ask_next').attr('disabled', true);

	var pass_check = $('#qna_password').val();
	if(pass_check.length < 1)
	{
		$('#pass_icon').removeClass();
		$('#pass_error').html('');
	}
	else if(pass_check.length < 8)
	{
		$('#pass_error').html("Your password must be at least 8 characters long");
		$('#pass_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else if(!pass_check.match(/[a-z]/))
	{
		$('#pass_error').html("You must include at least one lower-case letter");
		$('#pass_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else if(!pass_check.match(/[A-Z]/))
	{
		$('#pass_error').html("You must include at least one upper-case letter");
		$('#pass_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else if(!pass_check.match(/[0-9!"#\$\%\&\'\(\)\*\+,-\.\/:;<=>\?@\[\\\]\^_`{\|}~]/))
	{
		$('#pass_error').html("You must include at least one number or symbol");
		$('#pass_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else if(pass_check == $('#qna_user_name').val())
	{
		$('#pass_icon').removeClass().addClass('fa reg_invalid fa-remove');
		$('#pass_error').html('Your password may not be identical to your username');
	}
	else
	{
		$('#pass_icon').removeClass().addClass('fa reg_valid fa-check');
		$('#pass_error').html('');
		if($('#name_icon').hasClass('reg_valid'))
			$('.qna_ask_next').attr('disabled', false);
	}
}

function qna_user_name_check()
{
	$('.qna_ask_next').attr('disabled', true);
	clearTimeout(ck_timeout);
	var name_check = $('#qna_user_name').val();
	if(name_check.length < 1)
	{
		$('#name_icon').removeClass();
		$('#name_error').html('');
	}
	else if(name_check.length < 3 || name_check.length > 15)
	{
		$('#name_error').html("User names must be between 3 and 15 characters long");
		$('#name_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else if(name_check.match(/[^a-zA-Z0-9_-]/))
	{
		$('#name_error').html("User names may only include letters, numbers, dashes, and underscores");
		$('#name_icon').removeClass().addClass('fa reg_invalid fa-remove');
	}
	else
	{
		$('#name_icon').removeClass().addClass('fa fa-pulse fa-spinner');
		ck_timeout = setTimeout(qna_name_ajax_check, 500);
	}
}

function qna_name_ajax_check()
{
	$.ajax({
		type: 'POST',
		url: '/ajax/username_check',
		data:  { name: $('#qna_user_name').val(), key: xsrf_key },
		success: function(response)
		{
			if(response)
			{
				$('#name_icon').removeClass().addClass('fa reg_invalid fa-remove');
				$('#name_error').html("This user name is not available");
			}
			else
			{
				$('#name_icon').removeClass().addClass('fa reg_valid fa-check');
				$('#name_error').html('');
				if($('#pass_icon').hasClass('reg_valid'))
					$('.qna_ask_next').attr('disabled', false);

			}
		}
	});
}


function qna_random()
{
	$('.qna_ask_next').attr('disabled', true);
	qna_randomize_pass();
	qna_randomize_name();

}

function qna_randomize_name()
{
	$.ajax({
		type: 'GET',
		url: '/ajax/randomize_name',
		success: function(response)
		{
			$("#qna_user_name").val(response);
			qna_user_name_check();
		}
	});

}

function qna_randomize_pass()
{
	var pass = '';
	var elem = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890';
	for($i=0;$i<=11;$i++)
		pass = pass + elem.substr(Math.floor((Math.random() * 71)), 1);
	$('#qna_password').val(pass);
	qna_password_check();
	if(!$('#pass_icon').hasClass('reg_valid'))
		qna_randomize_pass();

}

function qna_toggle_pass()
{
	if(document.getElementById('qna_password').type == 'password')
		document.getElementById('qna_password').type = 'text';
	else
		document.getElementById('qna_password').type = 'password';
}

function qna_flair_set(new_id)
{
	$(".flair_select .flair_option").removeClass("current");
	$(".flair_select #flair_" + new_id).addClass("current");
}

function qna_check_question(step)
{
	if($('.flair_select .flair.current'))
		var category = $('.flair_select .flair.current').attr('data-id');
	else
		var category = 0;

	var details = $("#details").val()
	if(step==2)
		details = 'this is a dummy 25 character detail';
	$(".qna_ask_next").prop("disabled", true);
	$.ajax({
		type: 'POST',
		url: '/ajax/qna_check_question',
		data: { pid: $("#pid").val(), 
			    que: $("#question").val(), 
			    cat: category, 
			    det: details, 
			    key: xsrf_key },
		success: function(response)
		{
			if(response.error)
			{
				alert(response.error);
				$(".qna_ask_next").prop("disabled", false);
			}
			else
				qna_ask_step(step);
		}

	});
}


function qna_log_in_and_post()
{
	$(".qna_ask_back, .qna_ask_next").prop("disabled", true);
	$.ajax({
		type: 'POST',
		url: '/ajax/user_login',
		data:   { email: $('#qna_email').val(), password: $('#password').val(), key: xsrf_key },
		success: function(response)
		{
			if(response != 'OK')
			{
				$(".qna_ask_back, .qna_ask_next").prop("disabled", false);
				alert(response);
			}
			else
			{
				qna_post_question(pid);
			}
		}
	});
}

function qna_register_and_post()
{
	$(".qna_ask_back, .qna_ask_next").prop("disabled", true);
	$.ajax({
		type: 'POST',
		url: '/ajax/register_account',
		data:   { user_name: $('#qna_user_name').val(), password: $('#qna_password').val(), email: $('#qna_email').val(), key: xsrf_key },
		success: function(response)
		{
			if(response != 'OK')
			{
				alert(response);
				$(".qna_ask_back, .qna_ask_next").prop("disabled", false);
			}
			else
			{
				qna_post_question(pid);
			}
		}
	});
}

function qna_post_question()
{
	if($('.flair_select .flair.current'))
		var category = $('.flair_select .flair.current').attr('data-id');
	else
		var category = 0;

	if($("#spoiler").prop('checked'))
		var spoiler = 1;
	else
		var spoiler = 0;

	if(!$("#pid").val() || !category || !$("#question").val() || !$("#details").val())
	{
		alert("There was an error processing your question; please go back and check to make sure everything looks right!");
		return;
	}

	$(".qna_ask_back, .qna_ask_next").prop("disabled", true);

	$.ajax({
		type: 'POST',
		url: '/ajax/qna_ask_question',
		data: { pid: $("#pid").val(), 
			    que: $("#question").val(), 
			    cat: category, 
			    det: $("#details").val(), 
			    spo: spoiler, 
			    ptt: $("#page_type_text").val(),
			    key: xsrf_key },
		success: function(response)
		{
			if(response.url)
			{
				window.location = response.url;
			}
			else if(response.error)
			{
				alert(response.error);
				$(".qna_ask_back, .qna_ask_next").prop("disabled", false);
			}
		}

	});
}
