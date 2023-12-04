class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
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
    this.guessedLetters += letter;
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
    this.letters.push(letter);
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  checkWinner() {
    return this.secretWord
      .split("")
      .every((letter) => this.guessedLetters.includes(letter));
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    hangmanCanvas.createBoard();
    hangmanCanvas.drawHangman(hangman.errorsLeft);

  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  if (hangman.checkClickedLetters(event.key)) {
    if (hangman.secretWord.includes(event.key)) {
      hangman.addCorrectLetter(event.key);
      hangmanCanvas.writeCorrectLetter(event.key);

      // Check for a win and call the winner method
      if (hangman.checkWinner()) {
        hangmanCanvas.winner();
      }
    } else {
      hangman.addWrongLetter(event.key);
      hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft);
      hangmanCanvas.drawHangman(hangman.errorsLeft);

      // Check for game over and call the gameOver method
      if (hangman.checkGameOver()) {
        hangmanCanvas.gameOver();
      }
    }
  }


});
