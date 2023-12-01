// websocket.js
const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });

    // WebSocket 连接逻辑
    wss.on('connection', (ws) => {
    console.log('Client connected');

    // 接收消息并处理
    ws.on('message', (message) => {
        console.log('Received:', message);
        // 处理接收到的消息...
    });

    // 断开连接时的处理
    ws.on('close', () => {
        console.log('Client disconnected');
        // 处理断开连接...
    });
});

    return wss;
};
