// UTF8-Zeichen öäüðý


/**
 * Partei-Informationen
 *
 * Aus Thesen-CMS ausgespielt fuer Wahl-o-mat 7629
 *
 * 1.0.0        25.08.2021 15:07:39 Wahl-O-Mat
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
WOMT_aParteienBeschreibung[21] = new Array();
WOMT_aParteienBeschreibung[22] = new Array();
WOMT_aParteienBeschreibung[23] = new Array();
WOMT_aParteienBeschreibung[24] = new Array();
WOMT_aParteienBeschreibung[25] = new Array();
WOMT_aParteienBeschreibung[26] = new Array();
WOMT_aParteienBeschreibung[27] = new Array();
WOMT_aParteienBeschreibung[28] = new Array();
WOMT_aParteienBeschreibung[29] = new Array();
WOMT_aParteienBeschreibung[30] = new Array();
WOMT_aParteienBeschreibung[31] = new Array();
WOMT_aParteienBeschreibung[32] = new Array();
WOMT_aParteienBeschreibung[0][0] = 'Die SPD entstand im 19. Jahrhundert als Partei der Arbeiterbewegung und versteht sich als „linke Volkspartei“. Sie vertritt moderat linke Positionen in der Wirtschafts- und Gesellschaftspolitik. In Berlin regiert sie zusammen mit der LINKEN und den GRÜNEN und stellt den Regierenden Bürgermeister.';
WOMT_aParteienBeschreibung[1][0] = 'Die CDU wurde nach 1945 als interkonfessionelle Partei gegründet. Sie vereint konservative, wirtschaftsliberale und christlich-soziale Positionen. Schwerpunkte des Berliner Wahlprogramms der CDU sind Wohnungspolitik, Verkehr und Sicherheit.';
WOMT_aParteienBeschreibung[2][0] = 'Die GRÜNEN haben ihren Ursprung in den sozialen Bewegungen der 1970er Jahre, insbesondere in der Anti-Atomkraft-, der Friedens- und der Frauenrechtsbewegung. In Berlin regieren sie in einer Koalition zusammen mit SPD und LINKEN. Kernforderungen für die Wahl sind u.a. Klimaschutz, eine soziale Verkehrswende und bezahlbare Mieten.';
WOMT_aParteienBeschreibung[3][0] = 'DIE LINKE entstand 2007 aus dem Zusammenschluss der PDS und der WASG. Sie tritt für Umverteilung und einen deutlichen Ausbau des Wohlfahrtsstaats ein. Sie, bzw. ihre Vorgängerparteien, ist seit 1990 durchgängig im Abgeordnetenhaus vertreten und regiert in Berlin zurzeit in Koalition mit SPD und GRÜNE.';
WOMT_aParteienBeschreibung[4][0] = 'Die AfD entstand 2013 als Reaktion auf die politischen Maßnahmen in der Euro-Krise. Ab 2016 verschoben sich die innerparteilichen Machtstrukturen in der Partei zugunsten einer rechtspopulistischen Ausrichtung. Seit 2016 ist sie im Abgeordnetenhaus vertreten. Schwerpunkte ihres Programms sind u.a. Migrations-, Wohnungs- und Sozialpolitik sowie die direkte Demokratie.';
WOMT_aParteienBeschreibung[5][0] = 'Die FDP wurde 1948 als liberale Partei gegründet. Sie vereint marktliberale Positionen in der Wirtschaftspolitik mit eher linksliberalen Positionen in der Gesellschaftspolitik. Die Partei war in Berlin mehrfach an der Landesregierung beteiligt. Sie setzt zur Wahl u.a. auf Technologieoffenheit, Wettbewerb und weniger Bürokratie.';
WOMT_aParteienBeschreibung[6][0] = 'Die PARTEI wurde 2004 gegründet. Sie wird als Satirepartei bezeichnet und karikiert in ihren Wahlkämpfen und auch im parlamentarischen Verhalten den politischen Prozess allgemein, aber auch andere Parteien und deren Vertreter. Seit 2014 ist sie im Europäischen Parlament vertreten.';
WOMT_aParteienBeschreibung[7][0] = 'Die Tierschutzpartei wurde 1993 gegründet und ist mit einem Sitz im Europäischen Parlament vertreten. Im Wahlkampf zur Abgeordnetenhauswahl lehnt sie u.a. Tierversuche und Massentierhaltung ab. Sie spricht sich für vegane Nahrungsmittel und ein Tierschutzverbands-Klagerecht aus.';
WOMT_aParteienBeschreibung[8][0] = 'Die PIRATEN wurde 2006 in Berlin gegründet und konzentrierten sich zunächst auf Netzpolitik. Später kamen Forderungen nach mehr Transparenz und politischer Partizipation hinzu. Sie waren von 2011 bis 2017 in verschiedenen Landtagen vertreten und halten seit 2014 ein Mandat im Europäischen Parlament.';
WOMT_aParteienBeschreibung[9][0] = 'Der Berliner Landesverband der Grauen Panther hat sich 2020 neu konstituiert. Die Partei fordert u.a. die Abschaffung prekärer Arbeitsverhältnisse und auskömmliche Renten. Sie will die Alten- und Krankenpflege verbessern und setzt in der Verkehrspolitik auf mehr Sicherheit für Fußgänger.';
WOMT_aParteienBeschreibung[10][0] = 'Die 1964 gegründete NPD ist laut Verfassungsschutz eine rechtsextremistische Partei, deren politisches Konzept die Menschenwürde missachtet. Sie lehnt die freiheitliche Demokratie ab und vertritt fremdenfeindliche, aggressiv-sozialpopulistische und antikapitalistische Positionen.';
WOMT_aParteienBeschreibung[11][0] = 'Die Gesundheitsforschung wurde 2015 mit dem alleinigen Anliegen gegründet, die Entwicklung von Medizin gegen Alterskrankheiten zu fördern. Dazu will die Partei die staatlichen Ausgaben hierfür erhöhen und mehr Wissenschaftler insbesondere in der Biochemie und Molekularbiologie ausbilden.';
WOMT_aParteienBeschreibung[12][0] = 'Die LKR wurde 2015 vom ehemaligen Bundessprecher der AfD, Bernd Lucke, gegründet. Ihr Wahlprogramm ist stark wirtschaftsliberal orientiert und kritisiert Bürokratie, Zentralismus und Dirigismus der EU. Für Berlin fordert sie u.a. einen Umbau der Verwaltung, Qualitätsmanagement in der Bildung und lehnt einen Mietendeckel ab.';
WOMT_aParteienBeschreibung[13][0] = 'Die DKP wurde 1968 als Nachfolgeorganisation der 1956 verbotenen KPD gegründet. Sie hat zum Ziel, den Kommunismus als Gesellschafts- und Wirtschaftsordnung in Deutschland einzuführen. Die DKP wird vom Bundesamt für Verfassungsschutz beobachtet und als linksextremistisch eingestuft.';
WOMT_aParteienBeschreibung[14][0] = 'Die SGP wurde 1971 gegründet und wird vom Verfassungsschutz als linksextremistisch eingestuft. Als trotzkistische Partei will sie die internationale Arbeiterschaft vereinigen und eine Umgestaltung der Gesellschaft nach sozialistischen Grundsätzen vorantreiben.';
WOMT_aParteienBeschreibung[15][0] = 'Die BüSo, 1992 gegründet, fordert eine neue Weltwirtschaftsordnung, die sie mit Änderungen im Finanzsystem und transnationalen sowie globalen Infrastrukturprojekten erreichen will. Die Partei setzt sich zudem für eine Kooperation mit Russland und China für den Ausbau der Neuen Seidenstraße ein.';
WOMT_aParteienBeschreibung[16][0] = 'Die 2013 gegründete MENSCHLICHE WELT verfolgt das Ziel, dass alle Menschen ihre körperlichen, geistigen und spirituellen Potentiale frei entfalten können. Die Partei möchte eine ganzheitlich-spirituelle Lebensführung mit einer dezentralen, ökologischen Gemeinwohlwirtschaft verbinden.';
WOMT_aParteienBeschreibung[17][0] = 'Die B* wurde 2009 gegründet und ist eine alternative linke Partei, die ihre Wurzeln in der Berliner Hausbesetzerszene hat. In ihrem Programm setzt sie sich u.a. für ein bedingungsloses Grundeinkommen, eine Begrenzung von Besitz und autofreie Städte ein.';
WOMT_aParteienBeschreibung[18][0] = 'Die ÖDP ging 1981 aus verschiedenen ökologischen Bewegungen hervor. Die Partei vereint auf der Grundlage christlich-humanistischer Werte ökologische mit wertkonservativen Positionen. Sie ist seit 2014 im Europäischen Parlament vertreten. Der Einzug in ein Landesparlament gelang ihr bisher nicht.';
WOMT_aParteienBeschreibung[19][0] = 'Die Partei TIERSCHUTZ hier! wurde 2017 gegründet und engagiert sich für eine Verschärfung des Tierschutzes und des Tierschutzgesetzes. Für Berlin fordert sie u.a. einen einklagbaren Schutzstatus für Tiere, ein Verbot von Tierversuchen und Dressuren.';
WOMT_aParteienBeschreibung[20][0] = 'dieBasis ging 2020 aus dem Protest gegen die staatlichen Maßnahmen zur Bekämpfung der Covid-19-Pandemie hervor. Die Partei fordert ein Ende aller mit der Pandemie verbundenen Einschränkungen und betont die Basisdemokratie als Mittel zur politischen Entscheidungsfindung.';
WOMT_aParteienBeschreibung[21][0] = 'Bildet Berlin! wurde 2021 gegründet und ist eine auf das Land Berlin begrenzte Einthemenpartei, die kontinuierliche und verlässliche Bildung fordert. Sie setzt sich u.a. für eine Verbesserung der Arbeitsbedingungen an Kitas und Schulen ein und fordert nachhaltige Lernangebote.';
WOMT_aParteienBeschreibung[22][0] = 'Die Grauen gründeten sich 2017. Die Partei sieht sich als Partei für alle Generationen und der sozialen Gerechtigkeit. Die Grauen fordern u.a. eine gesetzliche Mindestrente, die Senkung des Renteneintrittsalters und die Verschmelzung aller gesetzlichen Krankenversicherungen.';
WOMT_aParteienBeschreibung[23][0] = 'Die neuen Demokraten wurden im Februar 2021 in Berlin gegründet. Ihre Kernthemen sind Innere Sicherheit und Soziale Gerechtigkeit. Sie fordert u.a. den Ausbau des sozialen Wohnungsbaus, die personelle Aufstockung von Polizei, Justiz und Feuerwehr sowie eine bessere Ausstattung für Kitas und Schulen.';
WOMT_aParteienBeschreibung[24][0] = 'Die 1983 gegründete REP zeichnet sich durch eine abwehrende Haltung zur Zuwanderung aus. Ein Schwerpunkt der Partei ist die Kritik an den Corona-Maßnahmen und der Migrationspolitik. Sie fordert u.a. den Ausbau von Polizei und Feuerwehr und die Abschaffung des Antidiskriminierungsgesetzes.';
WOMT_aParteienBeschreibung[25][0] = 'du. wurde 2017 gegründet und versteht sich als Partei, die Elemente der Hip-Hop-Kultur in politisches Handeln übertragen will. Sie spricht sich für die Gleichstellung aller Bürger aus. Ein Schwerpunkt ihres Programms liegt auf dem Kampf gegen Rassismus und Diskriminierung.';
WOMT_aParteienBeschreibung[26][0] = 'BÜNDNIS21 wurde im Jahr 2021 zunächst in Frankfurt gegründet, kurz darauf folgte der Berliner Landesverband. Die Partei fordert u.a. eine gesetzliche Politikerhaftung, Amtszeitbegrenzung auf allen politischen Ebenen und mehr Basisdemokratie wie etwa Volksentscheide.';
WOMT_aParteienBeschreibung[27][0] = 'Die FREIEN WÄHLER gingen 2009 aus kommunalen Wählergemeinschaften hervor. Sie bezeichnen sich als wertorientiert, liberal und bürgerlich. Die Stärkung der kommunalen Selbstverwaltung ist ein wichtiges Anliegen der Partei.';
WOMT_aParteienBeschreibung[28][0] = 'Die Klimaliste Berlin wurde 2020 mit dem Fokus auf Umwelt- und Klimaschutz gegründet. Ihre zentrale Forderung ist die Begrenzung des globalen Temperaturanstiegs auf 1,5 Grad Celsius. Sie versteht sich als basisdemokratische Partei und fordert einen sozial-ökologischen Umbau von Wirtschaft und Gesellschaft.';
WOMT_aParteienBeschreibung[29][0] = 'Die MIETERPARTEI wurde 2016 in Berlin gegründet. Ihr Schwerpunkt liegt in der Wohnungspolitik. So kämpft sie gegen Mietsteigerungen und Verdrängung und fordert u.a. eine weitreichende Umsetzung des Grundrechts auf Wohnen.';
WOMT_aParteienBeschreibung[30][0] = 'Die Humanisten wurden 2014 gegründet. Die Partei versteht sich als soziale, liberale und progressive Partei, welche die Freiheit des Einzelnen in den Mittelpunkt stellt. Ihre Politik will auf einen evolutionären Humanismus und wissenschaftliche Erkenntnisse zurückgreifen.';
WOMT_aParteienBeschreibung[31][0] = 'Team Todenhöfer wurde 2020 von Jürgen Todenhöfer nach seinem Austritt aus der CDU gegründet. Schwerpunkt der Partei ist die Friedenspolitik, bei der sie u.a. das Ende aller Auslandseinsätze der Bundeswehr fordert. Zudem setzt sich für eine sozialere Klimapolitik und eine Förderung der jungen Generation ein.';
WOMT_aParteienBeschreibung[32][0] = 'Die Partei Volt wurde 2017 als Bürgerbewegung gegründet, welche die europäische Einigung und weitere Schritte in der europäischen Integration unterstützt. Bei der Europawahl 2019 trat sie in sieben europäischen Ländern mit einem gemeinsamen Wahlprogramm an und konnte in Deutschland ein Mandat erzielen.';
WOMT_aParteienBeschreibungChecksumLanguage[0] = new Array();
WOMT_aParteienBeschreibungChecksumLanguage[0]['sum'] = '0af7762beacfe4b186f68503f2af326a';
WOMT_aParteienBeschreibungChecksumLanguage[0]['sum2'] = '8354720fcc9fff6f9eb25c09bbb78a9a';
WOMT_aParteienBeschreibungChecksum['sum'] = '0af7762beacfe4b186f68503f2af326a';
WOMT_aParteienBeschreibungChecksum['sum2'] = '8354720fcc9fff6f9eb25c09bbb78a9a';
WOMT_sGenerationTimeParteienBeschreibung = '25.08.2021 15:07:39';
