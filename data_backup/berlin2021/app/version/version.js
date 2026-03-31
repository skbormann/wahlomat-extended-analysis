

var CONST_WOMT_BL_VERSION			  = "berlin2021";
var CONST_WOMT_PATH						  = "berlin2021";

var CONST_VOTEMATCH_URL         = "https://app.votematch.eu";
var CONST_WSZW_URL              = "https://www.wahl-o-mat.de/berlin2021/wszw.php";
var CONST_WOMT_PATH_WL          = "berlin2021";
var CONST_PDF_URL               = "https://www.wahl-o-mat.de/berlin2021/pdf.php";

var CONST_WOMT_VERSION_APP	 	  = 0;
var CONST_FOOTER_ACTIONS_OFF    = 0;
var CONST_WOMT_ONLOAD_OFF       = 1;
var CONST_ZUGRIFFE              = 0;

var CONST_WOMT_TWITTER_SHARE = 'https://www.wahl-o-mat.de/'+CONST_WOMT_PATH+'/share.php?twitter=1';

var CONST_UMFRAGE_BASE_URL  = 'https://umfrage.wahl-o-mat.de/berlin2021/umfrage.html';

var CONST_WOMT_UMFRAGE_ANZEIGEN = 1632671700; // Anzeige der Umfrage bis 26.9.2021 17:55:00

// jeden 4.ten anfragen
var CONST_UMFRAGE_MAX   = 4000;
var CONST_UMFRAGE_OFTEN = 0;

var CONST_PARTNER_VERSION = 0;

if (CONST_PARTNER_VERSION != 1) {
    CONST_WOMT_VORLESEN 		    = 1;  
    CONST_UMFRAGE_SHOW          = 1;
    CONST_VOTEMATCH_OFF         = 1;
    CONST_ZUGRIFFE              = 0;
} else {
    CONST_WOMT_VORLESEN 		    = 0;
    CONST_WOMT_VORLESEN_STATUS	= 0;
    CONST_VOTEMATCH_OFF         = 1;
    CONST_ZUGRIFFE              = 0;
}

var CONST_NUTZUNGEN             = '0';

  
function version_render_additional_logos() {
  rw = '';
  
  rw += '<li class="footer__logo" data-tooltip-context>\n';
      // @TODO:
      rw += '<a href="https://www.berlin.de/politische-bildung/" target="_blank" rel="noopener noreferrer" data-tooltip-remote="">\n';
          rw += '<img src="./version/lpb-logo-sw.svg" alt="' + WOM.titletag('wahlomat_kopf_link_lzpb_span') + '" style="margin-top:4px" width="320" height="67">\n';
          rw += '<span class="sr-only">' + WOM.t('wahlomat_footer_linkoeffnung') + '<\/span>';
      rw += '<\/a>\n';
      rw += '<div class="tooltip tooltip--to-left" aria-hidden="true">' + WOM.t('wahlomat_kopf_link_lzpb_title') + '<\/div>';
  rw += '<\/li>\n';
  
  return rw;
}

const CONST_PARTNERS_COUNT = 14;
const CONST_PARTNERS_NAMES = [
  'DER SPIEGEL',
  'ZEIT ONLINE',
  'WELT',
  'FAZ',
  'FOCUS Online',
  'Handelsblatt', 
  'taz',
  'DER TAGESSPIEGEL',
  'ZDF',
  't-online',
  '1&1',
  'freenet.de',
  'RND',
  'Berliner Morgenpost'
];
const CONST_PARTNERS_URLS = [
  'https://www.spiegel.de/',
  'https://www.zeit.de/',
  'https://www.welt.de/',
  'https://www.faz.net/',
  'https://www.focus.de/',
  'https://www.handelsblatt.com/',
  'https://taz.de/',
  'https://www.tagesspiegel.de/',
  'https://www.zdf.de/',
  'https://www.t-online.de/',
  'https://www.1und1.de/',
  'https://www.freenet.de/',
  'https://www.rnd.de/',
  'https://www.morgenpost.de/'
];
// Bisher etwas sinnbefreit, aber in Zukunft kann sich das ja aendern:
const CONST_PARTNERS_LOGO_HEIGHTS = [
  45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45
];
const CONST_PARTNERS_LOGO_WIDTHS = [
  132, 151, 85, 85, 95, 102, 72, 149, 59, 113, 42, 149, 75, 181
];