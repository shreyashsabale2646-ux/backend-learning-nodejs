const http = require('http');
const fs= require('fs');

// Creating a basic HTTP server
const server = http.createServer((req, res) => {
    
    const url=req.url;
    const method=req.method;

    if(url === "/"){
        res.setHeader('Content-Type', 'text/html');

        res.write('<html>');
        res.write('<head><title>Enter the msg</title></head>');
        res.write('<body>');
         res.write('<form action="/message" method="POST">')
        res.write('<input type="text" name="message">');
        res.write('<button type="submit">Send</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');

        return res.end();
    }

    if(url === "/message" && method === "POST"){
        const body=[];

        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end',()=>{  //event fire when all data is recived
            const parsedBody=Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];

            fs.writeFile('message.txt', message, ()=>{ //fs.writeFileSyn('message.txt,message) its blocks the code until its executed 
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });
        });

        return;
    }

    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server</h1></body>');
    res.write('</html>');

    res.end();
});

server.listen(3000);