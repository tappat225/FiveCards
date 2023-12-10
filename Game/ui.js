// ui.js
import * as PIXI from 'pixi.js';
import { app } from './app.js';
import { onPlayCards } from './cards.js'

// TODO: Seperate each ui module into different files.
const defaultPlayCardsButtonOptions = {
    fill: '#FFFFFF',
    fontSize: 24
};

export class PlayCardsButton extends PIXI.Text {
    constructor(text = '出牌', options = defaultPlayCardsButtonOptions) {
        super(text, new PIXI.TextStyle(options));
        this.initialize();
    }

    initialize() {
        this.interactive = true;
        this.buttonMode = true;
        this.x = (app.screen.width - this.width) / 2;
        this.y = app.screen.height - this.height - 20;
        this.on('pointerdown', onPlayCards);
    }
}

export function displayUI() {
    const playButton = new PlayCardsButton();
    app.stage.addChild(playButton);
}
