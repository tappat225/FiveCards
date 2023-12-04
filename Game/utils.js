// utils.js
import { app, scale } from './app.js';
import { cards, calculateInitialX } from './cards.js'

// Rearrange cards after each play
export function arrangeCards() {
    const cardSprites = app.stage.children.filter(child => child.isCard); // 只选择是牌的精灵
    const totalWidth = cardSprites.length * cardSprites[0].width * scale + (cardSprites.length - 1) * 10; // 计算总宽度
    const initialX = (app.screen.width - totalWidth) / 2;

    cardSprites.forEach((sprite, index) => {
        // sprite.x = initialX + index * (sprite.width * scale + 10); // 更新位置
        sprite.x = calculateInitialX(index, sprite.width) + index * (sprite.width * scale + 10); // 更新位置
        sprite.y = (app.screen.height - sprite.height * scale) / 2; // 重置到中间高度
    });
}

// Get n cards in random
export function getRandomCards(n) {
    const shuffled = cards.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}
