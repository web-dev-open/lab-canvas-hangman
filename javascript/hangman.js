let hangman;
let hangmanCanvas;

const startGameButton = document.getElementById('start-game-button');

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
    return keyCode >= 65 && keyCode <= 90;
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    if (!this.letters.includes(letter)) this.letters.push(letter);
    this.guessedLetters += letter;
    return this.checkWinner();
  }

  addWrongLetter(letter) {
    if (!this.letters.includes(letter)) this.letters.push(letter);
    this.errorsLeft -= 1;
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  checkWinner() {
    return [...this.secretWord].every(char => this.guessedLetters.includes(char));
  }
}

// START BUTTON
if (startGameButton) {
  startGameButton.addEventListener('click', () => {
    hangman = new Hangman([
      'node','javascript','react','miami','paris','amsterdam','lisboa'
    ]);
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
  });
}

// KEYDOWN HANDLER
document.addEventListener('keydown', (event) => {
  if (!hangman) return;

  const letter = event.key.toLowerCase();

  if (!hangman.checkIfLetter(event.keyCode)) return;
  if (!hangman.checkClickedLetters(letter)) return;

  if (hangman.secretWord.includes(letter)) {
    hangman.addCorrectLetter(letter);
    [...hangman.secretWord].forEach((char, idx) => {
      if (char === letter) hangmanCanvas.writeCorrectLetter(idx);
    });
    if (hangman.checkWinner()) hangmanCanvas.winner();
  } else {
    hangman.addWrongLetter(letter);
    hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
    hangmanCanvas.drawHangman(hangman.errorsLeft);
    if (hangman.checkGameOver()) hangmanCanvas.gameOver();
  }
});
