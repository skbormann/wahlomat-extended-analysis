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
WOMT_aParteienBeschreibung[0][0]='Die CDU wurde im November 1945 in Hessen gegründet. Zentral für ihr Programm ist ein christliches Menschenbild sowie konservative und liberale Wertvorstellungen. Seit 1999 führt sie die Landesregierung und stellt den Ministerpräsidenten. Für die Landtagswahl will sie an ihrem wirtschaftlichen, sozialen und bildungspolitischen Kurs festhalten.';
WOMT_aParteienBeschreibung[1][0]='In Hessen ist die SPD die mitgliederstärkste Partei. Von 1946 bis 1987 sowie 1991 bis 1999 war die SPD an der hessischen Landesregierung beteiligt und stellte den Ministerpräsidenten. Für die Landtagswahl fordert sie u.a. mehr bezahlbaren Wohnraum, gebührenfreie Kitas und Krippen sowie mehr Ausbildungsplätze für Erzieher.';
WOMT_aParteienBeschreibung[2][0]='Die GRÜNEN entstanden 1979 aus der Umwelt- und Friedensbewegung sowie der Anti-Atom und Ökobewegung. Seit 1984 waren die GRÜNEN in Hessen mit Unterbrechungen an vier Regierungen beteiligt - so auch aktuell. Sie fordern, dass Hessen ökologischer, sozialer und vielfältiger werden müsse. Ihr Schwerpunkt liegt auf Klima- und Umweltzielen.';
WOMT_aParteienBeschreibung[3][0]='DIE LINKE entstand 2007 durch den Beitritt der WASG in die PDS und ist seit 2008 im Landtag vertreten. Ihr Ziel ist ein "demokratischer Sozialismus" im Sinne einer gerechteren sozialen Gesellschaft. Zur Landtagswahl fordert sie u.a. mehr Sozialwohnungen, einen Landesaktionsplan gegen Kinderarmut und Preissenkungen für den ÖPNV.';
WOMT_aParteienBeschreibung[4][0]='Die FDP wurde 1948 gegründet und steht für einen "sozialen und politischen Liberalismus". In ihrem Wahlprogramm setzt sie auf die Themen Bildung, Wirtschaft und Soziales, wobei sich die Digitalisierung durch alle Felder des Programms zieht. Daher fordert sie u.a. eine leistungsfähige Infrastruktur sowie kleine und mittlere Unternehmen bei der Digitalisierung zu unterstützen.';
WOMT_aParteienBeschreibung[5][0]='Die 2013 gegründete AfD nimmt seit 2015 zunehmend die Themen Migration und Islam sowie gesellschaftspolitische Fragen in den Fokus. Im Wahlprogramm fordert sie u.a. eine restriktive Asyl- und Einwanderungspolitik und will die staatliche Macht und familiäre Traditionen stärken.';
WOMT_aParteienBeschreibung[6][0]='Die PIRATEN sind um die Themen Netzpolitik, Digitalisierung, Transparenz und Partizipation entstanden. Der hessische Landesverband der PIRATEN wurde 2007 gegründet. Zur Landtagswahl fordern sie u.a. das aktive Wahlrecht ab 14 Jahren, ein bedingungsloses Grundeinkommen und bezahlbaren Wohnraum.';
WOMT_aParteienBeschreibung[7][0]='Die Partei FREIE WÄHLER besteht seit 2009. In Hessen steht sie für eine Politik nah am Bürger und dessen Bedürfnissen. Für die Landtagswahl fordert sie u.a. flächendeckende und kostenfreie Ganztagsbetreuung für Kinder, eine dezentrale Energieversorgung und eine wohnortnahe Versorgung mit Krankenhäusern.';
WOMT_aParteienBeschreibung[8][0]='Die NPD ist eine rechtsextreme Partei, deren politisches Konzept die Menschenwürde missachtet. Sie lehnt die freiheitliche Demokratie ab und vertritt fremdenfeindliche Positionen. In ihrem Programm wendet sie sich u.a. gegen Zuwanderung und "ethnische Überfremdung".';
WOMT_aParteienBeschreibung[9][0]='Die PARTEI verwendet satirische Elemente in ihren Programmen und Aktionen. Der Landesverband Hessen besteht seit 2005 und trat erstmals bei der Landtagswahl 2013 an. In ihrem Wahlprogramm fordert Die PARTEI u.a. das Unterrichten in der Grundschule via Snapchat und in der Oberstufe via Tinder.';
WOMT_aParteienBeschreibung[10][0]='Die ÖDP ist eine ökologische und wertkonservative Partei. Sie zog 2014 mit einem Abgeordneten ins Europaparlament ein. Für die Landtagswahl bildet Bildung das zentrale Thema. Die Partei tritt u.a. für den Erhalt des dreigliedrigen Schulsystems und der Förderschulen ein.';
WOMT_aParteienBeschreibung[11][0]='Während sich die Vorgänger der Grauen Panther vor allem als Seniorenvertretung verstanden haben, will die Partei nun für alle Generationen eintreten. Für die Landtagswahl bildet die Schulpolitik in Hessen das wichtigste Thema der Partei: Sie fordert mehr Ganztagsschulen, gleiche Bildungschancen für alle und kostenfreie Bildung.';
WOMT_aParteienBeschreibung[12][0]='Die BüSo wurde 1992 gegründet. Zentral für ihr Programm ist eine neue Weltwirtschaftsordnung, die sie mit Änderungen im Finanzsystem und transnationalen sowie globalen Infrastrukturprojekten erreichen will. Für die Landtagswahl steht sie u.a. für den Bau von Magnetschwebebahnen zwischen den größeren Städten.';
WOMT_aParteienBeschreibung[13][0]='Die Partei AD-Demokraten wurde 2016 gegründet. Sie versteht sich als konservativ-liberale und soziale Partei und befürwortet einen "gesunden Patriotismus und Nationalstolz". Kernforderungen sind die Einführung der doppelten Staatsbürgerschaft sowie des Kommunal- und Landeswahlrechts für Ausländer.';
WOMT_aParteienBeschreibung[14][0]='Das Bündnis C wurde 2016 gegründet und tritt zum ersten Mal bei einer hessischen Landtagswahl an. Programmatisch orientiert sich das Bündnis C weitgehend an christlichen Werten. Für die Landtagswahl will sie u.a. die Ehe und Familie fördern und ein Erziehungsgehalt einführen.';
WOMT_aParteienBeschreibung[15][0]='Die BGE, in Hessen 2017 gegründet, verfolgt als einziges politisches Ziel die Einführung eines bedingungslosen Grundeinkommens in Deutschland. Andere Themen sind für die Partei nur dann von Bedeutung, wenn sie Einfluss auf das bedingungslose Grundeinkommen haben. Nach Erreichen ihres alleinigen Ziels will sich die Partei auflösen.';
WOMT_aParteienBeschreibung[16][0]='DIE VIOLETTEN gründeten sich 2001 und verstehen sich als "Sprachrohr" spiritueller Menschen. Der hessische Landesverband existiert seit 2006. Die Partei spricht sich u.a. für ein bedingungsloses Grundeinkommen, den verantwortungsvollen Umgang mit der Natur sowie für mehr Transparenz und offene Kommunikation in Wirtschaft und Politik aus.';
WOMT_aParteienBeschreibung[17][0]='Die LKR wurde 2015 unter dem Namen ALFA vom ehemaligen AfD-Sprecher Lucke gegründet. Sie vertritt konservative und wirtschaftsliberale Positionen. Im Programm für die Landtagswahl setzt sich die LKR u.a. für eine personell und materiell bessere Ausstattung der Polizei sowie einer Bildungspolitik nach dem Leistungsprinzip ein.';
WOMT_aParteienBeschreibung[18][0]='Die MENSCHLICHE WELT orientiert sich an der Theorie eines indischen Philosophen und möchte die Gesellschaft auf der Basis spiritueller Praktiken verbessern. Kern dieses Konzepts bilden Spiritualität, Ethik, Rationalität, Neohumanismus sowie eine gemeinwohlorientierte Wirtschaft und Regierung. Sie setzt sich u.a. für kostenlose und umfassende Bildungsmöglichkeiten ein.';
WOMT_aParteienBeschreibung[19][0]='Die Partei der Humanisten vertritt eine Politik, die sich auf Naturgesetze und Wissenschaft gründet. Sie fordert sie u.a. eine "flächendeckende Grundversorgung mit religiös-weltanschaulich neutralen Einrichtungen" im Bereich Kinderbetreuung, Gesundheitswesen, Schul- und Universitätsausbildung.';
WOMT_aParteienBeschreibung[20][0]='Die Gesundheitsforschung verfolgt die bessere Erforschung altersbedingter Krankheiten als einziges politisches Ziel. In ihrem Programm fordert sie daher, ein zusätzliches Prozent des Landeshaushaltes in dieses Forschungsgebiet zu investieren. Zu anderen politischen Fragestellungen äußert sich die Partei nicht.';
WOMT_aParteienBeschreibung[21][0]='Die Tierschutzpartei existiert in Hessen seit 1995. Programmatisch rückt die Partei die Belange der Tiere ins Zentrum, obgleich sie einen ganzheitlichen Anspruch vertritt, in dem Mensch, Tier und Natur in Einklang miteinander stehen. Sie fordert u.a. Massentierhaltung abzuschaffen und Tierversuche zu beenden.';
WOMT_aParteienBeschreibung[22][0]='Die V-Partei³ sieht sich als Vertretung von Vegetariern und Veganern. Ihre Kernforderungen zielt auf die Verbesserung des Verbraucher-, Klima- und Tierschutzes. In ihrem Programm setzt die Partei auf die Förderung regionaler Landwirtschaft und Agrarökologie sowie eine striktere Orientierung am Tierwohl.';
WOMT_aParteienBeschreibungChecksum["sum"]='2dee53f12f100ac9ac1e810ef4810008';
WOMT_aParteienBeschreibungChecksum["sum2"]='9f61be14ba7f99558cbe6ab482b3a351';
WOMT_sGenerationTimeParteienBeschreibung ='24.09.2018 20:22:36';
