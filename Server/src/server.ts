import { WebSocketServer } from 'ws';
import { randomBytes } from 'crypto';

// 生成随机ID的函数
const generateRandomId = (): string => {
    const idLength = 6; // 设置ID的长度
    const rdBytes = randomBytes(idLength);
    const id = rdBytes.toString('hex');
    return id;
};

function initWebSocket() {
    const wsServer = new WebSocketServer({ port: 8848 });

    wsServer.on('connection', ws => {
        const client_id = generateRandomId();
        console.log("Client connected, id: ", client_id);

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());

                // 检查是否包含身份标识
                if (data.identity === 'Manager') {
                    // 处理Manager身份的客户端
                    console.log('Received message from Manager:', data.message);
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });

        ws.send(JSON.stringify({ status: 'Online' }));

        ws.on('close', () => {
            console.log("Client disconnected, id: ", client_id);

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
}

function main() {
    initWebSocket();
}

main();
