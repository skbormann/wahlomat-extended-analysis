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
		$('.wom_main_navi').append($('.wom_impressum')).find('a.wom_accordion-tab').attr('role','tab').find('+ ul').attr('role', 'tab-panel');
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
		$('.wom_main_navi').append($('.wom_impressum')).find('a.wom_accordion-tab').attr('role','tab').find('+ ul').attr('role', 'tab-panel');
		// $('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();

	} else if(viewType_last == 'phone' && viewType == 'desktop'){
		$('#wom #content').prepend($('#wom #navi'));
		$('#wom #navi').prepend($('#wom #logos'));
		$('.wom_main_navi ul').append($('.wom_impressum'));
		$('.wom_main_navi').find('a.wom_accordion-tab').attr('role','').find('+ ul').attr('role', '');
		// $('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();

	} else if(viewType_last == 'phone' && viewType == 'tablet'){
	    
		$('.wom_main_navi ul').append($('.wom_impressum'));
		$('.wom_main_navi').find('a.wom_accordion-tab').removeAttr('role').find('+ ul').removeAttr('role');
		// $('.wom_clone_pbox .wom_close').parents('.wom_clone_pbox').slideUp();

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

/*Thesen aufklappen (Auswertung)*/
function openThesen(){
    
    
    $('#wom ul:not(.wom_faq_list) .wom_trigger').on('keydown', function (e) {
	  if ((e.which == 13)||(e.which == 32)) {   // Leerzeichen und Enter
	    var t = $(this).siblings('input');
	    if (t.is(':checked')) {
	        t.prop('checked', false);
	    } else {
	        t.prop('checked', true);
	    }
	    var tr = $(this);
	    if(t.is(':checked')){
	    	tr.addClass('wom_trigger_active').next().slideToggle('slow');
	    }else{
	    	tr.next().slideToggle('slow');
	    	tr.removeClass('wom_trigger_active');
	    }
	    e.preventDefault();
    	return;
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
	    var t = $(this);
	    if (t.is(':checked')) {
	        t.prop('checked', false);
	    } else {
	        t.prop('checked', true);
	    }
	    
	    var tr = $(this).parent().find('.wom_trigger');
	    if(t.is(':checked')){
	    	tr.addClass('wom_trigger_active').next().slideToggle('slow');
	    }else{
	    	tr.next().slideToggle('slow');
	    	tr.removeClass('wom_trigger_active');
	    }
	    e.preventDefault();
	    return;
	  }
	});	

	$('.wom_trigger').siblings('input').bind(navigator.userAgent.indexOf('MSIE 8.0') != -1 ? 'propertychange': 'change', function(e) {		
		var t = $(this);
		var tr = t.siblings('.wom_trigger');
		if(t.is(':checked')){
			tr.addClass('wom_trigger_active').next().slideToggle('slow');
			
		}else{
			tr.removeClass('wom_trigger_active');
			tr.next().slideToggle('slow');
		}
	});
		
	
	
	
	
	$('.wom_faq_list span').on('click',function(){
		$(this).next().slideToggle();
	});

	$('.wom_ergebnis_balken').on('keydown', function(e){
		if (e.which == 13) {
			var ergebnis = $(this); 
			openErgebnisbalken(ergebnis);
		}
	});

	$('.wom_ergebnis_balken').click( function() {
		var ergebnis = $(this); 
		openErgebnisbalken(ergebnis);
	});


	function openErgebnisbalken(ergebnis){
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
		};
	}
}

function initonReady(){
	if($('#wom #socialshareprivacy').length > 0){
		$('#wom #socialshareprivacy').socialSharePrivacy(); 
	}

	$('.wom_trigger').not('.wom_trigger_active').next().hide();
	$('.wom_ergebnis_balken').not('.wom_ergebnis_balken_active').next().hide();
	
	if ((typeof isMSIE8orOlder  != 'undefined')&&(isMSIE8orOlder)) {
	    $('.wom_label_check + .wom_star').css({'background':'url(./media/pix/iconie8/dot_black_8px.png) no-repeat 4px 3px'});
	} else {
	    $('.wom_label_check + .wom_star').css({'background':'url(./media/pix/icon/dot_black_8px.png) no-repeat 4px 4px','background-size':'50% auto'});
	}

	$('.wom_parteien_list li div').css({'display':'none', 'position':'absolute'});
	$('.wom_parteien_list li').css({'float':'left'});
	$('#wom input[type=checkbox].wom_hidecheckbox').css('opacity','0');
	$('.wom_parteien_list input[type="checkbox"]').attr('tabindex','-1');


	if($('#navi').children().length == 0 ){
		$('.wom_footer').css({'max-width':'560px','margin':'auto'});
		$('.wom_footertext').css({'margin-top':'0'});
		$('.wom_main_content').css({'margin-bottom':'30px'});

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
    	    } else {
    	        inputElement.prop('checked', true);
    	    }

	  		openParteibox(label, box, f, boxes, inputElement);
            count_check_box();
            e.preventDefault();

	  	}
	});


	// $('.box input').bind(navigator.userAgent.indexOf('MSIE 8.0') != -1 ? 'propertychange': 'change', function(e) {
	$('.wom_box input').on('click', function(){
	    
	    var label = $(this).siblings('label');	
		var box = $(this).parent();
		var pboxheight, pboxleft, pboxleftclass;
		var f = box.parents('form');
		var boxes = box.parent().find('.wom_box').not('.copy');
        
		openParteibox(label, box, f, boxes, $(this));
	});

   
	function openParteibox(label, box, f, boxes, inputElement){
		var pboxheight, pboxleft, pboxleftclass;
        
        if (inputElement.is(':checked')) {
            label.addClass('wom_on');
        } else {
            label.removeClass('wom_on');
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
		    //alert(boxIndex);
			var loop_result = -1;
			for (var i = boxIndex+1; i < boxes.length ; i++) {
				if(boxes.eq(i).position().left == 0){
                    //alert('I: '+i);
					if(!boxes.eq(i).prev().hasClass('wom_clone_pbox')){
						f.find('.wom_clone_pbox').remove();
						$('<li class="wom_clone_pbox" role="tabpanel"></li>').insertBefore(boxes.eq(i));
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

		} else {
			f.find('.wom_clone_pbox').slideUp();
		}
	}


	$('.wom_parteien').on('keydown','.wom_clone_pbox .wom_close', function (e) {
	  	if (e.which == 13) {
	  		$(this).parents('.wom_clone_pbox').slideUp();
	  	}
	});


	$('.wom_parteien').on('click','.wom_clone_pbox .wom_close', function(){
		$(this).parents('.wom_clone_pbox').slideUp();
	});


	$('.wom_close').click(function(){
		var close = $(this);
		
		close.parents('ul').find('div').css('display','none');
		close.parents('form').find('ul').stop().animate({height:'120px'});
		close.parents('li').find('span').next('div').slideUp('slow');
		close.parents('li').find('span').removeClass('wom_ergebnis_balken_active');
		close.parents('li').find('span').removeClass('wom_on_modus');
	}); 
  
  	$('.wom_ergebnis_list').on('keydown','.wom_close_two', function (e) {
	  	if (e.which == 13) {
	  		var close_two = $(this);
	  		close_two.parents('li').find('span').next('div').slideUp('slow');
	  		close_two.parents('li').find('span').removeClass('wom_ergebnis_balken_active');
	  		close_two.parents('li').find('span').removeClass('wom_on_modus');
	  	}
	});

  	$('.wom_close_two').click(function(){
		var close_two = $(this);
		close_two.parents('li').find('span').next('div').slideUp('slow');
		close_two.parents('li').find('span').removeClass('wom_ergebnis_balken_active');
		close_two.parents('li').find('span').removeClass('wom_on_modus');
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
		/*$('.wom_wrapper').css('padding-top','15px');*/
		$('.wom_content').css('padding-top','43px'); 
	}
	
}


/*Slider (Fragen)*/  
function slider(){
    
    if((typeof gStatusURL_Status == 'undefined')||(gStatusURL_Status != 5)) {
        // Slider nur auf der Detailauswertungsseite einbinden
        return '';
    }
    
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
    		    $(this).find('+ ul').css('display','none');
    		} else {
    		    $(this).addClass('wom_open');
    		    $(this).find('+ ul').css('display','block');
    		}
    	} else {
    	    $(this).toggleClass('wom_open').find('+ ul').slideToggle();
    	}
		return false;
	});
}