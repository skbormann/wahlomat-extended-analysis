
/**
 * Partner-Einstellungen 
 */

var CONST_PARTNER_ID            = 'partner';

var CONST_PARTNER_NAME          = 'Medienpartner: partner';
var CONST_PARTNER_NAME_SPAN     = 'partner';
var CONST_PARTNER_URL           = 'http://partner.url';
var CONST_PARTNER_IMAGE         = 'partner/logo_partner.png';

var CONST_PARTNER_FOOTER_SHOW     = 1;
var CONST_PARTNER_FOOTER_ALLPAGES = 0;


/**
 * Datenschutz-Hinweise anzeigen / Url dazu
 */
var CONST_PARTNER_DATENSCHUTZ_HINWEIS       = 1;
var CONST_PARTNER_DATENSCHUTZ_URL           = 'http://partner.url/datenschutz/';


/**
 * Iframe-Resize-Optionen
 * per setTimeout mit Check alle partner_iFrameResize_Automatic_Milliseconds moeglich
 */

var CONST_PARTNER_IFRAME_SCROLLTOP              = 0;
var CONST_PARTNER_IFRAME_SCROLLTOP_PIXELFROMTOP = 150;
var CONST_PARTNER_IFRAME_AMPHTML                = 0;


var partner_iFrameResize                        = false;
var partner_iFrameResize_Automatic              = false;
var partner_iFrameResize_SameOrigin             = false;
var partner_iFrameResize_LastCall               = 0;
var partner_iFrameResize_Automatic_Milliseconds = 300;
var partner_iFrameResize_iframeOldSize          = 1200;

/**
 * Hoehe mitspeichern und AMP-Post oder partnerbezogenen action nur bei Change
 */

var partner_iFrameHeight                        = 0;   
var partner_iFrameResize_PostOnlyOnChange       = true;

function partner_iframeresize_check() {
  if (partner_iFrameResize == false) {
    return;
  }  
  if (partner_iFrameResize_Automatic == false) {
    partner_iframeresize(false); // one time call beim Seitenwechsel
  } else {
    if (partner_iFrameResize_LastCall < Date.now() - partner_iFrameResize_Automatic_Milliseconds) {
      // Automatischer Call ist verloren gegangen, nochmal setzen
      partner_iframeresize(true);  // one time call & retimeout
    } else {
      // nur einmaliger Call
      partner_iframeresize(false); // one time call automatisch wird noch alle X Millisekunden aufgerufen
    }
  }
}

function partner_iframeresize(retimeout) {
  if (partner_iFrameResize == false) {
    return;
  }  
  if (retimeout) {
    // Call von der Timeout-Funktion / Aufruf mitspeichern
    partner_iFrameResize_LastCall = Date.now();
  }
  documentHeight = getDocumentHeight();
  if((documentHeight != partner_iFrameHeight)
    ||(partner_iFrameResize_PostOnlyOnChange == false)) {
     switch(CONST_PARTNER_ID) {
      case 'spiegel':
        if (partner_iFrameResize_SameOrigin) {
          // Same-Origina Access iframe
          try {
            iframeElement = window.frameElement;
            iframeElement.height = documentHeight;
            if (Math.abs(partner_iFrameResize_iframeOldSize - documentHeight) > 500) {
              iframeElement.scrollIntoView();
            }
            partner_iFrameResize_iframeOldSize = documentHeight;
          } catch (e) {
              
          }
        } else {      
          embedBridge.resize(documentHeight);
        }
        break;        
     default:
        if (partner_iFrameResize_SameOrigin) {
          // Same-Origina Access iframe
          try {
            iframeElement = window.frameElement;
            iframeElement.height = documentHeight;
            if (Math.abs(partner_iFrameResize_iframeOldSize - documentHeight) > 500) {
              iframeElement.scrollIntoView();
            }
            partner_iFrameResize_iframeOldSize = documentHeight;
          } catch (e) {
              
          }
        } else {
          top.postMessage('RESIZE-WOM-' + documentHeight, '*');
        }
        break;        
    }
    partner_amp_post_event();
    partner_iFrameHeight = documentHeight;
  }
  if ( (retimeout == true)
    && ( (partner_iFrameResize_Automatic == true) // Automatisch
     ||  (CONST_PARTNER_IFRAME_AMPHTML))          // oder AMP dann immer automatisch
  ) {
    // nach 0,3 Sekunden erneut checken
    setTimeout(partner_iframeresize, partner_iFrameResize_Automatic_Milliseconds, true);
  }
}

  
/**
 * Scripte laden
 */   
function partner_script_loadinfooter() {
  switch(CONST_PARTNER_ID) {
  case 'spiegel':
    partner_load_script(
      'https://cdn.prod.www.spiegel.de/public/shared/generated/js/EmbedBridge.js', 
      partner_script_startinfooter
    );
    break;
  case 'webde':
    partner_load_script(
      'https://web.de/pih/assets/js/iframeResizer.contentWindow.min.js',   
      partner_script_startinfooter
    );
    break;
  case 'gmx':
    partner_load_script(
      'https://gmx.net/pih/assets/js/iframeResizer.contentWindow.min.js',
      partner_script_startinfooter
    );
    break;
  }
  partner_amp_bind_resize_events();
  // Allow time for rendering
  setTimeout(partner_amp_post_event, 1000);
}

/**
 * Einmalig Ausfuehrung nach dem Laden des Scriptes
 */           
function partner_script_startinfooter() {
  switch(CONST_PARTNER_ID) {
  case 'spiegel':
    embedBridge = new EmbedBridge({
      autoResize: false,
    });
    // embedBridge setzt ein inline-block, was zu einem Scrollbar fuehrt
    document.body.style.display = "block";
    // Event-Listener fuer Navigation-Events. Wird durch den "Zurueck"- und "Vorwaerts"-
    // Button im Browser sowie durch den Back-Button von Mobilgeraeten ausgeloest.
    document.body.addEventListener('click', function (event) {
       embedBridge.resize(getDocumentHeight());
    });
    document.body.addEventListener('keydown', function (event) {
       embedBridge.resize(getDocumentHeight());
    });
    partner_iFrameResize = true;
    partner_iFrameResize_Automatic = true;
    // alle 300 Millisekunden iframe-Groesse checken
    partner_iframeresize(true);    
    window.addEventListener('resize',function(e){
      partner_iframeresize(false);
    });    
    break;
  case "andererparter":
    // AMP wird in partner_amp_bind_resize_events gebunden
    break;
  }
}

function partner_amp_post_event() {
  if (CONST_PARTNER_IFRAME_AMPHTML == 1) {    
    documentHeight = getDocumentHeight();
    window.parent.postMessage({
      sentinel: 'amp',
      type: 'embed-size',
      height: documentHeight
    }, '*');  
    partner_iFrameHeight = documentHeight;
  }
}

function partner_amp_bind_resize_events() {
  if (CONST_PARTNER_IFRAME_AMPHTML == 1) {
    window.addEventListener('click', function (event) {
      partner_amp_post_event();
    });
    window.addEventListener('keydown', function (event) {
      partner_amp_post_event();
    });    
    window.addEventListener('resize',function(e){
      partner_amp_post_event();
    });
    window.addEventListener('load',function(e){
      partner_amp_post_event();
    });
    partner_iFrameResize = true;
    partner_iFrameResize_Automatic = true;
    partner_iframeresize(true);
  }
}


/**
 * Allgemeine Funktoinen
 */     


function partner_iframe_scrollTop(gStatusOld) {
  // Die hinteren Seiten sind alle hoch
  if ((CONST_PARTNER_IFRAME_SCROLLTOP == 1) && (gStatusOld >= 2)) {
    try {
        result = window.parent.location.href !== undefined;
        parent.window.scrollTo(0,CONST_PARTNER_IFRAME_SCROLLTOP_PIXELFROMTOP);
    } catch (e) {
        result = false;
    }
  }
}
     
function getDocumentHeight() {
  contentHeight = document.getElementById('chromecontent').offsetHeight;
  contentHeightOverlay = document.getElementById('chromecontent_overlay').offsetHeight;
  if (contentHeight > contentHeightOverlay) {
    return contentHeight;
  } else {
    return contentHeightOverlay;
  }
  
  var body = document.body,
      html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                         html.clientHeight, html.scrollHeight, html.offsetHeight );  
  return height;
}

/**
 * Laedt eine JavaScript-Datei nach.
 *
 * @param file {string}
 *   Die URL der JavaScript-Datei.
 */
function partner_load_script(file, functionOnLoad ) {
    // DOM: Create the script element
    const scriptElement = document.createElement("script");
    // make the script element load file
    if (functionOnLoad !== undefined) {
      scriptElement.onload = functionOnLoad;
    }
    scriptElement.src = file;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(scriptElement);
}

function wom_render_medien_footer_parter(page) {
  rw = '';
	if((CONST_PARTNER_FOOTER_SHOW == 1)
	 &&(((page !== undefined)&&(page == 0))
	 ||(CONST_PARTNER_FOOTER_ALLPAGES == 1))
  ) {
      rw += '<div class="footer__bottom">\n';
        rw += '<div class="footer__bottom-inner">\n';
            rw += '<div class="partner">\n';
                rw += '<h2 class="partner_one">' + WOM.t('wahlomat_footer_medienpartner_text') + '<\/h2>\n';
                  rw += (
                        '<a '
                        + 'href="' + CONST_PARTNER_URL + '" '
                        + 'target="_blank" '
                        + 'title="' + CONST_PARTNER_NAME + '" '
                        + 'rel="noopener noreferrer" '
                        + '>\n'
                    );
                    rw += (
                        '<img '
                        + 'src="' + CONST_PARTNER_IMAGE + '" '
                        + 'alt="' + CONST_PARTNER_NAME + '" '
                        + '/>\n'
                    );
                    rw += '<span class="sr-only">' + WOM.t('wahlomat_footer_linkoeffnung') + '<\/span>';
                    rw += '<\/a>\n';
                rw += '<\/ul>\n';
            rw += '<\/div>\n';
        rw += '<\/div>\n';
    rw += '<\/div>\n';     
  }
  return rw;
}

function idGetHeight() {
  var bodyHeight = document.body.scrollHeight; // says amp
  var documentElementHeight = document.documentElement.scrollHeight; // works in safari

  if (bodyHeight && documentElementHeight) {
    return Math.min(bodyHeight, documentElementHeight); // best guess     
  } else {
    // default fallback
    return bodyHeight;
  }
}

function wom_render_ivw_footer() {
    try {
      if (1==0) {
        var iam_data = { 
            "st":"test",             // site/domain
            "cp":"00-00-00-00",     // code
            "sv":"ke",              // Es wird keine Befragungseinladung ausgeliefert
            "co":"Kommentar"        // comment
        }
        iom.c(iam_data,1);
      }
    } catch (e) {
        
    }
    return '';    
}
