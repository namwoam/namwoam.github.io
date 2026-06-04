---
layout: default
title: Mini Projects
permalink: /mini-project/
---

# Mini Projects

Small experiments and interactive things.

{% assign mini_projects = site.pages | where: "mini_project", true | sort: "project_order" %}
<div class="mini-project-list">
{% for project in mini_projects %}
  <a class="mini-project-card" href="{{ project.url | relative_url }}">
    {% if project.preview == "pulsar" %}
    <div class="pulsar-preview" aria-hidden="true">
      <span class="pulsar-preview-stars"></span>
      <span class="pulsar-preview-beam"></span>
      <span class="pulsar-preview-ring pulsar-preview-ring-one"></span>
      <span class="pulsar-preview-ring pulsar-preview-ring-two"></span>
      <span class="pulsar-preview-star"></span>
    </div>
    {% elsif project.preview == "archer-world" %}
    <div class="archer-world-preview" aria-hidden="true">
      <span class="archer-world-preview-marble"></span>
    </div>
    {% endif %}
    <h2>{{ project.title | escape }}</h2>
    <p>{{ project.description | escape }}</p>
  </a>
{% endfor %}
</div>

{% if mini_projects.size == 0 %}
<p>No mini projects yet.</p>
{% endif %}

<script>
(() => {
  const beam = document.querySelector('.pulsar-preview-beam');
  if (!beam || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const startedAt = performance.now();
  const quantize = angle => Math.round(angle / 4) * 4;

  setInterval(() => {
    const cycle = ((performance.now() - startedAt) / 192000) * Math.PI * 2;
    const x = quantize(Math.sin(cycle * 1.7 + 0.8) * 46);
    const y = quantize((cycle * 180 / Math.PI) + Math.sin(cycle * 1.3) * 28);
    const z = quantize(Math.sin(cycle * 0.9 - 0.5) * 74);
    beam.style.transform = `rotateZ(${z}deg) rotateY(${y}deg) rotateX(${x}deg)`;
  }, 1000 / 6);
})();
</script>
