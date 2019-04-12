import Card from './card.js';

class Game {
  constructor() {
    this.cardCount = 16;
    this.board = null;
    this.score = null;
    this.cards = [];
    this.cardsChecked = [];
    this.turnCount = 0;
    this.points = 0;
    this.cardsImg = ['img/america.png', 'img/ironman.png', 'img/deadpool.png', 'img/hawkeye.png', 'img/hulk.png', 'img/spidey.png', 'img/thor.png', 'img/widow.png'];
    this.canGet = true;
  }
  isGameOver() {
    this.board.innerHTML = '<h1> YOU WON! GRATULATIONS</h1>';
  }
  cardReset() {
    for (const checked of this.cardsChecked) {
      checked.classList.remove('card-in-tab');
      checked.style.backgroundImage = 'url(img/marvel.jpg)';
    }
    this.cardsChecked = [];
    this.canGet = true;

  }
  cardRemove() {
    for (const checked of this.cardsChecked) {
      checked.style.backgroundImage = null;
      checked.classList.remove('card');
    }
    this.points += 2;
    document.querySelector('.points').textContent = ` You have: ${this.points} points`;
    this.cardsChecked = [];
    this.canGet = true;
    if (this.points === 16) {
      this.isGameOver();
    }
  }
  cardReveal(e) {
    const card = e.target;
    if (this.canGet) {
      if (card.classList.contains('card') && !card.classList.contains('card-checked')) {
        if (!this.cardsChecked[0] || (this.cardsChecked[0].dataset.index !== card.dataset.index)) {
          this.cardsChecked.push(card);
          card.classList.add('card-in-tab');
          card.style.backgroundImage = `url(${this.cardsImg[card.dataset.type]})`;
        }
        if (this.cardsChecked.length === 2) {
          this.canGet = false;
          this.turnCount++;
          if (
            this.cardsChecked[0].dataset.type === this.cardsChecked[1].dataset.type
          ) {
            setTimeout(this.cardRemove.bind(this), 750);
          } else {
            setTimeout(this.cardReset.bind(this), 750);
          }
          document.querySelector('.turn-count').textContent = `Turn:${this.turnCount}`;


        }
      }
    }
  } // koniec funkcji
  startGame() {
    this.turnCount = 0;
    this.points = 0;
    this.cards = [];
    this.cardsChecked = [];
    this.canGet = true;
    this.board = document.querySelector(".board");
    this.board.innerHTML = "";
    document.querySelector('.turn-count').textContent = `Turn:${this.turnCount}`;
    document.querySelector('.points').textContent = ` You have: ${this.points} points`;
    for (let i = 0; i < this.cardCount; i++) {
      const number = Math.floor(i / 2);
      this.cards.push(number);
    }
    this.cards.sort(() => Math.random() - 0.5);

    for (let i = 0; i < this.cardCount; i++) {
      const { cards, cardReveal } = this;
      const card = new Card('/img/marvel.jpg', i, cards[i], cardReveal.bind(this));
    }
  }
} // koniec klasy
const game = new Game();
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("button.startGame")
    .addEventListener("click", function () {
      return game.startGame();
    });
});
// const attay = [1, 2, 3, 4, 5];
// attay.sort(() => Math.random() - 0.5);