// Version 1.00 vom 20.2.2017 16:58

var CONST_WOMT_BL_VERSION					= "europawahl2019";
var CONST_WOMT_PATH							= "europawahl2019";
var CONST_WOMT_VORLESEN 					= 1;
var CONST_WOMT_VORLESEN_STATUS				= 0;
var CONST_WOMT_VORLESEN_AUTOPLAY			= 1;

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
                rw += '<a href="http://www.spiegel.de/" title="Link zum Medienpartner: Spiegel Online (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>Spiegel Online<span>&nbsp;<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b2 wom_fh">\n';
                rw += '<a href="http://www.focus.de/" title="Link zum Medienpartner: Focus (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>Focus<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b3 wom_fh">\n';
                rw += '<a href="http://www.zeit.de/" title="Link zum Medienpartner: Zeit Online (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>Zeit Online<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b4 wom_fh">\n';
                rw += '<a href="http://www.welt.de" title="Link zum Medienpartner: WELT (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>WELT<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b5 wom_fh">\n';
                rw += '<a href="http://www.sueddeutsche.de/" title="Link zum Medienpartner: S&uuml;ddeutsche Zeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>S&uuml;ddeutsche Zeitung<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b6 wom_fh">\n';
                rw += '<a href="http://www.bild.de" title="Link zum Medienpartner: BILD (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>BILD<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b7 wom_fh">\n';
                rw += '<a href="http://www.faz.net/" title="Link zum Medienpartner: FAZ (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>FAZ<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b8 wom_fh">\n';
                rw += '<a href="http://www.taz.de/" title="Link zum Medienpartner: Taz (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>Taz<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b9 wom_fh">\n';
                rw += '<a href="http://www.handelsblatt.com/" title="Link zum Medienpartner: Handelsblatt (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>Handelsblatt<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b10 wom_fh">\n';
                rw += '<a href="http://www.wiwo.de/" title="Link zum Medienpartner: WirtschaftsWoche (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>WirtschaftsWoche<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b11 wom_fh">\n';
                rw += '<a href="http://www.tagesschau.de/" title="Link zum Medienpartner: Tagesschau (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>Tagesschau<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b24 wom_fh">\n';
                rw += '<a href="https://www.ndr.de/" title="Link zum Medienpartner: NDR (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>NDR<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b25 wom_fh">\n';
                rw += '<a href="https://www.wdr.de/" title="Link zum Medienpartner: WDR (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>WDR<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b26 wom_fh">\n';
                rw += '<a href="https://www.br.de" title="Link zum Medienpartner: BR (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>BR<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b27 wom_fh">\n';
                rw += '<a href="https://www.hr.de" title="Link zum Medienpartner: Hessische Rundfunk (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>Hessische Rundfunk<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b28 wom_fh">\n';
                rw += '<a href="https://www.mdr.de/" title="Link zum Medienpartner: MDR (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>MDR<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b29 wom_fh">\n';
                rw += '<a href="https://www.rbb-online.de" title="Link zum Medienpartner: rbb (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>rbb<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b30 wom_fh">\n';
                rw += '<a href="https://www.sr.de/" title="Link zum Medienpartner: SR (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>SR<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b31 wom_fh">\n';
                rw += '<a href="https://www.swr.de/" title="Link zum Medienpartner: SWR (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>SWR<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b12 wom_fh">\n';
                rw += '<a href="http://www.zdf.de/" title="Link zum Medienpartner: ZDF (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>ZDF<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b13 wom_fh">\n';
                rw += '<a href="http://www.1und1.de" title="Link zum Medienpartner: 1&amp;1 (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>1&amp;1<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b14 wom_fh">\n';
                rw += '<a href="http://www.t-online.de" title="Link zum Medienpartner: T-Online (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>T-Online<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b23 wom_fh">\n';
                rw += '<a href="https://www.netcologne.de/" title="Link zum Medienpartner: NetCologne (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>NetCologne<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b15 wom_fh">\n';
                rw += '<a href="http://www.rnd-news.de/" title="Link zum Medienpartner: RND RedaktionsNetzwerk Deutschland (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>RND RedaktionsNetzwerk Deutschland<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b16 wom_fh">\n';
                rw += '<a href="http://www.ippen-digital.de" title="Link zum Medienpartner: IPPEN DIGITAL (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>IPPEN DIGITAL<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b18 wom_fh">\n';
                rw += '<a href="https://www.ams-net.de/" title="Link zum Medienpartner: ams (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>ams<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b19 wom_fh">\n';
                rw += '<a href="https://www.antenne.de/" title="Link zum Medienpartner: antenne bayern (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>antenne bayern<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                rw += '<div class="wom_b33 wom_fh">\n';
                rw += '<a href="https://www.rp-online.de" title="Link zum Medienpartner: RP ONLINE (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>RP ONLINE<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                               \n';
                rw += '<li>\n';
                rw += '<div class="wom_b34 wom_fh">\n';
                rw += '<a href="https://www.thueringer-allgemeine.de/" title="Link zum Medienpartner: Th&uuml;ringer Allgemeine (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>Th&uuml;ringer Allgemeine<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                               \n';
                rw += '<li>\n';
                rw += '<div class="wom_b17 wom_fh">\n';
                rw += '<a href="https://www.mz-web.de" title="Link zum Medienpartner: Mitteldeutsche Zeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>Mitteldeutsche Zeitung<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                               \n';
                rw += '<li>\n';
                rw += '<div class="wom_b22 wom_fh">\n';
                rw += '<a href="https://www.gaeubote.de/" title="Link zum Medienpartner: G&Auml;UBOTE (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>G&Auml;UBOTE<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b20 wom_fh">\n';
                rw += '<a href="https://www.idowa.de/" title="Link zum Medienpartner: idowa (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>idowa<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>                \n';
                rw += '<li>\n';
                rw += '<div class="wom_b21 wom_fh">\n';
                rw += '<a href="https://www.waidler.com/" title="Link zum Medienpartner: WAIDLER.COM (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>WAIDLER.COM<\/span><\/a>\n';
                rw += '<\/div>\n';
                rw += '<\/li>\n';     
                rw += '<li>\n';
                rw += '<div class="wom_b35 wom_fh">\n';
                rw += '<a href="https://www.weser-kurier.de/" title="Link zum Medienpartner: WESER-KURIER (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"><span>WESER-KURIER<\/span><\/a>\n';
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
            rw  += '@import url("./media/styles/footer_v1_01_all_in_one.css");\n';
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