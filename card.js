class Card {
    constructor(bgImg, index, type, click) {
        this.puzzle = document.createElement('div');
        this.img = `url(${bgImg})`;
        this.index = index;
        this.type = type;
        this.click = click;
        this.createPuzzle();
    }
    createPuzzle() {
        const { puzzle, img, index, type, click } = this;
        puzzle.classList.add('box');
        puzzle.classList.add('card');
        // puzzle.style.backgroundImage = img;
        puzzle.dataset.type = type;
        puzzle.dataset.index = index;
        puzzle.addEventListener('click', click);
        document.querySelector('.board').appendChild(puzzle);
    }
}

export default Card;

// const card = document.createElement("div");
// card.classList.add('box');
// card.classList.add("card");
// card.dataset.type = this.cards[i];
// card.dataset.index = i;
// card.addEventListener("click", this.cardReveal.bind(this));
// this.board.appendChild(card);
