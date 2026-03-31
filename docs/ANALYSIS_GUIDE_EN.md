# Wahl-O-Mat Extended Dataset — Analysis Guide

Back to landing page: [`../README.md`](../README.md)

This guide explains what the dataset is, what questions it can and cannot answer, which analytical methods are appropriate, and how to get started. It is written for two audiences: curious people with no statistical background, and data analysts who want to do rigorous work.

---

## What is this dataset?

The *Wahl-O-Mat* is a political matching tool published by the German Federal Agency for Civic Education (bpb) before elections. Parties answer a set of around 38 policy questions — agreeing, disagreeing, or staying neutral — and voters can compare their own answers to the parties' positions.

This dataset collects those party answers across **74 elections** held in Germany between 2003 and 2026, covering federal elections (*Bundestagswahlen*), state elections (*Landtagswahlen* and city-state equivalents), and European Parliament elections. It is the largest publicly available collection of Wahl-O-Mat data in a single, analysis-ready format.

**Two files:**

- `all_wahlomat_answers.csv` — one row per party, question, and election. ~43,600 rows.
- `election_metadata.csv` — one row per election, with human-readable names, state, year, and level.

---

## What the data looks like

### `all_wahlomat_answers.csv`

| Column | Description |
| --- | --- |
| `election_id` | Unique identifier for the election (e.g. `bundestagswahl2017`, `BT25_v1.02`) |
| `question` | Question index within that election (zero-based) |
| `party` | Party abbreviation as used in the source |
| `answer` | `1` = agree (*stimme zu*), `0` = neutral, `-1` = disagree (*stimme nicht zu*) |
| `title` | Short question label |
| `these_text` | Full question text in German |

### `election_metadata.csv`

| Column | Description |
| --- | --- |
| `election_id` | Matches `all_wahlomat_answers.csv` |
| `display_name_de` | German election name (e.g. `Bundestagswahl 2021`) |
| `display_name_en` | English election name (e.g. `Federal election 2021`) |
| `state` | German state name, or `Federal` / `European` |
| `year` | Four-digit year |
| `level` | `federal`, `state`, or `european` |

### Joining the files

```python
import pandas as pd

answers = pd.read_csv('all_wahlomat_answers.csv')
metadata = pd.read_csv('election_metadata.csv')

# All Schleswig-Holstein elections
sh_ids = metadata[metadata['state'] == 'Schleswig-Holstein']['election_id']
sh = answers[answers['election_id'].isin(sh_ids)]

# All federal elections
federal_ids = metadata[metadata['level'] == 'federal']['election_id']
federal = answers[answers['election_id'].isin(federal_ids)]
```

---

## What questions this data can answer

### For any curious person

**Which parties agreed most with each other in a given election?**
You can count how often any two parties gave the same answer across all questions. A high agreement rate means the parties took similar positions — at least on paper.

**Which questions divided parties most sharply?**
Some questions produce a near-even split between agree and disagree. These are the genuinely contested issues in that election. Others attract near-unanimous agreement — revealing where the political mainstream has converged.

**How often did parties choose the neutral option?**
Neutral answers (0) account for about 10% of all answers. A party that uses neutral frequently may be avoiding commitment on divisive topics.

**Did a major party's position on a recurring topic change over time?**
Topics like *Schuldenbremse* (debt brake) and *Frauenquote* (gender quota) appear across many elections. For parties present in many elections (SPD, FDP, CDU, Grüne), you can compare their answers over time — with an important caveat (see below).

### For data analysts

**Party positioning within a single election**
The most natural analysis is a 2D map of parties based on their answer patterns, using PCA or MDS. This shows which parties are ideologically close and which are far apart within one election. This is what the existing graph pipeline (`build_graphs_from_csv.py`) already produces.

**Pairwise party similarity**
For any pair of parties in the same election, compute the proportion of questions where they gave identical answers. This is the most assumption-free similarity measure available in the data.

**Question controversy within an election**
For each question, compute the proportion of parties agreeing vs disagreeing. Questions with a near-50/50 split (and low neutral usage) are genuinely divisive. Questions with >85% agreement in one direction reveal consensus positions.

**Ideological clustering**
Hierarchical clustering on pairwise disagreement distances can identify groups of ideologically similar parties without imposing a fixed number of clusters.

**Topic co-occurrence within elections**
Correlations between questions within a single election reveal which topics tend to be answered similarly — suggesting underlying ideological dimensions. Factor analysis can formalise this, with caveats on sample size.

---

## What questions this data cannot answer

**Whether party positions reflect actual policy**
Wahl-O-Mat answers are self-reported for electoral purposes. They may differ from voting records, coalition agreements, or what parties actually do in government. This is a *stated preference* dataset, not a *revealed preference* one.

**Why a party answered a certain way**
The data records positions, not reasoning. A neutral answer (0) could mean genuine ambivalence, strategic avoidance, or internal party disagreement — the dataset cannot distinguish these.

**Anything about voter behaviour**
There is no voter data here. You cannot infer how voters used the tool, whether it influenced their decisions, or how the party positions relate to election outcomes.

**Whether a topic shift reflects a real change in party ideology**
Even when the same question title appears across multiple elections, the full question text (*these_text*) often differs. A changed answer may reflect a changed question rather than a changed party position. Always compare *these_text* directly before drawing longitudinal conclusions.

**Cross-election comparisons of party positioning**
Because each election has a different set of questions, you cannot place parties from different elections into a single PCA map and compare their positions directly. The feature space is different each time.

**Whether the questions are representative**
The bpb selects the 38 questions through an editorial process. What was not asked is invisible in this data — and the selection may favour certain political dimensions over others.

---

## Which methods to use — and which not to

This section is aimed at analysts. The core constraint to keep in mind throughout: the data is a **three-point ordinal scale** (−1, 0, 1), not a continuous numeric variable. Most classical statistical methods assume continuous, normally distributed data. That assumption is violated here in every case.

### Dimensionality reduction

| Method | Verdict | Notes |
| --- | --- | --- |
| PCA on Pearson correlations | ✅ Works in practice | Continuous assumption technically violated but distortion is modest with n > 20 parties. Used by all existing projects. |
| Polychoric PCA | ✅ Methodologically correct | Designed for ordinal data. More work but the honest choice if making formal claims. |
| MDS on disagreement distances | ✅ Clean, no assumptions | Compute pairwise disagreement directly; no correlation step. Underused but arguably more appropriate. |
| Factor analysis | ⚠️ Unstable at low n | Only viable for elections with ≥ 20 parties. Do not use for small state elections. |
| k-means clustering | ❌ Not appropriate | Assumes continuous Euclidean space. |

### Similarity and correlation

| Method | Verdict | Notes |
| --- | --- | --- |
| Pairwise agreement rate | ✅ Best similarity measure | Proportion of identical answers between two parties. Assumption-free, directly interpretable. |
| Spearman correlation | ✅ Preferred over Pearson | More appropriate for ordinal scale. Results nearly identical in practice given only three values. |
| Pearson correlation | ✅ Acceptable for exploration | Technically suboptimal but widely used. Do not over-interpret small differences. |

### Clustering

| Method | Verdict | Notes |
| --- | --- | --- |
| Hierarchical clustering | ✅ Works well | No distributional assumptions. Use disagreement distances as input. Number of clusters is a choice you impose — check stability. |
| k-means | ❌ Not appropriate | See above. |

### Significance testing

| Method | Verdict | Notes |
| --- | --- | --- |
| Chi-square / Fisher's exact | ✅ For individual questions | Appropriate for a single question with pre-defined party groups. |
| Kruskal-Wallis / Mann-Whitney | ✅ Non-parametric alternatives | Use instead of ANOVA/t-tests when comparing groups. |
| ANOVA / t-tests | ❌ Not appropriate | Assume continuous, normally distributed data. |
| Any inferential test on small elections | ⚠️ Very low power | Elections with fewer than 10–15 parties are too small for confident inference. |

### The multiple comparisons problem

If you run significance tests across many questions or many party pairs, some results will appear significant by chance. Apply Bonferroni correction (or Holm-Bonferroni) when making multiple comparisons. The more tests you run, the more important this becomes.

### The golden rule

**It is always acceptable — and often correct — to say: \"This data does not support any confident conclusions.\"**

The dataset records self-reported positions on a three-point scale with a small number of parties per election. It is well-suited to exploratory and descriptive analysis. It is not well-suited to strong inferential claims.

---

## Known caveats and limitations

**Questions are not comparable across elections.**
Each election has its own questionnaire. You cannot directly compare a party's answer on \"Tempolimit\" in 2013 to its answer in 2021 without first verifying the question texts are equivalent.

**Some elections have very few parties.**
Elections from the early 2000s have as few as 2–3 parties. These elections are interesting historically but cannot support multivariate analysis. As a rough guide: PCA requires at least ~10 parties to be interpretable; factor analysis requires ~20.

**Schleswig-Holstein 2005 and 2017 contain multilingual questions.**
These elections included questions in German, Danish, and North Frisian. After deduplication, the dataset keeps the first language variant encountered. The answer values are unaffected but the question texts may not be in German.

**Party names are not normalised across elections.**
The same party may appear under different names in different elections — for example, the Greens appear as `GRÜNE`, `BÜNDNIS 90/DIE GRÜNEN`, `GRÜNE/B 90`, and `GRÜNE/GAL`. Cross-election party tracking requires manual name matching.

**Neutral (0) has multiple interpretations.**
A neutral answer could mean genuine ambivalence, strategic positioning, or internal disagreement. It is not simply \"between agree and disagree.\"

**The dataset covers stated positions, not policies.**
Parties answer the Wahl-O-Mat for electoral purposes. Treat the data as evidence of electoral self-presentation, not of actual political behaviour.

**The bpb updates election data retroactively.**
The Excel workbook is updated periodically. Party entries can be added to past elections after initial publication. If you use a specific version of the dataset for research, note the workbook date (or a hash) you used.

---

## How to get started

### Minimal working example: party similarity in one election

```python
import pandas as pd

answers = pd.read_csv('all_wahlomat_answers.csv')

# Pick one election
bt21 = answers[answers['election_id'] == 'BT21_v1.02']

# Pivot to parties × questions matrix
matrix = bt21.pivot(index='party', columns='question', values='answer')

# Pairwise agreement rate between all party pairs
def agreement_rate(a, b):
    shared = a.notna() & b.notna()
    return (a[shared] == b[shared]).mean()

parties = matrix.index.tolist()
results = []
for i, p1 in enumerate(parties):
    for p2 in parties[i+1:]:
        rate = agreement_rate(matrix.loc[p1], matrix.loc[p2])
        results.append({'party_a': p1, 'party_b': p2, 'agreement': rate})

similarity = pd.DataFrame(results).sort_values('agreement', ascending=False)
print(similarity.head(10))
```

### Minimal working example: PCA party map

```python
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.impute import SimpleImputer
import matplotlib.pyplot as plt

answers = pd.read_csv('all_wahlomat_answers.csv')
bt21 = answers[answers['election_id'] == 'BT21_v1.02']
matrix = bt21.pivot(index='party', columns='question', values='answer')

# Fill missing values with neutral (0)
imputer = SimpleImputer(strategy='constant', fill_value=0)
X = imputer.fit_transform(matrix)

pca = PCA(n_components=2)
coords = pca.fit_transform(X)

plt.figure(figsize=(10, 8))
for i, party in enumerate(matrix.index):
    plt.annotate(party, (coords[i, 0], coords[i, 1]))
plt.scatter(coords[:, 0], coords[:, 1], alpha=0.5)
plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.1%} variance)')
plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.1%} variance)')
plt.title('Party positioning — Bundestagswahl 2021')
plt.tight_layout()
plt.savefig('pca_bt21.png', dpi=150)
```

### Filtering by state or election level

```python
metadata = pd.read_csv('election_metadata.csv')
answers = pd.read_csv('all_wahlomat_answers.csv')

# All Bayern elections
by_ids = metadata[metadata['state'] == 'Bayern']['election_id']
bayern = answers[answers['election_id'].isin(by_ids)]

# Elections by year range
recent_ids = metadata[metadata['year'] >= 2017]['election_id']
recent = answers[answers['election_id'].isin(recent_ids)]
```

---

## Further reading

- Original Wahl-O-Mat analysis approach: [microraptor/wahlomat_analysis](https://github.com/microraptor/wahlomat_analysis)
- PCA and correlation matrix for German elections: [uioreanu/german-elections](https://github.com/uioreanu/german-elections)
- EU 2019 analysis with methodology explanation: [askLubich/Wahl-O-Mat-EU-2019](https://github.com/askLubich/Wahl-O-Mat-EU-2019)
- bpb data terms: [Datensätze des Wahl-O-Mat](https://www.bpb.de/themen/wahl-o-mat/556865/datensaetze-des-wahl-o-mat/)
