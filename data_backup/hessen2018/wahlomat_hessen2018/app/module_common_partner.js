
/**
 * Partner-Einstellungen 
 */
var CONST_PARTNER_VERSION       = 0;


var CONST_PARTNER_SMALL_HEADER  = 0;

var CONST_PARTNER_ID            = 'focus';

var CONST_PARTNER_FOOTER_SHOW   = 1;

var CONST_PARTNER_NAME          = 'Medienpartner: partner';
var CONST_PARTNER_NAME_SPAN     = 'partner';
var CONST_PARTNER_URL           = 'http://partner.url';


/**
 * Datenschutz-Hinweise anzeigen / Url dazu
 */
var CONST_PARTNER_DATENSCHUTZ_HINWEIS       = 1;
var CONST_PARTNER_DATENSCHUTZ_URL           = 'http://partner.url/datenschutz/';

/**
 * Umfrage einbinden
 */

var CONST_UMFRAGE_SHOW = 1;

if (CONST_PARTNER_VERSION != 1) {
    CONST_PARTNER_SMALL_HEADER = 0;
    CONST_UMFRAGE_SHOW  = 0;
} else {
    CONST_WOMT_VORLESEN 		= 0;
    CONST_WOMT_VORLESEN_STATUS	= 0;
}

var CONST_UMFRAGE_JSONP_URL_LAYER	= "https://www.wahl-o-mat.de/" + CONST_WOMT_BL_VERSION + "/umfrage_pslayer.php";


function print_main_foot_partner() {
    rw = '';
	if ((gStatusURL_Status!=0)
	&&(gStatusURL_Status!="0")){
		//return '';
	} else {
	     if (CONST_PARTNER_FOOTER_SHOW == 1) {	    
             rw += '<div class="wom_footer" style="margin-top:0px">\n';
                rw += '<div class="wom_clear"><\/div>\n';
                rw += '<div class="wom_footertext">\n';             
                rw += wom_html(WOMT_aTexte["wahlomat_footer_medienpartner_text"][S_nSprache])+'<\/div>\n';
                
                lTextNF  = WOMT_aTexte["wahlomat_footer_linkoeffnung"][S_nSprache];
                
                rw += '<div class="wom_clear">&nbsp;<\/div>';
                rw += '<div class="wom_bpartner"><a href="'
                    + CONST_PARTNER_URL
                    + '" target="_blank" title="'
                        + CONST_PARTNER_NAME
                    + ' '+wom_titletag(lTextNF)
                    + '"><span>'
                        + CONST_PARTNER_NAME_SPAN
                    + '<\/span><\/a><\/div>';
            rw += '<\/div>';     
        }           
    }
    return rw;		            
}

function print_ivw_footer() {
    return '';  // deaktivert
}

function check_umfrage() {
    
    if (CONST_UMFRAGE_SHOW == 0) {
        return false;
    }
    // nur einmal einbinden
    if (S_UmfrageShown != 0) {
        return false;
    }
    
    if (Math.floor($.now()/1000) > 1540745995) {
        return false;
    } 

    
    S_UmfrageShown = 1;
    
    CONST_UMFRAGE_MULTI_Z1		= 133;
    CONST_UMFRAGE_MULTI_Z2		= 171357;
    CONST_UMFRAGE_MULTI_Z3		= 23456;

    CONST_UMFRAGE_MAX_Z1		= 100000;
    CONST_UMFRAGE_MAX_Z2		= 7777;
    CONST_UMFRAGE_MAX_Z3		= 9999;

    refuid = " " + Math.floor(Math.random() * (10000))+Math.floor(Math.random() * (10000))+Math.floor(Math.random() * (10000))+Math.floor(Math.random() * (10000));   
    refuid = refuid.toString();
    refuid = refuid.substr(1,9); 
 
    w1 = Math.floor((Math.random() * CONST_UMFRAGE_MAX_Z1))*CONST_UMFRAGE_MULTI_Z1;
    w1 = w1.toString();
    
    w2 = Math.floor((Math.random() * CONST_UMFRAGE_MAX_Z2))*CONST_UMFRAGE_MULTI_Z2;
    w2 = w2.toString();
    
    w3 = Math.floor((Math.random() * CONST_UMFRAGE_MAX_Z3))*CONST_UMFRAGE_MULTI_Z3;
    w3 = w3.toString();
    
    refuid = refuid + '.' + w1 + '.' + w2 + '.' + w3;
    
    // Jedern 8. anfragen
    umfrage_max     = 4000;
    umfrage_often   = 1000;
    
    if (Math.floor((Math.random() * umfrage_max)) <= umfrage_often) {
        umfrageurl              = 'https://umfrage.wahl-o-mat.de/hessen2018/umfrage.html';
        waitmilliseconds        = 15000;
        S_UmfrageJUrl           = 'https://umfrage.wahl-o-mat.de/hessen2018/umfrage.html';                  
        S_UmfrageJPopupOptions  = 'width=600,height=740,resizable=yes,scrollbars=yes,dependent=no';
        urlString = $.param({
                'refuid': refuid, 
                'server': CONST_PARTNER_ID
            });
        S_UmfrageOpenUrl = umfrageurl + '?' + urlString;
        window.setTimeout(function() {
            umfrage_show_div();
            }, waitmilliseconds
        );
    }
    return;
}
 
function umfrage_close_div() {
    $('#umfrage').hide();
}

function umfrage_show_div() {
    
    htmlUmfrage = '';
    htmlUmfrage += '<div id="closeUmfrage" class="wom_close" onclick="umfrage_close_div();return false;">';
    htmlUmfrage += '<\/div>';
    htmlUmfrage += '<div>';
        htmlUmfrage += '<b>'+ wom_html(WOMT_aTexte["4_umfrage_titel"][S_nSprache])+'<\/b>';
        htmlUmfrage += '<br\/><br\/>';
        htmlUmfrage += '<p>';
            htmlUmfrage += wom_html(WOMT_aTexte["4_umfrage_text"][S_nSprache]) + '<\/p><br\/>';
        htmlUmfrage += '<a class="wom_umfragestart" href="" title="';
            htmlUmfrage += wom_titletag(WOMT_aTexte["4_umfrage_title_starten"][S_nSprache]);
            htmlUmfrage += '" target="_blank" onclick="umfrage_close_div();umfrage_open(\'';
            htmlUmfrage +=  S_UmfrageOpenUrl +'\');return false;">';
            htmlUmfrage +=  wom_titletag(WOMT_aTexte["4_umfrage_title_starten"][S_nSprache]);
        htmlUmfrage +=  '<\/a>';
    htmlUmfrage +=  '<\/div>';
    
    $('#umfrage').html(htmlUmfrage);
    $('#umfrage').show();
}

function umfrage_open() {
 	umfrage_win = window.open(S_UmfrageOpenUrl, 'UmfrageHessen2018', S_UmfrageJPopupOptions);
   	if (umfrage_win) umfrage_win.focus();
} 
