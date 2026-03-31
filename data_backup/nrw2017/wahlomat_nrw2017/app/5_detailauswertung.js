				
function write_5_detailauswertung() {

    popup_these = -1;
    popup_du = -1;
    
    popup_du 		= 0;
    popup_partei 	= S_nDetailAuswertung;
    popup_these 	= 0;
    popup_sprache 	= S_nSprache;

    S_nPartei		= S_nDetailAuswertung;
    S_nKommentarThese = 0;
    
    
    rw =  '';
    rw += '<div class="wom_main_wrapper' + msl_get_view_class() + '" id="wom">';
        rw += print_main_head(); 
        rw += '<!-- Blindennavigation: Anfang -->';
		rw += '<div class="wom_unsichtbar" id="bnseitenstart">';
			rw += '<ul>';
				rw += '<li><a href="#bnthesen" tabindex="10" title="">' + wom_html(WOMT_aTexte["5_bn_thesen_text"][S_nSprache]) + '<\/a><\/li>';
				rw += '<li><a href="#bnself" tabindex="11" title="">' + wom_html(WOMT_aTexte["5_bn_self_text"][S_nSprache]) + '<\/a><\/li>';
				rw += '<li><a href="#bnparteien" tabindex="12" title="">' + wom_html(WOMT_aTexte["5_bn_parteien_text"][S_nSprache]) + '<\/a><\/li>';
    			rw += '<li><a href="#bnbreadcrumb" tabindex="13" title="">' + wom_html(WOMT_aTexte["a_bn_breadcrumb_text"][S_nSprache]) + '<\/a><\/li>';
    			rw += '<li><a href="#bnleftnavi" tabindex="14" title="">' + wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache]) + '<\/a><\/li>';
			rw += '<\/ul>';
		rw += '<\/div>';
         rw += '<!-- Blindennavigation: Ende -->';
        rw += '<div class="wom_wrapper">';
            rw += '<div class="wom_content" id="content">';
                rw += print_top_nav(5);
                    rw += '<div class="wom_main_content">';
            
                        rw += '<div class="wom_phone-header">';
                            rw += '<a title="'
                                    + wom_titletag(WOMT_aTexte["5_btn_zurueck_title"][S_nSprache])
                                + '" href="" onclick="replaceIFrame(4);return false;" class="wom_link-back" tabindex="15">'
                                    + wom_html(WOMT_aTexte["5_btn_zurueck_text"][S_nSprache])
                                + '<\/a>';
                            rw += '<img class="svgnoie8" alt="'
                                    + wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache])
                                    + '" src="media/pix/bildmarke_wom_schwarz.svg" />';
                            rw += '<img class="svgie8" alt="'
                                    + wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache]) 
                                    + '" src="media/pix/iconie8/bildmarke_wom_schwarz.png" />';
                            rw += '<a title="'
                                    + wom_titletag(WOMT_aTexte["nav_startseite"][S_nSprache])
                                    + '" href="main_app.html" class="wom_link-home">' 
                                    + wom_html(WOMT_aTexte["nav_startseite"][S_nSprache]) + '<\/a>';
                        rw += '<\/div>';
            			rw += '<div class="wom_breadcrumb" id="bnbreadcrumb">';
        					rw += '<a href="" onclick="change_frage('
            							+ (WOMT_nThesen - 1)
            							+ ');'
            							+ 'return false;">' +  wom_html(WOMT_aTexte["bc_1_thesen"][S_nSprache]) + '<\/a>';
        					rw += '<ul class="wom_breadcrumb_list">';
        						rw += '<li class="wom_first_position wom_active"><a href="" onclick="replaceIFrame(2);return false;" tabindex="12">' + wom_html(WOMT_aTexte["bc_2_gewichtung"][S_nSprache]) + '<\/a><\/li>';
        						rw += '<li class="wom_active"><a href="" onclick="replaceIFrame(3);return false;" tabindex="13">' + wom_html(WOMT_aTexte["bc_3_partei"][S_nSprache]) + '<\/a><\/li>';
        						rw += '<li class="wom_active"><a href="" onclick="replaceIFrame(4);return false;" tabindex="14">' + wom_html(WOMT_aTexte["bc_4_ergebnis"][S_nSprache]) + '<\/a><\/li>';
        						rw += '<li class="wom_active">' + wom_html(WOMT_aTexte["bc_5_begruendungen"][S_nSprache]) + '<\/li>';
        					rw += '<\/ul>';
        					rw += '<div class="wom_clear"><\/div>';
        				rw += '<\/div>';
    				rw += '<div class="wom_header-margin wom_header-margin-detailauswertung"><\/div>';
    				rw += '<h1>'; 
    				    rw += wom_html(WOMT_aTexte["5_title_text"][S_nSprache]);
    				rw += '<\/h1>';
    				
    				
    				rw += '<p>'; 
    				    rw += wom_html(WOMT_aTexte["5_text_text"][S_nSprache]);
    				rw += '<\/p>';
                     rw += '<!-- Blindennavigation: Anfang -->';
                        	rw += '<div class="wom_unsichtbar">';
                        	
                        		rw += wom_html(WOMT_aTexte["5_bn_hinweis"][S_nSprache]);
                        	rw += '<\/div>';
                    rw += '<!-- Blindennavigation: Ende -->';
    				rw += '<div class="wom_thesen_vergleich" id="bnthesen">';
    					rw += '<div class="wom_thesen_slider">';
    						rw += '<div class="wom_slider_border">';
    						
    						    aktivThese = 0;
    					        if ((S_nKommentarThese >= 0)
    					          &&(S_nKommentarThese < WOMT_nThesen)) {
    					            aktivThese = S_nKommentarThese;
    					        }
    					        offsetThesenBox = -558 * aktivThese;
    					        offsetVotumList = -560 * aktivThese;
    					        offsetThesenBox = 0;
    					        offsetVotumList = 0;
                                var p_pos = aktivThese;
                            
    							rw += '<ul class="wom_thesen_box" style="left:0px">\n';
    							    
    						        
    						        for (a = 0; a < WOMT_nThesen; a++) {
        								rw += '<li';
        								
    								    if (aktivThese == a) {
    								       rw += ' class="wom_active"';
    								    }
    								    rw += ' style="';
    								    if (aktivThese != a) {
    								        rw += 'display:none;'
    								        
    								    }
    								    rw += '">';
    									rw += '<div style="height:120px">';
    								    rw += '<h2><span class="wom_counter"><strong>' 
    								                + (a+1) 
    								            + '<\/strong>/' 
        									    + WOMT_nThesen 
        									    + '&nbsp;<\/span> ';
                                                   
                                            rw += wom_html(WOMT_aThesen[a][S_nSprache][0]);
                                            
                                            rw += ' <a class="wom_info_link" target="_blank" tabindex="615" title="';
                                              
                                                lText = WOMT_aTexte["5_thesen_info_title"][S_nSprache];
                                                lText = lText.replace(/\[THESE\]/,WOMT_aThesen[a][S_nSprache][0]);
                                                rw += wom_titletag(lText  + ' ' + WOMT_aTexte["wahlomat_footer_linkoeffnung"][S_nSprache]);
                                                rw += '" href="';
        
                                                rw += 'https://www.wahl-o-mat.de/' + CONST_WOMT_PATH_WL + '/weiterleitung.php?w=mehr&amp;these_nr=' 
                                                     + (a+1) 
                                                     + '&amp;these_id=' 
                                                     + WOMT_aThesen_N2ID[a];
        
                                                rw += '"><span>' + wom_html(WOMT_aTexte["5_thesen_info_text"][S_nSprache]) + '<\/span><\/a>';
                                            rw += '<\/h2>';
    								        rw += '<p>';
                                                rw += wom_html(WOMT_aThesen[a][S_nSprache][1]);
                                            rw += '<\/p>';
                                        rw += '<\/div>';
                
                                        rw += '<div>';
    									    rw += '<a class="wom_these_previous';
        									if (a==0) {
        									    rw += ' wom_hide_link';
        									}
        							        
    		    					        rw += '" href="">';
    	    						        rw += wom_html(WOMT_aTexte['5_these_previous_text'][S_nSprache]);
        									rw += '<\/a><a class="wom_these_next';
    									    if (a==WOMT_nThesen-1) {
    									        rw += ' wom_hide_link';
    									    }
        							        rw += '" href="">'; 									        
        									rw += wom_html(WOMT_aTexte['5_these_next_text'][S_nSprache]);
    									
    									    rw += '<\/a>';
    								    rw += '<\/div>';
    								rw += '<\/li>\n';
    								}
    							rw += '<\/ul>\n';
    							rw += '<div class="wom_clear"><\/div>';
    						rw += '<\/div>';
    						rw += '<div class="wom_clear"><\/div>';
    						rw += '<div class="wom_thesen_number">';
                                rw += '<a class="wom_thesen_back wom_hide_link" href="" title="'
                                    +   wom_titletag(WOMT_aTexte['5_these_previous_text'][S_nSprache]);
        							rw += '"><\/a>';
                                rw += '<p class="wom_dot_black">'
                                        + wom_html(WOMT_aTexte['5_these'][S_nSprache])
    								+ ' <span>'+ aktivThese+1 + '<\/span> '
    							        + wom_html(WOMT_aTexte['5_these_von'][S_nSprache])
    								+ ' ' + WOMT_nThesen + '<\/p><!--  wom_star_orange / wom_dot_black -->';
                                rw += '<a class="wom_thesen_next" href="" title="'
        						        + wom_titletag(WOMT_aTexte['5_these_next_text'][S_nSprache])
        							+ '"><\/a>';
                                rw += '<\/div>';
                                
    						rw += '<ul class="wom_thesen_points">\n';
    						        
        							for (a = 0; a < WOMT_nThesen; a++) {
        								nr = (a+1);
        								
        								classDot = 'wom_dot_black';
        								classLiActive = '';
        								if (S_aThemen[a] == 1) {
        								    // Gewichtet
        								    if (aktivThese == a) {
        								        // Aktiv
        								        classDot = 'wom_star_orange';
        								    } else {
        								        classDot = 'wom_star_orange';
        								    }
        								    if (aktivThese == a) {
        								        classLiActive = ' class="wom_active"';
        								    }
        								} else if (aktivThese == a) {
        								    classDot = 'wom_dot_black wom_active_dot';
        								    classLiActive = ' class="wom_active"';
        								};    								
        								rw += '<li' + classLiActive + '><a title="';
        								        lText = WOMT_aTexte["5_these_nr"][S_nSprache];
        								        rw += wom_titletag(lText.replace('\[NR\]',(a+1)) 
        								            +  ' "' 
        								            + WOMT_aThesen[a][S_nSprache][0] 
        								            + '"');
    								    rw += '" class="' 
    								        + classDot + '" href=""><span class="wom_arrow_kommentar">&nbsp;<\/span><\/a><\/li>\n';
    								}
    						rw += '<\/ul>\n';
    					rw += '<\/div>';
    					rw += '<div class="wom_clear"><\/div>';
    					rw += '<div class="wom_parteiantworten" id="bnself">';
    						rw += '<div class="wom_antworten_box">';
    						    rw += '<ul class="wom_votum_list wom_my_votum off">\n';
    						        for (a = 0; a < WOMT_nThesen; a++) {
    						            ichAntwortClass    = '';
    						            ichAntwortText     = '';
    								    switch(S_aThesen[a]){
    								       case -2:
    								            ichAntwortClass    = 'wom_avoid';
    								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_uebersprungen"][S_nSprache];
    								            break;
    								        case -1:
    								            ichAntwortClass = 'wom_negative';
    								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_stimmenichtzu"][S_nSprache];
    								            break;
    								        case 0:
    								            ichAntwortClass = 'wom_neutral';
    								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_neutral"][S_nSprache];
    								            break;
    								        case 1:
    								            ichAntwortClass    = 'wom_approved';
    								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_stimmezu"][S_nSprache];				break;
    								    }						
    								    lText = ichAntwortText;
                                        ichAntwortText = lText.replace('\[THESE\]', WOMT_aThesen[a][S_nSprache][0]);
    							    	    
    						            rw += '<li';
    						            if (aktivThese == a) {
    						                rw += ' class="wom_on"'; 
    						            }
    					                rw += '><span class="wom_my_balken">' 
    					                    + wom_html(WOMT_aTexte["5_position"][S_nSprache]) 
    					                    + '<\/span><span class="wom_antworten_partei ' 
    					                    + ichAntwortClass + '" title="';
    			    			            rw += wom_titletag(ichAntwortText);
    				    			        rw += '"><span class="wom_unsichtbar">';
    				    			            rw += wom_html(ichAntwortText);
    				    			    rw += '<\/span><\/span><\/li>\n';
    						        }
    						    rw += '<\/ul>\n';
    						rw += '<\/div>';
    						rw += '<div class="wom_clear" id="bnparteien"><\/div>';
    
    						    lMargin = 0;
    							lCount = 0;
    							
                            	for (f=0;f<WOMT_nParteien;f++){
    
                                    if  ((S_nWeissNicht	>= CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN)
                            	       ||(S_nNeutral   	>= CONST_WOMT_NOERGEBNIS_NEUTRAL)
                            	       ||(S_nSame    	>= CONST_WOMT_NOERGEBNIS_SAME)) {
                            	        lNr = f;  // Nicht berechnet Reihenfolge der Parteien!
                            	        openAll = true;
                            	    } else {    	     
                            	        // Uebereinstimmungsreihenfolge
                            	        lNr = S_aSort[f];
                            	        openAll = false;
                            	    }
                            		if (S_aParteienAusgewaehlt[lNr]==1) {		
    								    rw += '<div class="wom_antworten_box">';
                							rw += '<ul class="wom_votum_list';
                					    if ((lCount == 0)||(openAll == true)) {
                					        rw += ' wom_on';
                					    }
                					    rw += '">\n';
    				    			    for (a = 0; a < WOMT_nThesen; a++) {
    				    			        abstimmung =parseInt(WOMT_aThesenParteien[a][lNr]);
    								        parteiAntwortClass = '';
    								        parteiAntwortText = '';
    									    switch(abstimmung){
                                                case -2:
                                                    parteiAntwortClass = 'wom_white';
                                                    parteiAntwortText = '';
                                                    break;
                                                case -1:
                                                    parteiAntwortClass = 'wom_negative';
                                                    parteiAntwortText = WOMT_aTexte["5_antwort_partei_text_stimmtnichtzu"][S_nSprache];
                                                    break;
                                                case 0:
                                                    parteiAntwortClass = 'wom_neutral';
                                                    parteiAntwortText = WOMT_aTexte["5_antwort_partei_text_neutral"][S_nSprache]; 
                                                    break;
                                                case 1:
                                                    parteiAntwortClass = 'wom_approved';
                                                    parteiAntwortText = WOMT_aTexte["5_antwort_partei_text_stimmtzu"][S_nSprache]; 
                                                    break;
                                            }
                                            parteiAntwortText = parteiAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][0]);
                                            parteiAntwortText = parteiAntwortText.replace(/\[PARTEI\]/, WOMT_aParteien[lNr][S_nSprache][1]);
                                            
                                            kommentar = '';
    				    			        if (WOMT_aThesenParteienText[a][lNr][0]!="") {
                                    	    	kommentar = '&bdquo;' 
                                    	    	    + wom_html(WOMT_aThesenParteienText[a][lNr][0]) 
                                    	    	    + '&rdquo;';
                                    		} else {
                                    			kommentar = WOMT_aTexte["5_partei_keinebegruendung"][S_nSprache];
                                    		}
    				    			        rw += '<li' 
    				    			            if (aktivThese == a) {
    				    			                rw += ' class="wom_on"';
    				    			            }
    				    			            rw += '><span class="wom_antworten_partei ' + parteiAntwortClass + '" title="';
    				    			            rw += wom_titletag(parteiAntwortText);
    				    			        rw += '"><span class="wom_unsichtbar">';
    				    			            rw += wom_html(parteiAntwortText);
    				    			        rw += '<\/span><\/span><span class="wom_partei_balken">' 
    				    			            + wom_html(WOMT_aParteien[lNr][S_nSprache][1]) 
    				    			            + '<\/span><div role="tabpanel"><p><span>' 
    				    			            + wom_html(WOMT_aTexte["5_begruendung"][S_nSprache]) 
    				    			            + '<\/span>' + kommentar + '<\/p><\/div><\/li>\n';
    				    			    }
    				    			    rw += '<\/ul>\n';
    				    			    rw += '<\/div>';
    				    			    lCount++;
                                    }
    							}
            				rw += '<div class="wom_skip wom_ie8_neustart">';
            					rw += '<a href="" onclick="replaceIFrame(4);return false;" class="wom_previous" title="' + wom_titletag(WOMT_aTexte["5_btn_zurueck_title"][S_nSprache]) + '" tabindex="580">' + wom_html(WOMT_aTexte["5_btn_zurueck_text"][S_nSprache]) + '<\/a>';
            					rw += '<a href="main_app.html" class="wom_next" tabindex="150" title="' + wom_titletag(WOMT_aTexte["5_btn_neustart_title"][S_nSprache]) + '">' + wom_html(WOMT_aTexte["5_btn_neustart_text"][S_nSprache]) + '<\/a>';
            				rw += '<\/div>';
            			rw += '<\/div>';
                    rw += '<\/div>';
                rw += '<\/div>';
            rw += '<\/div>';                
    			
			rw += '<div class="wom_clear"><\/div>';
                rw += '<!-- Blindennavigation: Anfang -->';
				rw += '<div class="wom_unsichtbar">';
					rw += '<ul>';
						rw += '<li><a href="#bnseitenstart" tabindex="580" title="">' + wom_html(WOMT_aTexte["a_bn_seitenstart_text"][S_nSprache]) + '<\/a><\/li>';
            			rw += '<li><a href="#bnbreadcrumb" tabindex="581" title="">' + wom_html(WOMT_aTexte["a_bn_breadcrumb_text"][S_nSprache]) + '<\/a><\/li>';
						rw += '<li><a href="#bnthesen" tabindex="582" title="">' + wom_html(WOMT_aTexte["5_bn_thesen_text"][S_nSprache]) + '<\/a><\/li>';
						rw += '<li><a href="#bnself" tabindex="583" title="">' + wom_html(WOMT_aTexte["5_bn_self_text"][S_nSprache]) + '<\/a><\/li>';
						rw += '<li><a href="#bnparteien" tabindex="584" title="">' + wom_html(WOMT_aTexte["5_bn_parteien_text"][S_nSprache]) + '<\/a><\/li>';
					rw += '<\/ul>';
				rw += '<\/div>';
                rw += '<!-- Blindennavigation: Ende -->    ';
            rw += '<\/div>';
        rw += '<\/div>';
    rw += '<\/div>';    
    rw += print_ivw_footer();	    
    return rw;
}
