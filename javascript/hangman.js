class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord(); // Initialize the secret word
    this.letters = []; // Array to store guessed letters
    this.guessedLetters = ''; // String to store guessed letters
    this.errorsLeft = 10; // Initial errors left
  }

  pickWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90; // Check if the keyCode is between A (65) and Z (90)
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    // Check if the user has guessed all letters of the word
    return this.checkWinner();
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
    if (!this.letters.includes(letter)) {
      this.letters.push(letter);
    }
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  checkWinner() {
    for (let char of this.secretWord) {
      if (!this.guessedLetters.includes(char)) {
        return false;
      }
    }
    return true;
  }
}

let hangman;
let hangmanCanvas;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', () => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    // Set up the canvas and start the game
    hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', event => {
  const letter = event.key.toLowerCase();
  if (hangman.checkIfLetter(event.keyCode) && hangman.checkClickedLetters(letter)) {
    if (hangman.secretWord.includes(letter)) {
      hangman.addCorrectLetter(letter);
      for (let i = 0; i < hangman.secretWord.length; i++) {
        if (hangman.secretWord[i] === letter) {
          hangmanCanvas.writeCorrectLetter(i);
        }
      }
    } else {
      hangman.addWrongLetter(letter);
      hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
      hangmanCanvas.drawHangman(hangman.errorsLeft);
    }

    if (hangman.checkGameOver()) {
      hangmanCanvas.gameOver();
    } else if (hangman.checkWinner()) {
      hangmanCanvas.winner();
    }
  }
});
