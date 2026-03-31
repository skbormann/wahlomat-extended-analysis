// UTF8-Zeichen öäüðý


/**
 * Partei-Informationen
 *
 * Aus Thesen-CMS ausgespielt fuer Wahl-o-mat 1044
 *
 * 1.0.0        12.05.2021 06:39:12 Wahl-O-Mat
 *
 * @category    Bpb
 * @package     Wahl-O-Mat
 * @subpackage  CMS-Definitionen-Parteiinformationen
 * @copyright   Bundeszentrale fuer politische Bildung
 */

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
var WOMT_aParteienBeschreibung = new Array();
var WOMT_aParteienBeschreibungChecksum = new Array();
var WOMT_aParteienBeschreibungChecksumLanguage = new Array();
var WOMT_sGenerationTimeParteienBeschreibung = '';
WOMT_aParteienBeschreibung[0] = new Array();
WOMT_aParteienBeschreibung[1] = new Array();
WOMT_aParteienBeschreibung[2] = new Array();
WOMT_aParteienBeschreibung[3] = new Array();
WOMT_aParteienBeschreibung[4] = new Array();
WOMT_aParteienBeschreibung[5] = new Array();
WOMT_aParteienBeschreibung[6] = new Array();
WOMT_aParteienBeschreibung[7] = new Array();
WOMT_aParteienBeschreibung[8] = new Array();
WOMT_aParteienBeschreibung[9] = new Array();
WOMT_aParteienBeschreibung[10] = new Array();
WOMT_aParteienBeschreibung[11] = new Array();
WOMT_aParteienBeschreibung[12] = new Array();
WOMT_aParteienBeschreibung[13] = new Array();
WOMT_aParteienBeschreibung[14] = new Array();
WOMT_aParteienBeschreibung[15] = new Array();
WOMT_aParteienBeschreibung[16] = new Array();
WOMT_aParteienBeschreibung[17] = new Array();
WOMT_aParteienBeschreibung[18] = new Array();
WOMT_aParteienBeschreibung[19] = new Array();
WOMT_aParteienBeschreibung[20] = new Array();
WOMT_aParteienBeschreibung[0][0] = 'Die GRÜNEN haben ihren Ursprung in den neuen sozialen Bewegungen der 1970er Jahre, insbesondere in der Anti-Atomkraft-, der Friedens- und der Frauenrechtsbewegung. In Baden-Württemberg ist die Partei seit 1980 im Landtag vertreten und stellt seit 2011 den Ministerpräsidenten.';
WOMT_aParteienBeschreibung[1][0] = 'Die CDU wurde nach 1945 als überkonfessionelle Partei gegründet. Sie vereint konservative, wirtschaftsliberale und christlich-soziale Positionen. In Baden-Württemberg stellte sie von 1953 bis 2011 den Ministerpräsidenten und ist seit 2016 als Juniorpartnerin erneut an der Regierung beteiligt.';
WOMT_aParteienBeschreibung[2][0] = 'Die AfD entstand 2013 als Reaktion auf die politischen Maßnahmen in der Euro-Krise. Ab 2016 verschoben sich die innerparteilichen Machtstrukturen in der Partei zugunsten einer rechtspopulistischen Ausrichtung. Seit 2016 ist sie im Landtag von Baden-Württemberg vertreten.';
WOMT_aParteienBeschreibung[3][0] = 'Die SPD entstand im 19. Jahrhundert als Partei der Arbeiterbewegung. Sie vertritt moderat linke Positionen in der Wirtschafts- und Gesellschaftspolitik. In Baden-Württemberg war die Partei in zahlreichen Kabinetten vertreten. Seit 2016 befindet sie sich in der Opposition.';
WOMT_aParteienBeschreibung[4][0] = 'Die FDP wurde nach dem Zweiten Weltkrieg als liberale Partei gegründet. Sie vereint marktliberale Positionen in der Wirtschaftspolitik mit moderat-progressiven Positionen in der Gesellschaftspolitik. Die Partei war in Baden-Württemberg mehrfach an der Landesregierung beteiligt.';
WOMT_aParteienBeschreibung[5][0] = 'DIE LINKE entstand 2007 aus dem Zusammenschluss der PDS und der WASG. Sie tritt für Umverteilung und einen deutlichen Ausbau des Wohlfahrtsstaats ein. Sie und ihre Vorläuferinnen sind seit 1990 durchgängig im Bundestag vertreten, verpassten aber stets den Einzug in den Landtag von Baden-Württemberg.';
WOMT_aParteienBeschreibung[6][0] = 'Die ÖDP ging 1981 aus verschiedenen ökologischen Bewegungen hervor. Die Partei vereint auf der Grundlage christlich-humanistischer Werte ökologische mit wertkonservativen Positionen. Sie ist seit 2014 im Europäischen Parlament vertreten. Der Einzug in ein Landesparlament gelang ihr bisher nicht.';
WOMT_aParteienBeschreibung[7][0] = 'Die PIRATEN konzentrierten sich ab 2006 thematisch zunächst auf die Chancen und Risiken des Internets. Später kamen auch Themen wie direkte Demokratie und Transparenz hinzu. Sie waren von 2011 bis 2017 in verschiedenen Landtagen vertreten und halten seit 2014 ein Mandat im Europäischen Parlament.';
WOMT_aParteienBeschreibung[8][0] = 'Die PARTEI wurde 2004 gegründet. Sie wird als Satirepartei bezeichnet und karikiert in ihren Wahlkämpfen und auch im parlamentarischen Verhalten den politischen Prozess allgemein, aber auch andere Parteien und deren Vertreter. Seit 2014 ist sie im Europäischen Parlament vertreten.';
WOMT_aParteienBeschreibung[9][0] = 'Die FREIEN WÄHLER gingen 2009 aus kommunalen Wählergemeinschaften hervor und lassen sich in der rechten Mitte des politischen Spektrums einordnen. Sie bezeichnen sich als wertorientiert, liberal und bürgerlich. Die Stärkung der kommunalen Selbstverwaltung ist ein wichtiges Anliegen der Partei.';
WOMT_aParteienBeschreibung[10][0] = 'Die 2013 gegründete MENSCHLICHE WELT verfolgt das Ziel, dass alle Menschen ihre körperlichen, geistigen und spirituellen Potentiale frei entfalten können. Die spirituell ausgerichtete Partei steht den staatlichen Maßnahmen zur Bekämpfung der Covid-19-Pandemie kritisch gegenüber.';
WOMT_aParteienBeschreibung[11][0] = 'Die Partei Bündnis C entstand 2015 aus dem Zusammenschluss zweier christlich-fundamentalistisch ausgerichteter Parteien. Sie fordert eine Politik nach christlichen Grundsätzen. Die Familien- und Sozialpolitik bildet einen thematischen Schwerpunkt der Partei.';
WOMT_aParteienBeschreibung[12][0] = 'Die DKP wurde 1968 als Nachfolgeorganisation der 1956 verbotenen KPD gegründet. Sie hat zum Ziel, den Kommunismus als Gesellschafts- und Wirtschaftsordnung in Deutschland einzuführen und will sich dabei von den Lehren Marx, Engels und Lenins leiten lassen.';
WOMT_aParteienBeschreibung[13][0] = 'Die Partei dieBasis wurde 2020 von Gegnern der staatlichen Maßnahmen zur Eindämmung der Covid-19-Pandemie gegründet. Ihre Ziele sind von den Begriffen Freiheit, Machtbegrenzung, Achtsamkeit und Schwarmintelligenz bestimmt. Sie fasst die Politik als von den Bürgern entfremdet auf.';
WOMT_aParteienBeschreibung[14][0] = 'Die 2017 gegründete DiB will basisdemokratische Elemente stärken. Die Mitwirkungsmöglichkeiten in anderen Parteien sieht sie als nicht ausreichend an. Ihre eigenen Inhalte sollen weitgehend auf einer Online-Plattform abgestimmt und vom Parteitag nur noch bestätigt werden.';
WOMT_aParteienBeschreibung[15][0] = 'Die Eine für Alle - Partei wurde 2020 gegründet und stellt insbesondere den Aspekt der innerparteilichen Mitbestimmung in den Vordergrund. Eine Beteiligung aller Bürgerinnen und Bürger an Diskussionen innerhalb der Partei ist zentrales Element ihrer Programmatik und Parteistruktur.';
WOMT_aParteienBeschreibung[16][0] = 'Die KlimalisteBW wurde 2020 mit dem Fokus auf Umwelt- und Klimaschutz gegründet. Ihre zentrale Forderung ist die Begrenzung des globalen Temperaturanstiegs auf 1,5 Grad Celsius. Sie versteht sich als basisdemokratische Partei und fordert einen sozial-ökologischen Umbau von Wirtschaft und Gesellschaft.';
WOMT_aParteienBeschreibung[17][0] = 'Die Humanisten wurden 2014 gegründet. Die Partei stellt die Freiheit des Einzelnen in den Mittelpunkt und betont besonders die Bedeutung von Bildung, Wissenschaft und einer kritisch-rationalen Auseinandersetzung mit der Realität. Sie tritt für eine strikte Trennung von Staat und Kirche ein.';
WOMT_aParteienBeschreibung[18][0] = 'Die Gesundheitsforschung wurde 2015 mit dem alleinigen Anliegen gegründet, die Entwicklung von Medizin gegen Alterskrankheiten zu fördern. Dazu will die Partei die staatlichen Ausgaben hierfür erhöhen und mehr Wissenschaftler insbesondere in der Biochemie und Molekularbiologie ausbilden.';
WOMT_aParteienBeschreibung[19][0] = 'Die W2020 wurde 2020 von Gegnern der staatlichen Maßnahmen zur Eindämmung der Covid-19-Pandemie gegründet. Die Partei bewertet diese Maßnahmen als unverhältnismäßig, fordert die sofortige Aufhebung aller Beschränkungen und sieht alternativmedizinische Verfahren als der Schulmedizin gleichwertig an.';
WOMT_aParteienBeschreibung[20][0] = 'Die Partei Volt wurde 2017 als Bürgerbewegung gegründet, die die europäische Einigung und weitere Schritte in der europäischen Integration unterstützt. Bei der Europawahl 2019 trat sie in sieben europäischen Ländern mit einem gemeinsamen Wahlprogramm an und konnte in Deutschland ein Mandat erzielen.';
WOMT_aParteienBeschreibungChecksumLanguage[0] = new Array();
WOMT_aParteienBeschreibungChecksumLanguage[0]['sum'] = 'f86a8249c0c36289d2c341866ebdbf2c';
WOMT_aParteienBeschreibungChecksumLanguage[0]['sum2'] = 'cd56c86d1ec7adb65c0686f0e8cdcd21';
WOMT_aParteienBeschreibungChecksum['sum'] = 'f86a8249c0c36289d2c341866ebdbf2c';
WOMT_aParteienBeschreibungChecksum['sum2'] = 'cd56c86d1ec7adb65c0686f0e8cdcd21';
WOMT_sGenerationTimeParteienBeschreibung = '12.05.2021 06:39:12';
