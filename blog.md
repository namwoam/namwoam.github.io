---
layout: default
title: Blog
permalink: /blog/
pagination:
  enabled: true
  collection: posts
---

<h1>Blog</h1>

<div class="post-list">
{% assign posts = paginator.posts | default: site.posts %}
{% for post in posts %}
  {% unless post.draft %}
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
  {% endunless %}
{% endfor %}
</div>

{% if posts.size == 0 %}
<p>No posts yet. Check back soon!</p>
{% endif %}


{% if paginator and paginator.total_pages > 1 %}
<nav class="pagination" aria-label="Blog pages">
  {% if paginator.previous_page %}
    <a class="pagination-link pagination-prev" href="{{ paginator.previous_page_path | relative_url }}">&larr; Newer posts</a>
  {% else %}
    <span class="pagination-link pagination-prev is-disabled">&larr; Newer posts</span>
  {% endif %}

  <span class="pagination-current">Page {{ paginator.page }} of {{ paginator.total_pages }}</span>

  {% if paginator.next_page %}
    <a class="pagination-link pagination-next" href="{{ paginator.next_page_path | relative_url }}">Older posts &rarr;</a>
  {% else %}
    <span class="pagination-link pagination-next is-disabled">Older posts &rarr;</span>
  {% endif %}
</nav>
{% endif %}