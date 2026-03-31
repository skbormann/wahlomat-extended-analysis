// Version 1.00 vom 13.8.2014 19:32

var CONST_WOMT_BL_VERSION					= "bremen2015";
var CONST_WOMT_PATH							= "bremen2015";

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

function print_main_foot_all() {
    rw = '';
	if ((gStatusURL_Status!=0)
	&&(gStatusURL_Status!="0")){
		//return '';
	} else {
            lTextNF = WOMT_aTexte["wahlomat_footer_linkoeffnung"][S_nSprache];
            
            rw += '<div class="footer" style="margin-top:0px">\n';
                rw += '<div class="clear"><\/div>\n';
                rw += '<div class="footertext">' + wom_html(WOMT_aTexte["wahlomat_footer_medienpartner_text"][S_nSprache])+'<\/div>\n';
                rw += '<div style="clear:both;height:10px;"><\/div>\n';
                
                rw += '<div class="b1 fh">\n';
                    rw += '<a href="http://www.spiegel.de" title="spiegel.de ' + wom_titletag(lTextNF)+ '" target="_blank" tabindex="711"><span>spiegel.de<\/span><\/a>\n';
                rw += '<\/div>\n';
                
                rw += '<div class="b2 fh">\n';
                    rw += '<a href="http://www.zdf.de" title="zdf.de ' + wom_titletag(lTextNF)+ '" target="_blank" tabindex="712"><span>zdf.de<\/span><\/a>\n';
                rw += '<\/div>\n';
                
                rw += '<div class="b3 fh">\n';
                    rw += '<a href="http://www.zeit.de" title="zeit.de ' + wom_titletag(lTextNF)+ '" target="_blank" tabindex="714"><span>zeit.de<\/span><\/a>\n';
                rw += '<\/div>\n';
                
                rw += '<div class="b4 fh">\n';
                    rw += '<a href="http://www.sueddeutsche.de" title="sueddeutsche.de ' + wom_titletag(lTextNF)+ '" target="_blank" tabindex="716"><span>sueddeutsche.de<\/span><\/a>\n';
                rw += '<\/div>\n';
		
                rw += '<div class="b5 fh">\n';
                    rw += '<a href="http://www.welt.de" title="welt.de ' + wom_titletag(lTextNF)+ '" target="_blank" tabindex="713"><span>welt.de<\/span><\/a>\n';
                rw += '<\/div>\n';
        
                rw += '<div class="b6 fh">\n';
                    rw += '<a href="http://www.faz.net" title="faz.net ' + wom_titletag(lTextNF)+ '" target="_blank" tabindex="715"><span>faz.net<\/span><\/a>\n';
                rw += '<\/div>\n';
        
                rw += '<div class="b7 fh">\n';
                    rw += '<a href="http://www.stern.de" title="stern.de ' + wom_titletag(lTextNF)+ '" target="_blank" tabindex="718"><span>stern.de<\/span><\/a>\n';
                rw += '<\/div>\n';
                
                rw += '<div class="b8 fh">\n';
                    rw += '<a href="http://www.handelsblatt.com" title="handelsblatt.com ' + wom_titletag(lTextNF)+ '" target="_blank" tabindex="718"><span>handelsblatt.com<\/span><\/a>\n';
                rw += '<\/div>\n';
                
                rw += '<div class="b9 fh">\n';
                    rw += '<a href="http://www.wiwo.de" title="wiwo.de ' + wom_titletag(lTextNF)+ '" target="_blank" tabindex="719"><span>wiwo.de<\/span><\/a>\n';
                rw += '<\/div>\n';
                
                rw += '<div class="b10 fh">\n';
                    rw += '<a href="http://www.radiobremen.de" title="radiobremen.de ' + wom_titletag(lTextNF)+ '" target="_blank" tabindex="719"><span>radiobremen.de<\/span><\/a>\n';
                rw += '<\/div>\n';
                
                rw += '<div class="b11 fh">\n';
                  rw += '<a href="http://www.weser-kurier.de" title="weser-kurier.de ' + wom_titletag(lTextNF)+ '" target="_blank" tabindex="719"><span>weser-kurier.de<\/span><\/a>\n';
                rw += '<\/div>\n';
		
  

            rw += '<\/div>\n';
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
        rw +=   '<link media="screen, print)" href="./media/styles/style_all.css" type="text/css" rel="stylesheet" \/>';
		
		rw  += '<style type="text/css" media="screen, print">\n';
        if (CONST_PARTNER_VERSION == 0) {
            rw  += '@import url("./media/styles/footer_v1_00_all_in_one.css");\n';
        } else {
            rw  += '@import url("./media/styles/footer_partner.css");\n';
        }
        rw  += '<\/style>\n';
        
        rw  += '<style type="text/css" media="Screen, print">\n';
        rw  += '.auswertung input[type=checkbox]{position:absolute; right:45px; top:10px;}\n';
    
        rw  += '.auswertung span.point_star{background:url(media/pix/icon/dot_black_8px.png) no-repeat 21px 1px; position:absolute; width:auto; right:-45px; bottom:-8px; padding:0 20px;}\n';
    
        rw  += '.label_check span.star{ width:16px; height:16px; position:absolute; right:45px; bottom:14px; text-indent:-9999em; }\n';
    
        rw  += '.auswertung .trigger{background:url(media/pix/icon/thesen_hinterlegung.png) no-repeat -32px 0px;}\n';
    
        rw  += '.label_over:hover {background-position:-32px 0; color:#fff;}\n';
        rw  += '.trigger_active label{ color:#fff; background:url(media/pix/icon/thesen_hinterlegung_aktiv.png) no-repeat -32px 0px;}\n';
    
        rw  += '</style>\n';
        
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