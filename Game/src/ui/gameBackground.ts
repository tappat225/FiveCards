// gameBackground.ts

import { Container, Sprite } from "pixi.js";
import { configM } from "../utils/configs";

export class GameBackGround extends Container {
    sprite: Sprite | undefined;
    constructor() {
        super();
        this.sprite = undefined;
    }

    public setInstance() {
        const bgpath:string = "bg02";
        this.sprite = Sprite.from(bgpath);
        this.resize(configM.appWidth, configM.appHeight);
        this.addChild(this.sprite);
    }

    public resize(width:number, height:number) {
        if (this.sprite) {
            const scaleX = width / this.sprite.texture.width;
            const scaleY = height / this.sprite.texture.height;
            const scale = Math.min(scaleX, scaleY);

            this.sprite.scale.set(scale, scale);
            this.sprite.x = (width - this.sprite.width) / 2;
            this.sprite.y = (height - this.sprite.height) / 2;
        }
    }
}
