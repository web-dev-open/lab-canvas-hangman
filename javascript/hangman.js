class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  }

  pickWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  checkIfLetter(keyCode) {
    return !this.letters.includes(letter);
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
  }

  addWrongLetter(letter) {
    if (!this.letters.includes(letter)) {
      this.letters.push(letter);
      this.errorsLeft--;
    }
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  checkWinner() {
    const uniqueSecretLetters = new Set(this.secretWord.split(""));
    return [...uniqueSecretLetters].every((l) =>
      this.guessedLetters.includes(l)
    );
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

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
  });
}

document.addEventListener("keydown", (event) => {
  if (!hangman || !hangmanCanvas) return; // no game yet
  const letter = event.key.toUpperCase();

  if (
    hangman.checkIfLetter(event.keyCode) &&
    hangman.checkClickedLetters(letter)
  ) {
    if (hangman.secretWord.toUpperCase().includes(letter)) {
      hangman.addCorrectLetter(letter);
      // Write all occurrences of correct letter
      [...hangman.secretWord.toUpperCase()].forEach((char, index) => {
        if (char === letter) {
          hangmanCanvas.writeCorrectLetter(index);
        }
      });
      if (hangman.checkWinner()) {
        hangmanCanvas.winner();
      }
    } else {
      hangman.addWrongLetter(letter);
      hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
      hangmanCanvas.drawHangman(hangman.errorsLeft);
      if (hangman.checkGameOver()) {
        hangmanCanvas.gameOver();
      }
    }
  }
});
