function write_1_fragen(){
    if (S_nTheseAktuell >= WOMT_nThesen){
        S_nTheseAktuell         = WOMT_nThesen-1;
    }

    b=S_nTheseAktuell+1;

    rw = '';

    rw += '<div class="wom_main_wrapper' + msl_get_view_class() +'" id="wom">';
        rw += '<ul class="wom_anchormenu" aria-label="' + wom_titletag(WOMT_aTexte["1_bn_arialabel_text"][S_nSprache]) + '">';
           rw += '<li><a href="#bnthese">' + wom_html(WOMT_aTexte["1_bn_zurthese_text"][S_nSprache]) + '<\/a><\/li>';
           rw += '<li><a href="#bnsteps">' + wom_html(WOMT_aTexte["1_bn_thesennavigation_text"][S_nSprache]) + '<\/a><\/li>';
           rw += '<li><a href="#bnleftnavi">' + wom_html(WOMT_aTexte["1_bn_menu_text"][S_nSprache]) + '<\/a><\/li>';
        rw += '<\/ul>';
        rw += print_main_head();
     
        rw += '<div class="wom_wrapper">';
            rw += '<div class="wom_content" id="content">';
                rw += print_top_nav(1);
                rw += ' <main class="wom_main_content">';    			
    				rw += '<div class="wom_wahlomat';
    				    if (isTouchSupported) {
    				        rw += ' touchhoverdisable';
    				    }
    				    rw += '">';
            
    				    rw += ' <header class="wom_header">';
                            rw += '<a class="wom_link-back" href="" onclick="';
                                if (S_nTheseAktuell<=0) {
                                    // Zurueck zum Start
                                    urlZurueck = 'replaceIFrame(0);return false;';
                                    text2 = WOMT_aTexte["1_leiste_zurueck_start"][S_nSprache];
                                } else {
                                    // Zurueck zur letzten These
                                    urlZurueck = 'change_frage('+(S_nTheseAktuell-1)+');return false;';
                                    text2 = WOMT_aTexte["1_leiste_zurueck_these"][S_nSprache];
                                    text2 = text2.replace('[NR]',S_nTheseAktuell);
                                    
                                }
                                rw += urlZurueck;
                            rw += '" title="' + wom_titletag(text2)+'">';
                                rw += wom_html(WOMT_aTexte["1_leiste_zurueck_text"][S_nSprache])
                            rw += '<\/a>';
                                        
                            
                            rw += '<h2 class="h2header"><img class="wom_headerlogo" alt="' + wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache]) + '" src="media/pix/bildmarke_wom.svg" /><span class="h2header">' + wom_html(WOMT_aTexte["0_title_h2"][S_nSprache]) + '<\/span><\/h2>';
                            rw += '<a title="' + wom_titletag(WOMT_aTexte["nav_startseite"][S_nSprache]) + '" href="main_app.html" class="wom_link-home">' + wom_titletag(WOMT_aTexte["nav_startseite"][S_nSprache]) + '<\/a>';
                        rw += '<\/header>';
                        rw += '<div class="wom_header-margin wom_header-margin-these-small"><\/div>';
					
						rw += '<div class="wom_thesen" id="bnthese">';
    					    rw += '<div class="wom_phone-whitebox">';
                                    rw += '<h1><span>'+(S_nTheseAktuell+1)+'<\/span><span class="wom_thesenanzahl">/'+WOMT_nThesen+'<\/span> ';
                                        lwKurzFrage = wom_html(WOMT_aThesen[S_nTheseAktuell][S_nSprache][0]);
                                    	//lwKurzFrage = lwKurzFrage.replace(/\- /,"");
                                	    rw += lwKurzFrage;
        						    rw += '<\/h1>';
                                    rw += '<p class="wom_these_text">';
                                    rw += wom_html(WOMT_aThesen[S_nTheseAktuell][S_nSprache][1]);
        						    rw += '<\/p><div style="clear:both"><\/div>';
                                rw += '<\/div>';
                                rw += '<div style="clear:both"><\/div>';
                        
                                rw += '<a class="wom_skipper social-bottom" href="" onclick="beantworteFrage(-2);return false;" accesskey="w" title="' 
                            	    + wom_titletag(WOMT_aTexte["1_these_ueberspringen_taste_title"][S_nSprache]) 
                            	    + '">' + wom_html(WOMT_aTexte["a_button_theseueberspringen_text"][S_nSprache]) 
                            	    + '<span class="wom_icon-arrow-right">&nbsp;<\/span><\/a>\n'
        						if (is_bogus()==1) {
                                    rw +=  '<p class="wom_bogus">'+wom_html(WOMT_aTexte["1_fragen_bogus"][S_nSprache])+'<\/p>\n';
                                    reset_bogus();
                                }
 	
 							
    					        rw += '<p class="wom_phone-thesenzahl">'
    					            + wom_html(WOMT_aTexte["1_fragen_these"][S_nSprache])
                                    + ' <span>'+ (S_nTheseAktuell+1)
                                    + '<\/span> '
                                    + wom_html(WOMT_aTexte["1_fragen_these_von"][S_nSprache])
                                    + ' ' + WOMT_nThesen + '<\/p>';
    							 
                                rw += '<div style="clear:both"><\/div>';
    						    rw += '<ul class="wom_entscheidung social-bottom">';
    						        rw += '<li class="wom_yes"><a class="';
                        		    if (S_aThesen[S_nTheseAktuell]==1){
                                		rw += 'wom_decision';
                                	} else {
                                		rw += '';
                                	} 
        	                        rw += '" role="button" aria-pressed="';
        	                        if (S_aThesen[S_nTheseAktuell]==1){
                                		rw += 'true';
                                	} else {
                                		rw += 'false';
                                	}
        	                        rw += '" href="" onclick="beantworteFrage(1);return false;" accesskey="j"  title="' 
                            	    + wom_titletag(WOMT_aTexte["1_these_stimmezu_taste_title"][S_nSprache]) + '">' 
                            	    + wom_html(WOMT_aTexte["a_button_stimmezu_text"][S_nSprache]) 
                            	    + '<\/a><\/li>\n';
    	    
    	    
        							rw += '<li class="wom_neutral"><a class="';
                                        if (S_aThesen[S_nTheseAktuell]==0){
                                    		rw += 'wom_decision';
                                    	} else {
                                    		rw += '';
                                    	}
                                	rw += '" role="button" aria-pressed="';
                                        if (S_aThesen[S_nTheseAktuell]==0){
                                    		rw += 'true';
                                    	} else {
                                    		rw += 'false';
                                    	}                            	
                                	rw += '" href="" onclick="beantworteFrage(0);return false;" accesskey="x"  title="' 
                                	        + wom_titletag(WOMT_aTexte["1_these_neutral_taste_title"][S_nSprache]) 
                                	        + '">' 
                                	        + wom_html(WOMT_aTexte["a_button_neutral_text"][S_nSprache]) 
                                	        + '<\/a><\/li>\n';
                              	
                                	rw += '<li class="wom_no"><a class="';
                                    if (S_aThesen[S_nTheseAktuell]==-1){
                                		rw += 'wom_decision';
                                	} else {
                                		rw += '';
                                	} 
                                	rw += '" role="button" aria-pressed="';
                                    	if (S_aThesen[S_nTheseAktuell]==-1){
                                    		rw += 'true';
                                    	} else {
                                    		rw += 'false';
                                    	} 
                                	rw += '" href="" onclick="beantworteFrage(-1);return false;" accesskey="n"  title="' 
                                	    + wom_titletag(WOMT_aTexte["1_these_stimmenichtzu_taste_title"][S_nSprache]) + '">' 
                                	    + wom_html(WOMT_aTexte["a_button_stimmenichtzu_text"][S_nSprache]) + '<\/a><\/li>\n';
                            	
                            	rw += '<\/ul>\n';
                                rw += '<div style="clear:both"><\/div>';
    					    rw += '<\/div>';
                            rw += '<div style="clear:both"><\/div>';

                            rw += '<ul class="wom_points" id="bnsteps">\n';
                			for (a=0;a<WOMT_nThesen;a++){
                                last = false;
                                if  (a == WOMT_nThesen-1) {
                                    last = true;
                                }
                                if (a == S_nTheseAktuell) {
                                    // gehighligted / aktuelle These
                                    arrowClass = 'wom_arrow_left';
                                    if (a >= 19 ) {    // Ab These 20
                                        arrowClass = 'wom_arrow_right';
                                    }
                                    rw += '<li class="wom_active_point';
                                    if (last==true) {
                                        rw += ' wom_point_last';
                                    }
                                    rw += '">';
                                    rw += '<a class="thesenavi_a"  href="" onclick="change_frage('+a+');return false;" aria-describedby="thesenavi'; 
                                        rw += a + '" title="';
                                            lText = WOMT_aTexte["1_leiste_these_aktuell_title"][S_nSprache];
                                            lText = lText.replace(/\[NR\]/,a+1);
                                        rw += wom_titletag(lText + ': "' + WOMT_aThesen[a][S_nSprache][0] + '"');
                                        rw += '"><\/a> <span class="' + arrowClass + '">&nbsp;<\/span><span class="thesenavi_tooltip';
                                    if (a>18) {
                                        rw += ' rightpos';
                                    }
                                    rw += '" id="thesenavi' + a + '" role="tooltip" aria-hidden="true">';
            			                    lText = WOMT_aTexte["1_leiste_these_aktuell_title"][S_nSprache];
                                            lText = lText.replace(/\[NR\]/,a+1);
                                            rw += wom_titletag(lText + ': "' + WOMT_aThesen[a][S_nSprache][0] + '"');
                                        rw += '<\/span><\/li>\n';
                                } else if (a <= S_nTheseMax) {
                                    // schonmal beantwortet
                                    rw += '<li class="wom_previous_point';
                                    if (last==true) {
                                        rw += ' wom_point_last';
                                    }
                                    rw += '"><a class="thesenavi_a" href="" onclick="change_frage('+a+');return false;" ';
                                    rw += 'aria-describedby="thesenavi' + a + '" title="';
                                            lText = WOMT_aTexte["1_leiste_these_nr_title"][S_nSprache];
                                            lText = lText.replace(/\[NR\]/,a+1);
                                            rw += wom_titletag(lText +  ': "' + WOMT_aThesen[a][S_nSprache][0] + '"');
                    					 rw += '">&nbsp;<\/a>';
                    					 rw += '<span class="thesenavi_tooltip';
                    					    if (a>18) {
                    					        rw += ' rightpos';
                    					    }
                    					    rw += '" id="thesenavi' + a + '" role="tooltip" aria-hidden="true">';
                                            lText = WOMT_aTexte["1_leiste_these_nr_title"][S_nSprache];
                                            lText = lText.replace(/\[NR\]/,a+1);
                                            rw += wom_titletag(lText +  ': "' + WOMT_aThesen[a][S_nSprache][0] + '"');
                    					 rw += '<\/span><\/li>';
                                } else {
                                    // Noch nicht aktiv
                                    rw += '<li class="';
                                    if (last==true) {
                                        rw += 'wom_point_last';
                                    }
                                    rw += '" aria-hidden="true"><span>&nbsp;<\/span><\/li>';
                                }
                            }
                    		rw += '<\/ul>\n';
    	    			rw += '<\/div>';
        				rw += '<div class="wom_clear"><\/div>';
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
