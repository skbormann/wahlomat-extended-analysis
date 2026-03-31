# Wahl-O-Mat Extended Dataset — Analysisleitfaden

Zurück zur Startseite: [`../README.md`](../README.md)

Dieser Leitfaden erklärt, was der Datensatz enthält, welche Fragen damit beantwortet werden können und welche nicht, welche analytischen Methoden geeignet sind, und wie man damit loslegen kann. Er richtet sich an zwei Zielgruppen: interessierte Menschen ohne statistischen Hintergrund und Datenanalystinnen und -analysten, die fundierte Auswertungen durchführen möchten.

---

## Was ist dieser Datensatz?

Der *Wahl-O-Mat* ist ein politisches Vergleichstool der Bundeszentrale für politische Bildung (bpb), das vor Wahlen veröffentlicht wird. Parteien beantworten dabei etwa 38 politische Fragen — mit Zustimmung, Ablehnung oder Neutralität — und Wählerinnen und Wähler können ihre eigenen Antworten mit den Positionen der Parteien vergleichen.

Dieser Datensatz sammelt diese Partei-Antworten aus **74 Wahlen** in Deutschland zwischen 2003 und 2026, einschließlich Bundestagswahlen, Landtagswahlen (und Bürgerschaftswahlen der Stadtstaaten) sowie Europawahlen. Es handelt sich um die größte öffentlich verfügbare Sammlung von Wahl-O-Mat-Daten in einem einzigen, analysefreundlichen Format.

**Zwei Dateien:**

- `all_wahlomat_answers.csv` — eine Zeile pro Partei, Frage und Wahl. Ca. 43.600 Zeilen.
- `election_metadata.csv` — eine Zeile pro Wahl, mit lesbaren Namen, Bundesland, Jahr und Ebene.

---

## Wie sehen die Daten aus?

### `all_wahlomat_answers.csv`

| Spalte | Beschreibung |
| --- | --- |
| `election_id` | Eindeutiger Bezeichner für die Wahl (z. B. `bundestagswahl2017`, `BT25_v1.02`) |
| `question` | Index der Frage innerhalb dieser Wahl (nullbasiert) |
| `party` | Parteikürzel gemäß Quelldaten |
| `answer` | `1` = stimme zu, `0` = neutral, `-1` = stimme nicht zu |
| `title` | Kurztitel der Frage |
| `these_text` | Vollständiger Fragetext auf Deutsch |

### `election_metadata.csv`

| Spalte | Beschreibung |
| --- | --- |
| `election_id` | Entspricht `all_wahlomat_answers.csv` |
| `display_name_de` | Deutscher Wahlname (z. B. `Bundestagswahl 2021`) |
| `display_name_en` | Englischer Wahlname (z. B. `Federal election 2021`) |
| `state` | Bundeslandname oder `Federal` / `European` |
| `year` | Vierstellige Jahreszahl |
| `level` | `federal`, `state` oder `european` |

### Die Dateien verknüpfen

```python
import pandas as pd

answers = pd.read_csv('all_wahlomat_answers.csv')
metadata = pd.read_csv('election_metadata.csv')

# Alle Wahlen in Schleswig-Holstein
sh_ids = metadata[metadata['state'] == 'Schleswig-Holstein']['election_id']
sh = answers[answers['election_id'].isin(sh_ids)]

# Alle Bundestagswahlen
bt_ids = metadata[metadata['level'] == 'federal']['election_id']
bundestagswahlen = answers[answers['election_id'].isin(bt_ids)]
```

---

## Welche Fragen lassen sich damit beantworten?

### Für alle Interessierten

**Welche Parteien haben sich bei einer Wahl am ähnlichsten gepositioniert?**
Man kann zählen, wie oft zwei Parteien bei denselben Fragen gleich geantwortet haben. Eine hohe Übereinstimmungsrate bedeutet, dass die Parteien ähnliche Positionen eingenommen haben — zumindest auf dem Papier.

**Welche Fragen haben die Parteien am stärksten gespalten?**
Manche Fragen erzeugen eine nahezu gleichmäßige Aufteilung zwischen Zustimmung und Ablehnung. Das sind die wirklich umstrittenen Themen einer Wahl. Andere Fragen erhalten fast einhellige Zustimmung — und zeigen, wo ein politischer Konsens besteht.

**Wie oft haben Parteien die neutrale Option gewählt?**
Neutrale Antworten (0) machen etwa 10 % aller Antworten aus. Eine Partei, die häufig neutral antwortet, könnte bei umstrittenen Themen eine Festlegung vermeiden.

**Hat eine große Partei ihre Position zu einem wiederkehrenden Thema über die Zeit verändert?**
Themen wie *Schuldenbremse* oder *Frauenquote* tauchen in vielen Wahlen auf. Für Parteien, die in vielen Wahlen vertreten sind (SPD, FDP, CDU, Grüne), lassen sich Antworten über die Zeit vergleichen — mit einem wichtigen Vorbehalt (siehe unten).

### Für Datenanalystinnen und -analysten

**Parteipositionen innerhalb einer Wahl**
Die naheliegendste Analyse ist eine 2D-Karte der Parteien auf Basis ihrer Antwortmuster mithilfe von PCA oder MDS. Sie zeigt, welche Parteien ideologisch nahe beieinanderliegen und welche weit entfernt sind. Genau das produziert die bestehende Graph-Pipeline (`build_graphs_from_csv.py`) bereits.

**Paarweise Parteiähnlichkeit**
Für jedes Paar von Parteien in derselben Wahl lässt sich berechnen, bei wie vielen Fragen sie identisch geantwortet haben. Dies ist das annahmefreieste Ähnlichkeitsmaß in den Daten.

**Kontroversität von Fragen**
Für jede Frage lässt sich berechnen, wie viele Parteien zugestimmt vs. abgelehnt haben. Fragen mit einer nahezu 50/50-Aufteilung (und wenig Neutral-Antworten) sind wirklich umstritten. Fragen mit über 85 % Zustimmung in eine Richtung zeigen Konsensthemen.

**Ideologisches Clustering**
Hierarchisches Clustering auf der Grundlage paarweiser Meinungsverschiedenheiten kann Gruppen ideologisch ähnlicher Parteien identifizieren, ohne eine feste Clusteranzahl vorzugeben.

**Thematische Zusammenhänge innerhalb von Wahlen**
Korrelationen zwischen Fragen innerhalb einer einzelnen Wahl zeigen, welche Themen tendenziell ähnlich beantwortet werden — was auf zugrundeliegende ideologische Dimensionen hindeutet. Faktoranalyse kann dies formalisieren, jedoch mit Einschränkungen hinsichtlich der Stichprobengröße.

---

## Welche Fragen lassen sich damit nicht beantworten?

**Ob Parteipositionen tatsächliche Politik widerspiegeln**
Wahl-O-Mat-Antworten sind Selbstauskünfte zu Wahlzwecken. Sie können von Abstimmungsverhalten, Koalitionsverträgen oder dem tatsächlichen Regierungshandeln abweichen. Dies ist ein Datensatz der *geäußerten Präferenzen*, kein Datensatz des *tatsächlichen Verhaltens*.

**Warum eine Partei so geantwortet hat**
Die Daten erfassen Positionen, keine Begründungen. Eine neutrale Antwort (0) könnte echte Ambivalenz, strategische Vermeidung oder internen Parteistreit bedeuten — der Datensatz kann das nicht unterscheiden.

**Alles über das Wahlverhalten**
Es sind keine Wählerdaten enthalten. Aus den Daten lässt sich nicht ableiten, wie Wählerinnen und Wähler das Tool genutzt haben, ob es ihre Entscheidungen beeinflusst hat oder wie die Parteipositionen mit den Wahlergebnissen zusammenhängen.

**Ob eine Positionsveränderung eine echte ideologische Entwicklung darstellt**
Auch wenn derselbe Fragentitel in mehreren Wahlen auftaucht, weicht der vollständige Fragetext (*these_text*) häufig ab. Eine veränderte Antwort kann eine veränderte Frage widerspiegeln — nicht unbedingt eine veränderte Parteiposition. Immer den *these_text* direkt vergleichen, bevor man Schlussfolgerungen über zeitliche Entwicklungen zieht.

**Direkte Vergleiche von Parteipositionen über verschiedene Wahlen hinweg**
Da jede Wahl einen anderen Fragensatz hat, können Parteien aus verschiedenen Wahlen nicht in eine einzige PCA-Karte eingebettet und direkt verglichen werden. Der Merkmalsraum ist jedes Mal ein anderer.

**Ob die Fragen repräsentativ sind**
Die bpb wählt die 38 Fragen in einem redaktionellen Prozess aus. Was nicht gefragt wurde, ist in den Daten unsichtbar — und die Auswahl kann bestimmte politische Dimensionen stärker gewichten als andere.

---

## Welche Methoden eignen sich — und welche nicht?

Dieser Abschnitt richtet sich an Analytikerinnen und Analytiker. Die zentrale Einschränkung: Die Daten sind eine **dreiwertige Ordinalskala** (−1, 0, 1), keine kontinuierliche numerische Variable. Die meisten klassischen statistischen Methoden setzen kontinuierliche, normalverteilte Daten voraus. Diese Voraussetzung ist hier in allen Fällen verletzt.

### Dimensionsreduktion

| Methode | Bewertung | Anmerkungen |
| --- | --- | --- |
| PCA auf Pearson-Korrelationen | ✅ In der Praxis geeignet | Kontinuitätsannahme technisch verletzt, Verzerrung bei n > 20 Parteien aber gering. Von allen bestehenden Projekten verwendet. |
| Polychorische PCA | ✅ Methodisch korrekt | Für Ordinaldaten entwickelt. Mehr Aufwand, aber die ehrliche Wahl bei formellen Aussagen. |
| MDS auf Meinungsverschiedenheits-Distanzen | ✅ Sauber, keine Annahmen | Paarweise Meinungsverschiedenheiten direkt berechnen; kein Korrelationsschritt. Untergenutzt, aber wohl die angemessenste Methode. |
| Faktoranalyse | ⚠️ Bei kleinem n instabil | Nur sinnvoll bei Wahlen mit ≥ 20 Parteien. Nicht für kleine Landtagswahlen verwenden. |
| k-Means-Clustering | ❌ Nicht geeignet | Setzt kontinuierlichen euklidischen Raum voraus. |

### Ähnlichkeit und Korrelation

| Methode | Bewertung | Anmerkungen |
| --- | --- | --- |
| Paarweise Übereinstimmungsrate | ✅ Bestes Ähnlichkeitsmaß | Anteil identischer Antworten zwischen zwei Parteien. Annahmefrei, direkt interpretierbar. |
| Spearman-Korrelation | ✅ Pearson vorzuziehen | Für Ordinalskalen geeigneter. Ergebnisse in der Praxis bei nur drei Werten nahezu identisch. |
| Pearson-Korrelation | ✅ Für explorative Zwecke akzeptabel | Technisch suboptimal, aber weit verbreitet. Kleine Unterschiede nicht überinterpretieren. |

### Clustering

| Methode | Bewertung | Anmerkungen |
| --- | --- | --- |
| Hierarchisches Clustering | ✅ Gut geeignet | Keine Verteilungsannahmen. Meinungsverschiedenheits-Distanzen als Input verwenden. Clusteranzahl ist eine eigene Entscheidung — Stabilität prüfen. |
| k-Means | ❌ Nicht geeignet | Siehe oben. |

### Signifikanztests

| Methode | Bewertung | Anmerkungen |
| --- | --- | --- |
| Chi-Quadrat / Fisher-Exakt-Test | ✅ Für einzelne Fragen | Geeignet für eine einzelne Frage mit vordefinierten Parteigruppen. |
| Kruskal-Wallis / Mann-Whitney | ✅ Nicht-parametrische Alternativen | Statt ANOVA/t-Tests beim Gruppenvergleich verwenden. |
| ANOVA / t-Tests | ❌ Nicht geeignet | Setzen kontinuierliche, normalverteilte Daten voraus. |
| Inferenzielle Tests bei kleinen Wahlen | ⚠️ Sehr geringe Power | Wahlen mit weniger als 10–15 Parteien sind für sichere Schlussfolgerungen zu klein. |

### Das Problem des multiplen Vergleichs

Wenn Signifikanztests über viele Fragen oder viele Parteipaare hinweg durchgeführt werden, werden einige Ergebnisse rein zufällig signifikant erscheinen. Bei multiplen Vergleichen sollte eine Bonferroni-Korrektur (oder Holm-Bonferroni) angewendet werden. Je mehr Tests durchgeführt werden, desto wichtiger wird dies.

### Die goldene Regel

**Es ist immer akzeptabel — und oft richtig — zu sagen: „Diese Daten erlauben keine sicheren Schlussfolgerungen.\"**

Der Datensatz erfasst Selbstauskünfte auf einer dreiwertigen Skala mit einer kleinen Anzahl von Parteien pro Wahl. Er eignet sich gut für explorative und deskriptive Analysen. Für starke inferenzielle Aussagen ist er weniger geeignet.

---

## Bekannte Einschränkungen

**Fragen sind nicht über Wahlen hinweg vergleichbar.**
Jede Wahl hat ihren eigenen Fragenkatalog. Antworten einer Partei auf „Tempolimit\" aus dem Jahr 2013 und 2021 lassen sich nicht direkt vergleichen, ohne zuvor zu prüfen, ob die Fragetexte äquivalent sind.

**Einige Wahlen haben sehr wenige Parteien.**
Wahlen aus den frühen 2000er Jahren haben teilweise nur 2–3 Parteien. Diese Wahlen sind historisch interessant, erlauben aber keine multivariaten Analysen. Als Faustregel: PCA benötigt mindestens ~10 Parteien für interpretierbare Ergebnisse; Faktoranalyse ~20.

**Schleswig-Holstein 2005 und 2017 enthalten mehrsprachige Fragen.**
Diese Wahlen enthielten Fragen auf Deutsch, Dänisch und Nordfriesisch. Nach der Deduplizierung behält der Datensatz die zuerst vorkommende Sprachvariante. Die Antwortwerte sind davon nicht betroffen, aber die Fragetexte liegen möglicherweise nicht auf Deutsch vor.

**Parteinamen sind nicht über Wahlen hinweg normalisiert.**
Dieselbe Partei kann in verschiedenen Wahlen unter verschiedenen Namen erscheinen — die Grünen beispielsweise als `GRÜNE`, `BÜNDNIS 90/DIE GRÜNEN`, `GRÜNE/B 90` oder `GRÜNE/GAL`. Parteiübergreifende Zeitreihenanalysen erfordern manuelles Name-Matching.

**Neutral (0) hat mehrere Bedeutungen.**
Eine neutrale Antwort kann echte Ambivalenz, strategische Positionierung oder internen Parteistreit bedeuten. Sie ist nicht einfach „zwischen Zustimmung und Ablehnung\".

**Der Datensatz erfasst geäußerte Positionen, keine Politik.**
Parteien beantworten den Wahl-O-Mat zu Wahlzwecken. Die Daten sollten als Beleg für die elektorale Selbstdarstellung behandelt werden, nicht für tatsächliches politisches Handeln.

**Die bpb aktualisiert Wahldaten rückwirkend.**
Das Excel-Workbook wird regelmäßig aktualisiert. Parteieinträge können nachträglich zu vergangenen Wahlen hinzugefügt werden. Wer den Datensatz für Forschungszwecke nutzt, sollte das Datum (oder einen Hash) des verwendeten Workbooks angeben.

---

## Erste Schritte

### Minimales Beispiel: Parteiähnlichkeit in einer Wahl

```python
import pandas as pd

answers = pd.read_csv('all_wahlomat_answers.csv')

# Eine Wahl auswählen
bt21 = answers[answers['election_id'] == 'BT21_v1.02']

# Matrix: Parteien × Fragen
matrix = bt21.pivot(index='party', columns='question', values='answer')

# Paarweise Übereinstimmungsrate zwischen allen Parteipaaren
def uebereinstimmungsrate(a, b):
    gemeinsam = a.notna() & b.notna()
    return (a[gemeinsam] == b[gemeinsam]).mean()

parteien = matrix.index.tolist()
ergebnisse = []
for i, p1 in enumerate(parteien):
    for p2 in parteien[i+1:]:
        rate = uebereinstimmungsrate(matrix.loc[p1], matrix.loc[p2])
        ergebnisse.append({'partei_a': p1, 'partei_b': p2, 'uebereinstimmung': rate})

aehnlichkeit = pd.DataFrame(ergebnisse).sort_values('uebereinstimmung', ascending=False)
print(aehnlichkeit.head(10))
```

### Minimales Beispiel: PCA-Parteikarte

```python
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.impute import SimpleImputer
import matplotlib.pyplot as plt

answers = pd.read_csv('all_wahlomat_answers.csv')
bt21 = answers[answers['election_id'] == 'BT21_v1.02']
matrix = bt21.pivot(index='party', columns='question', values='answer')

# Fehlende Werte mit neutral (0) auffüllen
imputer = SimpleImputer(strategy='constant', fill_value=0)
X = imputer.fit_transform(matrix)

pca = PCA(n_components=2)
koordinaten = pca.fit_transform(X)

plt.figure(figsize=(10, 8))
for i, partei in enumerate(matrix.index):
    plt.annotate(partei, (koordinaten[i, 0], koordinaten[i, 1]))
plt.scatter(koordinaten[:, 0], koordinaten[:, 1], alpha=0.5)
plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.1%} erklärte Varianz)')
plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.1%} erklärte Varianz)')
plt.title('Parteipositionierung — Bundestagswahl 2021')
plt.tight_layout()
plt.savefig('pca_bt21.png', dpi=150)
```

### Nach Bundesland oder Wahlart filtern

```python
metadata = pd.read_csv('election_metadata.csv')
answers = pd.read_csv('all_wahlomat_answers.csv')

# Alle Wahlen in Bayern
by_ids = metadata[metadata['state'] == 'Bayern']['election_id']
bayern = answers[answers['election_id'].isin(by_ids)]

# Wahlen ab 2017
neuere_ids = metadata[metadata['year'] >= 2017]['election_id']
neuere_wahlen = answers[answers['election_id'].isin(neuere_ids)]
```

---

## Weiterführende Links

- Ursprünglicher Wahl-O-Mat-Analyseansatz: [microraptor/wahlomat_analysis](https://github.com/microraptor/wahlomat_analysis)
- PCA und Korrelationsmatrix für deutsche Wahlen: [uioreanu/german-elections](https://github.com/uioreanu/german-elections)
- EU-2019-Analyse mit Methodenerklärung: [askLubich/Wahl-O-Mat-EU-2019](https://github.com/askLubich/Wahl-O-Mat-EU-2019)
- bpb-Nutzungsbedingungen: [Datensätze des Wahl-O-Mat](https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/)
