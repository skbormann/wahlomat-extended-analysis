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
WOMT_aParteienBeschreibung[20]=new Array();
WOMT_aParteienBeschreibung[0][0]='Die SPD regiert mit der CDU im Berliner Abgeordnetenhaus in einer großen Koalition. Zur Wahl tritt die SPD mit den Forderungen nach bezahlbarem Wohnraum und besseren Arbeitsbedingungen an. Sozialen Aufstieg will sie durch bessere und gebührenfreie Bildung von der Kita bis zur Hochschule erleichtern.';
WOMT_aParteienBeschreibung[1][0]='Die CDU regiert im Berliner Abgeordnetenhaus in einer großen Koalition mit der SPD. Sie ist eine bürgerliche Volkspartei und vereint liberale, konservative und christlich-soziale Strömungen. Schwerpunkte des Berliner Wahlprogramms der CDU sind Sicherheit, Bildung und Wirtschaft.';
WOMT_aParteienBeschreibung[2][0]='Die GRÜNEN zogen als Alternative Liste (AL) erstmals 1981 ins Abgeordnetenhaus ein. Umwelt und Gerechtigkeit sind die Kernthemen der Partei. Zur Wahl des Abgeordnetenhauses 2016 tritt sie mit der Forderung nach mehr Parks und Grünflächen an und will einkommensorientierte Mieten einführen.';
WOMT_aParteienBeschreibung[3][0]='DIE LINKE entstand 2007 als Zusammenschluss der PDS mit der WASG. Im Berliner Abgeordnetenhaus ist sie aktuell viertstärkste Kraft. Sie tritt für einen demokratischen Sozialismus ein. Für Berlin fordert die Partei ein Investitionsprogramm für die Infrastruktur sowie ein Beschäftigungsprogramm für Langzeiterwerbslose und Geflüchtete.';
WOMT_aParteienBeschreibung[4][0]='Die PIRATEN erreichten bei der letzten Abgeordnetenhauswahl 2011 einen Sensationserfolg. Jedoch waren die Folgejahre gekennzeichnet durch Austritte. Identitätskern der Partei ist die Forderung nach Netzneutralität. Zudem fordert die Partei u.a. das Wahlrecht ab Geburt, das bedingungslose Grundeinkommen und die Legalisierung weicher Drogen.';
WOMT_aParteienBeschreibung[5][0]='Die NPD wurde 1964 gegründet. Sie gilt als rechtsextremistisch. Aktuell prüft das Bundesverfassungsgericht einen Parteiverbotsantrag gegen die NPD. Die Partei fordert die Einführung von Grenzkontrollen und konzentriert ihre Forderungen und Positionen auf die Flüchtlingsthematik.';
WOMT_aParteienBeschreibung[6][0]='Die FDP war seit 1949 im Bund wie in Berlin an vielen Regierungskoalitionen beteiligt. 2011 schaffte sie den Einzug ins Berliner Abgeordnetenhaus nicht. Die FDP tritt für die Freiheit des Einzelnen in allen Lebensbereichen ein. In Berlin will sie insbesondere den Mittelstand fördern und lehnt die Mietpreisbremse ab.';
WOMT_aParteienBeschreibung[7][0]='Die Tierschutzpartei wurde 1993 gegründet. Seither ist sie bei allen Bundestagswahlen und einigen Landtagswahlen angetreten. Sie fordert die Aufnahme des Tierschutzes ins Grundgesetz sowie ein Verbot von Tierversuchen. Sie bekennt sich außerdem zu einer sozialen und ökologischen Marktwirtschaft.';
WOMT_aParteienBeschreibung[8][0]='pro Deutschland ging 2005 aus der Bürgerbewegung pro Köln hervor. Der Berliner Verfassungsschutz stuft die Partei als rechtsextrem ein. In Berlin tritt pro Deutschland u.a. mit der Forderung an, für ausländische Straftäter ein Wiedereinreiseverbot zu verhängen.';
WOMT_aParteienBeschreibung[9][0]='Die PARTEI wurde 2004 gegründet. Sie ist inhaltlich und personell mit dem Satiremagazin Titanic verflochten. Auch ihre Forderungen zur Wahl des Berliner Abgeordnetenhauses haben satirischen Charakter. Unter anderem fordert die PARTEI in der Asylpolitik ein Zuzugsverbot für Schwaben und kündigt einen 6-Punkte-Plan zur Behebung sämtlicher Probleme der Stadt an.';
WOMT_aParteienBeschreibung[10][0]='Die DKP strebt den Bruch mit den kapitalistischen Eigentums- und Machtverhältnissen in der Bundesrepublik an, mit dem Ziel des "Sozialismus/Kommunismus". Sie fordert die 30-Stunden-Woche und die Hälfte aller Wohnungen in kommunaler Hand. Sie wird vom Bundesverfassungsschutz beobachtet und als linksextrem eingestuft.';
WOMT_aParteienBeschreibung[11][0]='Die ÖDP versteht sich als werteorientierte Partei der Mitte. Sie vertritt sowohl ökologisch-soziale als auch bürgerlich-wertkonservative Ansichten. Die Partei setzt sich für eine Beschleunigung der Energiewende ein sowie für eine Stärkung direktdemokratischer Mitwirkungsrechte.';
WOMT_aParteienBeschreibung[12][0]='Die PSG ist die Nachfolgeorganisation des Bunds Sozialistischer Arbeiter. Als trotzkistische Partei sieht sie sich als marxistische Opposition zum Stalinismus. Die PSG strebt die Beseitigung des Kapitalismus sowie eine sozialistische Weltföderation an. Auch setzt sie auf den Aufbau einer neuen internationalen Antikriegsbewegung.';
WOMT_aParteienBeschreibung[13][0]='Die BüSo entstand 1992 im Umfeld des US-amerikanischen Aktivisten Lyndon LaRouche. Prägend für ihre Forderungen sind Fortschritts- und Wissenschaftsglaube. Für Berlin fordert die Partei u.a. die Integration der Stadt in die Bewegung der Neuen Seidenstraße und die Aufgabe des Hauptstadtflughafens BER.';
WOMT_aParteienBeschreibung[14][0]='Das Bündnis Bergpartei, die "ÜberPartei" (B) aus Kultur-Aktivisten und Öko-Anarchisten will verwirren und provozieren. Sie setzt sich in Berlin für ein Existenzgeld, Verkehrsplanung zugunsten von Fahrradfahrern und die Wasserschlacht auf der Oberbaumbrücke ein.';
WOMT_aParteienBeschreibung[15][0]='Die ALFA gründete sich 2015 als Abspaltung der AfD. In ihrem Wahlprogramm fordert sie für Berlin u.a. die Stärkung der Familie, Ausbau der Radwege sowie lokale Obergrenzen für Flüchtlinge.';
WOMT_aParteienBeschreibung[16][0]='Die AfD gründete sich 2013 aus Protest gegen die Euro-Rettungspolitik. 2015 setzte sich der nationalkonservative Flügel im innerparteilichen Richtungsstreit durch. Im Wahlprogramm für Berlin fordert sie u.a. einen sofortigen Aufnahmestopp von Asylbewerbern, ist gegen die Mietpreisbremse und für weniger staatliche Rundumversorgung.';
WOMT_aParteienBeschreibung[17][0]='DIE VIOLETTEN sehen sich selbst als Sprachrohr von spirituellen Menschen mit ganzheitlicher Weltanschauung. Sie fordern ein bedingungsloses Grundeinkommen, den Einsatz von naturheilkundlichen Mitteln und ganzheitlichen Methoden in der Gesundheitsversorgung sowie ein vereinfachtes Steuersystem.';
WOMT_aParteienBeschreibung[18][0]='Während sich die Vorgänger der Grauen Panther vor allem als Seniorenvertretung verstanden haben, will die Partei nun für alle Generationen eintreten. In ihrem Wahlprogramm für Berlin fordert sie die Einführung eines Transrapids, eine gesicherte Grundrente ab dem 60. Lebensjahr sowie die Abschaffung von Geheimdiensten.';
WOMT_aParteienBeschreibung[19][0]='Die 2013 gegründete MENSCHLICHE WELT ist spirituell ausgerichtet. Sie fordert ein Bildungssystem zur ganzheitlichen Persönlichkeitsentfaltung, Verhaltensregeln für Abgeordnete und rechtliche Verbindlichkeit von Wahlprogrammen.';
WOMT_aParteienBeschreibung[20][0]='Die Partei für Gesundheitsforschung gründete sich 2015 als Einthemenpartei. Ihr Ziel ist es, die Forschung zu Alterskrankheiten zu unterstützen. Dazu fordert sie, ein Prozent des Berliner Landeshaushaltes in die Entwicklung von Therapien in diesem Feld zu investieren.';
WOMT_aParteienBeschreibungChecksum["sum"]='2725dd7b30295ea9009fd6f61eb27159';
WOMT_aParteienBeschreibungChecksum["sum2"]='279ac5a50056b3b2c0f08f6828f0b4d1';
WOMT_sGenerationTimeParteienBeschreibung ='28.07.2016 22:26:02';
