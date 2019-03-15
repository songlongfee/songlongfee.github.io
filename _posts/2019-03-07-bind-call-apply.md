---
layout:     post
title:      bind/call/apply
subtitle:   
date:       2019-03-07
author:     Song
header-img: img/post-bg-coding.jpg
catalog: true
tags:
    - bind/call/apply
---

call() 方法调用一个函数, 其具有一个指定的this值和分别地提供的参数(参数的列表)。
apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。
bind() 方法创建一个新的函数，在调用时设置this关键字为提供的值。并在调用新函数时，
将给定参数列表作为原函数的参数序列的前若干项。
bind() 函数会创建一个新绑定函数（bound function，BF）。绑定函数是一个
exotic function object（怪异函数对象，ECMAScript 2015中的术语），它包装了原函数对象。
调用绑定函数通常会导致执行包装函数。j[attrName] = '123';
