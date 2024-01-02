// loding.ts

import { Text, TextStyle } from 'pixi.js';

const defaultPlayCardsButtonOptions = {
    fill: '#FFFFFF',
    fontSize: 36
};

export class LoadingView extends Text {
    constructor(text = '正在加载游戏资源...', options = defaultPlayCardsButtonOptions) {
        super(text, new TextStyle(options));
        this.anchor.set(0.5);
    }

    setup(width: number, height: number) {
        this.x = width * 0.5;
        this.y = height * 0.5;
    }
}
