const http = require('http');
const fs = require('fs');
const path = require('path');
const root = process.argv[2] || '.';
const port = parseInt(process.argv[3]) || 8079;
const server = http.createServer((req, res) => {
  let filePath = path.join(root, req.url === '/' ? '/index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = ext === '.html' ? 'text/html' : ext === '.js' ? 'application/javascript' : ext === '.css' ? 'text/css' : ext === '.json' ? 'application/json' : ext === '.png' ? 'image/png' : ext === '.jpg' ? 'image/jpeg' : ext === '.webp' ? 'image/webp' : 'application/octet-stream';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});
server.listen(port, () => console.log('Server running at http://localhost:' + port));
