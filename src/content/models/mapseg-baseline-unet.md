---
layout: layouts/model.njk
kind: model
title: MapSeg21 Baseline U-Net for Historical Map Segmentation
submission_date: "2021-06-15"
version: "1.0"
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
architecture: "U-Net (ResNet-34 encoder)"
framework:
  - PyTorch
parameters: "24M"
input_modality:
  - image
output_modality:
  - masks
tasks:
  - building-block-segmentation
  - map-content-segmentation
trained_on:
  - /datasets/MapSeg21_1/
evaluation:
  - dataset: MapSeg21
    split: test
    metric: COCO PQ (building blocks)
    score: 0.62
    reference: "https://arxiv.org/abs/2105.13265"
  - dataset: MapSeg21
    split: test
    metric: mean IoU (map content)
    score: 0.91
    reference: "https://arxiv.org/abs/2105.13265"
keywords:
  - historical maps
  - segmentation
  - U-Net
  - baseline
downloads:
  - filename: mapseg-baseline-unet.pt
    urls:
      - "https://zenodo.org/record/4817662/files/mapseg-baseline-unet.pt"
    type: weights
    dl_size: 92 MB
    description: Pre-trained PyTorch weights (baseline reference)
  - filename: README.md
    urls:
      - "https://github.com/icdar21-mapseg/icdar21-mapseg-eval"
    type: model-card
    description: Model card and usage instructions
---

A reference U-Net baseline released alongside the ICDAR 2021 MapSeg competition.
The model is trained to perform two of the three competition tasks
(building-block detection and map-content segmentation) on 1894-1937 atlas
sheets of the City of Paris.

It is published primarily as a **sanity-check baseline** so that participants
in any future re-run of the competition can confirm their data loading and
evaluation pipeline against a known reference, not as a state-of-the-art model.

See the [companion dataset](/datasets/MapSeg21_1/) and the
[evaluation tools](/software/icdar21-mapseg-eval/) for the full reproducible
pipeline.

> Note: this entry is illustrative for the catalog prototype; the weights file
> listed above is a placeholder URL, not a real download.
