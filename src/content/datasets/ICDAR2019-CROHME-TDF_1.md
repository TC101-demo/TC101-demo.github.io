---
layout: layouts/dataset.njk
kind: dataset
title: ICDAR 2019 Competition on Recognition of Handwritten Mathematical Expressions and Typeset Formula Detection
submission_date: "2020-01-29"
version: "1"
topic: "Mathematical Expressions::Handwritten"
publication: icdar_2019
authors:
  - name: Harold Mouchère
    email: "harold.mouchere(at)univ-nantes.fr"
    affiliation: LS2N / Université de Nantes
license:
  identifier: CC-BY-NC-SA-3.0
  name: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
  url_terms: "https://creativecommons.org/licenses/by-nc-sa/3.0/"
keywords:
  - Math Expression Recognition
  - Handwritten
  - Typeset formula
  - Detection
downloads:
  - filename: TC11_package_CROHME2019.zip
    urls:
      - "http://tc11.cvc.uab.es/index.php?com=upload&action=file_down&section=dataset&section_id=270&file=237"
    type: other
    dl_size: 364 MB
    description: Zip file with data, tools and papers
thumbnail: /images/ICDAR2019-CROHME-TDF_1/146.jpg
---

This package provides training and test data from the competitions CROHME 2011, 2012, 2013, 2014, 2016 and 2019.

## Dataset Information

This package bundles the CROHME training and test data accumulated across several editions of the competition together with the typeset formula detection (TDF) extension introduced in the 2019 edition.

## Ground Truth

### Math expression for online and off handwriting

The ground-truth is available in INKML format (with latex string and mathml structure), in Stroke Label Graph (SLG, associating stroke to ground-truth) and Object Layout Graph (symbol layout tree independent of the strokes). These ground-truth allows training and evaluation for on-line and off-line recognition tasks.

### Typeset Formula Detection

Using the ground-truth from the [GTDB datasets](https://github.com/uchidalab/GTDB-Dataset), the math expressions are located in a set of scientific documents.

## Research Tasks

### Online Handwritten Formula Recognition

For the traditional task in CROHME, participants must convert a list of handwritten strokes captured as a list of polylines from a tablet or similar devices to a Symbol Layout Tree (SLT). This SLT captures the segmentation of strokes into symbols, symbol classification, and the spatial relationships between symbols. SLTs are represented using labeled directed graphs, so that all segmentation, classification, and relationship (parsing) errors can be automatically identified and compiled using tools developed for CROHME (CROHMELib and LgEval).

### Offline Handwritten Formula Recognition

For offline recognition of handwritten inputs, we render images from the (x,y) points in the CROHME InkML files. As in the previous task, for a given test image, participating systems must produce one .lg file.

### Detection of Formulas in Document Pages

In this task, for a given document page, participating systems identify the location of formulas using bounding boxes. Evaluation is done by calculating the intersection over union (IoU) with the groundtruth annotations.
