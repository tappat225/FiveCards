// utils.js
// import { app, scale } from './app.js';
import { cards } from './cards.js'

/**
 * Get n cards in random order
 * @param n number of card
 */
export function getRandomCards(n) {
    const shuffled = cards.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}
