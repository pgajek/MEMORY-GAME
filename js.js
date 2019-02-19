class Game {
  constructor() {
    this.cardCount = 16;
    this.board = null;
    this.score = null;
    this.cards = [];
    this.cardsChecked = [];
    this.turnCount = 0;
    this.points = 0;
    this.cardsImg = [];
    this.canGet = true;
  }
  cardReset() {
    this.cardsChecked[0].classList.remove('card-in-tab');
    this.cardsChecked[1].classList.remove('card-in-tab');
    this.cardsChecked = [];
    this.canGet = true;
  }
  cardRemove() {
    this.cardsChecked[0].classList.remove('card-in-tab');
    this.cardsChecked[1].classList.remove('card-in-tab');
    this.cardsChecked[0].classList.add('card-checked');
    this.cardsChecked[1].classList.add('card-checked');
    this.points += 2;
    document.querySelector('.points').textContent = ` You have:${this.points} points`;
    this.cardsChecked = [];
    this.canGet = true;
  }
  cardReveal(e) {
    const card = e.target;
    if (this.canGet) {
      if (card.classList.contains('card') && !card.classList.contains('card-checked')) {
        if (!this.cardsChecked[0] || (this.cardsChecked[0].dataset.index !== card.dataset.index)) {
          this.cardsChecked.push(card);
          card.classList.add('card-in-tab');

        }
        if (this.cardsChecked.length === 2) {
          this.canGet = false;
          this.turnCount++;
          if (
            this.cardsChecked[0].dataset.type === this.cardsChecked[1].dataset.type
          ) {
            setTimeout(this.cardRemove.bind(this), 500);
          } else {
            setTimeout(this.cardReset.bind(this), 500);
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
    document.querySelector('.points').textContent = ` You have:${this.points} points`;
    for (let i = 0; i < this.cardCount; i++) {
      const number = Math.floor(i / 2);
      this.cards.push(number);
    }
    this.cards.sort(() => Math.random() - 0.5);

    for (let i = 0; i < this.cardCount; i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.type = this.cards[i];
      card.dataset.index = i;
      card.textContent = card.dataset.type;
      card.addEventListener("click", this.cardReveal.bind(this));
      this.board.appendChild(card);
    }
  }
}

const game = new Game();
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("button.startGame")
    .addEventListener("click", function () {
      return game.startGame();
    });
});
// const attay = [1, 2, 3, 4, 5];
// attay.sort(() => Math.random() - 0.5);