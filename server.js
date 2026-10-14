/* ==========================================================================
   MUHAMMAD ABBAS NADEEM — PORTFOLIO BACKEND SERVER (Node.js & Express)
   ========================================================================== */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Ensure messages log file exists
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]), 'utf8');
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`[${req.method}] ${req.url}`);

  // Handle Contact Form Backend Submission Endpoint
  if (req.method === 'POST' && req.url === '/api/contact') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const newMessage = {
          id: Date.now(),
          name: data.name,
          email: data.email,
          message: data.message,
          timestamp: new Date().toISOString()
        };

        // Save message to messages.json
        const existingMessages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
        existingMessages.push(newMessage);
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existingMessages, null, 2), 'utf8');

        console.log('📥 New message received:', newMessage);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Message saved successfully!' }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON data' }));
      }
    });
    return;
  }

  // Serve Static Files
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
  let extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Portfolio backend server is running on http://localhost:${PORT}`);
});
