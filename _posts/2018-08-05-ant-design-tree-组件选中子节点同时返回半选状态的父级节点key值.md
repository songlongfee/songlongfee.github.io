---
layout:     post
title:      ant design tree 组件选中子节点同时返回半选状态的父级节点key值
subtitle:   
date:       2018-08-05
author:     Song
header-img: img/post-bg-unix-linux.jpg
catalog: true
tags:
    - ant-design tree react
---

ant design `tree` 子节点非全选状态下只返回当前子节点`key`值，后台保存时需要父级节点`key`值

解决方法：在 `onCheck (val, event)` 的`event`事件对象有一个`halfCheckedKeys`属性，此属性包含了处于半选中状态的节点`key`值，将此数组与`val`合并即可。

