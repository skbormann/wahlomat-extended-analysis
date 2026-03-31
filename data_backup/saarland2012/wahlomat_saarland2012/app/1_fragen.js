function write_1_fragen(){
    if (S_nTheseAktuell >= WOMT_nThesen){
        S_nTheseAktuell         = WOMT_nThesen-1;
    }

    b=S_nTheseAktuell+1;

    rw  =   '';
	rw += '<div id="main">\n';

	rw += '<!-- Blindennavigation: Anfang -->\n';
	rw += '<div class="unsichtbar">\n';
	rw += '<ul>\n';
	rw += '<li><a href="#content_center_wahl" tabindex="10" title="">'+wom_html(WOMT_aTexte["1_bn_zurthese_text"][S_nSprache])+'<\/a><\/li>\n';
	rw += '<li><a href="#steps" tabindex="11" title="">'+wom_html(WOMT_aTexte["1_bn_thesennavigation_text"][S_nSprache])+'<\/a><\/li>\n';
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

	rw += '<div id="main_wm_tapete">\n';

	rw += '<div id="content">\n';

	rw += '<div id="content_head_start">\n';
	rw += '<h2>'+wom_html(WOMT_aTexte["wahlomat_content_head"][S_nSprache])+'<\/h2>\n';
	rw += '<\/div>\n';

	rw += '<div id="content_center_wahl">\n';
	rw += '<h4 class="wahl">'+wom_html(WOMT_aTexte["1_fragen_these"][S_nSprache])+' '+(S_nTheseAktuell+1)+' '+wom_html(WOMT_aTexte["1_fragen_von"][S_nSprache])+' '+WOMT_nThesen+': <span class="redtxt">\n';
	
	lwKurzFrage = wom_html(WOMT_aThesen[S_nTheseAktuell][S_nSprache][0]);
	//lwKurzFrage = lwKurzFrage.replace(/\- /,"");
	rw += lwKurzFrage;
	rw += '<\/span><\/h4>\n';
	rw += '<div class="b1">\n';
		
	rw += wom_html(WOMT_aThesen[S_nTheseAktuell][S_nSprache][1]);
	rw += '<\/div>\n';
        if (is_bogus()==1) {
            rw +=  '<div class="b2">'+wom_html(WOMT_aTexte["1_fragen_bogus"][S_nSprache])+'<\/div>\n';
            reset_bogus();
        }

	rw += '<\/div>\n';
	rw += '<div id="content_center_b">&nbsp;<\/div>\n';

    rw += '<div id="content_choice">\n';
	

	rw += '<div class="b1"><a class="';
	if (S_aThesen[S_nTheseAktuell]==1){
		rw += 'selected';
	} else {
		rw += 'normal';
	} 
	rw += '" href="" onclick="beantworteFrage(1);return false;" accesskey="j" tabindex="14" title="'+wom_titletag(WOMT_aTexte["1_these_stimmezu_taste_title"][S_nSprache])+'">'+wom_html(WOMT_aTexte["a_button_stimmezu_text"][S_nSprache])+'<\/a><\/div>\n';
	rw += '<div class="b2"><a class="';
	if (S_aThesen[S_nTheseAktuell]==0){
		rw += 'selected';
	} else {
		rw += 'normal';
	}
	rw += '" href="" onclick="beantworteFrage(0);return false;" accesskey="x" tabindex="15" title="'+wom_titletag(WOMT_aTexte["1_these_neutral_taste_title"][S_nSprache])+'">'+wom_html(WOMT_aTexte["a_button_neutral_text"][S_nSprache])+'<\/a><\/div>\n';
	rw += '<div class="b3"><a class="';
	if (S_aThesen[S_nTheseAktuell]==-1){
		rw += 'selected';
	} else {
		rw += 'normal';
	}
	rw += '" href="" onclick="beantworteFrage(-1);return false;" accesskey="n" tabindex="16" title="'+wom_titletag(WOMT_aTexte["1_these_stimmenichtzu_taste_title"][S_nSprache])+'">'+wom_html(WOMT_aTexte["a_button_stimmenichtzu_text"][S_nSprache])+'<\/a><\/div>\n';
	rw += '<div class="b4"><a class="';
	if (S_aThesen[S_nTheseAktuell]==-2){
		rw += 'selected';
	} else {
		rw += 'normal';
	}
	rw += '" href="" onclick="beantworteFrage(-2);return false;" accesskey="w" tabindex="17" title="'+wom_titletag(WOMT_aTexte["1_these_ueberspringen_taste_title"][S_nSprache])+'">'+wom_html(WOMT_aTexte["a_button_theseueberspringen_text"][S_nSprache])+'<\/a><\/div>\n';
	rw += '<div class="b5">&nbsp;<\/div>\n';
	rw += '<\/div>\n';
	

	rw += '<!-- Blindennavigation: Anfang -->\n';
	rw += '<div class="unsichtbar">\n';
	rw += '<ul>\n';
	rw += '<li><a href="#main" tabindex="18" title="">'+wom_html(WOMT_aTexte["a_bn_seitenstart_text"][S_nSprache])+'<\/a><\/li>\n';
	rw += '<li><a href="#content_center_wahl" tabindex="19" title="">'+wom_html(WOMT_aTexte["1_bn_zurthese_text"][S_nSprache])+'<\/a><\/li>\n';
	rw += '<li><a href="#leftnav_fixed" tabindex="20" title="">'+wom_html(WOMT_aTexte["a_bn_menue_text"][S_nSprache])+'<\/a><\/li>\n';
	rw += '<\/ul>\n';
	rw += '<\/div>\n';
	rw += '<!-- Blindennavigation: Ende -->\n';

	rw += '<div id="content_choice_b">&copy;'+wom_html(WOMT_aTexte["a_copyright_text"][S_nSprache])+'<\/div>\n';

	rw += '<\/div>\n';

	rw += '<div id="steps">\n';
	
	rw += '<ul>\n';

			if (S_nTheseAktuell>0){
				texthref	= "javascript:change_frage("+(S_nTheseAktuell-1)+")";
				textonclick = "change_frage("+(S_nTheseAktuell-1)+");return false;";
				title 	= wom_titletag(WOMT_aTexte["1_leiste_zurueck_these"][S_nSprache]);
				title 	= title.replace(/\[NR\]/,S_nTheseAktuell);
			} else {
				texthref	= "javascript:replaceIFrame(0)";
				textonclick	= "replaceIFrame(0);return false;";
				title 	= wom_titletag(WOMT_aTexte["1_leiste_zurueck_start"][S_nSprache]);
			}
	rw += '<li class="b_bv"><a href="" onClick="'+textonclick+'" tabindex="21" title="'+title+'"><span>';
	rw += wom_html(WOMT_aTexte["1_leiste_zurueck_text"][S_nSprache])
	rw += '<\/span><\/a><\/li>';




    lCount = 0;
	for (a=0;a<WOMT_nThesen;a++){
		b=(a+1);
		bNr = b;
	    if (b<10) {
	        bNr = '0'+b;
	    }
        bShow = false;
	    if (S_nTheseAktuell<12){
	        bShow = true;
	        if (a>=23){
	            bShow = false;
	        }
	        if (a==22){
	            //bNr = "...";
	        }
	    } else if (S_nTheseAktuell<WOMT_nThesen-12){
	        bShow = true;
	        if (a-(S_nTheseAktuell-12)<=0){
	            bShow = false;
	        } if (a>=(S_nTheseAktuell+12)){
	            bShow = false;
	        } else {
	            
	        }
	    } else {
	        bShow = true;
	        if (a<(WOMT_nThesen-23)){
	            bShow = false;			            
	        }
	    }

	    if (bShow){
	        lCount++;						
				if (a==S_nTheseAktuell){	
					rw += '<li class="b_ma"><a ';
					if (a==0){
						rw +='class="first"';
					}
					rw += ' href="" onclick="change_frage('+a+');return false;" tabindex="'+(b+21)+'" title="'+wom_titletag(WOMT_aTexte["1_leiste_thesenochmal_title"][S_nSprache])+'">'+bNr+'<\/a><\/li>';
				} else if (a<=S_nTheseMax){
					rw +='<li class="b_mv"><a ';
					if (a==0){
						rw += 'class="first"';
					}
					rw += ' href="" onclick="change_frage('+a+'); return false;" tabindex="'+(b+21)+'" title="';
						text = wom_titletag(WOMT_aTexte["1_leiste_thesenochmal_these_title"][S_nSprache]);
						text = text.replace(/\[NR\]/,(a+1));
						rw += text+'">'+bNr+'<\/a><\/li>';
				} else {
					rw += '<li class="b_mn"><span>'+bNr+'<\/span><\/li>';
				}
			}
		}
		
		
			if ((S_nTheseAktuell<=S_nTheseMax-1)||(S_nTheseMax>=WOMT_nThesen)){
				rw += '<li class="b_en"><a href="" onclick="change_frage('+(S_nTheseAktuell+1)+');return false;" tabindex="106" title="';
				if (S_nTheseAktuell+1<S_nTheseMax){
					text = wom_titletag(WOMT_aTexte["1_leiste_vor_these"][S_nSprache]);
					text = text.replace(/\[NR\]/,S_nTheseAktuell+2);
				} else {
					text = WOMT_aTexte["1_leiste_vor_zwischenauswertung"][S_nSprache];
				}
				rw += wom_titletag(text);
				rw += '"><span>'+wom_html(text)+'<\/span><\/a><\/li>';
			}
	rw += '<\/ul>';
	
	rw += '<\/div>\n';


	rw += '<!-- Blindennavigation: Anfang -->\n';
	rw += '<div class="unsichtbar">\n';
	rw += '<ul>\n';
	rw += '<li><a href="#main" tabindex="730" title="">'+wom_html(WOMT_aTexte["a_bn_seitenstart_text"][S_nSprache])+'<\/a><\/li>\n';
	rw += '<li><a href="#content_center_wahl" tabindex="731" title="">'+wom_html(WOMT_aTexte["1_bn_zurthese_text"][S_nSprache])+'<\/a><\/li>\n';
	rw += '<li><a href="#steps" tabindex="732" title="">'+wom_html(WOMT_aTexte["1_bn_thesennavigation_text"][S_nSprache])+'<\/a><\/li>\n';
	rw += '<\/ul>\n';
	rw += '<\/div>\n';
	rw += '<!-- Blindennavigation: Ende -->\n';

	rw += '<\/div>\n';

    rw += print_main_foot();
	rw += '<\/div>\n';

	rw += '<\/div>\n';
                    
    return rw;
}

function change_image(name,src) {
    document.images[name].src = src;
}
