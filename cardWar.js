import { createDeck } from './cards/deck.js';
import { shuffleDeck, splitDeck } from './cards/shuffle.js';
import { loader } from './loader/loader.js';

window.onload = () => {
  loader();
};

const handleStartGameClick = () => {
  const deck = createDeck();
  const initialDeck = shuffleDeck(deck);
  const gameDeck = splitDeck(initialDeck);
  const cardNumbers = document.querySelectorAll('.card-number');
  cardNumbers.forEach((cardNumber) => {
    cardNumber.innerText = gameDeck.deckOne[0].displayedValue;
  });

  const cardSuits = document.getElementById('activeCardOneSuit');
  cardSuits.src = `./cards/suits/${gameDeck.deckOne[0].suit}.png`;
};

window.handleStartGameClick = handleStartGameClick;
