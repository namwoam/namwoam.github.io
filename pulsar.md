---
layout: default
title: Pulsar
permalink: /pulsar/
---

# Pulsar
<style>
/* ── Shared ────────────────────────────────────────────── */
.p-btn {
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0.35rem 1rem;
  cursor: pointer;
  font-size: 0.95rem;
  color: #424242;
  font-family: inherit;
  line-height: 1.5;
  transition: background 0.12s;
}
.p-btn:hover:not(:disabled) { background: #f5f5f5; }
.p-btn-primary { border-color: #424242; }
.p-btn:disabled { opacity: 0.4; cursor: default; }

.p-starname {
  font-family: 'Courier New', monospace;
  font-weight: 700;
  color: #424242;
  letter-spacing: 0.04em;
}
.p-meta { font-size: 0.8rem; color: #828282; margin: 0; }
.p-model-license {
  font-size: 0.72rem;
  color: #aaa;
  line-height: 1.5;
  max-width: 34rem;
}
.p-model-license a { color: #828282; }

.p-progress-label { font-size: 0.78rem; color: #828282; margin-bottom: 0.3rem; }
.p-progress-bar { height: 2px; max-width: 260px; background: #e8e8e8; border-radius: 2px; }
.p-progress-fill { height: 100%; background: #424242; border-radius: 2px; transition: width 0.25s; width: 0%; }
@keyframes scan {
  0%   { width: 0%;  margin-left: 0;    }
  50%  { width: 55%; }
  100% { width: 0%;  margin-left: 100%; }
}
.p-progress-fill.scanning { animation: scan 1.6s ease-in-out infinite; }

.p-error { font-size: 0.82rem; color: #d32f2f; margin-top: 0.4rem; }

/* ── Screens ───────────────────────────────────────────── */
.p-screen[hidden] { display: none; }
#screen-lost[hidden] { display: none; }
#screen-prepare[hidden] { display: none; }

/* Idle */
#screen-idle { padding: 2.5rem 0; }
.p-idle-inner { display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem; }
.p-model-hint { font-size: 0.75rem; color: #bbb; font-family: 'Courier New', monospace; margin-top: 0.25rem; }

/* Prepare */
#screen-prepare { padding: 2rem 0; display: flex; flex-direction: column; gap: 0.5rem; }

/* Chat */
#screen-chat { padding: 0; }
.p-chat-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 0.6rem;
  margin-bottom: 1.25rem;
  border-bottom: 1px solid #e8e8e8;
}
.p-chat-header .p-starname { font-size: 1rem; }
.p-signals { font-size: 0.72rem; color: #828282; font-family: 'Courier New', monospace; }
.p-signals.low-power { color: #d32f2f; }

/* Messages */
.p-msg { margin-bottom: 1.4rem; }
.p-msg-label {
  font-size: 0.7rem; color: #828282;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.04em;
  margin-bottom: 0.2rem;
}
.p-msg.user .p-msg-body {
  border-left: 3px solid #e8e8e8;
  padding-left: 0.85rem;
  color: #555;
  line-height: 1.65;
}
.p-msg-pending {
  padding-left: 0.85rem;
  color: #aaa;
  font-size: 0.8rem;
}
.p-msg-actions { margin-top: 0.3rem; padding-left: 0.85rem; }
.p-replay-btn {
  background: none; border: none; color: #bbb;
  cursor: pointer; font-size: 0.75rem; font-family: inherit; padding: 0;
  transition: color 0.12s;
}
.p-replay-btn:hover { color: #424242; }

@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
.p-typing::after { content: '▋'; animation: blink 1s step-end infinite; color: #aaa; }

/* Input area */
.p-input-area {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e8e8e8;
}
.p-input-tabs { display: flex; gap: 1.2rem; margin-bottom: 0.8rem; }
.p-tab {
  background: none; border: none; color: #828282; cursor: pointer;
  font-size: 0.8rem; font-family: inherit; padding: 0 0 3px;
  border-bottom: 2px solid transparent;
  transition: color 0.12s, border-color 0.12s;
}
.p-tab.active { color: #333; border-bottom-color: #424242; }
.p-tab:hover:not(.active) { color: #555; }
.p-tab-content[hidden] { display: none; }

.p-textarea {
  width: 100%; border: 1px solid #e0e0e0; background: #fff;
  font-family: inherit; font-size: 0.9rem; color: #333;
  padding: 0.5rem 0.75rem; border-radius: 4px; resize: vertical; line-height: 1.6;
}
.p-textarea:focus { outline: none; border-color: #aaa; }

.p-img-drop {
  border: 1px dashed #e0e0e0; border-radius: 4px;
  padding: 1.5rem; text-align: center; font-size: 0.85rem; color: #828282;
  cursor: pointer; transition: border-color 0.15s, background 0.15s;
}
.p-img-drop:hover, .p-img-drop.drag-over { border-color: #424242; background: #fafafa; }
.p-img-drop.has-image { padding: 0.5rem; border-style: solid; }
#img-canvas { max-width: 100%; max-height: 180px; border-radius: 3px; display: block; margin: 0 auto; }
#img-canvas[hidden] { display: none; }

.p-audio-area { display: flex; flex-direction: column; gap: 0.6rem; }
.p-waveform { font-family: 'Courier New', monospace; font-size: 0.68rem; color: #aaa; min-height: 1rem; }

.p-input-footer { display: flex; justify-content: flex-end; margin-top: 0.75rem; }

/* Connection lost */
#screen-lost { padding: 1.5rem 0; border-top: 1px solid #e8e8e8; margin-top: 0.5rem; }
.p-lost-title { font-size: 1rem; font-weight: 600; color: #d32f2f; margin: 0 0 0.2rem; }
.p-lost-sub { font-size: 0.85rem; color: #828282; margin: 0 0 0.4rem; }
.p-lost-star { font-family: 'Courier New', monospace; font-size: 0.72rem; color: #bbb; margin: 0 0 1rem; }
</style>

<script src="https://cdn.jsdelivr.net/npm/tone@15.1.22/build/Tone.js"></script>

<div id="screen-idle" class="p-screen">
  <div class="p-idle-inner">
    <button id="btn-connect" class="p-btn p-btn-primary">Talk to a Pulsar</button>
    <span id="model-hint" class="p-model-hint">preparing…</span>
    <div class="p-model-license">
      Local model based on
      <a href="https://huggingface.co/litert-community/gemma-3-270m-it">litert-community/gemma-3-270m-it</a>,
      subject to the
      <a href="https://ai.google.dev/gemma/terms">Gemma Terms of Use</a>
      and
      <a href="https://ai.google.dev/gemma/prohibited_use_policy">Gemma Prohibited Use Policy</a>.
      <a href="{{ '/_model/NOTICE.txt' | relative_url }}">Notice</a>.
    </div>
  </div>
</div>

<div id="screen-prepare" class="p-screen" hidden>
  <div style="display:flex;align-items:baseline;gap:0.6rem">
    <span class="p-starname" id="p-starname" style="font-size:1.15rem"></span>
    <span class="p-meta" id="p-distance"></span>
  </div>
  <div id="model-load-progress" style="margin-top:0.75rem">
    <div class="p-progress-label" id="progress-label">loading model…</div>
    <div class="p-progress-bar"><div id="progress-fill" class="p-progress-fill scanning"></div></div>
  </div>
  <div id="no-webgpu-msg" class="p-error" hidden>
    WebGPU not available — try Chrome 113+ or Edge 113+ on a capable device.
  </div>
</div>

<div id="screen-chat" class="p-screen" hidden>
  <div class="p-chat-header">
    <span style="display:flex;align-items:baseline;gap:0.6rem">
      <span class="p-starname" id="chat-starname-label"></span>
      <span class="p-meta" id="chat-distance-label"></span>
    </span>
    <span class="p-signals" id="chat-signals"></span>
  </div>
  <div id="msg-list"></div>
  <div id="session-end" hidden style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid #e8e8e8">
    <p class="p-meta" style="margin-bottom:0.75rem">signal lost — beam has rotated away</p>
    <div style="display:flex;justify-content:flex-end">
      <button id="btn-abort" class="p-btn p-btn-primary">Abort</button>
    </div>
  </div>
  <div id="input-area" class="p-input-area">
    <div class="p-input-tabs">
      <button class="p-tab active" data-tab="text">Text</button>
      <button class="p-tab" data-tab="image">Image</button>
      <button class="p-tab" data-tab="audio">Audio</button>
    </div>
    <div id="tab-text" class="p-tab-content">
      <textarea id="msg-input" class="p-textarea" placeholder="Enter message…" rows="3" maxlength="500"></textarea>
    </div>
    <div id="tab-image" class="p-tab-content" hidden>
      <div id="img-drop" class="p-img-drop">
        <span id="img-drop-label">Drop image or <label for="img-file-input" style="cursor:pointer;color:#2a7ae2">select file</label></span>
        <canvas id="img-canvas" hidden></canvas>
        <input type="file" id="img-file-input" accept="image/*" style="display:none">
      </div>
    </div>
    <div id="tab-audio" class="p-tab-content" hidden>
      <div class="p-audio-area">
        <button id="btn-record" class="p-btn">⬤ Record (5s)</button>
        <div id="waveform-display" class="p-waveform"></div>
      </div>
    </div>
    <div class="p-input-footer">
      <button id="btn-send" class="p-btn p-btn-primary" disabled>Transmit →</button>
    </div>
  </div>
</div>

<div id="screen-lost" class="p-screen" hidden>
  <p class="p-lost-title">Connection Lost</p>
  <p class="p-lost-sub">Signal degraded beyond recovery.</p>
  <p class="p-lost-star" id="lost-starname"></p>
  <button id="btn-reset" class="p-btn p-btn-primary">Tune to another pulsar</button>
</div>

<script type="module">

import { FilesetResolver, LlmInference }
  from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@0.10.22/genai_bundle.mjs';

const MEDIAPIPE_WASM = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@0.10.22/wasm';
const MODEL_BASE     = '{{ "/_model" | relative_url }}';
const MODEL_CACHE    = 'pulsar-model-v1';
const ASSEMBLED_KEY  = `${MODEL_BASE}/assembled`;

// ── Utilities ────────────────────────────────────────────
function djb2(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (Math.imul(h, 33) ^ str.charCodeAt(i)) >>> 0;
  return h;
}
function makeLcg(seed) {
  let s = seed >>> 0;
  return () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 0x100000000; };
}

// ── Star name ────────────────────────────────────────────
const PREFIXES = [
  'Pleiades','Hyades','Praesepe','Coma','AlphaPersei',
  'DoubleCluster','OmegaCentauri','Hercules','Beehive','WildDuck',
  'JewelBox','Butterfly','Lagoon','Trapezium','Quintuplet',
  'Arches','Westerlund','M35','M47','M67',
];
const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
const HEX   = '0123456789abcdef';

function genStarName() {
  const r = Math.random.bind(Math);
  const prefix = PREFIXES[Math.floor(r() * PREFIXES.length)];
  const digit  = Math.floor(r() * 9) + 1;
  const l1     = ALPHA[Math.floor(r() * 26)];
  const l2     = ALPHA[Math.floor(r() * 26)];
  const hex    = Array.from({length: 4}, () => HEX[Math.floor(r() * 16)]).join('');
  return `${prefix}-${digit}${l1}${l2}#${hex}`;
}
function genDistance(name) {
  return ((djb2(name) % 8000) + 500).toLocaleString();
}

// ── Corruption ───────────────────────────────────────────
const GLYPHS = '░▒▓█▄▀◌◦●■□▪';

function corruptText(text, starName) {
  const rng = makeLcg(djb2(starName));
  let pre = '';
  for (let i = 0, n = djb2(starName) % 7; i < n; i++)
    pre += GLYPHS[Math.floor(rng() * GLYPHS.length)];
  const body = text.split('').flatMap(c => {
    const r = rng();
    if (r < 0.10) return [GLYPHS[Math.floor(rng() * GLYPHS.length)]];
    return [c];
  }).join('');
  return pre + body;
}

function applyCanvasCorruption(canvas, starName) {
  const ctx = canvas.getContext('2d');
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = img.data, W = canvas.width;
  const rng = makeLcg(djb2(starName));
  for (let y = 0; y < canvas.height; y++) {
    if (rng() < 0.12) {
      const sh = Math.floor(rng() * 18) + 4;
      for (let x = W - 1; x >= sh; x--) {
        const s = (y * W + x - sh) * 4, t = (y * W + x) * 4;
        d[t] = d[s]; d[t+1] = d[s+1]; d[t+2] = d[s+2];
      }
    }
    if (rng() < 0.04) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        d[i]   = Math.min(255, d[i]   + Math.floor(rng() * 120));
        d[i+1] = Math.max(0,   d[i+1] - Math.floor(rng() * 80));
      }
    }
  }
  ctx.putImageData(img, 0, 0);
}

function dominantHex(canvas) {
  const t = Object.assign(document.createElement('canvas'), {width:8,height:8});
  t.getContext('2d').drawImage(canvas, 0, 0, 8, 8);
  const d = t.getContext('2d').getImageData(0,0,8,8).data;
  let r=0,g=0,b=0,n=d.length/4;
  for (let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2];}
  return ((Math.round(r/n)<<16)|(Math.round(g/n)<<8)|Math.round(b/n)).toString(16).padStart(6,'0');
}
function ampToWave(amps) {
  const b='▁▂▃▄▅▆▇█';
  return amps.map(v=>b[Math.min(7,Math.floor(v*8))]).join('');
}

function buildPrompt(corrupted, name, dist, idx) {
  const left = 2 - idx;
  return `You are pulsar ${name}, a rotating neutron star ${dist} light-years away. ` +
    `A signal reached you, partially degraded crossing ${dist} light-years of interstellar medium:\n\n` +
    `"${corrupted}"\n\n` +
    `Respond briefly (2–3 sentences) as this ancient cosmic entity — curious, poetic, slightly alien. ` +
    (left === 0 ? `This is the final transmission; your beam rotates away. Say something final.`
                : `${left} transmission${left>1?'s':''} remain before your beam rotates away.`);
}

// ── Music (Tone.js global) ───────────────────────────────
const SCALES = [[0,2,4,7,9],[0,2,3,7,10],[0,2,4,5,7,9],[0,2,3,5,7,9,10]];

let activeAudio = null;

function stopActiveAudio() {
  if (!activeAudio) return;
  clearTimeout(activeAudio.timerId);
  try { activeAudio.synth.dispose(); } catch(_) {}
  (activeAudio.nodes || [activeAudio.delay, activeAudio.reverb]).forEach(n => {
    try { if (n) n.dispose(); } catch(_) {}
  });
  (activeAudio.extras || []).forEach(e => { try { e.dispose(); } catch(_) {} });
  activeAudio = null;
  setReplayButtonsDisabled(false);
}

function setReplayButtonsDisabled(disabled) {
  document.querySelectorAll('.p-replay-btn').forEach(b => { b.disabled = disabled; });
}

async function synthesize(text, starName) {
  if (typeof Tone === 'undefined') return;
  stopActiveAudio();
  await Tone.start();

  const seed  = djb2(starName);
  const rng   = makeLcg(seed);
  const scale = SCALES[seed % 4];
  const root  = 48 + (seed % 24);
  Tone.Transport.bpm.value = 60 + (seed % 61);

  const mkReverb = async (decay, wet) => {
    const r = new Tone.Reverb({ decay, wet });
    r.toDestination();
    await r.ready;
    return r;
  };

  const connectTo = (synth, nodes) => {
    synth.connect(nodes[0]);
    return { synth, nodes };
  };

  const patches = [
    async () => {
      const reverb = await mkReverb(2 + rng() * 4, 0.6);
      const delay = new Tone.FeedbackDelay({ delayTime: 0.2 + rng() * 0.3, feedback: 0.3, wet: 0.35 });
      delay.connect(reverb);
      return connectTo(new Tone.Synth({
        oscillator: { type: rng() < 0.5 ? 'sine' : 'triangle' },
        envelope: { attack: 0.04, decay: 0.3, sustain: 0.2, release: 1.2 },
      }), [delay, reverb]);
    },
    async () => {
      const reverb = await mkReverb(2.5, 0.45);
      const chorus = new Tone.Chorus({ frequency: 3, delayTime: 3, depth: 0.5, wet: 0.5 }).start();
      chorus.connect(reverb);
      return connectTo(new Tone.AMSynth({
        harmonicity: 1.5 + rng() * 3,
        oscillator: { type: 'sine' },
        modulation: { type: 'triangle' },
        envelope: { attack: 0.05, decay: 0.4, sustain: 0.3, release: 1.5 },
        modulationEnvelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 0.5 },
      }), [chorus, reverb]);
    },
    async () => {
      const reverb = await mkReverb(3, 0.5);
      const phaser = new Tone.Phaser({ frequency: 0.4 + rng() * 0.8, octaves: 3, baseFrequency: 300 + rng() * 200 });
      phaser.connect(reverb);
      return connectTo(new Tone.FMSynth({
        harmonicity: 2 + rng() * 5,
        modulationIndex: 3 + rng() * 8,
        oscillator: { type: 'sine' },
        modulation: { type: 'triangle' },
        envelope: { attack: 0.03, decay: 0.3, sustain: 0.2, release: 1.0 },
        modulationEnvelope: { attack: 0.05, decay: 0.3, sustain: 0.3, release: 0.5 },
      }), [phaser, reverb]);
    },
    async () => {
      const reverb = await mkReverb(4, 0.55);
      const delay = new Tone.FeedbackDelay({ delayTime: 0.25, feedback: 0.2, wet: 0.2 });
      delay.connect(reverb);
      return connectTo(new Tone.PluckSynth({
        attackNoise: 1 + rng() * 3,
        dampening: 2000 + rng() * 3000,
        resonance: 0.8 + rng() * 0.18,
      }), [delay, reverb]);
    },
    async () => {
      const reverb = await mkReverb(3 + rng() * 3, 0.55);
      const delay = new Tone.FeedbackDelay({ delayTime: 0.15 + rng() * 0.35, feedback: 0.35, wet: 0.3 });
      delay.connect(reverb);
      return connectTo(new Tone.MonoSynth({
        oscillator: { type: ['sawtooth','square','triangle'][Math.floor(rng() * 3)] },
        filter: { Q: 2, type: 'lowpass' },
        envelope: { attack: 0.02, decay: 0.15, sustain: 0.3, release: 0.8 },
        filterEnvelope: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 0.5, baseFrequency: 200, octaves: 3 },
      }), [delay, reverb]);
    },
    async () => {
      const reverb = await mkReverb(3.5, 0.45);
      const widener = new Tone.StereoWidener(0.7);
      widener.connect(reverb);
      return connectTo(new Tone.DuoSynth({
        vibratoAmount: 0.25 + rng() * 0.35,
        vibratoRate: 1.5 + rng() * 3,
        harmonicity: 0.5 + rng() * 1.5,
        voice0: { oscillator: { type: 'sine' } },
        voice1: { oscillator: { type: 'triangle' } },
      }), [widener, reverb]);
    },
    async () => {
      const reverb = await mkReverb(2, 0.35);
      const distortion = new Tone.Distortion({ distortion: 0.15 + rng() * 0.25, wet: 0.25 });
      distortion.connect(reverb);
      return connectTo(new Tone.MembraneSynth({
        pitchDecay: 0.02 + rng() * 0.06,
        octaves: 5 + rng() * 4,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.001, decay: 0.35, sustain: 0.01, release: 1.1 },
      }), [distortion, reverb]);
    },
    async () => {
      const reverb = await mkReverb(3, 0.5);
      const tremolo = new Tone.Tremolo({ frequency: 4 + rng() * 5, depth: 0.35 + rng() * 0.4, wet: 0.5 }).start();
      tremolo.connect(reverb);
      return connectTo(new Tone.MetalSynth({
        harmonicity: 3 + rng() * 4,
        modulationIndex: 16 + rng() * 24,
        resonance: 2500 + rng() * 2500,
        octaves: 1.5 + rng() * 2,
        envelope: { attack: 0.001, decay: 0.8, release: 0.3 },
      }), [tremolo, reverb]);
    },
    async () => {
      const reverb = await mkReverb(4, 0.4);
      const filter = new Tone.AutoFilter({ frequency: 0.8 + rng() * 1.4, depth: 0.7, wet: 0.6 }).start();
      filter.connect(reverb);
      return connectTo(new Tone.NoiseSynth({
        noise: { type: rng() < 0.5 ? 'pink' : 'brown' },
        envelope: { attack: 0.02, decay: 0.3, sustain: 0.1, release: 0.8 },
      }), [filter, reverb]);
    },
    async () => {
      const reverb = await mkReverb(2.8, 0.38);
      const ping = new Tone.PingPongDelay({ delayTime: '8n', feedback: 0.22, wet: 0.25 });
      ping.connect(reverb);
      return connectTo(new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'fatsawtooth' },
        envelope: { attack: 0.03, decay: 0.2, sustain: 0.25, release: 0.7 },
      }), [ping, reverb]);
    },
  ];

  const patch = await patches[seed % patches.length]();
  const { synth, nodes } = patch;
  const isNoise = synth instanceof Tone.NoiseSynth;

  const words = text.split(/\s+/).filter(Boolean).slice(0, 32);
  let t = Tone.now() + 0.15;
  for (const w of words) {
    const note = Tone.Frequency(root + scale[djb2(w) % scale.length], 'midi').toNote();
    const dur  = rng() < 0.5 ? '8n' : '4n';
    if (isNoise) synth.triggerAttackRelease(dur, t);
    else synth.triggerAttackRelease(note, dur, t);
    t += Tone.Time(dur).toSeconds() + rng() * 0.06;
  }

  setReplayButtonsDisabled(true);
  const timerId = setTimeout(() => {
    try { synth.dispose(); } catch(_) {}
    nodes.forEach(n => { try { n.dispose(); } catch(_) {} });
    activeAudio = null;
    setReplayButtonsDisabled(false);
  }, (t - Tone.now() + 3.5) * 1000);

  activeAudio = { synth, nodes, timerId };
}

async function synthesizeUser(text, starName) {
  if (typeof Tone === 'undefined') return;
  stopActiveAudio();
  await Tone.start();

  // Same seed/scale/note algorithm as synthesize — only the timbre differs
  const seed  = djb2(starName);
  const rng   = makeLcg(seed);
  const scale = SCALES[seed % 4];
  const root  = 48 + (seed % 24);
  Tone.Transport.bpm.value = 60 + (seed % 61);

  // Electronic chain: FM → bit crusher → auto-filter → dry reverb
  const reverb = new Tone.Reverb({ decay: 0.5, wet: 0.15 });
  reverb.toDestination();
  await reverb.ready;
  const autoFilter = new Tone.AutoFilter({ frequency: 2, depth: 0.6, wet: 0.5 }).start();
  autoFilter.connect(reverb);
  const crusher = new Tone.BitCrusher(5);
  crusher.connect(autoFilter);
  const synth = new Tone.FMSynth({
    harmonicity: 3.5,
    modulationIndex: 8,
    oscillator: { type: 'square' },
    envelope: { attack: 0.001, decay: 0.08, sustain: 0.04, release: 0.15 },
    modulation: { type: 'square' },
    modulationEnvelope: { attack: 0.002, decay: 0.15, sustain: 0.05, release: 0.1 },
  });
  synth.connect(crusher);

  const words = text.split(/\s+/).filter(Boolean).slice(0, 32);
  let t = Tone.now() + 0.15;
  for (const w of words) {
    const note = Tone.Frequency(root + scale[djb2(w) % scale.length], 'midi').toNote();
    const dur  = rng() < 0.5 ? '8n' : '4n';
    synth.triggerAttackRelease(note, dur, t);
    t += Tone.Time(dur).toSeconds() + rng() * 0.06;
  }

  setReplayButtonsDisabled(true);
  const timerId = setTimeout(() => {
    try { synth.dispose(); crusher.dispose(); autoFilter.dispose(); reverb.dispose(); } catch(_) {}
    activeAudio = null;
    setReplayButtonsDisabled(false);
  }, (t - Tone.now() + 3.5) * 1000);

  activeAudio = { synth, delay: crusher, reverb, timerId, extras: [autoFilter] };
}

// ── Model loading (chunked) ──────────────────────────────
let llm = null;

async function fetchModel(onProgress) {
  // Return cached assembled model if available
  try {
    const cache = await caches.open(MODEL_CACHE);
    const hit   = await cache.match(ASSEMBLED_KEY);
    if (hit) { onProgress(1); return new Uint8Array(await hit.arrayBuffer()); }
  } catch(_) {}

  // Load manifest
  const manifest = await fetch(`${MODEL_BASE}/manifest.json`).then(r => r.json());
  const { chunks, totalSize } = manifest;
  let received = 0;

  // Fetch all chunks in parallel, streaming each for progress
  async function fetchChunk(name) {
    const resp = await fetch(`${MODEL_BASE}/${name}`);
    if (!resp.ok) throw new Error(`chunk ${name}: HTTP ${resp.status}`);
    const reader = resp.body.getReader();
    const parts  = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      parts.push(value);
      received += value.length;
      onProgress(received / totalSize);
    }
    const len = parts.reduce((s, p) => s + p.length, 0);
    const out = new Uint8Array(len);
    let pos = 0;
    for (const p of parts) { out.set(p, pos); pos += p.length; }
    return out;
  }

  const fetched = await Promise.all(chunks.map(fetchChunk));

  // Assemble
  const assembled = new Uint8Array(totalSize);
  let pos = 0;
  for (const chunk of fetched) { assembled.set(chunk, pos); pos += chunk.length; }

  // Cache assembled buffer for future visits
  try {
    const cache = await caches.open(MODEL_CACHE);
    await cache.put(ASSEMBLED_KEY, new Response(assembled.buffer,
      { headers: { 'content-length': String(totalSize) } }));
  } catch(_) {}

  return assembled;
}

async function initLLM(buffer) {
  const fileset = await FilesetResolver.forGenAiTasks(MEDIAPIPE_WASM);
  llm = await LlmInference.createFromOptions(fileset, {
    baseOptions: { modelAssetBuffer: buffer },
    maxTokens: 384,
    randomSeed: 42,
    topK: 40,
    temperature: 0.95,
  });
}

function runLLM(prompt, onToken) {
  return new Promise((resolve, reject) => {
    try {
      llm.generateResponse(prompt, (partial, done) => { onToken(partial); if (done) resolve(); });
    } catch(e) { reject(e); }
  });
}

// ── State ─────────────────────────────────────────────────
const state = {
  starName: null, distance: null, power: 3,
  activeTab: 'text', imageCanvas: null, audioAmplitudes: null, transmitting: false,
};

// ── UI helpers ────────────────────────────────────────────
function showScreen(id) {
  ['screen-idle','screen-prepare','screen-chat','screen-lost'].forEach(s => {
    document.getElementById(s)[s === id ? 'removeAttribute' : 'setAttribute']('hidden', '');
  });
}

function updateSignals() {
  const el = document.getElementById('chat-signals');
  el.textContent = '■'.repeat(state.power) + '□'.repeat(3 - state.power);
  el.classList.toggle('low-power', state.power === 1);
  if (state.power === 0) {
    document.getElementById('input-area').setAttribute('hidden', '');
    document.getElementById('session-end').removeAttribute('hidden');
  } else {
    document.getElementById('btn-send').disabled = state.transmitting;
  }
}

function escHtml(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escAttr(s) { return s.replace(/"/g,'&quot;'); }

function appendUserMsg(original) {
  const div = document.createElement('div');
  div.className = 'p-msg user';
  div.innerHTML =
    `<div class="p-msg-label">you → ${state.starName}</div>` +
    `<div class="p-msg-body">${escHtml(original)}</div>`;
  document.getElementById('msg-list').appendChild(div);
  scrollMsgs();
  return div;
}

function appendPulsarMsg() {
  const div = document.createElement('div');
  div.className = 'p-msg pulsar';
  div.innerHTML =
    `<div class="p-msg-label">${state.starName} → you</div>` +
    `<div class="p-msg-pending p-typing"></div>` +
    `<div class="p-msg-actions" hidden><button class="p-replay-btn">⟳ replay signal</button></div>`;
  document.getElementById('msg-list').appendChild(div);
  scrollMsgs();
  return div;
}

function scrollMsgs() {
  const el = document.getElementById('msg-list');
  el.scrollTop = el.scrollHeight;
}

// ── Send ──────────────────────────────────────────────────
async function sendMessage() {
  if (state.transmitting) return;
  let original = '';
  if (state.activeTab === 'text') {
    original = document.getElementById('msg-input').value.trim();
    if (!original) return;
  } else if (state.activeTab === 'image') {
    if (!state.imageCanvas) return;
    original = `[VISUAL SIGNAL: ${state.imageCanvas.width}×${state.imageCanvas.height}px, dominant hue #${dominantHex(state.imageCanvas)}]`;
  } else {
    if (!state.audioAmplitudes) return;
    original = `[AUDIO SIGNAL: waveform ${ampToWave(state.audioAmplitudes)}]`;
  }

  state.transmitting = true;
  const sendBtn = document.getElementById('btn-send');
  sendBtn.disabled = true;
  if (state.activeTab === 'text') document.getElementById('msg-input').value = '';

  // Send animation: cycle dots on button for ~700ms before proceeding
  const sendLabels = ['Transmitting ·', 'Transmitting ··', 'Transmitting ···'];
  let dotIdx = 0;
  sendBtn.textContent = sendLabels[0];
  const dotTimer = setInterval(() => { sendBtn.textContent = sendLabels[++dotIdx % 3]; }, 200);
  await new Promise(r => setTimeout(r, 700));
  clearInterval(dotTimer);
  sendBtn.textContent = 'Transmit →';

  const corrupted = corruptText(original, state.starName);
  const msgIdx    = 3 - state.power;

  console.log('[pulsar] user →', { original, corrupted, msgIdx });

  appendUserMsg(original);

  const pDiv      = appendPulsarMsg();
  const pendingEl = pDiv.querySelector('.p-msg-pending');
  const actionsEl = pDiv.querySelector('.p-msg-actions');
  const prompt    = buildPrompt(corrupted, state.starName, state.distance, msgIdx);
  console.log('[pulsar] prompt →', prompt);
  let fullResp    = '';

  try {
    await runLLM(prompt, partial => { fullResp += partial; });
  } catch(_) {
    fullResp = '░ lost ░';
  }

  console.log('[pulsar] response ←', fullResp);

  pendingEl.setAttribute('hidden', '');
  actionsEl.removeAttribute('hidden');
  const replayBtn = actionsEl.querySelector('.p-replay-btn');
  replayBtn.dataset.text = fullResp;

  state.power--;
  updateSignals();
  synthesize(fullResp, state.starName);
  state.transmitting = false;

  if (state.power > 0) {
    document.getElementById('btn-send').disabled = false;
  }
}

// ── Audio recording ───────────────────────────────────────
async function startRecording() {
  const btn = document.getElementById('btn-record');
  const waveEl = document.getElementById('waveform-display');
  btn.disabled = true; btn.textContent = '● recording…';
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch { btn.disabled = false; btn.textContent = '⬤ Record (5s)'; waveEl.textContent = '⚠ mic denied'; return; }

  const ctx      = new AudioContext();
  const src      = ctx.createMediaStreamSource(stream);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  src.connect(analyser);

  const N = 24;
  const buf = new Uint8Array(analyser.frequencyBinCount);
  const peaks = [];

  // Sample peak amplitude N times across the 5s recording
  const sampleTimer = setInterval(() => {
    analyser.getByteTimeDomainData(buf);
    let peak = 0;
    for (let i = 0; i < buf.length; i++) peak = Math.max(peak, Math.abs(buf[i] - 128) / 128);
    peaks.push(peak);
  }, 5000 / N);

  const rec = new MediaRecorder(stream);
  rec.onstop = () => {
    clearInterval(sampleTimer);
    stream.getTracks().forEach(t => t.stop());
    ctx.close();
    // Downsample to exactly N bins
    const amps = Array.from({length: N}, (_, i) => {
      const a = Math.floor(i * peaks.length / N), b = Math.floor((i + 1) * peaks.length / N);
      let max = 0;
      for (let j = a; j < b; j++) max = Math.max(max, peaks[j] || 0);
      return max;
    });
    // Normalize so the loudest bin fills the display
    const maxAmp = Math.max(...amps, 0.01);
    const normalized = amps.map(v => v / maxAmp);
    state.audioAmplitudes = normalized;
    waveEl.textContent = ampToWave(normalized);
    document.getElementById('btn-send').disabled = false;
    btn.disabled = false; btn.textContent = '⬤ Record again';
  };
  rec.start();
  let cd = 5;
  const tick = setInterval(() => {
    btn.textContent = `● ${--cd}s…`;
    if (cd <= 0) { clearInterval(tick); rec.stop(); }
  }, 1000);
}

// ── Image ─────────────────────────────────────────────────
function loadImageFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const MAX = 420, scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const canvas = document.getElementById('img-canvas');
      canvas.width  = Math.round(img.width  * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      applyCanvasCorruption(canvas, state.starName);
      document.getElementById('img-drop-label').textContent = `signal ready (${img.width}×${img.height})`;
      state.imageCanvas = canvas;
      document.getElementById('btn-send').disabled = false;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ── Reset ─────────────────────────────────────────────────
function resetAll() {
  stopActiveAudio();
  state.starName = null; state.distance = null; state.power = 3;
  state.activeTab = 'text'; state.imageCanvas = null; state.audioAmplitudes = null;
  state.transmitting = false;
  if (llm) { try { llm.close(); } catch(_){} llm = null; }
  document.getElementById('msg-list').innerHTML = '';
  document.getElementById('msg-input').value = '';
  document.getElementById('img-canvas').setAttribute('hidden','');
  document.getElementById('img-drop-label').innerHTML = 'Drop image or <label for="img-file-input" style="cursor:pointer;color:#2a7ae2">select file</label>';
  document.getElementById('waveform-display').textContent = '';
  document.getElementById('input-area').removeAttribute('hidden');
  document.getElementById('session-end').setAttribute('hidden', '');
  document.getElementById('btn-abort').textContent = 'Abort';
  document.getElementById('btn-abort').disabled = false;
  document.getElementById('model-load-progress').removeAttribute('hidden');
  document.getElementById('progress-label').textContent = 'loading model…';
  const fillEl2 = document.getElementById('progress-fill');
  fillEl2.style.width = '0%';
  fillEl2.style.background = '';
  fillEl2.classList.add('scanning');
  showScreen('screen-idle');
}

// ── Boot ──────────────────────────────────────────────────
function init() {
  // Kick off model download immediately in the background
  const hintEl  = document.getElementById('model-hint');
  const fillEl  = document.getElementById('progress-fill');

  const modelBufferPromise = fetchModel(p => {
    hintEl.textContent = p < 1
      ? `preparing… ${Math.round(p * 100)}%`
      : 'ready';
    // Also update prepare-screen bar if visible
    if (!fillEl.classList.contains('scanning')) fillEl.style.width = (p * 100) + '%';
  }).catch(err => {
    hintEl.textContent = 'model unavailable';
    return Promise.reject(err);
  });

  // Connect button
  document.getElementById('btn-connect').addEventListener('click', async () => {
    if (!navigator.gpu) {
      state.starName = genStarName(); state.distance = genDistance(state.starName);
      showScreen('screen-prepare');
      document.getElementById('p-starname').textContent = state.starName;
      document.getElementById('p-distance').textContent = `${state.distance} ly`;
      document.getElementById('no-webgpu-msg').removeAttribute('hidden');
      document.getElementById('progress-label').setAttribute('hidden','');
      return;
    }

    state.starName = genStarName(); state.distance = genDistance(state.starName);
    showScreen('screen-prepare');
    document.getElementById('p-starname').textContent = state.starName;
    document.getElementById('p-distance').textContent = `${state.distance} ly`;

    // Stop scanning animation; show real progress
    fillEl.classList.remove('scanning');
    fillEl.style.width = '0%';

    try {
      document.getElementById('progress-label').textContent = 'preparing equipment…';
      const [buffer] = await Promise.all([
        modelBufferPromise,
        new Promise(r => setTimeout(r, 1800)),
      ]);
      document.getElementById('progress-label').textContent = 'connecting…';
      await Promise.all([initLLM(buffer), new Promise(r => setTimeout(r, 600))]);
      // Crawl from 0 → 98 via rAF so the full range is smooth (no CSS-transition jump)
      await new Promise(resolve => {
        let pct = parseFloat(fillEl.style.width) || 0;
        const step = () => {
          pct += (98 - pct) * 0.04;
          fillEl.style.width = pct + '%';
          if (98 - pct < 0.3) { fillEl.style.width = '100%'; resolve(); }
          else requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
      await new Promise(r => setTimeout(r, 350));
      document.getElementById('model-load-progress').setAttribute('hidden', '');
      showScreen('screen-chat');
      document.getElementById('chat-starname-label').textContent = state.starName;
      document.getElementById('chat-distance-label').textContent = `${state.distance} ly`;
      updateSignals();
      document.getElementById('btn-send').disabled = false;
    } catch(e) {
      document.getElementById('progress-label').textContent = `error: ${e.message}`;
      fillEl.style.background = '#d32f2f';
    }
  });

  // Tabs
  document.querySelectorAll('.p-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.p-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeTab = tab.dataset.tab;
      ['text','image','audio'].forEach(id => {
        document.getElementById('tab-' + id)[id === state.activeTab ? 'removeAttribute' : 'setAttribute']('hidden','');
      });
      const ok = (state.activeTab === 'text'  && document.getElementById('msg-input').value.trim()) ||
                 (state.activeTab === 'image' && state.imageCanvas) ||
                 (state.activeTab === 'audio' && state.audioAmplitudes);
      document.getElementById('btn-send').disabled = !ok || state.transmitting;
    });
  });

  document.getElementById('msg-input').addEventListener('input', () => {
    if (state.activeTab === 'text')
      document.getElementById('btn-send').disabled =
        !document.getElementById('msg-input').value.trim() || state.transmitting;
  });

  document.getElementById('btn-send').addEventListener('click', () => { sendMessage(); });
  document.getElementById('btn-abort').addEventListener('click', () => {
    const btn = document.getElementById('btn-abort');
    btn.textContent = 'connection lost…';
    btn.disabled = true;
    setTimeout(resetAll, 1200);
  });
  document.getElementById('msg-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !state.transmitting && state.power > 0) { e.preventDefault(); sendMessage(); }
  });

  // Image drop
  const imgDrop = document.getElementById('img-drop');
  imgDrop.addEventListener('dragover', e => { e.preventDefault(); imgDrop.classList.add('drag-over'); });
  imgDrop.addEventListener('dragleave', () => imgDrop.classList.remove('drag-over'));
  imgDrop.addEventListener('drop', e => {
    e.preventDefault(); imgDrop.classList.remove('drag-over');
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith('image/')) loadImageFile(f);
  });
  document.getElementById('img-file-input').addEventListener('change', e => {
    if (e.target.files[0]) loadImageFile(e.target.files[0]);
  });

  // Audio
  document.getElementById('btn-record').addEventListener('click', startRecording);

  // Replay (delegated)
  document.getElementById('msg-list').addEventListener('click', e => {
    const btn = e.target.closest('.p-replay-btn');
    if (!btn) return;
    btn.dataset.electronic === 'true'
      ? synthesizeUser(btn.dataset.text, state.starName)
      : synthesize(btn.dataset.text, state.starName);
  });

  // Reset
  document.getElementById('btn-reset').addEventListener('click', resetAll);
}

init();
</script>
