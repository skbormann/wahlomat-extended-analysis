
/**
 * Partner-Einstellungen 
 */
var CONST_PARTNER_VERSION       = 0;
var CONST_VOTEMATCH_OFF         = 1;


var CONST_PARTNER_SMALL_HEADER  = 0;

var CONST_PARTNER_ID            = 'bpb';

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
    CONST_PARTNER_SMALL_HEADER  = 0;
    CONST_UMFRAGE_SHOW          = 0;
    CONST_VOTEMATCH_OFF         = 1;
} else {
    CONST_WOMT_VORLESEN 		= 0;
    CONST_WOMT_VORLESEN_STATUS	= 0;
    CONST_VOTEMATCH_OFF         = 1;
}


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
    
    if (Math.floor($.now()/1000) > 1582476900 ) {     // 23.2.2020 17:55:00
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
    
    // Jeden 4. anfragen
    umfrage_max     = 4000;
    umfrage_often   = 1000;
    
    if (Math.floor((Math.random() * umfrage_max)) <= umfrage_often) {
        umfrageurl              = 'https://umfrage.wahl-o-mat.de/hamburg2020/umfrage.html';
        S_UmfrageJUrl           = 'https://umfrage.wahl-o-mat.de/hamburg2020/umfrage.html';                  
        S_UmfrageJPopupOptions  = 'width=600,height=740,resizable=yes,scrollbars=yes,dependent=no';
        urlString = $.param({
            'refuid': refuid, 
            'server': CONST_PARTNER_ID
        });
        S_UmfrageOpenUrl = umfrageurl + '?' + urlString;
        
        S_UmfrageShown = 1;
    } else {
        S_UmfrageShown = 6;
    }
    return;
}

function smaller_umfrage_div(){
    $('#umfragehead').css('display','none');
    $('#umfragediv').addClass('umfragedivspaeter');
    
    $('.wom_umfragestartspaeter').css('display','none');
    $('#umfragediv .start_now').css('display','none');
    $('#umfragediv .start_later').css('display','block');
    S_UmfrageShown = 3;
}

// Closen nach Start der Umfrage
function close_umfrage_div2(){
    $('#umfragediv').hide();
    if ($('#votematch_popup').is(":visible")){
        $('#votematch_title').focus();
    } else {
        $('h1').focus();
    }  
    S_UmfrageShown = 4;
}
    
    
function close_umfrage_div() {    
    $('#umfragediv').hide();
    if ($('#votematch_popup').is(":visible")){
        $('#votematch_title').focus();
    } else {
        $('h1').focus();
    }  
    S_UmfrageShown = 5;
}

function closeHoverOn() {
    lCloseUmfrageDiv = document.getElementById('closeUmfrage');
    if (lCloseUmfrageDiv){
        lCloseUmfrageDiv.style.backgroundImage = "url(./media/pix_change/umfrage_close2.png)";
    }
}

function closeHoverOff() {
    lCloseUmfrageDiv = document.getElementById('closeUmfrage');
    if (lCloseUmfrageDiv){
        lCloseUmfrageDiv.style.backgroundImage = "url(./media/pix_change/umfrage_close3.png)";
    }        
}
    
function open_umfrage() {
    if (S_UmfrageShown == 1) {
        $('#umfragediv').css('display','block');
        $('#umfrage_title').focus();
        $('#umfragediv').css('display','block');
        $('#umfragearia').attr('aria-live','polite');       
        $("html,body").scrollTop(0);
        S_UmfrageShown = 3;
    }
}

  
function snippet_umfrage_div() {
    rw = '';
    if ((S_UmfrageShown == 1) 
     || (S_UmfrageShown == 2)
     || (S_UmfrageShown == 3)) { 
        if (S_UmfrageShown != 3) {
            rw += '<section aria-label=' + wom_titletag(WOMT_aTexte["4_umfrage_section_full_title"][S_nSprache])+ '">';
            rw += '<div id="umfragearia">';
        } else {
            rw += '<section aria-label=' + wom_titletag(WOMT_aTexte["4_umfrage_section_later_title"][S_nSprache]) + '">';
        }
        rw += '<div id="umfragediv"';
        if (S_UmfrageShown == 3) {
            rw += ' class="umfragedivspaeter"';
        }
        if (S_UmfrageShown == 1) {
            rw += ' style="display:none"';
        }
        rw += '>';
        rw += '<div id="umfrageright" style="margin:0;padding:0;">';
        if (S_UmfrageShown != 3) {
            rw += '<div id="umfragehead">';
                rw += '<h2 id="umfrage_title" tabindex="0">';
                    rw += wom_html(WOMT_aTexte["4_umfrage_titel"][S_nSprache]);
                rw += '</h2>';
                    rw += '<p>';
                    rw += wom_html(WOMT_aTexte["4_umfrage_text"][S_nSprache]);
                rw += '</p>';
                rw += '<br/>';
            rw += '</div>';
        }
        if (S_UmfrageShown != 3) {                    
            umfrageStartText   = WOMT_aTexte["4_umfrage_title_starten"][S_nSprache];
            umfrageStartTitle  = WOMT_aTexte["4_umfrage_title_starten_title"][S_nSprache];
            rw += '<a class="wom_umfragestart start_now" href="" title="';
                rw += wom_titletag(umfrageStartTitle);
            rw += '" target="_blank" onclick="umfrage_open();close_umfrage_div2();return false;">';
                rw += wom_titletag(umfrageStartText);
            rw += '</a>';
        }
        umfrageStartText   = WOMT_aTexte["4_umfrage_title_startenjetzt"][S_nSprache];
        umfrageStartTitle  = WOMT_aTexte["4_umfrage_title_startenjetzt_title"][S_nSprache];
        rw += '<a class="wom_umfragestart start_later" style="';
            if (S_UmfrageShown != 3) {
                rw += ' display:none;';
            }
            rw += '" href="" title="';
                rw += wom_titletag(umfrageStartTitle);
            rw += '" target="_blank" onclick="umfrage_open();close_umfrage_div2();return false;">';
            rw += wom_titletag(umfrageStartText);
        rw += '</a>';

        if (S_UmfrageShown != 3) {
            rw += '<a class="wom_umfragestartspaeter" href="" title="';
                rw += wom_titletag(WOMT_aTexte["4_umfrage_title_startenspaeter_title"][S_nSprache]);
            rw += '" target="_blank" onclick="smaller_umfrage_div();return false;">';
                rw += wom_titletag(WOMT_aTexte["4_umfrage_title_startenspaeter"][S_nSprache]);
            rw += '</a>';
        }
        rw += '</div>';
        rw += '<button id="closeUmfrage" class="wom_close" onMouseOver="closeHoverOn(); " onMouseOut="closeHoverOff();" onclick="close_umfrage_div();" title="';
            rw += wom_titletag(WOMT_aTexte["4_umfrage_close"][S_nSprache]);
        rw += '">' + wom_html(WOMT_aTexte["4_umfrage_close"][S_nSprache]) + '</button>';
        rw += '<div style="clear:both;padding:0;"></div>';
        rw += '</div>';
        if (S_UmfrageShown != 3) {
            rw += '</div>';
        }
        rw += '</section>';
    }
    return rw;
}
            
function umfrage_open() {
 	umfrage_win = window.open(S_UmfrageOpenUrl, 'UmfrageHamburg2020', S_UmfrageJPopupOptions);
   	if (umfrage_win) umfrage_win.focus();
} 
