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
WOMT_aParteienBeschreibung[0][0]='CDU und CSU sind bürgerliche Volksparteien. Seit 1949 bilden sie im Bundestag eine Fraktionsgemeinschaft. Mit der FDP bilden sie derzeit eine Koalitionsregierung.';
WOMT_aParteienBeschreibung[1][0]='In ihrem Wahlprogramm betont die SPD ihren Markenkern der sozialen Gerechtigkeit. Darüber hinaus versteht sich die Partei als Garant von Freiheits- und Grundrechten. Die SPD ist die älteste Partei Deutschlands und nach ihrer letzten Regierungsbeteiligung seit 2009 stärkste Oppostionspartei.';
WOMT_aParteienBeschreibung[2][0]='Die FDP definiert sich als liberale, bürgerliche Partei und gilt als wirtschaftsnah. Seit 2009 bildet sie mit CDU und CSU die Bundesregierung: Keine andere Partei war in der Geschichte der Bundesrepublik an so vielen Bundesregierungen beteiligt wie die FDP.';
WOMT_aParteienBeschreibung[3][0]='DIE LINKE besteht als Partei seit 2007 und ist aus der WASG und der PDS hervorgegangen. Ihre Hauptforderung ist soziale Gerechtigkeit, ihr Hauptanliegen der Kampf gegen den Kapitalismus. In den neuen Bundesländern ist die Partei bei Wahlen deutlich erfolgreicher als in den alten.';
WOMT_aParteienBeschreibung[4][0]='Seit 1983 sind die GRÜNEN im Bundestag vertreten. Von 1998 bis 2005 bildeten sie gemeinsam mit der SPD die Regierung. Die Partei zieht mit den Schwerpunktthemen Energiewende, Gerechtigkeit und moderne Gesellschaft in den Wahlkampf.';
WOMT_aParteienBeschreibung[5][0]='Nach ihrer Gründung 2006 zogen die PIRATEN 2011 und 2012 in vier Landesparlamente ein. Mit ihren bürgerrechts- und innenpolitischen Ansätzen positioniert sich die Partei im linksliberalen Spektrum. Bei der Bundestagswahl 2009 erreichte sie ein Zweitstimmenergebnis von 2 Prozent.';
WOMT_aParteienBeschreibung[6][0]='Die NPD wurde 1964 gegründet und ist in zwei Landtagen vertreten. Sie vertritt einen völkischen Nationalismus und stellt die "Volksgemeinschaft" in den Mittelpunkt ihrer Programmatik. Die NPD fordert, alle Menschen aus Deutschland auszuweisen, die aus ihrer Sicht nicht zur Volksgemeinschaft gehören.';
WOMT_aParteienBeschreibung[7][0]='Die Tierschutzpartei sieht sich als Bestandteil der Tierrechtsbewegung. Kerngedanke ist, dass nicht nur Menschen, sondern auch Tiere unveräußerliche Rechte besitzen. Diese sollen in das Grundgesetz aufgenommen und so geschützt werden. Bei der Bundestagswahl 2009 erreichte sie 0,5 Prozent der Stimmen.';
WOMT_aParteienBeschreibung[8][0]='Die 1983 gegründeten REPUBLIKANER sind eine Kleinpartei, deren Ziel "die Wahrung der deutsch-nationalen Heimat" ist. Nach anfänglichen Wahlerfolgen verloren sie schnell wieder an Bedeutung. Bei der Bundestagswahl 2009 erzielten DIE REPUBLIKANER lediglich 0,4 Prozent der Stimmen.';
WOMT_aParteienBeschreibung[9][0]='Die Wurzeln der ÖDP liegen in der Ökologiebewegung. Die Partei betont die Bedeutung der Bereiche Familie und Bildung, außerdem steht die Generationengerechtigkeit im Fokus der ÖDP. Bei der Bundestagswahl 2009 erreichte die ÖDP 0,3 Prozent der Stimmen.';
WOMT_aParteienBeschreibung[10][0]='Die FAMILIE verortet sich selbst in der politischen Mitte. Sie fordert die Zahlung eines Erziehungsgehalts und weitere sozialpolitische Maßnahmen zur Förderung von Familien mit Kindern. Bei der Bundestagswahl 2009 erhielt sie einen Stimmenanteil von 0,3 Prozent.';
WOMT_aParteienBeschreibung[11][0]='Der Fokus von Bündnis21/RRP liegt auf den Interessen von Rentnern. Zentrale Forderungen sind daher eine monatliche Mindestrente und die Berücksichtigung von Erziehungszeiten bei der Rente. Zur Bundestagswahl tritt die Partei mit einem weitreichenden, vor allem sozialpolitisch geprägten Programm an.';
WOMT_aParteienBeschreibung[12][0]='Die RENTNER sind stark verteilungspolitisch ausgerichtet. Sie verstehen sich selbst als Lobby für derzeitige und zukünftige Rentner. Angestrebt wird die Renten- und Pensionssysteme zu einer gesetzlichen Pflichtversicherung zusammen zu legen. Ebenso zentral ist die Forderung nach einer Mindestrente.';
WOMT_aParteienBeschreibung[13][0]='Die bereits 1946 gegründete BP sieht sich als Bewahrerin der bayerischen Traditionen und des Brauchtums. Sie lehnt die Abgabe von Souveränitätsrechten an die EU ab und kämpft für den Austritt aus dem Euroraum. Zentrales Wahlkampfthema ist außerdem die Forderung nach mehr direkter Demokratie.';
WOMT_aParteienBeschreibung[14][0]='Für die PBC sind Politik und Glauben untrennbar miteinander verwoben. Programmatisch fordert sie einen verpflichtenden Bibelunterricht, die Erschwerung von Ehescheidungen und eine Honorierung des "Berufs" der Mutter. Gleichgeschlechtliche oder außereheliche Lebensgemeinschaften lehnt die PBC ab.';
WOMT_aParteienBeschreibung[15][0]='Die BüSo sieht sich selbst als Teil einer internationalen Bürgerrechtsbewegung. Sie fordert einen Umbau des Weltwirtschaftssystems, die Rückkehr zur Kernenergie, den Austritt aus der Eurozone sowie einen Schuldenerlass für die Länder der "Dritten Welt".';
WOMT_aParteienBeschreibung[16][0]='DIE VIOLETTEN sehen sich selbst als Vertreter und Sprachrohr von spirituellen Menschen. Die Fassung von programmatischen Beschlüssen ist in der Partei generell schwierig, da eine Zustimmungsquote von 75 Prozent benötigt wird. Bei der Bundestagswahl 2009 erreichte sie 0,1 Prozent.';
WOMT_aParteienBeschreibung[17][0]='Das politische Konzept der MLPD ist angelehnt an die Theorien von Marx, Engels, Lenin, Stalin und Mao Tsetung. Zu den konkreten Zielen der Partei gehören die Errichtung einer Einheitsgewerkschaft, kostenlose Ganztagsbetreuung für Kinder, sowie die 30-Stunden-Woche bei vollem Lohnausgleich.';
WOMT_aParteienBeschreibung[18][0]='Zentrale Forderung der Partei Volksabstimmung ist die Einführung von Volksabstimmungen über sämtliche politische Fragen. Abgeordnete, Beamte und Richter sollen direkt gewählt und für schuldhaftes Verhalten persönlich haftbar gemacht werden können. Außerdem wird eine Rückkehr zur D-Mark gefordert.';
WOMT_aParteienBeschreibung[19][0]='Die PSG ist eine sozialistische Partei. Trotz ihrer Systemkritik tritt sie zur Bundestagswahl an, um die Interessen der Arbeiterschaft zu vertreten. Programmatisch fordert die PSG ein Grundeinkommen, welches über eine höhere Besteuerung von großen Einkommen finanziert werden soll.';
WOMT_aParteienBeschreibung[20][0]='Die AfD wurde Anfang 2013 gegründet. Leitthema der Partei sind die Kritik am Euro und am Management der Schulden- und Bankenkrise. Die AfD fordert eine geordnete Auflösung des Euro-Währungsgebietes, die Wiedereinführung nationaler Währungen oder die Schaffung kleinerer Währungsverbünde.';
WOMT_aParteienBeschreibung[21][0]='Die Partei BIG setzt sich ihrem Selbstverständnis nach für die Belange von Migranten ein. In ihrem Grundsatzprogramm formuliert die Partei das Ziel, "durch die Teilnahme an politischen Prozessen ... auf die Normalität von Bürgern mit Migrationshintergrund hinzuweisen".';
WOMT_aParteienBeschreibung[22][0]='pro Deutschland wurde 2005 gegründet. Die Partei tritt 2013 erstmalig bei einer Bundestagswahl an. In ihrer Programmatik verbinden sich islamfeindliche und rechtsextreme Elemente. So stellt eine harte Asylpolitik sowie die Islamfeindlichkeit der Partei den Markenkern ihres Programms dar.';
WOMT_aParteienBeschreibung[23][0]='DIE FRAUEN wurde 1995 gegründet. Die Partei stellt die feministische Perspektive ins Zentrum ihres Politikverständnisses. Ihr politisches Leitmotiv ist die "gleichwertige Vielfalt". DIE FRAUEN sprechen sich gegen jegliche Form von Gewalt aus und kämpfen für die Gleichberechtigung eines jeden Menschen.';
WOMT_aParteienBeschreibung[24][0]='Die FREIEN WÄHLER treten 2013 zum ersten Mal zu einer Bundestagswahl an. Vor allem in der bayerischen Kommunalpolitik ist die Partei stark vertreten. Auch den Sprung in einen Landtag schaffte sie erstmals und bislang einmalig 2008 in Bayern mit 10,2 Prozent.';
WOMT_aParteienBeschreibung[25][0]='Die Partei der Nichtwähler wurde 1998 gegründet. Sie versteht sich als eine Alternative zur Stimmenthaltung. In den politischen Meinungen ihrer Mitglieder, so die Partei der Nichtwähler, spiegle sich das Spektrum aller demokratischen Parteien wider.';
WOMT_aParteienBeschreibung[26][0]='Der Wahlspruch der PARTEI DER VERNUNFT lautet "Weniger Staat - mehr vom Leben". Sie wurde 2009 gegründet und vertritt einen radikalen Liberalismus, der auf einem Minimalstaat und der Betonung der Freiheit des einzelnen Bürgers fußt. Die Partei fordert eine Neuordnung des Geld- und Finanzsystems.';
WOMT_aParteienBeschreibung[27][0]='Die PARTEI ist eng mit dem Satiremagazin "Titanic" verbunden. Forderungen sind u.a. die Einführung eines G1-Schulsystems, in welchem nach der 5. Klasse das Abitur erreicht wird, eine gesetzliche Faulenquote und der Wiederaufbau der Mauer.';
WOMT_aParteienBeschreibungChecksum["sum"]='6f7c0c6c72289f9925d596f967028330';
WOMT_aParteienBeschreibungChecksum["sum2"]='ed2a6ec6265078cdfb3dee71e5493980';
WOMT_sGenerationTimeParteienBeschreibung ='05.09.2013 12:48:14';
