---
layout: default
title: Blog
permalink: /blog/
---

# Blog

<div class="post-list">
{% for post in site.posts %}
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

{% if site.posts.size == 0 %}
<p>No posts yet. Check back soon!</p>
{% endif %}


{% assign published_total_characters = 0 %}
{% for post in site.posts %}
  {% unless post.draft %}
    {% assign post_chars = post.content | size %}
    {% assign published_total_characters = published_total_characters | plus: post_chars %}
  {% endunless %}
{% endfor %}

{% assign published_total_characters_str = published_total_characters | append: '' %}
{% assign published_total_characters_len = published_total_characters_str | size %}
{% assign published_total_characters_formatted = published_total_characters_str %}

{% if published_total_characters_len > 3 %}
  {% assign first_group_len = published_total_characters_len | modulo: 3 %}
  {% if first_group_len == 0 %}
    {% assign first_group_len = 3 %}
  {% endif %}

  {% assign published_total_characters_formatted = published_total_characters_str | slice: 0, first_group_len %}
  {% assign remaining_len = published_total_characters_len | minus: first_group_len %}
  {% assign groups = remaining_len | divided_by: 3 %}

  {% for group_index in (1..groups) %}
    {% assign offset = forloop.index0 | times: 3 %}
    {% assign start = first_group_len | plus: offset %}
    {% assign group = published_total_characters_str | slice: start, 3 %}
    {% assign published_total_characters_formatted = published_total_characters_formatted | append: ',' | append: group %}
  {% endfor %}
{% endif %}

竟然已經寫了 {{ published_total_characters_formatted }} 個字嗎？
