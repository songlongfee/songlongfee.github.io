---
layout:     post
title:      prototype和__proto__
subtitle:   
date:       2019-03-22
author:     Song
header-img: img/post-bg-coding.jpg
catalog: true
tags:
    - prototype __proto__ 原型 原型链
---
1.  **prototype** 是函数(function) 的一个属性, 它指向函数的原型.
2.  **__proto__** 是对象的内部属性, 它指向构造器的原型, 对象依赖它进行原型链查询.

由上, **prototype** 只有函数才有, 其他(非函数)对象不具有该属性. 而 **__proto__** 是对象的内部属性, 任何对象都拥有该属性.
```
function Person () {}
let person = new Person()
```

![Person.prototype]($resource/1.png)

![Person__proto__]($resource/2.png)

