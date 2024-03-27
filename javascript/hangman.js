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
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
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
  // Check if user has guessed all letters in the secret word
  if (this.secretWord.split('').every(char => this.guessedLetters.includes(char))) {
    return true; // User has won
  }
  return false;
  }

  addWrongLetter(letter) {
    // ... your code goes here
    this.errorsLeft--;
    this.letters.push(letter);
    return this.errorsLeft === 0;
  }

  checkGameOver() {
    // ... your code goes here
    return this.errorsLeft === 0;
  }

  checkWinner() {
    // ... your code goes here
    return this.secretWord.split('').every(char => this.guessedLetters.includes(char)); // Check if user has won
  }
}

let hangman;
let hangmanCanvas;
const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener("click", event => {
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
  if (hangman && hangmanCanvas) {
    const keyCode = event.keyCode; 
    const letter = String.fromCharCode(keyCode).toLowerCase();
    if (hangman.checkIfLetter(keyCode) && hangman.checkClickedLetters(letter)) {
      if (hangman.secretWord.includes(letter)) {
        hangman.addCorrectLetter(letter);
        hangman.secretWord.split('').forEach((char, index) => {
          if (char === letter) {
            hangmanCanvas.writeCorrectLetter(index);
          }
        });
      } else {
        hangman.addWrongLetter(letter);
        hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
        hangmanCanvas.drawHangman(hangman.errorsLeft);
      }
    }
  }
});
