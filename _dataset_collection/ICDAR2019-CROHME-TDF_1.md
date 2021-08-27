---
# Should we try to make the layout definition implicit?
layout: dataset
# Is this necessary? Should we put the topics and publications instead?
categories: dataset
# In the 2020 TC11 website, there is only 1 "topic", but "topics" are arranged in a hierarchical way, like a taxonomy
# Topic and publication are usually set by the curator in the 2020 TC11 website
# There may be a page for each topic / publication to describe them (with pictures)
topic: "Graphical Documents::Handwritten Documents::On-line and Off-line"
publication: icdar_2019  # there should be an official list of publication ids
title: ICDAR 2019 Competition on Recognition of Handwritten Mathematical Expressions and Typeset Formula Detection
submission_date: 2020-01-29
version: 1
authors: 
    - name: 'Harold Mouchère'
      email: 'harold.mouchere(at)univ-nantes.fr'
      affiliation: 'LS2N / Université de Nantes'
# See https://spdx.org/licenses/ to indicate the proper Identifier
license: 
    name: 'Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported'
    identifier: 'CC-BY-NC-SA-3.0'
    url_terms: 'https://creativecommons.org/licenses/by-nc-sa/3.0/'
keywords:  # Much like tags?
    - 'Math Expression Recognition'
    - 'Handwritten'
    - 'Typeset formula'
    - 'Detection'
# Render this automatically in a side bar in the 'dataset' template?
downloads:
    - filename: 'TC11_package_CROHME2019.zip'
      urls: 
        - 'http://tc11.cvc.uab.es/index.php?com=upload&action=file_down&section=dataset&section_id=270&file=237'
      type: 'other'
      dl_size: '364 MB'
      description: 'Zip file with data, tools and papers'
thumbnail: 'images/ICDAR2019-CROHME-TDF_1/146.jpg'
dataset_id: 'crohme19'
abstract: 'This package provides training and test data from the competitions CROHME 2011, 2012, 2013, 2014, 2016 and 2019.'
---

This package provides training and test data from the competitions CROHME 2011, 2012, 2013, 2014, 2016 and 2019.

## Dataset Information

This is a dummy description for the Dataset 1. That it can be longer than the
provided excerpt and give more details.


## Ground Truth

### Math expression for online and off handwriting
The ground-truth is available in INKML format (with latex string and mathml structure), in Stroke Label Graph (SLG, associating stroke to ground-truth) and Object Layout Graph (symbol layout tree independent of the strokes). These ground-truth allows training and evaluation for on-line and off-line recognition tasks.

### Typeset Formula Detection
Using the ground-truth from the [GTDB datasets](https://github.com/uchidalab/GTDB-Dataset), the math expressions are located in a set of scientific documents.

## Research Tasks

### Online Handwritten Formula Recognition
For the traditional task in CROHME, participants must convert a list of handwritten strokes captured as a list of polylines from a tablet or similar devices to a Symbol Layout Tree (SLT). This SLT captures the segmentation of strokes into symbols, symbol classification, and the spatial relationships between symbols. SLTs are represented using labeled directed graphs, so that all segmentation, classification, and relationship (parsing) errors can be automatically identified and compiled using tools developed for CROHME (CROHMELib and LgEval).

### Offline Handwritten Formula Recognition
For offline recognition of handwritten inputs, we will render images from the (x,y) points in the CROHME InkML files. As in the previous task, for a given test image, participating systems must produce one .lg file. Please notice since primitive level information (connected components) is not provided, we evaluate the systems based on the correct symbols and correct relation between the symbols (symbolic evaluation). Systems can produce a LaTeX string or Presentation MathML tree as output. LaTeX and MathML should be converted to symbolic LG for evaluation using provided toolsi (tex2symlg and mml2symlg). There are also tools to convert .lg files to symbolic label graphs (lg2symlg) for interested participants (although they will be defining their own ‘stroke’ primitives in that case).

For evaluation, we will use the same evaluation tools as in online recognition tasks, only ignoring CC (connected components) segmentation and the correspondence of CCs to symbols with this new format in symLGs.

### Detection of Formulas in Document Pages
In this task, for a given document page, participating systems identify the location of formulas using bounding boxes. Evaluation will be done by calculating the intersection over union (IoU) with the groundtruth annotations. We will use thresholds of 50% and 75% to observe coarse and fine detection of formula regions. Participants will also have the option to use character level information, but they also have to submit the final math regions for IoU calculation where regions are defined by the characters that they detected as math characters. This reflects how detection of math regions in born-digital documents (e.g., PDFs generated using a word processor) would be performed when characters are available.
