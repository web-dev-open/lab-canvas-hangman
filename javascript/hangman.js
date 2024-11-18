class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90;
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
  }

  addWrongLetter(letter) {
    if (!this.letters.includes(letter)) {
      this.errorsLeft--;
      this.letters.push(letter);
      hangmanCanvas.drawHangman(this.errorsLeft);  // Draw hagman figure after wrong guess
    }
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  checkWinner() {
    return [...this.secretWord].every(letter => this.guessedLetters.includes(letter));
  }
}

let hangman;
let hangmanCanvas;

const startGameButton = document.getElementById('start-game-button');

startGameButton.addEventListener('click', () => {
  hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
  hangmanCanvas = new HangmanCanvas(hangman.secretWord);
  hangmanCanvas.createBoard();
});

document.addEventListener('keydown', event => {
  if (hangman && hangmanCanvas) {
    const letter = event.key.toLowerCase();

    if (hangman.checkIfLetter(event.keyCode)) {
      if (hangman.checkClickedLetters(letter)) {
        if (hangman.secretWord.includes(letter)) {
          hangman.addCorrectLetter(letter);
          hangmanCanvas.writeCorrectLetter(letter);
        } else {
          hangman.addWrongLetter(letter);
          hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
        }

        if (hangman.checkGameOver()) hangmanCanvas.gameOver();
        if (hangman.checkWinner()) hangmanCanvas.winner();
      }
    }
  }
});