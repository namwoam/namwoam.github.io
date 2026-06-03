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
.p-textarea {
  width: 100%; border: 1px solid #e0e0e0; background: #fff;
  font-family: inherit; font-size: 0.9rem; color: #333;
  padding: 0.5rem 0.75rem; border-radius: 4px; resize: vertical; line-height: 1.6;
}
.p-textarea:focus { outline: none; border-color: #aaa; }

.p-input-footer { display: flex; justify-content: flex-end; margin-top: 0.75rem; }

/* Connection lost */
#screen-lost { padding: 1.5rem 0; border-top: 1px solid #e8e8e8; margin-top: 0.5rem; }
.p-lost-title { font-size: 1rem; font-weight: 600; color: #d32f2f; margin: 0 0 0.2rem; }
.p-lost-sub { font-size: 0.85rem; color: #828282; margin: 0 0 0.4rem; }
.p-lost-star { font-family: 'Courier New', monospace; font-size: 0.72rem; color: #bbb; margin: 0 0 1rem; }
</style>

<div id="screen-idle" class="p-screen">
  <div class="p-idle-inner">
    <button id="btn-connect" class="p-btn p-btn-primary">Talk to a Pulsar</button>
    <span id="model-hint" class="p-model-hint">preparing…</span>
    <div class="p-model-license">
      Local model based on
      <a href="https://huggingface.co/LiquidAI/LFM2.5-350M-ONNX">LiquidAI/LFM2.5-350M-ONNX</a>
      Q4,
      subject to the
      <a href="https://huggingface.co/LiquidAI/LFM2.5-350M-ONNX/blob/main/LICENSE">LFM 1.0 License</a>.
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
    <textarea id="msg-input" class="p-textarea" placeholder="Enter message…" rows="3" maxlength="500"></textarea>
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

import * as ort from 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.23.2/dist/ort.webgpu.min.mjs';
import { AutoTokenizer, env as hfEnv }
  from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/transformers.min.js';

const MODEL_ID       = 'LiquidAI/LFM2.5-350M-ONNX';
const MODEL_BASE     = '{{ "/_model" | relative_url }}';
const ONNX_MODEL_URL = `${MODEL_BASE}/model_q4.onnx`;
const ONNX_DATA_URL  = `${MODEL_BASE}/model_q4.onnx_data`;

const MAX_NEW_TOKENS      = 512;
const TARGET_WORDS        = 24;
const TEMPERATURE         = 0.7;
const TOP_K               = 128;
const REPETITION_PENALTY  = 1.05;
const LFM_HIDDEN_SIZE     = 1024;
const LFM_NUM_KV_HEADS    = 8;
const LFM_HEAD_DIM        = 64;

ort.env.wasm.numThreads = 1;
ort.env.debug = false;
ort.env.logLevel = 'error';
hfEnv.allowLocalModels = true;
hfEnv.allowRemoteModels = false;
hfEnv.localModelPath = '';

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
  return `${prefix}-${digit}${l1}${l2}${hex}`;
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

function buildPrompt(corrupted, name, dist, idx) {
  const left = 2 - idx;
  return [
    `You are ${name}, a distant pulsar ${dist} light-years from Earth.`,
    `The user sent a noisy radio message. Damaged symbols are static; let the message stir an abstract transmission.`,
    `Noisy message: ${JSON.stringify(corrupted)}`,
    `Return exactly 24 poetic words, separated by commas.`,
    `Ignore grammar. Do not write sentences. Do not explain.`,
    `Use stark cosmic words like time, space, gene, war, dust, orbit, bone, tide, signal, ash.`,
    left === 0
      ? `Make the final words feel like farewell.`
      : `${left} transmissions remain after this one.`,
  ].join('\n');
}

const POETIC_WORDS = [
  'time','space','gene','war','dust','orbit','bone','tide',
  'signal','ash','star','void','blood','ice','memory','pulse',
  'stone','dream','iron','seed','night','echo','gravity','flame',
  'silence','wave','skin','comet','rift','light','salt','horizon',
];

function normalizePulsarWords(text, seedText) {
  const words = extractPulsarWords(text);

  const rng = makeLcg(djb2(seedText));
  while (words.length < TARGET_WORDS) {
    words.push(POETIC_WORDS[Math.floor(rng() * POETIC_WORDS.length)]);
  }
  return words.slice(0, TARGET_WORDS).join(', ');
}

function extractPulsarWords(text) {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_/|]+/g, ' ')
    .split(/[^A-Za-z]+/)
    .map(w => w.trim().toLowerCase())
    .filter(w => w.length > 1 && !['the','and','are','you','user','speaker','alien'].includes(w));
}

// ── Music (Tone.js global) ───────────────────────────────
const SCALES = [[0,2,4,7,9],[0,2,3,7,10],[0,2,4,5,7,9],[0,2,3,5,7,9,10]];

let activeAudio = null;
let toneReadyPromise = null;

function ensureTone() {
  if (typeof Tone !== 'undefined') return Promise.resolve();
  if (!toneReadyPromise) {
    toneReadyPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/tone@15.1.22/build/Tone.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Tone.js failed to load'));
      document.head.appendChild(script);
    });
  }
  return toneReadyPromise;
}

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
  await ensureTone().catch(() => {});
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
  await ensureTone().catch(() => {});
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

// ── Model loading (ONNX WebGPU) ──────────────────────────
let llm = null;

async function ensureModelServiceWorker() {
  if (!('serviceWorker' in navigator)) throw new Error('service worker unavailable');
  const registration = await navigator.serviceWorker.register('{{ "/pulsar-model-sw.js" | relative_url }}');
  if (!navigator.serviceWorker.controller) {
    await navigator.serviceWorker.ready;
    await new Promise(resolve => {
      const timer = setTimeout(resolve, 800);
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        clearTimeout(timer);
        resolve();
      }, { once: true });
    });
  } else {
    await registration.update().catch(() => {});
  }
}

async function validateJsonAsset(path) {
  const url = `${MODEL_BASE}/${path}`;
  const resp = await fetch(url, { cache: 'no-store' });
  const text = await resp.text();

  if (!resp.ok) throw new Error(`${url}: HTTP ${resp.status}`);
  if (!text.trim()) throw new Error(`${url}: empty JSON response`);

  try {
    JSON.parse(text);
  } catch (err) {
    throw new Error(`${url}: invalid JSON (${err.message})`);
  }
}

async function validateModelAssets() {
  await Promise.all([
    'config.json',
    'generation_config.json',
    'tokenizer_config.json',
    'tokenizer.json',
    'manifest.json',
  ].map(validateJsonAsset));
}

async function initLLM(onProgress) {
  if (llm) return llm;
  if (!navigator.gpu) throw new Error('WebGPU not available');

  onProgress(0.08);
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) throw new Error('WebGPU adapter not found');

  onProgress(0.12);
  console.log('[pulsar] validating model assets');
  await validateModelAssets();

  onProgress(0.16);
  console.log('[pulsar] loading tokenizer');
  const tokenizer = await AutoTokenizer.from_pretrained(MODEL_BASE, { local_files_only: true });

  onProgress(0.2);
  console.log('[pulsar] registering model service worker');
  await ensureModelServiceWorker();
  onProgress(0.72);

  onProgress(0.74);
  console.log('[pulsar] creating ONNX session');
  const session = await ort.InferenceSession.create(ONNX_MODEL_URL, {
    executionProviders: ['webgpu'],
    externalData: [{ path: 'model_q4.onnx_data', data: ONNX_DATA_URL }],
  });
  console.log('[pulsar] ONNX session ready');

  llm = {
    tokenizer,
    session,
    inputNames: new Set(session.inputNames),
    outputNames: session.outputNames,
  };
  onProgress(1);
  return llm;
}

function initCache() {
  const cache = {};
  for (const name of llm.session.inputNames) {
    if (name.startsWith('past_conv')) {
      cache[name] = new ort.Tensor(
        'float32',
        new Float32Array(LFM_HIDDEN_SIZE * 3),
        [1, LFM_HIDDEN_SIZE, 3]
      );
    } else if (name.startsWith('past_key_values')) {
      cache[name] = new ort.Tensor(
        'float32',
        new Float32Array(0),
        [1, LFM_NUM_KV_HEADS, 0, LFM_HEAD_DIM]
      );
    }
  }
  return cache;
}

function updateCache(cache, outputs) {
  for (const [name, tensor] of Object.entries(outputs)) {
    if (name.startsWith('present_conv')) {
      cache[name.replace('present_conv', 'past_conv')] = tensor;
    } else if (name.startsWith('present.')) {
      cache[name.replace('present.', 'past_key_values.')] = tensor;
    }
  }
}

function sampleToken(logitsData, vocabSize, generatedTokens) {
  const logits = new Float32Array(logitsData);
  for (const tokenId of new Set(generatedTokens)) {
    if (tokenId >= vocabSize) continue;
    logits[tokenId] = logits[tokenId] > 0
      ? logits[tokenId] / REPETITION_PENALTY
      : logits[tokenId] * REPETITION_PENALTY;
  }
  for (let i = 0; i < vocabSize; i++) logits[i] /= TEMPERATURE;

  const indexed = Array.from(logits.slice(0, vocabSize), (v, i) => [v, i]);
  indexed.sort((a, b) => b[0] - a[0]);
  const topK = indexed.slice(0, TOP_K).filter(([v]) => Number.isFinite(v));
  if (!topK.length) {
    console.log('[pulsar] generation stopped: no token candidates', {
      vocabSize,
      logitsLength: logitsData?.length ?? 0,
      generatedTokens: generatedTokens.length,
    });
    return null;
  }
  const maxLogit = topK[0][0];
  let exps = topK.map(([v, i]) => [Math.exp(v - maxLogit), i]);
  let sumExp = exps.reduce((s, [e]) => s + e, 0);
  let r = Math.random();
  for (const [e, i] of exps) {
    r -= e / sumExp;
    if (r <= 0) return i;
  }
  return exps[exps.length - 1][1];
}

function buildInputTensor(ids) {
  return new ort.Tensor('int64', BigInt64Array.from(ids.map(BigInt)), [1, ids.length]);
}

function getLastLogits(logits) {
  const dims = logits.dims;
  if (dims.length === 1) {
    return { data: logits.data, vocabSize: dims[0] };
  }
  if (dims.length === 2) {
    const vocabSize = dims[1];
    return { data: logits.data.slice(logits.data.length - vocabSize), vocabSize };
  }
  if (dims.length === 3) {
    const vocabSize = dims[2];
    const start = (dims[1] - 1) * vocabSize;
    return { data: logits.data.slice(start, start + vocabSize), vocabSize };
  }
  throw new Error(`unsupported logits shape: ${dims.join('x')}`);
}

async function runLLM(prompt, onToken) {
  const tokenizer = llm.tokenizer;
  const messages = [{ role: 'user', content: prompt }];
  const templated = tokenizer.apply_chat_template
    ? tokenizer.apply_chat_template(messages, { add_generation_prompt: true, tokenize: false })
    : prompt;
  console.log('[pulsar] chat template →', templated);
  const inputIds = tokenizer.encode(templated);
  const cache = initCache();
  const generatedTokens = [];
  const eosTokenId = 7;
  const usePositionIds = llm.inputNames.has('position_ids');
  const useNumLogitsToKeep = llm.inputNames.has('num_logits_to_keep');
  let emitted = '';
  let ids = inputIds;
  let curLen = inputIds.length;
  let stopped = false;

  for (let step = 0; step < MAX_NEW_TOKENS; step++) {
    const feed = {
      input_ids: buildInputTensor(ids),
      attention_mask: new ort.Tensor('int64', new BigInt64Array(curLen).fill(1n), [1, curLen]),
      ...cache,
    };
    if (useNumLogitsToKeep) {
      feed.num_logits_to_keep = new ort.Tensor('int64', BigInt64Array.from([1n]), [1]);
    }
    if (usePositionIds) {
      const pos = step === 0
        ? Array.from({ length: ids.length }, (_, i) => i)
        : [curLen - 1];
      feed.position_ids = buildInputTensor(pos);
    }

    const outputs = await llm.session.run(feed);
    const logits = outputs.logits || outputs[llm.outputNames[0]];
    const lastLogits = getLastLogits(logits);
    const nextToken = sampleToken(
      lastLogits.data,
      lastLogits.vocabSize,
      generatedTokens
    );

    updateCache(cache, outputs);
    if (nextToken === null) {
      stopped = true;
      break;
    }
    if (nextToken === eosTokenId) {
      console.log('[pulsar] generation stopped: eos', {
        step,
        visibleWords: extractPulsarWords(emitted).length,
        generatedTokens: generatedTokens.length,
      });
      stopped = true;
      break;
    }
    generatedTokens.push(nextToken);
    ids = [nextToken];
    curLen++;

    const decoded = tokenizer.decode(generatedTokens, { skip_special_tokens: true });
    if (decoded.length > emitted.length) {
      onToken(decoded.slice(emitted.length));
      emitted = decoded;
      await new Promise(r => setTimeout(r, 0));
    }
    if (extractPulsarWords(decoded).length >= TARGET_WORDS) {
      console.log('[pulsar] generation stopped: target words', {
        step,
        visibleWords: extractPulsarWords(decoded).length,
        generatedTokens: generatedTokens.length,
      });
      stopped = true;
      break;
    }
  }
  if (!stopped) {
    console.log('[pulsar] generation stopped: max tokens', {
      maxNewTokens: MAX_NEW_TOKENS,
      visibleWords: extractPulsarWords(emitted).length,
      generatedTokens: generatedTokens.length,
    });
  }
}

// ── State ─────────────────────────────────────────────────
const state = {
  starName: null, distance: null, power: 3,
  transmitting: false,
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
  const original = document.getElementById('msg-input').value.trim();
  if (!original) return;

  state.transmitting = true;
  const sendBtn = document.getElementById('btn-send');
  sendBtn.disabled = true;
  document.getElementById('msg-input').value = '';

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
  } catch(e) {
    console.error('[pulsar] generation failed', e);
  }
  fullResp = normalizePulsarWords(fullResp, `${state.starName}:${original}:${corrupted}`);

  console.log('[pulsar] response ←', fullResp);

  pendingEl.classList.remove('p-typing');
  pendingEl.textContent = fullResp;
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

// ── Reset ─────────────────────────────────────────────────
function resetAll() {
  stopActiveAudio();
  state.starName = null; state.distance = null; state.power = 3;
  state.transmitting = false;
  if (llm) {
    try { llm.session.release(); } catch(_) {}
    llm = null;
  }
  document.getElementById('msg-list').innerHTML = '';
  document.getElementById('msg-input').value = '';
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
  // Kick off model initialization immediately in the background when WebGPU is available.
  const hintEl  = document.getElementById('model-hint');
  const fillEl  = document.getElementById('progress-fill');

  let modelReadyPromise = null;
  const startModel = () => {
    if (!modelReadyPromise) {
      modelReadyPromise = initLLM(p => {
        hintEl.textContent = p < 1
          ? `preparing… ${Math.round(p * 100)}%`
          : 'ready';
        if (!fillEl.classList.contains('scanning')) fillEl.style.width = (p * 100) + '%';
      }).catch(err => {
        console.error('[pulsar] model init failed', err);
        hintEl.textContent = 'model unavailable';
        modelReadyPromise = null;
        return Promise.reject(err);
      });
    }
    return modelReadyPromise;
  };

  if (navigator.gpu) startModel().catch(() => {});
  else hintEl.textContent = 'webgpu unavailable';

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
      await Promise.all([
        startModel(),
        new Promise(r => setTimeout(r, 1800)),
      ]);
      document.getElementById('progress-label').textContent = 'connecting…';
      await new Promise(r => setTimeout(r, 600));
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
      console.error('[pulsar] connect failed', e);
      const detail = e?.message || e?.toString?.() || JSON.stringify(e) || 'unknown error';
      document.getElementById('progress-label').textContent = `error: ${detail}`;
      fillEl.style.background = '#d32f2f';
    }
  });

  document.getElementById('msg-input').addEventListener('input', () => {
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
