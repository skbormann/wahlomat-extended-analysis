

function write_4_auswertung() {
    /*
        Aus dem globalen reingewandert
    */
    
    S_aVotematchData = new Array();
    S_aVotematchData['valid'] = 0;
    
	if (S_nRecalculate==1){
	    calculate();
	    S_nRecalculate=0;
	}
    	
	b = S_nTheseAktuell + 1;

	popup_these = -1;
	popup_du = -1;
	
    popup_du 		= 0;
    popup_partei 	= -1;
    popup_these 	= 0;
    popup_sprache 	= S_nSprache;
    
    /*
        War schon lokal
    */
	p_highlight=-1;
    
    if (CONST_VOTEMATCH_OFF != 1) {
	    S_aVotematchData = getVotematchUrlData();
	}
	
  	S_nAuswertung = 1;
  	
    rw  =   '';
    rw += '<div class="wom_main_wrapper' + msl_get_view_class() + ' nobg" id="wom">';
        rw += print_main_head(); 
        rw += '<ul class="wom_anchormenu">';
           rw += '<li><a href="#bnergebnis" title="">' +  wom_html(WOMT_aTexte["4_bn_zumergebnis_text"][S_nSprache]) + '<\/a><\/li>';
           rw += '<li><a href="#bnleftnavi" title="">' +  wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache]) + '<\/a><\/li>';
        rw += '<\/ul>';
         
        rw += '<div class="wom_wrapper">';
            rw += '<div class="wom_content" id="content">';
                rw += print_top_nav(4);
                    rw += '<main class="wom_main_content">';
                        rw += '<div class="wom_phone-header">';
                            rw += '<a title="'
                                    + wom_titletag(WOMT_aTexte["4_btn_zurueck_title"][S_nSprache])
                                + '" href="" onclick="replaceIFrame(3);return false;" class="wom_link-back">'
                                    + wom_html(WOMT_aTexte["4_btn_zurueck_text"][S_nSprache])
                                + '<\/a>';
                            rw += '<img class="svgnoie8" alt="'
                                    + wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache])
                                    + '" src="media/pix/bildmarke_wom_schwarz.svg" />';
                            rw += '<a title="'
                                    + wom_titletag(WOMT_aTexte["nav_startseite"][S_nSprache])
                                    + '" href="main_app.html" class="wom_link-home">' 
                                    + wom_html(WOMT_aTexte["nav_startseite"][S_nSprache]) + '<\/a>';
                        rw += '<\/div>';
    				                        
                        rw += '<h1 class="wom_unsichtbar">' +  wom_html(WOMT_aTexte["wahlomat_content_head"][S_nSprache]) + '<\/h1>';
                        rw += '<nav class="wom_breadcrumb" id="bnbreadcrumb">';
                            rw += '<a href="" onclick="change_frage('
            							+ (WOMT_nThesen - 1)
            							+ ');'
            							+ ';return false;">' +     
                                wom_html(WOMT_aTexte["bc_1_thesen"][S_nSprache])+ '<\/a>';
                            rw += '<ul class="wom_breadcrumb_list">';
    							rw += '<li class="wom_first_position wom_clickable" onclick="replaceIFrame(2);return false;">';
    							    rw += '<a href="" onclick="replaceIFrame(2);return false;">' 
    							        + wom_html(WOMT_aTexte["bc_2_gewichtung"][S_nSprache])
    							        + '<\/a>';
                                rw += '</li>';
    							rw += '<li class="wom_clickable"';
    							    if (S_nAuswertung == 1) {
    							        rw += ' id="link_gw_parteiauswahl"';
    							    }    							
    							rw += '>';
    							    rw += '<a href="" onclick="replaceIFrame(3);return false;">' 
    							        + wom_html(WOMT_aTexte["bc_3_partei"][S_nSprache])
    							        + '<\/a>';
                                rw += '</li>';
                                rw += '<li class="wom_active" aria-label="' 
    							    + wom_titletag(WOMT_aTexte["bc_hier"][S_nSprache]) 
    							    + ' ' 
    							    + WOMT_aTexte["bc_4_ergebnis"][S_nSprache]+ '"';
    							    rw += '><span>' + wom_html(WOMT_aTexte["bc_4_ergebnis"][S_nSprache])+ '</span></li>';
                                rw += '<li class="wom_clickable" ';
    							    if (S_nAuswertung == 1) {
    							        rw += ' id="link_gw_detailergebnis"';
    							    }
    							    rw += '>';
    							    rw += '<a href="" onclick="setDetailergebnisPartei(-1);replaceIFrame(5);return false;">' 
    							        + wom_html(WOMT_aTexte["bc_5_begruendungen"][S_nSprache])
    							        + '<\/a>';
                                rw += '</li>';
    				        rw += '</ul>';
                            rw += '<div class="wom_clear">&nbsp;<\/div>';
                        rw += '<\/nav>';
                    

				        rw += '<div class="wom_header-margin wom_header-margin-auswertung"><\/div>';
        				rw += '<header>';
            				rw += '<h1 id="bnergebnis">';
            				    rw += wom_html(WOMT_aTexte["4_ergebnis_titel"][S_nSprache]);
            				rw += '<\/h1>';
				
					if((S_nWeissNicht 	>= CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN)
				     ||(S_nNeutral    	>= CONST_WOMT_NOERGEBNIS_NEUTRAL)
				     ||(S_nSame    	    >= CONST_WOMT_NOERGEBNIS_SAME)
				    	) {
    				     	if (S_nWeissNicht >= CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN){
    				     		lText = wom_html(WOMT_aTexte["4_erg_noergebnis"][S_nSprache]);
    				     	} else {
    				     		lText = wom_html(WOMT_aTexte["4_erg_noergebnis"][S_nSprache]);
    				     	}
    				     	rw += '<p class="text_noergebnis">' + lText + '<\/p>';
				     	rw += '<\/header>';
				     	if (CONST_WOMT_NOERGEBNIS_BEGRUENDUNGEN == 1) {			     	    
				     	    rw += '<div class="wom_link_zu_kommentare text_noergebnis">';
        			            rw += '<a class="wom_fgfp" href="" onclick="setDetailergebnisPartei(-1);replaceIFrame(5);return false;">';
        			            rw += wom_html(WOMT_aTexte["4_kommentar_begruendungen"][S_nSprache]) + '</a>';
                            rw += '</div>';
				     	}
				    } else {
				        if (CONST_UMFRAGE_SHOW == 1) {
				            rw += '<div style="position:relative">';
                                rw += '<div id="umfrage">';
                                rw += '<\/div>';
                            rw += '<\/div>';
                        	check_umfrage();
                        }
                    
				     	rw += '<\/header>';
				     	
                        /**
                         * Votematch URL zusammenbauen
                         */
                        if ((CONST_VOTEMATCH_OFF != 1) && (S_aVotematchData['valid'] == 1)) {
            			    rw += '<div class="wom_link_zu_votematch" style="display:none;">';
                    			 rw += '<a id="votematch_open_link" href="#!" title="'
                    			    + wom_titletag(WOMT_aTexte["4_votematch_hinweis_title"][S_nSprache]) + '" ><span>'
                    			    + wom_html(WOMT_aTexte["4_votematch_hinweis"][S_nSprache])+ '</span></a>';
    	                        rw += '<div class="wom_clear"></div>';
                            rw += '</div>';
                        }
				     	
                        rw += '<div class="wom_link_zu_kommentare">';
    			            rw += '<a class="wom_fgfp" href="" onclick="setDetailergebnisPartei(-1);replaceIFrame(5);return false;">';
    			            rw += wom_html(WOMT_aTexte["4_kommentar_begruendungen"][S_nSprache]) + '</a>';
                        rw += '</div>';
                        rw += '<section aria-describedby="erforschen">';
                            rw += '<h2 id="erforschen" class="wom_text-big">'
                                + wom_html(WOMT_aTexte["4_ergebnis_erforschen"][S_nSprache]) 
                                + '</h2>';
            				rw += '<div class="wom-filter-accordion-wrapper">';
                               rw += '<div class="wom-filter-accordion">';
                               rw += '<h3>';
                                    rw += '<button id="wom-accordion-btn" class="wom-filter-accordion-btn is-active" aria-controls="wom-accordion-panel" aria-expanded="true">';
                                        rw += '<span>' 
                                            + wom_html(WOMT_aTexte["4_ergebnis_gewichtung_title"][S_nSprache]) 
                                            + '</span> <span class="sr-only">' 
                                            + wom_html(WOMT_aTexte["4_ergebnis_und"][S_nSprache]) 
                                            + '</span> <span>' 
                                            + wom_html(WOMT_aTexte["4_ergebnis_parteienauswahl_title"][S_nSprache]) 
                                            + '</span>';
                                   rw += '</button>';
                               rw += '</h3>';
                               rw += '<div id="wom-accordion-panel" class="wom-filter-accordion-panel" aria-describedby="wom-accordion-btn">';
                                   rw += '<form action="main_app.php" method="get" class="wom-result-filter">';
                                      rw += '<input type="hidden" name="cb_filter" value="1" />';
                                      
                                      rw += '<div class="half-grid">';
                                         rw += '<fieldset>';
                                            rw += '<legend class="sr-only">' 
                                                + wom_html(WOMT_aTexte["4_ergebnis_gewichtung_title"][S_nSprache]) 
                                                + '</legend>';
                                            rw += '<div class="form-radio">';
                                               rw += '<input type="radio" id="fg-eigene" name="fg"';
                                                if (S_nFilter_GewichtedFilter==0) {
                                                    rw += ' disabled="disabled"';
                                                } else {
                                                    rw += ' onchange="ergebnis_filter_gewichtung(1)"';
                                                }
                                                if (S_nFilter_GewichtedAuswahl ==1) {
                                                    rw += ' checked="checked"';
                                                }
                                               rw += ' value="1">';
                                               rw += '<div class="form-control">';
                                                  rw += '<label for="fg-eigene" class="form-check-label">';
                                                     rw += '<span class="radio">&nbsp;</span>';
                                                     rw += '<span class="label-text">' + wom_html(WOMT_aTexte["4_ergebnis_gewichtung_eigene"][S_nSprache]) + '</span>';
                                                  rw += '</label>';
                                               rw += '</div>';
                                            rw += '</div>';
                                            rw += '<div class="form-radio">';
                                               rw += '<input type="radio" class="form-check-input" id="fg-ohne" name="fg" onchange="ergebnis_filter_gewichtung(2)"';
                                               if (S_nFilter_GewichtedAuswahl == 2) {
                                                    rw += ' checked="checked"';
                                               }
                                               rw += ' value="2">';
                                               rw += '<div class="form-control">';
                                                  rw += '<label for="fg-ohne" class="form-check-label">';
                                                     rw += '<span class="radio">&nbsp;</span>';
                                                     rw += '<span class="label-text">' 
                                                        + wom_html(WOMT_aTexte["4_ergebnis_gewichtung_ohne"][S_nSprache]) 
                                                        + '</span>';
                                                  rw += '</label>';
                                               rw += '</div>';
                                            rw += '</div>';
                                            rw += '<a href="" onclick="replaceIFrame(2);return false;" class="wom-arrow-left-link">' 
                                                + wom_html(WOMT_aTexte["4_ergebnis_gewichtung_neugewichten"][S_nSprache]) 
                                                + '</a>';
                                         rw += '</fieldset>';
                                         rw += '<fieldset>';
                                            rw += '<legend class="sr-only">' 
                                                + wom_html(WOMT_aTexte["4_ergebnis_parteienauswahl_title"][S_nSprache]) 
                                                + '</legend>';
                                            rw += '<div class="form-radio">';
                                               rw += '<input type="radio" class="form-check-input" id="fp-eigene" name="fp"';
                                                if (S_nFilter_ParteienFilter == 0) {
                                                    rw += ' disabled="disabled"';
                                                } else {
                                                    rw += ' onchange="ergebnis_filter_parteiauswahl(1)"';
                                                }
                                                if (S_nFilter_ParteienAuswahl == 1) {
                                                    rw += ' checked="checked"';
                                                }
                                                rw += ' value="1">';
                                               rw += '<div class="form-control">';
                                                  rw += '<label for="fp-eigene" class="form-check-label">';
                                                     rw += '<span class="radio">&nbsp;</span>';
                                                     rw += '<span class="label-text">' + wom_html(WOMT_aTexte["4_ergebnis_parteienauswahl_eigene"][S_nSprache]) + '</span>';
                                                  rw += '</label>';
                                               rw += '</div>';
                                            rw += '</div>';
                                            rw += '<div class="form-radio">';
                                               rw += '<input type="radio" class="form-check-input" id="fp-alle" name="fp" onchange="ergebnis_filter_parteiauswahl(2)"';
                                                    if (S_nFilter_ParteienAuswahl == 2) { 
                                                        rw += ' checked="checked"';
                                                    }
                                               rw += ' value="2">';
                                               rw += '<div class="form-control">';
                                                  rw += '<label for="fp-alle" class="form-check-label">';
                                                     rw += '<span class="radio">&nbsp;</span>';
                                                     rw += '<span class="label-text">' 
                                                        + wom_html(WOMT_aTexte["4_ergebnis_parteienauswahl_alle"][S_nSprache]) 
                                                        + '</span>';
                                                  rw += '</label>';
                                               rw += '</div>';
                                            rw += '</div>';
                                            rw += '<div class="form-radio">';
                                               rw += '<input type="radio" class="form-check-input" id="fp-parlament" name="fp" onchange="ergebnis_filter_parteiauswahl(3)"';
                                                    if (S_nFilter_ParteienAuswahl == 3) {  
                                                        rw += ' checked="checked"';
                                                    }
                                               rw += ' value="3">';
                                               rw += '<div class="form-control">';
                                                  rw += '<label for="fp-parlament" class="form-check-label">';
                                                     rw += '<span class="radio">&nbsp;</span>';
                                                     rw += '<span class="label-text">'
                                                        + wom_html(WOMT_aTexte["4_ergebnis_parteienauswahl_parlament"][S_nSprache]);
                                                     rw += '</span>';
                                                  rw += '</label>';
                                               rw += '</div>';
                                            rw += '</div>';
                                            rw += '<a href="" onclick="replaceIFrame(3);return false;" class="wom-arrow-left-link">' 
                                                rw += wom_html(WOMT_aTexte["4_ergebnis_parteienauswahl_neueauswahl"][S_nSprache]);
                                            rw += '</a>';
                                         rw += '</fieldset>';
                                      rw += '</div>';
                                      rw += '<div style="text-align:right;width:100%;display:inline-block;margin-top:10px;">';
                                        rw += '<input class="wom-filter-submit" style="margin-right:10px;" type="submit" value="' 
                                                + wom_titletag(WOMT_aTexte["4_ergebnis_gpform_value"][S_nSprache])
                                            + '" />';
                                      rw += '</div>';
                                   rw += '</form>\n';
                                rw += '</div>\n';
                             rw += '</div>\n';
                          rw += '</div>\n';
                        rw += '</section>\n';

                        rw += '<ul class="wom_ergebnis_list wom_ergebnis_list_gewichtet" role="tablist" style="';
                            if (S_nFilter_GewichtedAuswahl != 1) {
                                rw += 'display:none';
                            }
                        rw += '">';
						
						lNr         = 0;
						tabOpen     = 0;
                        for (f=0;f<WOMT_nParteien;f++) {
							a=S_aSort[f];
							lFixKey = a;
							lPid = WOMT_aParteien_N2ID[lFixKey];
							//if (S_aParteienAusgewaehlt[a]==1) {
							    
							    /**
                                 * Welche Parteianzeige wurde mit dem Filter bestimmt
                                 */
                                parteiDisplay = false;
                                switch(S_nFilter_ParteienAuswahl) {                                
                                default:        // Eigene Auswahl
                                case 1:
                                    if (S_aParteienAusgewaehlt[a] == 1) {
                                        parteiDisplay = true;
                                    }
                                    break;                                    
                                case 2:         // Alle
                                    parteiDisplay = true;
                                    break;                                    
                                case 3:         // Im Parlament
                                    if (WOMT_aParteiFix[a]) {
                                        parteiDisplay = true;
                                    }
                                    break;                                    
                                }
                                if (parteiDisplay) {
                                    // Filter dann das erste nicht oeffnen                                    
                                    //if (!isset($_GET['cb_filter'])) {
                                        //$tabOpen++;
                                    //}
                                } else {
                                    if (tabOpen==1) {
                                        tabOpen++;
                                    } 
                                }
                                
			  	    			prozent_b = Math.round((S_nDistanceMax-S_aParteienAbs[a])/S_nDistanceMax*1000)/10;
			  	    			lText = ' ' +prozent_b;
			  	    			lText = lText.replace(/\./,',') +  ' ' + WOMT_aTexte["4_prozent"][S_nSprache];
			  	    			
			  	    			prozent = lText;
			  	    			
								rw += '<li class="lipartei';								    
							        if (S_aParteienAusgewaehlt[a]==1) {
							            rw += ' lipartei_sel';
							        }
								    if (WOMT_aParteiFix[lFixKey]==1) {
								        rw += ' lipartei_parlament';
								    }
								    rw += '"';
							        if (parteiDisplay==true) {
							            rw += ' style="display:block;"';
							        } else {
							            rw += ' style="display:none;"';
							        }
						        rw += '><div class="';
									if (lNr == 0) {
									    rw += 'wom_ergebnis_balken_active wom_on_modus ';
									}
								    rw += 'wom_ergebnis_balken" id="wom-tab-';
								    rw += (lNr+1) + '" aria-controls="wom-tabpanel-'
								        + (lNr+1) + '" aria-expanded="';
									    if (lNr == 0) {
									        rw += 'true'
									    } else {
									        rw += 'false';
									    }
									    rw += '" role="tab" tabindex="0">';
							        rw += '<span class="wom_ergebnis_prozent ep' 
							            + (lNr+1) + '" style="background-position:558px 0px;"';
							            //fWidth = 558;
    								    //width = fWidth;//Math.round((S_aParteienAbs[a]/S_nDistanceMax) * fWidth)-1;
    								    //rw += fWidth;
							        rw += ' data-ergebnis="' + prozent + '">&nbsp;<\/span>';
							    rw += '<h2 class="wom_ergebnis_partei">';
							        rw += wom_html(WOMT_aParteien[a][S_nSprache][1]);
							    rw += '<span class="wom_ergebnis_partei_span">' + wom_html(prozent) + '<\/span><\/h2>';
							rw += '<\/div>';

                            rw += '<div class="wom_ergbox" id="wom-tabpanel-' + (lNr+1) + '" aria-describedby="wom-tab-';
                                rw += (lNr+1) + '" role="tabpanel"><div class="wom_info_box">';
                                
							    rw += '<img width="90" height="90" style="border:0px;" src="' 
								    +  WOMT_aParteienLogos[a][0] 
								    + '" alt="'
                                        + wom_titletag(WOMT_aTexte["3_parteien_logovon"][S_nSprache]) 
                                        + ' ' 
								        +  wom_titletag(WOMT_aParteien[a][S_nSprache][0]) 
								    + '" />';
							    rw += '<h3 class="parteibox">' 
								        +  wom_html(WOMT_aParteien[a][S_nSprache][0]) 
								    + '<\/h3>';
							    rw += '<p>';
							        rw += wom_html(WOMT_aParteienBeschreibung[a][S_nSprache]);
                                    rw += '<br/>';
                                    if ((CONST_WOMT_CDUCSU == 1) && (lFixKey == CONST_WOMT_CDUCSU_NR)) {
                                        rw += '<a href="' + CONST_WSZW_URL + '?partei=' 
                                            + lPid + '&amp;s=1" target="_blank" title="';
                                            text2 = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                            text2 = text2.replace('[PARTEI]','CDU');
                                            rw += wom_titletag(text2); 
                                         rw += '" class="wom_more_info">' 
                                            + wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) 
                                            + ' CDU<\/a><br/>';
                                         rw += '<a href="' + CONST_WSZW_URL + '?partei=' 
                                                + lPid + '&amp;s=2" target="_blank" title="'; 
                                                text2 = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                                text2 = text2.replace('[PARTEI]','CSU');
                                                rw += wom_titletag(text2); 
                                         rw += '" class="wom_more_info">' 
                                            + wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) 
                                            + ' CSU<\/a>';
                                    } else {
                                         rw += '<a href="' + CONST_WSZW_URL + '?partei=' + lPid + '" target="_blank" title="';
                                            lText = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                            lText = lText.replace(/\[PARTEI\]/, WOMT_aParteien[lFixKey][S_nSprache][1]);
                                            rw +=  wom_titletag(lText); 
                                        rw += '" class="wom_more_info">';
                                        rw += wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) + '<\/a>';
                                    }
                                    rw += '<a class="wom_more_info-comment wom_fgfp" href=""';
                                        alleText    = WOMT_aTexte["4_allebegruendungen_text"][S_nSprache];                                            
                                        alleText    = wom_html(alleText.replace(/\[PARTEI\]/,WOMT_aParteien[lFixKey][S_nSprache][0]));
                                        alleTitle   = WOMT_aTexte["4_allebegruendungen_title"][S_nSprache];
                                        alleTitle   = wom_titletag(alleTitle.replace(/\[PARTEI\]/,WOMT_aParteien[lFixKey][S_nSprache][0]));
                                        
                						rw += ' onclick="setDetailergebnisPartei('+ WOMT_aParteien_N2ID[lFixKey]+ ');replaceIFrame(5);return false;"'
                						    + ' title="' + alleTitle + '">' 
                						    + alleText + '</a>';
                                    
                                    rw += '<\/p>';
                                rw += '<button class="wom_close_two" title="' 
                                    + wom_titletag(WOMT_aTexte["4_text_partei_close"][S_nSprache]) 
                                    + '"><span class="v-hidden">' 
                                    + wom_html(WOMT_aTexte["4_text_partei_close"][S_nSprache]) 
                                    + '<\/span><\/button>';
                                rw += '<\/div><\/div><\/li>\n';
    						    lNr++;	
                            //} else {
                                // a=g_SessionArray['S_aSort'][f];
                                // rw += WOMT_aParteien[a][S_nSprache][0]."/a/".WOMT_aParteiFix[f]."<br>";
                            //}
    					}
					    rw += '<\/ul>\n';
                        rw += '<ul class="wom_ergebnis_list wom_ergebnis_list_nichtgewichtet" role="tablist" style="';
                            if (S_nFilter_GewichtedAuswahl == 1) {
                                rw += 'display:none';
                            }
                        rw += '">';
						
						lNr         = 0;
						tabOpen     = 0;
                        for (f=0;f<WOMT_nParteien;f++) {
							a=S_aSortOG[f];
							lFixKey = a;
							lPid = WOMT_aParteien_N2ID[lFixKey];
							//if (S_aParteienAusgewaehlt[a]==1) {
							    
							    /**
                                 * Welche Parteianzeige wurde mit dem Filter bestimmt
                                 */
                                parteiDisplay = false;
                                switch(S_nFilter_ParteienAuswahl) {                                
                                default:        // Eigene Auswahl
                                case 1:
                                    if (S_aParteienAusgewaehlt[a] == 1) {
                                        parteiDisplay = true;
                                    }
                                    break;                                    
                                case 2:         // Alle
                                    parteiDisplay = true;
                                    break;                                    
                                case 3:         // Im Parlament
                                    if (WOMT_aParteiFix[a]) {
                                        parteiDisplay = true;
                                    }
                                    break;                                    
                                }
                                if (parteiDisplay) {
                                    // Filter dann das erste nicht oeffnen                                    
                                    //if (!isset($_GET['cb_filter'])) {
                                        //$tabOpen++;
                                    //}
                                } else {
                                    if (tabOpen==1) {
                                        tabOpen++;
                                    } 
                                }
                                
			  	    			prozent_b = Math.round((S_nDistanceMaxOG-S_aParteienAbsOG[a])/S_nDistanceMaxOG*1000)/10;
			  	    			lText = ' ' +prozent_b;
			  	    			lText = lText.replace(/\./,',') +  ' ' + WOMT_aTexte["4_prozent"][S_nSprache];
			  	    			
			  	    			prozent = lText;
			  	    			
								rw += '<li class="lipartei';								    
							        if (S_aParteienAusgewaehlt[a]==1) {
							            rw += ' lipartei_sel';
							        }
								    if (WOMT_aParteiFix[lFixKey]==1) {
								        rw += ' lipartei_parlament';
								    }
								    rw += '"';
							        if (parteiDisplay==true) {
							            rw += ' style="display:block;"';
							        } else {
							            rw += ' style="display:none;"';
							        }
						        rw += '><div class="';
									if (lNr == 0) {
									    rw += 'wom_ergebnis_balken_active wom_on_modus ';
									}
								    rw += 'wom_ergebnis_balken" id="wom-tab-';
								    rw += (lNr+1) + '" aria-controls="wom-tabpanel-'
								        + (lNr+1) + '" aria-expanded="';
									    if (lNr == 0) {
									        rw += 'true'
									    } else {
									        rw += 'false';
									    }
									    rw += '" role="tab" tabindex="0">';
							        rw += '<span class="wom_ergebnis_prozent ep' 
							            + (lNr+1) + '" style="background-position:558px 0px;"';
							            //fWidth = 558;
    								    //width = fWidth;//Math.round((S_aParteienAbs[a]/S_nDistanceMax) * fWidth)-1;
    								    //rw += fWidth;
							        rw += ' data-ergebnis="' + prozent + '">&nbsp;<\/span>';
							    rw += '<h2 class="wom_ergebnis_partei">';
							        rw += wom_html(WOMT_aParteien[a][S_nSprache][1]);
							    rw += '<span class="wom_ergebnis_partei_span">' + wom_html(prozent) + '<\/span><\/h2>';
							rw += '<\/div>';

                            rw += '<div class="wom_ergbox" id="wom-tabpanel-' + (lNr+1) + '" aria-describedby="wom-tab-';
                                rw += (lNr+1) + '" role="tabpanel"><div class="wom_info_box">';
                                
							    rw += '<img width="90" height="90" style="border:0px;" src="' 
								    +  WOMT_aParteienLogos[a][0] 
								    + '" alt="'
                                        + wom_titletag(WOMT_aTexte["3_parteien_logovon"][S_nSprache]) 
                                        + ' ' 
								        +  wom_titletag(WOMT_aParteien[a][S_nSprache][0]) 
								    + '" />';
							    rw += '<h3 class="parteibox">' 
								        +  wom_html(WOMT_aParteien[a][S_nSprache][0]) 
								    + '<\/h3>';
							    rw += '<p>';
							        rw += wom_html(WOMT_aParteienBeschreibung[a][S_nSprache]);
                                    rw += '<br/>';
                                    if ((CONST_WOMT_CDUCSU == 1) && (lFixKey == CONST_WOMT_CDUCSU_NR)) {
                                        rw += '<a href="' + CONST_WSZW_URL + '?partei=' 
                                            + lPid + '&amp;s=1" target="_blank" title="';
                                            text2 = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                            text2 = text2.replace('[PARTEI]','CDU');
                                            rw += wom_titletag(text2); 
                                         rw += '" class="wom_more_info">' 
                                            + wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) 
                                            + ' CDU<\/a><br/>';
                                         rw += '<a href="' + CONST_WSZW_URL + '?partei=' 
                                                + lPid + '&amp;s=2" target="_blank" title="'; 
                                                text2 = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                                text2 = text2.replace('[PARTEI]','CSU');
                                                rw += wom_titletag(text2); 
                                         rw += '" class="wom_more_info">' 
                                            + wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) 
                                            + ' CSU<\/a>';
                                    } else {
                                         rw += '<a href="' + CONST_WSZW_URL + '?partei=' + lPid + '" target="_blank" title="';
                                            lText = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                            lText = lText.replace(/\[PARTEI\]/, WOMT_aParteien[lFixKey][S_nSprache][1]);
                                            rw +=  wom_titletag(lText); 
                                        rw += '" class="wom_more_info">';
                                        rw += wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) + '<\/a>';
                                    }
                                    rw += '<a class="wom_more_info-comment wom_fgfp" href=""';
                                        alleText    = WOMT_aTexte["4_allebegruendungen_text"][S_nSprache];                                            
                                        alleText    = wom_html(alleText.replace(/\[PARTEI\]/,WOMT_aParteien[lFixKey][S_nSprache][0]));
                                        alleTitle   = WOMT_aTexte["4_allebegruendungen_title"][S_nSprache];
                                        alleTitle   = wom_titletag(alleTitle.replace(/\[PARTEI\]/,WOMT_aParteien[lFixKey][S_nSprache][0]));
                                        
                						rw += ' onclick="setDetailergebnisPartei('+ WOMT_aParteien_N2ID[lFixKey]+ ');replaceIFrame(5);return false;"'
                						    + ' title="' + alleTitle + '">' 
                						    + alleText + '</a>';
                                    rw += '<\/p>';
                                rw += '<button class="wom_close_two" title="' 
                                    + wom_titletag(WOMT_aTexte["4_text_partei_close"][S_nSprache]) 
                                    + '"><span class="v-hidden">' 
                                    + wom_html(WOMT_aTexte["4_text_partei_close"][S_nSprache]) 
                                    + '<\/span><\/button>';
                                rw += '<\/div><\/div><\/li>\n';
    						    lNr++;	
                            //} else {
                                // a=g_SessionArray['S_aSort'][f];
                                // rw += WOMT_aParteien[a][S_nSprache][0]."/a/".WOMT_aParteiFix[f]."<br>";
                            //}
    					}
					    rw += '<\/ul>\n';					    
                        rw += '<div class="wom_clear"><\/div>';
     				    rw += '<p>' +  wom_html(WOMT_aTexte["4_ergebnis_text"][S_nSprache]) + '<\/p>';
                    }
 


                        rw += '<h2 class="wom_result">' +  wom_html(WOMT_aTexte["4_erg_pdf_titel"][S_nSprache]) + '<\/h2>';
                        rw += '<p class="wom_auswertung">'; 
        				    lUrlPdf = '<a target="_blank" href="' + CONST_PDF_URL + '" class="wom_pfeil_fett">';
                            lText = WOMT_aTexte["4_erg_pdf_text"][S_nSprache];
        				    lText = lText.replace('\[PARTEIENANZAHL\]',WOMT_aParteien.length);				    
        				    lText = lText.replace('\[PDF_TARGET\]',lUrlPdf);
                            rw += wom_html(lText);
                        rw += ' <\/p>\n';
                
                        rw += '<div>';
    				        rw += '<div class="wom_skip">';
                                rw += '<a href="" onclick="replaceIFrame(3);return false;" class="wom_previous" title="' 
                                    +  wom_titletag(WOMT_aTexte["4_btn_zurueck_title"][S_nSprache]) 
                                    + '">' 
                                    +  wom_html(WOMT_aTexte["4_btn_zurueck_text"][S_nSprache]) + '<\/a>';
                                
        					    if(((S_nWeissNicht 	< CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN)
        				         &&(S_nNeutral    	< CONST_WOMT_NOERGEBNIS_NEUTRAL)
        				         &&(S_nSame    	< CONST_WOMT_NOERGEBNIS_SAME))
        				         ||(CONST_WOMT_NOERGEBNIS_BEGRUENDUNGEN == 1) // Begruedungen trotzdem anzeigen
        				    	) {
        					        rw += '<a href="" onclick="setDetailergebnisPartei(-1);replaceIFrame(5);return false;" class="wom_next" title="' 
        					            +  wom_titletag(WOMT_aTexte["4_btn_weiter_title"][S_nSprache]) 
        					            + '">' 
        					            +  wom_html(WOMT_aTexte["4_btn_weiter_text"][S_nSprache]) 
        					            + '<\/a>';
        						} else {
        						     rw += '<a href="main_app.html" class="wom_next" title="' 
        						        +  wom_titletag(WOMT_aTexte["5_btn_neustart_title"][S_nSprache]) 
        						        + '">' +  wom_html(WOMT_aTexte["5_btn_neustart_text"][S_nSprache]) 
        						        + '<\/a>';
        						}
    				        rw += '<\/div>';
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
    rw += '<div id="umfrage_background" onclick="event.stopPropagation();">';
    rw += '&nbsp;';
    rw += '</div>';
    
    if(S_aVotematchData['valid'] == 1) {
        rw += '<div id="votematch_background" onclick="votematch_popup_close();">';
        rw += '&nbsp;';
        rw += '</div>';
        rw += '<div id="votematch_popup" role="dialog" aria-labelledby="votematch_title"  onclick="votematch_popup_close();">';
        rw += '<div class="votematch_popup_rahmen" onclick="event.stopPropagation();">';
        rw += '<div class="votematch_popup_rahmen_inner"  onclick="event.stopPropagation();">';
        rw += '<form method="post" id="VotematchEU-form" action="https://acc-app.votematch.eu​" target="_blank">';
        rw += '<h2 tabindex="0" id="votematch_title">' 
            + wom_html(WOMT_aTexte["popup_votematch_title"][S_nSprache]) + '</h2>';
        rw += '<p>'
                + wom_html(WOMT_aTexte["popup_votematch_text"][S_nSprache]); + '</p>';
        rw += '<div id="votematch_popup_error" aria-live="polite"><p style="display:none;font-weight:bold;">'
            +wom_html(WOMT_aTexte["popup_votematch_datenschutz_fehler"][S_nSprache]) + '</p></div>';
            for (var keyV in S_aVotematchData['vmdata']) {
                rw += '<input type="hidden" name="' 
                    + keyV
                    + '" value="' 
                    + S_aVotematchData['vmdata'][keyV]
                    + '">';
            }
        rw += '<div class="votematch_ds_input">';
        rw += '<span class="votematch_input">';
        rw += '<input id="votematch_datenschutz" aria-required="true" type="checkbox" />';
        rw += '</span>';
        rw += '<label for="votematch_datenschutz">'
            + wom_html(WOMT_aTexte["popup_votematch_datenschutz"][S_nSprache]) + '</label>';
        rw += '</div>';
        rw += '<input class="votematch_popup_submit" type="submit" onclick="votematch_submit();return false;" value="'
            + wom_titletag(WOMT_aTexte["popup_votematch_link"][S_nSprache]) + '" title="' + wom_titletag(WOMT_aTexte["popup_votematch_link_title"][S_nSprache]) 
            + '" onclick="votematch_popup_close();">';
        rw += '<div style="clear:both"></div>';
        rw += '</form>';
        rw += '<button id="closeVotematch" class="votematch_close" onclick="votematch_popup_close();return false;" tabindex="0">'
            + wom_html(WOMT_aTexte["popup_votematch_close"][S_nSprache]) + '</button>';
        rw += '<div>';
        rw += '<div>';
        rw += '</div>';
    }
    
    $(window).on('resize', function(){
        auswertung_slideErgebnis();
    });
	
	return rw;
}

function auswertung_slideErgebnis() {
    
    $('.wom_ergebnis_prozent').addClass('transition');  
    $('.wom_ergebnis_list li').each(function(){
        if ($(this).is(":visible")){
            $(this).find('.wom_ergebnis_prozent').width($(this).find('> div.wom_ergebnis_balken').width());
            var percent = ($(this).find('> div.wom_ergebnis_balken').width() /100) *parseInt($(this).find('.wom_ergebnis_prozent').attr('data-ergebnis'));
            $(this).find('.wom_ergebnis_prozent').css('background-position',$(this).find('> div.wom_ergebnis_balken').width()-percent);
        }

    });
}
