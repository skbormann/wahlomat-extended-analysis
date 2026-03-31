  var WOMT_aParteienBeschreibung                 = new Array();
  var WOMT_aParteienBeschreibungChecksum         = new Array();
  var WOMT_sGenerationTimeParteienBeschreibung   = '';
  

/*
  --------------------------------------------------------------
  Vordefinieren der in den Templates gefunden assoziativen Keys
  mit denenen auf WOMT_aTexte und WOMT_aBilder zugriffen wird
  nicht vorhanden Indexe fuehren in Javascript sonst zu Fehlern!

  Wenn mit Variablen auf die assoziativen Arrays zugegriffen wird
  kann dies nicht automatisch analsysit werden,
  die Variablen werden aber zur Erinnuner im output angezeigt!
  --------------------------------------------------------------
*/
WOMT_aParteienBeschreibung[0]=new Array();
WOMT_aParteienBeschreibung[1]=new Array();
WOMT_aParteienBeschreibung[2]=new Array();
WOMT_aParteienBeschreibung[3]=new Array();
WOMT_aParteienBeschreibung[4]=new Array();
WOMT_aParteienBeschreibung[5]=new Array();
WOMT_aParteienBeschreibung[6]=new Array();
WOMT_aParteienBeschreibung[7]=new Array();
WOMT_aParteienBeschreibung[8]=new Array();
WOMT_aParteienBeschreibung[9]=new Array();
WOMT_aParteienBeschreibung[10]=new Array();
WOMT_aParteienBeschreibung[11]=new Array();
WOMT_aParteienBeschreibung[12]=new Array();
WOMT_aParteienBeschreibung[13]=new Array();
WOMT_aParteienBeschreibung[14]=new Array();
WOMT_aParteienBeschreibung[15]=new Array();
WOMT_aParteienBeschreibung[0][0]='Die SPD ist in Bremen seit 1946 die führende Regierungspartei. Im Fokus ihres Wahlprogramms für die Bürgerschaftswahl 2019 stehen insbesondere die Themen Bildung, Arbeit, Gesundheit, solidarische Gesellschaft und bezahlbarer Wohnraum. So will sie u.a. stärker in den Bildungsbereich investieren, den Landesmindestlohn auf 12 Euro erhöhen und jährlich 2.500 neue Wohnungen schaffen.';
WOMT_aParteienBeschreibung[1][0]='Zur Bürgerschaftswahl 2019 tritt die CDU mit dem Ziel an, die SPD als stärkste Kraft abzulösen. Gemeinsam mit der FDP und den GRÜNEN will sie eine "Jamaika-Koalition" bilden. Die CDU setzt sich u.a. für ein verpflichtendes letztes Kita-Jahr ein und will die Zahl der Polizei- und Justizbeamten erhöhen. Um den Bereich Digitalisierung zu stärken, soll ein eigenes Senatsressort geschaffen werden.';
WOMT_aParteienBeschreibung[2][0]='Die Bremische Bürgerschaft war 1979 das erste Landesparlament, in das eine grüne Vereinigung einzog. Seit 2007 regieren die GRÜNEN hier gemeinsam mit der SPD. Sie fordern u.a. die Abschaltung der Bremer Kohlekraftwerke und den Ausbau des Fahrradverkehrs. Neben ökologischen Themen stehen Bildung, Wirtschaft, Arbeit und Integration im Zentrum ihres Wahlprogramms.';
WOMT_aParteienBeschreibung[3][0]='Nach der Bremischen Bürgerschaftswahl 2007 zog DIE LINKE (damals noch als Listenverbindung) zum ersten Mal in einen westdeutschen Landtag ein. Bei der diesjährigen Bürgerschaftswahl strebt sie eine Regierungsbeteiligung in einer Koalition mit der SPD an und stellt in ihrem Wahlprogramm die Frage: "Wem gehört die Stadt?" Sie will mehr bezahlbaren Wohnraum schaffen und setzt sich u.a. für einen kostenlosen ÖPNV und die Abschaffung des zweigliedrigen Schulsystems ein.';
WOMT_aParteienBeschreibung[4][0]='Nachdem sie 2011 die Fünfprozenthürde verfehlt hatte, gelang der FDP 2015 wieder der Einzug in die Bremische Bürgerschaft. Ihr Wahlprogramm für die Bürgerschaftswahl 2019 stellt die Themen Bildung, Digitalisierung, Wirtschaft und Bürokratieabbau in den Mittelpunkt. So fordert die FDP u.a. ein Sparverbot bei Bildungsausgaben und eine Abschaffung der Mietpreisbremse. Sie will den Breitbandausbau fördern und definiert Digitalisierung als Querschnittsaufgabe.';
WOMT_aParteienBeschreibung[5][0]='Der Einzug in die Bremische Bürgerschaft gelang der AfD 2015, kurz danach zerfiel die Fraktion allerdings in verschiedene Gruppierungen. Ihr Wahlprogramm ist geprägt von den Themen Zuwanderung und Kriminalitätsbekämpfung. So fordert die AfD beispielsweise einen Flüchtlingsstopp für Bremen und Bremerhaven und die Verhinderung  "illegaler Zuwanderung" durch ständige Kontrollen an den deutschen Außengrenzen.';
WOMT_aParteienBeschreibung[6][0]='Die BIW ist vorwiegend in Bremen aktiv. Sie bezeichnet sich selbst als bürgerlich-konservativ und wird in der Politikwissenschaft meist als rechtspopulistisch eingeschätzt. Einen inhaltlichen Schwerpunkt der Wählervereinigung stellt das Thema Kriminalitätsbekämpfung dar. Sie will den Kampf gegen Clankriminalität verstärken und setzt sich für "freiwillige Sicherheitswachten" von "geeigneten Bürgern" ein.';
WOMT_aParteienBeschreibung[7][0]='Die PARTEI wurde von Mitarbeitern der Satire-Zeitschrift Titanic gegründet und versteht sich als satirische "Spaßpartei". Mit ihrer Programmatik und Aktionen parodiert sie die offizielle Politik und macht sich mit ihren Parolen über die Slogans anderer Parteien lustig. So wirbt sie in Bremen beispielsweise mit dem Wahlplakat "Das Brot ist voll! Salamisierung des Abendbrots stoppen".';
WOMT_aParteienBeschreibung[8][0]='Zu den Kernpositionen der Bremer PIRATEN gehört die Einführung des sogenannten bedingungslosen Grundauskommens, um das Recht auf sichere Existenz und gesellschaftliche Teilhabe zu gewährleisten. Außerdem arbeitet die Partei an einer App zur digitalen Ausgestaltung direkter Demokratie. Diese soll sowohl die Vorgänge im Parlament transparenter gestalten als auch Meinungen und Argumente der Bevölkerung aufzeigen.';
WOMT_aParteienBeschreibung[9][0]='Die Partei BGE wurde im Jahr 2016 in München gegründet und tritt 2019 erstmals zur Bürgerschaftswahl in Bremen an. Sie versteht sich als Ein-Themen-Partei und fordert die deutschlandweite Einführung des bedingungslosen Grundeinkommens. Dabei will sie als politischer Arm der zivilgesellschaftlichen Initiativen im Bereich des bedingungslosen Grundeinkommens agieren.';
WOMT_aParteienBeschreibung[10][0]='Die Partei DIE RECHTE ist ein Sammelbecken ehemaliger Mitglieder der rechtsextremen DVU und anderer neonazistischer Organisationen und steht unter Beobachtung des Verfassungsschutzes. Sie tritt erstmals zur Bremischen Bürgerschaftswahl an und will nach eigenen Aussagen den (Wieder-)Aufbau nationaler Strukturen im Bundesland Bremen voranbringen.';
WOMT_aParteienBeschreibung[11][0]='Der Bremer Landesverband der FREIEN WÄHLER hat sich im Oktober 2018 konstituiert und tritt somit zum ersten Mal zur Bürgerschaftswahl an. In der Politikwissenschaft wird die Partei häufig als bürgerlich-liberal und wertkonservativ eingeschätzt. Bei der Bürgerschaftswahl tritt sie mit dem Ziel an, sich gegen die Umwelt- und Städtebaupolitik der GRÜNEN einzusetzen. Auch Sicherheitspolitik gehört zu ihren Schwerpunkten.';
WOMT_aParteienBeschreibung[12][0]='Die Partei MENSCHLICHE WELT wurde 2013 gegründet und tritt 2019 zum ersten Mal bei der Bürgerschaftswahl in Bremen an. Sie verfolgt ein ganzheitliches Gesellschaftskonzept, das in der indischen Yoga-Lehre und spirituellen Philosophie verwurzelt ist. Neben dem Einsatz für Umwelt- und Tierschutz fordert sie u.a. den Stopp von Rüstungsexporten und eine Reduzierung der Rüstungsindustrie.';
WOMT_aParteienBeschreibung[13][0]='Der Landesverband Bremen der Humanisten hat sich im Juni 2018 konstituiert. Sie setzen sich für Menschenrechte, Demokratie, Arbeitnehmerrechte, Selbstbestimmung, Bildung und Umweltschutz ein. Außerdem bekennen sie sich zu Europa und plädieren für eine Verstärkung der europäischen Integration. Sie fordern u.a. ein universelles Grundeinkommen und wollen die Gesundheitsversorgung in die öffentliche Hand legen.';
WOMT_aParteienBeschreibung[14][0]='Die V-Partei³ wurde 2016 in München gegründet und tritt 2019 zum ersten Mal zur Bremer Bürgerschaftswahl an. Ihr Ziel ist es, vegetarisch und vegan lebende Menschen in Deutschland parlamentarisch zu vertreten. Kernthemen der Partei sind Ernährung und die Umgestaltung der Landwirtschaft. Sie setzt sich gegen Atomkraft ein und fordert einen Rückbau von Kohlekraftwerken und Biogasanlagen.';
WOMT_aParteienBeschreibung[15][0]='Das Wählerbündnis WIR wurde Anfang 2019 in Bremerhaven gegründet. WIR engagiert sich für mehr Bürgerbeteiligung und direkte Demokratie in Bremen und Bremerhaven und setzt sich insgesamt für sozialstaatliche, linke Positionen ein. Sie fordern beispielsweise einen Rechtsanspruch auf Ganztagsbetreuung und eine Rückführung der kommunalen Grundversorgung in die öffentliche Hand.';
WOMT_aParteienBeschreibungChecksum["sum"]='02502b9957a6e0bb4bb841899364c5ce';
WOMT_aParteienBeschreibungChecksum["sum2"]='eec82913c48bcce83192f7e421c83a38';
WOMT_sGenerationTimeParteienBeschreibung ='16.04.2019 17:52:24';
