
export class User {
    nickName: string;
    uid: string;
    clientId: string;

    constructor(clientId?:string, uid? :string) {
        this.nickName = "undefined";
        this.uid = uid || "undefined";
        this.clientId = clientId || "undefined";
    }

    rebindClientId(clientId: string) {
        this.clientId = clientId;
    }


}

