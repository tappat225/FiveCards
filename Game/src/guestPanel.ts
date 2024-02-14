import { Container, Graphics, Text, TextStyle } from "pixi.js";

import { configM } from "./utils/configs";

export class GuestPanel extends Container {
    private infoBox;
    private message;
    constructor() {
        super();
        // 创建一个透明的图形作为信息框背景
        this.infoBox = new Graphics();
        this.infoBox.beginFill(0x000000, 0.5); // 黑色半透明
        this.infoBox.drawRect(0, 0, configM.appWidth / 2, configM.appHeight / 4); // 绘制矩形
        this.infoBox.endFill();

        // 创建文本
        const textStyle = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 24,
            fill: '#ffffff', // 文本颜色
            wordWrap: true,
            wordWrapWidth: this.infoBox.width - 20, // 文本宽度，留出一些边距
        });
        this.message = new Text('Test Information', textStyle);
        this.message.x = 10; // 文本相对于信息框的位置
        this.message.y = 10;

        this.infoBox.addChild(this.message);

        this.addChild(this.infoBox);
    }

    resize(appWidth: number, appHeight: number) {
        this.infoBox.width = appWidth / 2;
        this.infoBox.height = appHeight / 4;
    }

    update() {
        // let textContent = "Player name | Handcards Num\n";
        // players.forEach(player => {
        //     textContent += `${player.name} | ${player.handcardsNum}\n`;
        // });
        // this.message.text = textContent;
    }
}

