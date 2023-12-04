import * as PIXI from 'pixi.js';

const scale = 0.15;

const app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: '#b3c9f4' // 背景色
});

document.body.appendChild(app.view);

const selectedCardsSprites = []; // 用于存储选中的卡牌精灵

// 创建出牌按钮
const playButton = new PIXI.Text('出牌', new PIXI.TextStyle({ fill: '#FFFFFF', fontSize: 24 }));
playButton.interactive = true;
playButton.buttonMode = true;
playButton.x = (app.screen.width - playButton.width) / 2;
playButton.y = app.screen.height - playButton.height - 20;
playButton.on('pointerdown', onPlayCards);
app.stage.addChild(playButton);

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
        sprite.isCard = true; // 添加标识属性

        // 缩放扑克牌以适应画布大小
        // const scale = 0.15;
        sprite.scale.set(scale, scale);

       // 初始扑克牌位置
       const totalWidth = selectedCards.length * sprite.width * scale + (selectedCards.length - 1) * 10; // 总宽度计算，包括间距
       const initialY = (app.screen.height - sprite.height * scale) / 2;
       const initialX = (app.screen.width - totalWidth) / 2 + index * (sprite.width * scale + 10); // 这里调整了X的起始位置
       sprite.x = initialX + index * (sprite.width * scale + 10);
       sprite.y = initialY;

       // 添加属性来跟踪扑克牌是否被选中
       sprite.isSelected = false;

       // 为扑克牌添加点击事件
       sprite.interactive = true;
       sprite.buttonMode = true;
       sprite.on('pointerdown', () => {
        if (sprite.isSelected) {
            sprite.y = initialY; // 如果已选中，移回原位
            const index = selectedCardsSprites.indexOf(sprite);
            if (index > -1) {
                selectedCardsSprites.splice(index, 1); // 从选中的卡牌数组中移除
            }
        } else {
            sprite.y -= 70; // 如果未选中，向上移动
            selectedCardsSprites.push(sprite); // 添加到选中的卡牌数组中
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

// 当需要重新排列牌时调用此函数
function arrangeCards() {
    const cardSprites = app.stage.children.filter(child => child.isCard); // 只选择是牌的精灵
    const totalWidth = cardSprites.length * cardSprites[0].width * scale + (cardSprites.length - 1) * 10; // 计算总宽度
    const initialX = (app.screen.width - totalWidth) / 2;

    cardSprites.forEach((sprite, index) => {
        sprite.x = initialX + index * (sprite.width * scale + 10); // 更新位置
        sprite.y = (app.screen.height - sprite.height * scale) / 2; // 重置到中间高度
    });
}

// 出牌按钮的事件处理器
function onPlayCards() {
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

loadAndDisplayCards();
