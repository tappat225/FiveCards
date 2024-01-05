
export class Connect {
    private socket: WebSocket|undefined;

    constructor() {
        this.socket = undefined;
    }

    setup(addr:string) {
        this.socket = new WebSocket(addr);
    }

    test() {
        if (this.socket == undefined) {
            return;
        }

        const ws = this.socket;

        ws.onopen = () => {
            console.log('Connected to the server');
            ws.send('Player1'); // 发送玩家名称
        };

        ws.onmessage = (message) => {
            console.log(message.data);
        };
    }
}

