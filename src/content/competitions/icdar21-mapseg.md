---
layout: layouts/competition.njk
kind: competition
title: ICDAR 2021 Competition on Historical Map Segmentation (MapSeg)
submission_date: "2021-09-05"
topic: "Graphical Documents::Maps"
publication: icdar_2021
organizers:
  - name: Joseph Chazalon
    affiliation: EPITA Research and Development Laboratory
    orcid: 0000-0002-3757-074X
  - name: Edwin Carlinet
    affiliation: EPITA Research and Development Laboratory
official_website: "https://icdar21-mapseg.github.io/"
report_url: "https://arxiv.org/abs/2105.13265"
evaluation_tool_url: "https://github.com/icdar21-mapseg/icdar21-mapseg-eval"
tasks:
  - name: Detection of building blocks
    description: Locate building-block polygons within map sheets.
    metrics:
      - COCO Panoptic Quality
  - name: Segmentation of map content within map sheets
    description: Distinguish map content from surrounding annotations and decorations.
    metrics:
      - mean IoU
  - name: Localization of graticule lines intersections
    description: Identify the (x, y) coordinates of graticule line crossings.
    metrics:
      - Hausdorff-derived distance score
related_datasets:
  - /datasets/MapSeg21_1/
keywords:
  - historical maps
  - segmentation
  - building blocks
  - graticule
---

The ICDAR 2021 Competition on Historical Map Segmentation (MapSeg) ran from
November 2020 to April 2021. Twelve teams from academia and industry submitted
results across the three tasks listed above, evaluated on a held-out test set
of historical Paris atlas sheets (1894-1937).

See the official website and competition report for the full task definitions,
data formats, and submission details. The evaluation tools are linked above
and indexed independently under the Software collection.
