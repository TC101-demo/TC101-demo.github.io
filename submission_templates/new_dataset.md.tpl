(Extra line to prevent template parsing, please remove it when you edit this file.)
---
# Please fill all REQUIRED fields.
# OPT. fields are optional and can safely be removed.
# This "front matter" section is used to define variables which will be substituted in the templates.
layout: dataset_page  # REQUIRED on GitHub pages (please leave it as is), will be fixed when they adopt Jekyll v4
title: "My dataset of historical glyphs"  # REQUIRED Replace with your dataset title
thumbnail: 'images/{DATASET_ID}_{DATASET_VERSION}/{FILENAME}'  # REQUIRED Path to the thumbnail image you want to use
abstract: 'Summary about my dataset.'  # REQUIRED 1- or 2-line summary used in the listing
submission_date: 2021-05-27  # REQUIRED Original release date of this dataset (may be in the past) in YYYY-MM-DD format
version: 1  # REQUIRED Version of the dataset (or 1 if none)
publication: icdar_2021  # OPT. Identifier of the publication. See `_data/publications.yml`
authors:   # REQUIRED At least one author
  - name: 'Some Name'  # REQUIRED Author name (can be person or company)
    email: 'some.name(at)exemple.com'  # OPT. obfuscated email
    affiliation: 'Some organization'  # OPT. Affiliation (separate with comma for multiple affiliations)
    website: 'https://example.com'  # OPT. Webpage
    orcid: 'XXXX-XXXX-XXXX-XXXX'  # OPT. ORCID id
  - name: 'Some Other Name'
    email: 'other(at)example.com'
    affiliation: 'Some organization'
    # Add more fields and authors if needed
# OPT. list of categories
# There may be a hierarchical browsing available at some point.
# The order of the categories is important.
categories:
  - "Graphical Documents"
  - "Kids Drawings"
# REQUIRED List of tags (at least one)
# Tags are unordered
tags:
  - 'vectorization'
  - 'segmentation'
license:  # REQUIRED licence specification
  name: 'Creative Commons Attribution 4.0 International'  # REQUIRED (can be any text)
  identifier: 'CC-BY-4.0'  # OPT. See https://spdx.org/licenses/ to indicate the proper Identifier
  url_terms: 'https://creativecommons.org/licenses/by/4.0/legalcode'  # OPT. URL to license terms
downloads:  # OPT. Download links: if possible provide direct linking
  - filename: 'mydataset_v1.tar.gz'  # REQUIRED Name used in the link
    urls:  # REQUIRED List of URLs
      # You can provide multiple URLs (mirrors) for the exact same file
      - 'https://zenodo.org/record/...'
    type: dataset  # OPT. no constraint for now - not really used
    dl_size: '1.9 GB'  # OPT. Indicative file size
    description: 'Full train, validation and test dataset with ground truth'  # REQUIRED Short description
    md5sum: '82f1654d2395d3e65979191f0e80f20d'  # OPT. Use 'md5sum $file' to generate
  - filename: 'paper.pdf'
    urls: 
      - 'https://arxiv.org/abs/...'
    type: paper
    description: 'Our paper at ICDAR'
  - filename: 'source_code.zip'
    urls: 
      - 'https://zenodo.org/record/...'
      - 'https://github.com/...'
    type: code
    dl_size: '305.9 kB'
    description: 'Code to reproduce the results'
    md5sum: '44b70e7bed9b166f5b38e7fce5f68ad0'
---

Short introduction — Please use UTF8 encoding for the whole file.
The remaining of this file is a [Markdown document](https://guides.github.com/features/mastering-markdown/) using [GitHub flavor](https://github.github.com/gfm/).

The document structure of following example sections is a suggestion: you can add more images and content, and even some HTML tags if needed.
Please take some time to motivate the existence of this dataset, present the research tasks and data format.
**No need to be very precise: all the relevant details should be in the README file bundled with your dataset archive.**


### Citing
This dataset should be cited as:

```
Authors, title, publication, year…
```

BibTeX entry:

```bibtex
@InProceedings{bibkey,
  author = {Authors},
  title = {Conference on…},
  booktitle = {Proceedings of…},
  year = {2021},
  address = {Some nice place}, 
}
```

### Funding / Acknowledgements
We thank…


### Sources
The images of this dataset are extracted from…


### Motivation

This dataset was created to…


### Task overview

- Task 1: FIXME (goal, input, output, metric, ground truth)
- Task 2: FIXME (goal, input, output, metric, ground truth)
- Task 3: FIXME (goal, input, output, metric, ground truth)

Please refer to the enclosed `README.md` file or to the official website for a detailed description of tasks and file formats.

### Evaluation tools
Evaluation tools are available at…

