var fs = require("fs");
/*
var fs = require("fs")

fs.readFile("./README.md",function(err,data){
    console.log(err)
    console.log(data.toString())
})
*/

/*

// 读取文件流
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
*/

/*

// 写入文件流
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
*/

/**
//管道流
var fs = require("fs");
var readStream = fs.createReadStream("./b.txt");
var writeStream = fs.createWriteStream("./file/b.txt");

writeStream.pipe(readStream) // 将读取的文件通过管道写入
 * 
 */

 /* 是文件还是文件夹
 var fs = require("fs");
 fs.stat("./file/a.txt",(err,stats)=>{
     console.log(err)
    console.log(stats.isFile());
    console.log(stats.isDirectory());
 }) */

/*  创建文件夹
fs.mkdir("./file2",(err)=>{
    console.log(err)
}) */

/* 写入文件
fs.writeFile("./file/c.txt","vvdfsh",(err)=>{
    console.log(err)
}) */

/* 读取文件
fs.readFile("./file/c.txt",(err,data)=>{
    console.log(err);
    console.log(data.toString())
}) */

/* 追加文件
fs.appendFile("./file/c2.txt",",,,,,,cnm",(err)=>{
    console.log(err)
}) */

/* 读取目录
fs.readdir("./file/a.txt",(err,data)=>{
    console.log(err);
    console.log(data)
}) */


// fs.rename("./file/c1.txt","./file2/c1.txt",()=>{})

/* fs.unlink("./file2/c1.txt",()=>{})
fs.rmdir("./file2",(err)=>{
    console.log(err)
}) */