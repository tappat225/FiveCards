// server.ts

import { UserInfo } from './user';
import { Server } from 'ws';

const server_port: number = 8848;

// 用于生成唯一 connectId 的函数
function generateUniqueConnectId(): string {
    return Math.random().toString(36).slice(2, 11);
}

function main() {
    const server = new Server({ port: server_port });
    const user = new UserInfo();

    server.on('connection', ws => {
        ws.on('message', message => {
            console.log(`Received message: ${message}`);
        });

        ws.send('Connection established');
    });

    console.log('WebSocket server started on ws://localhost:' + server_port);
}

main();
