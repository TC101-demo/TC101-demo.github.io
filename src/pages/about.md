---
layout: layouts/page.njk
permalink: /about/
title: About this catalog
---

## Mission

The IAPR TC10/TC11 catalog is a community-curated index of artifacts that
support reproducible research in the Document Image Analysis and Recognition
(DIAR) field.

IAPR TC10 promotes interaction among researchers working in document image
analysis in general, and graphics recognition in particular. IAPR TC11 is
concerned with the theory and applications of Reading Systems. Together they
maintain this catalog as a service to the community.

## Scope

We catalog four kinds of artifact:

- **Datasets** with their ground truth, evaluation protocols, and download
  mirrors.
- **Software** — annotation tools, evaluation libraries, reference
  implementations.
- **Competitions** with their tasks, metrics, evaluation tools, and
  leaderboards.
- **Papers and reports** that accompany the above (as linked downloads,
  not standalone entries).

We do not host data ourselves: each entry links to artifacts hosted on
Zenodo, Hugging Face Hub, GitHub, or institutional servers. Where multiple
mirrors exist we record them all, together with integrity hashes (md5 or
sha256).

## How curation works

1. A contributor opens a pull request with a new entry (a markdown file
   with YAML front-matter), or uses the [submission form]({{ '/submit/' | url }}).
2. Continuous integration validates the front-matter against our JSON
   Schemas and runs a quick link check.
3. A TC curator reviews the entry for scope, taxonomy fit, and metadata
   quality before merging.
4. A nightly job re-checks every mirror; broken links open a GitHub issue
   for the maintainers.

## How to contribute

- **Browse first.** [Search the catalog]({{ '/browse/' | url }}) to make
  sure your dataset is not already listed.
- **Submit** via the [guided form]({{ '/submit/' | url }}) — it generates
  the YAML and offers a one-click GitHub PR.
- **Report a problem** by opening an
  [issue]({{ site.repo }}/issues/new).

## Acknowledgements

This site is built with [Eleventy](https://www.11ty.dev/) and
[Pagefind](https://pagefind.app/). The IAPR-TC11 Zenodo community hosts
many of the indexed competition datasets.
