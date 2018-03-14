---
title: Nodejs 中几个 Excel 模块的简单对比
date: 2016-12-06
categories: Nodejs
tags: [Excel]
---

找了4个star较多的且还在维护的excel模块测试一下，导入问题不大，主要测试的是导出功能。
<!--more-->

选择
===
- exceljs (支持复杂导出，功能齐全；文档写的太烂，反正我是看了大半天，[github地址](https://github.com/guyonroche/exceljs))
- ejsexcel (支持复杂导出，功能齐全；国内大牛的开源项目，基于ejs模板渲染，[github地址](https://github.com/sail-sail/ejsExcel))
- node-xlsx (不支持复杂导出；基于js-xlsx，功能比较简单，[github地址](https://github.com/mgcrea/node-xlsx))
- excel-export (不支持复杂导出；需要一个xml作为导出模板，比较麻烦；且超过10个月没维护，[github地址](https://github.com/functionscope/Node-Excel-Export))

工具
====
- node_7.0.0
- 31056条数据(一条记录，22个字段)

结果
====
简单的处理数据源并生成.xlsx文件,耗时仅为excel模块处理数据的时间
- excel-export: 4314ms
- ejsexcel: 5128ms
- exceljs: 3250ms
- node-xlsx: 3353ms

耗时比较:
exceljs < node-xlsx < excel-export < ejsexcel

结论
===
- 简单的导出就用node-xlsx模块，excel-export貌似已不维护，在生产上已出现过几次未知崩溃
- 复杂的导出可以优先选择ejsexcel，相对于exceljs而言，更简单更酷






