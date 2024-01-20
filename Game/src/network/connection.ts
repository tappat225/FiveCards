

export class WSConnection {
    private socket: WebSocket;
    private serverAddr: string;

    constructor(address: string) {
        this.serverAddr = address;
        this.socket = new WebSocket(`ws://${address}`);
    }

    generateUserId(): string {
        const timestamp = Date.now().toString(36);
        const randomString = Math.random().toString(36).substring(2, 7);
        return `${timestamp}-${randomString}`;
    }

    test() {
        if (this.socket == undefined) {
            return;
        }

        const ws = this.socket;
        const uid = this.generateUserId();
        const identity = "User";
        ws.onopen = () => {
            console.log('Connected to the server ', this.serverAddr);
            ws.send(JSON.stringify({ identity, uid }));
        };

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            console.log(data);
        };

        ws.onclose = () => {
            console.log('Disconnected from server');
        };
    }
}

