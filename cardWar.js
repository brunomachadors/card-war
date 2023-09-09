import { createDeck } from './cards/deck.js';
import { shuffleDeck, splitDeck } from './cards/shuffle.js';
import { loader } from './loader/loader.js';
import { addCardElements } from './cards/card.js';

window.onload = () => {
  loader();
};

const initialDeck = createDeck();
const shuffled = shuffleDeck(initialDeck);
const gameDeck = splitDeck(shuffled);
let lastWinner = 'Empty';
let bet = 1;

const handleNextCard = () => {
  changeButton();
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

function declareCardWinner(playerCard, cpuCard) {
  removeCards();
  if (playerCard.value === cpuCard.value) {
    drawMultipleCards();
  } else if (playerCard.value > cpuCard.value) {
    playerWin();
    drawTopCards(playerCard, cpuCard);
  } else {
    cpuWin();
    drawTopCards(playerCard, cpuCard);
  }
  updateScore();
}

function playerWin() {
  console.log('Player won');
  const cardsWon = gameDeck.deckOne.splice(0, bet);
  const cardsLost = gameDeck.deckTwo.splice(0, bet);
  cardsWon.forEach((card) => {
    gameDeck.deckOne.push(card);
  });
  cardsLost.forEach((card) => {
    gameDeck.deckOne.push(card);
  });
  lastWinner = 'player';
}

function cpuWin() {
  const cardsWon = gameDeck.deckTwo.splice(0, bet);
  const cardsLost = gameDeck.deckOne.splice(0, bet);
  cardsWon.forEach((card) => {
    gameDeck.deckTwo.push(card);
  });
  cardsLost.forEach((card) => {
    gameDeck.deckTwo.push(card);
  });
  lastWinner = 'cpu';
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
  lastWinner = 'draw';
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
