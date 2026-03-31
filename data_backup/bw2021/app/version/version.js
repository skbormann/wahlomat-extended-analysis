

var CONST_WOMT_BL_VERSION			  = "bw2021";
var CONST_WOMT_PATH						  = "bw2021";

var CONST_VOTEMATCH_URL         = "https://app.votematch.eu";
var CONST_WSZW_URL              = "https://www.wahl-o-mat.de/bw2021/wszw.php";
var CONST_WOMT_PATH_WL          = "bw2021";
var CONST_PDF_URL               = "https://www.wahl-o-mat.de/bw2021/pdf.php";

var CONST_WOMT_VERSION_APP	 	  = 0;
var CONST_FOOTER_ACTIONS_OFF    = 0;
var CONST_WOMT_ONLOAD_OFF       = 1;
var CONST_ZUGRIFFE              = 1;

var CONST_WOMT_TWITTER_SHARE = 'https://www.wahl-o-mat.de/'+CONST_WOMT_PATH+'/share.php?twitter=1';

var CONST_UMFRAGE_BASE_URL  = 'https://umfrage.wahl-o-mat.de/badenwuerttemberg/umfrage.html';

var CONST_WOMT_UMFRAGE_ANZEIGEN = 1615744800; // Anzeige der Umfrage bis 14.3.2021 18:00:00

// jeden 8.ten anfragen
var CONST_UMFRAGE_MAX = 8000;
var CONST_UMFRAGE_OFTEN = 0;

var CONST_PARTNER_VERSION = 0;

if (CONST_PARTNER_VERSION != 1) {
    CONST_WOMT_VORLESEN 		    = 1;
    CONST_UMFRAGE_SHOW          = 0;
    CONST_VOTEMATCH_OFF         = 1;
    CONST_ZUGRIFFE              = 0;
} else {
    CONST_WOMT_VORLESEN 		    = 0;
    CONST_WOMT_VORLESEN_STATUS	= 0;
    CONST_VOTEMATCH_OFF         = 1;
    CONST_ZUGRIFFE              = 0;    
}

var CONST_NUTZUNGEN             = '1.862.102';

function version_render_additional_logos() {
    rw = '';

    rw += '<li class="footer__logo" data-tooltip-context>\n';
        // @TODO:
        rw += '<a href="https://www.lpb-bw.de/" target="_blank" rel="noopener noreferrer" data-tooltip-remote="">\n';
            rw += '<img src="./version/lpb-logo-sw.svg" alt="' + WOM.titletag('wahlomat_kopf_link_lzpb_span') + '" width="173" height="63">\n';
        rw += '<\/a>\n';
        rw += '<div class="tooltip tooltip--to-left" aria-hidden="true">' + WOM.t('wahlomat_kopf_link_lzpb_title') + '<\/div>';
    rw += '<\/li>\n';

    return rw;
}

const CONST_PARTNERS_COUNT = 23;
const CONST_PARTNERS_NAMES = [
  'DONAU 3 FM', 'Merkur', 'freenet.de', 'ZEIT ONLINE', 'DER SPIEGEL', '1&1', 'Süddeutsche Zeitung', 'ZDF',
  'Nürtinger Zeitung', 'taz', 'Badische Neueste Nachrichten', 'WELT', 'RND', 'Gäubote', 'Stuttgarter Nachrichten',
  'Handelsblatt', 'FAZ', 'SWR', 'Mannheimer Morgen', 't-online', 'Südwest Presse', 'FOCUS Online', 'ZVW'
];
const CONST_PARTNERS_URLS = [
  'https://www.donau3fm.de/',
  'https://www.merkur.de/',
  'https://www.freenet.de/',
  'https://www.zeit.de/',
  'https://www.spiegel.de/',
  'https://www.1und1.de/',
  'https://www.sueddeutsche.de/',
  'https://www.zdf.de/',
  'https://www.ntz.de/',
  'https://taz.de/',
  'https://bnn.de/',
  'https://www.welt.de/',
  'https://www.rnd.de/',
  'https://www.gaeubote.de/',
  'https://www.stuttgarter-nachrichten.de/',
  'https://www.handelsblatt.com/',
  'https://www.faz.net/',
  'https://www.swr.de/',
  'https://www.morgenweb.de/',
  'https://www.t-online.de/',
  'https://www.swp.de/',
  'https://www.focus.de/',
  'https://www.zvw.de'
];
// Bisher etwas sinnbefreit, aber in Zukunft kann sich das ja aendern:
const CONST_PARTNERS_LOGO_HEIGHTS = [
    45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45
];
const CONST_PARTNERS_LOGO_WIDTHS = [
    59, 146, 152, 163, 145, 58, 184, 74, 150, 100, 190, 98, 90, 111, 116, 116, 100, 104, 123, 124, 146, 104, 129
];
