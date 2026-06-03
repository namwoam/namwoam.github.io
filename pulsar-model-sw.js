self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

const MODEL_BASE_URL = new URL('./_model/', self.location.href);
const ONNX_DATA_PATH = new URL('model_q4.onnx_data', MODEL_BASE_URL).pathname;

async function fetchJson(url) {
  const resp = await fetch(url, { cache: 'no-store' });
  const text = await resp.text();
  if (!resp.ok) throw new Error(`${url.pathname}: HTTP ${resp.status}`);
  if (!text.trim()) throw new Error(`${url.pathname}: empty JSON response`);

  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`${url.pathname}: invalid JSON (${err.message})`);
  }
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname !== ONNX_DATA_PATH) return;

  event.respondWith((async () => {
    const manifest = await fetchJson(new URL('manifest.json', MODEL_BASE_URL));
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for (const chunk of manifest.externalDataChunks) {
            const resp = await fetch(new URL(chunk, MODEL_BASE_URL));
            if (!resp.ok) throw new Error(`${chunk}: HTTP ${resp.status}`);
            const reader = resp.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              controller.enqueue(value);
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'content-length': String(manifest.externalDataSize),
        'content-type': 'application/octet-stream',
      },
    });
  })());
});
