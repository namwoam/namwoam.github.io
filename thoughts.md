---
layout: default
title: Thoughts
permalink: /thoughts/
---

<h1>Thoughts</h1>

<div class="thought-list">
{% assign thoughts = site.data.thoughts | sort: "timestamp" | reverse %}
{% for thought in thoughts %}
  <div class="thought-item">
    <p class="thought-content">{{ thought.content }}</p>
    <p class="thought-meta">{{ thought.timestamp | date: "%b %-d, %Y · %H:%M UTC" }}</p>
  </div>
{% endfor %}
</div>

{% if site.data.thoughts.size == 0 %}
<p>No thoughts yet. Check back soon!</p>
{% endif %}
