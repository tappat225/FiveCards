
Change source for npm:

npm config set registry https://registry.npmmirror.com

Start server:

```bash
node server.js
```

修改Server.js的代码，要求服务端初次启动时初始化数据库，数据库可存储玩家的名称、积分、排名，这三个信息，若数据库已存在，但数据库中缺少表字段，例如，只有名称，没有积分和排名段，则在已有数据库上新增缺少的段


## 一些坑

阿里云镜像地址提供的最新Node.js v10.19.0版本对于"webpack": "^5.89.0", "webpack-cli": "^5.1.4"不支持，需要更新到v11.0.0。不过最新版早都到20以上了，直接去官网下载安装就行。
