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
    if (keyCode >= 65 && keyCode <= 90) {
      return true;
    } else {
      return false;
    }
  }

  checkClickedLetters(letter) {
    if (this.letters.includes(letter)) {
      return false;
    } else {
      return true;
    }
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
    if (!this.letters.includes(letter)) {
      this.letters.push(letter);
    }
  }

  checkGameOver() {
    if (this.errorsLeft > 0) {
      return false;
    } else {
      return true;
    }
  }

  checkWinner() {
    for (let i = 0; i < this.secretWord.length; i++) {
      if (!this.guessedLetters.includes(this.secretWord[i])) {
        return false;
      }
    }
    return true;
  }
}

let hangman;
let hangmanCanvas;

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

    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();

    console.log("Game started! Secret word:", hangman.secretWord);
  });
}

document.addEventListener("keydown", (event) => {
  if (!hangman || !hangmanCanvas) {
    console.log("Game not started yet! Click START GAME first.");
    return;
  }

  const keyCode = event.keyCode;
  const letter = event.key.toLowerCase();

  if (hangman.checkIfLetter(keyCode)) {
    if (hangman.checkClickedLetters(letter)) {
      if (hangman.secretWord.includes(letter)) {
        console.log("Correct letter:", letter);
        hangman.addCorrectLetter(letter);

        for (let i = 0; i < hangman.secretWord.length; i++) {
          if (hangman.secretWord[i] === letter) {
            hangmanCanvas.writeCorrectLetter(i);
          }
        }

        if (hangman.checkWinner()) {
          console.log("You win!");
          setTimeout(() => {
            hangmanCanvas.winner();
          }, 500);
        }
      } else {
        console.log("Wrong letter:", letter);
        hangman.addWrongLetter(letter);

        hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
        hangmanCanvas.drawHangman(hangman.errorsLeft);

        if (hangman.checkGameOver()) {
          console.log("Game Over!");
          setTimeout(() => {
            hangmanCanvas.gameOver();
          }, 500);
        }
      }
    } else {
      console.log("Letter already used:", letter);
    }
  } else {
    console.log("Please press a letter key (A-Z)");
  }
});
