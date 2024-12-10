const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`Server request: ${req.url}`);

  const createPath = (filePath) => path.resolve(__dirname, 'endterm', filePath);

  let basePath = '';
  let contentType = 'text/html';
  
  if (req.url === '/') {
   basePath = createPath('endterm.html');
 } else {
   basePath = createPath(req.url.slice(1)); // Удаляет первый слэш, чтобы корректно находить файлы
 }


  switch (true) {
    case req.url === '/':
      basePath = createPath('endterm.html'); // Главная страница
      break;
    case req.url.endsWith('style.css'):
      basePath = createPath(req.url.slice(1)); // Путь к CSS
      contentType = 'text/css';
      break;
    case req.url.endsWith('script.js'):
      basePath = createPath(req.url.slice(1)); // Путь к JS
      contentType = 'text/javascript';
      break;
    case req.url.endsWith('.gif') || req.url.endsWith('.jpg') || req.url.endsWith('.jpeg'):
      basePath = createPath(req.url.slice(1)); // Путь к изображениям
      contentType = `image/${path.extname(req.url).slice(1)}`;
      break;
    default:
      basePath = createPath('404.html'); // Страница 404
      contentType = 'text/html';
      break;
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>Page not found</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`Server is listening on http://localhost:${PORT}`);
});
