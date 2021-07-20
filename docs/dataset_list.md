# Dataset list

{{ render_order(title) }}

{%for pag_file in files._files %}
{% set pag = pag_file.page %}
{{ pag.title }}
{{ context(pag) | pretty }}
{{ pag  }}
{%endfor %}




