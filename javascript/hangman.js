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
    return (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122);
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    return this.checkWinner();
  }

  addWrongLetter(letter) {
    if (!this.letters.includes(letter)) {
      this.letters.push(letter);
      this.errorsLeft--;
    }
    return !this.checkGameOver();
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  checkWinner() {
    return this.secretWord.split('').every(letter => this.guessedLetters.includes(letter));
  }
}

// Example usage:
const hangmanGame = new Hangman(['apple', 'banana', 'orange']);
console.log(hangmanGame.secretWord); // Example output: "banana"


let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
     hangman.secretWord = hangman.pickWord();
     hangmanCanvas = new HangmanCanvas(hangman.secretWord);
     hangmanCanvas.createBoard();

    // ... your code goes here
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  const keyPressed = event.key.toLowerCase(); // Get the pressed key in lowercase

  // Check if the pressed key is a letter
  if (/^[a-z]$/.test(keyPressed)) {
    // Call the Hangman method to handle the letter press
    if (hangman.checkIfLetter(event.keyCode) && hangman.checkClickedLetters(keyPressed)) {
      if (hangman.secretWord.includes(keyPressed)) {
        // Correct letter pressed
        const indices = hangman.secretWord.split('').map((letter, index) => letter === keyPressed ? index : -1).filter(index => index !== -1);
        indices.forEach(index => hangmanCanvas.writeCorrectLetter(index));
        if (hangman.addCorrectLetter(keyPressed)) {
          // Player won
          hangmanCanvas.winner();
        }
      } else {
        // Wrong letter pressed
        hangmanCanvas.writeWrongLetter(keyPressed, hangman.errorsLeft);
        if (!hangman.addWrongLetter(keyPressed)) {
          // Game over
          hangmanCanvas.gameOver();
        }
      }
    }
  }
});
