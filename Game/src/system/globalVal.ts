// globalVal.ts

export enum Suit {
    Clubs = 'c',        // Clubs, 梅花
    Diamonds = 'd',     // Diamonds, 方块
    Hearts = 'h',       // Hearts, 红桃
    Spades = 's',       // Spades, 黑桃
}

export class CardPool {
    availableCards: string[];
    usedCards: string[];

    constructor() {
        this.usedCards = [];
        this.availableCards = this.shuffle(this.initCardList());
    }

    initCardList(): string[] {
        const cards: string[] = [];
        Object.values(Suit).forEach(suit => {
            for (let i = 1; i <= 13; i++) {
                const cardNumber: string = i.toString().padStart(2, '0');
                cards.push(`${suit}${cardNumber}`);
            }
        });
        cards.push('joker1', 'joker2');
        return cards;
    }

    // Fisher-Yates
    shuffle(cardsArray: string[]): string[] {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }
        return cardsArray;
    }

    getAvailableCardsList() {
        return this.availableCards;
    }

    getUsedCardsList() {
        return this.usedCards;
    }

    /** Draw one card from card pool */
    drawOneCard(): string | null {
        if (this.availableCards.length < 1) {
            console.log("No enough card!");
            return null;
        }

        const card = this.availableCards[0];
        this.availableCards.splice(0, 1);
        this.usedCards.push(card);

        return card;
    }

    /** Draw n cards from card pool */
    drawCards(num:number) : string[] {
        const cards: string[] = [];

        for (let i = 1; i <= num; i++) {
            let newCard = this.drawOneCard();
            if (newCard == null) {
                console.log("No enough card! Only " + i + " cards added.");
                break;
            }

            cards.push(newCard);
        }

        return cards;
    }
}

export const gameCardPool = new CardPool();
