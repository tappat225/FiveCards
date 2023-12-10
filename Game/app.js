// app.js
import * as PIXI from 'pixi.js';
import { Card, availableCards } from './cards.js';
import { getRandomCards } from './utils.js'

export const scale = 0.15;
export const app = new PIXI.Application({
  resizeTo: window,
  backgroundColor: '#b3c9f4'
});

export async function loadAndDisplayCards() {
  // Shuffle and select random cards
  const selectedCards = getRandomCards(availableCards, 5);

  // Add each card to the loader
  selectedCards.forEach(card => {
      PIXI.Assets.add({ alias: card, src: card });
  });

  // Load all selected cards
  await PIXI.Assets.load(selectedCards);

  selectedCards.forEach((card, index) => new Card(card, index));
}

export function displayStage() {
    document.body.appendChild(app.view);
}
