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
WOMT_aParteienBeschreibung[0][0]='Der Landesverband der CDU in Sachsen-Anhalt wurde 1990 gegründet. Seit 2002 stellt die Partei die Landesregierung und den Ministerpräsidenten. Die CDU setzt zur Landtagswahl u.a. auf solide Finanzen, Entlastung der Familien, die Weiterführung des gegliederten Schulsystems und auf Braunkohle als Energieträger.';
WOMT_aParteienBeschreibung[1][0]='DIE LINKE entstand 2007 durch die Fusion von PDS und WASG. Der Landesverband in Sachsen-Anhalt gründete sich 1990. In ihrem Wahlprogramm fordert sie u.a. die Abwanderung junger Menschen zu stoppen, prekäre Beschäftigungsverhältnisse zu verringern sowie eine neue Ausrichtung der Asyl- und Flüchtlingspolitik.';
WOMT_aParteienBeschreibung[2][0]='Der seit 1990 existierende Landesverband der SPD stellt seit 2006 in Koalition mit der CDU die Landesregierung. Zur Wahl setzt die SPD sich u.a. für die Verbesserung von Arbeitsbedingungen und gegen Billiglöhne ein. Die Kosten der Kinderbetreuung sollen auf maximal 190 Euro beschränkt werden.';
WOMT_aParteienBeschreibung[3][0]='Die Wurzeln der GRÜNEN in Sachsen-Anhalt liegen in der Bürgerrechtsbewegung der DDR. Gemäß ihres Markenkerns Umwelt-, Klima- und Tierschutz fordern sie 100 Prozent erneuerbare Energien und den Braunkohleausstieg. Sie wollen ein Ministerium schaffen, das sich mit den Themen Zuwanderung und Integration befasst.';
WOMT_aParteienBeschreibung[4][0]='Die westdeutsche NPD dehnte sich 1990 in den neuen Bundesländern aus und wird vom Verfassungsschutz als rechtsextremistisch eingestuft. Ihr Programm ist geprägt von völkisch-nationalistischer Ideologie. Sie fordert u.a. die Abschaffung des Grundrechts auf Asyl und die Abschiebung von Asylbewerbern.';
WOMT_aParteienBeschreibung[5][0]='Die FDP entstand 1990 aus dem Beitritt der reformierten DDR-Blockpartei LDP und zweier weiterer neu gegründeter liberaler Parteien in die westdeutsche FDP. Zur Wahl positioniert sie sich u.a. für schnellere Unternehmensgründungen, für die Abschaffung des Mindestlohns und für die weitere Nutzung der Braunkohle.';
WOMT_aParteienBeschreibung[6][0]='Die FREIEN WÄHLER sind aus kommunalen Vereinigungen und Wählergemeinschaften entstanden. Sie treten in ihrem Programm u.a. für die Direktwahl des Ministerpräsidenten ein, fordern ehrenamtliche Abgeordnete statt Berufspolitiker und lehnen Privatisierungen von Infrastruktur und Daseinsvorsorge ab.';
WOMT_aParteienBeschreibung[7][0]='Die Tierschutzpartei und ebenso ihr Landesverband in Sachsen-Anhalt wurden 1993 gegründet. Die Einführung von Grundrechten für Tiere gehört zu den Kernforderungen der Tierschutzpartei. Sie fordert u.a. eine tierfreie Landwirtschaft, die Abschaffung der Rasseliste für Hunde und ein Verbot von Tieren im Zirkus.';
WOMT_aParteienBeschreibung[8][0]='Die ALFA wurde 2015 gegründet. Sie sieht sich selbst als eurokritische und konservative Partei und fordert u.a. mehr Mitsprache für Kommunen bei der Aufnahme von Asylbewerbern und die Einführung eines Familiensplittings zusätzlich zum Ehegattensplitting.';
WOMT_aParteienBeschreibung[9][0]='Die Tierschutzallianz wurde 2013 als Abspaltung des Landesverbandes der Tierschutzpartei in Magdeburg gegründet. Kernthemen der Partei sind der Tier- und Naturschutz, wie u.a. die Abschaffung von Massentierhaltung und die Aufnahme eines Tierschutzartikels in die Landesverfassung von Sachsen-Anhalt.';
WOMT_aParteienBeschreibung[10][0]='Der Landesverband der AfD wurde 2013 in Sachsen-Anhalt gegründet und anfangs vor allem als "Anti-Euro-Partei" wahrgenommen. 2015 gewann der rechtspopulistische Flügel der AfD an Gewicht. In ihrem Programm fordert die AfD u.a. eine restriktivere Zuwanderungspolitik, Grenzkontrollen und die Einführung von Bürgerwehren.';
WOMT_aParteienBeschreibung[11][0]='DIE RECHTE wurde 2012 in Hamburg gegründet und ging v.a. aus der DVU hervor. In ihrem Programm vertritt sie einen völkischen Nationalismus, u.a. die sofortige Aufhebung der Duldung von dauerhaft in Deutschland lebenden Ausländern und einen Maschendrahtzaun um Sachsen-Anhalt.';
WOMT_aParteienBeschreibung[12][0]='Die FBM haben sich 2011 in Hettstedt gegründet. Sie fordern eine Neuausrichtung in der Wirtschaftsförderung sowie die Aufwertung von handwerklichen Berufsabschlüssen. Sie wollen Massentierhaltung sowie genmanipulierte Pflanzen und Nahrungsmittel verbieten.';
WOMT_aParteienBeschreibung[13][0]='Die PARTEI wurde 2004 im Umfeld des Satire-Magazins Titanic gegründet und parodiert Gepflogenheiten und Auftreten der etablierten Parteien. Für Sachsen-Anhalt fordert sie in ihrem Programm 95 Thesen u.a. Pflanzen ohne Gene, den Ausbau der Raumfahrtindustrie in Sachsen-Anhalt und die Abschaffung der Schwerkraft.';
WOMT_aParteienBeschreibungChecksum["sum"]='dbc25beed0a145f055fea2012ac458d4';
WOMT_aParteienBeschreibungChecksum["sum2"]='76a2c06fe573e92e4f02478043b2b130';
WOMT_sGenerationTimeParteienBeschreibung ='15.02.2016 09:55:24';
