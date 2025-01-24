class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }

  createBoard() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.drawLines();
  }

  drawLines() {
    const numberOfLetters = this.secretWord.length;
    const startX = 300;
    const startY = 700;
    const lineWidth = 50;
    const lineSpacing = 10;

    for (let i = 0; i < numberOfLetters; i++) {
      this.context.beginPath();
      this.context.moveTo(startX + i * (lineWidth + lineSpacing), startY);
      this.context.lineTo(startX + i * (lineWidth + lineSpacing) + lineWidth, startY);
      this.context.stroke();
    }
  }

  writeCorrectLetter(index) {
    const letter = this.secretWord[index].toUpperCase();
    const startX = 305 + index * 60;
    const startY = 690;

    this.context.font = '48px Arial';
    this.context.fillText(letter, startX, startY);
  }

  writeWrongLetter(letter, errorsLeft) {
    const startX = 600;
    const startY = 200;
    const spacing = 50;

    this.context.font = '48px Arial';
    this.context.fillText(letter.toUpperCase(), startX + (10 - errorsLeft) * spacing, startY);
  }

  drawHangman(errorsLeft) {
    const ctx = this.context;

  switch (errorsLeft) {
    case 9:
      ctx.beginPath();
      ctx.moveTo(100, 700);
      ctx.lineTo(200, 700);
      ctx.lineTo(150, 650);
      ctx.closePath();
      ctx.stroke();
      break;
    case 8:
      ctx.beginPath();
      ctx.moveTo(50,700)
      ctx.lineTo(100,630)
      ctx.stroke();
      break;
    case 7:
      ctx.beginPath();
      ctx.moveTo(150,700)
      ctx.lineTo(100,630)
      ctx.stroke();
      break;
    case 6:
      ctx.beginPath();
      ctx.moveTo(100,630)
      ctx.lineTo(100,100)
      ctx.stroke();
      break;
    case 5:
      ctx.beginPath();
      ctx.moveTo(100,100)
      ctx.lineTo(400,100)
      ctx.stroke();
      break;
    case 4:
      ctx.beginPath();
      ctx.moveTo(400,100)
      ctx.lineTo(400,160)
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.arc(400,210,50,0,(Math.PI/180)*360)
      ctx.stroke();
      ctx.closePath();
      break;
    case 2:
      ctx.beginPath()
      ctx.moveTo(400,260)
      ctx.lineTo(400,300)
      ctx.stroke();
      break;
    case 1:
      ctx.beginPath();
      ctx.moveTo(400,260)
      ctx.lineTo(400,400)
      ctx.stroke();
      break;
    case 0:
      ctx.beginPath();
      ctx.moveTo(400,400)
      ctx.lineTo(340,500)
      ctx.stroke();
      break;                                                                         
    default:
      this.gameOver();
      break;
    }
  }

  gameOver() {
    const img = new Image();
    img.src = './images/gameover.png';
    img.onload = () => {
      this.context.drawImage(img, 200, 100, 400, 400);
    };
  }

  winner() {
    const img = new Image();
    img.src = './images/awesome.png';
    img.onload = () => {
      this.context.drawImage(img, 200, 100, 400, 400);
    };
  }
}