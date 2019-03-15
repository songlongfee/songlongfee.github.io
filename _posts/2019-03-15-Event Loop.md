---
layout:     post
title:      Event Loop 执行栈 任务队列
subtitle:   
date:       2019-03-15
author:     Song
header-img: img/post-bg-coding.jpg
catalog: true
tags:
    - event loop 异步 执行栈 任务队列
---

一个典型的例子
```
setTimeout(function(){console.log(1);}, 0);
console.log(2);
```
执行结果为始终为 2 1
JavaScript异步执行运行机制:
1.所有同步任务都在主线程上执行，形成一个执行栈。
2.线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3.一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"。
3.主线程不断重复上面的第三步。
只要主线程空了，就会去读取"任务队列"。
主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。
