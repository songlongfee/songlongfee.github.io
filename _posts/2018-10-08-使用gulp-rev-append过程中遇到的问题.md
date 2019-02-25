---
layout:     post
title:      使用gulp-rev-append过程中遇到的问题
subtitle:   
date:       2018-10-08
author:     Song
header-img: img/post-bg-coding.jpg
catalog: true
tags:
    - gulp gulp-rev-append scss 文件添加版本号
---
对于采用scss等预处理语言开发的项目来说，如在页面引用css文件，因为css文件在开发时是不存在，所以无法用gulp-rev-append对引用的css文件添加hash格式的版本号，gulp-rev-append添加文件版本号的原理是通过读取文件内容生成相应的md5值，这样在文件内容有变化时就会生成新的md5值，而未修改的文件其生成的md5值不变，从而实现自动给文件添加版本号。
解决方法是在页面引入scss文件，再修改gulp-rev-append源码将scss后缀修改为css。

```
line = line.replace(groups[2], hash.digest('hex'));

//修改为

line = line.replace(groups[2], hash.digest('hex')).replace('.scss?v','.css?v');

//将dist目录下的scss引用替换为css引用。
```

对已手动添加版本号的项目，gulp-rev-append默认匹配rev后缀的版本号，需自己修改为当前匹配的后缀名，
```
var FILE_DECL = /(?:href=|src=|url\()['|"]([^\s>"']+?)\?rev=([^\s>"']+?)['|"]/gi;
//line 9
//默认rev，根据需要修改为要匹配的值
```