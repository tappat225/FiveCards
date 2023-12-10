// cards.js
import * as PIXI from 'pixi.js';
import { scale, app } from './app.js';
import { getRandomCards } from './utils.js';

// Container for the selected cards
const selectedCardsSprites = [];

// Set card assets path
export const cards = getCardPaths();

function getCardPaths() {
    const cards = [];
    for (let i = 1; i <= 13; i++) {
        cards.push(`assets/Cards/c${i.toString().padStart(2, '0')}.png`);
        cards.push(`assets/Cards/d${i.toString().padStart(2, '0')}.png`);
        cards.push(`assets/Cards/h${i.toString().padStart(2, '0')}.png`);
        cards.push(`assets/Cards/s${i.toString().padStart(2, '0')}.png`);
    }
    cards.push('assets/Cards/joker1.png');
    cards.push('assets/Cards/joker2.png');

    return cards;
}

export class Card extends PIXI.Sprite {
    constructor(texturePath, index) {
        // console.log('[Debug msg] texturePath = ', texturePath);
        const texture = PIXI.Texture.from(texturePath);
        super(texture);
        this.isCard = true;
        this.isSelected = false;
        this.scale.set(scale, scale);
        this.x = this.calculateInitialX(index);
        this.y = this.calculateInitialY();
        this.setupCardEvents();
        app.stage.addChild(this);
    }

    setupCardEvents() {
        this.interactive = true;
        this.buttonMode = true;
        this.on('pointerdown', () => this.toggleCardSelection());
    }

    toggleCardSelection() {
        const initialY = this.calculateInitialY();
        if (this.isSelected) {
            this.y = initialY;
            const index = selectedCardsSprites.indexOf(this);
            if (index > -1) {
                selectedCardsSprites.splice(index, 1);
            }
        } else {
            this.y -= 70;
            selectedCardsSprites.push(this);
        }
        this.isSelected = !this.isSelected;
    }

    calculateInitialX(index) {
        const totalWidth = selectedCardsSprites.length * this.width * scale +
            (selectedCardsSprites.length - 1) * 10;
        return (app.screen.width - totalWidth) / 2 + index * (this.width * scale + 10);
    }

    calculateInitialY() {
        return (app.screen.height - this.height * scale) / 2;
    }

}

// Rearrange cards after each play
function reArrangeCards() {
    // Get sprites with label 'card'
    const cardSprites = app.stage.children.filter(child => child.isCard);

    // Calculate length of card group
    const totalWidth = cardSprites.length * cardSprites[0].width * scale + (cardSprites.length - 1) * 10;
    const initialX = (app.screen.width - totalWidth) / 2;

    cardSprites.forEach((sprite, index) => {
        sprite.x = initialX + index * (sprite.width * scale + 10);
        sprite.y = (app.screen.height - sprite.height * scale) / 2;
    });
}

export function onPlayCards() {
    selectedCardsSprites.forEach(card => card.parent.removeChild(card));

    if (app.stage.children.filter(child => child instanceof Card).length < cards.length) {
        const newCardPath = getRandomCards(1)[0];
        PIXI.Assets.add({ alias: newCardPath, src: newCardPath });
        PIXI.Assets.load(newCardPath).then(() => {
            new Card(newCardPath, app.stage.children.length);
            reArrangeCards();
        });
    }

    selectedCardsSprites.length = 0;
}
