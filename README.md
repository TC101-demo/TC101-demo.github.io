# IAPR TC10/TC11 Catalog

A community-curated index of **datasets**, **software**, and **competitions**
for the Document Image Analysis and Recognition (DIAR) community, maintained
by IAPR Technical Committees 10 and 11.

The site is a static [Eleventy](https://www.11ty.dev/) build deployed to
GitHub Pages.

## Two-tier modernization

This repository is the result of a two-tier modernization plan:

- **Tier 1** — strategic assessment of why this catalog should exist alongside
  Hugging Face Hub, the Papers with Code archive, and Zenodo. See
  [`docs/tier1-assessment.md`](docs/tier1-assessment.md).
- **Tier 2** — technical migration from a Jekyll prototype to an Eleventy
  site with schema-validated entries, faceted browse, a submission UI, and a
  nightly dead-link detector.

## Local development

Requirements: Node.js 20+.

```bash
npm install         # install dev dependencies
npm run validate    # schema-validate every entry
npm run build       # validate, build site, build pagefind index
npm run serve       # local dev server with live reload
```

## Repository layout

```
src/
  _data/                site config + controlled topic vocabulary
  _includes/            Nunjucks layouts and partials
  content/
    datasets/           one Markdown file per dataset entry
    software/           one Markdown file per software entry
    competitions/       one Markdown file per competition entry
  pages/                home, browse, submit, about, 404, feed
  assets/               CSS, JavaScript, images
schemas/                JSON Schemas for each entry kind
scripts/                build-time helpers (validate-entries.mjs)
docs/                   long-form documentation
.github/workflows/      CI: build, deploy, link-check
```

## Contributing an entry

Two paths:

1. **Use the [submission form](https://tc101-demo.github.io/submit/)**: it
   validates your input in the browser, generates a YAML+Markdown file, and
   offers a one-click GitHub PR.
2. **Open a PR by hand** with a new file under `src/content/<kind>/`. CI will
   schema-validate your entry against `schemas/<kind>.schema.json`.

A TC curator reviews entries for scope, taxonomy fit, and metadata quality
before merging.

## License

- **Site source code**: [MIT](https://opensource.org/license/mit).
- **Catalog metadata** (the YAML/Markdown entries under `src/content/`):
  released under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
- The artifacts indexed by the catalog retain their own upstream licenses,
  which are listed in each entry's metadata.
