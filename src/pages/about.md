---
layout: layouts/page.njk
permalink: /about/
title: About this catalog
description: Purpose, curator workflow, prototypes, contributors, acknowledgements — IAPR TC10/TC11 catalog hosted on GitHub Pages.
---

## Mission

The catalog is stewarded collaboratively by collaborators from IAPR **TC10** and **[TC11 (Intelligent Reading Systems)](http://tc11.cvc.uab.es/)**, for the broader **Document Image Analysis and Recognition** (DIAR) community.

- **TC10** emphasises interoperability among researchers working at the intersection of document imaging and graphical pattern recognition.
- **TC11** emphasises architectures, corpora and evaluation for machine reading pipelines.

Together the committees aggregate pointers so researchers can relocate datasets, tooling, evaluations and reproducibility artefacts efficiently.

## Where this prototype came from

Maintainers experimented with statically generated hubs on GitHub Pages to reduce friction submitting datasets and ancillary material while narrowing security exposure compared with classic dynamic CMS stacks. **[Read our September 2021 motivation note](/news/2021-09-05-prototype-ready/)** describing the rationale (adapted wording from the inaugural Jekyll era — the generator stack is Eleventy today).

Contributors to this experiment include **[Joseph Chazalon](https://github.com/jchazalon), [Pau Riba](https://github.com/priba),** and **[Muzzamil Luqman](https://github.com/mmluqman)**.

<strong>Interested in collaborating?</strong> Visit **[Feedback](/feedback/)** — issues, curated survey links, mailing list hints — or mention desired scope in a **[GitHub issue]({{ site.repo }}/issues)**.

## Scope

Artifacts fall into controlled kinds:

| Kind | Highlights |
|---|---|
| **Datasets** | Ground truth, manifests, mirrored downloads, integrity hashes (`md5` / optional `sha256`). |
| **Software & tooling** | Evaluation kits, preprocessing libraries, annotated-tooling front-ends (`/software/` summarizes navigation). |
| **Pre-trained models** | Canonical weights plus model-cards & provenance anchors. |
| **Competitions** | Challenges, leaderboard pointers, organisers, artefacts. |

The catalog **indexes** artefacts on Zenodo, Hugging Face Hub, institutional SFTP buckets, institutional Git servers, &c. — blobs **do not** live exclusively inside Pages output.

Standalone academic papers generally appear as **downloads** referencing an entry—not as lone catalog records.

## Curation lifecycle

1. Contributors either open **[pull requests]({{ site.repo }}/pulls)**, **[submissions guided in-browser](/submit/)**, curated **[Issues]({{ site.repo }}/issues/new/choose)** (datasets), or email **`{{ site.curators_email_human }}`** for heavy attachments.
2. Continuous integration asserts JSON Schema validity for Markdown front matter and ancillary cross-check scripts.
3. A TC curator reviews scope, taxonomy fit, mirror health, licences, duplication.
4. Link monitoring is **manual** / workflow dispatched by maintainers (not nightly automation today).

Further historical workflow commentary lives in the **[submission guide](/submit/guide/)**.

### Technology

The static site ships via **[Eleventy](https://www.11ty.dev/)**. Client-side search uses **[Pagefind](https://pagefind.app)** with a supplementary JSON **`/search-index.json`** powering fallback filtering on **Browse**.

Source hub: **`{{ site.repo }}`**.

## Acknowledgements

Thanks are due to organisers of longstanding TC11 infrastructures and dataset hosting communities—especially collaborators seeding IAPR artefacts on **[Zenodo’s IAPR-TC11 community collection](https://zenodo.org/communities/iapr-tc11)**.
