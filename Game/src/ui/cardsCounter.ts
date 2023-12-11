
import { Text, TextStyle } from 'pixi.js';

const defaultCardsCounterOptions = {
    fill: '#FFFFFF',
    fontSize: 24
};

export class CardsCounter extends Text {
    constructor(options = defaultCardsCounterOptions) {
        super(undefined, new TextStyle(options));
        this.anchor.set(0.5);
    }

    updateCounts(count: number) {
        this.text = `剩余卡牌: ${count}`;
    }
}

