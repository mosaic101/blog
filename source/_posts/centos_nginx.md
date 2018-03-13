---
title: centos下安装nginx
date: 2016-11-03
categories: linux
tags: linux

---

nginx是一个高性能的HTTP和反向代理服务器；我的vps下安装的是32位的centos系统；
<!--more-->
 
### 一、遇到的坑
- centos下自带的yum包管理工具是不带nginx
```bash
$ yum info nginx 
```
- 在yum里没有对应的nginx包

- 然后我就去找各种文章，也去过centos中文网搜相关文章，大部分都是下载二进制文件，然后编译！找了好几篇centos下安装nginx的文章，每篇内容都不太一样，一些细节处也写的不太清楚；我自己折腾了半天，怎么都编译不成功！

### 二、另辟蹊径
- centos是基于RedHat的开源项目，也可以使用rpm包管理工具；到nginx官网下载相应版本的包(i386为32位)；https://nginx.org/packages/rhel/6/i386/RPMS/
- 用wget下载
```bash
$ wget https://nginx.org/packages/rhel/6/i386/RPMS/nginx-1.8.1-1.el6.ngx.i386.rpm
```
- 安装
```bash
$ rpm -ivh nginx-1.8.1-1.el6.ngx.i386.rpm
```
- 默认启动
```bash
$ /etc/init.d/nginx start
```

### 三、简单用法
- nginx默认安装在 /usr/local/nginx

- 重启nginx
```bash
$ cd  /usr/local/nginx/sbin
$ nginx -s reload
```
- 有些在重启nginx的时候会报错，缺少nginx.pid文件
```bash
nginx: [error] open() "/usr/local/nginx/logs/nginx.pid" failed
```
- 解决方案
```bash
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
```

### 四、PS
- 以上命令，如果是非root账户，需要加sudo -

### 五、补充 
- 补充于 2016-11-08
- yum添加epel源(epel是fedora维护的yum源，里面软件众多)，可以解决yum安装nginx的问题，同样适用于安装redis
```bash
$ yum install epel-release //添加epel源
$ yum install nginx //安装nginx
```
