class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
    this.hangmanShape = ['head', 'body', 'left leg', 'right leg', 'left arm', 'right arm', 'left foot', 'right foot', 'left eye', 'right eye'];
  }

  createBoard() {
    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines();
  }

  drawLines() {
    const x = 400;
    const y = 550;
    const width = 50;

    // Blank spaces for letters
    this.context.beginPath();
    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.moveTo(x + i * 60, y);
      this.context.lineTo(x + i * 60 + width, y);
      this.context.stroke();
    }
    
    // Upward-pointing triangle
    this.context.beginPath();
    this.context.moveTo(270, 550);
    this.context.lineTo(310, 500);
    this.context.lineTo(350, 550);
    this.context.closePath();
    this.context.stroke();

    // Long vertical line
    this.context.beginPath();
    this.context.moveTo(310, 500);
    this.context.lineTo(310, 100);
    this.context.stroke();

    // Horizontal line
    this.context.beginPath();
    this.context.moveTo(310, 100);
    this.context.lineTo(500, 100);
    this.context.stroke();

    // Downward vertical line
    this.context.beginPath();
    this.context.moveTo(500, 100);
    this.context.lineTo(500, 150); 
    this.context.stroke();
  }

  writeCorrectLetter(index) {
    this.context.font = '30px Arial';
    this.context.fillStyle = 'black';

    index.forEach(i => {
      const x = 415 + i * 60;
      const y = 530;
      this.context.fillText(this.secretWord[i].toUpperCase(), x, y);
    }); 
  }

  writeWrongLetter(letter, errorsLeft) {
    const x = 800 + (10 - errorsLeft) * 40;
    const y = 200;

    this.context.font = '30px Arial';
    this.context.fillStyle = 'black';
    this.context.fillText(letter.toUpperCase(), x, y);
  }

  drawHangman(errorsLeft) {
    const drawPart = this.hangmanShape[this.hangmanShape.length - errorsLeft - 1];

    switch (drawPart) {
      case 'head':
        this.context.beginPath();
        this.context.arc(500, 180, 30, 0, Math.PI * 2);
        this.context.stroke();
        this.context.closePath();
        break;
      case 'body':
        this.context.beginPath();
        this.context.moveTo(500, 210);
        this.context.lineTo(500, 300);
        this.context.stroke();
        break;
      case 'left leg':
        this.context.beginPath();
        this.context.moveTo(500, 300);
        this.context.lineTo(450, 350);
        this.context.stroke();
        break;
      case 'right leg':
        this.context.beginPath();
        this.context.moveTo(500, 300);
        this.context.lineTo(550, 350);
        this.context.stroke();
        break;
      case 'left arm':
        this.context.beginPath();
        this.context.moveTo(500, 210);
        this.context.lineTo(430, 250);
        this.context.stroke();
        break;
      case 'right arm':
        this.context.beginPath();
        this.context.moveTo(500, 210);
        this.context.lineTo(570, 250);
        this.context.stroke();
        break;
      case 'left foot':
        this.context.beginPath();
        this.context.moveTo(450, 350);
        this.context.lineTo(430, 350);
        this.context.stroke();
        break;
      case 'right foot':
        this.context.beginPath();
        this.context.moveTo(550, 350);
        this.context.lineTo(570, 350);
        this.context.stroke();
        break;
      case 'left eye':
        this.context.beginPath();
        this.context.moveTo(485, 170);
        this.context.lineTo(495, 180);
        this.context.moveTo(495, 170);
        this.context.lineTo(485, 180);
        this.context.stroke();
        break;
      case 'right eye':
        this.context.beginPath();
        this.context.moveTo(505, 170);
        this.context.lineTo(515, 180);
        this.context.moveTo(515, 170);
        this.context.lineTo(505, 180);
        this.context.stroke();
        break;
      default:
        break;
    }
  }

  gameOver() {
    this.context.clearRect(0, 0, 1200, 400);
    const img = new Image();
    img.src = './images/gameover.png';
    img.onload = () => this.context.drawImage(img, 400, 200);
  }

  winner() {
    this.context.clearRect(0, 0, 1200, 400);
    const img = new Image();
    img.src = './images/awesome.png';
    img.onload = () => this.context.drawImage(img, 247, 0, 705, 500);
  }
}
