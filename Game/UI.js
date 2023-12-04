// UI.js
import * as PIXI from 'pixi.js';
import { app } from './app.js';
import { onPlayCards } from './cards.js'

const playButton = createPlayButton();

function createPlayButton() {
    const button = new PIXI.Text('出牌', new PIXI.TextStyle({ fill: '#FFFFFF', fontSize: 24 }));
    button.interactive = true;
    button.buttonMode = true;
    button.x = (app.screen.width - button.width) / 2;
    button.y = app.screen.height - button.height - 20;
    button.on('pointerdown', onPlayCards);
    return button;
}

export function displayUI() {
    app.stage.addChild(playButton);
}
