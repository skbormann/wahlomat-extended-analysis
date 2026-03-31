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
WOMT_aParteienBeschreibung[0][0]='Die CDU ist in Sachsen aus der gleichnamigen DDR-Blockpartei hervorgegangen. Durch Neumitglieder aus Bürgerrechtsbewegungen verloren Politiker der Block-CDU jedoch ihren Einfluss. Zur Landtagswahl setzt die Partei auf eine leistungsorientierte Bildungspolitik sowie eine sparsame Haushaltspolitik.';
WOMT_aParteienBeschreibung[1][0]='DIE LINKE entstand nach Umbenennungen und Fusionen aus der DDR-Staatspartei SED. Sie sieht sich in der Tradition des linken Flügels der Arbeiterbewegung und neuerer sozialer Bewegungen. Sie verlangt u.a. den Ausbau öffentlicher Beschäftigung sowie die Sicherung des Lebensstandards auch im Alter.';
WOMT_aParteienBeschreibung[2][0]='Die SPD wurde in der DDR 1946 mit der KPD zur DDR-Staatspartei SED zwangsvereint und gründete sich während der Friedlichen Revolution neu. Sie tritt zur Landtagswahl beispielsweise ein für gebührenfreie Kitas, den Ausbau von Gemeinschaftsschulen und eine Entschuldung der öffentlichen Haushalte.';
WOMT_aParteienBeschreibung[3][0]='Die FDP in Sachsen entstand 1990 durch Vereinigung von neuen liberalen Parteien mit der westdeutschen FDP. Gewerbetreibende Unternehmer und der Mittelstand sind ihre zentralen Klientelgruppen. Sie fordert den Ausbau der Infrastruktur, lehnt den Mindestlohn ab und tritt für Steuersenkungen ein.';
WOMT_aParteienBeschreibung[4][0]='Die Wurzeln der GRÜNEN in Sachsen liegen in der Bürgerrechtsbewegung der DDR. Die Partei steht für Nachhaltigkeit, Ökologie, eine offene Gesellschaft und mehr politische Teilhabe. Zur Landtagswahl fordert sie u.a. den Stopp des Braunkohleabbaus und mehr Durchlässigkeit des Bildungssystems.';
WOMT_aParteienBeschreibung[5][0]='Die NPD wurde 1964 in der BRD gegründet und entstand im März 1990 als "Mitteldeutsche Nationaldemokraten" noch in der DDR. Leitgedanke der NPD ist es, an die Stelle einer liberalen Demokratie einen starken Staat der ethnisch möglichst homogenen "deutschen Volksgemeinschaft" zu setzen.';
WOMT_aParteienBeschreibung[6][0]='Zu den Kerngedanken der Tierschutzpartei gehört, dass Tiere Grundrechte hätten und diese auch ins Grundgesetz gehörten. Sie fordert u.a. ein Verbot der Jagd, staatliche Unterstützung für die ökologische Landwirtschaft und eine Kennzeichnungspflicht für Intensivtierhaltung.';
WOMT_aParteienBeschreibung[7][0]='Die PIRATEN wurden 2006 gegründet. Ursprung der Partei ist der Kampf gegen Urheberrechte im Internet. Daneben setzt sie sich für mehr Transparenz und für mehr Bürgerrechte ein. Die PIRATEN fordern etwa die konsequente Nutzung elektronischer Mittel in Schulen und ein bedingungsloses Grundeinkommen.';
WOMT_aParteienBeschreibung[8][0]='Die BüSo wurde 1992 als Nachfolgepartei der "Patrioten für Deutschland" gegründet und steht in Verbindung mit dem amerikanischen Politiker Lyndon LaRouche. Die BüSo fordert u.a. eine verlässliche Energieversorgung durch Kernenergie und eine Neuordnung des globalen Finanzsystems.';
WOMT_aParteienBeschreibung[9][0]='Die DSU entstand 1990 aus Bürgerbewegungen und antikommunistischen Neupolitisierten. Sie war bei der Volkskammerwahl von 1990 Teil der  "Allianz für Deutschland". Ihre Ziele sind z.B. der Schutz ungeborener Menschen, ein Europa der Vaterländer sowie Schranken für die Zuwanderung.';
WOMT_aParteienBeschreibung[10][0]='Von zentraler Bedeutung für die Gründung der AfD 2013 war die Kritik an der Eurorettungspolitik. Die Partei versucht eine Verbindung von nationalen mit wirtschaftsliberalen Positionen. Zur Landtagswahl fordert sie u.a. eine auf Leistung zielende Bildungspolitik sowie qualifizierte Zuwanderung.';
WOMT_aParteienBeschreibung[11][0]='Die 2005 gegründete Partei pro Deutschland versteht sich als Bürgerbewegung gegen etablierte Parteien. Kern ihrer Programmatik ist die Forderung nach rechtlichen, kulturellen und architektonischen Grenzen für den Islam sowie ein Stopp der Immigration nach Deutschland.';
WOMT_aParteienBeschreibung[12][0]='Die FREIEN WÄHLER in Sachsen wurden 1992 gegründet, ihr typisches Betätigungsfeld ist die Kommunalpolitik. Sie sehen sich "überparteilicher Sachpolitik" verpflichtet. Die Partei fordert u.a. die Stärkung von Bürger- und Menschenrechten, Haushaltsdisziplin und mehr Chancengleichheit in der Bildung.';
WOMT_aParteienBeschreibung[13][0]='Die PARTEI wurde 2004 von Redakteuren des Satire-Magazins "Titanic" gegründet. Sie pflegt einen satirischen Zugriff auf Politik, indem sie politische Inhalte und Politiker parodiert. In ihrem Programm geht klar Satirisches mit ernsthaften Zielen einher.';
WOMT_aParteienBeschreibungChecksum["sum"]='4594f510fd2222e44e7175aa4305e39d';
WOMT_aParteienBeschreibungChecksum["sum2"]='01259371d48e36aa6961a60177adc0ab';
WOMT_sGenerationTimeParteienBeschreibung ='29.07.2014 18:58:41';
