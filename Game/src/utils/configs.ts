// configs.ts

class GameSettings {
    public playerNum:number;
    public maxHandCardsNum:number;

    constructor() {
        this.playerNum = 0;
        this.maxHandCardsNum = 0;
    }
}

class ConfigManager {
    public appWidth:number;
    public appHeight:number;
    public gameSettings: GameSettings;

    constructor() {
        this.appWidth = 0;
        this.appHeight = 0;
        this.gameSettings = new GameSettings();
    }

    setGamePlayerNum(num: number) {
        this.gameSettings.playerNum = num;
    }

    setMaxHandCardsNum(num: number) {
        this.gameSettings.maxHandCardsNum = num;
    }

    updateAppWidth(width:number) {
        this.appWidth = width;
    }

    updateAppHeight(height:number) {
        this.appHeight = height;
    }

    updateAppSize(width:number, height:number) {
        this.appWidth = width;
        this.appHeight = height;
    }
}

/** Shared config manager */
export const configM = new ConfigManager();
