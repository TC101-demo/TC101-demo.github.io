---
title: "aaa dataset list"
---

# Dataset list

{{ render_order(page.meta.title) }}

{%for pag_file in files._files %}
{% set pag = pag_file.page %}
{% if check_substring(pag, datasets) %}
{{ pag.title }}
{{ context(pag) | pretty }}
{{ pag  }}
{{ pag.meta.tags }}
{%endif %}
{%endfor %}




