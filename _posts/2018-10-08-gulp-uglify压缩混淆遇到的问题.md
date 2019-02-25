---
layout:     post
title:      gulp-uglify压缩混淆遇到的问题
subtitle:   
date:       2018-10-08
author:     Song
header-img: img/post-bg-coding.jpg
catalog: true
tags:
    - js 压缩 混淆 gulp gulp-uglify gulp-util
---

在使用gulp-uglify进行js代码的压缩时有时会遇到报错导致压缩程序运行失败的问题，我在项目中遇到的报错原因主要有两个：1. js语法错误，导致在运行压缩时报错；2. 由于使用ES6语法而未做ES5转换，导致压缩报错。

对于无法理解的报错，可以使用gulp-util工具打印报错信息

```
var gutil = require('gulp-util');

gulp.src().pipe().on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); }).pipe()
```