import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    resizeTo: window,
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
        const scale = 0.15;
        sprite.scale.set(scale, scale);

       // 初始扑克牌位置
       const initialY = (app.screen.height - sprite.height * scale) / 2;
       sprite.x = 50 + index * (sprite.width * scale + 10);
       sprite.y = initialY;

       // 添加属性来跟踪扑克牌是否被选中
       sprite.isSelected = false;

       // 为扑克牌添加点击事件
       sprite.interactive = true;
       sprite.buttonMode = true;
       sprite.on('pointerdown', () => {
           if (sprite.isSelected) {
               sprite.y = initialY; // 如果已选中，移回原位
           } else {
               sprite.y -= 70; // 如果未选中，向上移动
           }
           sprite.isSelected = !sprite.isSelected; // 切换选中状态
       });

        app.stage.addChild(sprite);
    });
}

function getRandomCards(n) {
    const shuffled = cards.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

loadAndDisplayCards();
