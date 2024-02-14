// player.ts

import { User } from "./user";

// Global shared
import { CardPool } from "./system/cardPool"

/**
 * The information of a player
 */
export class Player extends User {
    // public name: string;
    // public uid: string;
    public handCards: string[];

    /** create card sprite for host player only */
    constructor(name?: string, uid?: string) {
        super();
        this.name = name || "undefined";
        this.uid = uid || "undefined";
        this.handCards = [];
    }

    setName(name: string) {
        this.name = name;
    }

    setUid(uid: string) {
        this.uid = uid;
    }

    initHandCards(cardsNum: number, cardPool: CardPool) {
        this.handCards = cardPool.drawCards(cardsNum);
    }

    public getHandCardsNum() {
        return this.handCards.length;
    }

    /** Add one card into the player's handcard */
    public addIntoHandCards(id:string): boolean {
        this.handCards.push(id);
        return true;
    }

    removeFromHandCards(id: string): boolean;
    removeFromHandCards(index: number): boolean;
    public removeFromHandCards(idOrIndex: string | number): boolean {
        if (typeof idOrIndex === 'number') {
            if (idOrIndex >= 0 && idOrIndex < this.handCards.length) {
                this.handCards.splice(idOrIndex, 1);
                return true;
            }
            return false;
        } else {
            const index = this.handCards.indexOf(idOrIndex);
            if (index !== -1) {
                this.handCards.splice(index, 1);
                return true;
            }
            return false;
        }
    }

    public getHandCardsList(): string[] {
        return this.handCards;
    }
}
