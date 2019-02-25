---
layout:     post
title:      node+WebSocket即时通讯
subtitle:   
date:       2018-08-12
author:     Song
header-img: img/post-bg-unix-linux.jpg
catalog: true
tags:
    - node nodejs WebSocket IM
---

最近工作中遇到了IM相关的内容，由于之前采用的nodejs和websocket实现，所以抽空了解了一下，写了个简易demo方便日后翻看。

> WebSocket是HTML5开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。<br>
> 在WebSocket API中，浏览器和服务器只需要做一个握手的动作，然后，浏览器和服务器之间就形成了一条快速通道。两者之间就直接可以数据互相传送。<br>
> 浏览器通过 JavaScript 向服务器发出建立 WebSocket 连接的请求，连接建立以后，客户端和服务器端就可以通过 TCP 连接直接交换数据。<br>
> 当你获取 Web Socket 连接后，你可以通过 send() 方法来向服务器发送数据，并通过 onmessage 事件来接收服务器返回的数据。<br>
> 以下 API 用于创建 WebSocket 对象：<br>
> &ensp;&ensp;`var ws = new WebSocket(url, [protocol] )`<br>
> 以上代码中的第一个参数 url, 指定连接的 URL。第二个参数 protocol 是可选的，指定了可接受的子协议。<br>
> WebSocket 属性<br>
> &ensp;&ensp;`ws.readyState`  0 - 表示连接尚未建立。 1 - 表示连接已建立，可以进行通信。 2 - 表示连接正在进行关闭。 3 - 表示连接已经关闭或者连接不能打开。<br>
> WebSocket 事件<br>
> &ensp;&ensp;open	`ws.onopen`	连接建立时触发<br>
> &ensp;&ensp;message	`ws.onmessage`	客户端接收服务端数据时触发<br>
> &ensp;&ensp;error	`ws.onerror`	通信发生错误时触发<br>
> &ensp;&ensp;close	`ws.onclose`	连接关闭时触发<br>
> WebSocket 方法<br>
> &ensp;&ensp;`ws.send()`   使用连接发送数据<br>
> &ensp;&ensp;`ws.close()`  关闭连接<br>

1. 创建WebSocket服务

```
var ws = require('nodejs-websocket');
console.log("开始建立WebSocket连接...")

var song = null, peng = null;
var server = ws.createServer(function (conn) {
conn.on("text", function (str) {
    if(str === 'start_song') {
    song = conn;
    }
    if(str === 'start_peng') {
    peng = conn;
    }
    console.log(`收到消息：${str}`);
    song && song.sendText(str);
    peng && peng.sendText(str);
})
conn.on("close", function (code, reason) {
    console.log("关闭连接");
})
conn.on("error", function (code, reason) {
    console.log("异常关闭")
})
}).listen(8001)
console.log('WebSocket连接已建立...');
```

2. 页面创建ws监听

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>WebSocket</title>
</head>
<body>
<input id="msgBox"/>
<button id="btn">发送</button>
<div id="contact">
    <div>会话：</div>
</div>
<script>
    var ws = new WebSocket('ws://127.0.0.1:8001');
    ws.onopen = function (e) {
    console.log("song-连接服务器成功");
    ws.send('start_song');//建立一个WebSocket连接
    }
    ws.onclose = function (e) {
    console.log("服务器关闭");
    }
    ws.onerror = function () {
    console.log("连接出错");
    }
    ws.onmessage = function (e) {
    if(e.data !== 'start_song' && e.data !== 'start_peng') {
        let p = document.createElement('p');
        p.innerText = e.data;
        document.getElementById('contact').append(p);
    }
    }
    document.getElementById('btn').onclick = function () {
    let msg = document.getElementById('msgBox').value;
    document.getElementById('msgBox').value = '';
    ws.send(msg);
    }
</script>
</body>
</html>
```

3. 在另一个页面创建ws监听

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>WebSocket</title>
</head>
<body>
<input id="msgBox"/>
<button id="btn">发送</button>
<div id="contact">
    <div>会话：</div>
</div>
<script>
    var ws = new WebSocket('ws://127.0.0.1:8001');
    ws.onopen = function (e) {
    console.log("song-连接服务器成功");
    ws.send('start_song');//建立一个WebSocket连接
    }
    ws.onclose = function (e) {
    console.log("服务器关闭");
    }
    ws.onerror = function () {
    console.log("连接出错");
    }
    ws.onmessage = function (e) {
    if(e.data !== 'start_song' && e.data !== 'start_peng') {
        let p = document.createElement('p');
        p.innerText = e.data;
        document.getElementById('contact').append(p);
    }
    }
    document.getElementById('btn').onclick = function () {
    let msg = document.getElementById('msgBox').value;
    document.getElementById('msgBox').value = '';
    ws.send(msg);
    }
</script>
</body>
</html>
```

4. 开启node环境，执行wsServer.js代码 `node wsServer.js`

5. 在index和client页面即可进行通讯

具体项目代码查看[https://github.com/songlongfee/nodejs-WebSocket-instant-message](https://github.com/songlongfee/nodejs-WebSocket-instant-message)
