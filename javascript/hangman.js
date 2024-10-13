class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = "";
    this.errorsLeft = 10;
  }

  pickWord() {
    let randomWord = this.words[Math.floor(Math.random() * this.words.length)];
    return randomWord;
  }

  checkIfLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90)
      return true;
    else
      return false;
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
    if (this.checkWinner()) {
      alert("you won!");
      console.log("You Won!");
      return;
    }
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
    if (!(this.letters.includes(letter))) {
      this.letters.push(letter);
    }
  }

  checkGameOver() {
    if (this.errorsLeft === 0)
      return true;
    else
      return false;
  }

  checkWinner() {
    return this.secretWord.split("").every((letter) => this.guessedLetters.includes(letter));
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

     hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', event => {
  // React to user pressing a key
  if (hangman) {
    const letter = event.key.toLowerCase();
    console.log(letter);
    if (hangman.checkIfLetter(event.keyCode)) {
      console.log("it is a letter")
      if (hangman.checkClickedLetters(letter)) {
        console.log("letter has not been clicked");
        if (hangman.secretWord.includes(letter)) {
          hangman.addCorrectLetter(letter);
          hangman.secretWord.split('').forEach((char, index) => {
            if (char === letter)
              hangmanCanvas.writeCorrectLetter(index);
          });
        } else {
          hangman.addWrongLetter(letter);
          hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
          hangmanCanvas.drawHangman(hangman.errorsLeft);
        }
      }
      if (hangman.checkGameOver()) {
        hangmanCanvas.gameOver();
      }
      if (hangman.checkWinner()) {
        hangmanCanvas.winner();
      }
    } else {
      console.log("it is not a letter");
    }
  }
});
