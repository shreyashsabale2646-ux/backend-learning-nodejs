const http = require('http');

// Creating a basic HTTP server
const server = http.createServer((req, res) => {
    
    const url=req.url;

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

    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server</h1></body>');
    res.write('</html>');

    res.end();
});

server.listen(3000);