class Hangman {
  constructor(words) {
    this.words = words; // Array of possible words
    this.secretWord = this.pickWord(); // Randomly chosen word
    this.letters = []; // Array to track already picked letters
    this.guessedLetters = ''; // String to store correctly guessed letters
    this.errorsLeft = 10; // Number of guesses left
  }

  /**
   * Selects a random word from the words array
   * @returns {string} - Random word
   */
  pickWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  /**
   * Checks if the key pressed is a letter (a-z)
   * @param {number} keyCode - Key code of the pressed key
   * @returns {boolean} - True if the key is a letter, false otherwise
   */
  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90; // ASCII codes for A-Z
  }

  /**
   * Checks if the letter has already been clicked
   * @param {string} letter - Letter to check
   * @returns {boolean} - True if the letter is new, false otherwise
   */
  checkClickedLetters(letter) {
    return !this.letters.includes(letter); // Returns true if the letter is not already in the array
  }

  /**
   * Adds the correct letter to the guessedLetters property
   * @param {string} letter - Letter guessed correctly
   */
  addCorrectLetter(letter) {
    this.guessedLetters += letter; // Add letter to guessed letters
    this.checkWinner(); // Check if the player has won
  }

  /**
   * Adds the wrong letter to the letters array and decreases errorsLeft
   * @param {string} letter - Letter guessed incorrectly
   */
  addWrongLetter(letter) {
    if (!this.letters.includes(letter)) {
      this.letters.push(letter); // Add the letter to the tracked letters
      this.errorsLeft--; // Decrease the number of attempts left
    }
  }

  /**
   * Checks if the game is over
   * @returns {boolean} - True if no errors left, false otherwise
   */
  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  /**
   * Checks if the user has guessed all the letters in the secret word
   * @returns {boolean} - True if the player has won, false otherwise
   */
  checkWinner() {
    const secretWordArray = Array.from(new Set(this.secretWord.split(''))); // Unique letters of the secret word
    const guessedLettersArray = Array.from(new Set(this.guessedLetters.split(''))); // Unique guessed letters

    return secretWordArray.every((letter) => guessedLettersArray.includes(letter)); // True if all letters are guessed
  }
}

// Initialize the Hangman game
let hangman;

// Start button click event
const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', () => {
    hangman = new Hangman([
      'node',
      'javascript',
      'react',
      'miami',
      'paris',
      'amsterdam',
      'lisboa',
    ]);

    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    console.log(`The secret word is: ${hangman.secretWord}`);
  });
}

// Handle keyboard events
document.addEventListener('keydown', (event) => {
  if (!hangman) return; // If the game hasn’t started, exit

  const key = event.key.toLowerCase();
  const keyCode = event.keyCode;

  if (!hangman.checkIfLetter(keyCode)) return; // Ignore if not a letter
  if (!hangman.checkClickedLetters(key)) return; // Ignore if letter already guessed

  hangman.letters.push(key); // Track the guessed letter

  if (hangman.secretWord.includes(key)) {
    // Correct guess
    hangman.addCorrectLetter(key);
  } else {
    // Incorrect guess
    hangman.addWrongLetter(key);
  }

  // Check game status
  if (hangman.checkGameOver()) {
    alert('Game over! Better luck next time!');
  } else if (hangman.checkWinner()) {
    alert('Congratulations! You won!');
  }
});
