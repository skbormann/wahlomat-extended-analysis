// UTF8-Zeichen öäüðý


/**
 * Partei-Informationen
 *
 * Aus Thesen-CMS ausgespielt fuer Wahl-o-mat 767
 *
 * 1.0.0        12.05.2021 06:22:13 Wahl-O-Mat
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
WOMT_aParteienBeschreibung[0][0] = 'Die SPD ist aus der Arbeiterbewegung des 19. Jahrhunderts entstanden und seit 1991 in Rheinland-Pfalz in Regierungsverantwortung. Zur Landtagswahl 2021 setzt sie sich u.a. für Gebührenfreiheit in der Bildung, Förderung der Digitalisierung, Bekämpfung von Kinderarmut und eine bessere medizinische Infrastruktur ein.';
WOMT_aParteienBeschreibung[1][0] = 'Die CDU gründete sich in Rheinland-Pfalz 1947 und hat konservative, liberale und christlich-soziale Wurzeln. Bis 1991 stellte sie den Ministerpräsidenten. Zur Wahl spricht sie sich u.a. für landesweite zentrale Abschlussprüfungen, einen Staatssekretär für Bioökonomie und bessere medizinische Versorgung auf dem Land aus.';
WOMT_aParteienBeschreibung[2][0] = 'Die AfD wurde 2013 gegründet und verfolgt einen national-konservativen, rechtspopulistischen Kurs. Sie ist im Bundestag und in allen Landtagen vertreten. Im Wahlkampf spricht sie sich u.a. gegen den Ausbau der Windkraft, für Straßenneubau, Erhalt des dreigliedrigen Schulsystems und eine rasche Abschiebung abgelehnter Asylbewerber aus.';
WOMT_aParteienBeschreibung[3][0] = 'Die FDP ist 1948 aus dem Zusammenschluss mehrerer liberaler Parteien entstanden. Zurzeit bildet sie zusammen mit SPD und GRÜNEN die Landesregierung. Die FDP fordert für diese Landtagswahl u.a. den Ausbau der ländlichen Infrastruktur, die Stärkung des Mittelstandes und einen Abbau der Bürokratie.';
WOMT_aParteienBeschreibung[4][0] = 'Die GRÜNEN sind 1979 aus der Umwelt-, Anti-Atom- und Friedensbewegung entstanden und sind seit 2016 zusammen mit SPD und FDP Teil der Landesregierung. Zur Landtagswahl fordern sie u.a. die Abschaffung der industriellen Massentierhaltung, die Förderung der ökologischen Landwirtschaft und der erneuerbaren Energien.';
WOMT_aParteienBeschreibung[5][0] = 'DIE LINKE entstand 2007 aus der Linkspartei.PDS und der WASG. Sie bezeichnet sich als demokratisch-sozialistische Partei. 2021 möchte sie erstmals in den Landtag von Rheinland-Pfalz einziehen und fordert u.a. einen Mietpreisdeckel, kostenlosen ÖPNV und die Abschaffung des mehrgliedrigen Schulsystems.';
WOMT_aParteienBeschreibung[6][0] = 'Die FREIEN WÄHLER gründeten sich in Rheinland-Pfalz 2010 aus kommunalpolitisch aktiven Wählergruppen. Auch auf Landesebene stehen die kommunalen und lokalen Themen im Fokus des Wahlprogramms, wie etwa die Entlastung der Kommunen, der Ausbau des Verkehrsnetzes und mehr Personal für Schulen, Kitas und Polizei.';
WOMT_aParteienBeschreibung[7][0] = 'Die PIRATEN gründeten sich 2008 in Rheinland-Pfalz und setzen sich vor allem für den Datenschutz und den Schutz der Privatsphäre, für informationelle Selbstbestimmung sowie den freien Zugang zu Information und Bildung ein. Zur Landtagswahl fordern sie u. a. ein Verbot der Videoüberwachung und ein bedingungsloses Grundeinkommen.';
WOMT_aParteienBeschreibung[8][0] = 'Die ÖDP entstand in Rheinland-Pfalz 1983 aus der Ökologiebewegung und kombiniert diesen Ursprung mit konservativen und basisdemokratischen Ansätzen. Zur Landtagswahl fordert sie u.a. das Wahlrecht ab 16 Jahren, eine Verkleinerung des Landtags, den Ausbau des ÖPNV, mehr Lärmschutz und die Förderung ökologischer Landwirtschaft.';
WOMT_aParteienBeschreibung[9][0] = 'Die Wählervereinigung Klimaliste RLP e.V. entstand 2020 aus einem bundesweiten Netzwerk aus Wissenschaftlern und Klimaschutzgruppierungen. Sie tritt erstmals zur Landtagswahl in Rheinland-Pfalz an und fordert u.a. den Umstieg auf ausschließlich erneuerbare Energien, einen kostenfreien ÖPNV und die Förderung regionaler und nachhaltiger Agrarprodukte.';
WOMT_aParteienBeschreibung[10][0] = 'Die PARTEI wurde 2004 gegründet und ist derzeit mit jeweils einem Abgeordneten im Europäischen Parlament und im Bundestag vertreten. Ihr prägendes Element ist die Satire und im Wahlkampf ist oftmals eine Negativkampagne gegen rechtsgerichtete Ideologien erkennbar. Zur Landtagswahl in Rheinland-Pfalz tritt sie zum ersten Mal an.';
WOMT_aParteienBeschreibung[11][0] = 'Die Tierschutzpartei wurde 1993 gegründet und ist mit einem Sitz im Europäischen Parlament vertreten. Im Wahlkampf zur Landtagswahl setzt sie sich u.a. für die Förderung kleinbäuerlicher und ökologischer Landwirtschaft sowie veganer Lebensmittel ein und fordert die Abschaltung aller Kohle- und Gaskraftwerke.';
WOMT_aParteienBeschreibung[12][0] = 'Volt gründete sich 2020 in Rheinland-Pfalz. Die Partei versteht sich als Teil der gesamteuropäischen Bewegung Volt Europa. Zur Landtagswahl spricht sie sich u.a. für ein Wahlrecht ab 16 Jahren und den Europatag als gesetzlichen Feiertag aus. Zudem fordert sie, dass Rheinland-Pfalz bis 2035 klimaneutral sein soll.';
WOMT_aParteienBeschreibungChecksumLanguage[0] = new Array();
WOMT_aParteienBeschreibungChecksumLanguage[0]['sum'] = 'a926b42d049c464b6b0203e68d723a61';
WOMT_aParteienBeschreibungChecksumLanguage[0]['sum2'] = 'bd87875719cbe33741f7482cfd3a6597';
WOMT_aParteienBeschreibungChecksum['sum'] = 'a926b42d049c464b6b0203e68d723a61';
WOMT_aParteienBeschreibungChecksum['sum2'] = 'bd87875719cbe33741f7482cfd3a6597';
WOMT_sGenerationTimeParteienBeschreibung = '12.05.2021 06:22:14';
