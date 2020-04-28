var http = require("http")

const server = http.createServer();

server.on("request", function (request, response) {
    // response.write(request.head)
    response.setHeader('Set-Cookie', ['id=a3fWa;Expires=Wed, 21 Oct 2020 07:28:00 GMT', 'language=javascript; Domain=192.168.137.1']);
    response.writeHead(200, "4444", { "Content-Type": "text/html;charset=UTF-8" });
    // response.writeHead(200, "4444", { "Content-Type": "text/html;charset=UTF-8",'Set-Cookie': 'SSID=Ap4GTEq; Expires=Wed, 13-Jan-2021 22:23:01 GMT;HttpOnly' });
    /* http.get('http://localhost:3001', (res) => {
        console.log(res)
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    }); */
    response.end("asd按时发广告")
})

server.listen(3000)
