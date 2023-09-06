export function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function splitDeck(gameDeck) {
  const playerOneDeck = [];
  const playerTwoDeck = [];
  gameDeck.forEach((card, index) => {
    if (index % 2 === 0) {
      playerOneDeck.push(card);
    } else {
      playerTwoDeck.push(card);
    }
  });

  const decks = { deckOne: playerOneDeck, deckTwo: playerTwoDeck };

  return decks;
}
