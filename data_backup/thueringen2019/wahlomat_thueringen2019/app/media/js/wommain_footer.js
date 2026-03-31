var $window = $jQueryWom(window);
var $document = $jQueryWom(document);
var $html = $jQueryWom('html');
var $body = $jQueryWom('body');
var $wom = $jQueryWom('#wom');
var $wrapper = $jQueryWom('.wom_wrapper');
var viewType_last, viewType;
var pixelratio;

// browser detection & touch control
/*var isMSIE8orOlder = false; wird in snippet_meta.php gesetzt*/
var tabNoResize = false;
var navU = navigator.userAgent;
var touchControl = navU.match(/(iPhone|iPad|Android|IEMobile|wahlomat_swift)/i) ? true : false;
var isIphone = navU.match(/(iPhone)/i) ? true : false;
var isAndroidPhone = navU.match(/(Android.*Mobile)/i) ? true : false;
var isAndroidTablet = navU.match(/(Android)/i) && ($jQueryWom(window).width() < 768) ? true : false;
var isSafari = navU.match(/(Safari)/i) && !navU.match(/(Chrome)/i) ? true : false;
var isMSIE = navU.match(/(MSIE)/i) || !!navU.match(/Trident.*rv[ :]*11\./) ? true : false; //IE11
var isIEMobile = navU.match(/IEMobile/i) //IE Mobile
var isNexusTen = navU.match(/Nexus 10/i) ? true : false;
// detect Android browser (not Chrome)
var isAndroidMobile = navU.indexOf('Android') > -1 && navU.indexOf('Mozilla/5.0') > -1 && navU.indexOf('AppleWebKit') > -1;
var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
var resultAppleWebKitRegEx = regExAppleWebKit.exec(navU);
var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(navU)[1]));
var isAndroidBrowser = isAndroidMobile && appleWebKitVersion !== null && appleWebKitVersion < 537;
if (isAndroidBrowser) {
	$wom.addClass('android-browser');
}

//isTouchSupported = touchControl = true;
//alert('TS:'+isTouchSupported);
//alert('TC:'+touchControl);

if(touchControl == true){
	$body.addClass('touchcontrol');
} else {
    $body.addClass('desktopcontrol');
}

if(isTouchSupported == true){
	$wom.addClass('desktophoverdisable');
} else {
	$wom.addClass('desktophover');
}

$window.on('resize', function(){
	if(touchControl == true){
		$body.addClass('touchcontrol');
	} else {
		$body.removeClass('touchcontrol');
	}
});

// viewTypes: desktop min 1024 // tablet max 1023, min 788 // phone max 767
mediaQueryMode = getModeByMediaQuery();

if (mediaQueryMode == '') {
    if( touchControl == true || isSafari) {
        var w = $window.innerWidth();
    } else {
		//var w = $window.innerWidth() +17; // 17 = scrollbar width
        var w = $window.innerWidth() + 17;
    }
} else if (mediaQueryMode == 'phone') {
    w = 600;
} else if (mediaQueryMode == 'tablet') {
    w = 800;
} else /*if (mediaQueryMode == 'desktop')*/ {
    w = 930;
}


/**
 * Touch-Event etwas verzoeern, damit auf dem Iphone auch Clicks
 * ohne Mousenter angezeigt werden, vor dem Reload
 */
reClick = false;

var touchOnMilliseconds = 0;
var touchPageLoad = 0;

$jQueryWom( document ).ready(function() {
    var dateObject = new Date();
    touchPageLoad = dateObject.getTime()
});

/*
$jQueryWom('.wom_entscheidung a').click( function() {
	if ($jQueryWom(this).hasClass('wom_decision')) {
		$jQueryWom(this).removeClass('wom_decision');
	} else {
		$jQueryWom('.wom_decision').addClass('wom_decision');
		$jQueryWom('.wom_decision').removeClass('wom_decision');
		$jQueryWom(this).addClass('wom_decision');
	};
});
*/

$jQueryWom('.wom_entscheidung a').on('click' , function(e) {
    if ($jQueryWom(this).hasClass('wom_decision')) {
		$jQueryWom(this).removeClass('wom_decision');
	} else {
		$jQueryWom('.wom_decision').addClass('wom_decision');
		$jQueryWom('.wom_decision').removeClass('wom_decision');
		$jQueryWom(this).addClass('wom_decision');
	};
    if (isTouchSupported) {
        // Wenn der Touch-Event nicht stehen geblieben ist,
        // dann Retrigger damit man sieht, was gelickt wurde
        $jQueryWom(this).addClass('touch');

        // In der App-Version fuehrt dies zu einem Sprung zum Start
        // egal wo man ist
        if (gWomAppVersion != 1) {
            var dateObject = new Date();
            if (((dateObject.getTime() - touchOnMilliseconds) < 150)
              ||(touchOnMilliseconds == 0)) {
                var decisionButtonHref = $jQueryWom(this).attr("href");
                e.stopPropagation();
                setTimeout(function(){
                    window.location = decisionButtonHref;
                }, 150);
                return false;
            } else {
                // Do Nothing
            }
        }
    }
});



// Global touch and mouse events
$jQueryWom('a, button, .wom_label_check').on('mouseenter touchstart MSPointerDown', function() {
    if (isTouchSupported) {
        // Kein Touch-Event wenn der Pageload erst 100 Millisekunden her ist
        // das ist dann ein Ghost-Event von der vorherigen Seiten
        var dateObject = new Date();
        if ((touchPageLoad != 0)
          &&((dateObject.getTime() - touchPageLoad) > 250)) {
    	    $jQueryWom(this).addClass('touch');
    	    var dateObject = new Date();
    	    touchOnMilliseconds = dateObject.getTime();
    	}
	}
}).on('mouseleave touchend touchcancel MSPointerUp', function() {
    if (isTouchSupported) {
        //if ($jQueryWom(this).parent().parent().attr('class') == 'wom_entscheidung') return;
	    $jQueryWom(this).removeClass('touch');
	    //touchOnMilliseconds = 0;
	}
});




if($jQueryWom('#wom').hasClass('tablet_phone')){
	if (w >= 631){
		$jQueryWom('#wom').removeClass('phone').addClass('tablet'); viewType = 'tablet';
	} else if(w <= 630 ){
		$jQueryWom('#wom').removeClass('tablet').addClass('phone'); viewType = 'phone';
	}
} else if($jQueryWom('#wom').hasClass('static_tablet')){
	$jQueryWom('#wom').removeClass('desktop').removeClass('phone').addClass('tablet'); viewType = 'tablet';
} else if($jQueryWom('#wom').hasClass('static_phone')){
	$jQueryWom('#wom').removeClass('desktop').removeClass('tablet').addClass('phone'); viewType = 'phone';
} else if($jQueryWom('#wom').hasClass('static_desktop')){
	$jQueryWom('#wom').removeClass('phone').removeClass('tablet').addClass('desktop'); viewType = 'desktop';
} else {
	if (w >= 911){
		$jQueryWom('#wom').removeClass('phone').removeClass('tablet').addClass('desktop'); viewType = 'desktop';
	} else if (w <= 910 && w >= 631){
		$jQueryWom('#wom').removeClass('phone').removeClass('desktop').addClass('tablet'); viewType = 'tablet';
	} else if(w <= 630 ){
		$jQueryWom('#wom').removeClass('desktop').removeClass('tablet').addClass('phone'); viewType = 'phone';
	}
}

ieSetStaticClass(viewType_last, viewType);

initonReady();

versionLayoutControl(viewType);

/*Auswertung*/
openThesen();

/*Stern Checkbox (Gewichtung)*/
starCheckbox();

/*Infoboxen Parteien (Parteienauswahl)*/
infoboxParties();

$jQueryWom('#navi').css('display','block');
accordion();


$window.load(function(){
	slider();
});

// Update .wom_main_wrapper on resize
$window.on('resize', function(){

    if (tabNoResize== 1) {
        // IE macht einen Resize beim Aufzuklappen der Zusatzinfos
        tabNoResize = 0;
        return;
    }

	viewType_last = viewType;

	/**
	 * Checken ueber Divs welche Media-Queries angewendet werden
	 * damit die Klassen korrekt draufgelegt werden, ansonsten kann es durch den Scrollbar
	 * der im Firefox drin ist aber im Chrome drau�en zu Problemen kommen
	 */
	mediaQueryMode = getModeByMediaQuery();
	if (mediaQueryMode == '') {
	    if( touchControl == true || isSafari) {
	        var w = $window.innerWidth();
        } else {
    		//var w = $window.innerWidth() +17; // 17 = scrollbar width
	        var w = $window.innerWidth() + 17;
	    }
	} else if (mediaQueryMode == 'phone') {
	    w = 600;
	} else if (mediaQueryMode == 'tablet') {
	    w = 800;
	} else /*if (mediaQueryMode == 'desktop')*/ {
	    w = 930;
	}
	if($jQueryWom('#wom').hasClass('tablet_phone')){
		if (w >= 631) {
			$jQueryWom('.wom_main_wrapper').removeClass('phone').removeClass('desktop').addClass('tablet'); viewType = 'tablet';
		} else if(w <= 630 ) {
			$jQueryWom('.wom_main_wrapper').removeClass('desktop').removeClass('tablet').addClass('phone'); viewType = 'phone';
		}
	} else if(($jQueryWom('#wom').hasClass('real_static'))
	        &&($jQueryWom('#wom').hasClass('static_phone') || $jQueryWom('#wom').hasClass('static_tablet') || $jQueryWom('#wom').hasClass('static_desktop'))) {
	    // Hier dann nichts machen ist und bleibt static
	} else {
		if (w >= 911) {
			$jQueryWom('.wom_main_wrapper').removeClass('phone').removeClass('tablet').addClass('desktop'); viewType = 'desktop';
		} else if (w <= 910 && w >= 631) {
			$jQueryWom('.wom_main_wrapper').removeClass('phone').removeClass('desktop').addClass('tablet'); viewType = 'tablet';
		} else if(w <= 630 ) {
			$jQueryWom('.wom_main_wrapper').removeClass('desktop').removeClass('tablet').addClass('phone'); viewType = 'phone';
		}
	}


    versionLayoutControl(viewType_last, viewType);

    ieSetStaticClass(viewType_last, viewType);

});

function getModeByMediaQuery() {
    mediaQueryMode = '';
    if ($jQueryWom("#wom_cmq_desktop").is(":visible")) {
        mediaQueryMode = 'desktop';
    } else if ($jQueryWom("#wom_cmq_tablet").is(":visible")) {
        mediaQueryMode = 'tablet';
    }else if ($jQueryWom("#wom_cmq_phone").is(":visible")) {
        mediaQueryMode = 'phone';
    }
    //console.log("media-query mode: " + mediaQueryMode);
    return mediaQueryMode;
}


function versionLayoutControl(){
	if((viewType_last == 'desktop' || viewType_last == undefined) && viewType == 'tablet'){
		$jQueryWom('#wom #content').append($jQueryWom('#wom #navi'));
		$jQueryWom('#wom #navi').append($jQueryWom('#wom #logos'));

	} else if((viewType_last == 'desktop' || viewType_last == undefined) && viewType == 'phone') {
		$jQueryWom('#wom #content').append($jQueryWom('#wom #navi'));
		$jQueryWom('#wom #navi').append($jQueryWom('#wom #logos'));
		$jQueryWom('.wom_main_navi').append($jQueryWom('.wom_impressum'));
		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').attr('role','button');

		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').attr('aria-controls','wom-zusatz-tab');
		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').attr('aria-expanded','false');

		if ($jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').hasClass('wom_open')) {
		    $jQueryWom('a.wom_accordion-tab').attr('aria-expanded','true');
		}

		//$jQueryWom('.wom_main_navi').find('+ ul').attr('role', 'tab-panel');

		// $jQueryWom('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();

		// Fuer die mobile-App-Version die Min-Height in der Phone-Darstellung auf 100%, damit das Orange
		// bis zum Rand unten geht. Dafuer auch das Margin wegmachen
        if($jQueryWom('.wom_navi').length < 1 && $jQueryWom('.wom_footer').length < 1){
            if (gWomAppVersion == 1) {
    			$jQueryWom('.wom_main_content').css('margin-bottom','0');
    			$jQueryWom('.wom_wahlomat_startseite').css('min-height',$jQueryWom('body').height());
    			//-parseInt($jQueryWom('.wom_wahlomat_startseite').css('padding-bottom')));
    			$jQueryWom('.wom_wahlomat').css('min-height',$jQueryWom('body').height());//-parseInt($jQueryWom('.wom_wahlomat').css('padding-bottom')));
    		}
		}
	} else if(viewType_last == 'tablet' && viewType == 'desktop'){
		$jQueryWom('#wom #content').prepend($jQueryWom('#wom #navi'));
		$jQueryWom('#wom #navi').prepend($jQueryWom('#wom #logos'));

	} else if(viewType_last == 'tablet' && viewType == 'phone'){
		//$jQueryWom('.wom_main_navi').append($jQueryWom('.wom_impressum')).find('a.wom_accordion-tab').attr('role','tab').find('+ ul').attr('role', 'tab-panel');
		$jQueryWom('.wom_main_navi').append($jQueryWom('.wom_impressum'));
		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').attr('role','button');

		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').attr('aria-controls','wom-zusatz-tab');
		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').attr('aria-expanded','false');

		if ($jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').hasClass('wom_open')) {
		    $jQueryWom('a.wom_accordion-tab').attr('aria-expanded','true');
		}


		//$jQueryWom('.wom_main_navi').find('+ ul').attr('role', 'tab-panel');
		// $jQueryWom('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();

	} else if(viewType_last == 'phone' && viewType == 'desktop'){
		$jQueryWom('#wom #content').prepend($jQueryWom('#wom #navi'));
		$jQueryWom('#wom #navi').prepend($jQueryWom('#wom #logos'));
		$jQueryWom('.wom_main_navi ul').append($jQueryWom('.wom_impressum'));
		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').attr('role','').find('+ ul').attr('role', '');
		// $jQueryWom('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();
		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').removeAttr('aria-controls');
		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').removeAttr('aria-expanded');
	} else if(viewType_last == 'phone' && viewType == 'tablet'){

		$jQueryWom('.wom_main_navi ul').append($jQueryWom('.wom_impressum'));
		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').removeAttr('role').find('+ ul').removeAttr('role');
		// $jQueryWom('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();
		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').removeAttr('aria-controls');
		$jQueryWom('.wom_main_navi').find('a.wom_accordion-tab').removeAttr('aria-expanded');

	} else if(viewType_last == 'phone'){
		$jQueryWom('.wom_accordion-tab +ul').show();
		// $jQueryWom('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();
	} else {
		return;
	}
}

function ieSetStaticClass(viewType_last, viewType ){
    if ((typeof isMSIE8orOlder  != 'undefined')&&(isMSIE8orOlder)) {
	    //console.log('VL:'+viewType_last+ 'VT:'+viewType);
	    /**
	     * IE hat keine Media-Queries hier das dann ueber die Static-Sachen emulieren
	     * Wenn es ein real_static ist, dann nicht mehr aendern
	     */
	    if (!$jQueryWom('.wom_main_wrapper').hasClass('real_static')) {
	        if ((viewType_last == undefined)||(viewType_last != viewType)) {
	            //console.log('check');
	            if (viewType == 'phone') {
	                $jQueryWom('.wom_main_wrapper').removeClass('static_desktop');
	                $jQueryWom('.wom_main_wrapper').removeClass('static_tablet');
	                $jQueryWom('.wom_main_wrapper').removeClass('desktop');
	                $jQueryWom('.wom_main_wrapper').removeClass('tablet');
	                $jQueryWom('.wom_main_wrapper').addClass('static_phone');
	                $jQueryWom('.wom_main_wrapper').addClass('phone');
	            } else if (viewType == 'tablet') {
	                $jQueryWom('.wom_main_wrapper').removeClass('static_desktop');
	                $jQueryWom('.wom_main_wrapper').removeClass('static_phone');
	                $jQueryWom('.wom_main_wrapper').removeClass('desktop');
	                $jQueryWom('.wom_main_wrapper').removeClass('phone');
	                $jQueryWom('.wom_main_wrapper').addClass('static_tablet');
	                $jQueryWom('.wom_main_wrapper').addClass('tablet');
	            } else if (viewType == 'desktop') {
	                $jQueryWom('.wom_main_wrapper').removeClass('static_tablet');
	                $jQueryWom('.wom_main_wrapper').removeClass('static_phone');
	                $jQueryWom('.wom_main_wrapper').removeClass('tablet');
	                $jQueryWom('.wom_main_wrapper').removeClass('phone');
	                $jQueryWom('.wom_main_wrapper').addClass('static_desktop');
	                $jQueryWom('.wom_main_wrapper').addClass('desktop');
	            }
	        }
	    }

	}
}

function initonReady(){
	if($jQueryWom('#wom #socialshareprivacy').length > 0){
		$jQueryWom('#wom #socialshareprivacy').socialSharePrivacy();
	}

	$jQueryWom('.wom_faq_list .wom_trigger').next().hide();

	$jQueryWom('.wom_ergebnis_balken').not('.wom_ergebnis_balken_active').next().hide();

	if ((typeof isMSIE8orOlder  != 'undefined')&&(isMSIE8orOlder)) {
	    $jQueryWom('.wom_label_check + .wom_star').css({'background':'url(./media/pix/iconie8/dot_black_8px.png) no-repeat 4px 3px'});
	} else {
	    $jQueryWom('.wom_label_check + .wom_star').css({'background':'url(./media/pix/icon/dot_black_8px.png) no-repeat 4px 4px','background-size':'50% auto'});
	}

    //$jQueryWom('#bngewichtung div.wom_langethese_tab_active').attr("aria-expanded","true");
    $jQueryWom('.wom_langethese_tab').not('.wom_langethese_tab_active').parent().next().hide();
    $jQueryWom('.wom_langethese_tab').not('.wom_langethese_tab_active').attr("aria-expanded","false");

    $jQueryWom('.wom_langethese_tab.wom_langethese_tab_active').parent().next().attr("aria-hidden","false");
    $jQueryWom('.wom_langethese_tab.wom_langethese_tab_active').attr("aria-expanded","true");


	$jQueryWom('#bngewichtung input[type=checkbox].wom_hidecheckbox').attr('tabindex','-1');
	$jQueryWom('#bngewichtung input[type=checkbox].wom_hidecheckbox').css('opacity','0');
    $jQueryWom('#bngewichtung label').attr('tabindex','0');
    $jQueryWom('#bngewichtung .wom_langethese_tab').attr('tabindex','0');



	$jQueryWom('#formparteiauswahl li div.wom_pbox').css({'display':'none', 'position':'absolute'});
	$jQueryWom('#formparteiauswahl li').css({'float':'left'});

	$jQueryWom('#formparteiauswahl input[type=checkbox].wom_hidecheckbox2').css('opacity','0');
	$jQueryWom('#formparteiauswahl label').attr('tabindex','0');
	$jQueryWom('#formparteiauswahl input[type="checkbox"]').attr('tabindex','-1');
    $jQueryWom('#formparteiauswahl .wom_partei_openclose').attr('tabindex','0');


	if($jQueryWom('#navi').children().length == 0 ){
		$jQueryWom('.wom_footer').css({'max-width':'560px','margin':'auto'});
		$jQueryWom('.wom_footertext').css({'margin-top':'0'});
		$jQueryWom('.wom_main_content').css({'margin-bottom':'30px'});

	}

	allToolTips = new Array();
	for (a=0;a<38;a++) {
	    allToolTips[a] = 0;
	}
	allTimeout = new Date().getTime();

	/* Tooltips */
    $jQueryWom('#wom a.thesenavi_a').each( function() {
        $tabnavi = $jQueryWom( this );
        var tooltipID = $jQueryWom( this ) .attr( 'aria-describedby' );
        var tooltipNr = tooltipID.replace('thesenavi','');
        var mouseOver = false;
        var rFocus = false;
        var abbrechen = false;
        $tabnavi.focus(function( event ) {
            allTimeout2 = new Date().getTime();
            if (allTimeout2 - allTimeout < 20) {
                return;
            }
            allTimeout = new Date().getTime();
            rFocus = true;
            event .stopPropagation();
            setTimeout(function(){
                for (a=0;a<38;a++) {
                    $jQueryWom('#thesenavi' + a).attr( 'aria-hidden', 'true' );
            	}
                $jQueryWom('#' + tooltipID).attr( 'aria-hidden', 'false' );
            },12);

        })
        .click(function( event ) {
            rFocus = false;
            mouseOver = false;
            for (a=0;a<38;a++) {
                $jQueryWom('#thesenavi' + a).attr( 'aria-hidden', 'true' );
        	}
        })
        .blur ( function( event ) {
            event.stopPropagation();
            rFocus = false;
            abbrechen = false;
            if (mouseOver === false) {
                setTimeout(function(){
                    for (a=0;a<38;a++) {
                        $jQueryWom('#thesenavi' + a).attr( 'aria-hidden', 'true' );
                	}
                },10);
            }
        })
        .keydown( function( event ) {
            if (event.keyCode === 27) {
                event.stopPropagation();
                for (a=0;a<38;a++) {
                    $jQueryWom('#thesenavi' + a).attr( 'aria-hidden', 'true' );
            	}
                $jQueryWom('#' + tooltipID).attr( 'aria-hidden', 'true' );
                abbrechen = true;
            }

          })
          .mouseenter( function( event ) {
                allTimeout2 = new Date().getTime();
                if (allTimeout2 - allTimeout < 20) {
                    return;
                }
                allTimeout = new Date().getTime();
                event.stopPropagation();
                mouseOver = true;
                setTimeout(function(){
                    for (a=0;a<38;a++) {
                        $jQueryWom('#thesenavi' + a).attr( 'aria-hidden', 'true' );
                	}
                    $jQueryWom('#' + tooltipID).attr( 'aria-hidden', 'false' );
                    allToolTips[tooltipNr] = 1;
                },12);
          })
          .mouseleave( function( event ) {
                event.stopPropagation();
                mouseOver = false;
                if ( rFocus === false || abbrechen === true ) {
                    setTimeout(function(){
                        for (a=0;a<38;a++) {
                            $jQueryWom('#thesenavi' + a).attr( 'aria-hidden', 'true' );
                    	}
                    },10);
                    $jQueryWom('#' + tooltipID).attr( 'aria-hidden', 'true' );
                }
          })

    });



}


/*Thesen aufklappen (Auswertung)*/
function openThesen(){

	$jQueryWom('.wom_trigger').siblings('input').bind(navigator.userAgent.indexOf('MSIE 8.0') != -1 ? 'propertychange': 'change', function(e) {
		var t = $jQueryWom(this);
		var tr = t.siblings('.wom_trigger');
		if(t.is(':checked')){
			tr.addClass('wom_trigger_active');
			//.next().slideToggle('slow');
            tr.parent().find('label').attr("aria-selected","true");
		}else{
			tr.removeClass('wom_trigger_active');
			//tr.next().slideToggle('slow');
	    	tr.parent().find('label').attr("aria-selected","false");
		}
		if(t.is(':checked')){
		    tr = t.parent().find('.wom_langethese_tab');
            tr.addClass('wom_langethese_tab_active');
			tr.parent().next().slideDown('slow');
			tr.parent().next().attr("aria-hidden","false");
            tr.attr("aria-expanded","true");
		}else{
		    tr = t.parent().find('.wom_langethese_tab');
			tr.removeClass('wom_langethese_tab_active');
			tr.parent().next().slideUp('slow');
			tr.parent().next().attr("aria-hidden","true");
	    	tr.attr("aria-expanded","false");
		}

	});

	/**
	 * Checkbox per Tabindex und per Enter aktivieren
	 */
	$jQueryWom('#bngewichtung input[type=checkbox]').on('keypress keyup', function (e) {
        if (e.which == 13) {
    	    e.preventDefault();
    	    return;
    	}
	});

	$jQueryWom('#bngewichtung input[type=checkbox]').on('keydown', function (e) {
	  if (e.which == 13) {
	    // Enter
	    var t = $jQueryWom(this);
	    if (t.is(':checked')) {
	        t.prop('checked', false).trigger("change");
	    } else {
	        t.prop('checked', true).trigger("change");
	    }
	    e.preventDefault();
	    return;
	  }
	});

    /**
     * Checkboxen einblenden bei Tab
     */
    boxesShown = false;
    $jQueryWom(document).on('keydown', function (e) {
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {

            if (boxesShown == true) {
                return;
            }
            boxesShown = true;
            if (S_nStatus == 2) { // Gewichtung
                gwc = $jQueryWom('.gwc');
                star = $jQueryWom('.wom_star');
                $jQueryWom('.wom_auswertung label').attr('tabindex','-1');
                //alert(gwc.length);
                for (var i = 0; i < gwc.length ; i++) {
                    gwc.eq(i).css('display','block !important');
                    gwc.eq(i).css('opacity','100');
                    gwc.eq(i).attr('tabindex','0');
                }
                //alert(star.length);
                for (var i = 0; i < star.length ; i++) {
                    star.eq(i).css('display','none');
                    star.eq(i).css('opacity','0');
                }
            } else if (S_nStatus == 3) { // Parteiauswahl
            	$jQueryWom('#wom input[type=checkbox].wom_hidecheckbox2').css('opacity','1');
                $jQueryWom('.wom_parteien_list input[type="checkbox"]').attr('tabindex','0');
                $jQueryWom('.wom_parteien_list label').attr('tabindex','-1');
            }

        }

    });

    /**
     * Lange These auf/zuklappen
     */
	$jQueryWom('.wom_langethese_tab').on('keydown', function (e) {
	  if ((e.which == 13)||(e.which == 32)) {   // Leerzeichen und Enter
	    var t = $jQueryWom(this);
        if (!t.hasClass('wom_langethese_tab_active') ) {
            t.addClass('wom_langethese_tab_active');
			t.parent().next().slideDown('slow');
			t.parent().next().attr("aria-hidden","false");
            t.attr("aria-expanded","true");
		}else{
			t.removeClass('wom_langethese_tab_active');
			t.parent().next().slideUp('slow');
			t.parent().next().attr("aria-hidden","true");
	    	t.attr("aria-expanded","false");
		}
	    e.preventDefault();
    	return;
	  }
	});


	$jQueryWom('.wom_langethese_tab').on('click', function (e) {
	    var t = $jQueryWom(this);
        if (!t.hasClass('wom_langethese_tab_active') ) {
            t.addClass('wom_langethese_tab_active');
			t.parent().next().slideDown('slow');
			t.parent().next().attr("aria-hidden","false");
            t.attr("aria-expanded","true");
		}else{
			t.removeClass('wom_langethese_tab_active');
			t.parent().next().slideUp('slow');
			t.parent().next().attr("aria-hidden","true");
	    	t.attr("aria-expanded","false");
		}
	});


	$jQueryWom('.wom_faq_list .wom_trigger a').on('keydown', function (e) {
	    if ((e.which == 13)||(e.which == 32)) {   // Leerzeichen und Enter
	        if ($jQueryWom(this).parent().next().attr("aria-hidden") == 'true') {
                $jQueryWom(this).attr("aria-expanded","true");
    	        $jQueryWom(this).parent().next().attr("aria-hidden","false");
	        } else {
                $jQueryWom(this).attr("aria-expanded","false");
    	        $jQueryWom(this).parent().next().attr("aria-hidden","true");
	        }
	        $jQueryWom(this).parent().next().slideToggle();
	        e.preventDefault();
    	    return;
	    }
	});

	$jQueryWom('.wom_faq_list .wom_trigger a').on('click',function(){
        if ($jQueryWom(this).parent().next().attr("aria-hidden") == 'true') {
            $jQueryWom(this).attr("aria-expanded","true");
	        $jQueryWom(this).parent().next().attr("aria-hidden","false");
        } else {
            $jQueryWom(this).attr("aria-expanded","false");
	        $jQueryWom(this).parent().next().attr("aria-hidden","true");
        }
		$jQueryWom(this).parent().next().slideToggle();
	});

	$jQueryWom('.wom_ergebnis_balken').on('keydown', function(e){
		if ((e.which == 13)||(e.which == 32)) {
			var ergebnis = $jQueryWom(this);
			openErgebnisbalken(ergebnis);
			e.preventDefault();
		}
	});

	$jQueryWom('.wom_ergebnis_balken').click( function() {
		var ergebnis = $jQueryWom(this);
		openErgebnisbalken(ergebnis);
		
	});


	function openErgebnisbalken(ergebnis){
  	    var ergebnisbalken = $jQueryWom('div.wom_ergebnis_balken').not('.dulgu');
	    for (var i = 0; i < ergebnisbalken.length ; i++) {
            ergebnisbalken.eq(i).attr("aria-expanded","false");
            ergebnisbalken.eq(i).attr("aria-selected","false");
        }
		if (ergebnis.hasClass('wom_ergebnis_balken_active') ) {
			ergebnis.next().slideToggle('slow');
			ergebnis.removeClass('wom_ergebnis_balken_active');
      		ergebnis.removeClass('wom_on_modus');
		} else {
			$jQueryWom('.wom_ergebnis_balken_active').next().slideToggle('slow');
			$jQueryWom('.wom_ergebnis_balken_active').removeClass('wom_ergebnis_balken_active');
			$jQueryWom('.wom_on_modus').removeClass('wom_on_modus');
      		ergebnis.next().slideToggle('slow');
			ergebnis.addClass('wom_ergebnis_balken_active');
      		ergebnis.addClass('wom_on_modus');
            ergebnis.attr("aria-expanded","true");
            ergebnis.attr("aria-selected","true");
		};
	}
}



/*Stern Checkbox (Gewichtung)*/
function starCheckbox(){
	/*$jQueryWom('#wom label').not('.wom_star_active').hover(function(){
		$jQueryWom(this).find('+ .wom_star').css({'background': 'url(./media/pix/icon/star_yellow_17px.png) no-repeat 0px 0px','background-size':'100% auto'});
	},function(){
		$jQueryWom(this).find('+ .wom_star').css({'background': 'url(./media/pix/icon/dot_black_8px.png) no-repeat 4px 3px','background-size':'50% auto'});
	});*/

	$jQueryWom('.wom_skipper').click( function() {
		if ( $jQueryWom(this).hasClass('wom_skipping') ) {
			$jQueryWom(this).removeClass('wom_skipping');
		} else {
			$jQueryWom(this).addClass('wom_skipping');
		};
	});

}


/*Infoboxen Parteien (Parteienauswahl)*/
function infoboxParties(){

	$jQueryWom('.wom_box label').keydown(function (e) {
	  	if ((e.which == 13)||(e.which == 32)) {   // Leerzeichen und Enter
	  		var label = $jQueryWom(this);
	  		var box = $jQueryWom(this).parent();
	  		var f = box.parents('form');
	  		var boxes = box.parent().find('.wom_box').not('.copy');

	  	    var inputElement = label.parent().find('input');
    	    if (inputElement.is(':checked')) {
    	        inputElement.prop('checked', false);
    	        label.attr("aria-selected","false");
    	    } else {
    	        inputElement.prop('checked', true);
    	        label.attr("aria-selected","true");
    	    }
	  		openParteibox(label, box, f, boxes, inputElement);
            count_check_box(0);
            e.preventDefault();
	  	}
	});


	// $jQueryWom('.box input').bind(navigator.userAgent.indexOf('MSIE 8.0') != -1 ? 'propertychange': 'change', function(e) {
	$jQueryWom('.wom_box input').on('click', function(){
		var label = $jQueryWom(this).parent().siblings('label');
		var box = $jQueryWom(this).parent().parent();
		var pboxheight, pboxleft, pboxleftclass;
		var f = box.parents('form');
		var boxes = box.parent().find('.wom_box').not('.copy');
		openParteibox(label, box, f, boxes, $jQueryWom(this));
	});

    $jQueryWom('.wom_box .wom_partei_openclose').keydown(function (e) {
	  	if ((e.which == 13)||(e.which == 32)) {   // Leerzeichen und Enter
	  	    var label = $jQueryWom(this).parent().siblings('label');
    		var box = $jQueryWom(this).parent().parent();
    		var pboxheight, pboxleft, pboxleftclass;
    		var f = box.parents('form');
    		var boxes = box.parent().find('.wom_box').not('.copy');
    		inp = $jQueryWom(this).find('input');
    		divOpenClose = $jQueryWom(this);
    		openParteibox2(label, box, f, boxes, inp, divOpenClose);
    		e.preventDefault();
	  	}
	});

    // $jQueryWom('.box input').bind(navigator.userAgent.indexOf('MSIE 8.0') != -1 ? 'propertychange': 'change', function(e) {
	$jQueryWom('.wom_box .wom_partei_openclose').on('click', function(){
		var label = $jQueryWom(this).parent().siblings('label');
		var box = $jQueryWom(this).parent().parent();
		var pboxheight, pboxleft, pboxleftclass;
		var f = box.parents('form');
		var boxes = box.parent().find('.wom_box').not('.copy');
		inp = $jQueryWom(this).find('input');
		divOpenClose = $jQueryWom(this);
		openParteibox2(label, box, f, boxes, inp, divOpenClose);
	});

    function openParteibox2(label, box, f, boxes, openClose, divOpenClose){
				var pboxheight, pboxleft, pboxleftclass;
        if(!label.hasClass('wom_on_open')){
            // Von allen anderen die Klassen loeschen
            f.find('label').removeClass('wom_on_open');
            label.addClass('wom_on_open');
            f.find('.wom_partei_openclose').attr('aria-expanded','false');
            divOpenClose.attr('aria-expanded','true');
        } else {
            // Von allen Klassen loeschen
            f.find('label').removeClass('wom_on_open');
            divOpenClose.attr('aria-expanded','false');
            f.find('.wom_partei_openclose').attr('aria-expanded','false');
        }
		if(label.hasClass('wom_on_open')){
			pboxleft = box.position().left;
			boxwidth = box.width();
			boxhalf = box.width()/2;
			//console.log('boxwidth: '+boxwidth);
			//console.log('pboxleft: '+pboxleft);

			if(pboxleft < boxwidth*1){
				x=0;
			} else if(pboxleft < boxwidth*2){
				x=1;
			} else if(pboxleft < boxwidth*3){
				x=2;
			} else if(pboxleft < boxwidth*4){
				x=3;
			} else if(pboxleft < boxwidth*5){
				x=4;
			}
			//console.log(parseInt($jQueryWom('.wom_box:first-child').css('margin-right')));
			boxarrow = boxhalf + (boxwidth*x) + (parseInt($jQueryWom('.wom_box:first-child').css('margin-right'))*x)-26; //arrow-width = 26 , but arrowhead is at outermost right side
			//console.log(boxarrow);
			box.find('.wom_box_pfeil').css({'left':boxarrow});

		    boxIndex = boxes.index(box);
		    //alert(boxIndex);
			var loop_result = -1;
			for (var i = boxIndex+1; i < boxes.length ; i++) {
				if(boxes.eq(i).position().left == 0){
                    //alert('I: '+i);
					if(!boxes.eq(i).prev().hasClass('wom_clone_pbox')){
						f.find('.wom_clone_pbox').remove();
						$jQueryWom('<li class="wom_clone_pbox"></li>').insertBefore(boxes.eq(i));
					} else {
						f.find('.wom_clone_pbox .wom_pbox').remove();
						label.parents('.wom_box').attr("aria-expanded","false");
					}
					/**
					 * Markierung an die geclonte Box, damit diese nicht mitgezahelt wird
					 */
					copyBox = box.find('.wom_pbox').clone();
					copyBox.attr("aria-hidden","false");
					copyBox.addClass('copy');

					f.find('.wom_clone_pbox').append(copyBox);
					$jQueryWom('.wom_clone_pbox').slideDown();

					loop_result = i;
					i = boxes.length+1; //end loop
				}
			};
			if(loop_result == -1){
				//if no pos.left = 0
				if(!boxes.eq(boxes.length-1).next().hasClass('wom_clone_pbox')){
					f.find('.wom_clone_pbox').remove();
					$jQueryWom('<li class="wom_clone_pbox"></li>').insertAfter(boxes.eq(boxes.length-1));
				} else {
					f.find('.wom_clone_pbox .wom_pbox').remove();
				}
				/**
				 * Markierung an die geclonte Box, damit diese nicht mitgezahelt wird
				 */
				copyBox = box.find('.wom_pbox').clone();
				copyBox.attr("aria-hidden","false");
				copyBox.addClass('copy');

				f.find('.wom_clone_pbox').append(copyBox);
				$jQueryWom('.wom_clone_pbox').slideDown();
			}
    	    var boxes = f.parent().find('.wom_box_org').not('.copy');
    	    for (var i = 0; i < boxes.length ; i++) {
                boxes.eq(i).attr("aria-hidden","true");
            }
            label.parent('.wom_partei_openclose').attr("aria-expanded","true");
		} else {
		    // Alle schliessen
    	    var boxes = f.parent().find('.wom_box_org').not('.copy');
    	    for (var i = 0; i < boxes.length ; i++) {
                boxes.eq(i).attr("aria-hidden","true");
            }
			f.find('.wom_clone_pbox').slideUp();
			f.find('.wom_clone_pbox div.wom_pbox').attr("aria-hidden","true");

		}
	}

	function openParteibox(label, box, f, boxes, inputElement){
		var pboxheight, pboxleft, pboxleftclass;

		if (inputElement.is(':checked')) {
            // Von allen anderen die Klassen loeschen
            f.find('label').removeClass('wom_on_open');

            label.addClass('wom_on');
            label.addClass('wom_on_open');
            label.attr("aria-selected","true");
            f.find('.wom_partei_openclose').attr('aria-expanded','false');
            label.parent().find('.wom_partei_openclose').attr("aria-expanded","true");
        } else {
            label.removeClass('wom_on');
            // Von allen anderen die Klassen loeschen
            f.find('label').removeClass('wom_on_open');
            label.attr("aria-selected","false");
            label.parent().find('.wom_partei_openclose').attr("aria-expanded","false");
            f.find('.wom_partei_openclose').attr('aria-expanded','false');
        }
		if(label.hasClass('wom_on')){ //is(':checked')
			pboxleft = box.position().left;
			boxwidth = box.width();
			boxhalf = box.width()/2;
			//console.log('boxwidth: '+boxwidth);
			//console.log('pboxleft: '+pboxleft);

			if(pboxleft < boxwidth*1){
				x=0;
			} else if(pboxleft < boxwidth*2){
				x=1;
			} else if(pboxleft < boxwidth*3){
				x=2;
			} else if(pboxleft < boxwidth*4){
				x=3;
			} else if(pboxleft < boxwidth*5){
				x=4;
			}
			//console.log(parseInt($jQueryWom('.wom_box:first-child').css('margin-right')));
			boxarrow = boxhalf + (boxwidth*x) + (parseInt($jQueryWom('.wom_box:first-child').css('margin-right'))*x)-26; //arrow-width = 26 , but arrowhead is at outermost right side
			//console.log(boxarrow);
			box.find('.wom_box_pfeil').css({'left':boxarrow});

		    boxIndex = boxes.index(box);
		    //alert(boxIndex);
			var loop_result = -1;
			for (var i = boxIndex+1; i < boxes.length ; i++) {
				if(boxes.eq(i).position().left == 0){
                    //alert('I: '+i);
					if(!boxes.eq(i).prev().hasClass('wom_clone_pbox')){
						f.find('.wom_clone_pbox').remove();
						$jQueryWom('<li class="wom_clone_pbox"></li>').insertBefore(boxes.eq(i));
					} else {
						f.find('.wom_clone_pbox .wom_pbox').remove();
						label.parents('.wom_box').attr("aria-expanded","false");
					}
					/**
					 * Markierung an die geclonte Box, damit diese nicht mitgezahelt wird
					 */
					copyBox = box.find('.wom_pbox').clone();
					copyBox.attr("aria-hidden","false");
					copyBox.addClass('copy');

					f.find('.wom_clone_pbox').append(copyBox);
					$jQueryWom('.wom_clone_pbox').slideDown();

					loop_result = i;
					i = boxes.length+1; //end loop
				}
			};
			if(loop_result == -1){
				//if no pos.left = 0
				if(!boxes.eq(boxes.length-1).next().hasClass('wom_clone_pbox')){
					f.find('.wom_clone_pbox').remove();
					$jQueryWom('<li class="wom_clone_pbox"></li>').insertAfter(boxes.eq(boxes.length-1));
				} else {
					f.find('.wom_clone_pbox .wom_pbox').remove();
				}
				/**
				 * Markierung an die geclonte Box, damit diese nicht mitgezahelt wird
				 */
				copyBox = box.find('.wom_pbox').clone();
				copyBox.attr("aria-hidden","false");
				copyBox.addClass('copy');

				f.find('.wom_clone_pbox').append(copyBox);
				$jQueryWom('.wom_clone_pbox').slideDown();
			}
    	    var boxes = f.parent().find('.wom_box_org').not('.copy');
    	    for (var i = 0; i < boxes.length ; i++) {
    	        boxes.eq(i).attr("aria-hidden","true");
            }
            label.parent('.wom_partei_openclose').attr("aria-expanded","true");
		} else {
		    // Box-Div auf Hidden setzen
    	    var boxes = f.parent().find('.wom_pbox_org').not('.copy');
    	    for (var i = 0; i < boxes.length ; i++) {
                boxes.eq(i).attr("aria-hidden","true");
            }
            // geclonte Box schliessen und auf hidden
			f.find('.wom_clone_pbox').slideUp();
			f.find('.wom_clone_pbox div.wom_pbox').attr("aria-hidden","true");
			/**
			 * Img / Div setzen fuer die Partei-Info
			 */
            label.parent().find('.wom_partei_openclose').attr("aria-expanded","false");
		}
	}

    /**
     * Da das Element ein Button ist, wird es auch bei Keydown
     * e.which = 13 (Enter) und e.which = 32 "geklicked"
     */
	$jQueryWom('.wom_parteien').on('click','.wom_pbox .wom_close', function (e) {


	    // Beim Closen per Mouse oder Tab den Focus auf den Open-Close-Button legen
	    focusId = $jQueryWom(this).closest("button").attr("id").replace('-button','');

	    $jQueryWom('#'+focusId+'-oc').focus();

		e.preventDefault();

	    var f = $jQueryWom(this).parents('form');

  	    // Box-Div auf Hidden setzen
	    var boxes = f.parent().find('.wom_pbox_org').not('.copy');
	    for (var i = 0; i < boxes.length ; i++) {
            boxes.eq(i).attr("aria-hidden","true");
        }
	  	// geclonte Box schliessen und auf hidden
		f.find('.wom_clone_pbox').slideUp();
		f.find('.wom_clone_pbox div.wom_pbox').attr("aria-hidden","true");
		/**
		 * Img / Div setzen fuer die Partei-Info
		 */
        f.find('.wom_partei_openclose').attr("aria-expanded","false");

	    var f = $jQueryWom(this).parents('form');
	    var boxes = f.parent().find('.wom_box_org').not('.copy');
	    for (var i = 0; i < boxes.length ; i++) {
            boxes.eq(i).attr("aria-hidden","true");
        }
        f.find('.wom_partei_openclose').attr("aria-expanded","false");
        f.find('label').removeClass('wom_on_open');


	});


	$jQueryWom('.wom_close').click(function(){
		var close = $jQueryWom(this);
		close.parents('ul').find('div').css('display','none');
		close.parents('form').find('ul').stop().animate({height:'120px'});
		close.parents('li').find('div.wom_ergebnis_balken').next('div').slideUp('slow');
		close.parents('li').find('div.wom_ergebnis_balken').removeClass('wom_ergebnis_balken_active');
		close.parents('li').find('div.wom_ergebnis_balken').removeClass('wom_on_modus');
	});

  	$jQueryWom('.wom_ergebnis_list').on('keydown','.wom_close_two', function (e) {
	  	if (e.which == 13) {
	  		var close_two = $jQueryWom(this);

	  	    var ergebnisbalken = close_two.parents('li').find('div.wom_ergebnis_balken');
    	    for (var i = 0; i < ergebnisbalken.length ; i++) {
                ergebnisbalken.eq(i).attr("aria-expanded","false");
                ergebnisbalken.eq(i).attr("aria-selected","false");
            }
	  		close_two.parents('li').find('div.wom_ergebnis_balken').next('div').slideUp('slow');
	  		close_two.parents('li').find('div.wom_ergebnis_balken').removeClass('wom_ergebnis_balken_active');
	  		close_two.parents('li').find('div.wom_ergebnis_balken').removeClass('wom_on_modus');
	  	}
	});

    // Ergebnisse-Partei-Info
  	$jQueryWom('.wom_close_two').click(function(){
		var close_two = $jQueryWom(this);
  	    var ergebnisbalken = close_two.parents('li').find('div.wom_ergebnis_balken');
	    for (var i = 0; i < ergebnisbalken.length ; i++) {
            ergebnisbalken.eq(i).attr("aria-expanded","false");
            ergebnisbalken.eq(i).attr("aria-selected","false");
        }
		close_two.parents('li').find('div.wom_ergebnis_balken').next('div').slideUp('slow');
		close_two.parents('li').find('div.wom_ergebnis_balken').removeClass('wom_ergebnis_balken_active');
		close_two.parents('li').find('div.wom_ergebnis_balken').removeClass('wom_on_modus');
	});

	//IE HACK to fix the "image in label bug" of ie7 / ie8
	//if(navigator.userAgent.indexOf('MSIE 8.0') != -1 || navigator.userAgent.indexOf('MSIE 7.0') != -1){
	if(navigator.userAgent.indexOf('rv:11.0') != -1 || navigator.userAgent.indexOf('MSIE 8.0') != -1 || navigator.userAgent.indexOf('MSIE 7.0') != -1){
		$img = $jQueryWom('#wom label img');
		$img.click(function(e){
			$jQueryWom('#' + $jQueryWom(this).parent().attr('for')).change().click();
		});
    }
  	if(navigator.userAgent.indexOf('MSIE 6.0') != -1){
		$jQueryWom('.wom_parteien_list input').css('opacity','1');
    }

	if((navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i))) {
		$jQueryWom('.wom_label_over').removeClass('wom_label_over');
		$jQueryWom('.wom_grayfilter_over').removeClass('wom_grayfilter_over');
		/*$jQueryWom('.wom_wrapper').css('margin-top','15px');*/
		$jQueryWom('.wom_content').css('padding-top','43px');
	}
}


/*Slider (Fragen)*/
function slider(){
	var index = $jQueryWom('.wom_thesen_points a').index();

  	//desktop and tablet
	$jQueryWom('.wom_these_next').click(function(){
		p_pos +=1;
    	setPosition(p_pos);
		return false;
	});
	$jQueryWom('.wom_these_previous').click(function(){
		p_pos -=1;
    	setPosition(p_pos);
		return false;
	});
	$jQueryWom('.wom_thesen_points').find('li').on('click',function(){
		p_pos = $jQueryWom(this).index();
		setPosition(p_pos);
		return false;
	});

	//only phone
	$jQueryWom('.wom_thesen_next').click(function(){
		p_pos +=1;
    	setPosition(p_pos);
		return false;
	});
	$jQueryWom('.wom_thesen_back').click(function(){
		p_pos -=1;
    	setPosition(p_pos);
		return false;
	});


  	// var p_pos = 0; Wird in 4_ergebnis gesetzt!
  	var pa = $jQueryWom('.wom_parteiantworten');
  	//var pa_p = pa.find('.wom_antworten_box');
  	var pa_p = pa.find('.wom_antworten_box, .wom-thesis-list');
  	//var pa_p = pa.find('> *');


  	//switch between questions
  	function setPosition(x){
  		//for phone
  		if(x < 1){
  			$jQueryWom('.wom_thesen_back').addClass('wom_hide_link');
  		}else{
  			$jQueryWom('.wom_thesen_back').removeClass('wom_hide_link');
  		}

  		if( x > $jQueryWom('.wom_parteiantworten > .wom_antworten_box:first-child > .wom_votum_list > li').length -2 ){
  			$jQueryWom('.wom_thesen_next').addClass('wom_hide_link');
  		} else {
  			$jQueryWom('.wom_thesen_next').removeClass('wom_hide_link');
  		}

  		$jQueryWom('.wom_thesen_number > p').html('These <span>'+(x+1)+'</span> von '+gWomThesenMax);


		$jQueryWom('.wom_partei_balken_active:not(.wom_my_votum)').each(function(){
		  $jQueryWom(this).height($jQueryWom(this).find('li').eq(x).height());
		});

		$jQueryWom('.wom_thesen_box > li').eq(x).show().siblings().hide();
		$jQueryWom('.wom_thesen_points').find('li').eq(x).addClass('wom_active').siblings().removeClass('wom_active');

		//favclass icon
		var favclassObject = $jQueryWom('.wom_thesen_points > li a').eq(x).attr('class');
		if (typeof favclassObject != 'undefined') {
    		var favclass = favclassObject.split(' ');
    		favclass[0];
    		$jQueryWom('.wom_thesen_number p').removeClass().addClass(favclass[0]);
    	}

		pa_p.each(function(){
			$jQueryWom(this).find('li').eq(x).addClass('wom_on').siblings().removeClass('wom_on');
		});
		setvote();
	}

	if (typeof p_pos != 'undefined') {// Any scope
	    setPosition(p_pos);
	}

  	//toggle answer lists (.thesen_vergleich)
	function setvote(v){
		if(v){
			pa_p.eq(v).find('ul').toggleClass('wom_on');
			pa_p.find('ul.wom_on').find('li.wom_on div').slideDown('slow');
		}else{
			pa_p.find('ul.wom_on').find('li.wom_on div').show();
		}
		pa_p.find('ul:not(.wom_on)').find('li div').slideUp('slow');

	}
    
    pa_p.find('.wom_partei_balken').on('click',function() {
			$jQueryWom(this).parent().find('div').slideToggle();
			$jQueryWom(this).parent().toggleClass('wom_on');

			return false;
	});
	pa_p.find('.wom_partei_balken').on('keydown', function(e){
	    if ((e.which == 13)||(e.which == 32)) {
			$jQueryWom(this).parent().find('div').slideToggle();
			$jQueryWom(this).parent().toggleClass('wom_on');
            e.stopPropagation();
			return false;
		}
	});
	
	$jQueryWom('.wom-thesis-item').find('.wom_antworten_box div').css('display', 'none');
	$jQueryWom('.wom-thesis-item').find('.wom_antworten_box.wom_on div').css('display', 'block');
	
/*	
  	pa_p.find('> ul .wom_partei_balken').on('click',function() {
 		setvote($jQueryWom(this).parent().parent().parent().index());
 		return false;
	});
	pa_p.find('> ul').on('keydown', function(e){
		if (e.which == 13) {
			setvote($jQueryWom(this).parent().index());
 			return false;
		}
	});
*/	
    
}


/*accordion*/
function accordion(){
	$jQueryWom('a.wom_accordion-tab').on('click', function(e){
	    if ((typeof isMSIE8orOlder  != 'undefined')&&(isMSIE8orOlder)) {
    	    tabNoResize = true;
    	    e.stopPropagation();
    	    if ($jQueryWom(this).hasClass('wom_open')) {
    		    $jQueryWom(this).removeClass('wom_open');
    		    //$jQueryWom(this).find('+ ul').css('display','none');
    		    // Display auf leer setzen, dann ist der Standard je nach Phone/Tablet/Desktop gesetzt!
    		    // Bei None wird das sonst vererbt! und ist auch Desktop nicht sichtbar
    		    $jQueryWom(this).find('+ ul').css('display','');
    		    $jQueryWom('a.wom_accordion-tab').attr('aria-expanded','false');
    		} else {
    		    $jQueryWom(this).addClass('wom_open');
    		    $jQueryWom(this).find('+ ul').css('display','block');
    		    $jQueryWom('a.wom_accordion-tab').attr('aria-expanded','true');
    		}
    	} else {
    	    $jQueryWom(this).toggleClass('wom_open').find('+ ul').slideToggle({
                //duration: 400,
                //progress: functionToExecute,
                complete: function () {
                    if ($jQueryWom('a.wom_accordion-tab').find('+ ul').is(':hidden')) {
            		    // Display auf leer setzen, dann ist der Standard je nach Phone/Tablet/Desktop gesetzt!
            		    // Bei None wird das sonst vererbt! und ist auch Desktop nicht sichtbar
                        $jQueryWom('a.wom_accordion-tab').find('+ ul').css('display','');
                        $jQueryWom('a.wom_accordion-tab').attr('aria-expanded','false');
                    } else {
                        $jQueryWom('a.wom_accordion-tab').attr('aria-expanded','true');
                    }
                }
    	    });
    	}
		return false;
	});
}

function popup_social(url) {
    f1=window.open(url,'Impressum','scrollbars=1,menubar=1,toolbar=0,titlebar=0,status=0,resizable=1,location=0,width=600,height=500,left=50,top=50');
    if(parseInt(navigator.appVersion)>2) {
        f1.focus();
    };
    return false;
}

function popupWszwInfo(wszwUrl) {
    wszwUrl += '&site='+bpbLinkWebOderMobil();
    f1=window.open(wszwUrl,'Wszw','scrollbars=1,menubar=1,toolbar=1,titlebar=1,status=1,resizable=1,location=0');
    if(parseInt(navigator.appVersion)>2) {
        try {
            f1.focus();
        } catch (e) {
            // Edge-Focus Fehler
        }
    };
    return false;
}

function bpbLinkWebOderMobil() {
    checkWidth  = $window.innerWidth();
    checkHeight = $window.innerHeight();

    if (checkWidth < checkHeight) {
        checkWidth = checkHeight
    }
    if (checkWidth > 768) {
        return 'web';
    } else {
        return 'mobil';
    }
}


$jQueryWom.extend($jQueryWom.expr[':'], {
    focusable: function(el, index, selector){
        return $jQueryWom(el).is('a, button, input, :input, [tabindex]');
    }
});



keyTab = 0;
$jQueryWom(document).on('keydown', function(e) {
    if (S_nStatus != 3) return;

    if (keyTab == 1) return;

    var code = e.which;
    //alert("Tab"+code);
    if ( code == 13 || code == 9 ) {
        //e.preventDefault();
        addTabIndexParteiauswahl();
        keyTab = 1;
    }
});

function addTabIndexParteiauswahl() {
    tabIndex = 0;
    $jQueryWom(':focusable').each( function() {
        tabNavi = $jQueryWom( this );
        if (!tabNavi.is('label')) {

            if (tabNavi.closest('.wom_pbox_org').length > 0 ) {
                // Die Tabindezes in den Boxen vor das input schieben und
                // direkt hinter den OpenClose-Button
                tabIndex += 1;
                tabNavi.attr('tabindex',tabIndex-10);
            } else {
                tabIndex += 10;
                tabNavi.attr('tabindex',tabIndex);
            }
        }
    });

}


/**
 * Votematch-Popup
 */
$jQueryWom(document).on('keydown', function (e) {
    // Umfrage-Popop
    if ($jQueryWom('#umfrage').is(":visible")){
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            if ($jQueryWom('#closeUmfrage').is(":focus")) {
                $jQueryWom('#umfrage_title').focus();
                e.stopPropagation();
                e.preventDefault();
                return;
            }
        }
        // ESC zum schliesen
        if(e.keyCode == 27) {
            close_umfrage_div();
            e.stopPropagation();
            e.preventDefault();
            if ($jQueryWom('#votematch_popup').is(":visible")){
                $jQueryWom('#votematch_title').focus();
            }
            return;
        }
    }

    // Votematch-Popup
    if ($jQueryWom('#votematch_popup').is(":visible")){
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            if ($jQueryWom('#closeVotematch').is(":focus")) {
                $jQueryWom('#votematch_title').focus();
                e.stopPropagation();
                e.preventDefault();
            }
        }
        // ESC zum schliesen
        if(e.keyCode == 27) {
            votematch_popup_close();
            e.stopPropagation();
            e.preventDefault();
        }
    }

});



$jQueryWom(document).ready(function() {
    $jQueryWom('#votematch_open_link').on('click' , function(e) {
        $jQueryWom('#votematch_background').css('display','block');
        $jQueryWom('#votematch_popup').css('display','block');
        $jQueryWom('#votematch_popup').show();
        $jQueryWom('#votematch_title').focus();
        window.setTimeout("focusvm();",300,"JavaScript");
        e.stopPropagation();
        e.preventDefault();
        return false;
     })
     
    /**
     * Gewichtung
     * 
     * Brotkrumen klickbar machen, wenn man schon beim Ergebnis war
     */
    // 
    $jQueryWom('#link_gw_parteiauswahl').addClass('wom_clickable wom_clickable_js');
    $jQueryWom('#link_gw_parteiauswahl').attr('role','link');
    $jQueryWom('#link_gw_parteiauswahl').on('click', function(e) {
        submitGewichtungsForm(3);
    });

    $jQueryWom('#link_gw_ergebnis').addClass('wom_clickable wom_clickable_js');
    $jQueryWom('#link_gw_ergebnis').attr('role','link');
    $jQueryWom('#link_gw_ergebnis').on('click', function() {
        submitGewichtungsForm(4);
    });
        
    $jQueryWom('#link_gw_detailergebnis').addClass('wom_clickable wom_clickable_js');
    $jQueryWom('#link_gw_detailergebnis').attr('role','link');
    $jQueryWom('#link_gw_detailergebnis').on('click', function() {
        submitGewichtungsForm(5);
    });
    /**
     * Parteiauswahl
     * 
     * Brotkrumen klickbar machen, wenn man schon beim Ergebnis war
     */
    // 
    $jQueryWom('#link_pa_gewichtung').addClass('wom_clickable wom_clickable_js');
    $jQueryWom('#link_pa_gewichtung').attr('role','link');
    $jQueryWom('#link_pa_gewichtung').on('click', function(e) {
        submitParteiForm(2);
        e.stopPropagation();
        e.preventDefault();
    });

    $jQueryWom('#link_pa_ergebnis').addClass('wom_clickable wom_clickable_js');
    $jQueryWom('#link_pa_ergebnis').attr('role','link');
    $jQueryWom('#link_pa_ergebnis').on('click', function() {
        submitParteiForm(4);
    });
        
    $jQueryWom('#link_pa_detailergebnis').addClass('wom_clickable wom_clickable_js');
    $jQueryWom('#link_pa_detailergebnis').attr('role','link');
    $jQueryWom('#link_pa_detailergebnis').on('click', function() {
        submitParteiForm(5);
    });    
});

function submitGewichtungsForm (neuerStatus) {
    if (neuerStatus == 4) {
        $jQueryWom('#neuer_status').val('4');        
    } else if (neuerStatus == 5) {
        $jQueryWom('#neuer_status').val('5');
    }
    $jQueryWom('#form_themen').submit();
}

function submitParteiForm (neuerStatus) {
    if (neuerStatus == 2) {
        $jQueryWom('<input>').attr({
            type: 'hidden',
            id: 'neuer_status',
            name: 'status',
            value: '2'
        }).appendTo('form');
        
    } else if (neuerStatus == 5) {
        $jQueryWom('<input>').attr({
            type: 'hidden',
            id: 'neuer_status',
            name: 'status',
            value: '5'
        }).appendTo('form');
    }
    $jQueryWom('#formparteiauswahl').submit();
}

function focusvm () {
    $jQueryWom('#votematch_title').focus();
}


function votematch_popup_close() {
    window.setTimeout("_votematch_popup_close();",100,"JavaScript");
}

function _votematch_popup_close() {
    $jQueryWom('#votematch_popup').css('display','none');
    $jQueryWom('#votematch_background').css('display','none');
    $jQueryWom('#votematch_open_link').focus();
}

function votematch_submit() {

    if($jQueryWom('#VotematchEU-form input').is(':checked')) {
        $jQueryWom('#VotematchEU-form').submit();
        votematch_popup_close();
    } else {
        $jQueryWom('#votematch_popup_error p').css('display','block');
    }
    return false;
}

/**
 * Tab umschalten
 */
function ergebnis_filter_gewichtung(gewichtungFilter) {
    if (gewichtungFilter == 1) {
        $jQueryWom('#wom ul.wom_ergebnis_list_gewichtet').css('display','block');
        $jQueryWom('#wom ul.wom_ergebnis_list_nichtgewichtet').css('display','none');
    } else {
        $jQueryWom('#wom ul.wom_ergebnis_list_gewichtet').css('display','none');
        $jQueryWom('#wom ul.wom_ergebnis_list_nichtgewichtet').css('display','block');
    }
    slideErgebnis();
    ergebnis_replace_filter_url(gewichtungFilter,ergebnis_filter_getParteiAuswahl());
    return false;
}

/**
 * Auswahl in die Links, wenn dieses dann zum Detailergebnis gehen
 * da die Anzeige da von der Auswahl beeinflusst wird
 */
function ergebnis_replace_filter_url(gewichtungFilter,parteiFilter) {
    $jQueryWom('#wom a.wom_fgfp').each( function() {
        ergebnisLinks = $jQueryWom( this );
        gp_url = ergebnisLinks.attr('href');
        gp_url = gp_url.replace(/\&fg=\d+\&/,'&fg='+gewichtungFilter+'&');
        gp_url = gp_url.replace(/\&fp=\d+\&/,'&fp='+parteiFilter+'&');
        ergebnisLinks.attr('href',gp_url);
    });
}

/**
 * Wert vom ausgewaelten Radio-Button Gewichtung zurueck liefern
 */
function ergebnis_filter_getGewichtung() {
    return $jQueryWom("input[name='fg']:checked").val();
}

/**
 * Wert vom ausgewaelten Radio-Button Parteiauswahl zurueck liefern
 */

function ergebnis_filter_getParteiAuswahl() {
    return $jQueryWom("input[name='fp']:checked").val();
}


/**
 * Parteien aus-/einblenden (in beiden Tabs! mit/ohne Gewichtung)
 */
function ergebnis_filter_parteiauswahl(parteiFilter) {
    

    $jQueryWom('#wom li.lipartei').each( function() {
        parteiLi = $jQueryWom( this );
        if (parteiFilter == 2) {
            // Alle anzeigen
            parteiLi.css('display','block');            
        } else if (parteiFilter == 3) {
            if (parteiLi.hasClass('lipartei_parlament')) {
                parteiLi.css('display','block');
            } else {
                parteiLi.css('display','none');
            }
            // Nur im Parlament
        } else {
            // Ausgewaehlte
            if (parteiLi.hasClass('lipartei_sel')) {
                parteiLi.css('display','block');
            } else {
                parteiLi.css('display','none');
            }
        }
    });    
    slideErgebnis();
    ergebnis_replace_filter_url(ergebnis_filter_getGewichtung(),parteiFilter);
    return false;
}


$jQueryWom(document).ready(function() {
	// Breadcrumb (mobile)
	/* Scroll to active breadcrumb link (horicontal) */
	var breadcrumb = $jQueryWom('.wom_breadcrumb_list');
	if (breadcrumb) {
    	var womActive = breadcrumb.find('.wom_active');
    	if (womActive.length>0) {
    		offsetLi = womActive.offset();
    		//console.log(offsetLeft);
    		breadcrumb.scrollLeft(offsetLi.left);
    	}
	}

	// checkbox for mark all checkbox ("alle Parteien" auswählen)
	$jQueryWom('.wom_all_checkbox .mark-all-checkbox').on('click', function() {
	    allChecked = true;
        var form = $jQueryWom(this).parents('form');
		var checkbox = form.find('.wom_parteien_list .wom_box');
	    
        checkbox.find('input').each(function(){
            if (this.checked == false) {
                allChecked = false;
            }
		});
        
        if (allChecked == true) {
    		checkbox.find('label').removeClass('wom_on');
    		checkbox.find('label').attr('aria-selected', 'false');
    		checkbox.find('input').each(function(){
    			this.checked = false;
    		});
    		count_check_box(0);
        } else {
    		checkbox.find('label').addClass('wom_on');
    		checkbox.find('label').attr('aria-selected', 'true');
    		checkbox.find('input').each(function(){
    			this.checked = true;
    		});
    		count_check_box(0);
    		/*
            setTimeout(function() {
				// scroll to active accordion
				$jQueryWom('#bnskip')[0].scrollIntoView();
			}, 100);
    		*/
    	}
	});

	// Filter accordion
	var womAccordion = $jQueryWom('.wom-filter-accordion');
	var womAccordionBtn = $jQueryWom('.wom-filter-accordion .wom-filter-accordion-btn');
	var womAccordionPanel = $jQueryWom('.wom-filter-accordion-panel');

	if (womAccordion) {
		womAccordionBtn.on('click' , function(e) {
			if (womAccordionBtn.hasClass('is-active')) {
				womAccordionBtn.removeClass('is-active');
				womAccordionBtn.attr('aria-expanded', 'false');
				womAccordionBtn.attr('aria-selected', 'false');

				womAccordionPanel.slideUp();
			} else {
				womAccordionBtn.addClass('is-active');
				womAccordionBtn.attr('aria-expanded', 'true');
				womAccordionBtn.attr('aria-selected', 'true');

				womAccordionPanel.slideDown();
			}
		})
	}

	// Tabs component
	var womTabsContainer = $jQueryWom('.wom-tabs');
	var womTabsBtn = $jQueryWom('.wom-tabs .wom-tabs-btn');
	var womTabsPanel = $jQueryWom('.wom-tabs .wom-tabs-panel');

	if (womTabsContainer) {
		/*
		* set first panel to active onLoad.
		* If user has clicked on a jumpmark-link on the previous page (on "Mehr Infos zur Partei" link on "ergebnis" page)
		* set second panel to active instead and scroll to the accordion which matches the jumpmark-url.
		*/
		womTabsPanel.each(function(index, panel){
		    return;
		    /*
			var id = panel.getAttribute('aria-labelledby');
			var button = $jQueryWom('#' + id + '');

			// if anchor hash exist in the url, set second pacb_allnel to active
			if (window.location.href.indexOf('#wom-answer') > 1) {
				if (index === 1) {
					button.addClass('is-active');
					button.attr('aria-selected', 'true');
					$jQueryWom(panel).addClass('is-active');

					// and set target anchor accordion to active too
					$jQueryWom(window.location.hash).attr('aria-expanded', 'true');
					$jQueryWom(window.location.hash).attr('aria-selected', 'true');
					$jQueryWom(window.location.hash).addClass('is-active');
					$jQueryWom(window.location.hash).next().css('display', 'block');
					setTimeout(function() {
						// scroll to active accordion
						$jQueryWom(window.location.hash)[0].scrollIntoView();
					}, 100);


				}
			} else {
				if (index === 0) {
					button.addClass('is-active');
					button.attr('aria-selected', 'true');
					$jQueryWom(panel).addClass('is-active');
				}
			}
			*/
		});
        
       
		// onClick event
		womTabsBtn.on('click' , function(e) {
			var $this = this;
			var id = this.id;

			womTabsPanel.each(function(index, panel){
				var label = panel.getAttribute('aria-labelledby');

				if (id === label) {
					// reset tabs
					womTabsBtn.removeClass('is-active');
					womTabsBtn.attr('aria-selected', 'false');
					womTabsPanel.removeClass('is-active');

					// set active tab
					$jQueryWom($this).addClass('is-active');
					$jQueryWom($this).attr('aria-selected', 'true');
					$jQueryWom(panel).addClass('is-active');
				}
			});
		})
		womTabsBtn.on('mouseup',function(e) { 
		    this.blur() 
		});
		// onClick event
		womTabsBtn.on('keydown' , function(e) {
		    if ((e.which == 37)||(e.which == 39)) {   // Links/Rechts-Pfeile Toogle das Tab
		        
    			var elementPressed = $jQueryWom(e.target);
			    womTabsBtn.each(function(index, btn){
			        if (!elementPressed.is(btn)) {
				        btn.focus();
				    }
			    });
    		}
		})
	}

	// Wom Answer accordions
	var womAnswerAccordions = $jQueryWom('.wom-answer-item');
	if (womAnswerAccordions) {
		womAnswerAccordions.each(function(){
			var button = $jQueryWom(this).find('.wom-answer-btn');

			button.on('click', function(){
				var panel = button.next();

				if (button.hasClass('is-active')) {
					button.attr('aria-expanded', 'false');
					button.attr('aria-selected', 'false');
					button.removeClass('is-active');
					panel.slideUp();
				} else {
					button.attr('aria-expanded', 'true');
					button.attr('aria-selected', 'true');
					button.addClass('is-active');
					panel.slideDown();
				}
			});
		});
	}
});
