function createDeck() {
  const suits = ['clubs', 'diamonds', 'hearts', 'spades'];

  let card;
  let deck = [];

  suits.forEach((suit) => {
    for (let i = 2; i <= 14; i++) {
      let displayedValue = checkDisplayedValue(i);
      card = {
        value: i,
        suit: suit,
        displayedValue: displayedValue,
      };
      deck.push(card);
    }
  });
  return deck;
}

function checkDisplayedValue(value) {
  switch (value) {
    case 11:
      return 'J';
    case 12:
      return 'Q';
    case 13:
      return 'K';
    case 14:
      return 'A';
    default:
      return value.toString();
  }
}

createDeck();

module.exports = { createDeck };
