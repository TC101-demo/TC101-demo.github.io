---
title: "News"
layout: text
sitemap: false
permalink: /allnews.html
---

# News

{% assign news_sorted = site.news | sort "date" | reverse %}
{% for article in news_sorted %}
<p>
{{ article.date | date_to_string: "ordinal" }} —
<a href="{{ site.url }}{{ site.baseurl }}{{article.url}}">{{ article.title }}</a>
</p>

{% endfor %}
