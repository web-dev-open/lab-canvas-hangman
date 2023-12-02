class Hangman {
  constructor(words) {
    this.words = words;
    // ... your code goes here
    this.secretWord = ''; 
    this.guessedLetters = [];
    this.errorsLeft = 6;
  }

  pickWord() {
    // ... your code goes here
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.secretWord = this.words[randomIndex];
    return this.secretWord;
  }

  checkIfLetter(keyCode) {
    // ... your code goes here
    return (keyCode >= 65 && keyCode <= 90);
  }

  checkClickedLetters(letter) {
    // ... your code goes here
    return !this.guessedLetters.includes(letter);
  }

  addCorrectLetter(letter) {
    // ... your code goes here
    if (this.secretWord.includes(letter)) {
      this.guessedLetters.push(letter);
  }
}

  addWrongLetter(letter) {
    // ... your code goes here
    if (!this.secretWord.includes(letter)) {
      this.guessedLetters.push(letter);
      this.errorsLeft--;
    }
  }

  checkGameOver() {
    // ... your code goes here
    return this.errorsLeft === 0 || this.checkWinner();
  }

  checkWinner() {
    // ... your code goes here
    return this.secretWord.split('').every(letter => this.guessedLetters.includes(letter));
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
    hangman.pickWord();
    hangmanCanvas.init(hangman.secretWord);
  });
}

document.addEventListener('keydown', event => {
  if (hangman && hangman.checkIfLetter(event.keydown) && hangman.checkClickedLetters(event.key)) {
    if (hangman.secretWord.includes(event.key)) {
      hangman.addCorrectLetter(event.key);
      hangmanCanvas.writeCorrectLetter(event.key); // Implement this method in HangmanCanvas
    } else {
      hangman.addWrongLetter(event.key);
      hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft); // Implement this method in HangmanCanvas
      if (hangman.checkGameOver()) {
      }
    }
  }
});
