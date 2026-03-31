// Version 1.00 vom 12.12.2012 17:30

var CONST_WOMT_BL_VERSION					= "bundestagswahl2013";
var CONST_WOMT_PATH							= "bundestagswahl2013";
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
    return '';
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
            lTextNF = WOMT_aTexte["wahlomat_footer_linkoeffnung"][S_nSprache];
            
            rw += '<div class="footer" style="margin-top:0px">\n';
                rw += '<div class="clear"><\/div>\n';
                rw += '<div class="footertext">' + wom_html(WOMT_aTexte["wahlomat_footer_medienpartner_text"][S_nSprache])+'<\/div>\n';
                rw += '<div style="clear:both;height:10px;"><\/div>\n';
                
                rw += '<div class="b1 fh">\n';
                    rw += '<a href="http://www.zdf.de" title="zdf.de ' + lTextNF + '" target="_blank" tabindex="701"><span>zdf.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b2 fh">\n';
                    rw += '<a href="http://www.tagessschau.de" title="tagessschau.de ' + lTextNF + '" target="_blank" tabindex="702"><span>tagessschau.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b3 fh">\n';
                    rw += '<a href="http://www.ndr.de" title="ndr.de ' + lTextNF + '" target="_blank" tabindex="703"><span>ndr.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b4 fh">\n';
                    rw += '<a href="http://www.wdr.de" title="wdr.de ' + lTextNF + '" target="_blank" tabindex="704"><span>wdr.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b5 fh">\n';
                    rw += '<a href="http://www.swr.de" title="swr.de ' + lTextNF + '" target="_blank" tabindex="707"><span>swr.de</span></a>\n';
                rw += '</div>\n';
		
                rw += '<div class="b6 fh">\n';
                    rw += '<a href="http://www.br.de/wahl" title="BR.de ' + lTextNF + '" target="_blank" tabindex="705"><span>BR.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b7 fh">\n';
                    rw += '<a href="http://www.hr-online.de" title="hr-online.dem ' + lTextNF + '" target="_blank" tabindex="708"><span>hr-online.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b8 fh">\n';
                    rw += '<a href="http://www.rbb-online.de/" title="rbb-online.de/ ' + lTextNF + '" target="_blank" tabindex="709"><span>rbb-online.de/</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b9 fh">\n';
                    rw += '<a href="http://www.radiobremen.de" title="radiobremen.de ' + lTextNF + '" target="_blank" tabindex="710"><span>radiobremen.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b10 fh">\n';
                    rw += '<a href="http://www.mdr.de" title="mdr.de ' + lTextNF + '" target="_blank" tabindex="711"><span>mdr.de</span></a>\n';
                rw += '</div>\n';
				
                rw += '<div class="b11 fh">\n';
                    rw += '<a href="http://www.sr-online.de" title="sr-online.de ' + lTextNF + '" target="_blank" tabindex="706"><span>sr-online.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b12 fh">\n';
                    rw += '<a href="http://www.dw.de" title="dw.de ' + lTextNF + '" target="_blank" tabindex="712"><span>dw.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b13 fh">\n';
                    rw += '<a href="http://www.prosieben.de" title="prosieben.de ' + lTextNF + '" target="_blank" tabindex="714"><span>prosieben.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b14 fh">\n';
                    rw += '<a href="http://www.rtl.de" title="rtl.de ' + lTextNF + '" target="_blank" tabindex="713"><span>rtl.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b15 fh">\n';
                    rw += '<a href="http://www.spiegel.de" title="spiegel.de ' + lTextNF + '" target="_blank" tabindex="702"><span>spiegel.de</span></a>\n';
                rw += '</div>\n';


                rw += '<div class="b16 fh">\n';
                    rw += '<a href="http://www.bild.de" title="bild.de ' + lTextNF + '" target="_blank" tabindex="713"><span>bild.de</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b17 fh">\n';
                    rw += '<a href="http://www.stern.de" title="stern.de ' + lTextNF + '" target="_blank" tabindex="713"><span>stern.de</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b18 fh">\n';
                    rw += '<a href="http://www.focus.de" title="focus.de ' + lTextNF + '" target="_blank" tabindex="713"><span>focus.de</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b19 fh">\n';
                    rw += '<a href="http://www.taz.de" title="taz.de ' + lTextNF + '" target="_blank" tabindex="713"><span>taz.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b20 fh">\n';
                    rw += '<a href="http://www.welt.de" title="welt.de ' + lTextNF + '" target="_blank" tabindex="713"><span>welt.de</span></a>\n';
                rw += '</div>\n';


                rw += '<div class="b21 fh">\n';
                    rw += '<a href="http://www.zeit.de" title="zeit.de ' + lTextNF + '" target="_blank" tabindex="713"><span>zeit.de</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b22 fh">\n';
                    rw += '<a href="http://www.faz.net" title="faz.net ' + lTextNF + '" target="_blank" tabindex="713"><span>faz.net</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b23 fh">\n';
                    rw += '<a href="http://www.handelsblatt.com" title="handelsblatt.com ' + lTextNF + '" target="_blank" tabindex="713"><span>handelsblatt.com</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b24 fh">\n';
                    rw += '<a href="http://www.msn.de" title="msn.de ' + lTextNF + '" target="_blank" tabindex="713"><span>msn.de</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b25 fh">\n';
                    rw += '<a href="http://home.1und1.de" title="1und1.de ' + lTextNF + '" target="_blank" tabindex="713"><span>1und1.de</span></a>\n';
                rw += '</div>\n';


                rw += '<div class="b26 fh">\n';
                    rw += '<a href="http://www.t-online.de" title="t-online.de ' + lTextNF + '" target="_blank" tabindex="713"><span>t-online.de</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b27 fh">\n';
                    rw += '<a href="http://www.freenet.de" title="freenet.de ' + lTextNF + '" target="_blank" tabindex="713"><span>freenet.de</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b28 fh">\n';
                    rw += '<a href="http://www.yahoo.de" title="yahoo.de ' + lTextNF + '" target="_blank" tabindex="713"><span>yahoo.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b29 fh">\n';
                    rw += '<a href="http://www.n-tv.de" title="n-tv.de ' + lTextNF + '" target="_blank" tabindex="713"><span>n-tv.de</span></a>\n';
                rw += '</div>\n';
		
                rw += '<div class="b30 fh">\n';
                    rw += '<a href="http://www.n24.de" title="n24.de ' + lTextNF + '" target="_blank" tabindex="713"><span>n24.de</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b31 fh">\n';
                    rw += '<a href="http://www.wiwo.de" title="wiwo.de ' + lTextNF + '" target="_blank" tabindex="713"><span>wiwo.de</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b32 fh">\n';
                    rw += '<a href="http://www.hamburg.de" title="hamburg.de ' + lTextNF + '" target="_blank" tabindex="713"><span>hamburg.de</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b33 fh">\n';
                    rw += '<a href="http://www.koeln.de" title="koeln.de ' + lTextNF + '" target="_blank" tabindex="713"><span>koeln.de</span></a>\n';
                rw += '</div>\n';

                rw += '<div class="b34 fh">\n';
                    rw += '<a href="http://www.prosieben.de" title="Geh w&auml;hlen ' + lTextNF + '" target="_blank" tabindex="713"><span>Geh w&auml;hlen</span></a>\n';
                rw += '</div>\n';
		
                rw += '<div class="b35 fh">\n';
                    rw += '<a href="http://www.haz.de" title="haz.de ' + lTextNF + '" target="_blank" tabindex="713"><span>haz.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b36 fh">\n';
                    rw += '<a href="http://www.antenne.de" title="antenne.de ' + lTextNF + '" target="_blank" tabindex="713"><span>antenne.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b37 fh">\n';
                    rw += '<a href="http://www.general-anzeiger-bonn.de" title="general-anzeiger-bonn.de ' + lTextNF + '" target="_blank" tabindex="713"><span>general-anzeiger-bonn.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b38 fh">\n';
                    rw += '<a href="http://www.thueringer-allgemeine.de" title="thueringer-allgemeine.de ' + lTextNF + '" target="_blank" tabindex="713"><span>thueringer-allgemeine.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b39 fh">\n';
                    rw += '<a href="http://www.rhein-zeitung.de" title="rhein-zeitung.de ' + lTextNF + '" target="_blank" tabindex="713"><span>rhein-zeitung.de</span></a>\n';
                rw += '</div>\n';
		
                rw += '<div class="b40 fh">\n';
                    rw += '<a href="http://www.merkur-online.de" title="merkur-online.de ' + lTextNF + '" target="_blank" tabindex="713"><span>merkur-online.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b41 fh">\n';
                    rw += '<a href="http://www.ams-net.de" title="ams-net.de ' + lTextNF + '" target="_blank" tabindex="713"><span>ams-net.de</span></a>\n';
                rw += '</div>\n';
		
                rw += '<div class="b42 fh">\n';
                    rw += '<a href="http://www.mt-online.de" title="mt-online.de ' + lTextNF + '" target="_blank" tabindex="713"><span>mt-online.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b43 fh">\n';
                    rw += '<a href="http://www.noz.de" title="noz.de ' + lTextNF + '" target="_blank" tabindex="713"><span>noz.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b44 fh">\n';
                    rw += '<a href="http://www.lvz-online.de" title="lvz-online.de ' + lTextNF + '" target="_blank" tabindex="713"><span>lvz-online.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b45 fh">\n';
                    rw += '<a href="http://www.ntz.de" title="ntz.de ' + lTextNF + '" target="_blank" tabindex="713"><span>ntz.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b46 fh">\n';
                    rw += '<a href="http://www.volksfreund.de" title="volksfreund.de ' + lTextNF + '" target="_blank" tabindex="713"><span>volksfreund.de</span></a>\n';
                rw += '</div>\n';
		
                rw += '<div class="b47 fh">\n';
                    rw += '<a href="http://www.gaeubote.de" title="gaeubote.de ' + lTextNF + '" target="_blank" tabindex="713"><span>gaeubote.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b48 fh">\n';
                    rw += '<a href="http://www.abendzeitung-muenchen.de" title="abendzeitung-muenchen.de ' + lTextNF + '" target="_blank" tabindex="713"><span>abendzeitung-muenchen.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b49 fh">\n';
                    rw += '<a href="http://www.rp-online.de" title="rp-online.de ' + lTextNF + '" target="_blank" tabindex="713"><span>rp-online.de</span></a>\n';
                rw += '</div>\n';
                rw += '<div class="b50 fh">\n';
                    rw += '<a href="http://www.ngz-online.de" title="ngz-online.de ' + lTextNF + '" target="_blank" tabindex="713"><span>ngz-online.de</span></a>\n';
                rw += '</div>\n';
	
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
            rw  += '@import url("./media/styles/footer_v1_03_all_in_one.css");\n';
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