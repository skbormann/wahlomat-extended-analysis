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
WOMT_aParteienBeschreibung[0][0]='Die SPD regierte von 1957 bis 2001 durchgehend in Hamburg. Seit 2011 stellt sie erneut die Regierung der Hansestadt. Zur Bürgerschaftswahl setzt sie u.a. auf den Bau neuer Wohnungen, einen ausgeglichenen Haushalt bis 2024 und den Ausbau des ÖPNV. Bis 2050 möchte sie Hamburg klimaneutral gestalten.';
WOMT_aParteienBeschreibung[1][0]='Die Hamburger CDU wurde 1945 gegründet. Sie war u.a. von 2001 bis 2011 in der Regierung und ist seitdem in der Opposition. Im Wahlkampf tritt sie u.a. für die Förderung von privatem Wohneigentum, mehr Ressourcen für Polizei und Justiz, Investitionen in die Forschung und den Bau einer Straßenbahn ein.';
WOMT_aParteienBeschreibung[2][0]='DIE LINKE entstand 2007 durch die Fusion der SED-Nachfolgepartei PDS und der gewerkschaftsnahen WASG. Ihr Ziel ist ein demokratischer Sozialismus. Zur Bürgerschaftswahl setzt sie u.a. auf mehr sozialen Wohnungsbau, den Ausbau des ÖPNV und die Abschaffung der Schuldenbremse.';
WOMT_aParteienBeschreibung[3][0]='Die FDP in Hamburg wurde 1945 gegründet und war in Hamburg mehrfach kleine Koalitionspartnerin der CDU oder SPD. Zur Bürgerschaftswahl spricht sie sich u.a. für eine Mobilitätsoffensive, die Abschaffung der Mietpreisbremse, einen innovationsgetriebenen Klimaschutz und die Elbvertiefung aus.';
WOMT_aParteienBeschreibung[4][0]='Die GRÜNEN entstanden Ende der 1970er-Jahre aus den neuen sozialen und ökologischen Bewegungen heraus und sind seit 2015 in Hamburg Teil der Landesregierung. In ihrem Wahlprogramm tritt die Partei u.a. für ein starkes Klimaschutzgesetz, den Ausbau des ÖPNV und mehr Bildungsgerechtigkeit ein.';
WOMT_aParteienBeschreibung[5][0]='Die AfD wurde 2013 gegründet und verfolgt einen national-konservativen, rechtspopulistischen Kurs. Sie ist im Bundestag und allen Landtagen vertreten. Im Wahlkampf spricht sie sich u.a. für mehr Wohngeld in Hamburg, die Abschiebung ausreisepflichtiger Ausländer und gegen eine Einheitsschule aus.';
WOMT_aParteienBeschreibung[6][0]='Die ÖDP wurde 1982 als Zusammenschluss grüner Kleinparteien gegründet. Sie nimmt seitdem regelmäßig an Wahlen auf allen politischen Ebenen teil. Zur Bürgerschaftswahl setzt sie sich u.a. für mehr Radwege, den Stopp der Elbvertiefung und verbindliche Bürgerentscheide ein.';
WOMT_aParteienBeschreibung[7][0]='Die FREIEN WÄHLER sind als Partei aus unabhängigen kommunalpolitischen Gruppen hervorgegangen. Zur Bürgerschaftswahl treten sie u.a. für einen Ausbau des ÖPNV, mehr Stellen bei Justiz, Feuerwehr und Polizei sowie eine Stärkung der Bezirksverwaltungen gegenüber dem Senat ein.';
WOMT_aParteienBeschreibung[8][0]='Die 2006 gegründeten PIRATEN sind um die Themen Netzpolitik, Digitalisierung, Transparenz und Partizipation entstanden. Zur Bürgerschaftswahl fordern sie u.a. verbindliche Bürgerentscheide, einen kostenlosen ÖPNV sowie die Ausweitung der Mietpreisbremse und den Ausbau von Sozialwohnungen.';
WOMT_aParteienBeschreibung[9][0]='Volt Hamburg ist der 2019 gegründete Landesverband der Partei Volt Deutschland, die sich als Teil der gesamteuropäischen Bewegung Volt Europa versteht. Zur Hamburgischen Bürgerschaftswahl spricht sie sich u.a. für die Ausrufung des Klimanotstands, eine City-Maut und den Ausbau der digitalen Infrastruktur aus.';
WOMT_aParteienBeschreibung[10][0]='Die PARTEI wurde 2004 gegründet und ist derzeit mit zwei Abgeordneten im Europäischen Parlament vertreten. Ihr prägendes Element ist die Satire. Neben Forderungen, die denen anderer Parteien ähneln, überrascht sie in Hamburg u.a. mit Vorschlägen für eine Stadtachterbahn und Rohrpostsysteme.';
WOMT_aParteienBeschreibung[11][0]='Die Partei TIERSCHUTZ hier! wurde 2017 gegründet und engagiert sich für eine Verschärfung des Tierschutzes und des Tierschutzgesetzes. In Hamburg fordert sie u.a. ein Verbot von Tierversuchen und Massentierhaltung sowie die Abschaffung der Mehrwertsteuer auf vegane Lebensmittel.';
WOMT_aParteienBeschreibung[12][0]='Die Humanisten wurden 2014 gegründet und bezeichnen sich selbst als rational, liberal und fortschrittlich. Zu ihren Kernforderungen gehört die strikte Trennung von Staat und Kirche. In Hamburg setzen sie sich u.a. für mehr Tempo-30-Zonen, Preissenkungen im ÖPNV und die Abschaffung des Gymnasiums ein.';
WOMT_aParteienBeschreibung[13][0]='Die 2015 gegründete Partei Gesundheitsforschung verfolgt ausschließlich die bessere Erforschung altersbedingter Krankheiten. Im Hamburger Wahlkampf fordert sie daher, zusätzlich 5 Prozent des Landeshaushalts in dieses Forschungsgebiet zu investieren. Andere Themen greift die Partei nicht auf.';
WOMT_aParteienBeschreibung[14][0]='Die Tierschutzpartei wurde 1993 gegründet und ist mit einem Sitz im Europäischen Parlament vertreten. Im Wahlkampf zur Bürgerschaftswahl lehnt sie u.a. jegliche Tierversuche und Massentierhaltung ab und spricht sich für den Ausbau des ÖPNV und mehr Volksentscheide auf Landesebene aus.';
WOMT_aParteienBeschreibungChecksum["sum"]='86cd88d7ae033bf09b77607b7d35d8ac';
WOMT_aParteienBeschreibungChecksum["sum2"]='ac809cf48480241886651e6bec031092';
WOMT_sGenerationTimeParteienBeschreibung ='16.01.2020 12:56:43';
