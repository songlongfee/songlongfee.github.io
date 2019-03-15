---
layout:     post
title:      npm 发布 module
subtitle:   
date:       2019-03-05
author:     Song
header-img: img/post-bg-coding.jpg
catalog: true
tags:
    - npm publish
---

注册npm账号
本地新建目录，npm init 初始化项目
添加模块代码
以管理员权限开启命令行
登录npm 执行 npm login 命令
发布module cd到上级目录，执行 npm publish moduleName 命令，moduleName为模块名称
更新版本 执行 npm version edition，更新package.json中的版本号，其中 edition 为版本号
再次执行 npm publish moduleName 命令
