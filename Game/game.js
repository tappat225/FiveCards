import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: 1024,  // 调整画布宽度
    height: 600,  // 画布高度
    backgroundColor: 'pink' // 背景色
});

document.body.appendChild(app.view);

// Set card assets path
const cards = [];
for (let i = 1; i <= 13; i++) {
    cards.push(`assets/Cards/c${i.toString().padStart(2, '0')}.png`);
    cards.push(`assets/Cards/d${i.toString().padStart(2, '0')}.png`);
    cards.push(`assets/Cards/h${i.toString().padStart(2, '0')}.png`);
    cards.push(`assets/Cards/s${i.toString().padStart(2, '0')}.png`);
}
cards.push('assets/Cards/joker1.png');
cards.push('assets/Cards/joker2.png');

// Load and display cards
async function loadAndDisplayCards() {
    // Shuffle and select random cards
    const selectedCards = getRandomCards(5);

    // Add each card to the loader
    selectedCards.forEach(card => {
        PIXI.Assets.add({ alias: card, src: card });
    });

    // Load all selected cards
    await PIXI.Assets.load(selectedCards);

    // Create and display sprites for each loaded card
    selectedCards.forEach((card, index) => {
        const sprite = PIXI.Sprite.from(card);

        // 缩放扑克牌以适应画布大小
        const scale = 0.15; // 根据需要调整缩放比例
        sprite.scale.set(scale, scale);

        // 调整扑克牌位置
        sprite.x = 50 + index * (sprite.width * scale + 10); // 考虑缩放后的宽度
        sprite.y = app.screen.height - sprite.height * scale - 10; // 从底部向上放置

        app.stage.addChild(sprite);
    });
}

function getRandomCards(n) {
    const shuffled = cards.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

loadAndDisplayCards();
