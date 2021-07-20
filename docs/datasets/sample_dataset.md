---
title: Test sample dataset
tag: dataset_file
---

# Sample dataset
Do we want datasets here?

## List of datasets

{%for pag_file in files._files %}
{% set pag = pag_file.page %}
{% if check_substring(pag, datasets) %}
{{ pag.title }}
{{ pag.meta.tags }}
{%endif %}
{%endfor %}



