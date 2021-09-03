---
title: "News"
layout: text
sitemap: false
permalink: /allnews.html
---

# News

{% for article in site.news %}
<p>{{ article.date }} <br>
<em><a href="{{ site.url }}{{ site.baseurl }}{{article.url}}">{{ article.title }}</a></em></p>
{% endfor %}
