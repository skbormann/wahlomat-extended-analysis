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
WOMT_aParteienBeschreibung[0][0]='Die SPD ist 1863 aus der Arbeiterbewegung entstanden und seit 1991 in Rheinland-Pfalz in Regierungsverantwortung. Zur Wahl 2016 verweist sie auf ihre Regierungspolitik und setzt sich u.a. für gebührenfreie Bildungsangebote und einen besseren Zugang zum Arbeitsmarkt für Flüchtlinge ein.';
WOMT_aParteienBeschreibung[1][0]='Die CDU gründete sich in Rheinland-Pfalz 1947 und hat konservative, liberale und christlich-soziale Wurzeln. Bis 1991 stellte sie den Ministerpräsidenten. Zur Wahl spricht sie sich u.a. für eine Reduzierung der ankommenden Flüchtlinge aus und will Eltern mit einem "Landesfamiliengeld" unterstützen.';
WOMT_aParteienBeschreibung[2][0]='Die GRÜNEN sind 1979 aus der Umwelt-, Friedens- und Frauenbewegung entstanden und waren 1987 erstmals im rheinland-pfälzischen Landtag vertreten. Sie wollen bis 2050 den Energieverbrauch in Rheinland-Pfalz halbieren und fordern zur Landtagswahl u.a. gleiche Zugangschancen zu Bildung für alle.';
WOMT_aParteienBeschreibung[3][0]='Die FDP ist 1948 aus dem Zusammenschluss mehrerer liberaler Parteien entstanden. Bis 2011 war sie, mit einer Unterbrechung 1983, im rheinland-pfälzischen Landtag vertreten. Mit Forderungen u.a. im Bereich Infrastruktur und nach verpflichtenden Integrationsvereinbarungen kämpft sie 2016 um den Wiedereinzug ins Parlament.';
WOMT_aParteienBeschreibung[4][0]='DIE LINKE ist 2007 aus der Linkspartei.PDS und der WASG entstanden. Sie bezeichnet sich als demokratisch-sozialistische Partei. 2016 möchte sie erstmals in den Landtag von Rheinland-Pfalz einziehen und fordert u.a. den Ausbau des Sozialstaates und 100 Prozent regenerative Energien bis 2030.';
WOMT_aParteienBeschreibung[5][0]='Die FREIEN WÄHLER gründeten sich in Rheinland-Pfalz 2010 aus kommunalpolitisch aktiven Wählergruppen. In ihrem Programm finden sich liberale und wertkonservative Positionen. In Rheinland-Pfalz setzen sie sich u.a. für die Verbesserung der Kommunalfinanzen und mehr Bürgerbeteiligung ein.';
WOMT_aParteienBeschreibung[6][0]='Die PIRATEN gründeten sich 2006 und setzen sich vor allem für den Datenschutz und den Schutz der Privatsphäre, für informationelle Selbstbestimmung sowie den freien Zugang zu Information und Bildung ein. Zur Landtagswahl fordern sie u.a. auch die Abschaffung des staatlichen Glücksspielmonopols.';
WOMT_aParteienBeschreibung[7][0]='Die rechtsextremistische NPD wurde 1964 gegründet und war von 1967 bis 1971 im Landtag von Rheinland-Pfalz vertreten. Im Mittelpunkt ihres Programms stehen die Homogenität der "Volksgemeinschaft" und die Diffamierung von Ausländern. Im Wahlkampf fordert sie u.a. die Förderung deutscher Familien.';
WOMT_aParteienBeschreibung[8][0]='Die REP wurde 1983 gegründet und hat sich von einer rechtspopulistischen bzw. rechtsextremistischen Partei zu einer national-konservativen Partei gewandelt. Zur Wahl 2016 fordert sie u.a. einen Einwanderungsstopp für "illegale Einwanderer" und den Ausbau direktdemokratischer Elemente.';
WOMT_aParteienBeschreibung[9][0]='Die ÖDP entstand 1982 aus der Ökologiebewegung und kombiniert diesen Ursprung mit konservativen und basisdemokratischen Ansätzen. Zur Landtagswahl in Rheinland-Pfalz fordert sie u.a. einen erweiterten Lärmschutz der Bahnstrecken im Mittelrheintal. Zudem möchte sie Asylverfahren beschleunigen.';
WOMT_aParteienBeschreibung[10][0]='Die ALFA gründete sich 2015 als Abspaltung der AfD. In ihrem Wahlprogramm fordert sie u.a. bessere Mitbestimmungsmöglichkeiten der Bürger, einen stärkeren Grenzschutz, die Entlohnung von familiärer Kinderbetreuung und die Gleichbehandlung von gleichgeschlechtlichen Partnerschaften.';
WOMT_aParteienBeschreibung[11][0]='Die AfD gründete sich 2013 aus Protest gegen die Euro-Rettungspolitik. 2015 setzte sich der nationalkonservative Flügel im innerparteilichen Richtungsstreit durch. Im Wahlprogramm für Rheinland-Pfalz fordert sie u.a. die rasche Abschiebung krimineller und extremistischer Asylbewerber.';
WOMT_aParteienBeschreibung[12][0]='Die rechtsextremistische Partei III. Weg wurde 2013 gegründet und vertritt die "Vorstellung einer am Rassegedanken ausgerichteten Volksgemeinschaft". In ihrem Wahlprogramm sieht sie die nationale Identität durch Überfremdung bedroht und fordert u.a. die Todesstrafe für die Ermordung eines Kindes.';
WOMT_aParteienBeschreibung[13][0]='DIE EINHEIT gründete sich 2013 als Vertreterin der Interessen von Migranten und insbesondere von Aussiedlern und Spätaussiedlern. Zur Landtagswahl fordert sie u.a. eine Reduzierung des Schienengüterverkehrs im Mittelrheintal und die "Befreiung von der Sexualkundepflicht in der Grundschule".';
WOMT_aParteienBeschreibungChecksum["sum"]='8582a940b1b0b3d48a5918a82d025570';
WOMT_aParteienBeschreibungChecksum["sum2"]='ecc7547a342309d6db03fa0824c1dace';
WOMT_sGenerationTimeParteienBeschreibung ='15.02.2016 11:02:47';
