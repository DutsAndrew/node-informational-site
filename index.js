const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {

  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf8');
    });
    return;
  }

  if (req.url === '/about') {
    fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf8');
    });
    return;
  }

  if (req.url === '/contact-me') {
    fs.readFile(path.join(__dirname, 'public', 'contact-me.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf8');
    });
    return;
  }

  fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
    if (err) throw err;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content, 'utf8');
  });
  return;

});

// will run on what host decides, this is in env variable "process.env.PORT", if that isn't found it will
// run on 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});