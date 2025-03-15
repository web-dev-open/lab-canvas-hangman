class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  }

  // Method to pick a random word
  pickWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  // Check if the key pressed is a valid letter (a-z)
  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90; // Key codes for a-z
  }

  // Check if a letter was already guessed
  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  // Add the letter to guessedLetters if correct
  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    this.checkWinner();
  }

  // Add the letter to letters and decrease errorsLeft if incorrect
  addWrongLetter(letter) {
    if (!this.letters.includes(letter)) {
      this.letters.push(letter);
      this.errorsLeft--;
    }
  }

  // Check if the game is over (errorsLeft is 0)
  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  // Check if the player has guessed the word
  checkWinner() {
    const secretWordArray = this.secretWord.split("");
    for (let letter of secretWordArray) {
      if (!this.guessedLetters.includes(letter)) {
        return false;
      }
    }
    return true;
  }
}

