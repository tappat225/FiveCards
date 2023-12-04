// cards.js
import * as PIXI from 'pixi.js';
import { scale, app } from './app.js';
import { arrangeCards, getRandomCards } from './utils.js';

// Container for the selected cards
const selectedCardsSprites = [];

// Set card assets path
export const cards = getCardPaths();

// ----------------------- Inner function ----------------------------

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

function setupCardEvents(sprite) {
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.on('pointerdown', () => toggleCardSelection(sprite));
}

function toggleCardSelection(sprite) {
    const initialY = calculateInitialY(sprite.height);
    if (sprite.isSelected) {
        sprite.y = initialY;
        const index = selectedCardsSprites.indexOf(sprite);
        if (index > -1) {
            selectedCardsSprites.splice(index, 1);
        }
    } else {
        sprite.y -= 70;
        selectedCardsSprites.push(sprite);
    }
    sprite.isSelected = !sprite.isSelected;
}

export function calculateInitialX(index, width) {
    const totalWidth = selectedCardsSprites.length * width * scale + (selectedCardsSprites.length - 1) * 10;
    return (app.screen.width - totalWidth) / 2 + index * (width * scale + 10);
}

function calculateInitialY(height) {
    return (app.screen.height - height * scale) / 2;
}

// ------------------------------- Export function ----------------------------

export function createCardSprite(card, index) {
    // Init cards position
    const sprite = PIXI.Sprite.from(card);
    sprite.isCard = true;
    sprite.scale.set(scale, scale);
    sprite.x = calculateInitialX(index, sprite.width);
    sprite.y = calculateInitialY(sprite.height);

    setupCardEvents(sprite);
    app.stage.addChild(sprite);
}

// Handle playing cards
export function onPlayCards() {
    selectedCardsSprites.forEach(cardSprite => {
        app.stage.removeChild(cardSprite); // 从舞台上移除选中的卡牌
    });

    // 补充新牌
    if (app.stage.children.filter(child => child instanceof PIXI.Sprite).length < cards.length) {
        const newCard = getRandomCards(1)[0];
        PIXI.Assets.add({ alias: newCard, src: newCard });
        PIXI.Assets.load(newCard).then(() => {
            const newCardSprite = PIXI.Sprite.from(newCard);
            newCardSprite.isCard = true; // 添加标识属性
            newCardSprite.scale.set(scale, scale);
            // 不需要设置新卡牌的位置，因为它将在arrangeCards中设置
            app.stage.addChild(newCardSprite);

            // 重新排列牌
            arrangeCards();
        });
    }

    selectedCardsSprites.length = 0; // 清空选中的卡牌数组
}
