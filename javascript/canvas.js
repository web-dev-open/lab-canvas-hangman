class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    // ... your code goes here
    this.secretWord = secretWord;
  }

  createBoard() {
    // ... your code goes here
    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines();
  }

  drawLines() {
    // ... your code goes here
    let x = 400;
    let y = 700;

    for (let i = 0; i < hangman.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.lineTo(x + 50, y);
      this.context.stroke();
      this.context.closePath();
      x += 70;
    }
  }

  writeCorrectLetter(index) {
    // ... your code goes here
    let x = 400;
    let y = 700;
    this.context.font = '30px Arial';
    this.context.fillText(hangman.secretWord[index], x + 20 + (index * 70), y - 20);

  }

  writeWrongLetter(letter, errorsLeft) {
    // ... your code goes here
    let x = 800;
    let y = 100;
    this.context.font = '30px Arial';
    this.context.fillText(letter, x + 20 + ((10 - errorsLeft) * 50), y - 20);
  }

  drawHangman(errorsLeft) {
    // ... your code goes here
    let x = 400;
    let y = 700;

    switch (errorsLeft) {
      case 9:
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x - 100, y);
        this.context.lineTo(x - 50, y - 50);
        this.context.lineTo(x, y);
        this.context.stroke();
        this.context.closePath();
        break;
      case 8:
        this.context.beginPath();
        this.context.moveTo(x - 50, y - 50);
        this.context.lineTo(x - 50, y - 500);
        this.context.stroke();
        this.context.closePath();
        break;
      case 7:
        this.context.beginPath();
        this.context.moveTo(x - 50, y - 500);
        this.context.lineTo(x + 150, y - 500);
        this.context.stroke();
        this.context.closePath();
        break;
      case 6:
        this.context.beginPath();
        this.context.moveTo(x + 150, y - 500);
        this.context.lineTo(x + 150, y - 450);
        this.context.stroke();
        this.context.closePath();
        break;
      case 5:
        this.context.beginPath();
        this.context.arc(x + 150, y - 400, 50, 0, Math.PI * 2);
        this.context.stroke();
        this.context.closePath();
        break;
      case 4:
        this.context.beginPath();
        this.context.moveTo(x + 150, y - 350);
        this.context.lineTo(x + 150, y - 250);
        this.context.stroke();
        this.context.closePath();
        break;
      case 3:
        this.context.beginPath();
        this.context.moveTo(x + 150, y - 250);
        this.context.lineTo(x + 100, y - 200);
        this.context.stroke();
        this.context.closePath();
        break;
      case 2:
        this.context.beginPath();
        this.context.moveTo(x + 150, y - 250);
        this.context.lineTo(x + 200, y - 200);
        this.context.stroke();
        this.context.closePath();
        break;
      case 1:
        this.context.beginPath();
        this.context.moveTo(x + 150, y - 300);
        this.context.lineTo(x + 100, y - 350);
        this.context.stroke();
        this.context.closePath();
        break;
      case 0:
        this.context.beginPath();
        this.context.moveTo(x + 150, y - 300);
        this.context.lineTo(x + 200, y - 350);
        this.context.stroke();
        this.context.closePath();
        break;

      default:
        break;
  }
}

  gameOver() {
    // ... your code goes here
    this.context.clearRect(0, 0, 1200, 800);
    let img = new Image();
    img.src = './images/gameover.png';
    img.onload = () => {
      this.context.drawImage(img, 400, 200);
    }
  }

  winner() {
    // ... your code goes here
    this.context.clearRect(0, 0, 1200, 800);
    let img = new Image();
    img.src = './images/awesome.png';
    img.onload = () => {
      this.context.drawImage(img, 400, 200);
    }
  }
}
