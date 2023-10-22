class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = "";
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  }

  pickWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.secretWord = this.words[randomIndex];
    return this.secretWord;
  }

  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90; // Check if keyCode corresponds to a letter (a-z).
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter); // Check if the letter hasn't been clicked.
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    if (this.checkWinner()) {
      // Handle winning condition
    }
  }

  addWrongLetter(letter) {
    this.letters.push(letter);
    this.errorsLeft--;

    if (this.checkGameOver()) {
      // Handle game over condition
    }
  }

  checkGameOver() {
    return this.errorsLeft <= 0; // Game is over when there are no more errors left.
  }

  checkWinner() {
    for (let letter of this.secretWord) {
      if (!this.guessedLetters.includes(letter)) {
        return false; // If any letter is not guessed, the game is not won.
      }
    }
    return true; // All letters have been guessed, the game is won.
  }
}

let hangman;

const startGameButton = document.getElementById("start-game-button");
console.log(startGameButton);

if (startGameButton) {
  startGameButton.addEventListener("click", (event) => {
    console.log("game start");
    hangman = new Hangman([
      "node",
      "javascript",
      "react",
      "miami",
      "paris",
      "amsterdam",
      "lisboa",
    ]);
    hangman.pickWord();

    const hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    hangmanCanvas.createBoard();
    hangmanCanvas.drawLines();
  });
}
