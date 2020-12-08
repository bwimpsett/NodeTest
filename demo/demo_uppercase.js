const http = require('http');
const uc = require('upper-case');

//demo of using an imported library upper-case

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(uc.upperCase("Hello World!"));
  res.end();
}).listen(8080);