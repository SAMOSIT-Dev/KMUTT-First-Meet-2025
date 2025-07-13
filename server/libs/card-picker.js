const { random, shuffle } = require("./utils");

const cardTypes = ["Hearts", "Diamonds", "Spades", "Clubs"];

const buildSetOfCards = () => {
  const totalCards = cardTypes.length * 12;
  const items = new Array(totalCards);
  let index = 0;

  for (let i = 0; i < cardTypes.length; i++) {
    const type = cardTypes[i];
    for (let num = 1; num <= 12; num++) {
      items[index++] = { type, num };
    }
  }

  return items;
};

exports.randomCardNumberAndType = () => {
  const type = cardTypes[random(0, cardTypes.length)];
  const number = random(1, 13);
  return { type, number };
};

exports.Card = class {
  #deck = [];
  #assignedCards = new Map();

  constructor(length) {
    this.length = length;
    this.#init();
  }

  #init() {
    const setsNeeded = Math.ceil(this.length / 12); // 12 cards per type
    for (let i = 0; i < setsNeeded; i++) {
      this.#deck.push(...buildSetOfCards());
    }
  }

  assignToUsers(userIds) {
    const shuffledDeck = shuffle([...this.#deck]);
    const assigned = new Map();
    let deckIndex = 0;

    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      let card;

      if (deckIndex < shuffledDeck.length) {
        // Assign unique card from deck
        card = shuffledDeck[deckIndex];
        deckIndex++;

        // Remove this card (type + num) once from original deck
        const index = this.#deck.findIndex(
          (c) => c.type === card.type && c.num === card.num
        );
        if (index !== -1) this.#deck.splice(index, 1);
      } else {
        // Deck exhausted: assign a completely random card (duplicates allowed)
        const type = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        const num = Math.floor(Math.random() * 12) + 1;
        card = { type, num };
      }

      assigned.set(userId, card);
    }

    this.#assignedCards = assigned;
    return assigned;
  }

  getAssignedCards() {
    return this.#assignedCards;
  }
};
