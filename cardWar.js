import { createDeck } from './cards/deck.js';
import { shuffleDeck, splitDeck } from './cards/shuffle.js';
import { loader } from './loader/loader.js';
import { addCardElements } from './cards/card.js';

window.onload = () => {
  loader();
};

const handleStartGameClick = () => {
  const deck = createDeck();
  const initialDeck = shuffleDeck(deck);
  const gameDeck = splitDeck(initialDeck);

  const playerOne = document.getElementsByClassName('playerOne');

  let card = document.createElement('div');
  card.classList.add('card');
  card.dataset.suit = gameDeck.deckOne[0].suit;
  card.dataset.value = gameDeck.deckOne[0].displayedValue;
  card = addCardElements(card);
  playerOne[0].appendChild(card);
};

window.handleStartGameClick = handleStartGameClick;
