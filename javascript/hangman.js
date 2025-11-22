class Hangman {
  constructor(words) {
    this.words = words;   // All the possible words
    this.secretWord = this.pickWord(); // Random selected word
    this.letters = []; // Already selected letters
    this.guessedLetters = ""; // Correct letters string
    this.errorsLeft = 10; // Errors allowed
  }

  // Return randomly selected word from the words array
  pickWord() {
    const randIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randIndex];
  }

  // Check if keyCode is A-Z
  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90;
  }

  // Check if letter was already clicked (true means NOT clicked yet)
  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  // Add correct letter to guessedLetters
  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    // Check if player has guessed all the letters (win condition)
    return this.checkWinner();
  }

  // Add wrong letter and reduce errors
  addWrongLetter(letter) {
    if(!this.letters.includes(letter)) {
      this.letters.push(letter); //store tried letters
    }
    this.errorLeft -= 1;
  }

  // If no errors left -> game over
  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  // Player wins if guessedLetters contains all letters of secretWord
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
