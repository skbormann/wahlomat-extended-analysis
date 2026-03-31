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
WOMT_aParteienBeschreibung[21]=new Array();
WOMT_aParteienBeschreibung[22]=new Array();
WOMT_aParteienBeschreibung[23]=new Array();
WOMT_aParteienBeschreibung[24]=new Array();
WOMT_aParteienBeschreibung[25]=new Array();
WOMT_aParteienBeschreibung[26]=new Array();
WOMT_aParteienBeschreibung[27]=new Array();
WOMT_aParteienBeschreibung[28]=new Array();
WOMT_aParteienBeschreibung[0][0]='Die 1875 gegründete SPD war über vierzig Jahre in Regierungsverantwortung und stellt auch aktuell die Ministerpräsidentin. Zur Landtagswahl setzt sie u.a. auf eine weitgehend kostenfreie Kinderbetreuung, Präventionsprogramme gegen Extremismus und eine Erhöhung der Polizeipräsenz in den Kommunen.';
WOMT_aParteienBeschreibung[1][0]='Die CDU wurde 1945 gegründet und stellte zuletzt von 2005 bis 2010 den Ministerpräsidenten. Zentral für ihr Programm ist ein christliches Menschenbild. Zur Wahl legt sie Schwerpunkte u.a. auf eine Stärkung der Inneren Sicherheit, Investitionen in die Infrastruktur und den Fortbestand von Förderschulen.';
WOMT_aParteienBeschreibung[2][0]='Die GRÜNEN entstanden in den 1970er-Jahren u.a. aus der Umwelt-, Friedens- und Frauenbewegung. Sie sind seit 1990 im Landtag und zuletzt in der Regierung vertreten. Zur Landtagswahl setzt die Partei etwa auf regenerative Energien, das Ziel der Haushaltskonsolidierung und die Integration von Flüchtlingen.';
WOMT_aParteienBeschreibung[3][0]='Die 1947 gegründete FDP war über dreißig Jahre in Regierungsverantwortung. In ihrem Programm genießt das Individuum Vorrang vor dem Kollektiv. Zur Landtagswahl fordert sie u.a. ein Schuldenverbot für die Landesverfassung, eine besser ausgestattete Polizei und ein Einwanderungsgesetz.';
WOMT_aParteienBeschreibung[4][0]='Die PIRATEN gründeten sich 2006 und zogen 2012 in den Landtag ein. Ihr programmatischer Schwerpunkt liegt u.a. auf den Themen informationelle Selbstbestimmung, Urheberrecht und Datenschutz. Zur Landtagswahl positioniert sich die Partei etwa für einen verstärkten Einsatz neuer Medien in Schulen.';
WOMT_aParteienBeschreibung[5][0]='DIE LINKE entstand 2007 durch den Beitritt der WASG in die PDS und war 2010 bis 2012 im Landtag vertreten. Ihr Ziel ist ein "demokratischer Sozialismus". Zur Landtagswahl fordert sie u.a. kostenlose Ganztagsschulen, das Abitur nach 13 Jahren und eine stärkere Belastung hoher Einkommen und großer Erbschaften.';
WOMT_aParteienBeschreibung[6][0]='Die 1964 gegründete NPD ist eine verfassungsfeindliche Partei, deren politisches Konzept die Menschenwürde missachtet. Ihr Programm wendet sich u.a. gegen eine "ethnische Überfremdung" durch Zuwanderung. Sie fordert Sozialleistungen nur an Deutsche zu zahlen und bezeichnet Integration als "Völkermord".';
WOMT_aParteienBeschreibung[7][0]='Die PARTEI gilt als Satirepartei und gründete sich im Jahr 2004. Ihre programmatischen Punkte und ihr Auftreten haben in der Regel satirischen Charakter. Unter anderem plädiert sie für den Wiederaufbau der Mauer und die Einführung einer "Faulenquote" für Führungspositionen.';
WOMT_aParteienBeschreibung[8][0]='Die FREIEN WÄHLER wurden in Nordrhein-Westfalen 2011 gegründet. Die Stärkung der Kommunen und der Ausbau direktdemokratischer Elemente sind zentrale Anliegen der Partei. Zur Landtagswahl fordern sie u.a. den Ausbau der Verkehrsinfrastruktur und höhere finanzielle Investitionen in Polizei und Justiz.';
WOMT_aParteienBeschreibung[9][0]='Die BIG entstand 2010 aus der Fusion kommunaler Wählerverbände. Ihr zentrales Thema ist der Einsatz für die bessere Integration von Migranten. Darauf aufbauend fordert sie z.B. Investitionen in Bildung und flexible Betreuungsangebote. Die Ehe versteht die BIG als Ehe zwischen Mann und Frau.';
WOMT_aParteienBeschreibung[10][0]='Die 2010 gegründete FBI/FWG diagnostiziert eine "scheindemokratische Parteiendiktatur". In ihrem Programm fordert sie u.a. die Stärkung der kommunalen Selbstverwaltung, eine Begrenzung der Zuwanderung und die Abschaffung der Sperrklausel bei Wahlen in Nordrhein-Westfalen.';
WOMT_aParteienBeschreibung[11][0]='Die ÖDP ging 1982 aus der grünen Bewegung hervor. Neben einem "konservativen Ökologismus" spielt auch die direkte Demokratie eine Rolle in ihrer Programmatik. In Nordrhein-Westfalen fordert sie u.a. eine Verlängerung der Grundschulzeit sowie einen schnellstmöglichen Kohleausstieg.';
WOMT_aParteienBeschreibung[12][0]='Die Volksabstimmung wurde 1997 gegründet und zielt darauf ab, Volksabstimmungen auf Bundesebene einzuführen. Daneben umfasst ihr Programm nationalkonservative Positionen. Zur Landtagswahl fordert sie u.a. die Streichung von Subventionen und Bürgerentscheide über die Aufnahme von "Zuzüglern".';
WOMT_aParteienBeschreibung[13][0]='Die 2017 gegründete TIERSCHUTZliste verfolgt das Ziel, dem Tierschutz als Interessensvertretung zu dienen und Tieren einen besonderen Schutzstatus zu gewähren. Zur Landtagswahl fordert sie u.a. Tierheime besser auszustatten und dem Tierschutz auch im Bereich der Bildung und Ausbildung Rechnung zu tragen.';
WOMT_aParteienBeschreibung[14][0]='Die AD-Demokraten NRW gründete sich 2016 mit dem Ziel, Menschen mit Migrationshintergrund politisch zu vertreten. Sie versteht sich als konservativ-liberale und soziale Partei. Ein wichtiger Punkt ihres Programms ist die Glaubensfreiheit. Außerdem fordert sie u.a. ein kommunales Wahlrecht für alle Ausländer.';
WOMT_aParteienBeschreibung[15][0]='Die 2013 gegründete AfD nimmt seit 2015 zunehmend das Thema Migration in den Fokus und fordert eine restriktive Asyl- und Einwanderungspolitik. In Nordrhein-Westfalen will sie u.a. die Inklusion an den Schulen beenden, Kriminelle härter bestrafen und die Braunkohle weiter als Energieträger nutzen.';
WOMT_aParteienBeschreibung[16][0]='AUFBRUCH C orientiert sich an christlichen Werten und legt dem eigenen politischen Denken und Handeln die zehn Gebote zugrunde. Die 2013 gegründete Partei setzt sich u.a. für die Unterstützung junger Familien ein, will umweltschonende Verkehrsmittel fördern und mehr Personal für die öffentliche Sicherheit einstellen.';
WOMT_aParteienBeschreibung[17][0]='Die BGE gründete sich 2016 explizit als Ein-Themen-Partei. Auch zur Landtagswahl stellt sie daher die Schaffung eines bedingungslosen Grundeinkommens als ihr einziges Ziel vor. Bei Entscheidungen zu anderen Themen sind ihre Vertreter nur dem eigenen Gewissen unterworfen.';
WOMT_aParteienBeschreibung[18][0]='Die DBD wurde 2016 gegründet. Sie ordnet sich in der politischen Mitte ein. Zur Landtagswahl fordert sie u.a. mehr Sicherheit durch die Verstärkung von Polizei, Staatsanwaltschaften und Gerichten sowie bessere basisdemokratische Elemente. "Unsoziale Rentenreformen" möchte die Partei verhindern.';
WOMT_aParteienBeschreibung[19][0]='Die 1968 gegründete DKP gilt als linksextremistisch und strebt die Errichtung eines sozialistischen Systems an. In ihrem Programm zur Landtagswahl fordert sie u.a. das Ende aller Auslandseinsätze der Bundeswehr, die Einführung der 30-Stunden-Woche, kostenlose Kita-Plätze und eine Anhebung des Mindestlohns.';
WOMT_aParteienBeschreibung[20][0]='Das ZENTRUM wurde bereits im deutschen Kaiserreich als Vertretung des Katholizismus gegründet und war bis in die 1950er-Jahre im Landtag vertreten. Zur Landtagswahl fordert die Partei u.a. die Rückkehr zum Abitur nach 13 Jahren, besseren Schutz gegen Einbrüche und Beschränkungen bei der Zuwanderung.';
WOMT_aParteienBeschreibung[21][0]='Die 2012 gegründete Partei DIE RECHTE gilt als Sammelbecken für Neonazis aus mehreren verbotenen Kameradschaften. Sie verfolgt eine völkisch-nationalistische Politik und positioniert sich offen rassistisch und antisemitisch. 2015 sprach sich die Partei besonders gegen die Aufnahme von muslimischen Flüchtlingen aus.';
WOMT_aParteienBeschreibung[22][0]='Die 1983 gegründete REP zeichnet sich durch eine abwehrende Haltung zur Zuwanderung aus. Zur Landtagswahl will sie u.a. mehr Stellen bei der Polizei sowie Kita-Plätze schaffen. Daneben wendet sie sich gegen die aktuelle Flüchtlingspolitik und fordert, die eigene Bevölkerung in den Mittelpunkt zu stellen.';
WOMT_aParteienBeschreibung[23][0]='DIE VIOLETTEN gründeten sich 2001 und verstehen sich als "Sprachrohr" spiritueller Menschen. Die Partei spricht sich u.a. für ein bedingungsloses Grundeinkommen, das Ende der industriellen Landwirtschaft, die Abschaffung der Noten in der Schule und eine Entschleunigung der Gesellschaft aus.';
WOMT_aParteienBeschreibung[24][0]='Die JED wurde 2017 von jungen Menschen gegründet und will vor allem deren Interessen vertreten. Sie fordert u.a. den Ausbau der digitalen Infrastruktur, eine liberalisierte Drogenpolitik, eine Reform der Europäischen Union und die Senkung des Wahlalters. Obergrenzen für Flüchtlinge lehnt die Partei ab.';
WOMT_aParteienBeschreibung[25][0]='Die MLPD gilt als linksextremistisch. Sie wurde 1982 als "revolutionäre Alternative" gegründet. Zur Landtagswahl fordert sie u.a. die Rettung von Arbeitsplätzen in der Stahlindustrie. Außerdem wendet sie sich gegen den Ausstieg aus der Steinkohleförderung und die Sperrklausel bei Kommunalwahlen.';
WOMT_aParteienBeschreibung[26][0]='Die Gesundheitsforschung verfolgt einzig das Ziel, die Forschung gegen altersbedingte Krankheiten zu fördern. Nach dem Willen der 2015 gegründeten Partei soll zusätzlich ein Prozent des staatlichen Haushalts in diese Forschung investiert werden. Zu anderen politischen Fragen positioniert sich die Partei nicht.';
WOMT_aParteienBeschreibung[27][0]='Schöner Leben wurde 2016 gegründet. Die Partei will sich für eine sanktionsfreie Grundsicherung einsetzen und Bildung komplett gebührenfrei gestalten. Ein weiterer Schwerpunkt sind direktdemokratische Elemente wie Volksbegehren und der Auf- und Ausbau von Kinder- und Jugendparlamenten.';
WOMT_aParteienBeschreibung[28][0]='Die V-Partei³ sieht sich als Sprachrohr der in Deutschland lebenden Vegetarier und Veganer. Sie wurde 2016 gegründet. In ihrem Programm fordert sie u.a. ein Verbot von Tierschlachtungen zur Herstellung von Nahrungsmitteln, Einschränkungen bei den Jagdgesetzen und ein Verbot von Tierversuchen.';
WOMT_aParteienBeschreibungChecksum["sum"]='c5792aff2a533f586457d1cd64122a08';
WOMT_aParteienBeschreibungChecksum["sum2"]='d49703f07fe9945c2660d32717b144d6';
WOMT_sGenerationTimeParteienBeschreibung ='25.04.2017 13:22:17';
