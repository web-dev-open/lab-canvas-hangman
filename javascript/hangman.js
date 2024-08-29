class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  }
  pickWord() {
    const wlength = this.words.length;
    const index = Math.floor(Math.random() * wlength);
    const randomInd = this.words[index];
    return randomInd;
  }
  checkIfLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90) {
      return true;
    }
    return false;
  }
  checkClickedLetters(letter) {
    if (!this.letters.includes(letter)) {
      return true;
    }
    return false;
  }
  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    if (this.checkWinner()) {
      alert("You Won!");
      console.log("You Won!");
      return;
    }
  }
  addWrongLetter(letter) {
    this.errorsLeft--;
    if (!this.letters.includes("letter")) {
      this.letters.push(letter);
    }
  }
  checkGameOver() {
    if (this.errorsLeft === 0) {
      return true;
    }
    return false;
  }
  checkWinner() {
    return this.secretWord
      .split("")
      .every((letter) => this.guessedLetters.includes(letter));
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
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
  });
}
document.addEventListener("keydown", (event) => {
  if (!hangman.checkGameOver() && !hangman.checkWinner()) {
    if (hangman.checkIfLetter(e.which)) {
      if (hangman.checkClickedLetters(e.key)) {
        if (hangman.secretWord.includes(e.key)) {
          const indx = [];
          for (let i = 0; i < hangman.secretWord.length; i++) {
            if (hangman.secretWord[i] === e.key) indx.push(i);
          }
          indx.map((index) => {
            hangman.addCorrectLetter(index);
            hangmanCanvas.writeCorrectLetter(index);
          });
        } else {
          hangman.addWrongLetter();
          hangmanCanvas.writeWrongLetter(e.key, hangman.errorsLeft);
          hangmanCanvas.drawHangman(
            hangmanCanvas.hangmanShape[10 - hangman.errorsLeft]
          );
        }
      } else {
        alert("letter Repeated .Please enter new letter");
      }
    }
  }
});
