class Card {
    constructor(img, index, type, click) {
        this.puzzle = document.createElement('div');
        this.puzzleFront = document.createElement('div');
        this.puzzleBack = document.createElement('div');
        this.img = `url(${img})`;
        this.index = index;
        this.type = type;
        this.click = click;
        this.createPuzzle();
    }
    createPuzzle() {
        const { puzzle, img, index, type, click, puzzleFront, puzzleBack } = this;
        puzzle.classList.add('box');
        puzzle.classList.add('card');
        puzzle.dataset.type = type;
        puzzle.dataset.index = index;
        puzzleFront.classList.add('front');
        puzzleFront.style.backgroundImage = img;
        puzzleBack.classList.add('back');
        puzzle.appendChild(puzzleFront);
        puzzle.appendChild(puzzleBack);
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
