class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }

  createBoard() {
    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines();
  }

  drawLines() {
    const x = 400;
    const y = 700;
    const width = 50;
    const height = 10;

    this.context.beginPath();

    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.moveTo(x + i * 60, y);
      this.context.lineTo(x + i * 60 + width, y);
      this.context.stroke();
    }
  }

  writeCorrectLetter(index) {
    const x = 400 + index * 60;
    const y = 680;

    this.context.font = '30px Arial';
    this.context.fillText(this.secretWord[index], x, y);
  }

  writeWrongLetter(letter, errorsLeft) {
    const x = 800 + (10 - errorsLeft) * 40;
    const y = 200;

    this.context.font = '30px Arial';
    this.context.fillText(letter, x, y);
  }

  drawHangman(errorsLeft) {
    switch (errorsLeft) {
      case 9:
        this.context.beginPath();
        this.context.moveTo(200, 600);
        this.context.lineTo(300, 600);
        this.context.stroke();
        break;
      case 8:
        this.context.beginPath();
        this.context.moveTo(250, 600);
        this.context.lineTo(250, 100);
        this.context.stroke();
        break;
      case 7:
        this.context.beginPath();
        this.context.moveTo(250, 100);
        this.context.lineTo(500, 100);
        this.context.stroke();
        break;
      case 6:
        this.context.beginPath();
        this.context.moveTo(500, 100);
        this.context.lineTo(500, 150);
        this.context.stroke();
        break;
      case 5:
        this.context.beginPath();
        this.context.arc(500, 180, 30, 0, Math.PI * 2);
        this.context.stroke();
        break;
      case 4:
        this.context.beginPath();
        this.context.moveTo(500, 210);
        this.context.lineTo(500, 400);
        this.context.stroke();
        break;
      case 3:
        this.context.beginPath();
        this.context.moveTo(500, 250);
        this.context.lineTo(450, 300);
        this.context.stroke();
        break;
      case 2:
        this.context.beginPath();
        this.context.moveTo(500, 250);
        this.context.lineTo(550, 300);
        this.context.stroke();
        break;
      case 1:
        this.context.beginPath();
        this.context.moveTo(500, 400);
        this.context.lineTo(450, 450);
        this.context.stroke();
        break;
      case 0:
        this.context.beginPath();
        this.context.moveTo(500, 400);
        this.context.lineTo(550, 450);
        this.context.stroke();
        break;
    }
  }

  gameOver() {
    const img = new Image();
    img.src = './images/gameover.png';
    img.onload = () => {
      this.context.drawImage(img, 400, 200);
    };
  }

  winner() {
    const img = new Image();
    img.src = './images/awesome.png';
    img.onload = () => {
      this.context.drawImage(img, 400, 200);
    };
  }
}

let hangman;
let hangmanCanvas;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', event => {
  if (hangman.checkIfLetter(event.key.charCodeAt(0)) && hangman.checkClickedLetters(event.key)) {
    if (hangman.secretWord.includes(event.key)) {
      hangman.addCorrectLetter(event.key);
      for (let i = 0; i < hangman.secretWord.length; i++) {
        if (hangman.secretWord[i] === event.key) {
          hangmanCanvas.writeCorrectLetter(i);
        }
      }
      if (hangman.checkWinner()) {
        hangmanCanvas.winner();
      }
    } else {
      hangman.addWrongLetter(event.key);
      hangmanCanvas.drawHangman(hangman.errorsLeft);
      hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft);
      if (hangman.checkGameOver()) {
        hangmanCanvas.gameOver();
      }
    }
  }
});
