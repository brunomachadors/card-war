import { createDeck } from './cards/deck.js';
import { shuffleDeck, splitDeck } from './cards/shuffle.js';
import { loader } from './loader/loader.js';
import { addCardElements } from './cards/card.js';

window.onload = () => {
  loader();
};

const deck = createDeck();
const initialDeck = shuffleDeck(deck);
const gameDeck = splitDeck(initialDeck);

const handleStartGameClick = () => {
  getNewCard();
};

const handleNextCard = () => {
  removeActiveCard();
  getNewCard();
};

function removeActiveCard() {
  if (gameDeck.deckOne[0].value > gameDeck.deckTwo[0].value) {
    console.log('Player one won');
    gameDeck.deckOne.push(gameDeck.deckOne[0], gameDeck.deckTwo[0]);
    gameDeck.deckOne.splice(0, 1);
    gameDeck.deckTwo.splice(0, 1);
    document.getElementById('playerDeck').innerText =
      gameDeck.deckOne.length.toString();
    document.getElementById('cpuDeck').innerText =
      gameDeck.deckTwo.length.toString();
    console.log(gameDeck);
    document.getElementById('activeOne').remove();
    document.getElementById('activeTwo').remove();
  } else {
    console.log('Player two won');
    gameDeck.deckTwo.push(gameDeck.deckTwo[0], gameDeck.deckOne[0]);
    gameDeck.deckTwo.splice(0, 1);
    gameDeck.deckOne.splice(0, 1);
    document.getElementById('playerDeck').innerText =
      gameDeck.deckOne.length.toString();
    document.getElementById('cpuDeck').innerText =
      gameDeck.deckTwo.length.toString();
    console.log(gameDeck);
    document.getElementById('activeOne').remove();
    document.getElementById('activeTwo').remove();
  }
}

function getNewCard() {
  const playerOne = document.getElementsByClassName('playerOne');
  let card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('id', 'activeOne');
  card.dataset.suit = gameDeck.deckOne[0].suit;
  card.dataset.value = gameDeck.deckOne[0].displayedValue;
  card = addCardElements(card);
  playerOne[0].appendChild(card);

  const playerTwo = document.getElementsByClassName('playerTwo');
  card = document.createElement('div');
  card.classList.add('card');
  card.setAttribute('id', 'activeTwo');
  card.dataset.suit = gameDeck.deckTwo[0].suit;
  card.dataset.value = gameDeck.deckTwo[0].displayedValue;
  card = addCardElements(card);
  playerTwo[0].prepend(card);
}

const clicked = () => {
  //.classList.add("clicked")
};

window.handleStartGameClick = handleStartGameClick;
window.handleNextCard = handleNextCard;
