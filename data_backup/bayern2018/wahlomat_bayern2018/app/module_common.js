// Version 1.00 vom 20.2.2017 16:58

var CONST_WOMT_BL_VERSION					= "bayern2018";
var CONST_WOMT_PATH							= "bayern2018";
var CONST_WOMT_VORLESEN 					= 1;
var CONST_WOMT_VORLESEN_STATUS				= 0;
var CONST_WOMT_VORLESEN_AUTOPLAY			= 0;

function print_main_foot(){
    rw = '';
    rw += '<div id="main_foot_sub">\n';
    rw += '<div class="wom_clear">&nbsp;<\/div>\n';
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
            rw += '<footer class="wom_footer" aria-labelledby="wom_footertext">\n';
            	rw += '<div class="wom_clear"><\/div>\n';
                rw += '<h3 class="wom_footertext" id="wom_footertext">' + wom_html(WOMT_aTexte["wahlomat_footer_medienpartner_text"][S_nSprache]) + '<\/h3>\n';
                rw += '<div style="clear:both;height:10px;"><\/div>\n';
                rw += '<ul>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b1 wom_fh">\n';
                    rw += '<a href="http://www.spiegel.de/" title="Link zum Medienpartner: Spiegel Online(Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>Spiegel Online<span>&nbsp;<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b2 wom_fh">\n';
                    rw += '<a href="http://www.focus.de/" title="Link zum Medienpartner: Focus (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>Focus<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b3 wom_fh">\n';
                    rw += '<a href="http://www.zeit.de/" title="Link zum Medienpartner: Zeit Online (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>Zeit Online<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b4 wom_fh">\n';
                    rw += '<a href="http://www.zdf.de/" title="Link zum Medienpartner: ZDF (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>ZDF<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b5 wom_fh">\n';
                    rw += '<a href="http://www.welt.de" title="Link zum Medienpartner: WELT (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>WELT<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b6 wom_fh">\n';
                    rw += '<a href="http://www.sueddeutsche.de/" title="Link zum Medienpartner: S&uuml;ddeutsche Zeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>S&uuml;ddeutsche Zeitung<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b7 wom_fh">\n';
                    rw += '<a href="http://www.faz.net/" title="Link zum Medienpartner: FAZ (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>FAZ<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b8 wom_fh">\n';
                    rw += '<a href="http://www.taz.de/" title="Link zum Medienpartner: Die Tageszeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>Die Tageszeitung<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b9 wom_fh">\n';
                    rw += '<a href="http://www.handelsblatt.com/" title="Link zum Medienpartner: Handelsblatt (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>Handelsblatt<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b10 wom_fh">\n';
                    rw += '<a href="http://www.wiwo.de/" title="Link zum Medienpartner: WirtschaftsWoche (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>WirtschaftsWoche<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b11 wom_fh">\n';
                    rw += '<a href="http://www.t-online.de" title="Link zum Medienpartner: T-Online (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>T-Online<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b12 wom_fh">\n';
                    rw += '<a href="http://www.1und1.de" title="Link zum Medienpartner: 1&amp;1 Internet (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>1&amp;1 Internet<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b13 wom_fh">\n';
                    rw += '<a href="http://www.antenne.de/" title="Link zum Medienpartner: ANTENNE BAYERN (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>ANTENNE BAYERN<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b14 wom_fh">\n';
                    rw += '<a href="https://www.augsburger-allgemeine.de/" title="Link zum Medienpartner: Augsburger Allgemeine (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>Augsburger Allgemeine<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';         
                rw += '<li>\n';
                  rw += '<div class="wom_b15 wom_fh">\n';
                    rw += '<a href="http://www.mittelbayerische.de/" title="Link zum Medienpartner: Mittelbayerische (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>Mittelbayerische<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b16 wom_fh">\n';
                    rw += '<a href="http://www.ippen-digital.de" title="Link zum Medienpartner: IPPEN DIGITAL (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>IPPEN DIGITAL<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';

                rw += '<li>\n';
                  rw += '<div class="wom_b17 wom_fh">\n';
                    rw += '<a href="http://www.abendzeitung-muenchen.de/" title="Link zum Medienpartner: Abendzeitung M&uuml;nchen (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>Abendzeitung M&uuml;nchen <\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b18 wom_fh">\n';
                    rw += '<a href="https://www.idowa.de/" title="Link zum Medienpartner: idowa (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="blank"><span>idowa<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
              rw += '<\/ul>\n';
            rw += '<\/footer>\n';
        }
	return rw;				
}
        	
function print_meta(){	
		rw = '\n';
		//rw +=   '<title>'+wom_html(WOMT_aTexte["wahlomat_head_titel"][S_nSprache])+'<\/title>\n';
		//rw +=   '<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1" />\n';
		//rw +=   '<meta http-equiv="expires" content="0" \/>\n';
		//rw +=   '<meta http-equiv="pragma" content="no-cache" \/>\n';
		//rw +=   '<meta http-equiv="cache-control" content="no-cache" \/>\n';
		rw +=   '<meta name="keywords" content="'+wom_titletag(WOMT_aTexte["wahlomat_head_keywords"][S_nSprache])+'" \/>\n';
		rw +=   '<meta name="description" content="'+wom_titletag(WOMT_aTexte["wahlomat_head_description"][S_nSprache])+'" \/>\n';
		rw +=   '<meta name="Robots" content="index,follow" \/>\n';
		

		rw  += '<style type="text/css" media="screen, print">\n';
        if (CONST_PARTNER_VERSION == 0) {
            rw  += '@import url("./media/styles/footer_v1_00_all_in_one.css");\n';
        } else {
            rw  += '@import url("./media/styles/footer_partner_v1_00.css");\n';
        }
        rw  += '<\/style>\n';
        
        rw  += '<style type="text/css" media="Screen, print">\n';
        rw  += '.auswertung input[type=checkbox]{position:absolute; right:45px; top:10px;}\n';
    
        rw  += '.auswertung span.point_star{background:url(media/pix/icon/dot_black_8px.png) no-repeat 21px 1px; position:absolute; width:auto; right:-45px; bottom:-8px; padding:0 20px;}\n';
    
        rw  += '.label_check span.star{ width:16px; height:16px; position:absolute; right:45px; bottom:14px; text-indent:-9999em; }\n';
    
        rw  += '.auswertung .trigger{background:url(media/pix/icon/thesen_hinterlegung.png) no-repeat -32px 0px;}\n';
    
        rw  += '.label_over:hover {background-position:-32px 0; color:#fff;}\n';
        rw  += '.trigger_active label{ color:#fff; background:url(media/pix/icon/thesen_hinterlegung_aktiv.png) no-repeat -32px 0px;}\n';
    
        rw  += '<\/style>\n';
        
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
    text = text.replace(/\#apos\#/g,"'");
    text = text.replace(/\~\@\-\@\~/g,"'");
    if (ergebnis==1){
        text = text.replace(/\[BSLZ\]/g,"- ");
        text = text.replace(/\[LZ\]/g," ");
    } else {
        text = text.replace(/\[BSLZ\]/g,"");
        text = text.replace(/\[LZ\]/g,"");
    }		   	    
    text = text.replace('\[P\]','<\/p><p class="wom_mt">');
    text = text.replace('\[P\]','<\/p><p class="wom_mt">');
    
	//text = text.replace(/&/,"&amp;");
    /*text = text.replace(/Ü/,"&Uuml;");
    text = text.replace(/Ä/,"&Auml;");
    text = text.replace(/Ö/,"&Ouml;");
    text = text.replace(/ü/,"&uuml;");
    text = text.replace(/ä/,"&auml;");
    text = text.replace(/ö/,"&ouml;");
    text = text.replace(/ß/,"&szlig;");
    */
	//text = text.replace(/©/,"&copy;");
	return text;
}

function wom_url(text){
	return text;
}