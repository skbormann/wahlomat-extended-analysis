		
            function write_0_intro(){
            	rw = '';
            	rw += '<div id="main">\n';
            	rw += '<!-- Blindennavigation: Anfang -->\n';
            	rw += '<div class="unsichtbar">\n';
            	rw += wom_html(WOMT_aTexte["0_bn_hinweis_text"][S_nSprache]);							
            	rw += '<ul>\n';
            	rw += '<li><a href="#content_center_start" tabindex="10" title="">'+wom_html(WOMT_aTexte["0_bn_willkommen_text"][S_nSprache])+'<\/a><\/li>\n';
            	rw += '<li><a href="#leftnav_fixed" tabindex="11" title="">'+wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache])+'<\/a><\/li>\n';
            	rw += '<\/ul>\n';
            	rw += '<\/div>\n';
            	rw += '<!-- Blindennavigation: Ende -->\n';
            	rw += print_main_head();

            	rw += '<div id="leftnav_fixed">\n';
            	rw += '<div id="leftnav_fixed_sub">\n';
            	
            	rw += print_top_nav();

            	rw += '<\/div>\n';
            	rw += '<\/div>\n';
            	rw += '<div id="main_wm">\n';
            	rw += '<div id="main_wm_start">\n';
    
            	rw += '<div id="content">\n';
    
            	rw += '<div id="content_head_start">\n';
            	rw += '<h2>'+wom_html(WOMT_aTexte["wahlomat_content_head"][S_nSprache])+'<\/h2>\n';
            	rw += '<\/div>\n';
    				
			    status = 1;
			    textnr = "";
                    
            	rw += '<div id="content_center_start">\n';
            	rw += '<div class="b1_start">\n';
            	rw += '<h4>\n';
            	rw += '<a class="weiter" href="" onclick="replaceIFrame(1);return false;" tabindex="13" title="';
                rw += wom_titletag(WOMT_aTexte["0_ms_start_title"+textnr][S_nSprache]);
                rw += '">';
                rw += wom_html(WOMT_aTexte["0_ms_title_text"+textnr][S_nSprache]);
    			rw += '<\/a>';
                            
            	rw += '<\/h4>\n';

                lText = WOMT_aTexte["0_ms_intro_text"+textnr][S_nSprache];
			    lText = lText.replace(/\[THESENANZAHL\]/,WOMT_nThesen);
			    lText = lText.replace(/\[PARTEIENANZAHL\]/,WOMT_nParteien);
			    			    
			    rw  += wom_html(lText);
    					    
            	rw += '<\/div>\n';
            	rw += '<div class="b2">\n';
            	rw += '<a class="weiter" href="" onclick="replaceIFrame(1);return false;" tabindex="14" title="';
                rw += wom_titletag(WOMT_aTexte["0_ms_start_title"+textnr][S_nSprache]);
                rw += '"><span>Start<\/span><\/a>\n';
                    
            	rw += '<\/div>\n';
            	rw += '<\/div>\n';
            	rw += '<div id="content_center_b_start">&nbsp;<\/div>\n';
            	rw += '<!-- Blindennavigation: Anfang -->\n';
            	rw += '<div class="unsichtbar">\n';
                
                rw += wom_html(WOMT_aTexte["0_bn_hinweis_text_2"][S_nSprache]);
                
            	rw += '<\/div>\n';
            	rw += '<!-- Blindennavigation: Ende -->\n';
            	rw += '<div id="content_choice">\n';
            	rw += '<div class="b1"><span>'+wom_html(WOMT_aTexte["a_button_stimmezu_text"][S_nSprache])+'<\/span><\/div>\n';
            	rw += '<div class="b2"><span>'+wom_html(WOMT_aTexte["a_button_neutral_text"][S_nSprache])+'<\/span><\/div>\n';
            	rw += '<div class="b3"><span>'+wom_html(WOMT_aTexte["a_button_stimmenichtzu_text"][S_nSprache])+'<\/span><\/div>\n';
            	rw += '<div class="b4"><span>'+wom_html(WOMT_aTexte["a_button_theseueberspringen_text"][S_nSprache])+'<\/span><\/div>\n';
    					
            	rw += '<div class="b5">&nbsp;<\/div>\n';
            	rw += '<\/div>\n';
    
            	rw += '<div id="content_choice_b">&copy;'+wom_html(WOMT_aTexte["a_copyright_text"][S_nSprache])+'<\/div>\n';
    
            	rw += '<\/div>\n';
            	rw += '<!-- Blindennavigation: Anfang -->\n';
            	rw += '<div class="unsichtbar">\n';
            	rw += '<ul>\n';
            	rw += '<li><a href="#main" tabindex="630" title="">'+wom_html(WOMT_aTexte["a_bn_seitenstart_text"][S_nSprache])+'<\/a><\/li>\n';
            	rw += '<li><a href="#content_center_start" tabindex="631" title="">'+wom_html(WOMT_aTexte["0_bn_willkommen_text"][S_nSprache])+'<\/a><\/li>\n';
            	rw += '<\/ul>\n';
            	rw += '<\/div>\n';
            	rw += '<!-- Blindennavigation: Ende -->\n';

            	rw += '<\/div>\n';
    
    	        rw +=   print_main_foot();
    
            	rw += '<\/div>\n';

            	rw += '<\/div>\n';
            	
            	
            	return rw;
            }
