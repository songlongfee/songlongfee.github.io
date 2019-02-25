---
layout:     post
title:      display与transition冲突的处理方法
subtitle:   
date:       2018-10-08
author:     Song
header-img: img/post-bg-coding.jpg
catalog: true
tags:
    - css
---

在使用display:block 与transition实现动画显示与隐藏时，如果dispaly:block与transition同时执行，会导致transition过渡动画无法执行，解决方法是在display:block后延迟执行transition动画，一般20ms即可。
