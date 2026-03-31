				
function write_5_detailauswertung() {

    popup_these = -1;
    popup_du = -1;
    
    popup_du 		= 0;
    popup_partei 	= S_nDetailAuswertung;
    popup_these 	= 0;
    popup_sprache 	= S_nSprache;

    S_nPartei		= S_nDetailAuswertung;

    rw =  '';


    rw = '';
	rw += '<style type="text/css" media="screen, print">\n';
	lCount = 0;
	for (lh=0;lh<WOMT_nParteien;lh++){
	    lNr = S_aSort[lh];
	    if (S_aParteienAusgewaehlt[lNr]==1){    		    		    
			rw += '.part_pics li.b'+(lCount+1)+' a:link, .part_pics li.b'+(lCount+1)+' a:visited{';
			rw += 'background:url('+WOMT_aParteienLogos2[lNr][0]+') no-repeat;';
			rw += '}';
			rw += '.part_pics li.b'+(lCount+1)+' a:hover, .part_pics li.b'+(lCount+1)+' a:focus{';
			rw += 'background:url('+WOMT_aParteienLogos2[lNr][0]+') no-repeat;';
			rw += '}';
			rw += '.part_pics li.b'+(lCount+1)+'s a:link, .part_pics li.b'+(lCount+1)+'s a:visited{';
			rw += 'background:url('+WOMT_aParteienLogos[lNr][0]+') no-repeat;';
			rw += '}';
			rw += '.part_pics li.b'+(lCount+1)+'s a:hover, .part_pics li.b'+(lCount+1)+'s a:focus{';
			rw += 'background:url('+WOMT_aParteienLogos[lNr][0]+') no-repeat;';
			rw += '}';
			lCount++;
	    }
	
	}
	rw += '<\/style>';

    
    
	rw += '<div id="main">\n';


	rw += '<!-- Blindennavigation: Anfang -->\n';
	rw += '<div class="unsichtbar">\n';
		rw += '<ul>\n';
		rw += '<li><a href="#content_center_w" tabindex="10" title="">'+wom_html(WOMT_aTexte["6_bn_zurauswahl_text"][S_nSprache])+'<\/a><\/li>\n';
		rw += '<li><a href="#compare_table" tabindex="11" title="">\n';

		text = wom_html(WOMT_aTexte["6_bn_vergleichpositionen_text"][S_nSprache]);
		text = text.replace(/\[PARTEI\]/,wom_html(WOMT_aParteien[S_nPartei][S_nSprache][0]));
		rw += text;

		rw += '<\/a><\/li>\n';
		
		rw += '<li><a href="#leftnav_fixed" tabindex="12" title="">'+wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache])+'<\/a><\/li>\n';
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

	    rw += '<div id="main_wm_sub_w">\n';

	        rw += '<div id="content">\n';

	            rw += '<div id="content_head_w">\n';
	                rw += '<h2>'+wom_html(WOMT_aTexte["wahlomat_content_head"][S_nSprache])+'<\/h2>\n';

	                rw += '<div id="content_center_w">\n';

         				rw += '<h3 class="orange">'+wom_html(WOMT_aTexte["6_title_text"][S_nSprache])+'<\/h3>\n';
        
                        rw += '<div class="clear">&nbsp;<\/div>\n';
                        rw += '<div class="intro" style="line-height:16px;">\n';
                            rw += '<div class="text">\n';
                 				rw += wom_html(WOMT_aTexte["6_text_text"][S_nSprache])
                 				+'<br/><br/><br/>';
                 				
                            rw += '<\/div>\n';
                            rw += '<!-- Blindennavigation: Anfang -->\n';
                            	rw += '<div class="unsichtbar">\n';
                            		rw += wom_titletag(WOMT_aTexte["6_bn_hinweis_1"][S_nSprache])+'\n';
                            	rw += '<\/div>\n';
                            rw += '<!-- Blindennavigation: Ende -->\n';
         				    rw += '<div class="legende">\n';
                 				rw += '<div class="legend_green">'+wom_html(WOMT_aTexte["2_legende_stimmezu"][S_nSprache])+'<\/div>\n';
                 				rw += '<div class="legend_red">'+wom_html(WOMT_aTexte["2_legende_stimmenichtzu"][S_nSprache])+'<\/div>\n';
                 				rw += '<div class="legend_grey">'+wom_html(WOMT_aTexte["2_legende_neutral"][S_nSprache])+'<\/div>\n';
                 				rw += '<div class="legend_white">'+wom_html(WOMT_aTexte["45_legende_uebersprungen"][S_nSprache])+'<\/div>\n';
         				    rw += '<\/div>\n';
     				    rw += '<\/div>\n';
         				rw += '<div class="clear">&nbsp;<\/div>\n';
         				
         				rw += '<div class="buttons_neu" style="margin-top:0px;margin-bottom:10px;">\n';
         				    rw += '<div class="buttons_links">\n';
         				        rw += '<div class="button">\n';
         				            rw += '<a class="button_zurueck" href="" onclick="replaceIFrame(4);return false;" tabindex="20" title="'
                     				        +wom_titletag(WOMT_aTexte["6_btn_zurueck_title"][S_nSprache])
                     				        +'">'
                     				        +wom_html(WOMT_aTexte["6_btn_zurueck_text"][S_nSprache])
                     				        +' <span>&nbsp;<\/span><\/a>\n';
                 				rw += '<\/div>\n';
                 				rw += '<div class="clear">\n';
                     				rw += '&nbsp;\n';
                 				rw += '<\/div>\n';
             				rw += '<\/div>\n';
         				rw += '<\/div>\n';
         				rw += '<div class="clear">&nbsp;<\/div>\n';
			
         				rw += '<ul class="part_pics" style="margin-left:25px;">\n';
			
			
			
						/*
							Für die Bilder ist wichtig, daß die Reihenfolge stimmt!
							die die Bilder im CSS mit b1-b5 drin sind.
							Die Bilder können deshalb nicht über das CMS verwaltet werden!
						*/
						lMargin = 0;
						if (GetParteienAusgewaehlt()>6){
						    lMargin = 0;
						}
						lCount = 0;
                    	for (f=0;f<WOMT_nParteien;f++){
                    	    lNr = S_aSort[f];
                    		if (S_aParteienAusgewaehlt[lNr]==1){		
							    text = wom_titletag(WOMT_aTexte["4_position_der_partei"][S_nSprache]);
							    text = text.replace(/\[PARTEI\]/,wom_titletag(WOMT_aParteien[lNr][S_nSprache][0]));
			    			    rw += '<li style="margin-right:'+lMargin+'px;">';
			    			    if ((GetParteienAusgewaehlt()>6)&&(lCount==4)){
                                    //rw += 'clear:both;';
                                }
			    			        rw += '<a href="" style="background:url(';
			    			        if (lNr==S_nPartei){
        			    			    rw += WOMT_aParteienLogos[lNr][0];
			    			        } else {
        			    			    rw += WOMT_aParteienLogos2[lNr][0];
			    			        }
			    			        rw += ') no-repeat;"';
			    			        rw += ' onclick="change_detailauswertung(' + lNr + ');return false;" tabindex="'
			    			                +(30+lCount)+'"title="'+text+'"><span>'
			    			                +wom_html(WOMT_aParteien[lNr][S_nSprache][0])+'<\/span><\/a><\/li>\n';
                                lCount++;
                            }
						}
						
         				rw += '<\/ul>\n';

 				        rw += '<div id="compare_table">\n';
             				rw += '<!-- Blindennavigation: Anfang -->\n';
             				rw += '<div class="unsichtbar">\n';
            		            rw += wom_html(WOMT_aTexte["6_bn_hinweis_1"][S_nSprache]);
             				rw += '<\/div>\n';
             				rw += '<!-- Blindennavigation: Ende -->\n';
            
             				rw += '<div class="tablebg1">\n';
                 				rw += '<span class="headcol2">'+wom_html(WOMT_aTexte["6_tabelle_head_these"][S_nSprache])+'<\/span>\n';
                 				rw += '<span class="headcol3">'+wom_html(WOMT_aTexte["6_tabelle_head_ihreposition"][S_nSprache])+'<\/span>\n';
                 				rw += '<span class="headcol4">'+wom_html(WOMT_aTexte["6_tabelle_head_positionpartei"][S_nSprache])+'<\/span>\n';
                 				rw += '<span class="headcol5';
                 				if (S_nSprache==1){
                 				    rw += 'eng';
                 				}
                 				
                 				rw += '">'+wom_html(WOMT_aTexte["6_tabelle_head_begruendung"][S_nSprache])+'<\/span>\n';
                 				rw += '<span class="headcol6';
                 				if (S_nSprache==1){
                 				    rw += 'eng';
                 				}
                 				rw += '">'+wom_html(WOMT_aTexte["6_tabelle_head_info"][S_nSprache])+'<\/span>\n';
                 				rw += '<div class="clear">&nbsp;<\/div>\n';
             				rw += '<\/div>\n';
            							count = WOMT_nThesen;
            							for (a = 0; a < count; a++) {
            								nr = (a+1);
            						    	/*if (nr < 10){
            						    		nr = "0nr";
            						    	}*/
            								text = wom_html(WOMT_aThesen[a][S_nSprache][1]);
            								rw += '<div class="tablebg';
                    		                if ((a%2)==0){
                    		                	rw += '2';
                    		                } else {
                    		                	rw += '1';
                    		                }
                    		                rw += '">\n';
            		                        rw += '<div class="contcol_txt">'+text+'<\/div>\n';
            		                        
            							    switch(parseInt(S_aThesen[a])){
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
            							    
            		                        rw += '<div class="check_'+ti+'" title="'+wom_titletag(tt)+'">\n';
            		                        rw += '<span class="unsichtbar">'+wom_html(tt)+'<\/span><\/div>\n';
            								p = S_nPartei;
            						        abstimmung = parseInt(WOMT_aThesenParteien[a][p]);
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
            								tt = tt.replace(/\[PARTEI\]/,WOMT_aParteien[S_nPartei][S_nSprache][0]);
            								
            								
            		                        rw += '<div class="check_'+ti+'" title="'+wom_titletag(tt)+'">\n';
            		                        rw += '<span class="unsichtbar">'+wom_html(tt)+'<\/span><\/div>\n';
            		                        rw += '<a href="" onclick="popup_thesenbeschreibung(\''
            					    			+a+'\',\''
            					    			+S_aThesen[a]+'\',S_nPartei);return false;" title="'
            					    			+wom_titletag(WOMT_aTexte["6_tabelle_popup_parteithese_title"][S_nSprache])
            					    			+'" tabindex="'+((a*2)+40)+'" target="popup1" class="contcol_partlink"><span class="unsichtbar">'
            					    			+wom_html(tt)
            					    			+'<\/span><\/a>\n';
            		                        
            		                        rw += '<a href="http://www.wahl-o-mat.de/'+CONST_WOMT_PATH+'/weiterleitung.php?w=mehr&amp;these_nr='+(a+1)+'&amp;these_id='+WOMT_aThesen_N2ID[a]+'&amp;ver=off" tabindex="'+((a*2)+40+1)+'" title="'+wom_titletag(WOMT_aTexte["6_tabelle_inhalt_mehrzumthema_title"][S_nSprache])+'" target="_blank" class="contcol_info"><span class="unsichtbar">'+wom_html(WOMT_aTexte["6_tabelle_inhalt_mehrzumthema_text"][S_nSprache])+'<\/span><\/a>\n';
            		                        
                		                        rw += '<div class="clear">&nbsp;<\/div>\n';
            		                        rw += '<\/div>\n';
            							        
            
            						    }
        						
	                                rw += '<\/div>\n';
                                
                                        
	                                rw += '<div class="clear">&nbsp;<\/div>\n';
	                                rw += '<div class="buttons_neu">\n';
		                                rw += '<div class="buttons_links">\n';
			                                rw += '<div class="button">\n';
            	                                rw += '<a class="button_zurueck" href="" onclick="replaceIFrame(4);return false;" tabindex="291" title="'
            	                                +wom_titletag(WOMT_aTexte["6_btn_zurueck_title"][S_nSprache])
            	                                +'">'
            	                                +wom_html(WOMT_aTexte["6_btn_zurueck_text"][S_nSprache])
            	                                +' <span>&nbsp;<\/span><\/a>\n';
	                                        rw += '<\/div>\n';
		                                    rw += '<div class="clear">\n';
		                                        rw += '&nbsp;\n';
		                                    rw += '<\/div>\n';
		                                rw += '<\/div>\n';
		                                rw += '<div class="buttons_rechts">\n';
			                                rw += '<div class="button">\n';
            	                                rw += '<a class="button_weiter" href="" onclick="location.href = \'main_app.html\';return false;" tabindex="292" title="'
            	                                +wom_titletag(WOMT_aTexte["a_neustart_title"][S_nSprache])
            	                                +'"><span>&nbsp;<\/span> '
            	                                +wom_html(WOMT_aTexte["a_neustart_text"][S_nSprache])+'<\/a>\n';
	                                        rw += '<\/div>\n';
	                                        rw += '<div class="clear">\n';
	                                            rw += '&nbsp;\n';
	                                        rw += '<\/div>\n';
	                                    rw += '<\/div>\n';
	                                rw += '<\/div>\n';
	                                rw += '<div class="clear">\n';
		                                rw += '&nbsp;\n';
	                                rw += '<\/div>\n';
            
                 				rw += '<\/div>\n';
 	            			rw += '<\/div>\n';
                        rw += '<div id="content_foot_w_schatten">&nbsp;<\/div>\n';
	        rw += '<\/div>\n';
    rw += '<!-- Blindennavigation: Anfang -->\n';
	rw += '<div class="unsichtbar">\n';
	rw += '<ul>\n';
	rw += '<li><a href="#main" tabindex="630">'+wom_html(WOMT_aTexte["a_bn_seitenstart_text"][S_nSprache])+'<\/a><\/li>\n';
	rw += '<li><a href="#content_center_w" tabindex="631">'+wom_html(WOMT_aTexte["6_bn_zurauswahl_text"][S_nSprache])+'<\/a><\/li>\n';
	rw += '<li><a href="#compare_table" tabindex="632">\n';
    text = wom_html(WOMT_aTexte["6_bn_vergleichpositionen_text"][S_nSprache]);
    text = text.replace(/\[PARTEI\]/,wom_html(WOMT_aParteien[S_nPartei][S_nSprache][0]));
	rw += text;
	rw += '<\/a><\/li>\n';
	rw += '<\/ul>\n';
	rw += '<\/div>\n';
	rw += '<!-- Blindennavigation: Ende -->\n';

	rw += '<\/div>\n';

	rw += print_main_foot();

	rw += '<\/div>\n';

	rw += '<\/div>\n';
    return rw;
}
