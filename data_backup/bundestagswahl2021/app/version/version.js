

var CONST_WOMT_BL_VERSION			  = "bundestagswahl2021";
var CONST_WOMT_PATH						  = "bundestagswahl2021";

var CONST_VOTEMATCH_URL         = "https://app.votematch.eu";
var CONST_WSZW_URL              = "https://www.wahl-o-mat.de/bundestagswahl2021/wszw.php";
var CONST_WOMT_PATH_WL          = "bundestagswahl2021";
var CONST_PDF_URL               = "https://www.wahl-o-mat.de/bundestagswahl2021/pdf.php";

var CONST_WOMT_VERSION_APP	 	  = 0;
var CONST_FOOTER_ACTIONS_OFF    = 0;
var CONST_WOMT_ONLOAD_OFF       = 1;
var CONST_ZUGRIFFE              = 1;

var CONST_WOMT_TWITTER_SHARE = 'https://www.wahl-o-mat.de/'+CONST_WOMT_PATH+'/share.php?twitter=1';

var CONST_UMFRAGE_BASE_URL  = 'https://umfrage.wahl-o-mat.de/bundestagswahl2021/umfrage.html';

var CONST_WOMT_UMFRAGE_ANZEIGEN = 1632671700; // Anzeige der Umfrage bis 26.9.2021 17:55:00

// jeden 8.ten anfragen
var CONST_UMFRAGE_MAX   = 24000;
var CONST_UMFRAGE_OFTEN = 1000;

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

var CONST_NUTZUNGEN             = '0';

// Zwei Links
var CONST_LINKS_CDUCSU = 1;
var CONST_LINKS_CDUCSU_PARTEI_NR = 0;

var CONST_LINKS_CDU_SHORT = ' CDU';
var CONST_LINKS_CDU_LONG  = 'Christlich Demokratische Union Deutschlands';

var CONST_LINKS_CSU_SHORT = ' CSU';
var CONST_LINKS_CSU_LONG  = 'Christlich-Soziale Union in Bayern e.V.';


  
function version_render_additional_logos() {
  rw = '';
  return rw;
}

const CONST_PARTNERS_COUNT = 58;
const CONST_PARTNERS_NAMES = [
  'DER SPIEGEL',
  'ZEIT ONLINE', 
  'WELT', 
  'FAZ', 
  'Süddeutsche Zeitung',
  'FOCUS Online',
  'Handelsblatt', 
  'taz', 
  'DER TAGESSPIEGEL', 
  'Cicero', 
  'Tagesschau', 
  'BR', 
  'hr', 
  'MDR', 
  'NDR', 
  'Radio Bremen', 
  'RBB24', 
  'SR', 
  'SWR', 
  'WDR', 
  'Deutsche Welle', 
  'ZDF', 
  'NTV', 
  't-online', 
  '1&1',
  'freenet.de', 
  'MSN', 
  'RP-Online', 
  'Merkur', 
  'SHZ', 
  'Antenne Bayern', 
  'RND',
  'Berliner Morgenpost',
  'Weser Kurier',
  'Koeln.de',
  'Westfunk',
  'Mittelbayerische',
  'SAO',
  'Abendzeitung München',
  'AMS',
  'ZVW',
  'Mindener Tageblatt',
  'idowa',
  'GÄUBOTE',
  'Nürtinger Zeitung',
  'DONAU 3 FM',
  'WAIDLER',
  'Badische Neuste Nachrichten',
  'Stuttgarter Nachrichten',
  'Mannheimer Morgen',
  'SÜDWEST PRESSE',
  'Augsburger Allgemeine',
  'Schweriner Volkszeitung',
  'TAG24',
  'Heidenheimer Zeitung',
  'Sächsische',
  'KSTA',
  'schwäbische'
];
const CONST_PARTNERS_URLS = [
  'https://www.spiegel.de/',
  'https://www.zeit.de/',
  'https://www.welt.de/',
  'https://www.faz.net/',
  'https://www.sueddeutsche.de/',
  'https://www.focus.de/',
  'https://www.handelsblatt.com/',
  'https://taz.de/',
  'https://www.tagesspiegel.de/',
  'https://www.cicero.de/',
  'https://www.tagesschau.de/',
  'https://www.BR.de', 
  'https://www.HR.de', 
  'https://www.MDR.de', 
  'https://www.NDR.de', 
  'https://www.RadioBremen.de', 
  'https://www.RBB24.de', 
  'https://www.SR.de', 
  'https://www.SWR.de', 
  'https://www.WDR.de', 
  'https://www.dw.com',   
  'https://www.zdf.de/',
  'https://www.n-tv.de',
  'https://www.t-online.de/',
  'https://www.1und1.de/',
  'https://www.freenet.de/',
  'https://www.msn.de/',
  'https://www.rp-online.de/',
  'https://www.merkur.de/',
  'https://www.shz.de/',
  'https://www.antenne.de/',
    
  'https://www.rnd.de/',
  'https://www.morgenpost.de/',
  'https://www.weser-kurier.de/',
  'https://www.koeln.de/',
  'https://www.westfunk.de/',
  'https://www.mittelbayerische.de',
  'https://www.sao.de/',
  'https://www.abendzeitung-muenchen.de',
  'https://www.ams-net.de ',
  'https://www.zvw.de',
  'https://www.mt.de/',
  'https://www.idowa.de/',
  'https://www.gaeubote.de/',
  'https://www.ntz.de/',
  'https://www.donau3fm.de/',
  'https://www.waidler.com/',
  'https://www.bnn.de/',
  'https://www.stuttgarter-nachrichten.de/',
  'https://www.morgenweb.de/',
  'https://www.swp.de/',
  'https://www.augsburger-allgemeine.de',
  'https://www.svz.de/',
  'https://www.tag24.de/',
  'https://www.hz.de/',
  'https://www.saechsische.de/',
  'https://www.ksta.de/',
  'https://www.schwaebische.de/'
];
// Bisher etwas sinnbefreit, aber in Zukunft kann sich das ja aendern:
const CONST_PARTNERS_LOGO_HEIGHTS = [
  45, 45, 45, 45, 45,   45, 45, 45, 45, 45, 
  45, 45, 45, 45, 45,   45, 45, 45, 45, 45, 
  45, 45, 45, 45, 45,   45, 45, 45, 45, 45, 
  45, 45, 45, 45, 45,   45, 45, 45, 45, 45, 
  45, 45, 45, 45, 45,   45, 45, 45, 45, 45, 
  45, 45, 45, 45, 45,   45, 45, 45
];
const CONST_PARTNERS_LOGO_WIDTHS = [
  132+8   ,150+8  ,85+8   ,85+8   ,217+8    ,95+8   ,102+8  ,72+8   ,196+8  ,106
  ,156   ,49   ,48   ,88   ,56     ,162  ,110  ,62   ,128  ,112  
  ,63    ,68   ,66   ,162  ,43     ,150  ,90   ,140  ,148  ,113
  ,86    ,77   ,160  ,192  ,62     ,69   ,171  ,90   ,141  ,91
  ,113   ,196  ,98   ,112  ,124    ,62   ,156  ,169  ,120  ,164
  ,196   ,190  ,189  ,121  ,192    ,171  ,201  ,166
];