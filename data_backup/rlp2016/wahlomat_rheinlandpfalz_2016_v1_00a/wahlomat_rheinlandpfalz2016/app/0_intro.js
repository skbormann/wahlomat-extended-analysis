
/**
 * Start-Seite
 */		

function write_0_intro(){
    rw = '<div class="wom_main_wrapper'+msl_get_view_class()+'" id="wom">';

    rw += '<!-- Blindennavigation: Anfang -->';
    rw += '<div class="wom_unsichtbar" id="bnseitenstart">';
    rw += wom_html(WOMT_aTexte["0_bn_hinweis_text"][S_nSprache]);
    rw += '<ul>';
    rw += '<li><a href="#bnwelcome" tabindex="10" title="">'
        + wom_html(WOMT_aTexte["0_bn_willkommen_text"][S_nSprache])
        +'<\/a><\/li>';
    rw += '<li><a href="#bnleftnavi" tabindex="11" title="">'
        + wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache])
        + '<\/a><\/li>';
    rw += '<\/ul>';
    rw += '<\/div>';
    
    rw += '<!-- Blindennavigation: Ende -->';
    rw += print_main_head();
    rw += '<div class="wom_wrapper">       ';
    rw += '<div class="wom_content" id="content">';
    
    rw += print_top_nav(0);
    rw += '<div class="wom_main_content" id="main_content">';
    rw += '<div class="wom_wom_bgcolor"><div class="wom_wahlomat_startseite">';
        rw += '<div class="wom_welcome" id="bnwelcome">';
        rw += '<div class="wom_phone-header">';
        rw += '<img class="svgnoie8" alt="'
            +wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache])
            +'" src="media/pix/bildmarke_wom.svg" />';
        rw += '<img class="svgie8" alt="'+wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache])
            + '" src="media/pix/iconie8/bildmarke_wom.png" />';
        rw += '<h2>'
            + wom_html(WOMT_aTexte["0_title_h2"][S_nSprache])
            + '<\/h2>';
    rw += '<\/div>';
    rw += '<div class="wom_header-margin wom_header-margin-start"><\/div>';
    rw += '<h1><strong>'
        + wom_html(WOMT_aTexte["0_title_text"][S_nSprache])
        + '<\/strong><\/h1>';
    rw += '<p>';
    
    lText1 = WOMT_aTexte["0_intro_text_1"][S_nSprache];
    lText1 = lText1.replace(/\[THESENANZAHL\]/,WOMT_nThesen);
    lText1 = lText1.replace(/\[PARTEIENANZAHL\]/,WOMT_nParteien);
    
    lText2 = WOMT_aTexte["0_intro_text_2"][S_nSprache];
    lText2 = lText2.replace(/\[THESENANZAHL\]/,WOMT_nThesen);
    lText2 = lText2.replace(/\[PARTEIENANZAHL\]/,WOMT_nParteien);
    
    
    rw += wom_html(lText1);
    
    rw += '<\/p>';
    rw += '<p>' + wom_html(lText2) + '<\/p>\n';
    rw += '<!-- Blindennavigation: Anfang -->';
    rw += '<div class="wom_unsichtbar">';
    rw += wom_html(WOMT_aTexte["0_bn_hinweis_text_2"][S_nSprache]);
    rw += '<\/div>';
    rw += '<a href="" onclick="replaceIFrame(1);return false;" tabindex="20" tabindex="20" title="'+ 
        + wom_titletag(WOMT_aTexte["0_start_title"][S_nSprache])
        + '">'+wom_html(WOMT_aTexte["0_button_text"][S_nSprache])
        + '<\/a>';
    rw += '<\/div>';
    rw += '<\/div>';
    rw += '<div class="wom_clear"><\/div>';
    rw += '<\/div>';
    rw += '<\/div>';
    rw += '<\/div>';
    rw += '<div class="wom_clear"><\/div>';
    rw += '<!-- Blindennavigation: Anfang -->';
    rw += '<div class="wom_unsichtbar">';
    rw += '<ul>';
    rw += '<li><a href="#bnseitenstart" tabindex="590" title="">'
        + wom_html(WOMT_aTexte["a_bn_seitenstart_text"][S_nSprache])
        + '<\/a><\/li>';
    rw += '<li><a href="#bnwelcome" tabindex="591" title="">'
        + wom_html(WOMT_aTexte["0_bn_willkommen_text"][S_nSprache])
        + '<\/a><\/li>';
    rw += '<\/ul>';
    rw += '<\/div>';
    rw += '<!-- Blindennavigation: Ende -->';
    rw += '<div class="wom_clear"><\/div>';
    rw +=   print_main_foot();
    rw += '<div class="wom_clear"><\/div>';
    rw += '<\/div>';
    rw += '<\/div>';
    rw += print_ivw_footer();



    
	return rw;
    
}
