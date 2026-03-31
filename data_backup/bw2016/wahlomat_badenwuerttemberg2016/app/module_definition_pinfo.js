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
WOMT_aParteienBeschreibung[18]=new Array();
WOMT_aParteienBeschreibung[19]=new Array();
WOMT_aParteienBeschreibung[0][0]='Die CDU ging aus allen Landtagswahlen Baden-Württembergs als stärkste Partei hervor. Ihr Wahlprogramm fordert u. a., die Zusammenlegung von Finanz- und Wirtschaftsministerium rückgängig zu machen. Sie steht für eine Stärkung der Realschulen und eine schnellere Abschiebung bei abgelehntem Asylantrag.';
WOMT_aParteienBeschreibung[1][0]='Die GRÜNEN entstanden u. a. aus der Anti-Atomkraft- und Friedensbewegung. Ihr erster Landesverband entstand 1979 in Baden-Württemberg. 2016 treten sie dort für eine Begrenzung der Videoüberwachung und ein reformiertes Wahlrecht ein. Daneben fordern sie eine Gesundheitskarte für Flüchtlinge.';
WOMT_aParteienBeschreibung[2][0]='1952 gründete sich der Landesverband der SPD in Baden-Württemberg. In seinem Wahlprogramm betont er die Gültigkeit des Mindestlohns für alle Beschäftigten. Die Partei will Schulden abbauen und mehr Grundschulen zu Ganztagsschulen umwandeln. Sie ist gegen die Rückkehr zum Abitur nach neun Jahren.';
WOMT_aParteienBeschreibung[3][0]='Baden-Württemberg gilt als liberales Stammland der FDP. Dort stellte sie ihren bisher einzigen Ministerpräsidenten. Im Wahlprogramm tritt sie für die Stärkung des Verfassungsschutzes ein. Sie stellt sich gegen die Ausweitung von Videoüberwachung und kritisiert das Mindestlohn- und Tariftreuegesetz.';
WOMT_aParteienBeschreibung[4][0]='DIE LINKE gründete sich 2007 als Zusammenschluss von PDS und WASG. In ihrem Wahlprogramm überwiegen sozialpolitische Forderungen - z.B. nach kostenfreier Kita-Betreuung und kostenlosem Essen in Schulen. Sie fordert einen Stopp von Stuttgart 21 und ist gegen die Privatisierung von Krankenhäusern.';
WOMT_aParteienBeschreibung[5][0]='Die PIRATEN wurden 2006 gegründet. Ihr programmatischer Fokus hat sich mittlerweile von Internetthemen auch auf andere Bereiche ausgeweitet. Zur Wahl in Baden-Württemberg setzt die Partei u.a. auf eine Reform direktdemokratischer Elemente und die Senkung des Wahlalters auf 14 Jahre.';
WOMT_aParteienBeschreibung[6][0]='Die REP wurde 1983 von ehemaligen CSU-Mitgliedern gegründet. Sie hat ein eher konservatives Programm mit rechtspopulistischen Elementen. Für die Landtagswahl fordert die Partei ein Landesbetreuungsgeld und Grenzkontrollen in Deutschland. Europäische Finanzhilfen lehnt sie ab.';
WOMT_aParteienBeschreibung[7][0]='Das Programm der rechtsextremen NPD ist nationalistisch und ausländerfeindlich. Sie wurde 1964 gegründet. Für die Landtagswahl fordert die NPD, das Grundrecht auf Asyl zu streichen und den Familiennachzug für Asylbewerber abzuschaffen. Kindergeld sollen ausschließlich deutsche Familien erhalten.';
WOMT_aParteienBeschreibung[8][0]='Die ÖDP ist 1982 im Zuge der ökologischen Bewegung entstanden. Ihr Programm ist im Kern ökologisch und wertkonservativ. Der Landesverband Baden-Württemberg spricht sich für ein Verbot von Parteispenden durch Unternehmen aus. Er will mehr CO2-Emissionen einsparen und den ÖPNV ausbauen.';
WOMT_aParteienBeschreibung[9][0]='Die PARTEI wurde 2004 gegründet. Sie ist inhaltlich und personell mit dem Satiremagazin Titanic verflochten. Auch ihre Forderungen zur Landtagswahl haben satirischen Charakter. Unter anderem fordert die Partei einen Stausee 21 und eine bauliche Trennung zwischen Baden und Württemberg.';
WOMT_aParteienBeschreibung[10][0]='Die BüSo entstand 1992 im Umfeld des US-amerikanischen Aktivisten Lyndon LaRouche. Prägend für ihre Forderungen sind Fortschritts- und Wissenschaftsglaube. In Baden-Württemberg will sie die nukleare Aufrüstung stoppen. Sie fordert die Neuorganisation des Bankensystems und der Weltwirtschaftsordnung.';
WOMT_aParteienBeschreibung[11][0]='Die DKP steht in der Nachfolge der 1956 verbotenen KPD. Ihr Ziel ist eine Revolution, die zum Sozialismus führt. Für die Landtagswahl fordert die Partei u.a. den Ausstieg der Landesregierung aus der Zusammenarbeit mit der Bundeswehr und die Veröffentlichung aller Dokumente zum NSU.';
WOMT_aParteienBeschreibung[12][0]='Die ALFA gründete sich 2015 nach einem Machtkampf um die inhaltliche Ausrichtung der AfD. Die Partei vereint konservative und wirtschaftsliberale Elemente und legt Wert auf einen starken Nationalstaat. Sie lehnt Subventionen für Solar- und Windenergie ab und fordert schnellere Asylverfahren.';
WOMT_aParteienBeschreibung[13][0]='Das Kernanliegen der 2013 gegründeten Tierschutzallianz sind Maßnahmen zum Tier- und Umweltschutz. Im Wahlprogramm fordert sie, öffentliche Plätze nicht mehr für Zirkusse mit Tierdressur zur Verfügung zu stellen. Sie spricht sich gegen Gentechnik und für ökologische Landwirtschaft aus.';
WOMT_aParteienBeschreibung[14][0]='Die AfD wurde 2013 als Reaktion auf die Eurokrise gegründet. 2015 gewann der rechtspopulistische Flügel der AfD an Gewicht. Die Partei fordert zur Wahl u.a. mehr Streifenpolizisten, eine Verschärfung des Asylrechts und niedrigere Hürden für Volksbegehren und Volksentscheide.';
WOMT_aParteienBeschreibung[15][0]='Das Bündnis C ist eine christlich-fundamentalistische Partei, die 2015 gegründet wurde. Im Mittelpunkt ihres Programms steht das Abtreibungsverbot. Auch den Sexualkundeunterricht in der Grundschule lehnt sie ab und setzt sich für ein Landeserziehungsgeld und die Förderung ländlicher Regionen ein.';
WOMT_aParteienBeschreibung[16][0]='Die rechtsextreme Partei DIE RECHTE gründete sich 2012. In Baden-Württemberg hat sie große Überschneidungen mit der Neonaziszene. Programmatisch fordert DIE RECHTE eine Verschärfung des Asylrechts und eine Verstärkung der Polizei sowie die Auszahlung des Kindergeldes nur für deutsche Kinder.';
WOMT_aParteienBeschreibung[17][0]='Die FREIEN WÄHLER haben ihre Wurzeln in der Kommunalpolitik. Sie positionieren sich mit einer eher liberalen und bürgerlichen Programmatik. Die Landesvereinigung Baden-Württemberg tritt zur Wahl für direkte Demokratie und eine Abschaffung des Beamtentums an Schulen ein.';
WOMT_aParteienBeschreibung[18][0]='Die 2013 gegründete MENSCHLICHE WELT ist spirituell ausgerichtet. Im baden-württembergischen Wahlprogramm tritt sie für Friedenspolitik und die Umstellung der Rüstungsindustrie auf zivile Produktion ein. Bildung will sie auf die ganzheitliche Entfaltung der Persönlichkeit ausrichten.';
WOMT_aParteienBeschreibung[19][0]='Die Tierschutzpartei strebt seit ihrer Gründung 1993 nach öffentlicher Aufmerksamkeit für den Tierschutz. Sie hat sich das Ende der Ausbeutung von Tieren auf die Fahne geschrieben. Im Landtagswahlkampf fordert sie, vegane Bio-Landwirtschaft zu fördern und Privilegien von Beamten abzuschaffen.';
WOMT_aParteienBeschreibungChecksum["sum"]='6bb0a0a47afb6c71711d8d4b4414b23f';
WOMT_aParteienBeschreibungChecksum["sum2"]='884e481b1a551f6957646c985996c697';
WOMT_sGenerationTimeParteienBeschreibung ='10.03.2016 18:04:20';
