// The Hangman class created by Nathan Chan is responsible for creating the game logic. 

class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
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
    return this.checkWinner();
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
    this.letters.push(letter);
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  
  checkWinner() {
    return this.secretWord.split('').every(letter => this.guessedLetters.includes(letter));
  }
}

let hangman;
let hangmanCanvas;

document.addEventListener('DOMContentLoaded', () => {
  const startGameButton = document.getElementById('start-game-button');

  if (startGameButton) {
    startGameButton.addEventListener('click', () => {
      hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
      hangman.secretWord = hangman.pickWord();
      hangmanCanvas = new HangmanCanvas(hangman.secretWord);
      hangmanCanvas.createBoard();
    });
  }
});

document.addEventListener('keydown', event => {
  if (!hangmanCanvas) return; // Ensure the canvas is initialized

  const letter = event.key.toLowerCase();

  if (hangman.checkIfLetter(event.keyCode)) {
    if (hangman.checkClickedLetters(letter)) {
      if (hangman.secretWord.includes(letter)) {
        hangman.secretWord.split('').forEach((char, index) => {
          if (char === letter) {
            hangmanCanvas.writeCorrectLetter(index);
          }
        });

        if (hangman.addCorrectLetter(letter)) {
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