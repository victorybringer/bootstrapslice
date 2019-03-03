﻿# Info
 基于nuptzyz/llvm-slicing,在此镜像基础上配置了Node.js模块，实现C语言程序在线切片<br>
 更多信息请查看 `https://github.com/zhangyz/llvm-slicing`<br>
# Example
 可访问阿里云服务器 `http://101.132.129.85:8000` 查看实例
# Install 
## 1.使用预构建的Docker镜像<br>
 `docker run -it -p 8000:8000 -p 8080:8080 victorybringer/bootstrapslice`<br>
## 2.或使用Dockerfile进行构建<br>
 `docker build -t victorybringer/bootstrapslice .`<br>
 ## 构建完成后<br>
 `docker run -it -p 8000:8000 -p 8080:8080 victorybringer/bootstrapslice`<br>
# Run
 `localhost:8000`<br>

