

	
function parteiergebnis() {
    ct = WOMT_nParteien;
    for (a = 0; a < ct; a++) {
        val = 'cb_parteien_' + a;
        if (document.forms['themen'].elements[val].checked == true) {
            set_partei_ausgewaehlt(a,1);
        } else {
            set_partei_ausgewaehlt(a,0);
        }
    }
    S_ParteiFehler = 0;
    if (GetParteienAusgewaehlt()<1){
        // Auf sich selbst setzen!
        replaceIFrame(3);
        S_ParteiFehler = 1;
    } else if (GetParteienAusgewaehlt()>CONST_PARTEIENAUSWAHL_MAX){
        replaceIFrame(3);
    } else {
        replaceIFrame(4);
    }
}

function write_3_parteiauswahl(){
    keyTab = 0;
    
    b=S_nTheseAktuell+1;
    
    rw = '';

    rw += '<div class="wom_main_wrapper' + msl_get_view_class() + '" id="wom">';
        rw += '<ul class="wom_anchormenu">';
           rw += '<li><a href="#bnmainheader">' 
                + wom_html(WOMT_aTexte["3_bn_parteiauswahl_text"][S_nSprache]) 
                + '<\/a><\/li>';
           rw += '<li><a href="#bnbreadcrumb">' 
                + wom_html(WOMT_aTexte["a_bn_breadcrumb_text"][S_nSprache]) 
                + '<\/a><\/li>';
           rw += '<li><a href="#bnskip">Schritt vor oder zur&uuml;ck<\/a><\/li>';
           rw += '<li><a href="#bnleftnavi">' 
                + wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache]) 
                + '<\/a><\/li>';
        rw += '<\/ul>';
        rw += print_main_head();
         
        rw += '<div class="wom_wrapper">';
            rw += '<div class="wom_content" id="content">';
                rw += print_top_nav(3);
                rw += '<main class="wom_main_content">';
                    rw += '<div class="wom_phone-header">';
                        rw += '<a class="wom_link-back" href="" onclick="replaceIFrame(2);return false;" title="'
                                + wom_titletag(WOMT_aTexte["3_btn_zurueck_title"][S_nSprache])
                            + '">'
                                + wom_html(WOMT_aTexte["3_btn_zurueck_text"][S_nSprache])
                            + '<\/a>';
                        rw += '<img class="wom_logo" alt="'
                                + wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache])
                            + '" src="media/pix/bildmarke_wom_schwarz.svg" />';
                        rw += '<a title="'
                                + wom_titletag(WOMT_aTexte["nav_startseite"][S_nSprache])
                            + '" href="main_app.html"  class="wom_link-home">'
                                + wom_html(WOMT_aTexte["nav_startseite"][S_nSprache])
                            + '<\/a>';
                    rw += '<\/div>';
					rw += '<nav class="wom_breadcrumb" id="bnbreadcrumb">';
						rw += '<a href="" onclick="change_frage('
							+ (WOMT_nThesen - 1)
							+ ');'
							+ ';return false;">'
                            + wom_html(WOMT_aTexte["bc_1_thesen"][S_nSprache])
                            + '<\/a>';
						rw += '<ul class="wom_breadcrumb_list">';
							rw += '<li class="wom_first_position wom_active"><a href="" onclick="replaceIFrame(2);return false;">'
                                + wom_html(WOMT_aTexte["bc_2_gewichtung"][S_nSprache])
                            + '<\/a><\/li>';
							rw += '<li class="wom_active" aria-label="'
                                + wom_titletag(WOMT_aTexte["bc_hier"][S_nSprache] + ' ' +  WOMT_aTexte["bc_3_partei"][S_nSprache]) 
                                    + '"><strong>'
                                + wom_html(WOMT_aTexte["bc_3_partei"][S_nSprache])
                            + '<\/strong><\/li>';
						rw += '<\/ul>';
						rw += '<div class="wom_clear">&nbsp;<\/div>';
					rw += '<\/nav>';

                    rw += '<div class="wom_header-margin wom_header-margin-parteiauswahl"><\/div>';
                    rw += '<div class="wom_clear"><\/div>';
                    rw += '<header>';
                        rw += '<h1 id="bnmainheader">' + wom_html(WOMT_aTexte["3_titel_text"][S_nSprache]) + '<\/h1>';
                        rw += '<p style="padding-bottom:10px;margin-bottom:20px">'
                            + wom_html(WOMT_aTexte["3_text_oben"][S_nSprache]);
                        rw += '<\/p>';
                    rw += '<\/header>';
	    				    
                    rw += '<p aria-live="polite" class="wom_partei_meldung"><span id="wom_fehlertext" style="display:block;height:40px;">';
                            lText = get_text_from(GetParteienAusgewaehlt(),CONST_PARTEIENAUSWAHL_MIN,CONST_PARTEIENAUSWAHL_MAX);
                            rw += wom_html(lText);                         
                        				    
                        rw += '<\/span>';
                    rw += '<\/p>';
                    rw += '<form class="wom_parteien" enctype="multipart/form-data" id="formparteiauswahl" name="themen" method="get" action="main_app.html">\n';
                        rw += '<input type="hidden" name="cb_parteien" value="change" />';  
                        rw += '<fieldset id="bnparteiauswahl">';    
                            rw += '<legend aria-describedby="legend-desc">' + wom_html(WOMT_aTexte["3_text_imparlament"][S_nSprache]) + '<\/legend>\n';
                            rw += '<ul class="wom_parteien_list" role="tablist" style="display:block;">';
    
                                    lCount = 0;
                                    for (a = 0;a<WOMT_nParteien;a++){
                                        if (WOMT_aParteiFix[a]==1){
                                            lFixKey = a;
                                            lPid = WOMT_aParteien_N2ID[lFixKey];
                                            lCheckBox  = '';
                                            labelClass = '';
                                            if (S_aParteienAusgewaehlt [lFixKey]==1) {
                                                lCheckBox  = ' checked="checked" ';
                                                labelClass = 'class="wom_on" ';
                                            }
                                            bNr = (lCount%5)+1;
                                            if (bNr < 10) {
                            			        bNr = '0' + bNr;
                            			    }
            
                                            rw += '<li class="wom_partei_' + bNr + ' wom_box ';
                                            if ((lCount % 5) == 4) {
                                                rw += ' wom_box_5th';
                                            } 
                                            if ((lCount % 4) == 3) {
                                                rw += ' wom_box_4th';
                                            }
                    
                                            rw += '" role="tab">';
                                            
                                            rw += '<label id="wom-label-' + lFixKey + '" ' + labelClass + 'for="cb_parteien_' + lFixKey + '" style="line-height:0px" tabindex="-1">';
                                                rw += '<img class="wom_grayfilter wom_grayfilter_edge wom_grayfilter_over" src="' 
                                                        + WOMT_aParteienLogos[lFixKey][0] 
                                                    + '" alt="'
                                                        + wom_titletag(WOMT_aTexte["3_parteien_logovon"][S_nSprache]) 
                                                        + ' ' 
                                                        + wom_titletag(WOMT_aParteien[lFixKey][S_nSprache][1]) 
                                                    + '" title="' 
                                                        + wom_titletag(WOMT_aParteien[lFixKey][S_nSprache][0]) 
                                                    + '" />'
                                            rw += '<\/label>';
                                            rw += '<div class="wom_partei_openclose_outer">';
                                                rw += '<div class="wom_partei_openclose" id="wom-tabpanel-' + lFixKey + '-oc" role="tab" aria-controls="wom-tabpanel-' + lFixKey + '">';
                                                    rw += '<span class="wom_partei_open"><span class="v-hidden">';
                                                                text2 = WOMT_aTexte["3_parteiauswahl_einblenden"][S_nSprache];
                                                                rw += wom_html(text2.replace('[PARTEI]',WOMT_aParteien[lFixKey][S_nSprache][1]));
                                                            rw += '<\/span><img src="./media/pix/icon/arrow_bottom_thin.svg" alt="';
                                                                text2 = WOMT_aTexte["3_parteiauswahl_einblenden"][S_nSprache];
                                                                rw += wom_titletag(text2.replace('[PARTEI]',WOMT_aParteien[lFixKey][S_nSprache][1]));
                                                            rw += '" /><\/span><span class="wom_partei_close"><span class="v-hidden">'
                                                            text2 = WOMT_aTexte["3_parteiauswahl_ausblenden"][S_nSprache];
                                                            rw += wom_html(text2.replace('[PARTEI]',WOMT_aParteien[lFixKey][S_nSprache][1]));
                                                        rw += '<\/span><img src="./media/pix/icon/arrow_top_large.svg" alt="';
                                                            text2 = WOMT_aTexte["3_parteiauswahl_ausblenden"][S_nSprache];
                                                            rw += wom_titletag(text2.replace('[PARTEI]',WOMT_aParteien[lFixKey][S_nSprache][1]));
                                                        rw += '" /><\/span><\/div>';
                                                rw += '<input style="display:block;visibility: visible;" type="checkbox" onchange="count_check_box()"'
                                                    + ' onclick="count_check_box()" id="cb_parteien_' 
                                                    + lFixKey + '" name="cb_parteien_' 
                                                    + lFixKey + '" ' 
                                                    + lCheckBox 
                                                    + ' class="wom_hidecheckbox2" value="1" tabindex="0" />';
                                            rw += '<\/div>';

                                            rw += '<div aria-hidden="true" aria-describedby="wom-label-' 
                                                + lFixKey 
                                                + '" id="wom-tabpanel-' 
                                                + lFixKey + '" role="tabpanel" class="wom_pbox wom_pbox_org">';
                                                rw += '<h2>';
                                                    rw += wom_html(WOMT_aParteien[lFixKey][S_nSprache][0]);
                                                rw += '<\/h2>';
                                                rw += '<p>';
                                                    rw += wom_html(WOMT_aParteienBeschreibung[lFixKey][S_nSprache]);
                                                    rw += '<br/>';
                                                    if ((CONST_WOMT_CDUCSU == 1) && (lFixKey == CONST_WOMT_CDUCSU_NR)) {
                                                        rw += '<a tabindex="0" href="' + CONST_WSZW_URL + '?partei=' 
                                                            + lPid + '&amp;s=1" target="_blank" title="';
                                                            text2 = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                                            text2 = text2.replace('[PARTEI]','CDU');
                                                            rw += wom_titletag(text2); 
                                                         rw += '" class="wom_more_info">' 
                                                            + wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) 
                                                            + ' CDU<\/a><br/>';
                                                         rw += '<a tabindex="0" href="' + CONST_WSZW_URL + '?partei=' 
                                                                + lPid + '&amp;s=2" target="_blank" title="'; 
                                                                text2 = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                                                text2 = text2.replace('[PARTEI]','CSU');
                                                                rw += wom_titletag(text2); 
                                                         rw += '" class="wom_more_info">' 
                                                            + wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) 
                                                            + ' CSU<\/a>';
                                                    } else {
                                                         rw += '<a tabindex="0" href="' + CONST_WSZW_URL + '?partei=' + lPid + '" target="_blank" title="';
                                                            lText = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                                            lText = lText.replace(/\[PARTEI\]/, WOMT_aParteien[lFixKey][S_nSprache][1]);
                                                            rw +=  wom_titletag(lText); 
                                                        rw += '" class="wom_more_info">';
                                                        rw += wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) + '<\/a>';
                                                    }
                                                rw += '<\/p>';
                                                rw += '<button id="wom-tabpanel-' + lFixKey + '-button" type="button" class="wom_close" title="'
                                                    + wom_titletag(WOMT_aTexte["3_text_partei_close"][S_nSprache]) 
                                                    + '">';
                                                    rw += '<span class="v-hidden">' + wom_html(WOMT_aTexte["3_text_partei_close"][S_nSprache]) + '<\/span><\/button>';
                                            rw += '<\/div><\/li>\n';
                                            lCount++;
                                        }
                                    }
                                
                            rw += '<\/ul>\n';
                            rw += '<div class="wom_clear"><\/div>'; 
                        rw += '<\/fieldset>\n';
                        rw += '<div class="wom_clear"><\/div>'; 
                        rw += '<fieldset>'; 
                            rw += '<legend aria-describedby="legend-desc">'
                                + wom_html(WOMT_aTexte["3_text_weitere"][S_nSprache]) + '<\/legend>';
                            rw += '<ul class="wom_parteien_list" role="tablist">';
    
                                lCount = 0;
                                
                                for (a = 0;a<WOMT_nParteien;a++){
                                    if (WOMT_aParteiFix[a]==0){
                                        lFixKey = a;
                                            lPid = WOMT_aParteien_N2ID[lFixKey];
                                            lCheckBox  = '';
                                            labelClass = '';
                                            if (S_aParteienAusgewaehlt [lFixKey]==1) {
                                                lCheckBox  = ' checked="checked" ';
                                                labelClass = 'class="wom_on" ';
                                            }
                                            bNr = (lCount%5)+1;
                                            if (bNr < 10) {
                            			        bNr = '0' + bNr;
                            			    }
            
                                            rw += '<li class="wom_partei_' + bNr + ' wom_box ';
                                            if ((lCount % 5) == 4) {
                                                rw += ' wom_box_5th';
                                            } 
                                            if ((lCount % 4) == 3) {
                                                rw += ' wom_box_4th';
                                            }
                    
                                            rw += '" role="tab">';
                                                rw += '<label id="wom-label-' + lFixKey + '" ' + labelClass + 'for="cb_parteien_' + lFixKey + '" style="line-height:0px" tabindex="-1">';
                                                    rw += '<img class="wom_grayfilter wom_grayfilter_edge wom_grayfilter_over" src="' 
                                                            + WOMT_aParteienLogos[lFixKey][0] 
                                                        + '" alt="'
                                                            + wom_titletag(WOMT_aTexte["3_parteien_logovon"][S_nSprache]) 
                                                            + ' ' 
                                                            + wom_titletag(WOMT_aParteien[lFixKey][S_nSprache][1]) 
                                                        + '" title="' 
                                                            + wom_titletag(WOMT_aParteien[lFixKey][S_nSprache][0]) 
                                                        + '" />'
                                                rw += '<\/label>';
                                                rw += '<div class="wom_partei_openclose_outer">';
                                                    rw += '<div class="wom_partei_openclose" id="wom-tabpanel-' + lFixKey + '-oc" role="tab" aria-controls="wom-tabpanel-' + lFixKey + '">';
                                                        rw += '<span class="wom_partei_open"><span class="v-hidden">';
                                                                    text2 = WOMT_aTexte["3_parteiauswahl_einblenden"][S_nSprache];
                                                                    rw += wom_html(text2.replace('[PARTEI]',WOMT_aParteien[lFixKey][S_nSprache][1]));
                                                                rw += '<\/span><img src="./media/pix/icon/arrow_bottom_thin.svg" alt="';
                                                                    text2 = WOMT_aTexte["3_parteiauswahl_einblenden"][S_nSprache];
                                                                    rw += wom_titletag(text2.replace('[PARTEI]',WOMT_aParteien[lFixKey][S_nSprache][1]));
                                                                rw += '" /><\/span><span class="wom_partei_close"><span class="v-hidden">'
                                                                text2 = WOMT_aTexte["3_parteiauswahl_ausblenden"][S_nSprache];
                                                                rw += wom_html(text2.replace('[PARTEI]',WOMT_aParteien[lFixKey][S_nSprache][1]));
                                                            rw += '<\/span><img src="./media/pix/icon/arrow_top_large.svg" alt="';
                                                                text2 = WOMT_aTexte["3_parteiauswahl_ausblenden"][S_nSprache];
                                                                rw += wom_titletag(text2.replace('[PARTEI]',WOMT_aParteien[lFixKey][S_nSprache][1]));
                                                            rw += '" /><\/span><\/div>';
                                                    rw += '<input style="display:block;visibility: visible;" type="checkbox" onchange="count_check_box()"'
                                                        + ' onclick="count_check_box()" id="cb_parteien_' 
                                                        + lFixKey + '" name="cb_parteien_' 
                                                        + lFixKey + '" ' 
                                                        + lCheckBox 
                                                        + ' class="wom_hidecheckbox2" value="1" tabindex="0' 
                                                        + '" />';
                                                rw += '<\/div>';

                                                rw += '<div aria-hidden="true" aria-describedby="wom-label-' 
                                                    + lFixKey 
                                                    + '" id="wom-tabpanel-' 
                                                    + lFixKey + '" role="tabpanel" class="wom_pbox wom_pbox_org">';
                                                    rw += '<h2>';
                                                        rw += wom_html(WOMT_aParteien[lFixKey][S_nSprache][0]);
                                                    rw += '<\/h2>';
                                                    rw += '<p>';
                                                        rw += wom_html(WOMT_aParteienBeschreibung[lFixKey][S_nSprache]);
                                                        rw += '<br/>';
                                                         rw += '<a tabindex="0" href="' + CONST_WSZW_URL + '?partei=' + lPid + '" target="_blank" title="';
                                                            lText = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                                            lText = lText.replace(/\[PARTEI\]/, WOMT_aParteien[lFixKey][S_nSprache][1]);
                                                            rw +=  wom_titletag(lText); 
                                                        rw += '" class="wom_more_info">';
                                                        rw += wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) + '<\/a>';
                                                    rw += '<\/p>';
                                                    rw += '<button id="wom-tabpanel-' + lFixKey + '-button" type="button" class="wom_close" title="'
                                                        + wom_titletag(WOMT_aTexte["3_text_partei_close"][S_nSprache]) 
                                                        + '">';
                                                        rw += '<span class="v-hidden">' + wom_html(WOMT_aTexte["3_text_partei_close"][S_nSprache]) + '<\/span><\/button>';
                                                rw += '<\/div><\/li>\n';
                                            lCount++;
                                    }
                                }
                            
                            rw += '<\/ul>';
    					    rw += '<div class="wom_clear"><\/div>';
				        rw += '<\/fieldset>';
			    		rw += '<div class="wom_clear"><\/div>';
		    			rw += '<p class="wom_small_p" id="legend-desc">' 
	    				    + wom_html(WOMT_aTexte["3_text_unten"][S_nSprache]) 
    					    + '<\/p>';
    					rw += '<div class="wom_skip" id="bnskip">';
        					rw += '<a href="" onclick="replaceIFrame(\'2\');return false;" class="wom_previous" title="' 
                                + wom_titletag(WOMT_aTexte["3_btn_zurueck_title"][S_nSprache]) + '">' 
                                + wom_html(WOMT_aTexte["3_btn_zurueck_text"][S_nSprache])
                                + '<\/a>';
                            rw += '<input type="submit" class="wom_next" onclick="parteiergebnis();return false;"  value="' 
                                + wom_titletag(WOMT_aTexte["3_form_submit_text"][S_nSprache]) 
                                + '" title="' + wom_titletag(WOMT_aTexte["3_form_submit_title"][S_nSprache]) 
                                + '" />';
    					rw += '<\/div>';
                    rw += '<\/form>';
                rw += '<\/main>';
            rw += '<\/div>';
        rw += '<div class="wom_clear"><\/div>';
		    rw += print_main_foot();
        rw += '<\/div>';
    rw += '<\/div>';
    rw += print_ivw_footer();
    return rw;
}

			        
function count_check_box(){
    lCount = 0;
    for(a = 0;a<WOMT_nParteien;a++){
        lCheckboxName = 'cb_parteien_'+a;
        lCheckbox = document.getElementById(lCheckboxName);
        if (lCheckbox){
            if (lCheckbox.checked){
                lCount++;
            }
        }
    }
    parteien_selected = lCount;
    mainFehlerText = get_text_from(parteien_selected,CONST_PARTEIENAUSWAHL_MIN,CONST_PARTEIENAUSWAHL_MAX);
    put_text(mainFehlerText);
}

function get_text_from(pSelected,pMin,pMax){
    
    text_partei_xvony           = WOMT_aTexte["3_text_partei_xvony"][S_nSprache];
    text_partei_zuwenige        = WOMT_aTexte["3_text_partei_zuwenige"][S_nSprache];
    text_partei_zuviele_eine    = WOMT_aTexte["3_text_partei_zuviele_eine"][S_nSprache];
    text_partei_zuviele         = WOMT_aTexte["3_text_partei_zuviele"][S_nSprache];

    
    if (pSelected<pMin){
        lNewText = text_partei_zuwenige+"<span class='counter'>&nbsp;<\/span><br\/><br\/>";
        return lNewText;
    }
    if ((pSelected>=pMin)&&(pSelected<=pMax)){
        lNewText = text_partei_xvony+"<br\/><br\/>";
        lNewText = lNewText.replace(/\[ANZAHL\]/g,pSelected);
        lNewText = lNewText.replace(/\[PARTEIMAX\]/g,pMax);
        return lNewText;
    }
    if (pSelected==pMax+1){
        lNewText = text_partei_zuviele_eine+"<br\/><br\/>";
        lNewText = lNewText.replace(/\[ANZAHL\]/g,(pSelected-pMax));
        return lNewText;
    }	    				            
    lNewText = text_partei_zuviele+"<br\/><br\/>";
    lNewText = lNewText.replace(/\[ANZAHL\]/g,(pSelected-pMax));
    return lNewText;
}


function put_text(lFehlerText){
    lFehlerTextDiv = document.getElementById('wom_fehlertext');	    				            
    if (lFehlerTextDiv){
        lFehlerTextDiv.innerHTML = lFehlerText;
    }
}
