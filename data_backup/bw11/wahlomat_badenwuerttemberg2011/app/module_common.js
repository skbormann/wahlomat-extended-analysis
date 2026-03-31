var CONST_WOMT_BL_VERSION					= "bw2011";

var CONST_WOMT_PATH							= "bw2011";


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
        rw  += '@import url("./styles/footer_v1_02_all_in_one.css");\n';
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