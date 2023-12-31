import { Container } from "pixi.js";
import { PlayCardsButton } from "./ui/playCardsButton"
import { Player } from "./player";
import { Card } from "./card";
import { gameCardPool } from "./system/globalVal";
import { configM } from "./utils/configs"
import { logOB } from "./utils/logObserver";
import { CardsCounter } from "./ui/cardsCounter";
import { ruleChecker } from "./system/ruleChecker";

export class HostPanel extends Container {
    public playButton: PlayCardsButton;
    public cardsCounter: CardsCounter;
    public player: Player;
    public usedCardsInstance: Card[];
    public handCardsInstance: Card[];

    constructor() {
        super();
        this.playButton = new PlayCardsButton();
        this.cardsCounter = new CardsCounter();
        this.player = new Player();

        this.handCardsInstance = [];
        this.usedCardsInstance = [];
    }

    /** Set attributes, events for all elements */
    public setUp() {
        // set up for playcards
        this.player.initHandCards(configM.gameSettings.maxHandCardsNum, gameCardPool);
        this.player.handCards.forEach((cardID) => {
            this.addCardInstance(cardID);
        });

        // set up for playbutton
        this.playButton.on('pointerdown', this.playCardEvent);
        this.addChild(this.playButton);

        // set up for cards counter
        this.addChild(this.cardsCounter);

        // set up for others...

        this.resize(configM.appWidth, configM.appHeight);
    }

    public resize(width:number, height:number) {
        if (this.playButton) {
            this.playButton.x = width * 0.5;
            this.playButton.y = height - 100;
        }

        if (this.cardsCounter) {
            this.cardsCounter.x = width * 0.5;
            this.cardsCounter.y = height * 0.1;
        }

        if (this.handCardsInstance.length > 0) {
            this.arrangeDeckPosition(width, height);
        }

        if (this.usedCardsInstance.length > 0) {
            this.arrangeUsedCardsPosition(width, height);
        }
    }

    /** Triggered when play button is click down */
    private playCardEvent = () => {
        const selectedCards: Card[] = [];
        if (this.handCardsInstance.length < 1) {
            console.log("playerCardsIns error!");
            return;
        }

        this.handCardsInstance.forEach((card) => {
            if (card.isSelected) {
                selectedCards.push(card);
            }
        });

        if (selectedCards.length < 1) {
            logOB.log("No card is selected!");
            return;
        }

        if (ruleChecker.check(selectedCards.map((card) => (card.id))) != true) {
            logOB.log("Invalid play!");
            return;
        }

        selectedCards.forEach((card) => {
            // Add into used cards
            card.setScale(0.1);
            gameCardPool.usedCards.push(card.id);
            this.usedCardsInstance.push(card);

            // Remove from handcards
            this.player.removeFromHandCards(card.id);
        });

        // Remove from handcards
        this.handCardsInstance = this.handCardsInstance.filter(card => !card.isSelected);

        // Add a new card
        const newCardID = gameCardPool.drawOneCard();
        if (newCardID == null) {
            logOB.log("draw one card failed!");
            return;
        } 

        this.addCardInstance(newCardID);
        this.arrangeDeckPosition(configM.appWidth, configM.appHeight);
        this.arrangeUsedCardsPosition(configM.appWidth, configM.appHeight);

        // Update cards counter
        this.cardsCounter.updateCounts(gameCardPool.availableCards.length);
    }

    /** create sprite for this player */
    private addCardInstance(cardID:string) {
        const newCard = new Card(cardID);
        newCard.setScale(0.15);
        newCard.setupCardEvents();
        this.handCardsInstance.push(newCard);
        this.addChild(newCard);
    }

    /** To place the deck on the bottom of the screen. */
    public arrangeDeckPosition(appWidth: number, appHeight: number) {
        if (this.handCardsInstance.length < 1) {
            return;
        }

        const scale = this.handCardsInstance[0].cardScale;
        const cardWidth = this.handCardsInstance[0].sprite.width;
        const cardHeight = this.handCardsInstance[0].sprite.height;
        const cardsNum: number = this.handCardsInstance.length;
        const deckWidth: number = cardsNum * cardWidth * scale + (cardsNum - 1) * 10;
        const deckX0: number = (appWidth - deckWidth) * 0.5;

        logOB.log("function[arrangeDeckPosition]:\n \
        appWidth = %d, appHeight = %d, \n\
        deckWidth = %d, deckX0 = %d, \n\
        cardWidth = %d, cardHeight = %d" , appWidth, appHeight, deckWidth, deckX0, cardWidth, cardHeight);

        this.handCardsInstance.forEach((card, index) => {
            const posX = deckX0 + index * (cardWidth * scale + 10);
            const posY = (appHeight - cardHeight * scale) * 0.75;
            card.setPosX(posX);
            card.setPosY(posY);
        });
    }

    /** Set the position for used cards */
    private arrangeUsedCardsPosition(appWidth: number, appHeight: number) {
        // Unused for now
        appWidth;

        if (this.usedCardsInstance.length < 1) {
            return;
        }

        const maxCardsPerRow = 10;
        const cardWidth = this.usedCardsInstance[0].sprite.width;
        const cardHeight = this.usedCardsInstance[0].sprite.height;

        // The width between cards
        const spaceWidth = cardWidth * 0.25;
        const startX = cardWidth * 2;
        const startY = appHeight * 0.25;

        logOB.log("[arrangeUsedCardsPosition]:\n\
        cardWidth = %d, cardHeight = %d", cardWidth, cardHeight);

        this.usedCardsInstance.forEach((card, index) => {
            const row = Math.floor(index / maxCardsPerRow);
            const col = index % maxCardsPerRow;

            const posX = startX + col * (cardWidth + spaceWidth);
            const posY = startY + row * (cardHeight + spaceWidth);

            card.setPosX(posX);
            card.setPosY(posY);
        });
    }
}
