
function bindAudioTriggers() {
    $( "a.wom_readspeaker_toggle" ).click(function( event ) {
        //alert(2342);
        //event.preventDefault();
    });

     if ((CONST_WOMT_VORLESEN ==1 )&&(CONST_WOMT_VORLESEN_STATUS == 1)) {
        audioTag = $('audio.wom-audio');
        audioTag[0].onplay=function(){
            $('.wom-audio-play img').attr('src' , 'media/pix/icon/audio_pause.svg');
        };
        
        $('.wom-audio-play').on('click' , function(e) {
            audioTag = $('audio.wom-audio');
            if (audioTag != 'undefined') {
                if (!audioTag[0].paused) {
                    audioTag[0].pause();
                    $('.wom-audio-play img').attr('src' , 'media/pix/icon/audio_play.svg');
                } else {
                    if (audioTag[0].ended) {
                        audioTag[0].currentTime  = 0;
                    }
                    audioTag[0].play();
                    $('.wom-audio-play img').attr('src' , 'media/pix/icon/audio_pause.svg');
                }
            }        
        });
        
        $('.wom-audio-mute').on('click' , function(e) {
            audioTag = $('audio.wom-audio');
            if (audioTag != 'undefined') {
                if (!audioTag[0].muted) {
                    audioTag[0].muted = true;
                    $('.wom-audio-mute img').attr('src' , 'media/pix/icon/audio_mute-active.svg');
                } else {
                    audioTag[0].muted = false;
                    $('.wom-audio-mute img').attr('src' , 'media/pix/icon/audio_mute.svg');
                }
            }        
        });
        
        $('.wom-audio').bind("ended", function() {
            audioTag = $('audio.wom-audio');
            playlistCounter++;
            if (playlistCounter < playlist.length) {
                $('.wom-audio').attr('src' , playlist[playlistCounter]);
                $('.wom-audio-play img').attr('src' , 'media/pix/icon/audio_pause.svg');
                audioTag[0].play();
            }
        });
    
        $('.wom-audio-next').on('click' , function() {
            audioTag = $('audio.wom-audio');
            playlistCounter++;
            if (playlistCounter >= playlist.length) {
                playlistCounter = 0;
            }
            $('.wom-audio').attr('src' , playlist[playlistCounter]);
            $('.wom-audio-play img').attr('src' , 'media/pix/icon/audio_pause.svg');
            audioTag[0].play();
        });
        
        $('.wom-audio-prev').on('click' , function() {
            audioTag = $('audio.wom-audio');
            playlistCounter--;
            if (playlistCounter < 0) {
                playlistCounter = playlist.length;
            }
            $('.wom-audio').attr('src' , playlist[playlistCounter]);
            $('.wom-audio-play img').attr('src' , 'media/pix/icon/audio_pause.svg');
            audioTag[0].play();
        });    
    }
}

function toggleVorlesen(pFaqImpressum) {
    if(CONST_WOMT_VORLESEN) {   
        if (CONST_WOMT_VORLESEN_STATUS == 0) {
            CONST_WOMT_VORLESEN_STATUS = 1;
        } else {
            CONST_WOMT_VORLESEN_STATUS = 0;
        }
        if (pFaqImpressum == 'impressum') {
            replaceVorlesen();
        } else if (pFaqImpressum == 'faq') {
            replaceVorlesen();
        } else {
            replaceIFrame(gStatusURL_Status);
        }
    }
    return false;
}

/**
 * Toogle fuer das Vorlesen fuer Sidenav und die Popups
 */    
function snippet_vorlesen_toogle(pFaqImpressum) {
    rw = ' ';
    
    if(CONST_WOMT_VORLESEN) {
        
        if (CONST_WOMT_VORLESEN_STATUS == 1) {
            rw += '<a class="wom_readspeaker_toggle" href="dulgu" onclick="toggleVorlesen(\''+pFaqImpressum+'\');return false;">\n';
            rw += '<img src="media/pix/icon/audio_toggle.svg" alt="" />\n'
                + wom_html(WOMT_aTexte['nav_vorlesen_deaktivieren'][S_nSprache]);
            rw += '</a>\n';
        } else {
            rw += '<a class="wom_readspeaker_toggle" href="dulgu" onclick="toggleVorlesen(\''+pFaqImpressum+'\');return false;">\n';
            rw += '<img src="media/pix/icon/audio_toggle.svg" alt="" />' 
                + wom_html(WOMT_aTexte['nav_vorlesen_aktivieren'][S_nSprache]);
            rw += '</a>\n';
        }
    }
    return rw;
}              

    
function snippet_vorlesen_sidenav() {
    
    if ((CONST_WOMT_VORLESEN)&& (CONST_WOMT_VORLESEN_STATUS == 1)) {
        tracks = new Array();
        tracksText = WOMT_aTexte['nav_vorlesen_default'][S_nSprache];
        
        switch(gStatusURL_Status) {
        case 0:
            tracks.push('vorlesen/0_start.mp3');
            tracksText = WOMT_aTexte['nav_vorlesen_0_start'][S_nSprache];
            break;
        case 1:
            tracks.push('vorlesen/1_these_' + (S_nTheseAktuell+1) + '.mp3');
            tracksText = WOMT_aTexte['nav_vorlesen_1_thesen'][S_nSprache];
            break;
        case 2:
            tracks.push('vorlesen/2_gewichtung_0.mp3');
            tracksText = WOMT_aTexte['nav_vorlesen_2_gewichtung'][S_nSprache];
            for (a = 0; a < WOMT_nThesen; a++) {
                tracks.push('vorlesen/2_gewichtung_these_' + (a+1) + '.mp3');
            }
            break;
        case 3:
            tracks.push('vorlesen/3_parteiauswahl.mp3');
            tracksText = WOMT_aTexte['nav_vorlesen_3_parteiauswahl'][S_nSprache];
            
            
            ParteienImParlament = 0;
            for (a = 0;a<WOMT_nParteien;a++){
                if (WOMT_aParteiFix[a]==1){
                    ParteienImParlament++;
                }
            }
            for (a = 0; a < WOMT_nParteien; a++) {
                if (a==ParteienImParlament) {
                    tracks.push('vorlesen/3_parteiauswahl_2.mp3');
                }
                tracks.push('vorlesen/3_partei_' + (a+1) + '.mp3');
            }
            break;
        case 4:
            tracksText = WOMT_aTexte['nav_vorlesen_4_ergebnis'][S_nSprache];
            tracks.push('vorlesen/4_ergebnis.mp3');
            break;
        case 5:
            tracksText = WOMT_aTexte['nav_vorlesen_5_detailauswertung'][S_nSprache];
            tracks.push('vorlesen/5_detailergebnis.mp3');
            break;
        }
        return snippet_vorlesen_buttons(tracks, tracksText);
    }
    return ' ';
    
}

    function snippet_vorlesen_popup(popup) {
        
        if ((CONST_WOMT_VORLESEN)&& (CONST_WOMT_VORLESEN_STATUS == 1)) {
            tracks = new Array();
            tracksText = 'Audio abspielen';
            switch(popup) {
            case 'faq':
                tracks.push('vorlesen/popup_faq_text.mp3');
                tracks.push('vorlesen/popup_faq_1.mp3');
                tracks.push('vorlesen/popup_faq_2.mp3');
                tracks.push('vorlesen/popup_faq_3.mp3');
                tracks.push('vorlesen/popup_faq_4.mp3');
                tracks.push('vorlesen/popup_faq_5.mp3');
                tracks.push('vorlesen/popup_faq_6.mp3');
                tracks.push('vorlesen/popup_faq_7.mp3');
                tracks.push('vorlesen/popup_faq_8.mp3');
                tracks.push('vorlesen/popup_faq_9.mp3');
                tracks.push('vorlesen/popup_faq_10.mp3');
                tracks.push('vorlesen/popup_faq_11.mp3');
                tracks.push('vorlesen/popup_faq_12.mp3');
                tracks.push('vorlesen/popup_faq_13.mp3');
                tracks.push('vorlesen/popup_faq_14.mp3');
                tracks.push('vorlesen/popup_faq_15.mp3');
                tracksText = 'Audio abspielen:';
                break;
            case 'impressum':
                tracks.push('vorlesen/popup_impressum.mp3');                
                tracks.push('vorlesen/popup_impressum_ds_a.mp3');
                tracks.push('vorlesen/popup_impressum_ds_b_1.mp3');
                tracks.push('vorlesen/popup_impressum_ds_b_2.mp3');
                tracks.push('vorlesen/popup_impressum_ds_c.mp3');
                tracks.push('vorlesen/popup_impressum_ds_d.mp3');
                //tracks.push('vorlesen/popup_impressum_bitv.mp3');
                tracksText = 'Audio abspielen:';
                break;
            }
            return snippet_vorlesen_buttons(tracks, tracksText);
        }
        
        return ' ';
    }              
    
    
function snippet_vorlesen_buttons(tracks, tracksText) {
    
    
    playlistCounter = 0;
    playlist = tracks;
    rw = '';
    rw += '<h3 class="wom_readspeaker_label">' + wom_html(tracksText) + '</h3>';
    rw += '<div class="wom_readspeaker">';
        rw += '<audio class="wom-audio" src="' + tracks[0] + '"';
        if (CONST_WOMT_VORLESEN_AUTOPLAY) {
            rw += ' autoplay ';
        }
            rw += ' controls preload="auto">';
        rw += '</audio>';
        rw += '<button class="wom-audio-play" title="';
                rw += wom_titletag(WOMT_aTexte['nav_vorlesen_audio_play'][S_nSprache]);
                rw += '" aria-label="';
                rw += wom_titletag(WOMT_aTexte['nav_vorlesen_audio_play'][S_nSprache]);
            rw += '"><img src="media/pix/icon/audio_play.svg" alt="" />';
            rw += '<span class="v-hidden">' 
                + wom_html(WOMT_aTexte['nav_vorlesen_audio_play'][S_nSprache]);
            rw += '</span>';
        rw += '</button>';
        rw += '<button class="wom-audio-mute" title="';
            rw += wom_titletag(WOMT_aTexte['nav_vorlesen_audio_mute'][S_nSprache]);
                rw += '" aria-label="';
            rw += wom_titletag(WOMT_aTexte['nav_vorlesen_audio_mute'][S_nSprache]);
            rw += '"><img src="media/pix/icon/audio_mute.svg" alt="" />';
            rw += '<span class="v-hidden">' 
                + wom_html(WOMT_aTexte['nav_vorlesen_audio_mute'][S_nSprache]);
            rw += '</span>';
        rw += '</button>';
    
    if (tracks.length > 1) {
        rw += '<button class="wom-audio-prev" title="';
            rw += wom_titletag(WOMT_aTexte['nav_vorlesen_audio_prev'][S_nSprache]);
        rw += '" aria-label="';
            rw += wom_titletag(WOMT_aTexte['nav_vorlesen_audio_prev'][S_nSprache]);
        rw += '"><img src="media/pix/icon/audio_prev.svg" alt="" />';
        rw += '<span class="v-hidden">' + wom_html(WOMT_aTexte['nav_vorlesen_audio_prev'][S_nSprache]);
        rw += '</span>';
        rw += '</button>';
        rw += '<button class="wom-audio-next" title="';
            rw += wom_titletag(WOMT_aTexte['nav_vorlesen_audio_next'][S_nSprache]);
            rw += '" aria-label="';
            rw += wom_titletag(WOMT_aTexte['nav_vorlesen_audio_next'][S_nSprache]);
            rw += '"><img src="media/pix/icon/audio_next.svg" alt="" />';
            rw += '<span class="v-hidden">' + wom_html(WOMT_aTexte['nav_vorlesen_audio_next'][S_nSprache]);
            rw += '</span>';
        rw += '</button>';
    }
    rw += '</div>';
    
    return rw;
}

