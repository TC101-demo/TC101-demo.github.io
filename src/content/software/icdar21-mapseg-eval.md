---
layout: layouts/software.njk
kind: software
title: ICDAR 2021 MapSeg Evaluation Tools
submission_date: "2021-05-27"
version: 1.0.4
topic: "Graphical Documents::Maps"
publication: icdar_2021
authors:
  - name: Joseph Chazalon
    affiliation: EPITA Research and Development Laboratory
    orcid: 0000-0002-3757-074X
    website: "https://jchazalon.github.io/"
license:
  identifier: MIT
  name: MIT License
  url_terms: "https://opensource.org/license/mit"
repository_url: "https://github.com/icdar21-mapseg/icdar21-mapseg-eval"
language:
  - Python
maintenance_status: maintained
keywords:
  - evaluation
  - segmentation
  - historical maps
related_datasets:
  - /datasets/MapSeg21_1/
---

Evaluation tools used to score submissions to the ICDAR 2021 MapSeg competition.

The package implements the three metrics described in the competition report:

1. **COCO PQ** for building-block detection (Task 1).
2. **Mean intersection-over-union with hierarchical penalty** for map-content segmentation (Task 2).
3. **Hausdorff-derived score** for graticule line intersection localisation (Task 3).

A reference Python implementation, command-line front-end, and unit tests are
provided. The tool is the canonical evaluator used to produce the official
leaderboard for the dataset linked above.
