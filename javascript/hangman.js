class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  }

  pickWord() {
    const randIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randIndex];
  }

  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90;
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    return this.checkWinner();
  }

  addWrongLetter(letter) {
    if (!this.letters.includes(letter)) {
      this.letters.push(letter);
    }
    this.errorsLeft -= 1;   // FIXED
  }

  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  checkWinner() {
    for (let char of this.secretWord) {
      if (!this.guessedLetters.includes(char)) {
        return false;
      }
    }
    return true;
  }
}

startGameButton.addEventListener('click', event => {
  hangman = new Hangman([
    'node',
    'javascript',
    'react',
    'miami',
    'paris',
    'amsterdam',
    'lisboa'
  ]);

  hangman.secretWord = hangman.pickWord();
  hangmanCanvas = new HangmanCanvas(hangman.secretWord);
  hangmanCanvas.createBoard();
});

document.addEventListener('keydown', event => {
  if (!hangman) return; // game not started

  const letter = event.key.toLowerCase();

  if (!hangman.checkIfLetter(event.keyCode)) return;

  if (!hangman.checkClickedLetters(letter)) return;

  hangman.letters.push(letter);

  if (hangman.secretWord.includes(letter)) {
    hangman.addCorrectLetter(letter);

    [...hangman.secretWord].forEach((char, idx) => {
      if (char === letter) hangmanCanvas.writeCorrectLetter(idx);
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
});
