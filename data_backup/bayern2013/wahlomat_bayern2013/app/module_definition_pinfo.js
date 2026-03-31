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
WOMT_aParteienBeschreibung[0][0]='Die CSU stützt ihr Handeln auf die "soziale Verantwortung auf der Grundlage des christlichen Welt- und Menschenbilds". Seit 1957 stellt sie durchgehend den Bayerischen Ministerpräsidenten. Nach einer langjährigen Alleinregierung befindet sie sich derzeit in einer Koalitionsregierung mit der FDP.';
WOMT_aParteienBeschreibung[1][0]='Die SPD ist seit 1957 durchgehend die stärkste Oppositionspartei im Bayerischen Landtag. Markenkern der Partei ist das Werben für soziale Gerechtigkeit, etwa mit der Forderung nach einem gesetzlichen Mindestlohn. Bei der Landtagswahl 2008 erreichte die SPD 18,6 Prozent der Stimmen. ';
WOMT_aParteienBeschreibung[2][0]='Die FREIEN WÄHLER sind aus lose verbundenden kommunalen Kräften ohne Parteistatus entstanden. Seit 1998 treten sie zu Landtagswahlen in Bayern an. Die FREIEN WÄHLER betonen, dass sie ideologiefrei und bürgernah ausgerichtet sind. Seit 2008 ist die Partei im Bayerischen Landtag vertreten.';
WOMT_aParteienBeschreibung[3][0]='Die GRÜNEN sind seit 1986 durchgehend im Bayerischen Landtag vertreten und haben ihre Wurzeln in der grün-ökologischen Bewegung. Daneben widmen sie sich der sozialen Gerechtigkeit, den Bürgerrechten und der Gleichstellungspolitik. Bei der Landtagswahl 2008 erreichten sie 9,4 Prozent der Stimmen.';
WOMT_aParteienBeschreibung[4][0]='Die FDP ist als Koalitionspartner der CSU in der Bayerischen Staatsregierung vertreten. Sie vertritt einen bürgerlich geprägten, sozial abgefederten Liberalismus. Ihr Fokus liegt auf den Themen Rechtsstaat und Bürgerrechte sowie Wirtschafts- und Steuerpolitik.';
WOMT_aParteienBeschreibung[5][0]='DIE LINKE entstand 2005 aus der Fusion der PDS und der WASG. Sie bekennt sich zum demokratischen Sozialismus und wirbt für soziale Gerechtigkeit. Die Partei ist in zehn Landesparlamenten vertreten, verfehlte jedoch in Bayern 2008 den Einzug in den Landtag.';
WOMT_aParteienBeschreibung[6][0]='Die ÖDP hat ihre Wurzeln in der bayerischen Ökologiebewegung und setzt sich für die Stärkung der direkten Demokratie ein. Erfolgreich war die Partei vor allem durch verschiedene Volksbegehren. Bei der Landtagswahl 2008 erreichte sie 2,0 Prozent der Stimmen.';
WOMT_aParteienBeschreibung[7][0]='Die REP zog 1989 mit ausländerfeindlicher Wahlwerbung in das Berliner Abgeordnetenhaus und das Europaparlament ein. In Bayern verfehlte sie 1990 nur knapp den Einzug in den Landtag. 2008 erreichte sie noch 1,4 Prozent der Stimmen. Seit 2006 wird die Partei nicht mehr vom Verfassungsschutz beobachtet.';
WOMT_aParteienBeschreibung[8][0]='In der Programmatik der NPD ist eine rassistisch und nationalistisch geprägte Fremdenfeindlichkeit elementarer Bestandteil. Derzeit ist sie in Sachsen und Mecklenburg-Vorpommern im Landtag vertreten.';
WOMT_aParteienBeschreibung[9][0]='Die BP betont die bayerische Eigenständigkeit durch einen Austritt Bayerns aus der Bundesrepublik. In den fünfziger Jahren war sie drittstärkste Partei Bayerns und im Landtag und Bundestag vertreten, ihr Stimmenanteil bei der Landtagswahl 2008 lag bei 1,1 Prozent.';
WOMT_aParteienBeschreibung[10][0]='Die BüSo ist dem Netzwerk des US-Amerikaners Lyndon Hermyle LaRouche zuzuordnen. Nach Einschätzung der BüSo muss das gegenwärtige Wirtschaftssystem vollständig ersetzt werden. Bei der Landtagswahl 2008 erreichte sie unter 0,1 Prozent der Stimmen.';
WOMT_aParteienBeschreibung[11][0]='DIE FREIHEIT formierte sich in Bayern im Jahr 2011. Die Partei wendet sich "gegen die Ausbreitung totalitärer Ideologien, insbesondere den politischen Islam". Der Schwerpunkt ihrer politischen Arbeit liegt in Berlin.';
WOMT_aParteienBeschreibung[12][0]='Die FRAUENLISTE ist eine 2010 gegründete parteiunabhängige Wählerinnengruppe - auf der Liste kandidieren nur Frauen. Die FRAUENLISTE hat sich auf der Basis von kommunalen Frauenlisten entwickelt, deren oberstes Ziel eine Erhöhung des Frauenanteils in kommunalen Gremien ist. ';
WOMT_aParteienBeschreibung[13][0]='DIE FRANKEN wurden 2009 gegründet. Ihr Ziel ist es, das politische Gewicht Frankens zu stärken. DIE FRANKEN wenden sich gegen einen auf München ausgerichteten Zentralismus und setzen sich für eine stärkere Beachtung der Regionen ein.';
WOMT_aParteienBeschreibung[14][0]='Die PIRATEN existieren in Bayern seit 2007 und treten dort erstmals zur Landtagswahl an. Seit 2011 gelang der Partei mehrmals der Einzug in Landesparlamente. Die junge Partei entwickelt sich äußerst dynamisch und ist programmatisch schwer einzuschätzen.';
WOMT_aParteienBeschreibungChecksum["sum"]='e39fc3fef5c39164e5575c046da0a33e';
WOMT_aParteienBeschreibungChecksum["sum2"]='51b6da1fe2e564d0052b5cee2fb7a3ad';
WOMT_sGenerationTimeParteienBeschreibung ='02.09.2013 13:53:32';
