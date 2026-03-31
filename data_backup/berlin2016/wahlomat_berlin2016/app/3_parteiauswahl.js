

	
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
    b=S_nTheseAktuell+1;
    
    rw = '';

    rw += '<div class="wom_main_wrapper' + msl_get_view_class() + '" id="wom">';
        rw += print_main_head();
        
    rw += '<!-- Blindennavigation: Anfang -->';
    rw += '<div class="wom_unsichtbar" id="bnseitenstart">';
    rw += '<ul>';
    rw += '<li><a href="#bnparteiauswahl" tabindex="10" title="">' + wom_html(WOMT_aTexte["3_bn_parteiauswahl_text"][S_nSprache]) + '<\/a><\/li>';
    rw += '<li><a href="#bnbreadcrumb" tabindex="11" title="">' + wom_html(WOMT_aTexte["a_bn_breadcrumb_text"][S_nSprache]) + '<\/a><\/li>';
    rw += '<li><a href="#bnleftnavi" tabindex="12" title="">' + wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache]) + '<\/a><\/li>';
    rw += '<\/ul>';
    rw += '<\/div>';
    rw += '<!-- Blindennavigation: Ende -->';
    
    rw += '<!-- Blindennavigation: Ende -->';      
        rw += '<div class="wom_wrapper">';
            rw += '<div class="wom_content" id="content">';
                rw += print_top_nav(3);
                    rw += '<div class="wom_main_content">';
            
                        rw += '<div class="wom_phone-header">';
                            rw += '<a title="'
                                    + wom_titletag(WOMT_aTexte["3_btn_zurueck_title"][S_nSprache])
                                + '" href="" onclick="replaceIFrame(2);return false;" class="wom_link-back" tabindex="15">'
                                    + wom_html(WOMT_aTexte["3_btn_zurueck_text"][S_nSprache])
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
                                							+ ';return false;" tabindex="11">' + wom_html(WOMT_aTexte["bc_1_thesen"][S_nSprache]) + '<\/a>';
                            rw += '<ul class="wom_breadcrumb_list">';
                                rw += '<li class="wom_first_position wom_active"><a href="" onclick="replaceIFrame(2);return false;" tabindex="12">' + wom_html(WOMT_aTexte["bc_2_gewichtung"][S_nSprache]) + '<\/a><\/li>';
                                rw += '<li class="wom_active">' + wom_html(WOMT_aTexte["bc_3_partei"][S_nSprache]) + '<\/li>';
                                rw += '<li>' + wom_html(WOMT_aTexte["bc_4_ergebnis"][S_nSprache]) + '<\/li>';
                                rw += '<li>' + wom_html(WOMT_aTexte["bc_5_begruendungen"][S_nSprache]) + '<\/li>';
                            rw += '<\/ul>';
    						rw += '<div class="wom_clear">&nbsp;<\/div>';			
    					rw += '<\/div>';
					


                        rw += '<div class="wom_header-margin wom_header-margin-parteiauswahl"><\/div>';
    					rw += '<div class="wom_clear"><\/div>';
        				rw += '<h1>' + wom_html(WOMT_aTexte["3_titel_text"][S_nSprache]) 
    				        + '<\/h1>';
    
                        rw += '<p style="padding-bottom:10px;margin-bottom:20px">';
                            rw += wom_html(WOMT_aTexte["3_text_oben"][S_nSprache]);
                            rw += '<br/><br/>';
                        	    				    
                        rw += '<span id="wom_fehlertext" style="display:block;height:40px;">';
                                lText = get_text_from(GetParteienAusgewaehlt(),CONST_PARTEIENAUSWAHL_MIN,CONST_PARTEIENAUSWAHL_MAX);
                                rw += wom_html(lText);                         
                        				    
                                rw += '<\/span>';
                       rw += '<\/p>';
   
   
    	    				    
                        rw += '<form class="wom_parteien" enctype="multipart/form-data" name="themen" method="get" action="main_app.html">\n';
                        rw += '<input type="hidden" name="cb_parteien" value="change" />';
                                        
                        rw += '<p>' + wom_html(WOMT_aTexte["3_text_imparlament"][S_nSprache]) + '<\/p>';
                        rw += '<!-- Blindennavigation: Anfang -->';
                        rw += '<div class="wom_unsichtbar">';
                    	       rw += wom_html(WOMT_aTexte["3_bn_hinweis"][S_nSprache]);
                        rw += '<\/div>';
                        rw += '<!-- Blindennavigation: Ende -->';		
                        rw += '<ul class="wom_parteien_list" id="bnparteiauswahl" role="tablist" style="display:block;">';
                        tabIndex = 0;
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
                                rw += '<label ' + labelClass + 'for="cb_parteien_' + lFixKey + '" tabindex="'
                                        + (20+tabIndex*3)
                                        + '" >';
                                rw += '<img class="wom_grayfilter wom_grayfilter_over" src="' 
                                            + WOMT_aParteienLogos[lFixKey][0] 
                                        + '" alt="'
                                            + wom_titletag(WOMT_aTexte["3_parteien_logovon"][S_nSprache]) 
                                            + ' ' 
                                            + wom_titletag(WOMT_aParteien[lFixKey][S_nSprache][1]) 
                                        + '" title="' 
                                            + wom_titletag(WOMT_aParteien[lFixKey][S_nSprache][0]) 
                                        + '" />';
                                rw += '<\/label>';
                                rw += '<input style="display:block;visibility: visible;" type="checkbox" onchange="count_check_box()" onclick="count_check_box()" id="cb_parteien_' 
                                        + lFixKey + '" name="cb_parteien_' 
                                        + lFixKey + '" ' 
                                        + lCheckBox 
                                        + ' class="wom_hidecheckbox" value="1" tabindex="-1' 
                                        //+ (20+tabIndex*3+1) 
                                        + '" /><div class="wom_pbox"><span class="wom_box_pfeil">&nbsp;<\/span><h2>'; 
                                rw += wom_html(WOMT_aParteien[lFixKey][S_nSprache][0]);
                                rw += '<\/h2><p>';
                                rw += wom_html(WOMT_aParteienBeschreibung[lFixKey][S_nSprache]);
    					        rw += '<br/>';
    					        
                                 rw += '<a href="' + CONST_WSZW_URL + '?partei=' 
                                    + lPid + '" target="_blank" title="';
                                 lText = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                 lText = lText.replace(/\[PARTEI\]/, WOMT_aParteien[lFixKey][S_nSprache][1]);
                                 rw +=  wom_titletag(lText); 
                                 rw += '" class="wom_more_info" tabindex="' + (20+tabIndex*3+2) + '">' 
                                    + wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) 
                                    + '<\/a>';
                                rw += '<\/p><span class="wom_close">&nbsp;<\/span><\/div><\/li>';
                                lCount++;
                                tabIndex++;
                            }
                        }
                        
                        rw += '<\/ul>'; 
                        rw += '<div class="wom_clear"><\/div>'; 
                        rw += '<p>' + wom_html(WOMT_aTexte["3_text_weitere"][S_nSprache]) + '<\/p>'; 
                        rw += '<ul class="wom_parteien_list">'; 
                        lCount = 0;
                        
                        for (a = 0;a<WOMT_nParteien;a++){
                            if (WOMT_aParteiFix[a]==0){
                                lFixKey = a;
                                lPid = WOMT_aParteien_N2ID[lFixKey];
                                lCheckBox = '';
                                labelClass = '';
                                
                                if (S_aParteienAusgewaehlt[lFixKey]==1) {
                                    lCheckBox = ' checked="checked" ';
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
                            rw += '<label ' + labelClass 
                                    + 'for="cb_parteien_' + lFixKey + '" tabindex="'
                                        + (20+tabIndex*3)
                                        + '" >';
                            rw += '<img class="wom_grayfilter wom_grayfilter_over" style="border:0px;" src="' 
                                    + WOMT_aParteienLogos[lFixKey][0] 
                                    + '" alt="'
                                        + wom_titletag(WOMT_aTexte["3_parteien_logovon"][S_nSprache]) 
                                        + ' ' 
                                        + wom_titletag(WOMT_aParteien[lFixKey][S_nSprache][1]) + '" title="' 
                                    + wom_titletag(WOMT_aParteien[lFixKey][S_nSprache][0]) + '" />';
                            rw += '<\/label>';
                            rw += '<input style="display:block;visibility: visible;" '
                                + 'type="checkbox" '
                                + 'onchange="count_check_box()" '
                                + 'onclick="count_check_box()" '
                                + 'id="cb_parteien_' + lFixKey + '" '
                                + 'name="cb_parteien_' + lFixKey + '" '
                                + '' + lCheckBox + ' '
                                + 'class="wom_hidecheckbox" '
                                + 'value="1" '
                                + 'tabindex="-1" '
                                + '/><div class="wom_pbox"><span class="wom_box_pfeil">&nbsp;<\/span> '
                                + '<h2>';
                                
                                rw += wom_html(WOMT_aParteien[lFixKey][S_nSprache][0]);
                                
                                rw += '<\/h2>';
                                rw += '<p>' + wom_html(WOMT_aParteienBeschreibung[lFixKey][S_nSprache]);
                                rw += '<br/>';
                                rw += ' <a href="' + CONST_WSZW_URL + '?partei=' + lPid + '" target="_blank" title="';
                                                                 lText = WOMT_aTexte["3_mehr_informationen_title"][S_nSprache];
                                                                 lText = lText.replace(/\[PARTEI\]/,WOMT_aParteien[lFixKey][S_nSprache][1]);
                                        rw += wom_titletag(lText);
                                        rw += '" class="wom_more_info" tabindex="' + (20+tabIndex*3+2) + '">' 
                                                + wom_html(WOMT_aTexte["3_mehr_informationen_text"][S_nSprache]) + '<\/a>';
                                        rw += '<\/p><span class="wom_close">&nbsp;<\/span><\/div><\/li>';
                                                        lCount++;
                                                        tabIndex++;
                                
                            }
                        }
                        
    rw += '<\/ul>';
    rw += '<div class="wom_clear"><\/div>';
        rw += '<p class="wom_small_p">' + wom_html(WOMT_aTexte["3_text_unten"][S_nSprache]) + '<\/p>';
        rw += '<div class="wom_skip">';
            rw += '<a href="" onclick="replaceIFrame(\'2\');return false;" class="wom_previous" title="' 
                + wom_titletag(WOMT_aTexte["3_btn_zurueck_title"][S_nSprache]) + '" tabindex="151">' 
                + wom_html(WOMT_aTexte["3_btn_zurueck_text"][S_nSprache])
                + '<\/a>';
            rw += '<input type="submit" class="wom_next" onclick="parteiergebnis();return false;" value="' 
                + wom_titletag(WOMT_aTexte["3_form_submit_text"][S_nSprache]) 
                + '" title="' + wom_titletag(WOMT_aTexte["3_form_submit_title"][S_nSprache]) 
                + '" tabindex="150"/>'; 
        rw += '<\/div>';
    
    rw += '<\/form>';
    
    rw += '<\/div>';
    rw += '<\/div>';
    rw += '<div class="wom_clear"><\/div>';
    rw += '<!-- Blindennavigation: Anfang -->';
    rw += '<div class="wom_unsichtbar">';
    rw += '<ul>';
    rw += '<li><a href="#bnseitenstart" tabindex="580" title="">' + wom_html(WOMT_aTexte["a_bn_seitenstart_text"][S_nSprache]) + '<\/a><\/li>';
    rw += '<li><a href="#bnbreadcrumb" tabindex="581" title="">' + wom_html(WOMT_aTexte["a_bn_breadcrumb_text"][S_nSprache]) + '<\/a><\/li>';	
    rw += '<li><a href="#bnparteiauswahl" tabindex="582" title="">' + wom_html(WOMT_aTexte["3_bn_parteiauswahl_text"][S_nSprache]) + '<\/a><\/li>';
    rw += '<\/ul>';
    rw += '<\/div>';
    rw += '<!-- Blindennavigation: Ende -->';
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
