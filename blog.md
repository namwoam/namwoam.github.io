---
layout: default
title: Blog
permalink: /blog/
---

# Blog

Welcome to my blog! Here you'll find articles about programming, web development, and technology.

<div class="post-list">
{% for post in site.posts %}
  <div class="post-item">
    <h2>
      <a class="post-link" href="{{ post.url | relative_url }}">
        {{ post.title | escape }}
      </a>
    </h2>
    <p class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</p>
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
{% endfor %}
</div>

{% if site.posts.size == 0 %}
<p>No posts yet. Check back soon!</p>
{% endif %}
