# Tier 1 — Strategic added-value assessment

*Audience: IAPR TC10/TC11 chairs, dataset curators, and the broader DIAR community.*

*Date: 2026-05*

## TL;DR

**Recommendation: GO** — but reposition the TC10/11 resource catalog from a
*primary host* to a **curated, DIAR-native index** of artifacts (datasets,
software, competitions, evaluation tools) that are physically stored on
platforms such as Zenodo, Hugging Face Hub, GitHub, and institutional servers.

The window of opportunity is unusual: Papers with Code was sunset by Meta in
July 2025, leaving a void for unified paper ↔ dataset ↔ code ↔ benchmark
linkage. Hugging Face Hub now hosts most ML-grade document analysis datasets
but offers no community-curated, taxonomy-driven, publication-anchored view.
The TC10/11 catalog can credibly own that niche because it already has the
right metadata model and the editorial mandate of an established scientific
society.

## Scope of the assessment

We compared five platforms relevant to a DIAR researcher who wants to find,
cite, or publish a dataset, an evaluation tool, or a benchmark:

1. **This prototype** (Jekyll-based, in this repo).
2. **The current live TC11 catalog** at `tc11.cvc.uab.es` (the system the
  prototype is meant to replace).
3. **Hugging Face Hub — Datasets**.
4. **The Papers with Code archive** (read-only since July 2025).
5. **The Zenodo `iapr-tc11` community**.

## Comparison along eight axes

### Axis 1 — Curation model

- **Prototype / live TC11 site**: curated by a designated curator
(Dr. Joseph Chazalon as of 2025) with submissions accepted via an upload
form. Entries are reviewed before publication. *Strongest curation model in
this comparison.*
- **HF Hub**: uploader-driven, no editorial gate. Quality and metadata
completeness vary widely.
- **Papers with Code archive**: was uploader-driven plus best-effort
reconciliation; now frozen.
- **Zenodo IAPR-TC11 community**: community moderators approve inclusion in
the community, but the records themselves are uploader-described; no DIAR
topic normalization.

### Axis 2 — Domain taxonomy

- **Prototype**: hierarchical `topic` field, e.g.
`Graphical Documents::Maps` and
`Graphical Documents::Handwritten Documents::On-line and Off-line` (see
`_dataset_collection/MapSeg21_1.md` and
`_dataset_collection/ICDAR2019-CROHME-TDF_1.md`). This is **the** DIAR
taxonomy.
- **Live TC11 site**: same topic hierarchy as the prototype (the prototype
inherits it).
- **HF Hub**: free-form `tags`, flat task taxonomy oriented toward ML
pipelines (`task_categories`, `task_ids`). No notion of historical maps,
graphics recognition, baseline detection, etc.
- **Papers with Code**: had its own ML-centric task taxonomy; not DIAR-aware.
- **Zenodo**: free-text keywords, no taxonomy.

### Axis 3 — Publication linkage (ICDAR / ICFHR / DAS / IJDAR)

- **Prototype / live TC11 site**: each entry carries a `publication` field
(e.g. `publication: icdar_2021`) — first-class browsing by conference and
year.
- **HF Hub**: optional `arxiv:` tag on dataset cards; no notion of DIAR
conferences. No way to ask "which datasets were used by ICDAR 2023
competition papers?".
- **Papers with Code**: best-in-class for ML conferences generally, but DIAR
coverage was thin and is now frozen.
- **Zenodo**: free-text "Related identifiers" field — usable but unstructured.

### Axis 4 — Benchmark, competition, and evaluation-tool tracking

- **Prototype**: already supports `downloads[].type = code | paper | dataset`,
and the `[MapSeg21_1](../_dataset_collection/MapSeg21_1.md)` entry bundles
evaluation tools and the competition report alongside the data. With a
small extension (a `competitions/` collection), it can capture tasks,
metrics, and result tables.
- **HF Hub**: leaderboards exist (Spaces, `evaluate` library) but are
scattered, not curated for DIAR, and rarely link back to the originating
ICDAR competition page.
- **Papers with Code**: this was its signature feature; **the void is now
unfilled**.
- **Zenodo**: no concept of leaderboards.

### Axis 5 — Persistence, citability, integrity

- **Prototype**: stores `md5sum` per file (excellent), but does not yet mint
DOIs (a curated index doesn't need to; it can link to Zenodo DOIs).
- **Live TC11 site**: hosts files itself, no DOIs, integrity not always
surfaced.
- **HF Hub**: revisions are content-addressed (git LFS), datasets have a
citation field, no DOIs by default.
- **Zenodo**: **best persistence and citability** in this comparison — every
record has a DOI and CERN-backed archival commitment. A modernized TC10/11
catalog should defer hosting to Zenodo whenever feasible.

### Axis 6 — Coverage beyond datasets

- **Prototype**: the `downloads[].type` field already accommodates `code`,
`paper`, `other`. Promoting **software** and **competition** to first-class
entry types is a small additive change.
- **HF Hub**: datasets, models, spaces — but no notion of "annotation tool"
or "evaluation library" as a curated, browsable category.
- **Papers with Code**: code, datasets, benchmarks — frozen.
- **Zenodo**: any artifact, but no typing.

### Axis 7 — Discoverability UX

- **Prototype**: a flat `for` loop in
`[_pages/datasets.html](../_pages/datasets.html)`; no search, no filter,
no sort. Tier 2 must address this.
- **Live TC11 site**: faceted browsing by topic and publication, but no
free-text search across descriptions, no client-side sort, dated UI.
- **HF Hub**: strong search and filter UX, but for a DIAR researcher the
signal-to-noise ratio is poor (no taxonomy, no community curation).
- **Papers with Code**: archive only.
- **Zenodo**: search by keyword/community works; no DIAR facets.

### Axis 8 — Submission workflow & quality gates

- **Prototype**: ad hoc — submission via email/forms, no schema validation,
no dead-link checks.
- **Live TC11 site**: upload form with registration. Manual review by
curator. No automated validation.
- **HF Hub**: instant upload, no review; YAML "dataset card" linter exists.
- **Zenodo**: instant upload, community moderators approve later. No
schema-level validation.

## What the modernized TC10/11 catalog should be

A **curated, schema-validated, DIAR-native index** that:

1. **Indexes rather than hosts.** Each entry's `downloads[].urls` points at
  Zenodo, HF Hub, GitHub, or institutional mirrors. The catalog itself
   stores only thumbnails, metadata, and (small) evaluation scripts.
2. **Owns the DIAR taxonomy.** The hierarchical `topic` field becomes a
  controlled vocabulary in `data/topics.yml`.
3. **Anchors to DIAR publications.** A `publication` registry covers ICDAR,
  ICFHR, DAS, IJDAR with year-level granularity.
4. **Treats competitions and software as first-class objects**, filling the
  void left by Papers with Code inside the DIAR scope.
5. **Has community editorial review** as its core differentiator — every
  entry has been reviewed by a TC curator (visible "reviewed-by" trail).
6. **Standardizes metadata**: SPDX license identifiers, ORCID for authors,
  DOIs preferred for citation, `schema.org/Dataset` JSON-LD for search-engine
   findability (the existing layout already uses `itemprop="..."`).
7. **Has automated quality gates**: JSON-Schema validation on PR, scheduled
  dead-link detection, optional file-integrity probe.

This positioning is defensible because **no other platform combines** (a)
community curation by a recognized society, (b) a DIAR-native taxonomy,
(c) publication-anchored navigation, and (d) competition tracking. Each of
HF Hub, Zenodo, and the PwC archive provides one or two of these at most.

## Risks and how to mitigate them


| Risk                                                | Mitigation                                                                                                                                    |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Catalog drifts out of date as DIAR shifts to HF Hub | Make submission frictionless (Tier 2 §2.4) and run a periodic crawler over the IAPR-TC11 Zenodo community to suggest new entries to curators. |
| Storage / bandwidth liabilities                     | Index-only model: hosting deferred to Zenodo / HF Hub / GitHub.                                                                               |
| Curator burnout                                     | Schema validation + dead-link bot reduce curator workload. PR-based submissions distribute the load.                                          |
| Duplicate effort with HF Hub                        | Position as an **index of** HF Hub records, not a competitor. A "Hosted on" pill on each entry signals where the data physically lives.       |


## Go / no-go recommendation

**GO.** The strategic justification rests on three load-bearing facts:

1. The Papers with Code shutdown (July 2025) created a tangible discovery
  gap that no current platform fully fills for DIAR.
2. The prototype's existing metadata model
  (`_dataset_collection/MapSeg21_1.md`) is already richer and more
   DIAR-appropriate than any competitor's; the technical gap is in UX and
   automation, not in data modelling.
3. The TC10/11 has an existing curation function and an active curator —
  the institutional capability is in place.

## Sample stress-test set (Tier 2 M1–M3)

Ten real-world entries representative of the breadth the catalog must
support; useful as a migration stress test:

1. **ICDAR 2021 MapSeg** — already in the repo
  (`_dataset_collection/MapSeg21_1.md`); historical maps, Zenodo-hosted,
   evaluation code on GitHub.
2. **ICDAR 2019 CROHME + TDF** — already in the repo
  (`_dataset_collection/ICDAR2019-CROHME-TDF_1.md`); handwritten math,
   self-hosted, non-commercial license.
3. **ICDAR 2019 cBAD** — baseline detection, Zenodo DOI, PAGE-XML
  annotations.
4. **ICDAR 2017 cBAD** — earlier edition; tests cross-edition publication
  linkage.
5. **ICDAR 2015 SmartDoc** — smartphone document capture; tests
  image-/video-typed downloads.
6. **HisIR19** — historical handwritten retrieval; large (~24 GB test set)
  — tests `dl_size` rendering and integrity probe cost.
7. **OmniDocBench** — HF Hub-hosted (not Zenodo); tests the "index of HF
  Hub records" pattern.
8. **MonkeyDoc** — HF Hub-hosted, ~1.74 TB; tests very-large-artifact
  linking without hosting.
9. **A software-only entry** (e.g. PAGE-XML editor or an evaluation library
  such as the CROHMELib/LgEval tools) — tests the `software` collection.
10. **A competition entry** (e.g. ICDAR 2024 DocVQA or DAS competitions) —
  tests the `competition` collection with tasks, metrics, evaluation tool,
    and result table.

## Exit criterion to enter Tier 2

A "go" decision from the TC10 and TC11 chairs (or their delegates) on the
repositioning statement above, plus agreement on the 10-entry stress-test
set or a substituted equivalent.

---

*End of Tier 1 assessment.*