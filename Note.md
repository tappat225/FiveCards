
Change source for npm:

npm config set registry https://registry.npmmirror.com

Start server:

```bash
node server.js
```

修改Server.js的代码，要求服务端初次启动时初始化数据库，数据库可存储玩家的名称、积分、排名，这三个信息，若数据库已存在，但数据库中缺少表字段，例如，只有名称，没有积分和排名段，则在已有数据库上新增缺少的段
