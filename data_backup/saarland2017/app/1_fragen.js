function write_1_fragen(){
    if (S_nTheseAktuell >= WOMT_nThesen){
        S_nTheseAktuell         = WOMT_nThesen-1;
    }

    b=S_nTheseAktuell+1;

    rw = '';
    
    rw += '<div class="wom_main_wrapper' + msl_get_view_class() +'" id="wom">';
        rw += '<!-- Blindennavigation: Anfang -->';
    	rw += '<div class="wom_unsichtbar" id="bnseitenstart">';
        	rw += '<ul>\n';
        	rw += '<li><a href="#bnthese" tabindex="10" title="">' + wom_html(WOMT_aTexte["1_bn_zurthese_text"][S_nSprache]) + '<\/a><\/li>\n';
        	rw += '<li><a href="#bnsteps" tabindex="11" title="">' + wom_html(WOMT_aTexte["1_bn_thesennavigation_text"][S_nSprache]) + '<\/a><\/li>\n';
        	rw += '<li><a href="#bnleftnavi" tabindex="12" title="">' + wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache]) + '<\/a><\/li>\n';
        	rw += '<\/ul>\n';
    	rw += '<\/div>';
        rw += '<!-- Blindennavigation: Ende -->';
       rw += print_main_head();

        rw += '<div class="wom_wrapper">';
            rw += '<div class="wom_content" id="content">';
                
                rw += print_top_nav(1);
                rw += '<div class="wom_main_content">';
    			
    				rw += '<div class="wom_wahlomat';
    				    if (isTouchSupported) {
    				        rw += ' touchhoverdisable';
    				    }
    				    rw += '">';
    				    rw += '<div class="wom_phone-header" style="height:22px">';
                            rw += '<a class="wom_link-back" href="" onclick="';
                                if (S_nTheseAktuell<=0) {
                                    // Zurueck zum Start
                                    urlZurueck = 'replaceIFrame(0);return false;';
                                    text2 = WOMT_aTexte["1_leiste_zurueck_start"][S_nSprache];
                                } else {
                                    // Zurueck zur letzten These
                                    urlZurueck = 'change_frage('+(S_nTheseAktuell-1)+');return false;';
                                    text2 = WOMT_aTexte["1_leiste_zurueck_these"][S_nSprache];
                                    text2 = text2.replace('[NR]',S_nTheseAktuell);
                                    
                                }
                                rw += urlZurueck;
                                
                            rw += '" tabindex="11" title="' + wom_titletag(text2)+'">';
                                rw += wom_html(WOMT_aTexte["1_leiste_zurueck_text"][S_nSprache])
                            rw += '<\/a>';
                            rw += '<img class="svgnoie8" width="170" height="22" alt="' + wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache])+'" src="media/pix/bildmarke_wom.svg" />';
                            rw += '<img class="svgie8" alt="' + wom_titletag(WOMT_aTexte["nav_alt_bildmarke"][S_nSprache])+'" src="media/pix/iconie8/bildmarke_wom.png" />';
                            rw += '<a title="' + wom_titletag(WOMT_aTexte["nav_startseite"][S_nSprache])
                                + '" href="main_app.html" class="wom_link-home">'
                                + wom_titletag(WOMT_aTexte["nav_startseite"][S_nSprache]) 
                                + '<\/a>';
                        rw += '<\/div>';
                        rw += '<div class="wom_header-margin wom_header-margin-these-small"><\/div>';
    					rw += '<div class="wom_thesen" id="bnthese">';
    					    rw += '<div class="wom_phone-whitebox">';
    					    
    					    rw += '<h1><span>'+(S_nTheseAktuell+1)+'<\/span><span class="thesenanzahl">/'+WOMT_nThesen+'<\/span> ';
                            	lwKurzFrage = wom_html(WOMT_aThesen[S_nTheseAktuell][S_nSprache][0]);
                            	//lwKurzFrage = lwKurzFrage.replace(/\- /,"");
                        	    rw += lwKurzFrage;
                        	rw += '<\/h1><p>';
                                rw += wom_html(WOMT_aThesen[S_nTheseAktuell][S_nSprache][1]);
	                        rw += '<\/p>';
                            rw += '<\/div>';
                            
                            
                            rw += '<a class="wom_skipper" href="" onclick="beantworteFrage(-2);return false;" tabindex="23" accesskey="w" title="' 
                        	    + wom_titletag(WOMT_aTexte["1_these_ueberspringen_taste_title"][S_nSprache]) 
                        	    + '">' + wom_html(WOMT_aTexte["a_button_theseueberspringen_text"][S_nSprache]) 
                        	    + '<span class="wom_icon-arrow-right"><\/span><\/a>\n'
    						if (is_bogus()==1) {
                                rw +=  '<span class="wom_bogus">'+wom_html(WOMT_aTexte["1_fragen_bogus"][S_nSprache])+'<\/span>\n';
                                reset_bogus();
                            }
    						
    					    rw += '<p class="wom_phone-thesenzahl">'
    					            + wom_html(WOMT_aTexte["1_fragen_these"][S_nSprache])
                                    + ' <span>'+ (S_nTheseAktuell+1)
                                    + '<\/span> '
                                    + wom_html(WOMT_aTexte["1_fragen_these_von"][S_nSprache])
                                    + ' ' + WOMT_nThesen + '<\/p>';
    						rw += '<ul class="wom_entscheidung">';
    						rw += '<li class="wom_yes"><a class="';
                    		    if (S_aThesen[S_nTheseAktuell]==1){
                            		rw += 'wom_decision';
                            	} else {
                            		rw += '';
                            	} 
    	                        rw += '" href="" onclick="beantworteFrage(1);return false;" tabindex="20" accesskey="j"  title="' 
                        	    + wom_titletag(WOMT_aTexte["1_these_stimmezu_taste_title"][S_nSprache]) + '">' 
                        	    + wom_html(WOMT_aTexte["a_button_stimmezu_text"][S_nSprache]) 
                        	    + '<\/a><\/li>\n';
	    
    							rw += '<li class="wom_neutral"><a class="';
                                if (S_aThesen[S_nTheseAktuell]==0){
                            		rw += 'wom_decision';
                            	} else {
                            		rw += '';
                            	} 
                            	rw += '" href="" onclick="beantworteFrage(0);return false;" tabindex="21" accesskey="x"  title="' 
                            	        + wom_titletag(WOMT_aTexte["1_these_neutral_taste_title"][S_nSprache]) 
                            	        + '">' 
                            	        + wom_html(WOMT_aTexte["a_button_neutral_text"][S_nSprache]) 
                            	        + '<\/a><\/li>\n';
                            	
                            	rw += '<li class="wom_no"><a class="';
                                if (S_aThesen[S_nTheseAktuell]==-1){
                            		rw += 'wom_decision';
                            	} else {
                            		rw += '';
                            	} 
                            	rw += '" href="" onclick="beantworteFrage(-1);return false;" tabindex="22" accesskey="n"  title="' 
                            	    + wom_titletag(WOMT_aTexte["1_these_stimmenichtzu_taste_title"][S_nSprache]) + '">' 
                            	    + wom_html(WOMT_aTexte["a_button_stimmenichtzu_text"][S_nSprache]) + '<\/a><\/li>\n';
                            	
                            	rw += '<\/ul>\n';
    					rw += '<\/div>';
    					
                        rw += '<ul class="wom_points" id="bnsteps">\n';
            					    
            			for (a=0;a<WOMT_nThesen;a++){
            
                            if (a == S_nTheseAktuell) {
                                // gehighligted / aktuelle These
                                arrowClass = 'wom_arrow_left';
                                if (a >= 19 ) {    // Ab These 20
                                    arrowClass = 'wom_arrow_right';
                                }
                                rw += '<li class="wom_active_point"><a href="" onclick="change_frage('+a+');return false;" title="';
                                    lText = WOMT_aTexte["1_leiste_these_aktuell_title"][S_nSprache];
                                    lText = lText.replace(/\[NR\]/,a+1);
                                    rw += wom_titletag(lText + ': " ' + WOMT_aThesen[a][S_nSprache][0] + '"');
                                 rw += '" tabindex="' + (a+40) + '"><\/a> <span class="' + arrowClass + '">&nbsp;<\/span><\/li>\n';
                                
                            } else if (a <= S_nTheseMax) {
                                // schonmal beantwortet
                                    rw += '<li class="wom_previous_point">';
                                    rw += '<a href="" onclick="change_frage('+a+');return false;" title="';
                                        lText = WOMT_aTexte["1_leiste_these_nr_title"][S_nSprache] ;         
                						lText = lText.replace(/\[NR\]/,a+1);
                						
                                    rw += wom_titletag(lText + ': " ' + WOMT_aThesen[a][S_nSprache][0] + '"');
                                    rw += '" tabindex="' + (a+40) + '">&nbsp;<\/a><\/li>';
                            } else {
                                // Noch nicht aktiv
                                    rw += '<li><span>&nbsp;<\/span><\/li>\n';
                            }
                        }
            
                	rw += '<\/ul>';
            		rw += '<div class="wom_clear"><\/div>';
    					

    				rw += '<\/div>';
    				rw += '<div class="wom_clear"><\/div>';
    		 rw += '<\/div>';
        rw += '<\/div>';
        rw += '<div class="wom_clear"><\/div>';
        
	rw += '<!-- Blindennavigation: Anfang -->';
        	rw += '<div class="wom_unsichtbar">';
        	rw += '<ul>';
            	rw += '<li><a href="#bnseitenstart" tabindex="580" title="">' + wom_html(WOMT_aTexte["a_bn_seitenstart_text"][S_nSprache]) + '<\/a><\/li>';
            	rw += '<li><a href="#bnthese" tabindex="581" title="">' + wom_html(WOMT_aTexte["1_bn_zurthese_text"][S_nSprache]) + '<\/a><\/li>';
            	rw += '<li><a href="#bnsteps" tabindex="582" title="">' + wom_html(WOMT_aTexte["1_bn_thesennavigation_text"][S_nSprache]) + '<\/a><\/li>';
        	rw += '<\/ul>';
        	rw += '<\/div>';
    	rw += '<!-- Blindennavigation: Ende -->';
    	rw += '<div class="wom_clear"><\/div>';	 
    	rw += '<\/div>';
    rw += '<\/div>';
    rw += print_ivw_footer();    	

    return rw;
}
