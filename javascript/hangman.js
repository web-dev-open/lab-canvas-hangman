class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  }

  pickWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90;
  }

  checkClickedLetters(letter) {
    return this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;

    if (this.checkWinner()) {
      console.log("Congratulations! You've won!");
    }
  }

  addWrongLetter(letter) {
    if (!this.checkClickedLetters(letter)) {
      this.letters.push(letter);
      this.errorsLeft--;

      if (this.checkGameOver()) {
        console.log("Game Over! You've lost.");
      }
    }
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  checkWinner() {
    const secretWordSet = new Set(this.secretWord);

    for (const char of secretWordSet) {
      if (!this.guessedLetters.includes(char)) {
        return false;
      }
    }
    return true;
  }
}

let hangman;

const startGameButton = document.getElementById("start-game-button");

if (startGameButton) {
  startGameButton.addEventListener("click", (event) => {
    hangman = new Hangman([
      "node",
      "javascript",
      "react",
      "miami",
      "paris",
      "amsterdam",
      "lisboa",
    ]);
    hangman.secretWord = hangman.pickWord();
    console.log(`Secret Word: ${hangman.secretWord}`);
  });
}

document.addEventListener("keydown", (event) => {
  const letter = event.key.toLowerCase();
  const keyCode = event.keyCode;

  if (hangman.checkIfLetter(keyCode)) {
    if (!hangman.checkClickedLetters(letter)) {
      if (hangman.secretWord.includes(letter)) {
        hangman.addCorrectLetter(letter);
      } else {
        hangman.addWrongLetter(letter);
      }
    }
  }
});
