// player.ts

// Global shared
// import { CardPool } from "./system/globalVal"

/**
 * The information of a player
 */
export class Player {
    public name: string;
    public uid: string;
    public handCards: string[];
    public restCardsNum:number = 0;
    public maxCardsNum:number = 0;

    /** create card sprite for host player only */
    constructor(name?: string, uid?: string) {
        this.name = name || "undefined";
        this.uid = uid || "null";
        this.handCards = [];
    }

    resetName(name: string) {
        this.name = name;
    }

    resetUid(uid: string) {
        this.uid = uid;
    }

    // initHandCards(cardsNum: number, cardPool: CardPool) {
    //     this.restCardsNum = cardsNum;
    //     this.maxCardsNum = cardsNum;
    //     this.handCards = cardPool.drawCards(cardsNum);
    // }

    // /** Add one card into the player's handcard */
    // public addIntoHandCards(id:string): boolean {
    //     if ((this.restCardsNum + 1) > this.maxCardsNum) {
    //         console.log("cards reached max, cannot be added.");
    //         return false;
    //     }

    //     this.handCards.push(id);
    //     this.restCardsNum++;
    //     return true;
    // }

    // removeFromHandCards(id: string): boolean;
    // removeFromHandCards(index: number): boolean;
    // public removeFromHandCards(idOrIndex: string | number): boolean {
    //     if (typeof idOrIndex === 'number') {
    //         if (idOrIndex >= 0 && idOrIndex < this.handCards.length) {
    //             this.handCards.splice(idOrIndex, 1);
    //             this.restCardsNum--;
    //             return true;
    //         }
    //         return false;
    //     } else {
    //         const index = this.handCards.indexOf(idOrIndex);
    //         if (index !== -1) {
    //             this.handCards.splice(index, 1);
    //             this.restCardsNum--;
    //             return true;
    //         }
    //         return false;
    //     }
    // }

    // public getHandCardsList(): string[] {
    //     return this.handCards;
    // }
}
