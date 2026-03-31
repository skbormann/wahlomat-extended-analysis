var $window = $(window);
var $document = $(document);
var $html = $('html');
var $body = $('body');

var viewType_last, viewType;
var pixelratio;

var isTouchSupported = "ontouchend" in document;
// browser detection & touch control
/*var isMSIE8orOlder = false; wird in snippet_meta.php gesetzt*/
var tabNoResize = false;
var navU = navigator.userAgent;
var touchControl = navU.match(/(iPhone|iPad|Android|IEMobile|wahlomat_swift)/i) ? true : false;
var isIphone = navU.match(/(iPhone)/i) ? true : false;
var isAndroidPhone = navU.match(/(Android.*Mobile)/i) ? true : false;
var isAndroidTablet = navU.match(/(Android)/i) && ($(window).width() < 768) ? true : false;
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


if(touchControl == true){
	$body.addClass('touchcontrol');
} else {
    $body.addClass('desktopcontrol');
}



$window.on('resize', function(){
	if(touchControl == true){
		$body.addClass('touchcontrol');
	} else {
		$body.removeClass('touchcontrol');
	}
});




// Update .wom_main_wrapper on resize
$window.on('resize', function(){
    if (tabNoResize== 1) {
        // IE macht einen Resize beim Aufzuklappen der Zusatzinfos
        tabNoResize = 0;
        return;
    }
	viewType_last = viewType;
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
	if($('#wom').hasClass('tablet_phone')){
		if (w >= 631) {
			$('.wom_main_wrapper').removeClass('phone').removeClass('desktop').addClass('tablet'); viewType = 'tablet';
		} else if(w <= 630 ) {	
			$('.wom_main_wrapper').removeClass('desktop').removeClass('tablet').addClass('phone'); viewType = 'phone';
		}
	} else if(($('#wom').hasClass('real_static'))
	        &&($('#wom').hasClass('static_phone') || $('#wom').hasClass('static_tablet') || $('#wom').hasClass('static_desktop'))) {
	    // Hier dann nichts machen ist und bleibt static
	} else {
		if (w >= 911) {
			$('.wom_main_wrapper').removeClass('phone').removeClass('tablet').addClass('desktop'); viewType = 'desktop';
		} else if (w <= 910 && w >= 631) {
			$('.wom_main_wrapper').removeClass('phone').removeClass('desktop').addClass('tablet'); viewType = 'tablet';
		} else if(w <= 630 ) {	
			$('.wom_main_wrapper').removeClass('desktop').removeClass('tablet').addClass('phone'); viewType = 'phone';
		}
	}
    	
    ieSetStaticClass(viewType_last, viewType);

    versionLayoutControl(viewType_last, viewType);
    
});

/**
 * Touch-Event etwas verzoeern, damit auf dem Iphone auch Clicks
 * ohne Mousenter angezeigt werden, vor dem Reload
 */
reClick = false;

var touchOnMilliseconds = 0;
var touchPageLoad = 0;



/**
 * Checkboxen einblenden bei Tab
 */
boxesShown = false;    
$(document).on('keydown', function (e) {        
    var TABKEY = 9;
    if(e.keyCode == TABKEY) {
        if (boxesShown == true) {
            return;
        }
        //boxesShown = true;
        if (gStatusURL_Status == 2) { // Gewichtung
            gwc = $('.gwc');
            star = $('.wom_star');
            $('.wom_auswertung label').attr('tabindex','-1');
            for (var i = 0; i < gwc.length ; i++) {
                gwc.eq(i).css('display','block !important');
                gwc.eq(i).css('opacity','100');
                gwc.eq(i).attr('tabindex','0');
            }
            for (var i = 0; i < star.length ; i++) {
                star.eq(i).css('display','none');
                star.eq(i).css('opacity','0');
            }
        } else if (gStatusURL_Status == 3) { // Parteiauswahl
        	$('#wom input[type=checkbox].wom_hidecheckbox2').css('opacity','1');
            //$('.wom_parteien_list input[type="checkbox"]').attr('tabindex','0');
            $('.wom_parteien_list label').attr('tabindex','-1');
        }

    }
    
});
   



function unbindTriggers() {
    // Global touch and mouse events
    //$('a, button, .wom_label_check').unbind('mouseenter touchstart MSPointerDown mouseleave touchend touchcancel MSPointerUp');
}

lThisCount  = 0;
lThisRef    = new Array();

function removeTouch(lCount) {
    if (typeof lThisRef[lCount] != 'undefined') {
        lThisRef[lCount].removeClass('touch');
        lThisRef[lCount] = undefined;
    }
}
    
function bindTriggers() {
    
   
    viewType_last = undefined;
    var $wom = $('#wom');
    var $wrapper = $('.wom_wrapper');
    
    if (isAndroidBrowser) {
    	$wom.addClass('android-browser');
    }

    if(isTouchSupported == true){
    	$wom.addClass('desktophoverdisable');
    } else {
    	$wom.addClass('desktophover');
    }

    var dateObject = new Date();
    touchPageLoad = dateObject.getTime()


    $('.wom_entscheidung a').on('click' , function(e) {
        if ($(this).hasClass('wom_decision')) {
    		$(this).removeClass('wom_decision');
    	} else {
    		$('.wom_decision').addClass('wom_decision');
    		$('.wom_decision').removeClass('wom_decision');
    		$(this).addClass('wom_decision');					
    	};
        if (isTouchSupported) {
            // Wenn der Touch-Event nicht stehen geblieben ist,
            // dann Retrigger damit man sieht, was gelickt wurde
            $(this).addClass('touch');
            var dateObject = new Date();
            /*if (((dateObject.getTime() - touchOnMilliseconds) < 150)
              ||(touchOnMilliseconds == 0)) {
                var decisionButtonHref = $(this).attr("href");
                e.stopPropagation();
                setTimeout(function(){
                    window.location = decisionButtonHref;   
                }, 150);
                return false;
            } else {
                // Do Nothing
            }*/
        }
    });


    	
    // Global touch and mouse events
    $('a, button, .wom_label_check').on('mouseenter touchstart MSPointerDown', function() {
        if (isTouchSupported) {
            // Kein Touch-Event wenn der Pageload erst 100 Millisekunden her ist
            // das ist dann ein Ghost-Event von der vorherigen Seiten
            var dateObject = new Date();
            if ((touchPageLoad != 0)
              &&((dateObject.getTime() - touchPageLoad) > 250)) {
        	    $(this).addClass('touch');
        	    var dateObject = new Date();
        	    touchOnMilliseconds = dateObject.getTime();
        	}
    	}
    }).on('mouseleave touchend touchcancel MSPointerUp', function() {
        if (isTouchSupported) {
            //if ($(this).parent().parent().attr('class') == 'wom_entscheidung') return;
    	    $(this).removeClass('touch');
    	    //touchOnMilliseconds = 0;
    	}
    });

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
    
    $('.touchhoverdisable .wom_entscheidung a').on('click' , function(e) {
        if (isTouchSupported) {
            if (acceptClicks != false) {
                $('.wom_entscheidung a').removeClass('touch');
                $(this).addClass('touch');
            }
        }
    }).on('mouseleave touchend touchcancel MSPointerUp', function(e) {
    	if (isTouchSupported) {
            lThisRef[lThisCount] = $(this);
            setTimeout("removeTouch("+lThisCount+")",350);
        	//$(this).removeClass('touch');
            lThisCount++;
        }
    });
    
    // Global touch and mouse events
    $('a, button, .wom_label_check').on('mouseenter touchstart MSPointerDown', function() {
        if (isTouchSupported) {
            if (acceptClicks != false) {
        	    $(this).addClass('touch');
        	}
    	}
    }).on('mouseleave touchend touchcancel MSPointerUp', function() {
        if (isTouchSupported) {
            if (acceptClicks != false) {
    	        $(this).removeClass('touch');
    	    }
    	}
    });
    
    if($('#wom').hasClass('tablet_phone')){
    	if (w >= 631){
    		$('#wom').removeClass('phone').addClass('tablet'); viewType = 'tablet';
    	} else if(w <= 630 ){
    		$('#wom').removeClass('tablet').addClass('phone'); viewType = 'phone';
    	}
    } else if($('#wom').hasClass('static_tablet')){
    	$('#wom').removeClass('desktop').removeClass('phone').addClass('tablet'); viewType = 'tablet';
    } else if($('#wom').hasClass('static_phone')){
    	$('#wom').removeClass('desktop').removeClass('tablet').addClass('phone'); viewType = 'phone';
    } else if($('#wom').hasClass('static_desktop')){
    	$('#wom').removeClass('phone').removeClass('tablet').addClass('desktop'); viewType = 'desktop';
    } else {
    	if (w >= 911){
    		$('#wom').removeClass('phone').removeClass('tablet').addClass('desktop'); viewType = 'desktop';
    	} else if (w <= 910 && w >= 631){
    		$('#wom').removeClass('phone').removeClass('desktop').addClass('tablet'); viewType = 'tablet';
    	} else if(w <= 630 ){
    		$('#wom').removeClass('desktop').removeClass('tablet').addClass('phone'); viewType = 'phone';
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
    
    $('#navi').css('display','block');
    accordion();
    
    slider();
    

	
}

function getModeByMediaQuery() {
    mediaQueryMode = '';
    if ($("#wom_cmq_desktop").is(":visible")) {
        mediaQueryMode = 'desktop';
    } else if ($("#wom_cmq_tablet").is(":visible")) {
        mediaQueryMode = 'tablet';
    }else if ($("#wom_cmq_phone").is(":visible")) {
        mediaQueryMode = 'phone';
    }
    //console.log("media-query mode: " + mediaQueryMode);
    return mediaQueryMode;
}

function versionLayoutControl(){
	if((viewType_last == 'desktop' || viewType_last == undefined) && viewType == 'tablet'){
		$('#wom #content').append($('#wom #navi'));
		$('#wom #navi').append($('#wom #logos'));

	} else if((viewType_last == 'desktop' || viewType_last == undefined) && viewType == 'phone') {
		$('#wom #content').append($('#wom #navi'));
		$('#wom #navi').append($('#wom #logos'));
		
		$('.wom_main_navi').append($('.wom_impressum'));
		$('.wom_main_navi').find('a.wom_accordion-tab').attr('role','button');
		
		$('.wom_main_navi').find('a.wom_accordion-tab').attr('aria-controls','wom-zusatz-tab');    
		$('.wom_main_navi').find('a.wom_accordion-tab').attr('aria-expanded','false');    
		
		if ($('.wom_main_navi').find('a.wom_accordion-tab').hasClass('wom_open')) {    		   
		    $('a.wom_accordion-tab').attr('aria-expanded','true');    
		}

		//$('.wom_main_navi').append($('.wom_impressum')).find('a.wom_accordion-tab').attr('role','tab').find('+ ul').attr('role', 'tab-panel');
		// $('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();
        if($('.wom_navi').length < 1 && $('.wom_footer').length < 1){
			$('.wom_main_content').css('margin-bottom','0');
			$('.wom_wahlomat_startseite').css('min-height',$('body').height()-parseInt($('.wom_wahlomat_startseite').css('padding-bottom')));
			$('.wom_wahlomat').css('min-height',$('body').height()-parseInt($('.wom_wahlomat').css('padding-bottom')));
		}
	} else if(viewType_last == 'tablet' && viewType == 'desktop'){
		$('#wom #content').prepend($('#wom #navi'));
		$('#wom #navi').prepend($('#wom #logos'));

	} else if(viewType_last == 'tablet' && viewType == 'phone'){
		//$('.wom_main_navi').append($('.wom_impressum')).find('a.wom_accordion-tab').attr('role','tab').find('+ ul').attr('role', 'tab-panel');
		// $('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();

		$('.wom_main_navi').append($('.wom_impressum'));
		$('.wom_main_navi').find('a.wom_accordion-tab').attr('role','button');
		
		$('.wom_main_navi').find('a.wom_accordion-tab').attr('aria-controls','wom-zusatz-tab');    
		$('.wom_main_navi').find('a.wom_accordion-tab').attr('aria-expanded','false');    
		
		if ($('.wom_main_navi').find('a.wom_accordion-tab').hasClass('wom_open')) {    		   
		    $('a.wom_accordion-tab').attr('aria-expanded','true');    
		}

	} else if(viewType_last == 'phone' && viewType == 'desktop'){
		$('#wom #content').prepend($('#wom #navi'));
		$('#wom #navi').prepend($('#wom #logos'));
		$('.wom_main_navi ul').append($('.wom_impressum'));
		$('.wom_main_navi').find('a.wom_accordion-tab').attr('role','').find('+ ul').attr('role', '');
		// $('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();
		$('.wom_main_navi').find('a.wom_accordion-tab').removeAttr('aria-controls');    
		$('.wom_main_navi').find('a.wom_accordion-tab').removeAttr('aria-expanded');    

	} else if(viewType_last == 'phone' && viewType == 'tablet'){
	    
		$('.wom_main_navi ul').append($('.wom_impressum'));
		$('.wom_main_navi').find('a.wom_accordion-tab').removeAttr('role').find('+ ul').removeAttr('role');
		// $('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();
		$('.wom_main_navi').find('a.wom_accordion-tab').removeAttr('aria-controls');    
		$('.wom_main_navi').find('a.wom_accordion-tab').removeAttr('aria-expanded');    

	} else if(viewType_last == 'phone'){
		$('.wom_accordion-tab +ul').show();
		// $('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();				
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
	    if (!$('.wom_main_wrapper').hasClass('real_static')) {
	        if ((viewType_last == undefined)||(viewType_last != viewType)) {
	            //console.log('check');
	            if (viewType == 'phone') {
	                $('.wom_main_wrapper').removeClass('static_desktop');
	                $('.wom_main_wrapper').removeClass('static_tablet');
	                $('.wom_main_wrapper').removeClass('desktop');
	                $('.wom_main_wrapper').removeClass('tablet');
	                $('.wom_main_wrapper').addClass('static_phone');
	                $('.wom_main_wrapper').addClass('phone');
	            } else if (viewType == 'tablet') {
	                $('.wom_main_wrapper').removeClass('static_desktop');
	                $('.wom_main_wrapper').removeClass('static_phone');
	                $('.wom_main_wrapper').removeClass('desktop');
	                $('.wom_main_wrapper').removeClass('phone');
	                $('.wom_main_wrapper').addClass('static_tablet');
	                $('.wom_main_wrapper').addClass('tablet');
	            } else if (viewType == 'desktop') {
	                $('.wom_main_wrapper').removeClass('static_tablet');
	                $('.wom_main_wrapper').removeClass('static_phone');
	                $('.wom_main_wrapper').removeClass('tablet');
	                $('.wom_main_wrapper').removeClass('phone');
	                $('.wom_main_wrapper').addClass('static_desktop');
	                $('.wom_main_wrapper').addClass('desktop');
	            }
	        }
	    }
	    
	}
}

function initonReady(){
    
	if($('#wom #socialshareprivacy').length > 0){
		$('#wom #socialshareprivacy').socialSharePrivacy(); 
	}

	$('.wom_faq_list .wom_trigger').next().hide();
	
	$('.wom_ergebnis_balken').not('.wom_ergebnis_balken_active').next().hide();
	
	if ((typeof isMSIE8orOlder  != 'undefined')&&(isMSIE8orOlder)) {
	    $('.wom_label_check + .wom_star').css({'background':'url(./media/pix/iconie8/dot_black_8px.png) no-repeat 4px 3px'});
	} else {
	    $('.wom_label_check + .wom_star').css({'background':'url(./media/pix/icon/dot_black_8px.png) no-repeat 4px 4px','background-size':'50% auto'});
	}

    //$('#bngewichtung div.wom_langethese_tab_active').attr("aria-expanded","true");
    $('.wom_langethese_tab').not('.wom_langethese_tab_active').parent().next().hide();
    $('.wom_langethese_tab').not('.wom_langethese_tab_active').attr("aria-expanded","false");
    
    $('.wom_langethese_tab.wom_langethese_tab_active').parent().next().attr("aria-hidden","false");
    $('.wom_langethese_tab.wom_langethese_tab_active').attr("aria-expanded","true");

	
	$('#bngewichtung input[type=checkbox].wom_hidecheckbox').attr('tabindex','-1');	
	$('#bngewichtung input[type=checkbox].wom_hidecheckbox').css('opacity','0');
    $('#bngewichtung label').attr('tabindex','0');	
    $('#bngewichtung .wom_langethese_tab').attr('tabindex','0');	
    
    
    
	$('#formparteiauswahl li div.wom_pbox').css({'display':'none', 'position':'absolute'});
	$('#formparteiauswahl li').css({'float':'left'});
	
	$('#formparteiauswahl input[type=checkbox].wom_hidecheckbox2').css('opacity','0');	
	$('#formparteiauswahl label').attr('tabindex','0');
	$('#formparteiauswahl input[type="checkbox"]').attr('tabindex','-1');
    $('#formparteiauswahl .wom_partei_openclose').attr('tabindex','0');
    

	if($('#navi').children().length == 0 ){
		$('.wom_footer').css({'max-width':'560px','margin':'auto'});
		$('.wom_footertext').css({'margin-top':'0'});
		$('.wom_main_content').css({'margin-bottom':'30px'});

	}
	
	allToolTips = new Array();
	for (a=0;a<38;a++) {
	    allToolTips[a] = 0;
	}
	allTimeout = new Date().getTime();
	
	/* Tooltips */
    $('#wom a.thesenavi_a').each( function() {
        $tabnavi = $( this );
        var tooltipID = $( this ) .attr( 'aria-describedby' );
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
                    $('#thesenavi' + a).attr( 'aria-hidden', 'true' );
            	}
                $('#' + tooltipID).attr( 'aria-hidden', 'false' );
            },12);
        
        })
        .click(function( event ) {
            rFocus = false;
            mouseOver = false;
            for (a=0;a<38;a++) {
                $('#thesenavi' + a).attr( 'aria-hidden', 'true' );
        	}
        })
        .blur ( function( event ) {
            event.stopPropagation();
            rFocus = false;
            abbrechen = false;
            if (mouseOver === false) {
                setTimeout(function(){ 
                    for (a=0;a<38;a++) {
                        $('#thesenavi' + a).attr( 'aria-hidden', 'true' );
                	}
                },10);
            }
        })
        .keydown( function( event ) {
            if (event.keyCode === 27) {
                event.stopPropagation();
                for (a=0;a<38;a++) {
                    $('#thesenavi' + a).attr( 'aria-hidden', 'true' );
            	}                
                $('#' + tooltipID).attr( 'aria-hidden', 'true' );
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
                        $('#thesenavi' + a).attr( 'aria-hidden', 'true' );
                	}
                    $('#' + tooltipID).attr( 'aria-hidden', 'false' );
                    allToolTips[tooltipNr] = 1;
                },12);
          })
          .mouseleave( function( event ) {
                event.stopPropagation();
                mouseOver = false;
                if ( rFocus === false || abbrechen === true ) {
                    setTimeout(function(){ 
                        for (a=0;a<38;a++) {
                            $('#thesenavi' + a).attr( 'aria-hidden', 'true' );
                    	}
                    },10);                    
                    $('#' + tooltipID).attr( 'aria-hidden', 'true' );
                }
          })
          
    });

    $('#votematch_open_link').on('click' , function(e) {
        $('#votematch_background').css('display','block');
        $('#votematch_popup').css('display','block');
        $('#votematch_popup').show();
        $('#votematch_title').focus();
        window.setTimeout("focusvm();",300,"JavaScript");    
        e.stopPropagation();
        e.preventDefault();
        return false;
     })

    $('.wom_link_zu_votematch').css('display','block');
}

/*Thesen aufklappen (Auswertung)*/
function openThesen(){
    
	$('.wom_trigger').siblings('input').bind(navigator.userAgent.indexOf('MSIE 8.0') != -1 ? 'propertychange': 'change', function(e) {		
		var t = $(this);
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
	$('#bngewichtung input[type=checkbox]').on('keypress keyup', function (e) {
        if (e.which == 13) {
    	    e.preventDefault();
    	    return;
    	}
	});
	
	$('#bngewichtung input[type=checkbox]').on('keydown', function (e) {
	  if (e.which == 13) {
	    // Enter
	    var t = $(this);
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
     * Lange These auf/zuklappen
     */ 
	$('.wom_langethese_tab').on('keydown', function (e) {
	  if ((e.which == 13)||(e.which == 32)) {   // Leerzeichen und Enter
	    var t = $(this);
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

       
	$('.wom_langethese_tab').on('click', function (e) {
	    var t = $(this);
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
    

	$('.wom_faq_list .wom_trigger a').on('keydown', function (e) {
	    if ((e.which == 13)||(e.which == 32)) {   // Leerzeichen und Enter
	        if ($(this).parent().next().attr("aria-hidden") == 'true') {
                $(this).attr("aria-expanded","true");
    	        $(this).parent().next().attr("aria-hidden","false");
	        } else {
                $(this).attr("aria-expanded","false");
    	        $(this).parent().next().attr("aria-hidden","true");
	        }
	        $(this).parent().next().slideToggle();
	        e.preventDefault();
    	    return;
	    }
	});
	
	$('.wom_faq_list .wom_trigger a').on('click',function(){
        if ($(this).parent().next().attr("aria-hidden") == 'true') {
            $(this).attr("aria-expanded","true");
	        $(this).parent().next().attr("aria-hidden","false");
        } else {
            $(this).attr("aria-expanded","false");
	        $(this).parent().next().attr("aria-hidden","true");
        }
		$(this).parent().next().slideToggle();
	});

	$('.wom_ergebnis_balken').on('keydown', function(e){
		if ((e.which == 13)||(e.which == 32)) {
			var ergebnis = $(this); 
			openErgebnisbalken(ergebnis);
		}
	});

	$('.wom_ergebnis_balken').click( function() {
		var ergebnis = $(this); 
		openErgebnisbalken(ergebnis);
	});


	function openErgebnisbalken(ergebnis){
  	    var ergebnisbalken = $('div.wom_ergebnis_balken').not('.dulgu');
	    for (var i = 0; i < ergebnisbalken.length ; i++) {
            ergebnisbalken.eq(i).attr("aria-expanded","false");
            ergebnisbalken.eq(i).attr("aria-selected","false");
        }	    
		if (ergebnis.hasClass('wom_ergebnis_balken_active') ) {
			ergebnis.next().slideToggle('slow');
			ergebnis.removeClass('wom_ergebnis_balken_active');
      		ergebnis.removeClass('wom_on_modus');
		} else {
			$('.wom_ergebnis_balken_active').next().slideToggle('slow');
			$('.wom_ergebnis_balken_active').removeClass('wom_ergebnis_balken_active');
			$('.wom_on_modus').removeClass('wom_on_modus');
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
	/*$('#wom label').not('.wom_star_active').hover(function(){
		$(this).find('+ .wom_star').css({'background': 'url(./media/pix/icon/star_yellow_17px.png) no-repeat 0px 0px','background-size':'100% auto'});
	},function(){
		$(this).find('+ .wom_star').css({'background': 'url(./media/pix/icon/dot_black_8px.png) no-repeat 4px 3px','background-size':'50% auto'});
	});*/

	$('.wom_skipper').click( function() {
		if ( $(this).hasClass('wom_skipping') ) {
			$(this).removeClass('wom_skipping');
		} else {
			$(this).addClass('wom_skipping');						
		};
	});

}


/*Infoboxen Parteien (Parteienauswahl)*/
function infoboxParties(){

	$('.wom_box label').keydown(function (e) {
	  	if ((e.which == 13)||(e.which == 32)) {   // Leerzeichen und Enter
	  		var label = $(this);
	  		var box = $(this).parent();
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
            count_check_box();
            e.preventDefault();
	  	}
	});

	
	// $('.box input').bind(navigator.userAgent.indexOf('MSIE 8.0') != -1 ? 'propertychange': 'change', function(e) {
	$('.wom_box input').on('click', function(){
		var label = $(this).parent().siblings('label');	
		var box = $(this).parent().parent();
		var pboxheight, pboxleft, pboxleftclass;
		var f = box.parents('form');
		var boxes = box.parent().find('.wom_box').not('.copy');
		openParteibox(label, box, f, boxes, $(this));
	});
    
    $('.wom_box .wom_partei_openclose').keydown(function (e) {
	  	if ((e.which == 13)||(e.which == 32)) {   // Leerzeichen und Enter
	  	    var label = $(this).parent().siblings('label');	
    		var box = $(this).parent().parent();
    		var pboxheight, pboxleft, pboxleftclass;
    		var f = box.parents('form');
    		var boxes = box.parent().find('.wom_box').not('.copy');
    		inp = $(this).find('input');
    		divOpenClose = $(this);
    		openParteibox2(label, box, f, boxes, inp, divOpenClose);
    		e.preventDefault();
	  	}
	});
	
    // $('.box input').bind(navigator.userAgent.indexOf('MSIE 8.0') != -1 ? 'propertychange': 'change', function(e) {
	$('.wom_box .wom_partei_openclose').on('click', function(){
		var label = $(this).parent().siblings('label');	
		var box = $(this).parent().parent();
		var pboxheight, pboxleft, pboxleftclass;
		var f = box.parents('form');
		var boxes = box.parent().find('.wom_box').not('.copy');
		inp = $(this).find('input');
		divOpenClose = $(this);
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
			//console.log(parseInt($('.wom_box:first-child').css('margin-right')));
			boxarrow = boxhalf + (boxwidth*x) + (parseInt($('.wom_box:first-child').css('margin-right'))*x)-26; //arrow-width = 26 , but arrowhead is at outermost right side
			//console.log(boxarrow);
			box.find('.wom_box_pfeil').css({'left':boxarrow});
			
		    boxIndex = boxes.index(box);
			var loop_result = -1;
			for (var i = boxIndex+1; i < boxes.length ; i++) {
				if(boxes.eq(i).position().left == 0){
					if(!boxes.eq(i).prev().hasClass('wom_clone_pbox')){
						f.find('.wom_clone_pbox').remove();
						$('<li class="wom_clone_pbox"></li>').insertBefore(boxes.eq(i));
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
					$('.wom_clone_pbox').slideDown();

					loop_result = i;
					i = boxes.length+1; //end loop
				}
			};
			if(loop_result == -1){
				//if no pos.left = 0
				if(!boxes.eq(boxes.length-1).next().hasClass('wom_clone_pbox')){
					f.find('.wom_clone_pbox').remove();
					$('<li class="wom_clone_pbox" role="tabpanel"></li>').insertAfter(boxes.eq(boxes.length-1));
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
				$('.wom_clone_pbox').slideDown();
			}
    	    var boxes = f.parent().find('.wom_box_org').not('.copy');
    	    for (var i = 0; i < boxes.length ; i++) {
                boxes.eq(i).attr("aria-hidden","true");
            }
            label.parent('.wom_partei_openclose').attr("aria-expanded","true");
		} else {
    	    var boxes = f.parent().find('.wom_box_org').not('.copy');
    	    for (var i = 0; i < boxes.length ; i++) {
                boxes.eq(i).attr("aria-hidden","true");
            }
			f.find('.wom_clone_pbox').slideUp();
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
			//console.log(parseInt($('.wom_box:first-child').css('margin-right')));
			boxarrow = boxhalf + (boxwidth*x) + (parseInt($('.wom_box:first-child').css('margin-right'))*x)-26; //arrow-width = 26 , but arrowhead is at outermost right side
			//console.log(boxarrow);
			box.find('.wom_box_pfeil').css({'left':boxarrow});
			
		    boxIndex = boxes.index(box);
			var loop_result = -1;
			for (var i = boxIndex+1; i < boxes.length ; i++) {
				if(boxes.eq(i).position().left == 0){
					if(!boxes.eq(i).prev().hasClass('wom_clone_pbox')){
						f.find('.wom_clone_pbox').remove();
						$('<li class="wom_clone_pbox" role="tabpanel"></li>').insertBefore(boxes.eq(i));
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
					$('.wom_clone_pbox').slideDown();

					loop_result = i;
					i = boxes.length+1; //end loop
				}
			};
			if(loop_result == -1){
				//if no pos.left = 0
				if(!boxes.eq(boxes.length-1).next().hasClass('wom_clone_pbox')){
					f.find('.wom_clone_pbox').remove();
					$('<li class="wom_clone_pbox" role="tabpanel"></li>').insertAfter(boxes.eq(boxes.length-1));
				} else {
					f.find('.wom_clone_pbox .wom_pbox').remove();
				}
				/**
				 * Markierung an die geclonte Box, damit diese nicht mitgezahelt wird
				 */
				copyBox = box.find('.wom_pbox').clone();
				copyBox.addClass('copy');
					
				f.find('.wom_clone_pbox').append(copyBox);
				$('.wom_clone_pbox').slideDown();
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
			f.find('.wom_clone_pbox').attr("aria-hidden","true");
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
	$('.wom_parteien').on('click','.wom_pbox .wom_close', function (e) {


	    // Beim Closen per Mouse oder Tab den Focus auf den Open-Close-Button legen
	    focusId = $(this).closest("button").attr("id").replace('-button','');
	    
	    $('#'+focusId+'-oc').focus();
	    
		e.preventDefault();
  	    
	    var f = $(this).parents('form');
  	    
  	    // Box-Div auf Hidden setzen
	    var boxes = f.parent().find('.wom_pbox_org').not('.copy');
	    for (var i = 0; i < boxes.length ; i++) {
            boxes.eq(i).attr("aria-hidden","true");
        }
	  	// geclonte Box schliessen und auf hidden
		f.find('.wom_clone_pbox').slideUp();
		f.find('.wom_clone_pbox').attr("aria-hidden","true");
		/**
		 * Img / Div setzen fuer die Partei-Info
		 */
        f.find('.wom_partei_openclose').attr("aria-expanded","false");
            
	    var f = $(this).parents('form');
	    var boxes = f.parent().find('.wom_box_org').not('.copy');
	    for (var i = 0; i < boxes.length ; i++) {
            boxes.eq(i).attr("aria-hidden","true");
        }
        f.find('.wom_partei_openclose').attr("aria-expanded","false");       
        f.find('label').removeClass('wom_on_open');
	});


	$('.wom_close').click(function(){
		var close = $(this);
		
		close.parents('ul').find('div').css('display','none');
		close.parents('form').find('ul').stop().animate({height:'120px'});
		close.parents('li').find('div.wom_ergebnis_balken').next('div').slideUp('slow');
		close.parents('li').find('div.wom_ergebnis_balken').removeClass('wom_ergebnis_balken_active');
		close.parents('li').find('div.wom_ergebnis_balken').removeClass('wom_on_modus');
	}); 
  
  	$('.wom_ergebnis_list').on('keydown','.wom_close_two', function (e) {
	  	if (e.which == 13) {
	  		var close_two = $(this);

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
  	$('.wom_close_two').click(function(){
		var close_two = $(this);
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
		$img = $('#wom label img');
		$img.click(function(e){
			$('#' + $(this).parent().attr('for')).change().click();
		});
    }
  	if(navigator.userAgent.indexOf('MSIE 6.0') != -1){
		$('.wom_parteien_list input').css('opacity','1');
    }
    
	if((navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i))) {
		$('.wom_label_over').removeClass('wom_label_over');
		$('.wom_grayfilter_over').removeClass('wom_grayfilter_over');
		/*$('.wom_wrapper').css('margin-top','15px');*/
		$('.wom_content').css('padding-top','43px'); 
	}
}


/*Slider (Fragen)*/  
function slider(){
	var index = $('.wom_thesen_points a').index();

  	//desktop and tablet
	$('.wom_these_next').click(function(){
		p_pos +=1;
    	setPosition(p_pos);
		return false;
	});	
	$('.wom_these_previous').click(function(){
		p_pos -=1;
    	setPosition(p_pos);
		return false;
	});
	$('.wom_thesen_points').find('li').on('click',function(){
		p_pos = $(this).index();
		setPosition(p_pos);
		return false;	
	});

	//only phone
	$('.wom_thesen_next').click(function(){
		p_pos +=1;
    	setPosition(p_pos);
		return false;
	});
	$('.wom_thesen_back').click(function(){
		p_pos -=1;
    	setPosition(p_pos);
		return false;
	});
  

  	var p_pos = 0; //Wird in 4_ergebnis gesetzt!	
  	var pa = $('.wom_parteiantworten');
  	var pa_p = pa.find('> *');
  	  
  	
  	//switch between questions
  	function setPosition(x){
  		//for phone
  		if(x < 1){
  			$('.wom_thesen_back').addClass('wom_hide_link');
  		}else{
  			$('.wom_thesen_back').removeClass('wom_hide_link');
  		}

  		if( x > $('.wom_parteiantworten > .wom_antworten_box:first-child > .wom_votum_list > li').length -2 ){
  			$('.wom_thesen_next').addClass('wom_hide_link');
  		} else {
  			$('.wom_thesen_next').removeClass('wom_hide_link');
  		}

  		$('.wom_thesen_number > p').html('These <span>'+(x+1)+'</span> von ' + WOMT_nThesen);


		$('.wom_partei_balken_active:not(.wom_my_votum)').each(function(){
		  $(this).height($(this).find('li').eq(x).height());
		});
				
		$('.wom_thesen_box > li').eq(x).show().siblings().hide();
		$('.wom_thesen_points').find('li').eq(x).addClass('wom_active').siblings().removeClass('wom_active');

		//favclass icon
		var favclassObject = $('.wom_thesen_points > li a').eq(x).attr('class');
		if (typeof favclassObject != 'undefined') {
    		var favclass = favclassObject.split(' ');
    		favclass[0];
    		$('.wom_thesen_number p').removeClass().addClass(favclass[0]);
    	}

		pa_p.each(function(){
			$(this).find('li').eq(x).addClass('wom_on').siblings().removeClass('wom_on');
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
	
  	pa_p.find('> ul .wom_partei_balken').on('click',function() {
 		setvote($(this).parent().parent().parent().index());
 		return false;
	}); 
	pa_p.find('> ul').on('keydown', function(e){
		if (e.which == 13) {
			setvote($(this).parent().index());
 			return false;
		}
	});

}


/*accordion*/
function accordion(){
	$('a.wom_accordion-tab').on('click', function(e){
	    if ((typeof isMSIE8orOlder  != 'undefined')&&(isMSIE8orOlder)) {
    	    tabNoResize = true;
    	    e.stopPropagation();
    	    if ($(this).hasClass('wom_open')) {    		    
    		    $(this).removeClass('wom_open');
    		    //$(this).find('+ ul').css('display','none');
    		    // Display auf leer setzen, dann ist der Standard je nach Phone/Tablet/Desktop gesetzt!
    		    // Bei None wird das sonst vererbt! und ist auch Desktop nicht sichtbar
    		    $(this).find('+ ul').css('display','');
    		    $('a.wom_accordion-tab').attr('aria-expanded','false');    
    		} else {
    		    $(this).addClass('wom_open');
    		    $(this).find('+ ul').css('display','block');
    		    $('a.wom_accordion-tab').attr('aria-expanded','true');    
    		}
    	} else {
    	    $(this).toggleClass('wom_open').find('+ ul').slideToggle({
                //duration: 400,
                //progress: functionToExecute,
                complete: function () {
                    if ($('a.wom_accordion-tab').find('+ ul').is(':hidden')) {
            		    // Display auf leer setzen, dann ist der Standard je nach Phone/Tablet/Desktop gesetzt!
            		    // Bei None wird das sonst vererbt! und ist auch Desktop nicht sichtbar
                        $('a.wom_accordion-tab').find('+ ul').css('display','');
                        $('a.wom_accordion-tab').attr('aria-expanded','false');    
                    } else {
                        $('a.wom_accordion-tab').attr('aria-expanded','true');  
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
        f1.focus();
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

$.extend($.expr[':'], {
    focusable: function(el, index, selector){
        return $(el).is('a, button, input, :input, [tabindex]');
    }
});



keyTab = 0;
$(document).on('keydown', function(e) {   
    
    if((typeof gStatusURL_Status == 'undefined')
     ||(gStatusURL_Status != 3)) {
        return;
    }
    
    if (keyTab == 1) return;
    
    var code = e.which;
    if ( code == 13 || code == 9 ) {
        //e.preventDefault();
        addTabIndexParteiauswahl();
        keyTab = 1;
    }
});


function addTabIndexParteiauswahl() {
    tabIndex = 0;
    $(':focusable').each( function() {
        tabNavi = $( this );        
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
$(document).on('keydown', function (e) {
    // Umfrage-Popop
    if ($('#umfrage').is(":visible")){
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            if ($('#closeUmfrage').is(":focus")) {
                $('#umfrage_title').focus();
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
            if ($('#votematch_popup').is(":visible")){
                $('#votematch_title').focus();
            } 
            return;
        }
    }
    
    // Votematch-Popup
    if ($('#votematch_popup').is(":visible")){
        var TABKEY = 9;
        if(e.keyCode == TABKEY) {
            if ($('#closeVotematch').is(":focus")) {
                $('#votematch_title').focus();
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


function focusvm () {
    $('#votematch_title').focus();
}
    

function votematch_popup_close() {
    window.setTimeout("_votematch_popup_close();",100,"JavaScript");
}

function _votematch_popup_close() {
    $('#votematch_popup').css('display','none');
    $('#votematch_background').css('display','none');
    $('#votematch_open_link').focus();    
}

function votematch_submit() {
    
    if($('#VotematchEU-form input').is(':checked')) {
        $('#VotematchEU-form').submit();
        votematch_popup_close();
    } else {
        $('#votematch_popup_error p').css('display','block');
    }
    return false;
}