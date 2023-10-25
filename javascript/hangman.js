class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = ''; // The word to be guessed
    this.guessedLetters = []; // Guessed letters
    this.errorsLeft = 6; // Number of allowed errors
    // ... your code goes here
  }

  pickWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.secretWord = this.words[randomIndex];
    return this.secretWord;
    // ... your code goes here
  }

  checkIfLetter(keyCode) {
    return (keyCode >= 65 && keyCode <= 90); // Check if the key pressed is a letter (A-Z)
    // ... your code goes here
  }

  checkClickedLetters(letter) {
    return !this.guessedLetters.includes(letter);
    // ... your code goes here
  }

  addCorrectLetter(letter) {
    if (this.secretWord.includes(letter)) {
      this.guessedLetters.push(letter);
    }
    // ... your code goes here
  }

  addWrongLetter(letter) {
    if (!this.secretWord.includes(letter)) {
      this.guessedLetters.push(letter);
      this.errorsLeft--;
    }
    // ... your code goes here
  }

  checkGameOver() {
    return this.errorsLeft === 0 || this.checkWinner();
    // ... your code goes here
  }

  checkWinner() {
    return this.secretWord.split('').every(letter => this.guessedLetters.includes(letter));
  }
    // ... your code goes here
  }


let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
    hangman.pickWord(); // Pick a random word from the list

    // Initialize the HangmanCanvas with the secret word
    hangmanCanvas.init(hangman.secretWord);

    // HINT (uncomment when start working on the canvas portion of the lab)
    // hangman.secretWord = hangman.pickWord();
    // hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    // ... your code goes here
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  if (hangman && hangman.checkIfLetter(event.keyCode) && hangman.checkClickedLetters(event.key)) {
    if (hangman.secretWord.includes(event.key)) {
      hangman.addCorrectLetter(event.key);
      hangmanCanvas.writeCorrectLetter(event.key); // Implement this method in HangmanCanvas
    } else {
      hangman.addWrongLetter(event.key);
      hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft); // Implement this method in HangmanCanvas
      if (hangman.checkGameOver()) {
        // Handle game over
        // You can show a message, reveal the word, or do other actions here
      }
    }
  }
  // ... your code goes here
});
