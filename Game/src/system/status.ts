// status.ts

/** For multiplay game */

class Status {
    private playable: boolean;

    constructor() {
        this.playable = true;
    }

    getStatus() {
        return this.playable;
    }

    disable() {
        this.playable = false;
    }

    enable() {
        this.playable = true;
    }
}

export const playerStatus = new Status();
