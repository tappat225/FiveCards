// server.ts

import { Server } from 'ws';

const server = new Server({ port: 8848 });

server.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message: ${message}`);
    });

    ws.send('Connection established');
});

console.log('WebSocket server started on ws://localhost:8848');
