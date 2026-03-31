// Version 1.00 vom 12.12.2012 17:30

var CONST_WOMT_BL_VERSION					= "niedersachsen2013";
var CONST_WOMT_PATH							= "niedersachsen2013";
var CONST_PARTNER_VERSION                   = 0;


function print_main_foot(){
    rw = '';
    rw += '<div id="main_foot_sub">\n';
    rw += '<div class="clear">&nbsp;<\/div>\n';
    rw += '<br />\n';
    if (CONST_PARTNER_VERSION == 0) {
        rw += print_main_foot_all();
    } else if (CONST_PARTNER_VERSION == 1) {
         rw += print_main_foot_partner();
    } else if (CONST_PARTNER_VERSION==2) {
    }
    rw += '<\/div>\n';
    return rw;
}    

function print_main_foot_partner() {
    rw = '';
	if ((gStatusURL_Status!=0)
	&&(gStatusURL_Status!="0")){
		//return '';
	} else {
        rw += '<div class="foottext1">\n';             
        rw += wom_html(WOMT_aTexte["wahlomat_footer_medienpartner_text"][S_nSprache])+'<\/div>\n';
        
        lTextNF = '(Dieser Link öffnet sich in einem neuen Fenster.)';
        
        rw += '<div class="clear">&nbsp;<\/div>';
        rw += '<div class="bpartner"><a href="http://www.bild.de" target="_blank" tabindex="701" title="bild.de '+wom_titletag(lTextNF)+'"><span>bild.de<\/span><\/a><\/div>';
    }
    return rw;		            
}    
    
function print_main_foot_all() {
    rw = '';
	if ((gStatusURL_Status!=0)
	&&(gStatusURL_Status!="0")){
		//return '';
	} else {
            rw += '<div class="foottext1">\n';             
            rw += wom_html(WOMT_aTexte["wahlomat_footer_medienpartner_text"][S_nSprache])+'<\/div>\n';
            
            lTextNF = '(Dieser Link öffnet sich in einem neuen Fenster.)';
            
            rw += '<div class="clear">&nbsp;<\/div>';
            rw += '<div class="b1"><a href="http://www.zdf.de" target="_blank" tabindex="701" title="zdf.de '+wom_titletag(lTextNF)+'"><span>zdf.de<\/span><\/a><\/div>';
            rw += '<div class="b2"><a href="http://www.spiegel.de" target="_blank" tabindex="702" title="spiegel.de '+wom_titletag(lTextNF)+'"><span>spiegel.de<\/span><\/a><\/div>';
            rw += '<div class="b3"><a href="http://www.zeit.de" target="_blank" tabindex="703" title="zeit.de '+wom_titletag(lTextNF)+'"><span>zeit.de<\/span><\/a><\/div>';
            rw += '<div class="b4"><a href="http://www.taz.de" target="_blank" tabindex="704" title="taz.de '+wom_titletag(lTextNF)+'"><span>taz.de<\/span><\/a><\/div>';
            rw += '<div class="b5"><a href="http://www.sueddeutsche.de/" target="_blank" tabindex="705" title="sueddeutsche.de '+wom_titletag(lTextNF)+'"><span>sueddeutsche.de<\/span><\/a><\/div>';

            rw += '<div class="clear">&nbsp;<\/div>';
            rw += '<div class="b6"><a href="http://www.ndr.de" target="_blank" tabindex="706" title="ndr.de '+wom_titletag(lTextNF)+'"><span>ndr.de<\/span><\/a><\/div>';
            rw += '<div class="b7"><a href="http://www.faz.net" target="_blank" tabindex="707" title="faz.net '+wom_titletag(lTextNF)+'"><span>faz.net<\/span><\/a><\/div>';
            rw += '<div class="b8"><a href="http://www.haz.de" target="_blank" tabindex="708" title="haz.de '+wom_titletag(lTextNF)+'"><span>haz.de<\/span><\/a><\/div>';
            rw += '<div class="b9"><a href="http://www.bild.de" target="_blank" tabindex="709" title="bild.de '+wom_titletag(lTextNF)+'"><span>bild.de<\/span><\/a><\/div>';
            rw += '<div class="b10"><a href="http://www.stern.de" target="_blank" tabindex="710" title="stern.de '+wom_titletag(lTextNF)+'"><span>stern.de<\/span><\/a><\/div>';
            rw += '<div class="b11"><a href="http://www.wiwo.de" target="_blank" tabindex="711" title="wiwo.de '+wom_titletag(lTextNF)+'"><span>wiwo.de<\/span><\/a><\/div>';

            rw += '<div class="clear">&nbsp;<\/div>';
            rw += '<div class="b12"><a href="http://www.handelsblatt.com" target="_blank" tabindex="712" title="handelsblatt.com '+wom_titletag(lTextNF)+'"><span>handelsblatt.com<\/span><\/a><\/div>';
            rw += '<div class="b13"><a href="http://www.noz.de" target="_blank" tabindex="713" title="noz.de '+wom_titletag(lTextNF)+'"><span>noz.de<\/span><\/a><\/div>';
            rw += '<div class="clear">&nbsp;<\/div>\n<br/>\n';

    }
	return rw;				
}
        	
function print_meta(){	
		rw = '\n';
		//rw +=   '<title>'+wom_html(WOMT_aTexte["wahlomat_head_titel"][S_nSprache])+'<\/title>\n';
		//rw +=   '<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1" />\n';
		rw +=   '<meta http-equiv="expires" content="0" \/>\n';
		rw +=   '<meta http-equiv="pragma" content="no-cache" \/>\n';
		rw +=   '<meta http-equiv="cache-control" content="no-cache" \/>\n';
		rw +=   '<meta name="keywords" content="'+wom_titletag(WOMT_aTexte["wahlomat_head_keywords"][S_nSprache])+'" \/>\n';
		rw +=   '<meta name="description" content="'+wom_titletag(WOMT_aTexte["wahlomat_head_description"][S_nSprache])+'" \/>\n';
		rw +=   '<meta name="Robots" content="index,follow" \/>\n';
		rw +=   '<meta name="viewport" content="width=320" \/>\n';
		rw +=   '<link rel="author" href="'+wom_titletag(WOMT_aTexte["wahlomat_head_link_chapter_redaktion_email"][S_nSprache])+'" title="'+wom_titletag(WOMT_aTexte["wahlomat_head_link_chapter_redaktion"][S_nSprache])+'" \/>\n';
		rw +=   '<link rel="chapter" href="http://www.werstehtzurwahl.de/'+CONST_WOMT_PATH+'" title="'+wom_titletag(WOMT_aTexte["wahlomat_head_link_chapter_werstehtzurwahl"][S_nSprache])+'" />\n';
		rw +=   '<link rel="chapter" href="http://www.wahl-o-mat.de/'+CONST_WOMT_PATH+'/weiterleitung.php?w=download" title="'+wom_titletag(WOMT_aTexte["wahlomat_head_link_chapter_download"][S_nSprache])+'" \/>\n';
		rw +=   '<link rel="chapter" href="http://www.wahl-o-mat.de/'+CONST_WOMT_PATH+'/weiterleitung.php?w=material" title="'+wom_titletag(WOMT_aTexte["wahlomat_head_link_chapter_informationen"][S_nSprache])+'" \/>\n';
        
        rw +=   '<link media="only screen and (max-device-width: 480px)" href="./styles/iphone.css" type="text/css" rel="stylesheet" \/>';
		
		rw  += '<style type="text/css" media="screen, print">\n';
        rw  += '@import url("./styles/style_all.css");\n';
        if (CONST_PARTNER_VERSION == 0) {
            rw  += '@import url("./styles/footer_v1_00_all_in_one.css");\n';
        } else {
            rw  += '@import url("./styles/footer_partner_bild.css");\n';
        }
        rw  += '<\/style>\n';
        // Blackberry - IPhone
        var clients = {};
        clients["BlackBerry"] = '<link rel="stylesheet" type="text/css" href="./styles/blackberry.css" />';
        clients["Windows Phone 6.5"] = '<link rel="stylesheet" type="text/css" href="./styles/iemobile6.css" />';
      
        var client = window.navigator.userAgent;
        for (var i in clients) {
            if (client.match(i)) document.writeln(clients[i]);
        };
	
	return rw;
}

function wom_titletag(text){
	text = wom_html(text);
    text = text.replace(/\<br\>/g," ");
    text = text.replace(/\<p\>/g," ");
    text = text.replace(/\r\n/g," ");
    text = text.replace(/\n/g," ");
    text = text.replace(/\r/g," ");
    text = text.replace(/\"/g,'&quot;');
    return text;
	//return text.replace(/[^A-Za-z0-9 .&;,\/:-]%/,"");   		                
}

function wom_html(text,ergebnis){
    text = text.replace(/\#/g,"'");
    text = text.replace(/\~\@\-\@\~/g,"'");
    if (ergebnis==1){
        text = text.replace(/\[BSLZ\]/g,"- ");
        text = text.replace(/\[LZ\]/g," ");
    } else {
        text = text.replace(/\[BSLZ\]/g,"");
        text = text.replace(/\[LZ\]/g,"");
    }		   	    
    
	//text = text.replace(/&/,"&amp;");
    text = text.replace(/Ü/,"&Uuml;");
    text = text.replace(/Ä/,"&Auml;");
    text = text.replace(/Ö/,"&Ouml;");
    text = text.replace(/ü/,"&uuml;");
    text = text.replace(/ä/,"&auml;");
    text = text.replace(/ö/,"&ouml;");
    text = text.replace(/ß/,"&szlig;");
	//text = text.replace(/©/,"&copy;");
	return text;
}

function wom_url(text){
	return text;
}