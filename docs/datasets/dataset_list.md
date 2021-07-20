# Dataset list

{{ render_order(title) }}

{%for pag_file in files._files %}
{% set pag = pag_file.page %}
{% if check_substring(pag, datasets) %}
{{ pag.title }}
{{ context(pag) | pretty }}
{{ pag | pretty }}
{{ pag.meta.tags }}
{%endif %}
{%endfor %}




