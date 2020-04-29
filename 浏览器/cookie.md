# [cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies) 

## 创建cookie
当服务器收到HTTP请求时，服务器可以在响应头里面添加一个<font color="red">Set-Cookie</font>选项。浏览器收到响应后通常会保存下Cookie，之后对该服务器每一次请求中都通过Cookie请求头部将Cookie信息发送给服务器。

```
Set-Cookie: <cookie名>=<cookie值>
```

## 会话期cookie Expires/Max-Age = session
会话期Cookie是最简单的Cookie：浏览器关闭之后它会被自动删除

## 持久性cookie
持久性Cookie指定了一个特定的过期时间（Expires）或有效期（Max-Age）。
```
node 设置expries 时间需要比当前时间大，不然是过期时间不添加
response.setHeader('Set-Cookie', ['id=a3fWa;Expires=Wed, 21 Oct 2020 07:28:00 GMT', 'language=javascript;httpOnly']);
```  
## Cookie的Secure 和HttpOnly
标记为 Secure 的Cookie只应通过被HTTPS协议加密过的请求发送给服务端。  
设置了httpOnly使用document.cookie读取不到

## Cookie的作用域 Domain 和 Path
Domain 标识指定了哪些主机可以接受Cookie。如果不指定，默认为当前文档的主机（不包含子域名）。如果指定了Domain，则一般包含子域名。  
Path 标识指定了主机下的哪些路径可以接受Cookie  path=/aa  当访问/路径时cookie不保存，访问/aa时保存

## SameSite
- none  
  浏览器会在同站请求、跨站请求下继续发送cookies，不区分大小写。
- Strict  
  浏览器将只发送相同站点请求的cookie
- Lax  
  会为一些跨站子请求保留，如图片加载或者frames的调用，但只有当用户从外部站点导航到URL时才会发送