var http = require('http');
var url = require("url")
http.createServer(function (request, response) {
  // url http://localhost:8081/?name=%3Cscript%3Ealert(123)%3C/script%3E
  let query=url.parse(request.url, true).query;
  console.log(query)
  response.writeHead(200, {'Content-Type': "text/html;charset=UTF-8"});
  // 节点上的xss
  // response.end(`<div>${query.name}</div>`);

  // 属性上的xss
  // http://localhost:8081/?name=aaaa%20onerror=javascript:alert(111)
  // response.end(`<image src=${query.name} />`);

  // js上xss
  // http://localhost:8081/?name=%2211234%22;alert(111)
  response.end(`<div>
    <p>123</p>
    <script>
      var a = ${query.name}
      console.log(a)
    </script>
  </div>`);
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');