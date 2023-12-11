// cards.ts
import { Container, Sprite } from 'pixi.js';

/** Each card */
export class Card extends Container {
    id: string;     // e.g. 'c01', 'd01', 'joker01'
    sprite: Sprite;
    isSelected: boolean;
    cardScale: number = 0;
    initialY: number = 0;

    constructor(id: string) {
        super();
        this.id = id;
        this.isSelected = false;
        this.sprite = Sprite.from(id);
        this.sprite.anchor.set(0.5);
        this.addChild(this.sprite);
    }

    setPosX(x:number) {
        this.sprite.x = x;
    }

    setPosY(y:number) {
        this.sprite.y = y;
        this.initialY = y;
    }

    setScale(s:number) {
        this.cardScale = s;
        this.sprite.scale.set(s, s);
    }

    getSprite() {
        return this.sprite;
    }

    setupCardEvents(): void {
        this.sprite.interactive = true;
        this.sprite.on('pointerdown', () => this.toggleCardSelection());
    }

    private toggleCardSelection() {
        if (this.isSelected) {
            this.sprite.y = this.initialY;
        } else {
            this.sprite.y -= 70;
        }
        this.isSelected = !this.isSelected;
    }
}
