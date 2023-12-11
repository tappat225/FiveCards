// playCardsButton.ts

import { Text, TextStyle } from 'pixi.js';

const defaultPlayCardsButtonOptions = {
    fill: '#FFFFFF',
    fontSize: 24
};

export class PlayCardsButton extends Text {
    constructor(text = '出牌', options = defaultPlayCardsButtonOptions) {
        super(text, new TextStyle(options));
        this.interactive = true;
        this.anchor.set(0.5);
    }
}
