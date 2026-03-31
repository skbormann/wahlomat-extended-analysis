
		
function ergebnis() {
    if (CONST_GEWICHTUNG == 1) {
		ct = WOMT_nThesen;
	} else {
		ct = WOMT_nThemen;
	}
    for (a = 0; a < ct; a++) {
        val = 'cb_themen_' + a;
        if (document.forms['themen'].elements[val].checked == true) {
            set_thema(a, 1);
        } else {
            set_thema(a,0);
        }
    }
    replaceIFrame(3);
}

function write_2_gewichtung(){


    b=S_nTheseAktuell+1;
    
    rw = '';    

    rw += '<div class="wom_main_wrapper' + msl_get_view_class() + '" id="wom" lang="de">';
        rw += '<ul class="wom_anchormenu" aria-label="Sprungnavigation">';
           rw += '<li><a href="#bnmainheader">' + wom_html(WOMT_aTexte["2_bn_thesengewichtung_text"][S_nSprache])+ '<\/a><\/li>';
           rw += '<li><a href="#bnbreadcrumb">' + wom_html(WOMT_aTexte["a_bn_breadcrumb_text"][S_nSprache])+ '<\/a><\/li>';
           rw += '<li><a href="#bnskip">Schritt vor oder zur&uuml;ck<\/a><\/li>';
           rw += '<li><a href="#bnleftnavi">' + wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache])+ '<\/a><\/li>';
        rw += '<\/ul>';
        rw += print_main_head();
 
        rw += '<div class="wom_wrapper">';
            rw += '<div class="wom_content" id="content">';
		        rw += print_top_nav(2);
		        rw += '<main class="wom_main_content">';
                    rw += '<div class="wom_phone-header">';
                        rw += '<a class="wom_link-back" href="" onclick="replaceIFrame(1);return false;" title="' + wom_titletag(WOMT_aTexte["bc_1_thesen"][S_nSprache])+ '">' + wom_html(WOMT_aTexte["bc_1_thesen"][S_nSprache])+ '<\/a>';
                        rw += '<img class="wom_logo" alt="' + wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache])+ '" src="media/pix/bildmarke_wom_schwarz.svg" />';
                        rw += '<a title="' + wom_titletag(WOMT_aTexte["nav_startseite"][S_nSprache])+ '" href="main_app.html" class="wom_link-home">' + wom_titletag(WOMT_aTexte["nav_startseite"][S_nSprache])+ '<\/a>';
                    rw += '<\/div>';
                    rw += '<nav class="wom_breadcrumb" id="bnbreadcrumb">';
                        rw += '<a href="" onclick="replaceIFrame(1);return false;">' + wom_html(WOMT_aTexte["bc_1_thesen"][S_nSprache])+ '<\/a>';
                        rw += '<ul class="wom_breadcrumb_list">';
							rw += '<li class="wom_first_position wom_active" aria-label="' 
							    + wom_titletag(WOMT_aTexte["bc_hier"][S_nSprache]) 
							    + ' ' 
							    + WOMT_aTexte["bc_2_gewichtung"][S_nSprache]+ '"><strong>' + wom_html(WOMT_aTexte["bc_2_gewichtung"][S_nSprache])+ '<\/strong><\/li>';
						rw += '<\/ul>';
                        rw += '<div class="wom_clear">&nbsp;<\/div>';
                    rw += '<\/nav>';
                    rw += '<div class="wom_header-margin wom_header-margin-gewichtung"><\/div>';
                    rw += '<header>';
					    rw += '<h1 id="bnmainheader">' + wom_html(WOMT_aTexte["2_titel_text"][S_nSprache])+ '<\/h1>';
					    rw += '<p style="margin-bottom:0px">' + wom_html(WOMT_aTexte["2_text_text"][S_nSprache])+ '';
    					    rw += '<br/><br/>';
					    rw += '<\/p>';
                    rw += '<\/header>';
			        rw += '<span style="float:left;font-size:16px;line-height:20px"><br/>' 
			            + wom_html(WOMT_aTexte["2_these"][S_nSprache])+ '<\/span><span style="float:right;text-align:right;font-size:16px;line-height:20px">' 
			            + wom_html(WOMT_aTexte["2_tabelle_position"][S_nSprache])+ '<\/span>';
                    rw += '<div style="clear:both;height:13px;"><\/div>';
                    
    				rw += '<form enctype="multipart/form-data" aria-describedby="form-desc" name="themen" method="get" action="main_app.html">\n';
                        rw += '<input type="hidden" name="cb_themen" value="change" />\n';
                            
                        rw += '<!-- Blindennavigation: Anfang -->\n';
                        rw += '<p id="form-desc" class="v-hidden">\n';
                		    rw += wom_html(WOMT_aTexte["2_bn_hinweis"][S_nSprache]);
                        rw += '<\/p>\n';
                        rw += '<!-- Blindennavigation: Ende -->\n';
                        rw += '<ul class="wom_auswertung" id="bngewichtung" role="tablist">\n';
						    for (a = 0; a < WOMT_nThesen; a++) {
						    	nr = (a+1);
			    	            if (S_aThemen[a] == 1) {
						    		checked        = ' checked="checked" ';
						    		labelClass     = ' wom_star_active';
						    		triggerClass   = ' wom_trigger_active';
						    		triggerClass2   = ' wom_langethese_tab_active';
						    		ariaDiv        = ' aria-expanded="true" aria-controls="wom-tabpanel-' + nr + '"';
						    		//ariaLabel      = ' aria-selected="true" ';
						    		ariaLabel      = '';
						    	} else {
		    		                checked        = '';
						    		labelClass     = '';
						    		triggerClass   = '';
						    		triggerClass2  = '';
						    		ariaDiv        = ' aria-expanded="false" aria-controls="wom-tabpanel-' + nr + '"';
						    		//ariaLabel      = ' aria-selected="false" ';
						    		ariaLabel      = '';
						    	}						    
                    	    rw += '<li class="wom_default" style="clear:both;"> \n';
                    	        rw += '<div style="width:100% !important;height:32px !important"> \n';
                        	        rw += '<div class="wom_langethese_tab' + triggerClass2 + '" role="tab" ' + ariaDiv + ' tabindex="-1">\n';
                                        rw += '<span class="wom_these_show" title="';
                                                text2 = WOMT_aTexte["2_these_einblenden"][S_nSprache];
                                                text2 = text2.replace('[KURZTHESE]', WOMT_aThesen[a][S_nSprache][0]);
                                                rw += wom_titletag(text2);
                                            rw += '">\n';
                                            rw += ' <span class="v-hidden">\n';
                                                text2 = WOMT_aTexte["2_these_einblenden"][S_nSprache];
                                                text2 = text2.replace('[KURZTHESE]', WOMT_aThesen[a][S_nSprache][0]);
                                                rw += wom_titletag(text2);
                                            rw += '<\/span> \n';
                                            rw += '<img src="media/pix/icon/arrow_bottom.svg" alt="';
                                                text2 = WOMT_aTexte["2_these_einblenden"][S_nSprache];
                                                text2 = text2.replace('[KURZTHESE]', WOMT_aThesen[a][S_nSprache][0]);
                                               rw += wom_titletag(text2);
                                            rw += '" />\n';
                                        rw += '<\/span>\n';
                                        rw += ' <span class="wom_these_hide" title="';
                                                text2 = WOMT_aTexte["2_these_ausblenden"][S_nSprache];
                                                text2 = text2.replace('[KURZTHESE]', WOMT_aThesen[a][S_nSprache][0]);
                                                rw += wom_titletag(text2);
                                            rw += '">\n';
                                            rw += '<span class="v-hidden">\n';
                                                text2 = WOMT_aTexte["2_these_ausblenden"][S_nSprache];
                                                text2 = text2.replace('[KURZTHESE]', WOMT_aThesen[a][S_nSprache][0]);
                                                rw += wom_html(text2);
                                            rw += '<\/span> \n';
                                            rw += '<img src="media/pix/icon/arrow_top.svg" alt="';
                                                text2 = WOMT_aTexte["2_these_ausblenden"][S_nSprache];
                                                text2 = text2.replace('[KURZTHESE]', WOMT_aThesen[a][S_nSprache][0]);
                                                rw += wom_titletag(text2);
                                            rw += '" />\n';
                                        rw += '<\/span>\n';
                                    rw += '<\/div>\n';
                                    rw += '<div style="overflow: hidden;" class="wom_trigger' + triggerClass + '">\n';
    									rw += '<label ' + ariaLabel + ' class="wom_label_check wom_label_over ' 
    									        + labelClass + '" title="These ' + nr + ' &quot;';
    									    rw += wom_titletag(WOMT_aThesen[a][S_nSprache][0]);
                                            rw += '&quot; doppelt gewichten" for="these' + a + '" tabindex="-1">\n';
                                                rw += nr +  ' ' +  wom_html(WOMT_aThesen[a][S_nSprache][0]);
    									rw += '<\/label>\n';
    									rw += '<span class="wom_star"><img src="media/pix/icon/star_black.png" alt="" /> \n';
                                               rw += wom_html(WOMT_aTexte["2_auswaehlen"][S_nSprache]);
                                        rw += '<\/span>\n';
								    rw += '<\/div>\n';
                                    rw += '<input class="wom_hidecheckbox gwc" type="checkbox" ' 
                                        + checked + 
                                        ' id="these' + a 
                                        + '" name="cb_themen_' 
                                        + a + '" value="1" tabindex="0" />\n';
								rw += '<\/div>\n';
								rw += '<div style="clear:both" aria-hidden="false" role="tabpanel" id="wom-tabpanel-' 
								        + nr + '" aria-labelledby="wom-tabpanel-' 
								        + nr + '"><p>\n';
                                    rw += wom_html(WOMT_aThesen[a][S_nSprache][1]);
                                rw += '<\/p><\/div>\n';      

                                rw += '<div style="width:30px">';
                                    
                                    ichAntwortClass    = '';
						            ichAntwortText     = '';
						            text2 =  WOMT_aThesen[a][S_nSprache][1];
								    switch(S_aThesen[a]){
								       case -2:
								            ichAntwortClass    = 'wom_avoid';
								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_uebersprungen"][S_nSprache];
								            imgAntwort          = '<img src="media/pix/icon/votum_enthalten.png" alt="' 
								                + wom_titletag(text2.replace('[THESE]', ichAntwortText)) 
								                + '" />';
								            break;
								        case -1:
								            ichAntwortClass    = 'wom_negative';
								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_stimmenichtzu"][S_nSprache];
								            imgAntwort         = '<img src="media/pix/icon/votum_con.png" alt="' 
								                + wom_titletag(text2.replace('[THESE]', ichAntwortText))
								                + '" />';
								            break;
								        case 0:
								            ichAntwortClass    = 'wom_neutral';
								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_neutral"][S_nSprache];
								            imgAntwort         = '<img src="media/pix/icon/votum_neutral.png" alt="' 
								                + wom_titletag(text2.replace('[THESE]', ichAntwortText))
								                + '" />';
								            break;
								        case 1:
								            ichAntwortClass    = 'wom_approved';
								            ichAntwortText     = WOMT_aTexte["5_antwort_ich_text_stimmezu"][S_nSprache];
								            imgAntwort = '<img src="media/pix/icon/votum_pro.png" alt="' 
								                + wom_titletag(text2.replace('[THESE]', ichAntwortText) )
								                + '" />';
								            break;
								    }						
                                    ichAntwortText = ichAntwortText.replace('[THESE]', WOMT_aThesen[a][S_nSprache][1]);
							    	    rw += '<span style="margin-right:0px;margin-top:1px;" class="wom_antworten_partei ' 
							    	        + ichAntwortClass + '" title="';
				    			            rw += wom_titletag(ichAntwortText);
				    			        rw += '">';
				    			        rw += imgAntwort;
						            rw += '<\/span>';
						        rw += '<\/div>';
						        rw += '<div style="clear:both"><\/div>';
                            rw += '<\/li>\n';
                                //onchange="markbox();"
                            } 
                        rw += '<\/ul>';
        				rw += '<div class="wom_skip" id="bnskip">';
                            rw += '<a class="wom_previous" href="" onclick="change_frage('
                							+ (WOMT_nThesen - 1)
                							+ ');'
                							+ ';return false;" title="' 
                							+ wom_titletag(WOMT_aTexte["2_btn_zurueck_title"][S_nSprache]) 
                							+ '">' + wom_html(WOMT_aTexte["2_btn_zurueck_text"][S_nSprache]) 
                							+ '<\/a>';
        					rw += '<input class="wom_next" type="submit" onclick="ergebnis();return false;"  value="' 
        					    + wom_titletag(WOMT_aTexte["2_form_submit_text"][S_nSprache]) + '" title="' 
        					    + wom_titletag(WOMT_aTexte["2_form_submit_title"][S_nSprache]) + '" />';
        				rw += '<\/div>';
        			rw += '<\/form>';
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


    function markbox(box){
        return;
        lCount = 0;
        for(a = 0;a<WOMT_nThesen;a++){
            lCheckboxName = 'these'+a;
            lCheckbox = document.getElementById(lCheckboxName);
            if (lCheckbox){
                if (lCheckbox.checked){
                    if (lCheckbox.parentNode) {
                        if (lCheckbox.parentNode.firstChild) {
                            divChilds = lCheckbox.parentNode.getElementsByTagName('div');
                            if (divChilds) {
                                for (i = 0; i < divChilds.length; i++) {
                                    divChilds[i].className = 'wom_trigger wom_trigger_active';
                                    i = divChilds.length;
                                }
                                labelChilds = lCheckbox.parentNode.getElementsByTagName('label');
                                if (labelChilds) {
                                    for (i = 0; i < labelChilds.length; i++) {
                                        labelChilds[i].className = 'wom_label_check wom_star_active';
                                        i = divChilds.length;
                                    }
                                } 
                            }                            
                            //lCheckbox.parentNode.className = 'trigger';
                        }
                    }
                    //lCheckbox.parentNode.style.backgroundColor = "#ff0000";
                    lCount++;
                } else {
                    if (lCheckbox.parentNode) {
                        if (lCheckbox.parentNode.firstChild) {
                            divChilds = lCheckbox.parentNode.getElementsByTagName('div');
                            if (divChilds) {
                                for (i = 0; i < divChilds.length; i++) {
                                    divChilds[i].className = 'wom_trigger';
                                    i = divChilds.length;
                                }
                                labelChilds = lCheckbox.parentNode.getElementsByTagName('label');
                                if (labelChilds) {
                                    for (i = 0; i < labelChilds.length; i++) {
                                        labelChilds[i].className = 'wom_label_check';
                                        i = divChilds.length;
                                    }
                                }                       
                            }     
                            //lCheckbox.parentNode.className = 'trigger';
                        }
                    }
                    //f.find('li div').css('display', 'none');
                    //lCheckbox.parentNode.style.backgroundColor = "#008800";
                }
            }
        }
        
    }
