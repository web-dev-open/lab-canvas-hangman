class Hangman {
  constructor(words) {
    this.words = words;
    // ... your code goes here
    words = ['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa'];
    this.secretWord = this.pickWord();
    this.errorLeft = 10;
    this.getLetters = [];
    this.getLettered = [];
  }

  pickWord() {
    // ... your code goes here
    let randomWord = Math.floor(Math.random() * this.words.length);
    return this.words[randomWord];
  }

  checkIfLetter(keyCode) {
    // ... your code goes here
    if (keyCode >= 65 && keyCode <= 90) {
      return true;
    }else{
      return false;
    }
  }

  checkClickedLetters(letter) {
    // ... your code goes here
    if (this.getLetters.includes(letter)) {
      return false;
    }else{
      return true;
    }
  }

  addCorrectLetter(letter) {
    // ... your code goes here
    this.getLettered.push(letter);
  }

  addWrongLetter(letter) {
    // ... your code goes here
    this.getLetters.push(letter);
    this.errorLeft--;

  }

  checkGameOver() {
    // ... your code goes here
    if (this.errorLeft > 0) {
      return false;
    }
    else{
      return true;
    }
  }

  checkWinner() {
    // ... your code goes here
    if (this.getLettered.length === this.secretWord.length) {
      return true;
  }
  else{
    return false;
  }
}
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    // hangman.secretWord = hangman.pickWord();
    // hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    // ... your code goes here
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
    hangmanCanvas.drawLines();
    
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  // ... your code goes here
  if (hangman.checkIfLetter(event.keyCode)) {
    if (hangman.checkClickedLetters(event.key)) {
      if (hangman.secretWord.includes(event.key)) {
        hangman.addCorrectLetter(event.key);
        hangmanCanvas.writeCorrectLetter(event.key);
        if (hangman.checkWinner()) {
          hangmanCanvas.winner();
        }
      }
      else{
        hangman.addWrongLetter(event.key);
        hangmanCanvas.writeWrongLetter(event.key, hangman.errorLeft);
        hangmanCanvas.drawHangman(hangman.errorLeft);
        if (hangman.checkGameOver()) {
          hangmanCanvas.gameOver();
        }
      }
    }
  }
});
