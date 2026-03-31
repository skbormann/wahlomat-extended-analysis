

	
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


    rw += '<div id="main">\n';

        rw += '<!-- Blindennavigation: Anfang -->\n';
            rw += '<div class="unsichtbar">\n';
                rw += '<ul>\n';
                    rw += '<li><a href="#content_center_w" tabindex="10" title="">'+wom_html(WOMT_aTexte["3_bn_parteiauswahl_text"][S_nSprache])+'<\/a><\/li>\n';
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
        
        rw += '<div style="clear:both;"></div>\n';
        rw += '<div id="main_wm">\n';
            rw += '<form enctype="multipart/form-data" name="themen" method="get" action="main_app.html">\n';
            rw += '<input type="hidden" name="cb_parteien" value="change" />\n';

            rw += '<div id="main_wm_sub">\n';




        rw += '<div id="content">\n';

        rw += '<div id="content_head_e">\n';
        rw += '<h2>'+wom_html(WOMT_aTexte["wahlomat_content_head"][S_nSprache])+'<\/h2>\n';

        rw += '<div id="content_center_e">\n';

        rw += '<h3 class="orange">'+wom_html(WOMT_aTexte["3_titel_text"][S_nSprache])+'<\/h3>\n';
        rw += '<div class="intro" style="line-height:16px;">\n';
        rw += wom_html(WOMT_aTexte["3_text_partei"][S_nSprache]);
        rw += '<br/><br/>\n';
        
        rw += '<div id="fehlertext" style="height:40px">';
             
                lText = get_text_from(GetParteienAusgewaehlt(),CONST_PARTEIENAUSWAHL_MIN,CONST_PARTEIENAUSWAHL_MAX);
                
                rw += wom_html(lText);                         
    				    
            rw += '<\/div>';
        rw += '<\/div>\n';
        rw += '<div id="parteiauswahl">\n';
        rw += '<!-- Blindennavigation: Anfang -->\n';
        rw += '<div class="unsichtbar">\n';
        rw += WOMT_aTexte["3_bn_hinweis"][S_nSprache];
        rw += '<\/div>\n';
        rw += '<!-- Blindennavigation: Ende -->\n';

        rowWidth = new Array(123,170,128);

        rw += '<div class="checkbox_border">\n';
        rw += '<div class="checkbox_top"><\/div>\n';
                                                                            
            lRow = 0;
            lFixCount = 0;
            for (a = 0;a<WOMT_nParteien;a++){
                lFixValue   = WOMT_aParteiFix[a];
                lFixKey     = a;
                if (lFixValue==1){
                    lFixCount++;
                }
            }
            /*
                Renderreihenfolge muss 
                    0->3->6 
                    1->4->7
                    2->5->8
                sein. Zuerst wird eine Spalte gerendert
            */
            lRow = 0;
            lRenderReihenfolge = new Array();
            lRenderReihenfolge[0] = new Array();
            lRenderReihenfolge[1] = new Array();
            lRenderReihenfolge[2] = new Array();
            for (a = 0;a<WOMT_nParteien;a++){
                lFixValue   = WOMT_aParteiFix[a];
                lFixKey     = a;
                if (lFixValue==1){
                    lRow = lFixKey%3;
                    lRenderReihenfolge[lRow][lRenderReihenfolge[lRow].length] = a;
                }
            }
            tabIndex = 0;
            for (lRow = 0;lRow<3;lRow++){
                rw += '<div class="parteiauswahl_col" ';
                rw += "style='width:"+rowWidth[lRow]+"px'";
                rw += '>\n';                        
                for (c = 0;c<lRenderReihenfolge[lRow].length;c++){
                    a = lRenderReihenfolge[lRow][c];
                    lFixValue   = WOMT_aParteiFix[a];
                    lFixKey     = a;
                    if (lFixValue==1){
                        //pfid = WOMT_aParteien_N2ID[lFixKey];
                        lCheckBox = '';
                        if (S_aParteienAusgewaehlt[lFixKey]==1){
                            lCheckBox = ' checked="checked" ';
                        }
                        
                        rw += '<div class="checkbox_wrap" ';
                        if (lRow==0){
                            rw += "style='width:"+rowWidth[0]+"px'";
                        } else if (lRow==1){
                            rw += "style='width:"+rowWidth[1]+"px'";
                        } else {
                            rw += "style='width:"+rowWidth[2]+"px'";
                        }
                            rw += '>\n';
                            rw += '<label style="display:none;" for="cb_parteien_'+lFixKey+'">'
                                    +wom_html(WOMT_aParteien[lFixKey][S_nSprache][1])
                                    +'<\/label>\n';
                            rw += '<input ';
                            if((lRow==1)||(lRow==2)){
                                rw += "style='margin-left:3px;'";
                            }
                        rw += ' type="checkbox" onclick="count_check_box()" id="cb_parteien_'+lFixKey+'" name="cb_parteien_'+lFixKey+'" ';
                        rw += lCheckBox;
                        rw += ' class="box_selected" value="1" tabindex="'+(18+(lFixKey*2))+'"/> ';
                        rw += '<a href="'+CONST_WSZW_URL+"?partei="+WOMT_aParteien_N2ID[lFixKey]+'&amp;ver=off" target="_blank" title="';
                             text = WOMT_aTexte["3_mehr_informationen"][S_nSprache];
                             text = text.replace(/\[PARTEI\]/,WOMT_aParteien[lFixKey][S_nSprache][1],text);
                             rw += wom_titletag(text);
                        rw += '" class="tt" tabindex="'+(18+(lFixKey*2)+1)+'">\n';
                        rw += wom_html(WOMT_aParteien[lFixKey][S_nSprache][1]);
                        
                        rw += '<span class="tooltip">\n';
                        rw += '<span class="middle">\n';
                        rw += '<b>'+wom_html(WOMT_aParteien[lFixKey][S_nSprache][1])+'<\/b><br />\n';
                        rw += wom_html(WOMT_aParteien[lFixKey][S_nSprache][0]);
                        rw += '<\/span>\n';
                        rw += '<\/span><\/a>\n';
                        rw += '<\/div>\n';
                            
                        
                        tabIndex++;
                        
                    }
                }
                if (lRow!=2){
                    rw += '<div class="clear">&nbsp;<\/div>\n';
                }
                rw += '<\/div>\n';
            }
                            
        rw += '<div class="clear">&nbsp;<\/div>\n';
        rw += '<\/div>\n';         
        rw += '<div class="clear">&nbsp;<\/div>\n'; 
        rw += '<div class="checkbox_bottom" style="height:14px;padding:0px;"><\/div>\n';

            tabIndex = 0;
            lRow = 0;
            lParteienMax = WOMT_nParteien;
            
            /*
                Renderreihenfolge muss 
                    0->3->6 
                    1->4->7
                    2->5->8
                sein. Zuerst wird eine Spalte gerendert
            */
            lRow = 0;
            lRenderReihenfolge = new Array();
            lRenderReihenfolge[0] = new Array();
            lRenderReihenfolge[1] = new Array();
            lRenderReihenfolge[2] = new Array();
            for (a = 0;a<WOMT_nParteien;a++){
                lFixValue   = WOMT_aParteiFix[a];
                lFixKey     = a;
                if (lFixValue!=1){
                    lRow = (lFixKey-lFixCount)%3;
                    lRenderReihenfolge[lRow][lRenderReihenfolge[lRow].length] = a;
                }
            }
            for (lRow = 0;lRow<3;lRow++){
                rw += '<div class="parteiauswahl_col" style="width:'+rowWidth[lRow]+'px;" > \n ';                            
                for (c = 0;c<lRenderReihenfolge[lRow].length;c++){
                    a = lRenderReihenfolge[lRow][c];                        
                    lFixValue   = WOMT_aParteiFix[a];
                    lFixKey     = a;
                    if (lFixValue!=1){
                        //pfid = WOMT_aParteien_N2ID[lFixKey];
                        lCheckBox = '';
                        if (S_aParteienAusgewaehlt[lFixKey]==1){
                            lCheckBox = ' checked="checked" ';
                        }

                                  
                        rw += '<div class="checkbox_wrap" ';
                        if (lRow==0){
                            rw += "style='width:"+rowWidth[0]+"px'";
                        } else if (lRow==1){
                            rw += "style='width:"+rowWidth[1]+"px'";
                        } else {
                            rw += "style='width:"+rowWidth[2]+"px'";
                        }
                        rw += '>\n';
                        rw += '<label style="display:none;" for="cb_parteien_'+lFixKey+'">'
                                +wom_html(WOMT_aParteien[lFixKey][S_nSprache][1])
                                +'<\/label>\n';                            
                        rw += '<input ';
                        if(lRow==1){
                            rw += "style='margin-left:3px;'";
                        } else if (lRow==2){
                            rw += "style='margin-left:3px;'";
                        }
                        rw += ' type="checkbox" onclick="count_check_box()" id="cb_parteien_'+lFixKey+'" '+lCheckBox+' name="cb_parteien_'+lFixKey+'" class="box" value="1" tabindex="'+(18+(lFixKey*2))+'"/> ';
                        rw += '<a href="'+CONST_WSZW_URL+'?partei='+WOMT_aParteien_N2ID[lFixKey]+'&amp;ver=off" target="_blank" title="';
                             text = WOMT_aTexte["3_mehr_informationen"][S_nSprache];
                             text = text.replace(/\[PARTEI\]/,WOMT_aParteien[lFixKey][S_nSprache][1],text);
                             rw += wom_titletag(text);
                        rw += '" class="tt" tabindex="'+(18+(lFixKey*2)+1)+'">'
                                +wom_html(WOMT_aParteien[lFixKey][S_nSprache][1]);
                        
                        rw += '<span class="tooltip">\n';
                        rw += '<span class="middle">\n';
                        rw += '<b>'
                                +wom_html(WOMT_aParteien[lFixKey][S_nSprache][1])
                                +'<\/b><br />'
                                +wom_html(WOMT_aParteien[lFixKey][S_nSprache][0]);
                        rw += '<\/span>\n';
                        rw += '<\/span><\/a>\n';
                        rw += '<\/div>\n';
                        tabIndex++;                                    
                    }
                }
                if (lRow!=2){
                    rw += '<div class="clear">&nbsp;<\/div>\n';
                }
                rw += '<\/div>\n';
            }
                        
        rw += '<div class="clear">&nbsp;<\/div>\n';                   
        rw += '<\/div>\n';
        rw += '<div class="buttons_neu">\n';
            rw += '<div class="buttons_links">\n';                                
                rw += '<div class="button">\n'; 
                    rw += '<a href="" class="button_zurueck" onclick="replaceIFrame(\'2\');return false;" tabindex="91" title="'
							+ wom_titletag(WOMT_aTexte["3_btn_zurueck_title"][S_nSprache])
							+'">'
							+wom_html(WOMT_aTexte["3_btn_zurueck_text"][S_nSprache])
							+' <span>&nbsp;<\/span><\/a>\n';
				rw += '<\/div>\n';
                rw += '<div class="clear">&nbsp;<\/div>\n';
            rw += '<\/div>\n';
                rw += '<div class="buttons_rechts">\n';
                    rw += '<div class="button">\n'; 
                rw += '<a href="" class="button_weiter" onclick="parteiergebnis();return false;" tabindex="90" title="'
    							+wom_titletag(WOMT_aTexte["3_form_submit_text"][S_nSprache])
    							+'"><span>&nbsp;<\/span> '
    							+wom_html(WOMT_aTexte["3_form_submit_text"][S_nSprache])
    							+'<\/a>\n';
                    rw += '<\/div>\n';
                    rw += '<div class="clear">&nbsp;<\/div>';
                rw += '<\/div>\n';
            rw += '<\/div>\n';
            rw += '<div class="clear">&nbsp;<\/div>\n';
                rw += '<\/div>\n';
            rw += '<\/div>\n';
            rw += '<div class="clear">&nbsp;<\/div>\n';
            rw += '<div id="content_foot_e">&nbsp;<\/div>\n';
        rw += '<\/div>\n';
        rw += '<!-- Blindennavigation: Anfang -->\n';
            rw += '<div class="unsichtbar">\n';
                rw += '<ul>\n';
                    rw += '<li><a href="#main" tabindex="730" title="">'+wom_html(WOMT_aTexte["a_bn_seitenstart_text"][S_nSprache])+'<\/a><\/li>\n';
                    rw += '<li><a href="#content_center_w" tabindex="731" title="">'+wom_html(WOMT_aTexte["3_bn_parteiauswahl_text"][S_nSprache])+'<\/a><\/li>\n';
                rw += '<\/ul>\n';
            rw += '<\/div>\n';
        rw += '<!-- Blindennavigation: Ende -->\n';
        rw += '<\/div>\n';
        rw += '<\/form>\n';

    rw += print_main_foot();

    rw += '<\/div>\n';

    rw += '<\/div>\n';

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
    
    text_partei_zuwenige        = WOMT_aTexte["3_text_partei_zuwenige"][S_nSprache];
    text_partei_eine            = WOMT_aTexte["3_text_partei_eine"][S_nSprache];
    text_partei_mehrere         = WOMT_aTexte["3_text_partei_mehrere"][S_nSprache];
    text_partei_zuviele_eine    = WOMT_aTexte["3_text_partei_zuviele_eine"][S_nSprache];
    text_partei_zuviele         = WOMT_aTexte["3_text_partei_zuviele"][S_nSprache];

    
    if (pSelected==pMax){
        // Kein Text
        return '';
    }
    if (pSelected<pMin){
        lNewText = text_partei_zuwenige+"<br\/><br\/>";
        return lNewText;
    }
    if ((pSelected>=pMin)&&(pSelected<=pMax-2)){
        lNewText = text_partei_mehrere+"<br\/><br\/>";
        lNewText = lNewText.replace(/\[PARTEIDAZU\]/g,(pMax-pSelected));
        return lNewText;
    }
    if (pSelected==pMax-1){
        lNewText = text_partei_eine+"<br\/><br\/>";
        lNewText = lNewText.replace(/\[PARTEIDAZU\]/g,(pMax-pSelected));
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
    lFehlerTextDiv = document.getElementById('fehlertext');	    				            
    if (lFehlerTextDiv){
        lFehlerTextDiv.innerHTML = lFehlerText;
    }
}
