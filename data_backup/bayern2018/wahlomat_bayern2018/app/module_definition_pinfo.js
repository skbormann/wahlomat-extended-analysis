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
WOMT_aParteienBeschreibung[16]=new Array();
WOMT_aParteienBeschreibung[17]=new Array();
WOMT_aParteienBeschreibung[0][0]='Die CSU ist eine christlich-konservative Partei, die bei allen Wahlen ausschließlich in Bayern antritt. Seit 1957 stellt sie ununterbrochen den Bayerischen Ministerpräsidenten. Im Wahlkampf tritt sie u.a. für Grenzkontrollen, die Förderung des Wohnungsbaus und eine bessere Ausstattung der Schulen ein.';
WOMT_aParteienBeschreibung[1][0]='Die sozialdemokratische SPD ist seit über 60 Jahren stärkste Oppositionspartei im Bayerischen Landtag. Auch zur Landtagswahl setzt sie auf soziale Gerechtigkeit als zentrales Thema. Sie fordert u.a. kostenfreie Kinderbetreuung und die schnelle Einbindung von Asylbewerbern in den Arbeitsmarkt.';
WOMT_aParteienBeschreibung[2][0]='Die FREIEN WÄHLER sind als Partei aus unabhängigen kommunalpolitischen Gruppen hervorgegangen. Seit 2008 sind sie im Bayerischen Landtag vertreten. Sie fordern im Landtagswahlkampf u.a. einen nachhaltigen Tourismus und mehr Möglichkeiten direkter Mitbestimmung für die bayerischen Bürger.';
WOMT_aParteienBeschreibung[3][0]='Die GRÜNEN sind aus der Umwelt-, Frauen- und Friedensbewegung entstanden. 1986 sind sie in den Bayerischen Landtag eingezogen. Vor der Landtagswahl setzen sie sich für den Ausbau der ökologischen Landwirtschaft, eine wohnortnahe medizinische Versorgung und für ein weltoffenes, tolerantes Bayern ein.';
WOMT_aParteienBeschreibung[4][0]='Die FDP war seit ihrer Gründung 1946 mehrmals in Regierungsverantwortung in Bayern. Ihr Schwerpunkt liegt auf Rechtsstaatlichkeit, Bürgerrechten sowie einer liberalen Wirtschafts- und Steuerpolitik. Zur Landtagswahl fordert sie u.a. den Ausbau des Münchner Flughafens und liberale Ladenschlussgesetze.';
WOMT_aParteienBeschreibung[5][0]='DIE LINKE entstand 2007 aus der gewerkschaftsnahen WASG und der PDS, der Nachfolgepartei der DDR-Staatspartei SED. Ihr Ziel ist ein demokratischer Sozialismus. Im Landtagswahlkampf fordert sie u.a. mehr sozialen Wohnungsbau, den Ausbau des ÖPNV und die Erhöhung der Bildungsausgaben.';
WOMT_aParteienBeschreibung[6][0]='Die wertkonservative BP war von 1950 bis 1966 im Bayerischen Landtag vertreten. Ihr Ziel ist der Austritt Bayerns aus der Bundesrepublik Deutschland. Zur Landtagswahl fordert sie u.a. die Abschaffung des Länderfinanzausgleiches, die Förderung der Mundart und eine personelle Aufstockung der Polizei.';
WOMT_aParteienBeschreibung[7][0]='Die ÖDP kennzeichnet seit ihrer Gründung 1982 neben dem Thema Umwelt auch eine wertkonservative Ausrichtung. Bei Kommunalwahlen gewinnt sie in Bayern immer wieder Mandate, seit 2014 ist sie im Europäischen Parlament vertreten. In ihrem Landtagswahlkampf steht der Tier- und Artenschutz im Vordergrund.';
WOMT_aParteienBeschreibung[8][0]='Die in Bayern 2007 gegründeten PIRATEN setzen stark auf das Thema Digitalisierung. Sie halten ein Mandat im Europäischen Parlament und kommunale Mandate. Zur Landtagswahl lehnen sie die erweiterten Befugnisse im bayerischen Polizeiaufgabengesetz ab und fordern mehr Transparenz staatlicher Institutionen.';
WOMT_aParteienBeschreibung[9][0]='DIE FRANKEN wurden 2009 gegründet und treten nur in den drei fränkischen Regierungsbezirken zu Wahlen an. Dort halten sie wenige kommunale Mandate. Sie kritisieren eine zentralistische Ausrichtung Bayerns auf München und fordern mehr Eigenständigkeit der Kommunen, Landkreise und Bezirke.';
WOMT_aParteienBeschreibung[10][0]='Die AfD wurde 2013 gegründet und verfolgt einen national-konservativen, rechtspopulistischen Kurs. Sie ist in nahezu allen Landtagen und dem Bundestag vertreten. Zur Landtagswahl fordert sie u.a. die Zurückweisung von Asylsuchenden ohne gültige Einreisepapiere und ein niedrigeres Strafmündigkeitsalter.';
WOMT_aParteienBeschreibung[11][0]='Die LKR ging 2015 aus einer Abspaltung von der AfD hervor. Ihr Fokus liegt auf der Kritik am Euro und der Europapolitik der Bundesregierung und der Europäischen Kommission. Für Bayern fordert sie eine Parallelwährung u.a. zur Auszahlung der Löhne und die Verbesserung der Kinderbetreuung.';
WOMT_aParteienBeschreibung[12][0]='Die mut ist 2017 nach dem Austritt einer Landtagsabgeordneten aus der Fraktion der GRÜNEN entstanden. Die Partei ist linksliberal und ökologisch orientiert. Zur Landtagswahl fordert sie u.a. eine bessere Gleichstellung der Geschlechter, den Ausbau der Seenotrettung und höhere Löhne in der Pflege.';
WOMT_aParteienBeschreibung[13][0]='Die Humanisten wurden 2014 gegründet und stehen für einen vom Individuum her gedachten, säkularen Humanismus. Sie fordern u.a. die Streichung des Gottesbezuges aus der Verfassung, die Vermittlung wissenschaftlicher Methoden an den Schulen und die Einführung eines bedingungslosen Grundeinkommens.';
WOMT_aParteienBeschreibung[14][0]='Die PARTEI wurde 2004 gegründet. Ihr prägendes Element ist die Satire. Sie ist mit einem Abgeordneten im Europäischen Parlament vertreten. In Bayern schloss sie sich dem Protest gegen die Änderungen am Polizeiaufgabengesetz an und fordert in ihren satirischen Positionen einen Transrapid zur Zugspitze.';
WOMT_aParteienBeschreibung[15][0]='Die Gesundheitsforschung ist eine 2015 gegründete Partei, die nur ein einziges politisches Ziel verfolgt. Sie fordert die Erhöhung der staatlichen Mittel für die medizinische Forschung zu Alterskrankheiten. Andere Themen greift die Partei in ihrem Programm nicht auf.';
WOMT_aParteienBeschreibung[16][0]='Die Tierschutzpartei wurde 1993 gegründet und setzt ihren Schwerpunkt auf Natur-, Umwelt- und Tierschutz. 2014 zog sie mit einem Abgeordneten in das Europäische Parlament ein. Im Landtagswahlkampf lehnt sie jegliche Tierversuche ab und propagiert den völligen Verzicht des Konsums tierischer Produkte.';
WOMT_aParteienBeschreibung[17][0]='Die V-Partei³ wurde 2016 gegründet und setzt sich für eine Umgestaltung der gesamten Gesellschaft entlang der veganen Ernährung ein. Sie fordert u.a. die Abschaffung der Nutztierhaltung, eine umfassende Steuerreform unter Berücksichtigung von Umweltkosten und die Entkriminalisierung von Cannabis.';
WOMT_aParteienBeschreibungChecksum["sum"]='8b0ddab8c7a35fc09f00f8a22a8feb89';
WOMT_aParteienBeschreibungChecksum["sum2"]='d71b13decc4fb01eff0487ea4aca5d1e';
WOMT_sGenerationTimeParteienBeschreibung ='18.09.2018 00:52:15';
