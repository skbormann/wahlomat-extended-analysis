
		
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
    rw += '<div id="main">\n';

        rw += '<!-- Blindennavigation: Anfang -->\n';
            rw += '<div class="unsichtbar">\n';
                rw += '<ul>\n';
                    rw += '<li><a href="#content_center_w" tabindex="10" title="">'+wom_html(WOMT_aTexte["2_bn_thesengewichtung_text"][S_nSprache])+'<\/a><\/li>\n';
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

            rw += '<form enctype="multipart/form-data" name="themen" method="get" action="main_app.html">\n';
            rw += '<input type="hidden" name="cb_themen" value="change" />\n';
            rw += '<div id="main_wm_sub_w">\n';

                rw += '<div id="content">\n';

                rw += '<div id="content_head_w">\n';
                    rw += '<h2>'+wom_html(WOMT_aTexte["wahlomat_content_head"][S_nSprache])+'<\/h2>\n';

                    rw += '<div id="content_center_w">\n';

                        rw += '<h3 class="orange">'
                            +wom_html(WOMT_aTexte["2_titel_text"][S_nSprache])
                            +'<\/h3>\n';
                        rw += '<div class="clear">&nbsp;<\/div>\n';

                        rw += '<div class="intro" style="line-height:16px;">\n';
                            rw += '<div class="text">\n';
                				rw += wom_html(WOMT_aTexte["2_text_text"][S_nSprache]);
            				
                                rw += '<br/><br/><br/>\n';
                            rw += '<\/div>\n';
                            rw += '<!-- Blindennavigation: Anfang -->\n';
                                rw += '<div class="unsichtbar">\n';
                                    rw += wom_html(WOMT_aTexte["2_bn_hinweis_legende"][S_nSprache]);
                                rw += '<\/div>\n';
                            rw += '<!-- Blindennavigation: Ende -->\n';
                            rw += '<div class="legende">\n';
                                rw += '<div class="legend_green">'+wom_html(WOMT_aTexte["2_legende_stimmezu"][S_nSprache])+'<\/div>\n';
                                rw += '<div class="legend_red">'+wom_html(WOMT_aTexte["2_legende_stimmenichtzu"][S_nSprache])+'<\/div>\n';
                                rw += '<div class="legend_grey">'+wom_html(WOMT_aTexte["2_legende_neutral"][S_nSprache])+'<\/div>\n';
                                rw += '<div class="legend_white">'+wom_html(WOMT_aTexte["2_legende_uebersprungen"][S_nSprache])+'<\/div>\n';
                							
                            rw += '<\/div>\n';
                            rw += '<div class="clear">&nbsp;<\/div>\n';
                        rw += '<\/div>\n';

                        rw += '<div id="weight_table">\n';

                        rw += '<!-- Blindennavigation: Anfang -->\n';
            	            rw += '<div class="unsichtbar">\n';
                	            rw += wom_html(WOMT_aTexte["2_bn_hinweis"][S_nSprache]);
            	            
                            rw += '<\/div>\n';
                        rw += '<!-- Blindennavigation: Ende -->\n';

                        rw += '<div class="tablebg1">\n';
                            rw += '<span class="headcol2">'+wom_html(WOMT_aTexte["2_tabelle_these"][S_nSprache])+'<\/span>\n';
                            rw += '<span class="headcol3">'+wom_html(WOMT_aTexte["2_tabelle_position"][S_nSprache])+'<\/span>\n';
                            rw += '<span class="headcol4">'+wom_html(WOMT_aTexte["2_tabelle_auswahl"][S_nSprache])+'<\/span>\n';
                            rw += '<div class="clear">&nbsp;<\/div>\n';
                        rw += '<\/div>\n';
								checked = '';
                                if (CONST_GEWICHTUNG == 1) {
								    ct = WOMT_nThesen;
							    } else {
								    ct = WOMT_nThemen;
							    }
							    for (a = 0; a < ct; a++) {
							    	nr = (a+1);
							    	if (nr < 10){
							    		//nr = "0"+nr;
							    	}
							    	if (S_aThemen[a] == 1) {
							    		checked = ' checked="checked" ';
							    	} else {
							    		checked = "";
							    	}
									rw += '\n<div class="tablebg';
									if ((a%2)==1){
										rw += '1';
									} else {
										rw += '2';
									}
    									rw += '">\n';
                                        rw += '<div class="contcol_txt">\n';
                                        rw += '<label for="checkbox'+nr+'" style="display:none;">';
                                        lText = wom_html(WOMT_aThesen[a][S_nSprache][0]);
                                        rw += lText.replace("- ","");
                                        rw += '<\/label> <a href="#" class="tt">';
                                        lText = wom_html(WOMT_aThesen[a][S_nSprache][0]);
                                        rw += lText.replace("- ","");
                                        rw += ' <span class="tooltip"><span class="middle gewichtung">\n';
                                            rw += wom_html(WOMT_aThesen[a][S_nSprache][1]);
                                        rw += '<\/span><\/span><\/a>\n';
                                    rw += '<\/div>\n';
                                    


                                    ti = '';
                                    tt = '';
								    switch(S_aThesen[a]){
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
                                    rw += '<div class="check_'+ti+'" title="'+wom_titletag(tt)+'"><span class="unsichtbar">'+wom_html(tt)+'<\/span><\/div>\n';
                                    rw += '<div class="contcol_check"><input type="checkbox" id="checkbox'+nr+'" '+checked+' name="cb_themen_'+a+'" value="1" tabindex="'+(14+a)+'" /><\/div>\n';
                                    rw += '<div class="clear">&nbsp;<\/div>\n';
                                    rw += '<\/div>\n';
						    								    	
							    } 
                rw += '<\/div>\n';
                
                rw += '<div class="buttons_neu">\n';
                    rw += '<div class="buttons_links">\n';
                        rw += '<div class="button">\n';
                            rw += '<a class="button_zurueck" href="" onclick="change_frage('
        							+ (WOMT_nThesen - 1)
        							+ ');'
        							+ ';return false;" tabindex="91" title="'
        							+ wom_titletag(WOMT_aTexte["2_btn_zurueck_title"][S_nSprache])
        							+'">'
        							+wom_html(WOMT_aTexte["2_btn_zurueck_text"][S_nSprache])
        							+' <span>&nbsp;<\/span><\/a>\n';
                        rw += '<\/div>\n';
                        rw += '<div class="clear">\n';
                            rw += '&nbsp;\n';
                        rw += '<\/div>\n';
                    rw += '<\/div>\n';
                    rw += '<div class="buttons_rechts">\n';
                        rw += '<div class="button"> <a class="button_weiter" href="" onclick="ergebnis();return false;" tabindex="90" title="'
        							+wom_titletag(WOMT_aTexte["2_form_submit_text"][S_nSprache])
        							+'"><span>&nbsp;<\/span> '
        							+wom_html(WOMT_aTexte["2_form_submit_text"][S_nSprache])
        							+'<\/a>\n';
						rw += '<\/div>\n';
						rw += '<div class="clear">\n';
                            rw += '&nbsp;\n';
                        rw += '<\/div>\n';
                    rw += '<\/div>\n';
                    
                rw += '<\/div>\n';
                rw += '<div class="clear">    <\/div>\n';


                rw += '<\/div>\n';
            rw += '<\/div>\n';
        rw += '<\/div>\n';
        rw += '<div id="content_foot_w_schatten">&nbsp;<\/div>\n';
        rw += '<!-- Blindennavigation: Anfang -->\n';
            rw += '<div class="unsichtbar">\n';
                rw += '<ul>\n';
                    rw += '<li><a href="#main" tabindex="730" title="">'+wom_html(WOMT_aTexte["a_bn_seitenstart_text"][S_nSprache])+'<\/a><\/li>\n';
                    rw += '<li><a href="#content_center_w" tabindex="731" title="">'+wom_html(WOMT_aTexte["2_bn_thesengewichtung_text"][S_nSprache])+'<\/a><\/li>\n';
                rw += '<\/ul>\n';
            rw += '<\/div>\n';
        rw += '<!-- Blindennavigation: Ende -->\n';

            rw += '<\/div>\n';  // main_wm_sub_w

			rw += '<\/form>\n';

        rw += '<\/div>\n';  // main_wm

		rw += print_main_foot();
    rw += '<\/div>\n';  // main
    

					
	return rw;
}
