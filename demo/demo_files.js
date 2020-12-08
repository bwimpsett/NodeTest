const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
    let saved = false;

    fs.readFile('../html/demofile.html', function(err, data){
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
    if(!saved) {
        fs.writeFile('../briantest.txt', 'Hi from brian', function(err, file){
            if(err) throw err;
            console.log('Saved!');
            saved = true;
        });

        fs.unlink('../briantest.txt', function(err, file) {
            if(err) throw err;
            console.log('Deleted!');
        });        
    }    
}).listen(8080);