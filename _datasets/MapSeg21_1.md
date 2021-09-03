---
title: ICDAR 2021 Competition on Historical Map Segmentation
thumbnail: 'images/MapSeg21_1/177.jpg'
abstract: 'This is the dataset of the ICDAR 2021 Competition on Historical Map Segmentation (“MapSeg”).'
submission_date: 2021-05-27
version: 1
publication: icdar_2021  # there should be an official list of publication ids
authors: 
  - name: 'Joseph Chazalon'
    email: 'joseph.chazalon(at)lrde.epita.fr'
    affiliation: 'EPITA Research and Development Laboratory'
    website: 'https://jchazalon.github.io/'
    orcid: '0000-0002-3757-074X'
  - name: 'Edwin Carlinet'
    email: 'edwin.carlinet(at)lrde.epita.fr'
    affiliation: 'EPITA Research and Development Laboratory'
# There may be a hierarchical browsing available at some point.
# The order of the categories is important.
categories:
  - "Graphical Documents"
  - "Maps"
# Tags are unordered
tags:
  - 'historical maps'
  - 'vectorization'
  - 'segmentation'
  - 'segment detection'
license: 
  # See https://spdx.org/licenses/ to indicate the proper Identifier
  identifier: 'CC-BY-4.0'
  name: 'Creative Commons Attribution 4.0 International'
  url_terms: 'https://creativecommons.org/licenses/by/4.0/legalcode'
downloads:
  - filename: 'icdar21-mapseg-v1.0.0-full-20210527a.tar.gz'
    urls: 
      # You can provide multiple URLs (mirrors) for the exact same file
      - 'https://zenodo.org/record/4817662/files/icdar21-mapseg-v1.0.0-full-20210527a.tar.gz?download=1'
    type: dataset  # no constraint for now - not really used
    dl_size: '1.9 GB'
    description: 'Full train, validation and test dataset with ground truth'
    md5sum: '82f1654d2395d3e65979191f0e80f20d'  # optional, use 'md5sum $file' to generate
  - filename: 'competition-report.pdf'
    urls: 
      - 'https://arxiv.org/abs/2105.13265'
    type: paper
    description: 'Competition report'
  - filename: 'icdar21-mapseg/icdar21-mapseg-eval-1.0.4.zip'
    urls: 
      - 'https://zenodo.org/record/4818401/files/icdar21-mapseg/icdar21-mapseg-eval-1.0.4.zip?download=1'
      - 'https://github.com/icdar21-mapseg/icdar21-mapseg-eval/archive/refs/tags/1.0.4.zip'
    type: code
    dl_size: '305.9 kB'
    description: 'Code for evaluation tools'
    md5sum: '44b70e7bed9b166f5b38e7fce5f68ad0'
---

This competition ran from November 2020 to April 2021.
Evaluation tools are included.

Official competition website: [icdar21-mapseg.github.io](https://icdar21-mapseg.github.io/)

### Citing
The competition report can be cited as:

```
Joseph Chazalon, Edwin Carlinet, Yizi Chen, Julien Perret, Bertrand Duménieu, Clément Mallet, Thierry Géraud, Vincent Nguyen, Nam Nguyen, Josef Baloun, Ladislav Lenc, and Pavel Král, "ICDAR 2021 Competition on Historical Map Segmentation", in Proceedings of the 16th International Conference on Document Analysis and Recognition (ICDAR'21), September 5-10, 2021, Lausanne, Switzerland.
```

BibTeX entry:

```bibtex
@InProceedings{chazalon.21.icdar.mapseg,
  author = {Joseph Chazalon and Edwin Carlinet and Yizi Chen and Julien Perret and Bertrand Duménieu and Clément Mallet and Thierry Géraud and Vincent Nguyen and Nam Nguyen and Josef Baloun and Ladislav Lenc and and Pavel Král},
  title = {ICDAR 2021 Competition on Historical Map Segmentation},
  booktitle = {Proceedings of the 16th International Conference on Document Analysis and Recognition (ICDAR'21)},
  year = {2021},
  address = {Lausanne, Switzerland}, 
}
```

### Acknowledgements
We thank the City of Paris for granting us with the permission to use and reproduce the atlases used in this work.


### Sources
The images of this dataset are extracted from a series of 9 atlases of the City of Paris produced between 1894 and 1937 by the Map Service (“Service du plan”) of the City of Paris, France, for the purpose of urban management and planning. For each year, a set of approximately 20 sheets forms a tiled view of the city, drawn at 1/5000 scale using trigonometric triangulation.

Sample citation of original documents:

```
Atlas municipal des vingt arrondissements de Paris. 1894, 1895, 1898, 1905, 1909, 1912, 1925, 1929, and 1937. Bibliothèque de l’Hôtel de Ville. City of Paris. France.
```


### Motivation

This competition aims as encouraging research in the digitization of historical maps. In order to be usable in historical studies, information contained in such images need to be extracted. The general pipeline involves multiples stages; we list some essential ones here:

- segment map content: locate the area of the image which contains map content;
- extract map object from different layers: detect objects like roads, buildings, building blocks, rivers, etc. to create geometric data;
- georeference the map: by detecting objects at known geographic coordinate, compute the transformation to turn geometric objects into geographic ones (which can be overlaid on current maps).

### Task overview

- Task 1: Detection of building blocks
- Task 2: Segmentation of map content within map sheets
- Task 3: Localization of graticule lines intersections

Please refer to the enclosed `README.md` file or to the official website for the description of tasks and file formats.

### Evaluation metrics and tools

Evaluation metrics are described in the competition report and tools are available for download.
