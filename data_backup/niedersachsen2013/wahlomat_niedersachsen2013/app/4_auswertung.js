	    
			
	
            

function write_4_auswertung() {
    /*
        Aus dem globalen reingewandert
    */
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

    rw  =   '';
    	        
    rw += '<div id="main">\n';
    
    rw += '<!-- Blindennavigation: Anfang -->\n';
        rw += '<div class="unsichtbar">\n';
            rw += '<ul>\n';
                rw += '<li><a href="#content_center_w_breit" tabindex="10" title="">'+wom_html(WOMT_aTexte["4_bn_zumergebnis"][S_nSprache])+'<\/a><\/li>\n';
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
    
    rw += '<div id="main_wm_sub_position">\n';

    rw += '<div id="content">\n';

	rw += '<div id="content_head_w_breit">\n';
		rw += '<h2>'+wom_html(WOMT_aTexte["wahlomat_content_head"][S_nSprache])+'<\/h2>\n';

		rw += '<div id="content_center_w_breit">\n';

			rw += '<h3 class="orange_breit">\n';
		        rw += wom_html(WOMT_aTexte["4_ergebnis"][S_nSprache])+'<\/h3>\n';
				if((S_nWeissNicht 	>= CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN)
			     ||(S_nNeutral    	>= CONST_WOMT_NOERGEBNIS_NEUTRAL)
			     ||(S_nSame    	    >= CONST_WOMT_NOERGEBNIS_SAME)
			    	) {
			     	if (S_nWeissNicht >= CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN){
			     		text = wom_html(WOMT_aTexte["4_erg_noergebnis_theseueberspringen"][S_nSprache]);
			     	} else {
			     		text = wom_html(WOMT_aTexte["4_erg_noergebnis_neutral"][S_nSprache]);
			     	}
			     	rw += '<div class="intro_komplett" style="line-height:16px;">\n';
			     	    rw += '<div class="text">\n';					     	
			     	        rw += text;
			     	    rw += '<\/div>\n';
                    rw += '<\/div>\n';
			     	
		     	    rw += '<div class="buttons_neu" style="margin-top:0px;">\n';
			     	    rw += '<div class="buttons_links">\n';
				     	    rw += '<div class="button">\n';
				     	    rw += '<a href="" onClick="replaceIFrame(2);return false;" tabindex="41" title="'
				     	            +wom_titletag(WOMT_aTexte["4_btn_zurueck_gewichtung_title"][S_nSprache])
				     	            +'" class="button_zurueck">'
				     	            +wom_html(WOMT_aTexte["4_btn_zurueck_gewichtung_text"][S_nSprache])
				     	            +' <span>&nbsp;<\/span><\/a>\n';
				     	    rw += '<\/div>\n';
				     	    rw += '<div class="clear">&nbsp;<\/div>\n';
				     	    rw += '<div class="button">\n';
				     	    rw += '<a href="" onclick="change_frage('
					                + (WOMT_nThesen - 1)
					                + ');'
					                + ';return false;" tabindex="42" title="'+wom_titletag(WOMT_aTexte["4_btn_zurueck_thesen_title"][S_nSprache])
					                +'" class="button_zurueck">'+wom_html(WOMT_aTexte["4_btn_zurueck_thesen_text"][S_nSprache])
					                +' <span>&nbsp;<\/span><\/a>\n';
				     	    rw += '<\/div>\n';
				     	    rw += '<div class="clear">&nbsp;<\/div>\n';
				     	    rw += '<div class="button">\n';
				     	    rw += '<a href="" onclick="location.href = \'main_app.html\';return false;" tabindex="43" title="'
				     	            +wom_titletag(WOMT_aTexte["a_neustart_title"][S_nSprache])
				     	            +'" class="button_zurueck">'
				     	            +wom_html(WOMT_aTexte["a_neustart_text"][S_nSprache])
				     	            +' <span>&nbsp;<\/span><\/a>\n';
				     	    rw += '<\/div>\n';
				     	    rw += '<div class="clear">&nbsp;<\/div>\n';
				     	    rw += '<br/>\n';
			     	    rw += '<\/div>\n';
			     	    rw += '<!-- Blindennavigation: Anfang -->\n';
                        	rw += '<div class="unsichtbar">\n';
                        		rw += wom_titletag(WOMT_aTexte["6_bn_hinweis_1"][S_nSprache])+'\n';
                        	rw += '<\/div>\n';
                        rw += '<!-- Blindennavigation: Ende -->\n';
                        rw += '<div class="legende" style="margin-right:40px;">\n';
							rw += '<div class="legend_green">'+wom_titletag(WOMT_aTexte["2_legende_stimmezu"][S_nSprache])+'<\/div>\n';
							rw += '<div class="legend_red">'+wom_titletag(WOMT_aTexte["2_legende_stimmenichtzu"][S_nSprache])+'<\/div>\n';
							rw += '<div class="legend_grey">'+wom_titletag(WOMT_aTexte["2_legende_neutral"][S_nSprache])+'<\/div>\n';
							rw += '<div class="legend_white">'+wom_titletag(WOMT_aTexte["45_legende_uebersprungen"][S_nSprache])+'<\/div>\n';
						rw += '<\/div>\n';
		     	    rw += '<\/div>\n';
		     	    rw += '<div class="clear">&nbsp;<\/div>\n';
                
			    } else {
					    if (1==0){
							if (S_nGleichstand!=1){
							    
							} else {
						        // ALT
	    					    rw += '<div class="intro" style="height:20px !important;padding-top:18px;min-height:20px;line-height:16px;">\n';
    						        rw += '<div class="text" style="width:720px;">\n';
								        rw += ''+wom_html(WOMT_aTexte["4_erg_parteien_gleichstand"][S_nSprache])+'';
								    rw += '<\/div>\n';
							    rw += '<\/div>\n';
						    }
					    } else {
					        rw += '<div class="intro" >\n';
                            rw += '<div class="wom-ergebnis">\n';
                            rw += '<a href="" onclick="popup_undjetzt();return false;" target="popup4" tabindex="19" title="'+wom_titletag(WOMT_aTexte["nav_wasnun_title"][S_nSprache])+'"><img src="pix/wom-ergebnis.jpg" width="190" height="63" border="0" alt="'+wom_titletag(WOMT_aTexte["nav_wasnun_title"][S_nSprache])+'" /><\/a>\n';
                            rw += '<\/div>\n';
						    rw += '<div class="text abstand-top-20" style="width:530px;">\n';
						    rw += wom_html(WOMT_aTexte["4_erg_ergebnis_nebenbutton"][S_nSprache])+'\n';
							rw += '<\/div>\n';
							    
							rw += '<\/div>\n';
						}
				    
					    								
					        rw += '<div class="result_table_border">\n';
                               		                            
                            rw += '<div id="result_table">\n';
                            rw += '<!-- Blindennavigation: Anfang -->\n';
                                rw += '<div class="unsichtbar">\n';
                                    rw += wom_html(WOMT_aTexte["4_bn_hinweis_tabelle"][S_nSprache]);				
                                rw += '<\/div>\n';
                            rw += '<!-- Blindennavigation: Ende -->\n';

							rw += '<div class="tablebg1">\n';
						        rw += '<div class="headcol1">'+wom_html(WOMT_aTexte["4_tabelle_uebereinstimmung"][S_nSprache])+'<\/div>\n';
						        rw += '<div class="headcol2">'+wom_html(WOMT_aTexte["4_tabelle_partei"][S_nSprache])+'<\/div>\n';
					        rw += '<\/div>\n';
					        rw += '<div class="clear">&nbsp;<\/div>\n';
							
								lNr = 0;
								for (f=0;f<WOMT_nParteien;f++){
									tabIndex = 0;
									a=S_aSort[f];
									if (S_aParteienAusgewaehlt[a]==1){
                                		prozent  = (S_nDistanceMax-S_aParteienAbs[a]);
                                		prozent += " "+wom_html(WOMT_aTexte["4_von"][S_nSprache])+" "
                                		    +S_nDistanceMax+" "+wom_html(WOMT_aTexte["4_punkte"][S_nSprache]);
	  
					  	    			text = wom_titletag(WOMT_aTexte["4_position_der_partei"][S_nSprache]);
										text = text.replace(/\[PARTEI\]/,wom_titletag(WOMT_aParteien[a][S_nSprache][0]));


					  	    			text = wom_titletag(WOMT_aTexte["4_position_der_partei"][S_nSprache]);
										text = text.replace(/\[PARTEI\]/,wom_titletag(WOMT_aParteien[a][S_nSprache][0]));
										rw += '<div class="tablebg';
										    if ((lNr%2)==0){
										        rw += '2';
										    } else {
										        rw += '1';
										    }
										    rw += '">\n';
											rw += '<div class="bar_wrap">\n';
											    fwidth = 400;
                                        		barWidth = Math.round(S_aParteienDistances[a] * fwidth);
    											rw += '<div class="contcol_bar'+(lNr+1)+'" style="width:'+barWidth+'px;" title="'+wom_titletag(prozent)+'"><span>'+wom_html(prozent)+'<\/span><\/div>\n';
										    rw += '<\/div>\n';
											rw += '<div class="contcol_part">\n';
										    rw += '<a href="" onclick="change_detailauswertung(' + a + '); return false;" tabindex="'
										            +(lNr+20)+'" title="'
										            +text+'" class="pfeil">'+wom_html(WOMT_aParteien[a][S_nSprache][1])
										    rw += '<\/a><\/div>\n';
										rw += '<\/div>\n';
                                        rw += '<div class="clear">&nbsp;<\/div>\n';
									    lNr++;	
                                    } else {
                                    }
								}    						
								
											
						rw += '<\/div>\n';
						rw += '<br \/><br \/>\n';
						
						
					    rw += '<\/div>\n';
					
					
					    rw += '<div class="clear">&nbsp;<\/div>\n';	
					    rw += '<div class="intro" style="padding-top:0px;line-height:16px;">\n';
						    rw += '<div class="text" style="width:720px;">\n';
						        rw += '<h4 class="result">';
						        rw += wom_html(WOMT_aTexte["4_erg_text_1_titel"][S_nSprache])+'<\/h4>\n';
						        
                                lText = WOMT_aTexte["4_erg_text_1"][S_nSprache];
                                rw += wom_html(lText);
						    rw += '<br /><\/div>\n';
						    rw += '<div class="text" style="width:720px;">\n';
						        rw += '<br /><h4 class="result">';
						        rw += wom_html(WOMT_aTexte["4_erg_text_2_titel"][S_nSprache])+'<\/h4>\n';
						        
                                lText = WOMT_aTexte["4_erg_text_2"][S_nSprache];
                                rw += wom_html(lText);
						    rw += '<br /><\/div>\n';
						    rw += '<div class="text">\n';
						        rw += '<br />\n';
						        rw += '<h4 class="result">';
						        rw += wom_html(WOMT_aTexte["4_erg_text_3_titel"][S_nSprache])+'<\/h4>\n';

  						        lUrlPdf = '<a tabindex="40"  target="_blank" href="'+CONST_PDF_URL+'" class="pfeil_fett">';
                                lText = WOMT_aTexte["4_erg_text_3"][S_nSprache];
    					        lText = lText.replace('[PARTEIENANZAHL]',WOMT_nParteien);
						        lText = lText.replace('[PDF_TARGET]',lUrlPdf);
                                rw += wom_html(lText);
    						    rw += '<br />\n';
    						    rw += '<br />\n';
						        rw += '<h4 class="result">'
					                +wom_html(WOMT_aTexte["4_erg_text_4_titel"][S_nSprache])
					                +'<\/h4>\n';
                                lText = WOMT_aTexte["4_erg_text_4"][S_nSprache];
                                rw += wom_html(lText);
						    rw += '<\/div>\n';
						    rw += '<!-- Blindennavigation: Anfang -->\n';
                            	rw += '<div class="unsichtbar">\n';
                            		rw += wom_titletag(WOMT_aTexte["6_bn_hinweis_1"][S_nSprache])+'\n';
                            	rw += '<\/div>\n';
                            rw += '<!-- Blindennavigation: Ende -->\n';
						    rw += '<div class="legende">\n';
    						    rw += '<div class="legend_green">'
    						            +wom_html(WOMT_aTexte["2_legende_stimmezu"][S_nSprache])
    						            +'<\/div>\n';
    						    rw += '<div class="legend_red">'
    						            +wom_html(WOMT_aTexte["2_legende_stimmenichtzu"][S_nSprache])
    						            +'<\/div>\n';
    						    rw += '<div class="legend_grey">'
    						            +wom_html(WOMT_aTexte["2_legende_neutral"][S_nSprache])
    						            +'<\/div>\n';
    						    rw += '<div class="legend_white">'
    						            +wom_html(WOMT_aTexte["45_legende_uebersprungen"][S_nSprache])
    						            +'<\/div>\n';
					        rw += '<\/div>\n';
					    rw += '<\/div>\n';
					    rw += '<div class="clear">\n';
					        rw += '&nbsp;\n';
					    rw += '<\/div>\n';
                    

			        }  // Noergebnis									
        //
        //  ----------------------------- Tabelle mit den Partei/User-Antworten
        //

    rw += '<div id="resultcompare_table">\n';
    rw += '<!-- Blindennavigation: Anfang -->\n';
        rw += '<div class="unsichtbar">\n';
            rw += wom_html(WOMT_aTexte["5_bn_hinweis_tabelle"][S_nSprache]);
        rw += '<\/div>\n';
    rw += '<!-- Blindennavigation: Ende -->\n';
    rw += '<div class="clear">&nbsp;<\/div>\n';
    rw += '<div class="tablehead">\n';
        rw += '<span class="headcol2">'+wom_html(WOMT_aTexte["6_tabelle_head_these"][S_nSprache])+'<\/span>\n';
        rw += '<span class="headcol3">'+wom_html(WOMT_aTexte["5_tabelle_head_ihreposition"][S_nSprache])+'<\/span>\n';
					
                    lNr = 0;
					if((S_nWeissNicht 	>= CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN)
				     ||(S_nNeutral    	>= CONST_WOMT_NOERGEBNIS_NEUTRAL)
				     ||(S_nSame    	    >= CONST_WOMT_NOERGEBNIS_SAME)){
						for (a=0;a<WOMT_nParteien;a++){
							if (S_aParteienAusgewaehlt[a]==1){
                                rw += '<span class="headcol_partei"><img border="0" src="'+
                                    WOMT_aParteienLogos[a][0]+'" alt="'+
                                    wom_titletag(WOMT_aParteien[a][S_nSprache][0])
                                    +'" /><\/span>';
						        lNr ++;    									
							}
                        }
				     } else {
						for (f=0;f<WOMT_nParteien;f++){
							tabIndex = 0;
							a=S_aSort[f];
							if (S_aParteienAusgewaehlt[a]==1){
							    linkText = wom_titletag(WOMT_aTexte["4_position_der_partei"][S_nSprache]);
							    linkText = linkText.replace(/\[PARTEI\]/,wom_titletag(WOMT_aParteien[a][S_nSprache][0]));
							
                                rw += '<span class="headcol_partei">';
                                rw += '<a style="background:none;border:none;margin:0px;padding:0px;" href=""'
                                        + 'onclick="change_detailauswertung(' 
                                        + a + '); return false;" tabindex="'+(f+100)+'" title="'+linkText+'" >';
                                rw+= '<img border="0" src="'+WOMT_aParteienLogos[a][0]+'" alt="'+
                                wom_titletag(WOMT_aParteien[a][S_nSprache][0])+'" /><\/a><\/span>';
						        lNr ++;
							}
					    }
					}
					if (lNr<CONST_PARTEIENAUSWAHL_MAX){
					    for(lCount=0;lCount<(CONST_PARTEIENAUSWAHL_MAX-lNr);lCount++){
					        rw += '<div style="margin:3px 0 0 0; width:65px; height:13px; float:left;">&nbsp;<\/div>\n';
					    }
					}
    rw += '<span class="headcol4">'+wom_html(WOMT_aTexte["5_tabelle_head_info"][S_nSprache])+'<\/span>\n';
    rw += '<div class="clear">&nbsp;<\/div>\n';
    rw += '<\/div>\n';

				    count = WOMT_nThesen;
				    for (lThese = 0; lThese < count; lThese++) {
						nr = (lThese+1);
				    	if (nr < 10){
				    		nr = "0"+nr;
				    	}
						these_kurz = WOMT_aThesen[lThese][S_nSprache][0];
						these_lang = WOMT_aThesen[lThese][S_nSprache][1];
						
                        rw += '<div class="tablebg';
                         if ((lThese%2)==0){
                            rw += '2';
                        } else {
                            rw += '1';
                        }
                        rw += '">\n';
                        rw += '<div class="contcol_wrap"><a href="#" class="tt">'+wom_html(these_kurz,1)
                                rw += '<span class="tooltip">\n';
                                    rw += '<span class="middle position">\n';
                                        rw += wom_html(these_lang);
                                    rw += '<\/span>\n';
                                rw += '<\/span>\n';
                            rw += '<\/a><\/div>\n';
                            switch(parseInt(S_aThesen[lThese])){
							        case -2:
							            tt = WOMT_aTexte["256_alt_ich_uebersprungen"][S_nSprache];
							            ti = "white";
							            break;
							        case -1:
							            tt = WOMT_aTexte["256_alt_ich_stimmenichtzu"][S_nSprache];
							            ti = "red";
							            break;
							        case 0:
							            tt = WOMT_aTexte["256_alt_ich_neutral"][S_nSprache];
							            ti = "grey";
							            break;
							        case 1:
							            tt = WOMT_aTexte["256_alt_ich_stimmezu"][S_nSprache];
							            ti = "green";
							            break;
                                }
                            rw += '<div class="check_'+ti+'_42" title="'
                                    +wom_titletag(tt)+'"><span class="unsichtbar">'
                                    +wom_html(tt)+'<\/span><\/div>';
							
							
                            lNr = 0;
							if((S_nWeissNicht 	>= CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN)
						     ||(S_nNeutral    	>= CONST_WOMT_NOERGEBNIS_NEUTRAL)
						     ||(S_nSame     	>= CONST_WOMT_NOERGEBNIS_SAME)){
					            for (a=0;a<WOMT_nParteien;a++){
									tabIndex = 0;
									if (S_aParteienAusgewaehlt[a]==1){
                                        p= a;
                                        abstimmung = parseInt(WOMT_aThesenParteien[lThese][p]);
								        tt = "";
								        ti = "";
									    switch(abstimmung){
                                            case -2:
                                                tt = "";
                                                ti = "white";
                                                break;
                                            case -1:
                                                tt = WOMT_aTexte["6_alt_partei_stimmtnichtzu"][S_nSprache];
                                                ti = "red";
                                                break;
                                            case 0:
                                                tt = WOMT_aTexte["6_alt_partei_neutral"][S_nSprache];
                                                ti = "grey";
                                                break;
                                            case 1:
                                                tt = WOMT_aTexte["6_alt_partei_stimmtzu"][S_nSprache];
                                                ti = "green";
                                                break;
                                        }
    									tt = tt.replace(/\[PARTEI\]/,WOMT_aParteien[p][S_nSprache][0]);
    									rw += '<a href="" onclick="popup_thesenbeschreibung(\''
            					    			+lThese+'\',\''
            					    			+S_aThesen[lThese]+'\',\''+p+'\');return false;" title="'
            					    			+wom_titletag(tt)
            					    			+'" tabindex="'+(120+(lThese*10)+lNr)+'" target="popup1" '
            					    			+'class="check_'+ti+'_65"><span class="unsichtbar">'
            					    			+wom_html(tt)
            					    			+'<\/span><\/a>';
								        lNr++;
								    }
								}            						     
						     } else {
								for (f=0;f<WOMT_nParteien;f++){
									tabIndex = 0;
									a = S_aSort[f];
									if (S_aParteienAusgewaehlt[a]==1){
                                        p= a;
								        abstimmung = parseInt(WOMT_aThesenParteien[lThese][p]);
								        tt = "";
								        ti = "";
									    switch(abstimmung){
                                            case -2:
                                                tt = "";
                                                ti = "white";
                                                break;
                                            case -1:
                                                tt = WOMT_aTexte["6_alt_partei_stimmtnichtzu"][S_nSprache];
                                                ti = "red";
                                                break;
                                            case 0:
                                                tt = WOMT_aTexte["6_alt_partei_neutral"][S_nSprache];
                                                ti = "grey";
                                                break;
                                            case 1:
                                                tt = WOMT_aTexte["6_alt_partei_stimmtzu"][S_nSprache];
                                                ti = "green";
                                                break;
                                        }
    									tt = tt.replace(/\[PARTEI\]/,WOMT_aParteien[p][S_nSprache][0],tt);
								        rw += '<a href="" onclick="popup_thesenbeschreibung(\''
            					    			+lThese+'\',\''
            					    			+S_aThesen[lThese]+'\',\''+p+'\');return false;" title="'
            					    			+wom_titletag(tt)
            					    			+'" tabindex="'+(120+(lThese*10)+lNr)+'" target="popup1" '
            					    			+'class="check_'+ti+'_65"><span class="unsichtbar">'
            					    			+wom_html(tt)
                                                +'<\/span><\/a>';
								        lNr++;
								    }
								}
                            }
							if (lNr<CONST_PARTEIENAUSWAHL_MAX){
							    
							    for(lCount=0;lCount<(CONST_PARTEIENAUSWAHL_MAX-lNr);lCount++){
							        rw += '<div style="margin:3px 0 0 0; width:65px; height:13px; float:left;">&nbsp;<\/div>';
							    }
							}
                                                    			
                            rw += '<a href="http://www.wahl-o-mat.de/'
                                            +CONST_WOMT_PATH_WL+'weiterleitung.php?w=mehr&amp;these_nr='+(lThese+1)
                                            +'&amp;these_id='+WOMT_aThesen_N2ID[lThese]
                                            +'&amp;ver=off" tabindex="'+((lThese*10)+120+9)+'" title="'
                                            +wom_titletag(WOMT_aTexte["6_tabelle_inhalt_mehrzumthema_title"][S_nSprache])
                                            +'" class="contcol_info_65" target="_blank"><span class="unsichtbar">'+wom_html(WOMT_aTexte["6_tabelle_inhalt_mehrzumthema_text"][S_nSprache])
                                            +'<\/span><\/a>';
                            rw += '<div class="clear">&nbsp;<\/div>';
                            rw += '<\/div>';
					}
                    											
    rw += '<\/div><br/>';
						
			    rw += '<div class="clear">&nbsp;<\/div>\n';
                rw += '<div class="buttons_neu">\n';
                    rw += '<div class="buttons_links">\n';

              if((S_nWeissNicht >= CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN)
			     ||(S_nNeutral  >= CONST_WOMT_NOERGEBNIS_NEUTRAL)
			     ||(S_nSame    	>= CONST_WOMT_NOERGEBNIS_SAME)){
			    } else {
                                                    
                    rw += '<div class="button">\n';
                        rw += '<a href="" onClick="replaceIFrame(3);return false;" tabindex="550" title="'
                                +wom_titletag(WOMT_aTexte["4_btn_zurueck_parteienaw_title"][S_nSprache])
                                +'" class="button_zurueck">'+wom_html(WOMT_aTexte["4_btn_zurueck_parteienaw_text"][S_nSprache])
                                +' <span>&nbsp;<\/span><\/a>\n';
                    rw += '<\/div>\n';
                    rw += '<div class="clear">&nbsp;<\/div>\n';
                    rw += '<div class="button">\n';
                        rw += '<a  href="" onClick="replaceIFrame(2);return false;" tabindex="551" title="'
                                +wom_titletag(WOMT_aTexte["4_btn_zurueck_gewichtung_title"][S_nSprache])+'" class="button_zurueck">'
                                +wom_html(WOMT_aTexte["4_btn_zurueck_gewichtung_text"][S_nSprache])
                                +' <span>&nbsp;<\/span><\/a>\n';
                    rw += '<\/div>\n';
                    rw += '<div class="clear">&nbsp;<\/div>\n';
                    rw += '<div class="button">\n';
                        rw += '<a href="" onclick="change_frage('
				                + (WOMT_nThesen - 1)
				                + ');'
				                + ';return false;" tabindex="552" title="'
				                +wom_titletag(WOMT_aTexte["4_btn_zurueck_thesen_title"][S_nSprache])
				                +'" class="button_zurueck">'+wom_html(WOMT_aTexte["4_btn_zurueck_thesen_text"][S_nSprache])
				                +' <span>&nbsp;<\/span><\/a>\n';
                    rw += '<\/div>\n';
                    rw += '<div class="clear">&nbsp;<\/div>\n';
                }

				rw += '<\/div>\n';
		        rw += '<div class="buttons_rechts">\n';
           if((S_nWeissNicht 	>= CONST_WOMT_NOERGEBNIS_THESEUEBERSPRINGEN)
			     ||(S_nNeutral  >= CONST_WOMT_NOERGEBNIS_NEUTRAL)
			     ||(S_nSame    	>= CONST_WOMT_NOERGEBNIS_SAME)){
			    } else {

					rw += '<div class="button">\n';
                        rw += '<a href="" onclick="location.href = \'main_app.html\';return false;" tabindex="553" title="'
					        +wom_titletag(WOMT_aTexte["a_neustart_title"][S_nSprache])
					        +'" class="button_weiter"><span>&nbsp;<\/span> '
					        +wom_html(WOMT_aTexte["a_neustart_text"][S_nSprache])+'<\/a>\n';
                    rw += '<\/div>\n'
				    rw += '<div class="clear">&nbsp;<\/div>\n';
                }

                rw += '<\/div>\n';
    rw += '<\/div>\n';
    rw += '<div class="clear">&nbsp;<\/div>\n';
    
    rw += '<\/div>\n';
    rw += '<\/div>\n';
    rw += '<div id="content_foot_w_breit">&nbsp;<\/div>\n';
    rw += '<\/div>\n';


    rw += '<!-- Blindennavigation: Anfang -->\n';
        rw += '<div class="unsichtbar">\n';
            rw += '<ul>\n';
                rw += '<li><a href="#main" title="" tabindex="630">'+wom_html(WOMT_aTexte["a_bn_seitenstart_text"][S_nSprache])+'<\/a><\/li>\n';
                rw += '<li><a href="#content_center_w_breit" title="" tabindex="631">'+wom_html(WOMT_aTexte["4_bn_zumergebnis"][S_nSprache])+'<\/a><\/li>\n';
            rw += '<\/ul>\n';
        rw += '<\/div>\n';
    rw += '<!-- Blindennavigation: Ende -->\n';

    rw += '<\/div>\n';

	rw += print_main_foot();

    rw += '<\/div>\n';

    rw += '<\/div>\n';

    
    return rw;
}
            