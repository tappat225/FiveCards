// logObserver.ts

class LogOberser {
    private isEnable: boolean;

    constructor() {
        this.isEnable = false;
    }

    log(msg: string, ...args: any[]) {
        if (this.isEnable) {
            console.log(msg, ...args);
        }
    }

    turnOnLog() {
        this.isEnable = true;
    }

    turnOffLog() {
        this.isEnable = false;
    }
}

export const logger = new LogOberser();

// logger.turnOnLog();
