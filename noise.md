---
layout: default
title: Noise
permalink: /noise/
---

# Noise

Make some noise every morning. [^1]

<style>
.noise-header { margin-bottom: 2rem; }
.noise-header p { color: #666; margin-top: 0.25rem; }

/* Calendar nav */
.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.calendar-nav button {
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0.3rem 0.9rem;
  cursor: pointer;
  font-size: 1rem;
  color: #424242;
  line-height: 1.4;
}
.calendar-nav button:hover { background: #f5f5f5; }
.calendar-month-label { font-size: 1.1rem; font-weight: 600; color: #424242; }

/* Grid */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 3rem;
}
.calendar-dow {
  text-align: center;
  font-size: 0.7rem;
  font-weight: 600;
  color: #aaa;
  padding: 0.4rem 0;
  text-transform: uppercase;
}
.calendar-cell {
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  cursor: default;
}
.calendar-cell.has-entry { cursor: pointer; }
.calendar-cell.has-entry:hover .cell-overlay { opacity: 1; }

.cell-inner {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  display: flex;
  align-items: flex-start;
  padding: 5px 6px;
  border-radius: 6px;
}
.cell-today .cell-inner {
  background: #f0f0f0;
  outline: 2px solid #424242;
  outline-offset: -2px;
}
.cell-date-num { font-size: 0.72rem; color: #bbb; }
.cell-today .cell-date-num { color: #424242; font-weight: 700; }

.cell-cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cell-cover-num {
  position: absolute;
  top: 4px;
  left: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  z-index: 2;
}
.cell-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.18);
  opacity: 0;
  transition: opacity 0.15s;
  z-index: 1;
}

/* Modal */
.noise-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}
.noise-modal-overlay[hidden] { display: none; }

.noise-modal {
  background: #fff;
  border-radius: 14px;
  max-width: 420px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.3);
}
.modal-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 0.6rem;
}
.modal-date-label {
  font-size: 0.78rem;
  color: #999;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.modal-close-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #bbb;
  line-height: 1;
  padding: 0;
  display: flex;
}
.modal-close-btn:hover { color: #111; }

.modal-embed { padding-bottom: 0.5rem; }
#spotify-embed-container iframe { display: block; margin: 0 1rem; width: calc(100% - 2rem) !important; }

.modal-quote {
  padding: 0.75rem 1.2rem 1.25rem;
  font-style: italic;
  color: #555;
  font-size: 0.92rem;
  line-height: 1.6;
  border-top: 1px solid #f0f0f0;
}
.modal-quote::before { content: '\201C'; }
.modal-quote::after  { content: '\201D'; }
</style>

<script src="https://open.spotify.com/embed/iframe-api/v1" async></script>

<div class="calendar-nav">
  <button id="prev-month">&#8592;</button>
  <span class="calendar-month-label" id="month-label"></span>
  <button id="next-month">&#8594;</button>
</div>
<div id="noise-calendar" class="calendar-grid"></div>

<div id="noise-modal" class="noise-modal-overlay" hidden>
  <div class="noise-modal">
    <div class="modal-top-row">
      <span class="modal-date-label" id="modal-date"></span>
      <button class="modal-close-btn" id="modal-close" aria-label="Close">&times;</button>
    </div>
    <div class="modal-embed" id="spotify-embed-container"></div>
    <div class="modal-quote" id="modal-quote"></div>
  </div>
</div>

<script>
(function () {
  var ENTRIES = {{ site.data.noise | jsonify }};
  var byDate = {};
  ENTRIES.forEach(function (e) { byDate[e.date] = e; });

  var DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  var MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

  var today     = new Date();
  var viewYear  = today.getFullYear();
  var viewMonth = today.getMonth();

  var embedController = null;
  var pendingUri      = null;

  /* Convert Spotify URL → URI  (https://open.spotify.com/track/ID → spotify:track:ID) */
  function toUri(url) {
    var clean = url.split('?')[0];
    var m = clean.match(/open\.spotify\.com\/([^/]+)\/([^/\s]+)/);
    return m ? 'spotify:' + m[1] + ':' + m[2] : url;
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  /* ── Calendar ── */
  function renderCalendar() {
    document.getElementById('month-label').textContent =
      MONTHS[viewMonth] + ' ' + viewYear;

    var grid = document.getElementById('noise-calendar');
    grid.innerHTML = '';

    DAYS.forEach(function (d) {
      var el = document.createElement('div');
      el.className = 'calendar-dow';
      el.textContent = d;
      grid.appendChild(el);
    });

    var firstDow    = new Date(viewYear, viewMonth, 1).getDay();
    var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    var todayStr    = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());

    for (var i = 0; i < firstDow; i++) {
      grid.appendChild(document.createElement('div'));
    }

    for (var d = 1; d <= daysInMonth; d++) {
      var dateStr = viewYear + '-' + pad(viewMonth + 1) + '-' + pad(d);
      var entry   = byDate[dateStr];
      var isToday = dateStr === todayStr;

      var cell = document.createElement('div');
      cell.className = 'calendar-cell'
        + (entry   ? ' has-entry'  : '')
        + (isToday ? ' cell-today' : '');

      if (entry) {
        var img = document.createElement('img');
        img.className   = 'cell-cover';
        img.src         = entry.cover;
        img.alt         = dateStr;
        img.loading     = 'lazy';
        cell.appendChild(img);

        var num = document.createElement('span');
        num.className   = 'cell-cover-num';
        num.textContent = d;
        cell.appendChild(num);

        var ov = document.createElement('div');
        ov.className = 'cell-overlay';
        cell.appendChild(ov);

        (function (e) {
          cell.addEventListener('click', function () { openModal(e); });
        }(entry));
      } else {
        var inner = document.createElement('div');
        inner.className = 'cell-inner';
        var numEl = document.createElement('span');
        numEl.className   = 'cell-date-num';
        numEl.textContent = d;
        inner.appendChild(numEl);
        cell.appendChild(inner);
      }

      grid.appendChild(cell);
    }
  }

  /* ── Spotify iFrame API ── */
  window.onSpotifyIframeApiReady = function (IFrameAPI) {
    IFrameAPI.createController(
      document.getElementById('spotify-embed-container'),
      { width: '100%', height: '152' },
      function (controller) {
        embedController = controller;
        if (pendingUri) {
          controller.loadUri(pendingUri);
          pendingUri = null;
        }
      }
    );
  };

  /* ── Modal ── */
  function openModal(entry) {
    var uri = toUri(entry.spotify);
    if (embedController) {
      embedController.loadUri(uri);
    } else {
      pendingUri = uri;
    }

    var d = new Date(entry.date + 'T00:00:00');
    document.getElementById('modal-date').textContent =
      MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    document.getElementById('modal-quote').textContent = entry.quote;
    document.getElementById('noise-modal').removeAttribute('hidden');
  }

  function closeModal() {
    if (embedController) { embedController.togglePlay(); }
    document.getElementById('noise-modal').setAttribute('hidden', '');
  }

  document.getElementById('prev-month').addEventListener('click', function () {
    if (--viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendar();
  });
  document.getElementById('next-month').addEventListener('click', function () {
    if (++viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendar();
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('noise-modal').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  renderCalendar();
}());
</script>

[^1]: Yixuan Wang, Xianzhen Luo, Fuxuan Wei, Yijun Liu, Qingfu Zhu, Xuanyu Zhang, Qing Yang, Dongliang Xu, and Wanxiang Che. 2024. Make Some Noise: Unlocking Language Model Parallel Inference Capability through Noisy Training. In Proceedings of the 2024 Conference on Empirical Methods in Natural Language Processing, pages 12914–12926, Miami, Florida, USA. Association for Computational Linguistics.