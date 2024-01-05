
export class UserInfo {
    nickName: string;
    uid: string;
    connectId: string;
    winCount: number;

    constructor(connectId?:string) {
        this.nickName = "undefined";
        this.uid = "undefined";
        this.connectId = connectId || "undefined";
        this.winCount = 0;

    }

    rebindConnId(connectId: string) {
        this.connectId = connectId;
    }
}

