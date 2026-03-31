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
WOMT_aParteienBeschreibung[0][0]='Der 1952 gegründete Landesverband der CDU regierte das Saarland über viele Jahrzehnte - zuletzt seit 1999. Im Wahlkampf setzt sie auf die Beliebtheit ihrer Ministerpräsidentin. Inhaltliche Schwerpunkte zur Wahl sind u.a. die Landesfinanzen, innere Sicherheit und ein gefordertes Integrationsgesetz.';
WOMT_aParteienBeschreibung[1][0]='Zwischen 1985 und 1999 stellte die SPD den Ministerpräsidenten im Saarland. Seit 2012 ist sie wieder an der Regierung beteiligt. Zur Wahl setzt sie auf die Bildungspolitik, wo u.a. die Kita-Gebühren abgeschafft werden sollen. Die SPD ist für erneuerbare Energien und gegen prekäre Beschäftigung.';
WOMT_aParteienBeschreibung[2][0]='DIE LINKE entstand 2007 als Zusammenschluss der PDS und der WASG. Ihre Entwicklung ist eng mit dem ehemaligen SPD-Ministerpräsidenten Lafontaine verbunden, der Spitzenkandidat der LINKEN im Saarland ist. Die Partei kämpft u.a. für die Begrenzung des Flüchtlingszuzugs und für höhere Steuern auf Vermögen.';
WOMT_aParteienBeschreibung[3][0]='Schwerpunkt der 2006 gegründeten PIRATEN sind der Datenschutz und der Schutz der Privatsphäre. Seit 2012 sind sie im saarländischen Landtag vertreten. Ihre Kernthemen verknüpfen sie zur Landtagswahl mit Bildungsfragen. So fordern sie u.a. kostenlosen Zugang zu Wissen, Kultur und Bildung.';
WOMT_aParteienBeschreibung[4][0]='Die GRÜNEN entstanden 1979 aus der Umwelt- und Friedensbewegung. In vier der fünf letzten Wahlperioden waren sie im saarländischen Landtag vertreten. Die Themen Umwelt, Energie und Bildung sind für die Partei zur Landtagswahl zentral. Sie fordern u.a. kleinere Klassen und mehr erneuerbare Energien.';
WOMT_aParteienBeschreibung[5][0]='Die FAMILIE setzt sich seit ihrer Gründung 1981 in allen Politikbereichen für die Interessen von Eltern und Kindern ein. Das Saarland ist ein regionaler Schwerpunkt der Partei. Zur Landtagswahl fordert sie z.B. ein Betreuungsgeld, gebührenfreie Kitas und ein Wahlrecht bereits ab Geburt.';
WOMT_aParteienBeschreibung[6][0]='Die 1948 gegründete FDP war an mehreren Regierungen im Saarland beteiligt, verpasste zuletzt aber den Einzug ins Parlament. Als liberale Partei sieht sie sich der Freiheit des Individuums gegenüber dem Staat verpflichtet. Zur Wahl setzt sie auf die Themen Bildung, Forschung, Infrastruktur und Sicherheit.';
WOMT_aParteienBeschreibung[7][0]='Die NPD wurde 1964 gegründet. Ihr politisches Konzept missachtet die Menschenwürde und ist mit dem Demokratieprinzip unvereinbar. Die NPD tritt für eine ethnisch homogene "Volksgemeinschaft" ein. Soziale Leistungen sollen nur Deutschen zugutekommen. Sie fordert ein Burkaverbot und mehr direkte Demokratie.';
WOMT_aParteienBeschreibung[8][0]='Die FREIEN WÄHLER wurden im Saarland 2011 gegründet. Ihre Wurzeln liegen in der Kommunalpolitik, daher besitzen die kommunalen Finanzen und die Stärkung des ländlichen Raums auch einen hohen Stellenwert in ihrem Programm. Sie setzen sich für mehr Polizisten und für die Direktwahl des Ministerpräsidenten ein.';
WOMT_aParteienBeschreibung[9][0]='Die AfD wurde 2013 gegründet. Der saarländische Landesverband setzte sich mit Hilfe des rechtsnationalen Partei-Flügels 2016 erfolgreich gegen seine Auflösung durch die Bundespartei durch. Zur Wahl fordert die AfD u.a. eine Verkleinerung des Landtags und die Stärkung des Leistungsprinzips in der Schule.';
WOMT_aParteienBeschreibung[10][0]='Die 2016 gegründete BGE ist eine Ein-Themen-Partei, die kein anderes Ziel verfolgt, als mit demokratischen Mitteln die Einführung des bedingungslosen Grundeinkommens voranzubringen. Zu anderen politischen Themen positioniert sich die Partei nicht explizit.';
WOMT_aParteienBeschreibung[11][0]='Die DBD wurde 2016 unter anderem von ehemaligen Mitgliedern des liberal-konservativen Flügels der AfD gegründet. Die DBD will Abgeordnete für "grob fahrlässige Verfehlungen" haftbar machen, spricht sich gegen Obergrenzen für Flüchtlinge aus und will die Vollverschleierung im öffentlichen Raum verbieten.';
WOMT_aParteienBeschreibung[12][0]='DIE EINHEIT versteht sich als Interessenvertreterin der russischen Aussiedler und Spätaussiedler. Die 2013 gegründete Partei tritt u.a. für einen Stopp der Aufnahme von Flüchtlingen, eine Verlängerung des Arbeitslosengeldes und die automatische Anerkennung der Bildungsabschlüsse von Aussiedlern ein.';
WOMT_aParteienBeschreibung[13][0]='Die REFORMER wurden 2016 gegründet und verstehen sich als Partei der demokratischen Mitte. Sie fordern z.B. einen Ausbau von Kitas, Krippen und Vorschulen und die Rückkehr zum G9. In der Flüchtlingspolitik tritt die Partei dafür ein, "den Staat und seine Identität zu wahren und zu schützen".';
WOMT_aParteienBeschreibung[14][0]='Die LKR wurde 2015 unter dem Namen ALFA vom ehemaligen AfD-Sprecher Lucke gegründet. Sie vertritt konservative und wirtschaftsliberale Positionen. Zur Landtagswahl im Saarland kämpft sie z.B. für eine bessere Ausstattung von Polizei und Justiz sowie für größere Abstände von Windrädern zur Wohnbebauung.';
WOMT_aParteienBeschreibungChecksum["sum"]='7967fea8315e078c791f35eec3f12a99';
WOMT_aParteienBeschreibungChecksum["sum2"]='c97e8c9c6334ec323478073a0edb88ad';
WOMT_sGenerationTimeParteienBeschreibung ='22.02.2017 12:22:59';
