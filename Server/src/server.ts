import { WebSocketServer } from 'ws';

const wsServer = new WebSocketServer({ port: 8848 });

wsServer.on('connection', ws => {
  console.log("Client connected.");
  // 当有客户端连接时，发送"Online"状态
  ws.send(JSON.stringify({ status: 'Online' }));

  ws.on('close', () => {
    console.log("Client disconnected.");
    // 可以在这里处理客户端断开连接的情况
  });
});

// 当服务端准备关闭时
process.on('SIGINT', () => {
  // 向所有客户端广播"Offline"状态
  wsServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ status: 'Offline' }));
    }
  });

  // 关闭 WebSocket 服务器
  wsServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
