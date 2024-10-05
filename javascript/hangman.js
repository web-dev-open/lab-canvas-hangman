class Hangman {
  constructor(words) {
    this.words = words;
    // ... your code goes here
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    // ... your code goes here
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  checkIfLetter(keyCode) {
    // ... your code goes here
    return keyCode >= 65 && keyCode <= 90;
  }

  checkClickedLetters(letter) {
    // ... your code goes here
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    // ... your code goes here
    this.guessedLetters += letter;
  }

  addWrongLetter(letter) {
    // ... your code goes here
    this.errorsLeft -= 1;
    this.letters.push(letter);
  }

  checkGameOver() {
    // ... your code goes here
    return this.errorsLeft === 0;
  }

  checkWinner() {
    // ... your code goes here
    return [...this.secretWord].every((char) => this.guessedLetters.includes(char));
  }
}

let hangman;
let hangmanCanvas;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    // ... your code goes here
    hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  // ... your code goes here
  if (hangman && hangman.checkIfLetter(event.keyCode)) {
    const letter = event.key.toUpperCase();

    if (hangman.checkClickedLetters(letter)) {
      if (hangman.secretWord.toUpperCase().includes(letter)) {
        hangman.addCorrectLetter(letter);

        hangman.secretWord.split('').forEach((char, index) => {
          if (char.toUpperCase() === letter) {
            hangmanCanvas.writeCorrectLetter(index);
          }
        });

        if (hangman.checkWinner()) {
          hangmanCanvas.winner();
        }
      } else {
        hangman.addWrongLetter(letter);
        hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
        hangmanCanvas.drawHangman(hangman.errorsLeft);

        if (hangman.checkGameOver()) {
          hangmanCanvas.gameOver();
        }
      }
    }
  }
});
