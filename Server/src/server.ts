// server.ts

import { WSServer } from './wsserver.js'

function initWebSocket() {
    const wss = new WSServer(8848);

    wss.setConnectionEvent();
    wss.setCloseEvent();
}

function main() {
    initWebSocket();
}

main();
