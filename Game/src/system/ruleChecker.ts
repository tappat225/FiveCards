// ruleChecker.ts

class RuleChecker {
    public check(inputCards: string[]) : boolean {
        const cardsList: number[] = this.preProcess(inputCards);
        let jokerNum: number = 0;
        cardsList.forEach((val) => (jokerNum += (val == 14) ? 1 : 0));

        if ((cardsList.length - jokerNum) == 0) {
            return true;
        }

        if ((cardsList.length - jokerNum) == 1) {
            return true;
        }

        if (cardsList.length >= 3) {
            return this.checkMultiCards(cardsList);
        }

        if ((cardsList.length - jokerNum) == 2) {
            return this.checkTwoCards(cardsList);
        }

        return false;
    }

    private preProcess(inputCards: string[]): number[] {
        const cardsList: number[] = [];

        inputCards.forEach((str) => {
            if (str.startsWith('joker')) {
                cardsList.push(14);
            } else {
                const match = str.match(/\d+/);
                cardsList.push(match ? parseInt(match[0], 10) : 0);
            }
        });

        cardsList.sort((a, b) => a - b);
        return cardsList;
    }

    private checkTwoCards(cardsList: number[]): boolean {
        return (cardsList[0] == cardsList[1]);
    }

    private checkMultiCards(cardsList: number[]): boolean {
        cardsList = cardsList.filter((val) => val != 14);
        for (let i = 0; i < cardsList.length - 1; i++) {
            if (cardsList[i] != cardsList[i + 1]) {
                if ((cardsList[i] + 1) != cardsList[i + 1]) {
                    return false;
                }
            }
        }

        return true;
    }
}

export const ruleChecker = new RuleChecker();
