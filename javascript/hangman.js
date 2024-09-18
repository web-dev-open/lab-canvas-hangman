class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    // Select a random word from the `words` array
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  checkIfLetter(keyCode) {
    // Check if the keyCode corresponds to a letter (a-z)
    return keyCode >= 65 && keyCode <= 90;
  }

  checkClickedLetters(letter) {
    // Check if the letter has already been clicked
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    // Add the letter to `guessedLetters` and check for win
    this.guessedLetters += letter;
    this.checkWinner();
  }

  addWrongLetter(letter) {
    // Decrement errorsLeft and update letters if not already clicked
    this.errorsLeft--;
    if (this.checkClickedLetters(letter)) {
      this.letters.push(letter);
    }
  }

  checkGameOver() {
    // Check if errorsLeft is 0 (game over)
    return this.errorsLeft === 0;
  }

  checkWinner() {
    // Check if all letters in the secretWord are guessed
    return this.secretWord.split('').every(letter => this.guessedLetters.includes(letter));
  }
}