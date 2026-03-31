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
WOMT_aParteienBeschreibung[29]=new Array();
WOMT_aParteienBeschreibung[30]=new Array();
WOMT_aParteienBeschreibung[31]=new Array();
WOMT_aParteienBeschreibung[0][0]='CDU und CSU stützen sich auf christliche Werte und kombinieren eine marktwirtschaftliche Ausrichtung mit staatlichen Eingriffen. Sie stellen aktuell wie in 48 von 68 Jahren die Kanzlerin bzw. den Kanzler. Zur Bundestagswahl geben sie Vollbeschäftigung als Ziel aus und wollen eine moderate Steuerentlastung umsetzen.';
WOMT_aParteienBeschreibung[1][0]='Die SPD stützt sich auf die Grundwerte Freiheit, Gerechtigkeit und Solidarität. Sie ist derzeit Teil der Bundesregierung und stellte in 20 von 68 Jahren den Kanzler. In ihrem Wahlprogramm will sie hohe Einkommen und große Erbschaften stärker besteuern und Bildung bis zum ersten Abschluss gebührenfrei gestalten.';
WOMT_aParteienBeschreibung[2][0]='DIE LINKE tritt für einen demokratischen Sozialismus und einen umfassenden Ausbau des Sozialstaates ein. Sie ist seit 1990 im Bundestag vertreten. Zur Bundestagswahl fordert sie eine deutliche Erhöhung des Mindestlohns und eine Anhebung des Rentenniveaus sowie den Rückzug der Bundeswehr aus allen Auslandseinsätzen.';
WOMT_aParteienBeschreibung[3][0]='Die GRÜNEN orientieren sich an den Themen Umweltschutz, Bürger- und Menschenrechte, Gleichstellung sowie Demokratisierung der Gesellschaft. Seit 1983 sind sie im Bundestag vertreten. Zur Bundestagswahl wenden sie sich gegen eine Verschärfung des Asylrechts und wollen ab 2030 nur noch abgasfreie Autos zulassen.';
WOMT_aParteienBeschreibung[4][0]='Die FDP bewertet Freiheit höher als Gleichheit. Sie war über viele Jahre an Bundesregierungen beteiligt, ist seit 2013 aber nicht mehr im Bundestag vertreten. In ihrem Wahlprogramm fordert sie höhere Bildungsausgaben. Sie setzt sich für Steuerentlastungen ein und spricht sich gegen eine anlasslose Überwachung aus.';
WOMT_aParteienBeschreibung[5][0]='Die AfD wendet sich gegen die aktuelle Europapolitik und nimmt verstärkt die Themen Asyl und Zuwanderung in den Fokus. Sie ist seit 2014 bei allen Wahlen in die Parlamente eingezogen. In ihrem Wahlprogramm fordert sie die Schließung der Grenzen und bezweifelt, dass der Klimawandel vorwiegend menschengemacht ist.';
WOMT_aParteienBeschreibung[6][0]='Die PIRATEN sind um die Themen Netzpolitik, Digitalisierung, Transparenz und Partizipation entstanden. Sie waren zwischen 2011 und 2017 in mehreren Landtagen vertreten. Zur Bundestagswahl möchten sie die Videoüberwachung einschränken, ein bedingungsloses Grundeinkommen schaffen und das Asylrecht vereinfachen.';
WOMT_aParteienBeschreibung[7][0]='Die NPD ist eine rechtsextreme Partei, deren politisches Konzept die Menschenwürde missachtet. Sie lehnt die freiheitliche Demokratie ab und vertritt fremdenfeindliche Positionen. In ihrem Programm wendet sie sich gegen Zuwanderung, "ethnische Überfremdung" und die Einbindung Deutschlands in die Europäische Union.';
WOMT_aParteienBeschreibung[8][0]='Die FREIEN WÄHLER sind aus kommunalpolitisch aktiven Wählergemeinschaften entstanden. Sie sind seit 1998 im Bayerischen Landtag vertreten. Zur Bundestagswahl fordern sie Volksentscheide und eine Direktwahl des Bundespräsidenten. Außerdem sprechen sie sich für kostenfreie Kinderbetreuung aus.';
WOMT_aParteienBeschreibung[9][0]='Die Tierschutzpartei gesteht Tieren unveräußerliche Grundrechte zu, die nur in Notwehrsituationen berührt werden dürfen. Sie zog 2014 mit einem Abgeordneten ins Europaparlament ein. Zur Bundestagswahl fordert sie ein Verbot aller Tierversuche und die gleichberechtigte Teilhabe aller Menschen an allen Lebensbereichen.';
WOMT_aParteienBeschreibung[10][0]='Die ÖDP ist eine ökologische und wertkonservative Partei. Sie zog 2014 mit einem Abgeordneten ins Europaparlament ein. In ihrem Wahlprogramm fordert sie den Ausstieg aus der Braunkohle sowie mehr Wertschätzung für Kindererziehung und Pflege durch Familienangehörige. Volksentscheide will die Partei ausweiten.';
WOMT_aParteienBeschreibung[11][0]='Die PARTEI verwendet satirische Elemente in ihren Programmen und Aktionen. Sie zog 2014 mit einem Abgeordneten ins Europaparlament ein. In ihrem Wahlprogramm fordert sie eine bundesweite Bierpreisbremse, die Abschaffung von Tierversuchen und die Unterdrückung von Beschwerden über Ungerechtigkeit.';
WOMT_aParteienBeschreibung[12][0]='Die BP fordert einen Volksentscheid über die Unabhängigkeit Bayerns. Sie war von 1949 bis 1953 im ersten Bundestag vertreten. In ihrem Programm positioniert sie sich außerdem für einen Ausstieg aus dem Euro, will Schwangerschaftsabbrüche deutlich einschränken und ausländische Wiederholungstäter sofort abschieben.';
WOMT_aParteienBeschreibung[13][0]='Die Volksabstimmung vereint Forderungen nach direktdemokratischen Elementen auf Bundesebene mit nationalkonservativen Positionen. Sie fordert die Anhebung des Rentenniveaus sowie die Wiedereinführung der D-Mark und befürwortet die Gleichstellung von Naturheilverfahren mit der Schulmedizin.';
WOMT_aParteienBeschreibung[14][0]='Die PDV setzt auf die Stärkung der Freiheit sowie Verantwortung des Einzelnen und möchte staatliche Kompetenzen reduzieren. Parteipolitik möchte sie auf die kommunale Ebene zurückdrängen. Die Partei sieht die EU als überflüssig an und bezweifelt, dass der CO2-Ausstoß eine negative Auswirkung auf die Umwelt hat.';
WOMT_aParteienBeschreibung[15][0]='Die MLPD ist eine linksextreme, kommunistische Partei, deren Ziel die Schaffung einer klassenlosen Gesellschaft ist. In ihrem Wahlprogramm fordert sie höhere Löhne, die Absenkung des Renteneintrittsalters und ein uneingeschränktes Asylrecht. Die EU kritisiert sie als imperialistische Organisation.';
WOMT_aParteienBeschreibung[16][0]='Die BüSo fordert eine neue Weltwirtschaftsordnung, die sie mit Änderungen im Finanzsystem und transnationalen sowie globalen Infrastrukturprojekten erreichen will. Zur Bundestagswahl fordert sie die Beendigung des Atomausstiegs, den Ausbau wichtiger Bundeswasserstraßen und ein "Europa souveräner Republiken".';
WOMT_aParteienBeschreibung[17][0]='Die SGP ist eine antikapitalistische Partei, die sich das Ziel gesetzt hat, die internationale Arbeiterschaft zu vereinigen und eine Umgestaltung der Gesellschaft nach sozialistischen Grundsätzen durchzusetzen. Zur Bundestagswahl fordert sie die Abschaffung der Geheimdienste und die Auflösung von EU und Nato.';
WOMT_aParteienBeschreibung[18][0]='DIE RECHTE ist eine rechtsextreme Partei mit rassistisch motivierten fremden- und islamfeindlichen Äußerungen. Parlamentarismus betrachtet sie lediglich als Mittel zum Kampf gegen das demokratische System. Zur Bundestagswahl fordert sie ein Werbeverbot in Fremdsprachen und weitreichende Änderungen im Asylrecht.';
WOMT_aParteienBeschreibung[19][0]='Die Allianz Deutscher Demokraten möchte besonders Menschen mit Migrationshintergrund ein gleichberechtigtes Leben in Deutschland ermöglichen. In ihrem Programm setzt sie sich für die doppelte Staatsangehörigkeit sowie für die Rechte muslimischer Menschen ein. Die EU erklärt sie als gescheitert.';
WOMT_aParteienBeschreibung[20][0]='Die Tierschutzallianz bezieht neben ihrem Hauptanliegen Tierschutz auch andere Politikfelder in ihre Ziele mit ein. In ihrem Programm setzt sie sich ein für tierversuchsfreie Forschung, für mehr direkte Bürgerbeteiligung, für ein garantiertes Grundeinkommen und bessere Hygienestandards in Krankenhäusern.';
WOMT_aParteienBeschreibung[21][0]='Die B* ist eine alternative linke Partei, die ihre Wurzeln in der Berliner Hausbesetzer-Szene hat. In ihrem Programm fordert sie ein bedingungsloses Grundeinkommen und plädiert für eine Begrenzung von Besitz. Darüber hinaus wirbt sie für einen Nato-Austritt und die direkte Ausübung der politischen Macht durch das Volk.';
WOMT_aParteienBeschreibung[22][0]='Die BGE verfolgt als einziges politisches Ziel die Einführung eines bedingungslosen Grundeinkommens in Deutschland, womit allen die Teilhabe am Gemeinwesen ermöglicht werden soll. Andere Themen sind für die Partei nur dann von Bedeutung, wenn sie Einfluss auf das bedingungslose Grundeinkommen haben.';
WOMT_aParteienBeschreibung[23][0]='Die DiB setzt sich für eine stärkere Mitbestimmung und höhere Transparenz in der Politik ein. Zur Bundestagswahl fordert sie die Einführung verbindlicher Lobbyregister. Sie unterstützt eine Ausweitung der Kompetenzen der Europäischen Union und plädiert für eine "menschengerechte" Migrations- und Entwicklungspolitik.';
WOMT_aParteienBeschreibung[24][0]='Die DKP ist eine linksextreme Partei, die auf die Errichtung eines sozialistischen Systems hinarbeitet. In ihrem Programm zur Bundestagswahl benennt sie Frieden und soziale Sicherheit als ihre wichtigsten Themen. Sie fordert Investitionen, die Schaffung von Arbeitsplätzen und die Wiedereinführung der Vermögenssteuer.';
WOMT_aParteienBeschreibung[25][0]='Die DM äußert in vielen Politikfeldern Kritik und sieht die eigenen Positionen als unverhandelbar an. Sie lehnt den Euro sowie die EU ab und fordert eine Begrenzung der Zuwanderung. Die Partei spricht sich gegen den öffentlich-rechtlichen Rundfunk, den verpflichtenden Schulbesuch und gegen Zinsen sowie Steuern aus.';
WOMT_aParteienBeschreibung[26][0]='Die Grauen sind aus der Interessenvertretung von Senioren entstanden, verstehen sich aber als Partei für alle Generationen. In ihrem Programm fordern sie eine gesetzliche Mindestrente und die Senkung des Renteneintrittsalters. Sie plädieren für die Stärkung direkter Demokratie und die Senkung der Fünfprozenthürde.';
WOMT_aParteienBeschreibung[27][0]='Die du. versteht sich als Partei, welche die Schlüsselelemente der Hip-Hop-Kultur in politisches Handeln übertragen will. Sie spricht sich gegen Diskriminierung und für die Gleichstellung aller Bürger aus. In ihrem Programm fordert sie das Ende deutscher Waffenexporte und den Austritt Deutschlands aus der Nato.';
WOMT_aParteienBeschreibung[28][0]='Die MENSCHLICHE WELT orientiert sich an der Theorie eines indischen Philosophen und möchte die Gesellschaft auf der Basis spiritueller Praktiken verbessern. In ihrem Programm fordert sie eine Minimierung deutscher Waffenexporte, ein Verbot von Tierversuchen und die massive Förderung umweltfreundlicher Technologien.';
WOMT_aParteienBeschreibung[29][0]='Die Humanisten vertreten eine Weltsicht, die auf Naturgesetzen und Wissenschaft und nicht auf "Göttern oder höheren Mächten" gründet. In ihrem Programm fordern sie ein Ende der Beziehungen zwischen Kirche und Staat, die Legalisierung von Cannabis und freien Zugang zu steuerfinanzierten Forschungsergebnissen.';
WOMT_aParteienBeschreibung[30][0]='Die Gesundheitsforschung verfolgt als einziges politisches Ziel die bessere Erforschung altersbedingter Krankheiten. In ihrem Programm fordert sie daher, ein zusätzliches Prozent des Bundeshaushaltes in dieses Forschungsgebiet zu investieren. Zu anderen politischen Fragestellungen äußert sich die Partei nicht.';
WOMT_aParteienBeschreibung[31][0]='Die V-Partei³ sieht sich als Vertretung von Vegetariern und Veganern. Ihre Kernforderungen zielen auf die Verbesserung des Verbraucher-, Klima- und Tierschutzes. In ihrem Programm setzt sie sich gegen Tierschlachtungen zur Nahrungsmittelproduktion ein, entwickelt aber auch Positionen zu anderen Politikfeldern.';
WOMT_aParteienBeschreibungChecksum["sum"]='a30bb27be6dbe1995051c59e9aa3a97f';
WOMT_aParteienBeschreibungChecksum["sum2"]='debbc7c8258748126d9ab3093ec289bb';
WOMT_sGenerationTimeParteienBeschreibung ='11.09.2017 12:01:46';
