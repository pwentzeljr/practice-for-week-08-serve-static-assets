const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {
  // Your code here
  let resBody;

  if (req.method === 'GET' && req.url === '/') {
    resBody = fs.readFileSync('./index.html');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(resBody);
    return res.end();
  }

  if (req.method === 'GET' && req.url.startsWith('/static')) {
    const [root, static, ...path] = req.url.split('/');

    resBody = fs.readFileSync(`./assets/${path.join('/')}`);

    const fileName = path[path.length - 1];
    const fileType = fileName.slice(fileName.lastIndexOf('.') + 1);

    res.statusCode = 200;
    if (fileType === 'css') res.setHeader('Content-Type', 'text/css');
    if (fileType === 'jpg') res.setHeader('Content-Type', 'image/jpg');

    res.write(resBody);
    return res.end();
  }


  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Requested content not found.')

});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
