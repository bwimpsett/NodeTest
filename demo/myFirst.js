const http = require('http');
const url = require('url');
const dt = require('./myFirstModule');

http.createServer(function(req, res){
    let q = url.parse(req.url, true).query;
    let text = `${q.year} ${q.month}`;

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<p>The current date and time is ${dt.myDateTime()}</p>`);
    res.write(`<p>${req.url}</p>`);
    res.end(text);
}).listen(8080);