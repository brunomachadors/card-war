const { createDeck } = require('../cards/deck');

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
  }
  return deck;
}

const deck = createDeck();

const shuffledDeck = shuffleDeck(deck);

function splitDeck(shuffledDeck) {
  const playerOneDeck = [];
  const playerTwoDeck = [];
  shuffledDeck.forEach((card, index) => {
    if (index % 2 === 0) {
      playerOneDeck.push(card);
    } else {
      playerTwoDeck.push(card);
    }
  });

  console.log(playerOneDeck.length);
  console.log(playerOneDeck);
  console.log(playerTwoDeck.length);
  console.log(playerTwoDeck);

  return { deckOne: playerOneDeck, deckTwo: playerTwoDeck };
}

splitDeck(shuffledDeck);
