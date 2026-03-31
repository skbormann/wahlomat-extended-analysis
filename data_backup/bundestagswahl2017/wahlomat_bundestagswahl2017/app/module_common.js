// Version 1.00 vom 20.2.2017 16:58

var CONST_WOMT_BL_VERSION					= "bundestagswahl2017";
var CONST_WOMT_PATH							= "bundestagswahl2017";
var CONST_WOMT_VORLESEN 					= 0;
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
                    rw += '<a href="http://www.spiegel.de/" title="Link zum Medienpartner: Spiegel Online(Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Spiegel Online<span>&nbsp;<\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b2 wom_fh">\n';
                    rw += '<a href="http://www.faz.net/" title="Link zum Medienpartner: FAZ (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">FAZ<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b3 wom_fh">\n';
                    rw += '<a href="http://www.welt.de/" title="Link zum Medienpartner: WELT (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">WELT<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b4 wom_fh">\n';
                    rw += '<a href="http://www.sueddeutsche.de/" title="Link zum Medienpartner: S&uuml;ddeutsche Zeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">S&uuml;ddeutsche Zeitung<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b5 wom_fh">\n';
                    rw += '<a href="http://www.bild.de/" title="Link zum Medienpartner: BILD (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">BILD<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b6 wom_fh">\n';
                    rw += '<a href="http://www.zeit.de/" title="Link zum Medienpartner: Zeit Online (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Zeit Online<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b7 wom_fh">\n';
                    rw += '<a href="http://www.handelsblatt.com/" title="Link zum Medienpartner: Handelsblatt (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Handelsblatt <span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b8 wom_fh">\n';
                    rw += '<a href="http://www.wiwo.de/" title="Link zum Medienpartner: Wirtschaftswoche (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Wirtschaftswoche<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b9 wom_fh">\n';
                    rw += '<a href="http://www.focus.de/" title="Link zum Medienpartner: Focus (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Focus<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b10 wom_fh">\n';
                    rw += '<a href="http://www.taz.de/" title="Link zum Medienpartner: Die Tageszeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Die Tageszeitung<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b11 wom_fh">\n';
                    rw += '<a href="http://www.stern.de/" title="Link zum Medienpartner: Stern (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Stern<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b12 wom_fh">\n';
                    rw += '<a href="http://www.chip.de/" title="Link zum Medienpartner: Chip (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Chip<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b48 wom_fh">\n';
                    rw += '<a href="http://www.tagesschau.de/" title="Link zum Medienpartner: Tagesschau (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Tagesschau<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b13 wom_fh">\n';
                    rw += '<a href="http://www.ndr.de/" title="Link zum Medienpartner: Norddeutscher Rundfunk (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Norddeutscher Rundfunk<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b14 wom_fh">\n';
                    rw += '<a href="http://www.wdr.de/" title="Link zum Medienpartner: Westdeutscher Rundfunk (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Westdeutscher Rundfunk<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b15 wom_fh">\n';
                    rw += '<a href="http://www.br.de/" title="Link zum Medienpartner: Bayerischer Rundfunk (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Bayerischer Rundfunk<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b16 wom_fh">\n';
                    rw += '<a href="http://www.hr.de/" title="Link zum Medienpartner: Hessischer Rundfunk (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Hessischer Rundfunk<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b17 wom_fh">\n';
                    rw += '<a href="http://www.mdr.de/" title="Link zum Medienpartner: MITTELDEUTSCHER RUNDFUNK (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">MITTELDEUTSCHER RUNDFUNK<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b18 wom_fh">\n';
                    rw += '<a href="http://www.rbb-online.de/" title="Link zum Medienpartner: Rundfunk Berlin-Brandenburg (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Rundfunk Berlin-Brandenburg<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b19 wom_fh">\n';
                    rw += '<a href="http://www.sr.de" title="Link zum Medienpartner: Saarländischer Rundfunk (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Saarländischer Rundfunk<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b20 wom_fh">\n';
                    rw += '<a href="http://www.dw.com" title="Link zum Medienpartner: Deutsche Welle (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Deutsche Welle<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b21 wom_fh">\n';
                    rw += '<a href="http://www.swr.de/" title="Link zum Medienpartner: Südwestrundfunk (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Südwestrundfunk<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b22 wom_fh">\n';
                    rw += '<a href="http://www.radiobremen.de/" title="Link zum Medienpartner: Radio Bremen (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Radio Bremen<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b23 wom_fh">\n';
                    rw += '<a href="http://www.zdf.de" title="Link zum Medienpartner: ZDF (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">ZDF<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b24 wom_fh">\n';
                    rw += '<a href="http://www.sat1.de" title="Link zum Medienpartner: SAT1 (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">SAT1<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b25 wom_fh">\n';
                    rw += '<a href="http://www.1und1.de" title="Link zum Medienpartner: 1&amp;1 Internet (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">1&amp;1 Internet<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b26 wom_fh">\n';
                    rw += '<a href="http://www.t-online.de" title="Link zum Medienpartner: T-Online (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">T-Online<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b27 wom_fh">\n';
                    rw += '<a href="http://www.msn.de" title="Link zum Medienpartner: MSN Deutschland (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">MSN Deutschland<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b28 wom_fh">\n';
                    rw += '<a href="http://www.freenet.de" title="Link zum Medienpartner: freenet.de (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">freenet.de<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b29 wom_fh">\n';
                    rw += '<a href="http://www.yahoo.de" title="Link zum Medienpartner: Yahoo! (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Yahoo!<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b30 wom_fh">\n';
                    rw += '<a href="http://www.rnd-news.de/" title="Link zum Medienpartner: RND RedaktionsNetzwerk Deutschland (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">RND RedaktionsNetzwerk Deutschland<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b31 wom_fh">\n';
                    rw += '<a href="https://www.vrm.de/" title="Link zum Medienpartner: VRM Holding (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">VRM Holding<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b32 wom_fh">\n';
                    rw += '<a href="http://www.ippen-digital.de" title="Link zum Medienpartner: IPPEN DIGITAL (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">IPPEN DIGITAL<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b33 wom_fh">\n';
                    rw += '<a href="http://www.ams-net.de/" title="Link zum Medienpartner: audio media service Produktionsgesellschaft (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">audio media service Produktionsgesellschaft<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b34 wom_fh">\n';
                    rw += '<a href="http://www.express.de/" title="Link zum Medienpartner: EXPRESS (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">EXPRESS<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b35 wom_fh">\n';
                    rw += '<a href="http://www.ksta.de/" title="Link zum Medienpartner: K&ouml;lner Stadt-Anzeiger (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">K&ouml;lner Stadt-Anzeiger<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b36 wom_fh">\n';
                    rw += '<a href="http://www.rundschau-online.de/" title="Link zum Medienpartner: K&ouml;lnische Rundschau (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">K&ouml;lnische Rundschau<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b37 wom_fh">\n';
                    rw += '<a href="http://www.saarbruecker-zeitung.de/" title="Link zum Medienpartner: Saarbr&uuml;cker Zeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Saarbr&uuml;cker Zeitung<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b38 wom_fh">\n';
                    rw += '<a href="http://www.weser-kurier.de/" title="Link zum Medienpartner: WESER-KURIER (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">WESER-KURIER<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b39 wom_fh">\n';
                    rw += '<a href="http://www.mt.de" title="Link zum Medienpartner: Mindener Tageblatt (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Mindener Tageblatt<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b40 wom_fh">\n';
                    rw += '<a href="http://www.koeln.de/" title="Link zum Medienpartner: koeln.de (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">koeln.de<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b41 wom_fh">\n';
                    rw += '<a href="http://www.noz.de/" title="Link zum Medienpartner: Neue Osnabr&uuml;cker Zeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank"> Neue Osnabr&uuml;cker Zeitung<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b42 wom_fh">\n';
                    rw += '<a href="http://www.general-anzeiger-bonn.de/" title="Link zum Medienpartner: General-Anzeiger Bonn (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">General-Anzeiger Bonn<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b43 wom_fh">\n';
                    rw += '<a href="https://www.mhn-medien.de/" title="Link zum Medienpartner: mh:n digital (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">mh:n digital<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b44 wom_fh">\n';
                    rw += '<a href="http://www.mittelbayerische.de/" title="Link zum Medienpartner: Mittelbayerische (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Mittelbayerische<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b45 wom_fh">\n';
                    rw += '<a href="http://www.infranken.de/" title="Link zum Medienpartner: inFranken.de (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">inFranken.de<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b46 wom_fh">\n';
                    rw += '<a href="http://www.antenne.de/" title="Link zum Medienpartner: ANTENNE BAYERN (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">ANTENNE BAYERN<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b47 wom_fh">\n';
                    rw += '<a href="http://www.berliner-zeitung.de/" title="Link zum Medienpartner: Berliner Zeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Berliner Zeitung<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b49 wom_fh">\n';
                    rw += '<a href="https://www.pz-news.de/" title="Link zum Medienpartner: Pforzheimer Zeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Pforzheimer Zeitung<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b50 wom_fh">\n';
                    rw += '<a href="http://www.volksstimme.de/" title="Link zum Medienpartner: Volksstimme.de (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Volksstimme.de<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b51 wom_fh">\n';
                    rw += '<a href="http://www.mz-web.de/" title="Link zum Medienpartner: Mitteldeutsche Zeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Mitteldeutsche Zeitung<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b52 wom_fh">\n';
                    rw += '<a href="http://www.nordbayern.de/" title="Link zum Medienpartner: nordbayern.de (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">nordbayern.de<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b53 wom_fh">\n';
                    rw += '<a href="http://www.rp-online.de/" title="Link zum Medienpartner: RP ONLINE (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">RP ONLINE<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b54 wom_fh">\n';
                    rw += '<a href="http://www.ntz.de" title="Link zum Medienpartner: N&uuml;rtinger Zeitung (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">N&uuml;rtinger Zeitung<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b55 wom_fh">\n';
                    rw += '<a href="http://www.gaeubote.de/" title="Link zum Medienpartner: G&Auml;UBOTE (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">G&Auml;UBOTE<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b56 wom_fh">\n';
                    rw += '<a href="http://www.tagesspiegel.de/" title="Link zum Medienpartner: Der Tagesspiegel (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Der Tagesspiegel<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b57 wom_fh">\n';
                    rw += '<a href="http://www.volksfreund.de/" title="Link zum Medienpartner: Volksfreund (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Volksfreund<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b58 wom_fh">\n';
                    rw += '<a href="https://www.zvw.de/" title="Link zum Medienpartner: Zeitungsverlag GmbH (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Zeitungsverlag GmbH<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b59 wom_fh">\n';
                    rw += '<a href="https://www.morgenpost.de/" title="Link zum Medienpartner: Berliner Morgenpost (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Berliner Morgenpost<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b60 wom_fh">\n';
                    rw += '<a href="http://www.abendzeitung-muenchen.de/" title="Link zum Medienpartner: Abendzeitung M&uuml;nchen (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Abendzeitung M&uuml;nchen <span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b61 wom_fh">\n';
                    rw += '<a href="http://www.westfunk.de" title="Link zum Medienpartner: Westfunk (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Westfunk<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b62 wom_fh">\n';
                    rw += '<a href="http://www.freiepresse.de/" title="Link zum Medienpartner: FreiePresse (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">FreiePresse<span><\/span><\/a>\n';
                  rw += '<\/div>\n';
                rw += '<\/li>\n';
                rw += '<li>\n';
                  rw += '<div class="wom_b63 wom_fh">\n';
                    rw += '<a href="http://www.pointer.de/" title="Link zum Medienpartner: Pointer.de (Dieser Link &ouml;ffnet sich in einem neuen Fenster.)" target="_blank">Pointer.de<span><\/span><\/a>\n';
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
            rw  += '@import url("./media/styles/footer_v1_02_all_in_one.css");\n';
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