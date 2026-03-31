
/**
 * Start-Seite
 */		

function write_0_intro(){
   
    rw = '<div class="wom_main_wrapper' + msl_get_view_class() + '" id="wom" lang="de">';
      	rw += '<ul class="wom_anchormenu">';
           rw += '<li><a href="#main_content">'+ wom_html(WOMT_aTexte["0_bn_willkommen_text"][S_nSprache]) + '<\/a><\/li>';
           rw += '<li><a href="#bnleftnavi">'+ wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache]) + '<\/a><\/li>';
        rw += '<\/ul>';
        rw += print_main_head();
        rw += '<div class="wom_wrapper">';
            rw += '<div class="wom_content" id="content">';
                
                rw += print_top_nav(0);
                rw += '<main class="wom_main_content" id="main_content">';
                    rw += '<div class="wom_wom_bgcolor"><div class="wom_wahlomat_startseite">';
                            rw += '<div class="wom_welcome" id="bnwelcome">';
                                rw += '<header>';
                                rw += '<div class="wom_header">';
                              		rw += '<h2 class="h2header"><img class="wom_headerlogo" alt="'+ wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache])+ '" src="media/pix/bildmarke_wom.svg" /><span class="h2header wom_start_header">'+ wom_html(WOMT_aTexte["0_title_h2"][S_nSprache])+ '<\/span><\/h2>';
                                rw += '<\/div>';
                                rw += '<h1><strong>'+ wom_html(WOMT_aTexte["0_title_text"][S_nSprache])+ '<\/strong><\/h1>';
                              	rw += '<\/header>';
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
                                 
                                 rw += '<a class="wom_begin" href="" onclick="replaceIFrame(1);return false;" title="' 
                                    + wom_titletag(WOMT_aTexte["0_start_title"][S_nSprache])
                                    + '">'+wom_html(WOMT_aTexte["0_button_text"][S_nSprache])
                                    + '<\/a>';		
    
                            rw += '<\/div>';
                        rw += '<\/div>';
                        rw += '<div class="wom_clear"><\/div>';
                    rw += '<\/div>';
                rw += '<\/main>';
            rw += '<\/div>';
            rw += '<div class="wom_clear"><\/div>';
            rw += print_main_foot();
            rw += '<div class="wom_clear"><\/div>';
        rw += '<\/div>';
    rw += '<\/div>';
    rw += print_ivw_footer();
	return rw;
    
}
