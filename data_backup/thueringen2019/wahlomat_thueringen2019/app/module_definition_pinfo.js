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
WOMT_aParteienBeschreibung[0][0]='Die CDU versteht sich als moderne "christliche Volkspartei". Von 1990 bis 2014 war sie an der Regierung beteiligt und strebt nun einen Regierungswechsel in Thüringen an. Schwerpunkte ihres Wahlprogramms sind die Bildungspolitik, die Entwicklung des ländlichen Raums und der Bereich Innere Sicherheit.';
WOMT_aParteienBeschreibung[1][0]='DIE LINKE entstand 2007 durch die Fusion der SED-Nachfolgepartei PDS und WASG. Sie versteht sich als "demokratisch-sozialistische Partei". Seit 2014 gehört sie der Landesregierung an und stellt den Ministerpräsidenten. Ihre Kernthemen sind soziale Gerechtigkeit und soziale Sicherheit.';
WOMT_aParteienBeschreibung[2][0]='Die SPD wurde in der DDR 1946 mit der KPD zur SED zwangsvereint und gründete sich 1990 neu. Seit 2014 stellt sie mit den LINKEN und den GRÜNEN die Landesregierung. Zur Landtagswahl fordert sie u.a. Gebührenfreiheit vom "Kindergarten bis zum Meister", den Ausbau von Gemeinschaftsschulen wie auch höhere Mindestlöhne und mehr Tarifbindung.';
WOMT_aParteienBeschreibung[3][0]='Die AfD ist seit 2014 im Thüringer Landtag vertreten. Der Landes- und Fraktionsvorsitzende der Thüringer AfD Björn Höcke ist Mitbegründer des sogennanten "Flügels" der AfD, der seit Anfang 2019 zum Verdachtsfall verfassungsfeindlicher Bestrebungen vom Bundesamt für Verfassungsschutz erklärt wurde. Die Flüchtlingspolitik ist einer der Kernpunkte ihres Wahlprogramms.';
WOMT_aParteienBeschreibung[4][0]='Die Ursprünge der GRÜNEN liegen in den Bürgerbewegungen der Friedlichen Revolution sowie den ost- und westdeutschen Grünen. Seit 2014 gehören sie der Landesregierung an. Sie wollen den Klimaschutz in der Landesverfassung verankern und den Umstieg Thüringens auf erneuerbare Energien. Zudem sollen Kita-Plätze ausgebaut und Flüchtlinge besser integriert werden.';
WOMT_aParteienBeschreibung[5][0]='Die NPD ist laut Verfassungsschutz eine rechtsextreme Partei, deren politisches Konzept die Menschenwürde missachtet. Sie lehnt die freiheitliche Demokratie ab und vertritt fremdenfeindliche Positionen. Die NPD fordert u.a. soziale Projekte zugunsten deutscher Familien und die "Eindämmung des Zustroms" von Zuwanderern.';
WOMT_aParteienBeschreibung[6][0]='Der Landesverband Thüringen der FDP wurde 1990 gegründet. Nach eigener Aussage vertritt die marktwirtschaftlich und bürgerrechtlich orientierte Partei die "liberale Mitte" der Gesellschaft. Ihre Kernthemen zur Landtagswahl sind Bildung und Digitalisierung, wie etwa der Ausbau des Internets, der Telemedizin und die Digitalisierung der Schulen.';
WOMT_aParteienBeschreibung[7][0]='Den Schwerpunkt der 2006 gegründeten Partei bilden die Themen Netzpolitik und Partizipation. Die PIRATEN setzen sich u.a. für eine Senkung des Wahlalters, stärkere Bürgerbeteiligung, eine solidarische Gesundheitspolitik und mehr Nachhaltigkeit ein.';
WOMT_aParteienBeschreibung[8][0]='Die PARTEI wurde 2004 im Umfeld des Satire-Magazins Titanic gegründet. Sie parodiert Rituale, sprachliche Gepflogenheiten und Auftreten der etablierten Parteien. Für Thüringen fordert sie u.a. die Subventionierung der Thüringer Bratwurst und den Tausch des Eichsfelds gegen die Insel Rügen.';
WOMT_aParteienBeschreibung[9][0]='Die KPD wurde 1990 in Ostberlin gegründet und erhebt den Anspruch sowohl Nachfolgepartei der 1956 verbotenen westdeutschen KPD als auch der ostdeutschen SED zu sein. Sie fordert u.a. kostenlosen ÖPNV und Kitaplätze sowie das Recht auf Arbeit in der Landesverfassung zu verankern.';
WOMT_aParteienBeschreibung[10][0]='Die Partei TIERSCHUTZ hier! wurde 2017 gegründet. Sie tritt zum ersten Mal zur Landtagswahl in Thüringen an. Sie engagiert sich für eine Verschärfung des Tierschutzes und des Tierschutzrechts und fordert u.a. ein Verbot von Tierversuchen und Massentierhaltung und die Abschaffung der Mehrwertsteuer auf vegane Lebensmittel.';
WOMT_aParteienBeschreibung[11][0]='Die Partei BGE wurde 2016 in München als "Ein-Themen-Partei" aus verschiedenen Initiativen zu diesem Thema gegründet. Ihr einziges Ziel besteht darin, ein bedingungsloses Grundeinkommen zu verwirklichen, um allen Menschen die demokratische Teilhabe am Gemeinwesen zu ermöglichen.';
WOMT_aParteienBeschreibung[12][0]='DIE DIREKTE! gründete sich im Dezember 2018 in Erfurt. Direkte und unmittelbare politische Partizipation sowie mehr Transparenz bilden Schwerpunkte ihres politischen Konzepts. So sollen Bürger und Bürgerinnen in einem Onlineforum der Partei diskutieren und entscheiden, wie Abgeordnete der Partei sich bei Abstimmungen im Thüringer Landtag verhalten sollen.';
WOMT_aParteienBeschreibung[13][0]='Die Blaue *raute*TeamPetry Thüringen wurde 2017 unter der damaligen AfD-Vorsitzenden Frauke Petry gegründet. Die Partei ist nationalkonservativ ausgerichtet, will der "schleichenden Islamisierung" entgegentreten und plädiert für "straffere" Grenzkontrollen.';
WOMT_aParteienBeschreibung[14][0]='Die Partei versteht sich als "Partei aller Generationen im Sinne der Bewegung Graue Panther" und fordert eine stärkere direkte politische Mitwirkung in Form von Volksinitiativen, Volksbegehren und Volksentscheiden. Zudem tritt sie u.a. für ein einfacheres Steuersystem und den Anstieg des Rentenniveaus ein.';
WOMT_aParteienBeschreibung[15][0]='Die MLPD ist eine kommunistische Partei, deren Ziel die Schaffung einer klassenlosen Gesellschaft ist. Der Verfassungsschutz stuft sie als linksextremistisch ein. Die MLPD fordert zur Landtagswahl in Thüringen u.a. eine allgemeine Lehrmittelfreiheit sowie die Senkung des Wahlalters auf 16 Jahre.';
WOMT_aParteienBeschreibung[16][0]='Die ÖDP / Familie .. ist eine ökologische und wertkonservative Partei, deren Landesverband in Thüringen 1994 gegründet wurde. In ihrem Wahlprogramm fordert sie u.a. ein Landeserziehungsgeld, die Ausweitung der Grundschule auf sechs Jahre sowie die Verkleinerung des Landtags und die Abschaffung der 5-Prozent-Hürde.';
WOMT_aParteienBeschreibung[17][0]='Die Partei Gesundheitsforschung verfolgt als einziges politisches Ziel die bessere Erforschung altersbedingter Krankheiten. In ihrem Programm fordert sie daher, ein zusätzliches Prozent des staatlichen Haushalts in dieses Forschungsgebiet zu investieren. Zu anderen politischen Fragestellungen äußert sich die Partei nicht.';
WOMT_aParteienBeschreibungChecksum["sum"]='2efb1cf9e0314a6503391688f5ff6978';
WOMT_aParteienBeschreibungChecksum["sum2"]='1d5d67869b96d1263042865555f078c3';
WOMT_sGenerationTimeParteienBeschreibung ='26.09.2019 15:36:25';
