---
layout: default
title: Drafts
permalink: /drafts/
---

# Drafts

<div class="post-list">
{% for post in site.posts %}
  {% if post.draft %}
  <div class="post-item">
    <h2>
      <a class="post-link" href="{{ post.url | relative_url }}">
        {{ post.title | escape }}
      </a>
    </h2>
    <p class="post-meta">{{ post.date | date: "%b %-d, %Y" }} <span class="draft-badge">[DRAFT]</span></p>
    {% if post.excerpt %}
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
    {% endif %}
    {% if post.tags %}
      <div class="post-tags">
        {% for tag in post.tags %}
          <span class="tag">{{ tag }}</span>
        {% endfor %}
      </div>
    {% endif %}
  </div>
  {% endif %}
{% endfor %}
</div>

{% assign draft_count = 0 %}
{% for post in site.posts %}
  {% if post.draft %}
    {% assign draft_count = draft_count | plus: 1 %}
  {% endif %}
{% endfor %}

{% if draft_count == 0 %}
<p>No drafts at the moment.</p>
{% endif %}

<style>
.draft-badge {
  color: #ff6b6b;
  font-weight: bold;
  font-size: 0.8em;
}
</style>
