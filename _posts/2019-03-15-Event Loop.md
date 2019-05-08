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
setTimeout()/console.log(2)为同步任务，在主线程中执行，setTimeout回调函数为异步任务，setTimeout执行后将回调函数加入任务队列，待主线程任务执行完成后开始执行任务队列中的可执行任务。

所谓"回调函数"（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。

[Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

JavaScript异步执行运行机制:
1.所有同步任务都在主线程上执行，形成一个执行栈。
2.线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3.一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"。
3.主线程不断重复上面的第三步。
只要主线程空了，就会去读取"任务队列"。
主线程从"任务队列"中读取一个可执行事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。
