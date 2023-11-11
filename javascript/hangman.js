
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
    return (keyCode >= 65 && keyCode <= 90); // ASCII codes for a-z
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    if (this.checkWinner()) {
      return true; // User won
    }
    return false; // User didn't win yet
  }

  addWrongLetter(letter) {
    if (!this.letters.includes(letter)) {
      this.letters.push(letter);
      this.errorsLeft--;
    }
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  checkWinner() {
    return this.secretWord.split('').every(letter => this.guessedLetters.includes(letter));
  }
}

// Example usage:
const hangmanGame = new Hangman(['apple', 'banana', 'cherry']);

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    // hangman.secretWord = hangman.pickWord();
    // hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    // ... your code goes here
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  // ... your code goes here
});
// Inside your Hangman game logic (in the 'hangman.js' file)

// When the game is over (e.g., no errors left)
if (hangmanCanvas.checkGameOver()) {
  hangmanCanvas.gameOver();
}

// When the player wins
if (hangmanCanvas.checkWinner()) {
  hangmanCanvas.winner();
}

