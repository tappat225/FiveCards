
import * as WebSocket from 'ws';
// import { WebSocketServer, Server } from 'ws';
import { randomBytes } from 'crypto';

/** websocket handler */
class wsHanlder {
    private ws: WebSocket;
    private clientID: string;   // Unque id for each connection.
    private uid: string;        // user id, bind with specific user.
    private identity: string;

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.clientID = this.generateRandomId();
        this.identity = "undefined";
        this.uid = "undefined";
    }

    handleMessage(wss: WSServer): void {
        const userList = wss.userList;
        const ws = this.ws;

        ws.on('message', (message: string) => {
            try {
                const data = JSON.parse(message);
                const identity = data.identity;

                // 检查是否包含身份标识
                if (identity === 'Manager') {
                    console.log('Received message from Manager.');
                    ws.send(JSON.stringify({ status: 'Online' }));
                }

                if (identity === 'User') {
                    const uid = data.uid;
                    console.log('Received message from User: ', uid);
                    userList.push(uid);
                    ws.send(JSON.stringify({ userList: userList }));
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });
    }

    handleClose(wss: WSServer): void {
        const userList = wss.userList;
        const ws = this.ws;
        const clientID = this.clientID;
        const identity = this.identity;
        const uid = this.uid;

        ws.on('close', () => {
            console.log("Client disconnected, id: ", clientID);
            if (identity === 'User') {
                const index = userList.indexOf(uid);
                if (index != -1) {
                    userList.splice(index, 1);
                }
            }
        });
    }

    // 生成随机ID的函数
    generateRandomId = (): string => {
        const idLength = 6; // 设置ID的长度
        const rdBytes = randomBytes(idLength);
        const id = rdBytes.toString('hex');
        return id;
    };
}

/**
 * WebSocket Server
 */
export class WSServer {
    private wsServer: WebSocket.Server;
    public userList: string[];

    constructor(serverPort: number) {
        this.userList = [];
        this.wsServer = new WebSocket.WebSocketServer({ port: serverPort });
    }

    setConnectionEvent(): void {
        this.wsServer.on('connection', (ws: WebSocket) => {
            const handler = new wsHanlder(ws);
            handler.handleMessage(this);
            handler.handleClose(this);
        });
    }

    setCloseEvent(): void {
        // 当服务端准备关闭时
        process.on('SIGINT', () => {
            // 向所有客户端广播"Offline"状态
            this.wsServer.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ status: 'Offline' }));
                }
            });

            // 关闭 WebSocket 服务器
            this.wsServer.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        });
    }
}
