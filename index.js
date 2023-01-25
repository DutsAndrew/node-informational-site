const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {

  // build file path
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // get extension of file
  let extName = path.extname(filePath);

  // initial content type
  let contentType = 'text/html';

  // check extension for content type
  switch(extName) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // page not found
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      } else {
        // server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // successful response
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });

});

// will run on what host decides, this is in env variable "process.env.PORT", if that isn't found it will
// run on 5000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// old code before reworking to a cleaner solution
  // if (req.url === '/') {
  //   fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
  //     if (err) throw err;
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.end(content, 'utf8');
  //   });
  //   return;
  // }

  // if (req.url === '/about') {
  //   fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
  //     if (err) throw err;
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.end(content, 'utf8');
  //   });
  //   return;
  // }

  // if (req.url === '/contact-me') {
  //   fs.readFile(path.join(__dirname, 'public', 'contact-me.html'), (err, content) => {
  //     if (err) throw err;
  //     res.writeHead(200, { 'Content-Type': 'text/html' });
  //     res.end(content, 'utf8');
  //   });
  //   return;
  // }

  // fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
  //   if (err) throw err;
  //   res.writeHead(200, { 'Content-Type': 'text/html' });
  //   res.end(content, 'utf8');
  // });
  // return;