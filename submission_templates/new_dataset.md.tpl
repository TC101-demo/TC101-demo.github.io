# Remove this commented line once you paste into a real file.
#
# ELEVENTY CATALOG NOTES
# ──────────────────────
# 1. Save final file under:   src/content/datasets/YOURSHORTID_VERSION.md   (ASCII slug)
# 2. `topic` is one colon-delimited hierarchy from src/_data/topics.yml, e.g.
#       topic: "Graphical Documents::Maps"
# 3. `keywords` replaces the legacy unordered `tags` list.
#
---
layout: layouts/dataset.njk
kind: dataset
title: "My dataset of historical glyphs"                     # REQUIRED
abstract: >-
  Very short teaser (shown in listings and search excerpt). Plain text is best.
submission_date: "2025-03-09"                                  # REQUIRED YYYY-MM-DD
version: "1"                                                      # REQUIRED
topic: "Graphical Documents::Handwriting Samples"               # REQUIRED  (controlled vocabulary)
authors:                                                        # REQUIRED ≥1 author
  - name: Example Author
    email: someone(at)example.com
    affiliation: Example Org
    website: "https://example.com"
    orcid: "0000-0000-0000-0000"
thumbnail: "/images/MyDatasetName_1/thumbnail.jpg"              # OPTIONAL but recommended (/images prefix)
keywords:                                                       # OPTIONAL list
  - vectorization
  - segmentation
publication: icdar_2021                                         # OPTIONAL id — see src/_data/publications.yml
license:
  identifier: CC-BY-4.0                                          # REQUIRED SPDX id
  name: Creative Commons Attribution 4.0 International          # REQUIRED
  url_terms: "https://creativecommons.org/licenses/by/4.0/legalcode"
downloads:                                                      # REQUIRED ≥1 artifact
  - filename: mydataset_v1.tar.gz
    urls:
      - "https://zenodo.org/record/REPLACE_ME/files/file.tar.gz?download=1"
    type: dataset
    dl_size: 1.9 GB
    description: Full train / val / test with ground-truth README
    md5sum: 00000000000000000000000000000000
  - filename: paper.pdf
    urls:
      - "https://arxiv.org/abs/TODO"
    type: paper
    description: Main paper referencing the dataset
  - filename: evaluator.zip
    urls:
      - "https://github.com/org/repo/archive/refs/heads/main.zip"
    type: code
    dl_size: 256 kB
    description: Reference evaluation tooling
---

Use UTF-8 Markdown for the descriptive body below. First paragraph doubles as excerpt when `abstract` is omitted.

Motivate the existence of the dataset, outline tasks supported, citation format… **Exact field-level detail should mirror your upstream README.**

### Citing
```
AUTHORS Year "Title …"
```

### Acknowledgements
…
