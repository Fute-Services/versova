const http = require('http');
const fs = require('fs');
const path = require('path');

const WEB_DIR = path.join(__dirname, 'web');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Connected live-reload clients
const sseClients = new Set();

// Watch web directory for changes
let reloadDebounce = null;
try {
  fs.watch(WEB_DIR, { recursive: true }, (eventType, filename) => {
    if (reloadDebounce) clearTimeout(reloadDebounce);
    reloadDebounce = setTimeout(() => {
      console.log(`[Auto-Reload] File changed: ${filename}. Reloading browser...`);
      for (const client of sseClients) {
        try {
          client.write(`data: reload\n\n`);
        } catch (e) {
          sseClients.delete(client);
        }
      }
    }, 150);
  });
} catch (e) {
  console.log('Watch error:', e);
}

const LIVE_RELOAD_SCRIPT = `
<!-- Automatic Instant Live Reload Script -->
<script>
  (function() {
    let source = new EventSource('/live-reload-sse');
    source.onmessage = function(event) {
      if (event.data === 'reload') {
        console.log('[LiveReload] Refreshing page automatically...');
        window.location.reload();
      }
    };
    source.onerror = function() {
      // Reconnect after brief pause if disconnected
      setTimeout(() => {
        new EventSource('/live-reload-sse').onmessage = () => window.location.reload();
      }, 2000);
    };
  })();
</script>
`;

function handler(req, res) {
  // Live reload SSE endpoint
  if (req.url === '/live-reload-sse') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write(': connected\n\n');
    sseClients.add(res);
    req.on('close', () => sseClients.delete(res));
    return;
  }

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(WEB_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Server Error');
        return;
      }

      // If HTML, inject instant live-reload client script before </body>
      if (ext === '.html') {
        let htmlStr = content.toString('utf-8');
        if (htmlStr.includes('</body>')) {
          htmlStr = htmlStr.replace('</body>', `${LIVE_RELOAD_SCRIPT}</body>`);
        } else {
          htmlStr += LIVE_RELOAD_SCRIPT;
        }
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
        });
        res.end(htmlStr);
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
        });
        res.end(content);
      }
    });
  });
}

function startServer(port) {
  const server = http.createServer(handler);
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
  server.listen(port, () => {
    console.log(`Server running with Instant Live-Reload at http://localhost:${port}/`);
  });
}

startServer(3000);
