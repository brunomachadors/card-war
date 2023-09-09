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
let lastWinner = 'Empty';
let bet = 1;

const handleStartGameClick = () => {
  drawTopCards(gameDeck.deckOne[0], gameDeck.deckTwo[0], bet);
};

const handleNextCard = () => {
  console.log(lastWinner);
  if (lastWinner === 'draw') {
    bet = 5;
    declareWinner(gameDeck.deckOne[4], gameDeck.deckTwo[4], bet);
  } else {
    bet = 1;
    declareWinner(gameDeck.deckOne[0], gameDeck.deckTwo[0], bet);
  }
};

function declareWinner(playerCard, cpuCard, bet) {
  removeCards();
  if (playerCard.value === cpuCard.value) {
    console.log('Draw');
    drawMultipleCards();
    lastWinner = 'draw';
  } else if (playerCard.value > cpuCard.value) {
    console.log('Player won');
    const cardsWon = gameDeck.deckOne.splice(0, bet);
    const cardsLost = gameDeck.deckTwo.splice(0, bet);
    console.log(cardsWon);
    console.log(cardsLost);
    cardsWon.forEach((card) => {
      console.log(card);
      gameDeck.deckOne.push(card);
    });
    cardsLost.forEach((card) => {
      console.log(card);
      gameDeck.deckOne.push(card);
    });

    drawTopCards(playerCard, cpuCard);
    lastWinner = 'player';
  } else if (playerCard.value < cpuCard.value) {
    console.log('CPU won');
    const cardsWon = gameDeck.deckTwo.splice(0, bet);
    const cardsLost = gameDeck.deckOne.splice(0, bet);
    console.log(cardsWon);
    console.log(cardsLost);
    cardsWon.forEach((card) => {
      console.log(card);
      gameDeck.deckTwo.push(card);
    });
    cardsLost.forEach((card) => {
      console.log(card);
      gameDeck.deckTwo.push(card);
    });
    drawTopCards(playerCard, cpuCard);
    lastWinner = 'cpu';
  }
  updateScore();
}

function removeCards() {
  let container = document.querySelector('.playerOne');
  removeAllChilds(container);
  container = document.querySelector('.playerTwo');
  removeAllChilds(container);
}

function updateScore() {
  document.getElementById('playerDeck').innerText =
    gameDeck.deckOne.length.toString();
  document.getElementById('cpuDeck').innerText =
    gameDeck.deckTwo.length.toString();
}

function drawTopCards(playerCard, cpuCard) {
  const playerOne = document.getElementsByClassName('playerOne');
  let card = drawCard(playerCard, 'playerCard');
  playerOne[0].appendChild(card);

  const playerTwo = document.getElementsByClassName('playerTwo');
  card = drawCard(cpuCard, 'cpuCard');
  playerTwo[0].prepend(card);
}

function drawMultipleCards() {
  const playerOne = document.getElementsByClassName('playerOne');
  let card = drawCard(gameDeck.deckOne[0], 'playerCard0');
  playerOne[0].appendChild(card);
  card = drawCard(gameDeck.deckOne[1], 'playerCard1');
  playerOne[0].appendChild(card);
  card = drawCard(gameDeck.deckOne[2], 'playerCard2');
  playerOne[0].appendChild(card);
  card = drawCard(gameDeck.deckOne[3], 'playerCard3');
  playerOne[0].appendChild(card);
  card = drawCard(gameDeck.deckOne[4], 'playerCard4');
  playerOne[0].appendChild(card);

  const playerTwo = document.getElementsByClassName('playerTwo');
  card = drawCard(gameDeck.deckTwo[0], 'cpuCard0');
  playerTwo[0].prepend(card);
  card = drawCard(gameDeck.deckTwo[1], 'cpuCard1');
  playerTwo[0].prepend(card);
  card = drawCard(gameDeck.deckTwo[2], 'cpuCard2');
  playerTwo[0].prepend(card);
  card = drawCard(gameDeck.deckTwo[3], 'cpuCard3');
  playerTwo[0].prepend(card);
  card = drawCard(gameDeck.deckTwo[4], 'cpuCard4');
  playerTwo[0].prepend(card);
}

function drawCard(card, id) {
  let cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.setAttribute('id', id);
  cardElement.dataset.suit = card.suit;
  cardElement.dataset.value = card.displayedValue;
  cardElement = addCardElements(cardElement);
  return cardElement;
}

function removeAllChilds(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

window.handleStartGameClick = handleStartGameClick;
window.handleNextCard = handleNextCard;
