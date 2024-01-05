
export class Connect {
    private socket: WebSocket|undefined;

    constructor() {
        this.socket = undefined;
    }

    setup() {
        this.socket = new WebSocket();
    }
}

