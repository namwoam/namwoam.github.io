---
layout: default
title: Archer World
description: Guide it through the Archer World.
mini_project: true
project_order: 2
preview: archer-world
permalink: /mini-project/archer-world/
---

{% include mini-project-nav.html %}

# Archer World

<style>
.aw-intro {
  max-width: 650px;
  min-height: 1.2rem;
  margin: 0 auto 0.35rem;
  color: #828282;
  font-size: 0.82rem;
}
.aw-intro p { margin: 0; }
.aw-actions { display: flex; gap: 0.5rem; }
.aw-command-row {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 0;
  max-width: 650px;
  margin: 0 auto 0.75rem;
  overflow: hidden;
  background: #f5e8c9;
  box-shadow: 0 5px 14px rgba(44,35,18,0.13);
}
.aw-command-row::before {
  content: "";
  flex: 0 0 0.65rem;
  background: #1559a0;
}
.aw-command {
  flex: 1;
  min-width: 0;
  align-self: stretch;
  border: 0;
  border-radius: 0;
  padding: 0.7rem 1rem;
  background: #f5e8c9;
  color: #111;
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 0.98rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.25;
}
.aw-command::placeholder { color: #9a8f78; }
.aw-command:focus {
  outline: none;
  background: #fff6df;
  box-shadow: inset 0 -4px #d9221d;
}
.aw-life-stack {
  position: relative;
  display: grid;
  grid-template-columns: 2.2rem minmax(0, 1fr);
  grid-template-rows: 3.6rem;
  width: 14rem;
  overflow: hidden;
  background: #1559a0;
}
.aw-life-control {
  position: relative;
  grid-column: 2;
  grid-row: 1;
  width: 100%;
  min-height: 100%;
  border: 0;
  border-radius: 0;
  padding: 0.25rem 0.65rem;
  background: #111;
  color: #f7eed8;
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.035em;
  line-height: 1.2;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s, color 0.12s;
}
.aw-life-control:hover {
  background: #d9221d;
  color: #fff;
}
.aw-life-control:focus { outline: none; }
.aw-life-control:focus-visible {
  box-shadow: inset 0 0 0 2px #f2b705;
}
.aw-life-control:disabled { opacity: 0.65; cursor: wait; }
.aw-life-dot {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 1.1rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: #d9221d;
  box-shadow: 0 0 0 0 rgba(217,34,29,0.55);
  transform: translate(-50%, -50%);
}
.aw-life-dot.is-active {
  animation: aw-life-pulse 1s ease-out infinite;
}
.aw-life-action {
  display: block;
  width: 100%;
  text-align: right;
  text-transform: lowercase;
}
@keyframes aw-life-pulse {
  0% { opacity: 1; box-shadow: 0 0 0 0 rgba(217,34,29,0.6); }
  70% { opacity: 0.7; box-shadow: 0 0 0 8px rgba(217,34,29,0); }
  100% { opacity: 1; box-shadow: 0 0 0 0 rgba(217,34,29,0); }
}
.aw-agent-thought {
  max-width: 30rem;
  overflow: hidden;
  color: #aaa;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.aw-model-license {
  max-width: 650px;
  margin: 0.8rem auto 0;
  color: #aaa;
  font-size: 0.72rem;
  line-height: 1.5;
}
.aw-model-license a { color: #828282; }
.aw-stage {
  position: relative;
  max-width: 650px;
  margin: 0 auto;
  perspective: 1100px;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}
.aw-command-cast {
  --tilt: -1deg;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  display: inline-flex;
  align-items: stretch;
  gap: 0;
  min-width: 5.6rem;
  background: linear-gradient(90deg, #1559a0 0 0.42rem, #f5e8c9 0);
  color: #d9221d;
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(0.68rem, 1.65vw, 0.86rem);
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1.05;
  text-transform: lowercase;
  box-shadow: 0 5px 13px rgba(44, 35, 18, 0.16), inset 0 -0.13rem #d9221d;
  white-space: nowrap;
  pointer-events: none;
  transform-origin: 0.4rem 50%;
  will-change: transform, opacity;
}
.aw-command-cast::before {
  content: "";
  width: 0.42rem;
  flex: 0 0 0.42rem;
}
.aw-command-cast::after {
  content: "";
  width: 0.9rem;
  flex: 0 0 0.9rem;
  background: #111;
}
.aw-command-cast-text {
  display: block;
  padding: 0.27rem 0.46rem 0.34rem;
  transform: skewX(var(--tilt));
}
.aw-surface {
  position: relative;
  width: 100%;
  aspect-ratio: 1054 / 1492;
  overflow: hidden;
  border-radius: 3px;
  background: #f7eed8 url('{{ "/assets/archer-world.png" | relative_url }}') center / cover no-repeat;
  box-shadow: 0 16px 36px rgba(44, 35, 18, 0.16);
  transform-style: preserve-3d;
  transition: transform 0.16s ease-out, box-shadow 0.16s ease-out;
}
.aw-marble {
  --light-x: 28%;
  --light-y: 22%;
  position: absolute;
  left: 50%;
  top: 12%;
  width: clamp(42px, 8.5%, 68px);
  aspect-ratio: 1;
  z-index: 2;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.72);
  background: rgba(170, 225, 235, 0.16);
  box-shadow:
    inset -11px -13px 19px rgba(4, 20, 30, 0.42),
    inset 8px 9px 15px rgba(255,255,255,0.48),
    inset 1px 1px 2px rgba(255,255,255,0.9),
    0 9px 9px rgba(0,0,0,0.28);
  transform: translate(-50%, -50%) translateZ(22px);
  will-change: left, top;
  pointer-events: none;
}
.aw-marble-refraction,
.aw-marble-reflection,
.aw-marble-shading,
.aw-marble-specular {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}
.aw-marble-refraction {
  inset: -13%;
  background-image: url('{{ "/assets/archer-world.png" | relative_url }}');
  background-repeat: no-repeat;
  filter: blur(0.7px) saturate(1.35) contrast(1.08);
  opacity: 0.46;
  transform: scaleX(-1) scale(1.12);
  will-change: background-position;
}
.aw-marble-reflection {
  background:
    radial-gradient(ellipse at 50% -8%, rgba(255,255,255,0.8) 0 7%, rgba(255,255,255,0.14) 24%, transparent 43%),
    linear-gradient(176deg, rgba(247,238,216,0.54) 0 18%, rgba(15,82,145,0.24) 31%, transparent 46% 62%, rgba(223,29,27,0.2) 75%, rgba(0,0,0,0.2) 100%);
  mix-blend-mode: screen;
  opacity: 0.78;
  transform: rotate(var(--ambient-roll, 0deg));
  will-change: transform;
}
.aw-marble-shading {
  background:
    radial-gradient(circle at var(--light-x) var(--light-y), transparent 0 28%, rgba(16,57,72,0.1) 52%, rgba(2,14,22,0.48) 88%, rgba(0,0,0,0.68) 100%),
    linear-gradient(145deg, rgba(255,255,255,0.18), transparent 43%);
  box-shadow:
    inset 5px 4px 8px rgba(255,255,255,0.28),
    inset -5px -7px 10px rgba(0,0,0,0.2);
}
.aw-marble-specular {
  inset: 7%;
  background:
    radial-gradient(ellipse at 28% 22%, rgba(255,255,255,1) 0 3%, rgba(255,255,255,0.72) 4%, rgba(255,255,255,0.16) 14%, transparent 27%),
    radial-gradient(ellipse at 68% 78%, rgba(255,255,255,0.32) 0 3%, transparent 21%);
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow: inset 2px 2px 5px rgba(255,255,255,0.22);
}
.aw-shadow {
  position: absolute;
  left: 50%;
  top: 12%;
  width: clamp(38px, 8%, 64px);
  height: clamp(13px, 2.7%, 22px);
  z-index: 1;
  border-radius: 50%;
  background: rgba(0,0,0,0.23);
  filter: blur(5px);
  transform: translate(-42%, 105%);
  will-change: left, top, transform, opacity;
  pointer-events: none;
}
.aw-caustic {
  position: absolute;
  left: 50%;
  top: 12%;
  width: clamp(23px, 4.6%, 37px);
  aspect-ratio: 1.9;
  z-index: 1;
  border-radius: 50%;
  background: rgba(255,255,255,0.56);
  filter: blur(3px);
  mix-blend-mode: screen;
  transform: translate(-2%, 160%) rotate(-25deg);
  will-change: left, top, transform, opacity;
  pointer-events: none;
}
@media (max-width: 600px) {
  .aw-command-row, .aw-actions { flex-wrap: wrap; }
  .aw-command-row::before { flex-basis: 100%; height: 0.45rem; }
  .aw-command { width: 100%; }
  .aw-life-stack, .aw-life-control { width: 100%; }
  .aw-actions { width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .aw-surface { transition: none; }
}
</style>

<div class="aw-intro">
  <p class="aw-agent-thought" id="aw-thought"></p>
</div>

<div class="aw-command-row">
  <input class="aw-command" id="aw-command" type="text" maxlength="120" value="let there be light" aria-label="Custom command for the agent">
    <div class="aw-life-stack">
      <span class="aw-life-dot" aria-hidden="true"></span>
    <button class="aw-life-control" id="aw-agent" type="button">
      <span class="aw-life-action" id="aw-action">reincarnation</span>
    </button>
  </div>
</div>

<div class="aw-stage" id="aw-stage" aria-label="Archer World marble controlled by a local embodied language model.">
  <div class="aw-surface" id="aw-surface">
    <span class="aw-shadow" id="aw-shadow"></span>
    <span class="aw-caustic" id="aw-caustic"></span>
    <span class="aw-marble" id="aw-marble">
      <span class="aw-marble-refraction" id="aw-refraction"></span>
      <span class="aw-marble-reflection" id="aw-reflection"></span>
      <span class="aw-marble-shading"></span>
      <span class="aw-marble-specular"></span>
    </span>
  </div>
</div>

<div class="aw-model-license">
  Local model based on
  <a href="https://huggingface.co/litert-community/gemma-3-270m-it">litert-community/gemma-3-270m-it</a>,
  subject to the
  <a href="https://ai.google.dev/gemma/terms">Gemma Terms of Use</a>
  and
  <a href="https://ai.google.dev/gemma/prohibited_use_policy">Gemma Prohibited Use Policy</a>.
  <a href="{{ '/_model/NOTICE.txt' | relative_url }}">Notice</a>.
</div>

<script type="module">
import { FilesetResolver, LlmInference }
  from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@0.10.22/genai_bundle.mjs';

const MEDIAPIPE_WASM = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@0.10.22/wasm';
const MODEL_BASE = '{{ "/_model" | relative_url }}';
const MODEL_CACHE = 'pulsar-model-v1';
const ASSEMBLED_KEY = `${MODEL_BASE}/assembled`;

(() => {
  const stage = document.getElementById('aw-stage');
  const surface = document.getElementById('aw-surface');
  const marble = document.getElementById('aw-marble');
  const refraction = document.getElementById('aw-refraction');
  const reflection = document.getElementById('aw-reflection');
  const shadow = document.getElementById('aw-shadow');
  const caustic = document.getElementById('aw-caustic');
  const agentButton = document.getElementById('aw-agent');
  const commandInput = document.getElementById('aw-command');
  const lifeDot = document.querySelector('.aw-life-dot');
  const actionEl = document.getElementById('aw-action');
  const thoughtEl = document.getElementById('aw-thought');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ball = { x: 0.5, y: 0.12, vx: 0, vy: 0, rx: 0, ry: 0 };
  const target = { x: 0.78, y: 0.82 };
  const agent = { running: false, deciding: false, step: 0, session: 0, actions: [] };
  const visualSensor = document.createElement('canvas');
  const visualContext = visualSensor.getContext('2d', { willReadFrequently: true });
  let llm = null;
  let modelBufferPromise = null;
  let visualSensorReady = false;
  let actionTimer = null;
  let lastTime = performance.now();

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  function moveBall(x, y) {
    const impulse = 0.06 + Math.random() * 0.02;
    const angle = (Math.random() - 0.5) * 0.32;
    const moveX = x * Math.cos(angle) - y * Math.sin(angle);
    const moveY = x * Math.sin(angle) + y * Math.cos(angle);
    ball.vx = clamp(ball.vx + moveX * impulse, -0.32, 0.32);
    ball.vy = clamp(ball.vy + moveY * impulse, -0.32, 0.32);
  }

  function reset() {
    ball.x = 0.5;
    ball.y = 0.12;
    ball.vx = 0;
    ball.vy = 0;
    ball.rx = 0;
    ball.ry = 0;
    thoughtEl.textContent = '';
  }

  function render() {
    const surfaceWidth = surface.clientWidth;
    const surfaceHeight = surface.clientHeight;
    const marbleWidth = marble.offsetWidth;
    const marbleHeight = marble.offsetHeight;
    const speed = Math.min(Math.hypot(ball.vx, ball.vy) * 4, 1);
    const ambientRoll = reducedMotion ? 0 : (ball.rx + ball.ry) * 0.18;
    marble.style.left = `${ball.x * 100}%`;
    marble.style.top = `${ball.y * 100}%`;
    marble.style.setProperty('--light-x', `${28 - ball.vx * 20}%`);
    marble.style.setProperty('--light-y', `${22 - ball.vy * 20}%`);
    refraction.style.backgroundSize = `${surfaceWidth}px ${surfaceHeight}px`;
    refraction.style.backgroundPosition =
      `${marbleWidth / 2 - ball.x * surfaceWidth}px ${marbleHeight / 2 - ball.y * surfaceHeight}px`;
    reflection.style.setProperty('--ambient-roll', `${ambientRoll}deg`);
    shadow.style.left = `${ball.x * 100}%`;
    shadow.style.top = `${ball.y * 100}%`;
    shadow.style.opacity = `${0.23 + speed * 0.14}`;
    shadow.style.transform = `translate(${-42 - ball.vx * 45}%, ${105 - ball.vy * 45}%) scale(${1 + speed * 0.18})`;
    caustic.style.left = `${ball.x * 100}%`;
    caustic.style.top = `${ball.y * 100}%`;
    caustic.style.opacity = `${0.56 - speed * 0.18}`;
    caustic.style.transform = `translate(${-2 - ball.vx * 70}%, ${160 - ball.vy * 70}%) rotate(${-25 + ball.vx * 50}deg)`;
  }

  function tick(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.035);
    lastTime = now;

    const friction = Math.pow(0.5, dt);
    ball.vx *= friction;
    ball.vy *= friction;
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    const radiusX = marble.offsetWidth / surface.clientWidth / 2;
    const radiusY = marble.offsetHeight / surface.clientHeight / 2;
    if (ball.x < -radiusX) ball.x = 1 + radiusX;
    else if (ball.x > 1 + radiusX) ball.x = -radiusX;
    if (ball.y < -radiusY) ball.y = 1 + radiusY;
    else if (ball.y > 1 + radiusY) ball.y = -radiusY;

    ball.rx = (ball.rx - ball.vy * dt * 2100) % 360;
    ball.ry = (ball.ry + ball.vx * dt * 2100) % 360;
    render();
    requestAnimationFrame(tick);
  }

  async function fetchModel(onProgress) {
    try {
      const cache = await caches.open(MODEL_CACHE);
      const hit = await cache.match(ASSEMBLED_KEY);
      if (hit) {
        onProgress(1);
        return new Uint8Array(await hit.arrayBuffer());
      }
    } catch (_) {}

    const response = await fetch(`${MODEL_BASE}/manifest.json`);
    if (!response.ok) throw new Error(`manifest: HTTP ${response.status}`);
    const { chunks, totalSize } = await response.json();
    let received = 0;

    async function fetchChunk(name) {
      const chunkResponse = await fetch(`${MODEL_BASE}/${name}`);
      if (!chunkResponse.ok) throw new Error(`chunk ${name}: HTTP ${chunkResponse.status}`);
      const reader = chunkResponse.body.getReader();
      const parts = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        parts.push(value);
        received += value.length;
        onProgress(received / totalSize);
      }
      const output = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0));
      let offset = 0;
      for (const part of parts) {
        output.set(part, offset);
        offset += part.length;
      }
      return output;
    }

    const chunksData = await Promise.all(chunks.map(fetchChunk));
    const assembled = new Uint8Array(totalSize);
    let offset = 0;
    for (const chunk of chunksData) {
      assembled.set(chunk, offset);
      offset += chunk.length;
    }
    try {
      const cache = await caches.open(MODEL_CACHE);
      await cache.put(ASSEMBLED_KEY, new Response(assembled.buffer,
        { headers: { 'content-length': String(totalSize) } }));
    } catch (_) {}
    return assembled;
  }

  async function initLLM(buffer) {
    const fileset = await FilesetResolver.forGenAiTasks(MEDIAPIPE_WASM);
    llm = await LlmInference.createFromOptions(fileset, {
      baseOptions: { modelAssetBuffer: buffer },
      maxTokens: 512,
      randomSeed: 42,
      topK: 4,
      temperature: 0.1,
    });
  }

  function runLLM(prompt) {
    return new Promise((resolve, reject) => {
      let response = '';
      try {
        llm.generateResponse(prompt, (partial, done) => {
          response += partial;
          if (done) resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  function observation() {
    return readVisualField();
  }

  function classifyPixel(red, green, blue) {
    if (red < 65 && green < 65 && blue < 65) return 'K';
    if (blue > red * 1.22 && blue > green * 1.2) return 'B';
    if (red > green * 1.35 && red > blue * 1.35) return 'R';
    if (red > 175 && green > 105 && blue < 75) return 'Y';
    return '.';
  }

  function readVisualField() {
    const columns = 5;
    const rows = 5;
    if (!visualSensorReady) return 'sensor-loading';
    const pixels = visualContext.getImageData(0, 0, columns, rows).data;
    const field = Array.from({ length: rows }, (_, y) =>
      Array.from({ length: columns }, (_, x) => {
        const offset = (y * columns + x) * 4;
        return classifyPixel(pixels[offset], pixels[offset + 1], pixels[offset + 2]);
      })
    );
    const mark = (point, symbol) => {
      const x = clamp(Math.floor(point.x * columns), 0, columns - 1);
      const y = clamp(Math.floor(point.y * rows), 0, rows - 1);
      field[y][x] = symbol;
    };
    mark(target, 'T');
    mark(ball, 'M');
    return field.map(row => row.join('')).join('/');
  }

  function initVisualSensor() {
    const image = new Image();
    image.addEventListener('load', () => {
      visualSensor.width = 5;
      visualSensor.height = 5;
      visualContext.drawImage(image, 0, 0, visualSensor.width, visualSensor.height);
      visualSensorReady = true;
    });
    image.src = '{{ "/assets/archer-world.png" | relative_url }}';
  }

  function buildPrompt(sensed) {
    const command = commandInput.value.trim();
    const previous = agent.actions.length ? agent.actions.join(', ') : 'none';
    return `${command ? `User command: ${command}\n` : ''}Previous 3 actions: ${previous}
5x5 view, top row first:
${sensed}
Reply only: L, R, U, or D`;
  }

  function parseAction(response) {
    const direction = response.match(/[LRUD]/)?.[0];
    const actions = {
      L: { label: 'move west',  moveX: -1, moveY: 0 },
      R: { label: 'move east',  moveX: 1,  moveY: 0 },
      U: { label: 'move north', moveX: 0,  moveY: -1 },
      D: { label: 'move south', moveX: 0,  moveY: 1 },
    };
    return actions[direction] || null;
  }

  function castCommand(label) {
    const buttonRect = agentButton.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const command = document.createElement('span');
    const commandText = document.createElement('span');
    command.className = 'aw-command-cast';
    commandText.className = 'aw-command-cast-text';
    commandText.textContent = label;
    command.style.setProperty('--tilt', `${(Math.random() - 0.5) * 6}deg`);
    command.appendChild(commandText);
    document.body.appendChild(command);

    if (reducedMotion) {
      command.style.transform = `translate(${buttonRect.right}px, ${buttonRect.bottom}px)`;
      command.style.opacity = '0';
      setTimeout(() => command.remove(), 180);
      return;
    }

    const start = {
      x: buttonRect.left + buttonRect.width * 0.58,
      y: buttonRect.top + buttonRect.height * 0.55,
    };
    const floor = stageRect.bottom + Math.min(88, stageRect.height * 0.08);
    const velocity = {
      x: stageRect.width * 0.44,
      y: -stageRect.height * 0.16,
    };
    const gravity = stageRect.height * 0.78;
    const fadeStart = stageRect.bottom - stageRect.height * 0.12;
    const spinStart = (Math.random() - 0.5) * 8;
    const spinDirection = Math.random() < 0.5 ? -1 : 1;
    const spinVelocity = spinDirection * (6 + Math.random() * 8);
    const started = performance.now();

    function animate(now) {
      const elapsed = (now - started) / 1000;
      const x = start.x + velocity.x * elapsed;
      const y = start.y + velocity.y * elapsed + 0.5 * gravity * elapsed * elapsed;
      const floorProgress = clamp((y - fadeStart) / (floor - fadeStart), 0, 1);

      command.style.transform = `translate(${x}px, ${y}px) rotate(${spinStart + elapsed * spinVelocity}deg)`;
      command.style.opacity = `${1 - floorProgress * 0.85}`;

      if (y >= floor) {
        command.style.opacity = '0';
        command.remove();
        return;
      }
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  function moveTarget() {
    target.x = 0.15 + Math.random() * 0.7;
    target.y = 0.15 + Math.random() * 0.7;
  }

  async function agentLoop() {
    if (!agent.running || agent.deciding) return;
    const session = agent.session;
    agent.deciding = true;

    const sensed = observation();
    console.log('[archer-world] observation →', sensed);
    if (Math.hypot(target.x - ball.x, target.y - ball.y) < 0.075) {
      thoughtEl.textContent = 'Target reached. Seeking a new point.';
      moveTarget();
      agent.deciding = false;
      actionTimer = setTimeout(agentLoop, 500);
      return;
    }

    try {
      const prompt = buildPrompt(sensed);
      console.log('[archer-world] prompt →', prompt);
      const response = await runLLM(prompt);
      console.log('[archer-world] raw response ←', response);
      if (!agent.running || session !== agent.session) return;
      const action = parseAction(response);
      if (!action) {
        console.warn('[archer-world] parse failed: expected L, R, U, or D');
        throw new Error('invalid motor command');
      }
      console.log('[archer-world] parsed action ←', action);
      agent.step += 1;
      agent.actions.push(response.match(/[LRUD]/)[0]);
      agent.actions = agent.actions.slice(-3);
      thoughtEl.textContent = '';
      castCommand(action.label);
      moveBall(action.moveX, action.moveY);
      await wait(900);
      await wait(300);
      if (session !== agent.session) return;
      const result = observation();
      console.log('[archer-world] action result ←', result);
    } catch (error) {
      console.error('[archer-world] agent error', error);
      thoughtEl.textContent = '';
      await wait(900);
    } finally {
      agent.deciding = false;
      if (agent.running) actionTimer = setTimeout(agentLoop, 0);
    }
  }

  async function startAgent() {
    if (agent.running) {
      agent.running = false;
      agent.session += 1;
      clearTimeout(actionTimer);
      lifeDot.classList.remove('is-active');
      actionEl.textContent = 'reincarnation';
      return;
    }
    if (!navigator.gpu) {
      thoughtEl.textContent = 'The local embodied model requires WebGPU.';
      return;
    }
    agentButton.disabled = true;
    try {
      if (!llm) {
        lifeDot.classList.add('is-active');
        const buffer = await modelBufferPromise;
        await initLLM(buffer);
      }
      agent.running = true;
      agent.session += 1;
      actionEl.textContent = 'extinction';
      lifeDot.classList.add('is-active');
      thoughtEl.textContent = '';
      agentLoop();
    } catch (error) {
      lifeDot.classList.remove('is-active');
      thoughtEl.textContent = error.message;
    } finally {
      agentButton.disabled = false;
    }
  }

  modelBufferPromise = fetchModel(() => {}).catch(error => {
    lifeDot.classList.remove('is-active');
    thoughtEl.textContent = error.message;
    throw error;
  });

  agentButton.addEventListener('click', startAgent);
  initVisualSensor();
  reset();
  moveTarget();
  render();
  requestAnimationFrame(tick);
})();
</script>
