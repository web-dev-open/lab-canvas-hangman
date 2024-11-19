class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
    // ... your code goes here
  }

  pickWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
    // ... your code goes here
  }

  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90;
    // ... your code goes here
  }

  checkClickedLetters(letter) {
    return this.letters.includes(letter);
    // ... your code goes here
  }

  addCorrectLetter(letter) {
    if (!this.guessedLetters.includes(letter)) {
      this.guessedLetters += letter;
      // Check if user has won
      if (this.checkWinner()) {
        console.log("You've won!");
      }
    }
    // ... your code goes here
  }

  addWrongLetter(letter) {
    if (!this.letters.includes(letter)) {
      this.letters.push(letter);
      this.errorsLeft--;
      // Check if game is over
      if (this.checkGameOver()) {
        console.log("Game Over!");
      }
    }
    // ... your code goes here
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
    // ... your code goes here
  }

  checkWinner() {
    return [...new Set(this.secretWord)].every(letter => this.guessedLetters.includes(letter));
    // ... your code goes here
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
    
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    
    document.addEventListener('keydown', event => {
      if (hangman.checkIfLetter(event.keyCode)) {
        const letter = event.key.toLowerCase();
        if (!hangman.checkClickedLetters(letter)) {
          hangman.addCorrectLetter(letter); // or hangman.addWrongLetter(letter)
          hangmanCanvas.writeCorrectLetter(hangman.secretWord.indexOf(letter));
        }
      }
      hangmanCanvas.drawHangman(hangman.errorsLeft);
      
      if (hangman.checkGameOver()) {
        hangmanCanvas.gameOver();
      } else if (hangman.checkWinner()) {
        hangmanCanvas.winner();
      }
    });
    
    console.log(`Secret word is: ${hangman.secretWord}`);
  });
}