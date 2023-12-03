class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedWord = [];
    this.errorsLeft = 10;
  }

  pickWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90;
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.letters.push(letter);
    const indexes = [];
    for (let i = 0; i < this.secretWord.length; i++) {
      if (this.secretWord[i] === letter) {
        indexes.push(i);
      }
    }

    for(const index of indexes) {
      this.guessedWord[index] = letter;
    }
    
    return indexes;
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
    this.letters.push(letter);
    this.checkGameOver();
  }

  checkGameOver() {
    return this.errorsLeft === 0;
  }

  checkWinner() {
    return this.guessedWord.join('') === this.secretWord;
  }
}

let hangman, canvas;

const startGameButton = document.getElementById('start-game-button');

if(startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
    hangman.secretWord = hangman.pickWord();
    canvas = new HangmanCanvas(hangman.secretWord);
    canvas.createBoard();
    canvas.drawLines();
  });
}

document.addEventListener('keydown', event => {
    if (hangman.checkIfLetter(event.keyCode)) {
    const letter = event.key;      
    if (hangman.checkClickedLetters(letter)) {
      const correctIndexes = hangman.addCorrectLetter(letter);
      if (correctIndexes.length > 0) {
        canvas.writeCorrectLetter(correctIndexes);
        if(hangman.checkWinner()) canvas.winner();
      } else {
        if(hangman.checkGameOver()) canvas.gameOver();
        hangman.addWrongLetter(letter);
        const errorsLeft = hangman.errorsLeft;
        canvas.writeWrongLetter(letter, errorsLeft);
        canvas.drawHangman(errorsLeft);
      }
    } else {
      alert('Repeated letter. Enter a different letter.');
    }
  }
});