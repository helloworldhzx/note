# node

## 热启动supervisor
1. npm install -g supervisor
2. 使用 supervisor xxx.js启动

## http api
- 创建服务器
```
var http = require('http');
http.createServer(function (request, response) {
  response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript;httpOnly']); //写入cookie
  response.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"}); // 设置状态码，文件类型编码
  response.end('Hello World');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
```

## url api
- url.parse()
```
url.parse("http://xxx.xx.com?name=zz&age=12",true) 第二个参数为true时将参数转换成对象{name:"zz",age:11}
```  
- url.format(urlBbj) //url.parse()的逆向操作
- url.resolve(from,to) //添加或者替换地址

## fs api
- fs.stat 检测是文件还是文件夹
```
const fs = require('fs')
fs.stat('./hello.js', (error, stats) =>{
    stats.isFile() // true文件
    stats.isDirectory() // true文件夹
})
```  
- fs.mkdir 创建文件夹
```
const fs = require('fs')
fs.mkdir('./hello.js', (error) =>{})
```  
- fs.writeFile 创建写入文件
```
// 文件不存在先创建再写入
fs.writeFile('logs/hello.log', '您好~', (error) => {})
```  
- fs.appendFile 追加文件
```
fs.appendFile('logs/hello.log', 'hello ~ \n', (error) => {})
```  
- fs.readFile 读取文件
```
const fs = require('fs')
fs.readFile('logs/hello.log', 'utf8', (error, data) =>{})
```  
- fs.readdir 读取目录
```
const fs = require('fs')
fs.readdir('logs', (error, files) => {})
```  
- fs.rename 重命名
```
// 地址不相同时相当于移动文件和修改名称
const fs = require('fs')
fs.rename('js/hello.log', 'js/greeting.log', (error) =>{})
```  
- fs.rmdir 删除目录
```
// 文件夹下文件需要先删除完
fs.rmdir('logs', (error) =>{})
```  
- fs.unlink 删除文件
```
fs.unlink(`logs/${file}`, (error) => {})
```  
- 读取文件流
```
var fs = require("fs");
var readStream = fs.createReadStream("./a.txt");

var count = 0
readStream.on("data",(data)=>{
    count++
})
readStream.on("end",()=>{
    console.log(count)
})
readStream.on("error",(err)=>{
    console.log(err)
})
```  
- 写入文件流
```
var str = ""
for(var i=0;i<500;i++){
    str+="呱唧呱唧钢结构好几个和规划局高合金钢呱唧呱唧钢结构好几个和规划局高合金钢"
}
var fs = require("fs");
var writeStream = fs.createWriteStream("./b.txt");
writeStream.write(str);

writeStream.end(); // 写入结束，不加这个之后on不执行

writeStream.on("finish",()=>{
    console.log("写入成功")
})
```  
- 管道流
```
var fs = require("fs");
var readStream = fs.createReadStream("./b.txt");
var writeStream = fs.createWriteStream("./file/b.txt");
writeStream.pipe(readStream) // 将读取的文件通过管道写入
```
