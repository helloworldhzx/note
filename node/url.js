const url = require("url")

var api = "http；//www.baidu.com?name=123&age=23"
console.log(url.parse(api,true))