var $window2 = $jQueryWom(window);


var isTouchSupported = "ontouchend" in document;
/*var isTouchSupported = true;*/

function getModeByMediaQueryAndSize() {
    /**
	 * Checken ueber Divs welche Media-Queries angewendet werden
	 * damit die Klassen korrekt draufgelegt werden, ansonsten kann es durch den Scrollbar
	 * der im Firefox drin ist aber im Chrome drauﬂen zu Problemen kommen
	 */
	mediaQueryMode = getModeByMediaQuery2();
	if (mediaQueryMode == '') {
	    if( isTouchSupported == true) {
	        var w = $window2.innerWidth();
        } else {
    		//var w = $window2.innerWidth() +17; // 17 = scrollbar width
	        var w = $window2.innerWidth() + 17;
	    }
	    if(w <= 630 ) {
	        return 'phone';
	    } else if(w <= 910 ) {
	        return 'tablet';
        } else {
	        return 'desktop';
	    }
	} else {
	    return mediaQueryMode;
	}
}

function getModeByMediaQuery2() {
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
