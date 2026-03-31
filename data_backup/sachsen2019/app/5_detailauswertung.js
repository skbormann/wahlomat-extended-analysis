				
function write_5_detailauswertung() {
    
    // Kann auch von der Gewichtung hier reingesprungen werden!
    // dann muss neu kalkuliert werden
    if (S_nRecalculate==1){
	    calculate();
	    S_nRecalculate=0;
	}
	
    popup_these = -1;
    popup_du = -1;
    
    popup_du 		= 0;
    popup_partei 	= S_nDetailAuswertung;
    popup_these 	= 0;
    popup_sprache 	= S_nSprache;

    S_nPartei		= S_nDetailAuswertung;
    S_nKommentarThese = 0;
    
    tabOpen         = 0;
    tabOpenPartei   = -1;
    if (S_nDetailergebnisPartei>0) {
        tabOpen         = 1;
        tabOpenPartei   = S_nDetailergebnisPartei;
    }
    
    
    rw =  '';
    rw += '<div class="wom_main_wrapper' + msl_get_view_class() + ' nobg" id="wom">';
        rw += '<ul class="wom_anchormenu" aria-label="Sprungnavigation">';
           rw += '<li><a href="#bnmotivations">' + wom_html(WOMT_aTexte["5_bnt_start_text"][S_nSprache]) + '</a></li>';
           rw += '<li><a href="#bnfilter">' + wom_html(WOMT_aTexte["5_bnt_filter_text"][S_nSprache]) + '</a></li>';
    if(tabOpen == 0) {
           rw += '<li><a href="#bnthesen">' + wom_html(WOMT_aTexte["5_bnt_thesen_thesen_text"][S_nSprache]) + '</a></li>';
           rw += '<li><a href="#bnself">' + wom_html(WOMT_aTexte["5_bnt_thesen_eigeneantworten_text"][S_nSprache]) + '</a></li>';
           rw += '<li><a href="#bnparteien">' + wom_html(WOMT_aTexte["5_bnt_thesen_parteien_text"][S_nSprache]) + '</a></li>';
    } else  {
           rw += '<li><a href="#bnthesen">' + wom_html(WOMT_aTexte["5_bnt_parteien_start_text"][S_nSprache]) + '</a></li>';
    }
           rw += '<li><a href="#bnbreadcrumb">' + wom_html(WOMT_aTexte["a_bn_breadcrumb_text"][S_nSprache]) + '</a></li>';
           rw += '<li><a href="#bnskip">Schritt zur&uuml;ck oder neu starten</a></li>';
           rw += '<li><a href="#bnleftnavi">' + wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache]) + '</a></li>';
         rw += '</ul>';
                 
        rw += print_main_head(); 

        rw += '<div class="wom_wrapper">';
            rw += '<div class="wom_content" id="content">';
                rw += print_top_nav(5);
                rw += '<main class="wom_main_content">';
                    rw += '<div class="wom_phone-header">';
                        rw += '<a title="'
                                + wom_titletag(WOMT_aTexte["5_btn_zurueck_title"][S_nSprache])
                            + '" href="" onclick="replaceIFrame(4);return false;" class="wom_link-back">'
                                + wom_html(WOMT_aTexte["5_btn_zurueck_text"][S_nSprache])
                            + '<\/a>';
                        rw += '<img class="svgnoie8" alt="'
                                + wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache])
                                + '" src="media/pix/bildmarke_wom_schwarz.svg" />';
                        rw += '<a title="'
                                + wom_titletag(WOMT_aTexte["nav_startseite"][S_nSprache])
                                + '" href="main_app.html" class="wom_link-home">' 
                                + wom_html(WOMT_aTexte["nav_startseite"][S_nSprache]) + '<\/a>';
                    rw += '<\/div>';
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
                                rw += '<li class="wom_clickable" aria-label="' 
    							    + wom_titletag(WOMT_aTexte["bc_hier"][S_nSprache]) 
    							    + ' ' 
    							    + WOMT_aTexte["bc_4_ergebnis"][S_nSprache]+ '"';
    							    rw += '><a href="" onclick="replaceIFrame(4);return false;">' + wom_html(WOMT_aTexte["bc_4_ergebnis"][S_nSprache])+ '</a></li>';
                                rw += '<li class="wom_active">';
    							    rw += '<span>' 
    							        + wom_html(WOMT_aTexte["bc_5_begruendungen"][S_nSprache])
    							        + '<\/span>';
                                rw += '</li>';
    				        rw += '</ul>';
                            rw += '<div class="wom_clear">&nbsp;<\/div>';
                        rw += '<\/nav>';
				    rw += '<div class="wom_header-margin wom_header-margin-detailauswertung"><\/div>';
				    rw += '<header id="bnmotivations">';
    				    rw += '<h1>'; 
    				        rw += wom_html(WOMT_aTexte["5_title_text"][S_nSprache]);
    				    rw += '<\/h1>';
    				
    				    //rw += '<p>'; 
    				        //rw += wom_html(WOMT_aTexte["5_text_text"][S_nSprache]);
    				    //rw += '<\/p>';
				    rw += '<\/header>';
                    rw += '<!-- Blindennavigation: Anfang -->';
                	rw += '<div class="wom_unsichtbar">';
                		rw += wom_html(WOMT_aTexte["5_bn_hinweis"][S_nSprache]);
            	    rw += '<\/div>';
            	    rw += '<!-- Blindennavigation: Ende -->';
            	    
                    rw += '<div class="wom_thesen_vergleich" id="bnfilter">';
    				    rw += '<div class="wom-tabs">';
                            rw += '<div class="wom-tabs-tablist wtt-script" role="tablist" aria-label="Filterung">';
                                rw += '<button class="wom-tabs-btn';
                                    if (tabOpen==0) {
                                        rw += ' is-active';
                                    }
                                    rw += '" role="tab" aria-selected="';
                                    if (tabOpen==0) {
                                        rw += 'true';
                                    } else {
                                        rw += 'false';
                                    }
                                    rw += '" aria-controls="tabpanel-these" id="wom-tab-these">'
                                            + wom_html(WOMT_aTexte["5_tab_nachthesen"][S_nSprache]) 
                                        + '</button>';
                                rw += '<button class="wom-tabs-btn';
                                    if (tabOpen==1) {
                                        rw += ' is-active';
                                    }
                                    rw += '" role="tab" aria-selected="';
                                    if (tabOpen==1) {
                                        rw += 'true';
                                    } else {
                                        rw += 'false';
                                    }
                                    rw += '" aria-controls="tabpanel-partei" id="wom-tab-partei">' 
                                        + wom_html(WOMT_aTexte["5_tab_nachparteien"][S_nSprache]) 
                                        + '</button>';
                            rw += '</div>';
                        
                        
                    
                    rw += '<div class="wom-tabs-panel';
                        if (tabOpen==0) {
                            rw += ' is-active';
                        }
                        rw += '" role="tabpanel" id="tabpanel-these" aria-labelledby="wom-tab-these">';
                           rw += '<h2 class="wom-tabs-header">' 
                                + wom_html(WOMT_aTexte["5_tab_nachthesen"][S_nSprache]) 
                                + '</h2>';
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
                            
    						    rw += '<ul class="wom_thesen_box" style="left:0px" aria-live="polite">\n';
    							    
    						        
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
    									rw += '<div class="wom_thesen_wrapper">';
    									    rw += '<h2 id="wom-label-self-' 
        									    + (a+1) 
        									    + '"><span class="wom_counter"><strong>' 
        									    + (a+1) + '<\/strong>/' 
        									    + WOMT_nThesen + '&nbsp;<\/span> ';
    									    rw += wom_html(WOMT_aThesen[a][S_nSprache][0]);
                                            
                                            rw += ' <a class="wom_info_link" target="_blank" title="';
                                                lText2 = WOMT_aTexte["5_thesen_info_title"][S_nSprache];
                                                lText2 = lText2.replace('[THESE]',WOMT_aThesen[a][S_nSprache][0]);
                                                rw += wom_titletag(lText2 + ' ' + WOMT_aTexte["wahlomat_footer_linkoeffnung"][S_nSprache]);
                                                rw += '" href="https://www.wahl-o-mat.de/' 
                                                        + CONST_WOMT_PATH_WL 
                                                        + '/weiterleitung.php?w=mehr&amp;these_nr=' 
                                                        + (a+1) 
                                                        + '&amp;these_id=' 
                                                        + WOMT_aThesen_N2ID[a];
                                                rw += '"><img src="media/pix/icon/info.png" alt="Info" /><span class="v-hidden">';
                                                rw += wom_html(WOMT_aTexte["5_thesen_info_text"][S_nSprache])
                                                    + '<\/span><\/a><\/h2>';
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
    								        if (S_aThemen[a] == 1) {
    								            rw += wom_titletag(WOMT_aTexte["5_these_doppelt_gewichtet"][S_nSprache]) + ' ';
    								        }
    								        lText = WOMT_aTexte["5_these_nr"][S_nSprache];
								            rw += wom_titletag(lText.replace('\[NR\]',(a+1)) 
								                +  ' "' 
								                + WOMT_aThesen[a][S_nSprache][0] 
								                + '"');
								    rw += '" aria-describedby="thesenavi' + a + '" class="' 
								        + classDot + ' thesenavi_a" href="">';
								        rw += '<span class="wom_arrow_kommentar">&nbsp;<\/span><\/a><span class="thesenavi_tooltip';
								        if (a>18) {
								            rw += ' rightpos';
								        }
								        rw += '" id="thesenavi' + a + '" role="tooltip" aria-hidden="true">';
						                    if (S_aThemen[a] == 1) {
    								            rw += wom_titletag(WOMT_aTexte["5_these_doppelt_gewichtet"][S_nSprache]) + ' ';
    								        }
    								        lText = WOMT_aTexte["5_these_nr"][S_nSprache];
    								        lText = lText.replace('[NR]',(a+1)) +  ' "' + WOMT_aThesen[a][S_nSprache][0] + '"';
    								        rw += wom_titletag(lText);
						                    rw += '<\/span><\/li>';
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
		                                        lText              = ichAntwortText;

    								            imgAntwort = '<img src="media/pix/icon/votum_enthalten.png" alt="' + wom_titletag(
    								                    lText.replace('\[THESE\]', WOMT_aThesen[a][S_nSprache][1])
    								                ) + '" />';
    								            break;
    								        case -1:
    								            ichAntwortClass = 'wom_negative';
    								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_stimmenichtzu"][S_nSprache];
		                                        lText              = ichAntwortText;
    								            imgAntwort = '<img src="media/pix/icon/votum_con.png" alt="' + wom_titletag(
    								                    lText.replace('\[THESE\]', WOMT_aThesen[a][S_nSprache][1])
    								                ) + '" />';
    								            break;
    								        case 0:
    								            ichAntwortClass = 'wom_neutral';
    								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_neutral"][S_nSprache];
		                                        lText              = ichAntwortText;
    								            imgAntwort = '<img src="media/pix/icon/votum_neutral.png" alt="' + wom_titletag(
    								                    lText.replace('\[THESE\]', WOMT_aThesen[a][S_nSprache][1])
    								                ) + '" />';
    								            break;
    								        case 1:
    								            ichAntwortClass    = 'wom_approved';
    								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_stimmezu"][S_nSprache];		
		                                        lText              = ichAntwortText;
		                                        
    								            imgAntwort = '<img src="media/pix/icon/votum_pro.png" alt="' + wom_titletag(
    								                    lText.replace('\[THESE\]', WOMT_aThesen[a][S_nSprache][1])
    								                ) + '" />';
    								            break;
    								    }					
    								    
    								    lText = ichAntwortText;
                                        ichAntwortText = lText.replace('\[THESE\]', WOMT_aThesen[a][S_nSprache][1]);
    							    	    
    						            rw += '<li';
    						            if (aktivThese == a) {
    						                rw += ' class="wom_on"'; 
    						            }
    					                rw += '>';
    					                rw += '<h3 class="wom_my_balken">'
    					                    + wom_html(WOMT_aTexte["5_position"][S_nSprache]) 
    					                    + '<\/h3><p class="wom_antworten_partei ' + ichAntwortClass + '" title="';
    					                rw += wom_titletag(ichAntwortText);
    				    			        rw += '">';
    				    			        rw += imgAntwort;
			    			            rw += '<\/p><\/li>\n';
    						        }
    						    rw += '<\/ul>\n';
						    rw += '<\/div>';
						    rw += '<div class="wom_clear" id="bnparteien"><\/div>';
           						rw += '<div class="wom_clear" id="bnparteien"></div>';
                                  rw += '<div class="wom-thesis-wrapper">';
                                     rw += '<ul class="wom-thesis-list">';
                                        for (a = 0; a < WOMT_nThesen; a++) {
                                            firstOpen = true;
                                            rw += '<li class="wom-thesis-item ';
                                            if (aktivThese == a) {
                                                rw += ' wom_on';
                                            }
                                            rw += '">';
                                            switch(S_aThesen[a]) {
                                            case -1:
                                                sectionArray = new Array(
                                                    -1,0,1
                                                );
                                                break;
                                            case 0:
                                                sectionArray = new Array(
                                                    0,1,-1
                                                );
                                                break;
                                            default:
                                            case -2:
                                            case 1:
                                                sectionArray = new Array(
                                                    1,0,-1
                                                );
                                                break;
                                            }
                                            for (i = 0; i < sectionArray.length; i++) {
                                                section = sectionArray[i];
                                                switch(section) {
                                                case 1: // Ja
                                                    sectionText =  WOMT_aTexte["5_parteien_stimmtenzu"][S_nSprache];
                                                    break;                                            
                                                case 0: // Neutral
                                                    sectionText =  WOMT_aTexte["5_parteien_stimmtenneutral"][S_nSprache];
                                                    break;                                            
                                                case -1: // Nein
                                                    sectionText =  WOMT_aTexte["5_parteien_stimmtennichtzu"][S_nSprache];
                                                    break;                                            
                                                }
                                                inSectionCount = 0;
                                                rw += '<div class="wom_antworten_section" role="tablist">';
                                                firstPartei = -1;                            	    
                                                for (f=0;f<WOMT_nParteien;f++){
                                                    if  ((S_nWeissNicht	>= CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN)
                                            	       ||(S_nNeutral   	>= CONST_WOMT_NOERGEBNIS_NEUTRAL)
                                            	       ||(S_nSame    	>= CONST_WOMT_NOERGEBNIS_SAME)) {
                                            	        lNr = f;  // Nicht berechnet Reihenfolge der Parteien!
                                            	        openAll = true;
                                            	    } else {    	     
                                            	        if (S_nFilter_GewichtedAuswahl != 2) {
                                                	        // Uebereinstimmungsreihenfolge
                                                	        lNr = S_aSort[f];
                                                	    } else {
                                                	        lNr = S_aSortOG[f];
                                                	    }
                                            	        openAll = false;
                                            	    }
                                            	    showPartei = false;
                                            	    switch(S_nFilter_ParteienAuswahl) {         
                                            	    default:
                                            	    case 1:
                                            	        // Ausgewaehlte Parteien
                                            	        if (S_aParteienAusgewaehlt[lNr]==1){		
                                            	            showPartei = true;
                                            	        }
                                            	        break;
                                            	    case 2:                     
                                            	        // Alle
                                            	        showPartei = true;
                                            	        break;
                                            	    case 3:
                                            	        // Im Parlament
                                            	        if (WOMT_aParteiFix[lNr]) {
                                                            showPartei = true;
                                                        }
                                            	        break;
                                            	    }
                                            	    if (showPartei) {
                                            	        if (firstPartei==-1) {
                                            	            firstPartei = f;
                                            	        }
                				    			        abstimmung = parseInt(WOMT_aThesenParteien[a][lNr]);
                				    			        if (section == abstimmung) {
                                                	        if(inSectionCount == 0) {
                                                	            // Header nur anzeigen, wenn es einen Partei dazu gibt
                                                                rw += '<div class="wom_antworten_section_header">';
                                                                rw += '<h3>' 
                                                                    + wom_html(sectionText) 
                                                                    + '</h3>';
                                                                rw += '</div>';
                                                	        }
                                                	        inSectionCount++;

                                                            parteiAntwortClass = '';
                    								        parteiAntwortText = '';
                    									    switch(abstimmung){
                                                                case -2:
                                                                    parteiAntwortClass  = 'wom_white';
                                                                    parteiAntwortText   = '';
                                                                    parteiAntwortText2  = parteiAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1]);
                                                                    parteiAntwortText2  = parteiAntwortText2.replace(/\[PARTEI\]/, WOMT_aParteien[lNr][S_nSprache][1]);
                    								                parteiImgAntwort    = '<img src="media/pix/icon/votum_uebersprungen.png" alt="' + wom_titletag(parteiAntwortText2) + '" />';
                        								            break;
                                                                case -1:
                                                                    parteiAntwortClass  = 'wom_negative';
                                                                    parteiAntwortText   = WOMT_aTexte["5_antwort_partei_text_stimmtnichtzu"][S_nSprache];
                                                                    parteiAntwortText2  = parteiAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1]);
                                                                    parteiAntwortText2  = parteiAntwortText2.replace(/\[PARTEI\]/, WOMT_aParteien[lNr][S_nSprache][1]);
                        								            parteiImgAntwort    = '<img src="media/pix/icon/votum_con.png" alt="' + wom_titletag(parteiAntwortText2) + '" />';
                                                                    break;
                                                                case 0:
                                                                    parteiAntwortClass  = 'wom_neutral';
                                                                    parteiAntwortText   = WOMT_aTexte["5_antwort_partei_text_neutral"][S_nSprache]; 
                                                                    parteiAntwortText2  = parteiAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1]);
                                                                    parteiAntwortText2  = parteiAntwortText2.replace(/\[PARTEI\]/, WOMT_aParteien[lNr][S_nSprache][1]);
                        								            parteiImgAntwort    = '<img src="media/pix/icon/votum_neutral.png" alt="' + wom_titletag(parteiAntwortText2) + '" />';
                                                                    break;
                                                                case 1:
                                                                    parteiAntwortClass  = 'wom_approved';
                                                                    parteiAntwortText   = WOMT_aTexte["5_antwort_partei_text_stimmtzu"][S_nSprache];
                                                                    parteiAntwortText2  = parteiAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1]);
                                                                    parteiAntwortText2  = parteiAntwortText2.replace(/\[PARTEI\]/, WOMT_aParteien[lNr][S_nSprache][1]);
                        								            parteiImgAntwort    = '<img src="media/pix/icon/votum_pro.png" alt="' + wom_titletag(parteiAntwortText2) + '" />';
                                                                    break;
                                                            }
                                                            parteiAntwortText = parteiAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1]);
                                                            parteiAntwortText = parteiAntwortText.replace(/\[PARTEI\]/, WOMT_aParteien[lNr][S_nSprache][1]);
                                                            kommentar = '';
                                                            // Immer auf Deutsch
                                                            
                    				    			        if (WOMT_aThesenParteienText[a][lNr][0]!=""){
                                                    	    	kommentar = '&bdquo;' + wom_html(WOMT_aThesenParteienText[a][lNr][0]) + '&rdquo;';
                                                    		} else {
                                                    			kommentar = wom_html(WOMT_aTexte["5_partei_keinebegruendung"][S_nSprache]);
                                                    		}        				
                                                    		parteiOpen = false;    			       
                                                    		if (openAll) {
                                                    		    parteiOpen = true;
                                                    		} else if (firstOpen) {
                                                    		    parteiOpen = true;
                                                    		    firstOpen = false;
                                                    		}
                                                            rw += '<div class="wom_antworten_box';
                                                                if (parteiOpen) {
                                                                    rw += ' wom_on';
                                                                } else {
                                                                    rw += ' wom_off';
                                                                }
                                                                rw += '">';
                                                                rw += '<h3 class="wom_partei_balken" role="tab" aria-expanded="';
                                                                if (parteiOpen) {
                                                                    rw += 'true';
                                                                } else {
                                                                    rw += 'false';
                                                                }
                                                                rw += '" aria-controls="wom-tabpanel-partei';
                                                                rw +=  lNr + '-' + (a+1) 
                                                                        + '" tabindex="0">' 
                                                                        + wom_html(WOMT_aParteien[lNr][S_nSprache][1])
                                                                        + '</h3><p class="wom_antworten_partei ' 
                                                                        + parteiAntwortClass 
                                                                        + '" title="'
                        				    			                + wom_titletag(parteiAntwortText);
                        				    			            rw += '">' + parteiImgAntwort + '</p>';
                        				    			            rw += '<div role="tabpanel" id="wom-tabpanel-partei'
                        				    			                    + (lNr) + '-' + (a+1) + '"><h4><span>'
                        				    			                    + wom_html(WOMT_aTexte["5_begruendung"][S_nSprache]) 
                        				    			                + '</span></h4><blockquote><p>'
                        				    			                    + kommentar + '</p></blockquote>';
                        				    			            rw += '</div>';
                                                            rw += '</div>';
            				    			            } // richtige Section
            								        }  // showpartei
            								                    
            								    }  // Parteien
                                                rw += '</div>';
                                            } // Section
                                            rw += '</li>';
                                        }
                                     rw += '</ul>';
                                  rw += '</div>';
            				    rw += '</div>';
            				rw += '</div>';
    					    rw += '<div class="wom-tabs-panel';
        					    if (tabOpen==1) {
        					        rw += ' is-active';
        					    }
        					    rw += '" role="tabpanel" id="tabpanel-partei" aria-labelledby="wom-tab-partei">';
                                rw += '<h2 class="wom-tabs-header">';                            
                                    rw += wom_html(WOMT_aTexte["5_tab_nachparteien"][S_nSprache]) 
                                        + '</h2>';
        					    rw += '<!-- Blindennavigation: Anfang -->';
                            	rw += '<div class="wom_unsichtbar">';
                            		rw += wom_html(WOMT_aTexte["5_bn_hinweis_parteien"][S_nSprache]);
                            	rw += '</div>';
                                rw += '<!-- Blindennavigation: Ende -->';
                                rw += '<ul class="wom-accordion-answer-list">';
                                    lCount = 0;        							
                                	for (f=0;f<WOMT_nParteien;f++){
                                        if  ((S_nWeissNicht	>= CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN)
                                	       ||(S_nNeutral   	>= CONST_WOMT_NOERGEBNIS_NEUTRAL)
                                	       ||(S_nSame    	>= CONST_WOMT_NOERGEBNIS_SAME)) {
                                	        lNr = f;  // Nicht berechnet Reihenfolge der Parteien!
                                	        openAll = true;
                                	    } else {    	     
                                	        
                                	        if (S_nFilter_GewichtedAuswahl != 2) {
                                    	        // Uebereinstimmungsreihenfolge
                                    	        lNr = S_aSort[f];
                                    	    } else {
                                    	        lNr = S_aSortOG[f];
                                    	    }
                                	        openAll = false;
                                	    }
                                	    
                                	    showPartei = false;
                                	    switch(S_nFilter_ParteienAuswahl) {         
                                	    default:
                                	    case 1:
                                	        // Ausgewaehlte Parteien
                                	        if (S_aParteienAusgewaehlt[lNr]==1){		
                                	            showPartei = true;
                                	        }
                                	        break;
                                	    case 2:                     
                                	        // Alle
                                	        showPartei = true;
                                	        break;
                                	    case 3:
                                	        // Im Parlament
                                	        if (WOMT_aParteiFix[lNr]) {
                                                showPartei = true;
                                            }
                                	        break;
                                	    }                                	    
                                		if (showPartei == true) {
                                            rw += '<li class="wom-answer-item" id="top-' 
                                                    + WOMT_aParteien_N2ID[lNr] 
                                                    + '">';
                                            rw += '<button role="tab" id="wom-answer-btn-' 
                                                + (f+1)
                                                + '" class="wom-answer-btn';
                                            if (tabOpenPartei == WOMT_aParteien_N2ID[lNr]) {
                                                rw += ' is-active';
                                            }
                                            rw += '" aria-controls="wom-answer-panel-' 
                                                    + (f+1) 
                                                    + '" aria-expanded="';
                                            if (tabOpenPartei == WOMT_aParteien_N2ID[lNr]) {
                                                rw += 'true';
                                            } else {
                                                rw += 'false';
                                            }
                                            rw += '" aria-selected="';
                                            if (tabOpenPartei == WOMT_aParteien_N2ID[lNr]) {
                                                rw += 'true';
                                            } else {
                                                rw += 'false';
                                            }
                                            rw += '">' + wom_html(WOMT_aParteien[lNr][S_nSprache][1])+ '</button>';
                                            rw += '<ul id="wom-answer-panel-' 
                                                    + (f+1)+ '" class="wom-answer-panel" aria-describedby="wom-answer-btn-' 
                                                    + (f+1)+ '" ';
                                            if (tabOpenPartei == WOMT_aParteien_N2ID[lNr]) {
                                                rw += 'style="display:block;"';
                                            }
                                            rw += '>';
                                     
                                            for (a = 0; a < WOMT_nThesen; a++) {
                                            
                                                /**
                                                 * Eigene Antwort
                                                 */
                                                ichAntwortClass    = '';
            						            ichAntwortText     = '';
            								    switch(S_aThesen[a]){
            								       case -2:
            								            ichAntwortClass    = 'wom_avoid';
            								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_uebersprungen"][S_nSprache];
            								            ichImgAntwort      = '<img src="media/pix/icon/votum_enthalten.png" alt="' +  wom_titletag(ichAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1])) + '" />';
            								            break;
            								        case -1:
            								            ichAntwortClass = 'wom_negative';
            								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_stimmenichtzu"][S_nSprache];
            								            ichImgAntwort = '<img src="media/pix/icon/votum_con.png" alt="' + wom_titletag(ichAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1])) + '" />';
            								            break;
            								        case 0:
            								            ichAntwortClass = 'wom_neutral';
            								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_neutral"][S_nSprache];
            								            ichImgAntwort = '<img src="media/pix/icon/votum_neutral.png" alt="' + wom_titletag(ichAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1])) + '" />';
            								            break;
            								        case 1:
            								            ichAntwortClass    = 'wom_approved';
            								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_stimmezu"][S_nSprache];
            								            ichImgAntwort      = '<img src="media/pix/icon/votum_pro.png" alt="' + wom_titletag(ichAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1])) + '" />';
            								            break;
            								    }						
                                                ichAntwortText = ichAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1] , ichAntwortText);
                                                                 
                                                /**
                                                 * Partei-Antwort
                                                 */                       
        				    			        abstimmung = parseInt(WOMT_aThesenParteien[a][lNr]);
        				    			        parteiAntwortClass = '';
        								        parteiAntwortText = '';
        									    switch(abstimmung){
                                                    case -2:
                                                        parteiAntwortClass  = 'wom_white';
                                                        parteiAntwortText   = '';
                                                        parteiAntwortText2  = parteiAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1]);
                                                        parteiAntwortText2  = parteiAntwortText2.replace(/\[PARTEI\]/, WOMT_aParteien[lNr][S_nSprache][1]);
        								                parteiImgAntwort    = '<img src="media/pix/icon/votum_uebersprungen.png" alt="' + wom_titletag(parteiAntwortText2) + '" />';
            								            break;
                                                    case -1:
                                                        parteiAntwortClass  = 'wom_negative';
                                                        parteiAntwortText   = WOMT_aTexte["5_antwort_partei_text_stimmtnichtzu"][S_nSprache];
                                                        parteiAntwortText2  = parteiAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1]);
                                                        parteiAntwortText2  = parteiAntwortText2.replace(/\[PARTEI\]/, WOMT_aParteien[lNr][S_nSprache][1]);
            								            parteiImgAntwort    = '<img src="media/pix/icon/votum_con.png" alt="' + wom_titletag(parteiAntwortText2) + '" />';
                                                        break;
                                                    case 0:
                                                        parteiAntwortClass  = 'wom_neutral';
                                                        parteiAntwortText   = WOMT_aTexte["5_antwort_partei_text_neutral"][S_nSprache]; 
                                                        parteiAntwortText2  = parteiAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1]);
                                                        parteiAntwortText2  = parteiAntwortText2.replace(/\[PARTEI\]/, WOMT_aParteien[lNr][S_nSprache][1]);
            								            parteiImgAntwort    = '<img src="media/pix/icon/votum_neutral.png" alt="' + wom_titletag(parteiAntwortText2) + '" />';
                                                        break;
                                                    case 1:
                                                        parteiAntwortClass  = 'wom_approved';
                                                        parteiAntwortText   = WOMT_aTexte["5_antwort_partei_text_stimmtzu"][S_nSprache];
                                                        parteiAntwortText2  = parteiAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1]);
                                                        parteiAntwortText2  = parteiAntwortText2.replace(/\[PARTEI\]/, WOMT_aParteien[lNr][S_nSprache][1]);
            								            parteiImgAntwort    = '<img src="media/pix/icon/votum_pro.png" alt="' + wom_titletag(parteiAntwortText2) + '" />';
                                                        break;
                                                }
                                                parteiAntwortText = parteiAntwortText.replace(/\[THESE\]/, WOMT_aThesen[a][S_nSprache][1]);
                                                parteiAntwortText = parteiAntwortText.replace(/\[PARTEI\]/, WOMT_aParteien[lNr][S_nSprache][1]);
                                                
                                                kommentar = '';
                                                // Immer auf Deutsch
                                                
        				    			        if (WOMT_aThesenParteienText[a][lNr][0]!=""){
                                        	    	kommentar = '&bdquo;' 
                                        	    	    + wom_html(WOMT_aThesenParteienText[a][lNr][0]) 
                                        	    	    + '&rdquo;';
                                        		} else {
                                        			kommentar = wom_html(WOMT_aTexte["5_partei_keinebegruendung"][S_nSprache]);
                                        		}
        				    			        rw += '<li>';
                                                    rw += '<div class="wom_thesen_box">';
                                                      rw += '<div class="wom_thesen_wrapper">';
                                                         rw += '<h2 id="wom-label-answer-' + (lNr+1)+ '-' + (a+1)+ '"><span class="wom_counter"><strong>' 
                                                                + (a+1)+ '</strong>/' 
                                                                + WOMT_nThesen+ '</span> ';
                                                            rw += wom_html(WOMT_aThesen[a][S_nSprache][0]);
                                                          rw += '<a class="wom_info_link" target="_blank" title="';
                                                            lText = WOMT_aTexte["5_thesen_info_title"][S_nSprache];
                                                            rw += wom_titletag(
                                                                        lText.replace(
                                                                            '[THESE]',
                                                                            WOMT_aThesen[a][S_nSprache][0]
                                                                        ) 
                                                                        + ' '
                                                                        + WOMT_aTexte["wahlomat_footer_linkoeffnung"][S_nSprache]
                                                                    );
                                                                    lText2 = 'https://www.wahl-o-mat.de/' 
                                                                        + CONST_WOMT_PATH_WL 
                                                                        + '/weiterleitung.php?w=mehr&amp;these_nr=' 
                                                                        + (a+1) 
                                                                        + '&amp;these_id=' 
                                                                        + WOMT_aThesen_N2ID[a];
                                                                    rw += '" href="'
                                                                            + lText2.replace('&amp;','&')
                                                                        + '"><img class="info-icon" src="media/pix/icon/info.png" alt="Info"><span class="v-hidden">Info</span></a>';
                                                             rw += '</h2>';
                                                             rw += '<p>';
                                                                rw += wom_html(WOMT_aThesen[a][S_nSprache][1]);
                                                              rw += '</p>';                                                       
                                                          rw += '</div>';
                                                       rw += '</div>';                                                         
            				    			           rw += '<div class="wom_votum_list wom_my_votum">';
                                                           rw += '<div class="wom_on">';                                         
                                                             rw += '<h3 class="wom_my_balken">' 
                                                                    + wom_html(WOMT_aTexte["5_position"][S_nSprache])
                                                                + '</h3>';
                                                             rw += '<p class="wom_antworten_partei ' 
                                                                        + ichAntwortClass+ '" title="' 
                                                                        + wom_titletag(ichAntwortText)
                                                                    + '">' 
                                                                    + ichImgAntwort;+ '</p>';
                                                             rw += '</div>';
                                                     rw += '</div>';                                                  
                                                    rw += '<div class="wom_antworten_box wom_votum_list">';
                                                      rw += '<h4><span>' 
                                                            + wom_html(WOMT_aTexte["5_begruendung"][S_nSprache])
                                                            + '</span></h4>';
                                                      rw += '<p class="' 
                                                            + parteiAntwortClass
                                                            + '" title="' 
                                                            + wom_titletag(parteiAntwortText)+ '">';                                                    
                                                            rw += parteiImgAntwort;
                                                      rw += '</p>';                                      
                                                      rw += '<blockquote>';
                                                         rw += '<p>' + kommentar+ '</p>';
                                                      rw += '</blockquote>';
                                                   rw += '</div>';
                                                rw += '</li>';
                                            }
        				    			    rw += '</ul>';
                                            rw += '</li>';
    				    			    }
                                    }   
                                rw += '</ul>';
                            rw += '</div>';
                            //Ende Tab-Panel                            
    					    rw += '<\/div>';
    					    rw += '<\/div>';
        				    rw += '<div class="wom_skip wom_ie8_neustart">';
            					rw += '<a href="" onclick="replaceIFrame(4);return false;" class="wom_previous" title="' + wom_titletag(WOMT_aTexte["5_btn_zurueck_title"][S_nSprache]) 
            					    + '">' + wom_html(WOMT_aTexte["5_btn_zurueck_text"][S_nSprache]) + '<\/a>';
            					rw += '<a href="main_app.html" class="wom_neustart" title="' + wom_titletag(WOMT_aTexte["5_btn_neustart_title"][S_nSprache]) + '">' + wom_html(WOMT_aTexte["5_btn_neustart_text"][S_nSprache]) + '<\/a>';
        				    rw += '<\/div>';
                        rw += '<\/div>';
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
