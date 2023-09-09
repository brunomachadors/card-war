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

const handleNextCard = () => {
  changeButton();
  console.log(lastWinner);

  if (lastWinner === 'draw') {
    bet = bet + 4;
  } else {
    bet = 1;
  }
  const index = bet - 1;
  console.log('INDEX ' + index);
  declareCardWinner(gameDeck.deckOne[index], gameDeck.deckTwo[index], bet);
};

function changeButton() {
  if (
    document.getElementsByClassName('button-next-round')[0].innerText !== 'NEXT'
  ) {
    document
      .getElementsByClassName('button-start')[0]
      .classList.remove('button-start');

    document.getElementsByClassName('button-next-round')[0].innerText = 'NEXT';
  }
}

function declareCardWinner(playerCard, cpuCard, bet) {
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
  const playerTwo = document.getElementsByClassName('playerTwo');
  for (let i = 0; i < 5; i++) {
    playerOne[0].appendChild(drawCard(gameDeck.deckOne[i], `playerCard${i}`));
    playerTwo[0].prepend(drawCard(gameDeck.deckTwo[i], `cpuCard${i}`));
  }
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

window.handleNextCard = handleNextCard;
