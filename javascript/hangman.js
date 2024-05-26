class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = '';
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  checkIfLetter(keyCode) {
    return /^[A-Z]$/.test(keyCode);
  }

  checkClickedLetters(letter) {
    return this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
  }

  addWrongLetter(letter) {
    this.errorsLeft -= 1;
    if (!this.letters.includes(letter)) {
      this.letters.push(letter);
    }
  }

  checkGameOver() {
    return this.errorsLeft < 0;
  }

  checkWinner() {
    if(this.guessedLetters.length==this.secretWord.length)
      {
        return true 
      }
      return false 
    }
  }


let words = ['Tailwind', 'node', 'java', 'django', 'html', 'react'];
let hint = [
  'A CSS framework',
  'A JavaScript runtime',
  'A programming language launched in 1995 by Sun Microsystems',
  'A Python framework for the backend',
  'A markup language for websites',
  'A JavaScript framework',
];
let hangman;
let hangmanCanvas;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', (event) => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
    let pickedWord = hangman.pickWord();
    hangman.secretWord = pickedWord.toUpperCase();
    const hintString = hint[words.indexOf(pickedWord)];
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
    hangmanCanvas.writeHint(hintString);
  });
}

document.addEventListener('keydown', (event) => {
  if (hangman && !hangman.checkGameOver()) {
    let key = event.key.toUpperCase();
    if (hangman.checkIfLetter(key) && !hangman.checkClickedLetters(key)) {
      if (hangman.secretWord.includes(key)) {
        if (!hangman.guessedLetters.includes(key)) {
          for (let i = 0; i < hangman.secretWord.length; i++) {
            let ch = hangman.secretWord[i];
            if (ch === key) {
              hangman.addCorrectLetter(key);
              hangmanCanvas.writeCorrectLetter(i);
              if (hangman.checkWinner()) hangmanCanvas.winner();
            }
          }
        }
      } else {
        hangman.addWrongLetter(key);
        if (hangmanCanvas) {
          hangmanCanvas.writeWrongLetter(key, hangman.errorsLeft);
          hangmanCanvas.drawHangman(hangman.errorsLeft);
if (hangman.checkGameOver()) {
            hangmanCanvas.gameOver();
          }
        }
      }
    }
  }
});