class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord(); // The secret word for the current game
    this.letters = []; // Letters that have been guessed
    this.guessedLetters = ''; // Correct letters guessed
    this.errorsLeft = 10;
  }

  pickWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  checkIfLetter(keyCode) {
    return (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122);
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
    }
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  checkWinner() {
    const uniqueLettersInSecretWord = [...new Set(this.secretWord)];
    const guessedLettersArray = this.guessedLetters.split('');

    return uniqueLettersInSecretWord.every(letter =>
      guessedLettersArray.includes(letter)
    );
  }
}

let hangman;
let hangmanCanvas; // Global variable for canvas
const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.onclick=() => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
    
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord); // Initialize canvas instance

    hangman.errorsLeft = 5;
    hangman.letters = [];
    hangman.guessedLetters = '';

    hangmanCanvas.createBoard(); // Initialize canvas
  };

}

document.addEventListener('keydown', event => {
  const keyCode = event.keyCode;
  const letter = event.key.toLowerCase();

  if (hangman.checkIfLetter(keyCode)) {
    if (hangman.checkClickedLetters(letter)) {
      hangman.letters.push(letter);

      if (hangman.secretWord.includes(letter)) {
        hangman.addCorrectLetter(letter);

        for (let i = 0; i < hangman.secretWord.length; i++) {
          if (hangman.secretWord[i] === letter) {
            hangmanCanvas.writeCorrectLetter(i); // Update canvas with correct letter
          }
        }

        if (hangman.checkWinner()) {
          console.log('You win!');
          hangmanCanvas.winner();
        }
      } else {
        hangman.addWrongLetter(letter);
        hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
        hangmanCanvas.drawHangman(hangman.errorsLeft);

        if (hangman.checkGameOver()) {
          console.log('Game over!');
          hangmanCanvas.gameOver();
        }
      }
    } else {
      console.log('Letter already guessed.');
    }
  } else {
    console.log('Not a valid letter.');
  }
});