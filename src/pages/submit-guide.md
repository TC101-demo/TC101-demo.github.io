---
layout: layouts/page.njk
permalink: /submit/guide/
title: Submission guide (how to contribute entries)
description: Hosting on Zenodo, pull requests vs issues vs email — options for contributing to the IAPR TC10/TC11 catalog.
eleventyExcludeFromCollections: true
---

> **Prefer the interactive workflow?**
> Start at the **[Submit an entry](/submit/)** page — it generates schema-valid Markdown and can open a pull request.

## Scope

Today the catalog welcomes **datasets**, **software or tools**, **pre-trained models**, and **competitions**. You do **not** need to be an author of the artifact you suggest; additions that help the community discover useful resources are appreciated.

Edit small mistakes (typos, broken links) directly on GitHub with the pencil icon on Markdown source files when available, or open an **[issue]({{ site.repo }}/issues/new/choose)** for anything unsure.

### Dataset hosting on Zenodo

We **do not** host dataset blobs in this GitHub Pages repository — use archival hosting with versioning and checksums instead. **[Zenodo](https://zenodo.org)** is strongly recommended for free long-term archival, versioning, mirroring integrations, DOIs and large uploads. Deposit into the **[IAPR Technical Committee 11 community](https://zenodo.org/communities/iapr-tc11)** when publishing so curators can find related objects easily.

<p class="muted">
<a class="btn btn--primary" href="https://zenodo.org/deposit/new?c=iapr-tc11" rel="noopener noreferrer external">New upload to Zenodo (IAPR-TC11 community)</a>
</p>

## Three ways to submit

### 1. Pull request (**fastest**, needs Git/GitHub familiarity)

1. Fork [`{{ site.repo }}`]({{ site.repo }}).
2. Add your entry as **`src/content/{datasets|software|models|competitions}/your-slug.md`** with YAML front matter that matches **`schemas/`** (`dataset.schema.json`, `software.schema.json`, &hellip;).
3. Optionally add thumbnails under **`images/`** — match the **`thumbnail`** path in front matter so it resolves from the site root.
4. Open a PR against **`{{ site.default_branch }}`**.

Starter template (**Markdown download**):

<p class="muted">
<a href="/submission_templates/new_dataset.md.tpl"><code>/submission_templates/new_dataset.md.tpl</code></a>
</p>

Or use **`[Submit](/submit/)`** — it emits the correct layout and validates against schemas in the browser.

### 2. GitHub issue (fast, curated merge)

Templates include **New dataset**. Attach the thumbnail somewhere the curators can fetch it (Zenodo supplementary file or a temporary link clearly labeled).

<div class="muted">
<p><a class="btn" href="{{ site.repo }}/issues/new?assignees=&labels=new,dataset,triage&template=new_dataset_submission.yml&title=%5BNew+dataset%5D%3A+" rel="noopener noreferrer external">Open new-dataset submission issue</a></p>
<p class="small">Opens the YAML issue template; adjust labels/templates if needed.</p>
</div>

### 3. Email curators (**simple**, slower turnaround)

Email **`{{ site.curators_email_human }}`** with subject line like `New dataset submission {dataset name}`, attaching:

1. Completed Markdown (**UTF-8**) for the entry (`myDataset_1.md`).
2. A representative thumbnail image.

Expect up to roughly a week depending on curator availability.

<ul class="muted small">
<li>See also <strong><a href="{{ '/feedback/' | url }}">Feedback</a></strong> for survey and general routing.</li>
</ul>
