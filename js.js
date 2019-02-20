class Game {
  constructor() {
    this.cardCount = 16;
    this.board = null;
    this.score = null;
    this.cards = [];
    this.cardsChecked = [];
    this.turnCount = 0;
    this.points = 0;
    this.cardsImg = ['img/america.jpg','img/ironman.jpg','img/deadpool.jpg','img/hawkeye.jpg','img/hulk.jpg','img/spidey.jpg','img/thor.jpg','img/widow.jpg'];
    this.canGet = true;
  }
  isGameOver(){
    this.board.innerHTML = '<h1> YOU WON! GRATULATIONS</h1>';
  }
  cardReset() {
    this.cardsChecked[0].classList.remove('card-in-tab');
    this.cardsChecked[1].classList.remove('card-in-tab');
    this.cardsChecked[0].style.backgroundImage = 'url(img/marvel.jpg)';
    this.cardsChecked[1].style.backgroundImage = 'url(img/marvel.jpg)';
    this.cardsChecked = [];
    this.canGet = true;

  }
  cardRemove() {

     this.cardsChecked[0].style.backgroundImage = null;
     this.cardsChecked[1].style.backgroundImage =null;
    this.cardsChecked[0].classList.remove('card');
    this.cardsChecked[1].classList.remove('card');
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
            setTimeout(this.cardRemove.bind(this), 800);
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
    document.querySelector('.points').textContent = ` You have: ${this.points} points`;
    for (let i = 0; i < this.cardCount; i++) {
      const number = Math.floor(i / 2);
      this.cards.push(number);
    }
    this.cards.sort(() => Math.random() - 0.5);

    for (let i = 0; i < this.cardCount; i++) {
      const card = document.createElement("div");
      card.classList.add('box');
      card.classList.add("card");
      card.dataset.type = this.cards[i];
      card.dataset.index = i;
      card.addEventListener("click", this.cardReveal.bind(this));
      this.board.appendChild(card);
    }
  }
}// koniec klasy

const game = new Game();
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("button.startGame")
    .addEventListener("click", function () {
      return game.startGame();
    });
});
// const attay = [1, 2, 3, 4, 5];
// attay.sort(() => Math.random() - 0.5);