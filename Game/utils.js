// utils.js

/**
 * Get n random cards from the given array of cards
 * @param cardsArray    array of card
 * @param n             number of cards you want to get
 */
export function getRandomCards(cardsArray, n) {
    const shuffled = [...cardsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}
