class HangmanCanvas {
  constructor(secretWord) {
    this.secretWord = secretWord;
    this.canvas = document.getElementById('hangman');
    this.context = this.canvas.getContext('2d');
  }

  createBoard() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawLines();
  }

  drawLines() {
    const ctx = this.context;
    const startX = 200;
    const startY = 500;
    const lineWidth = 50;
    const gap = 15;
    ctx.lineWidth = 3;

    for (let i = 0; i < this.secretWord.length; i++) {
      const x = startX + i * (lineWidth + gap);
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x + lineWidth, startY);
      ctx.stroke();
      ctx.closePath();
    }
  }

  writeCorrectLetter(index) {
    const ctx = this.context;
    const letter = this.secretWord[index].toUpperCase();
    const startX = 200;
    const startY = 495;
    const lineWidth = 50;
    const gap = 15;
    ctx.font = "40px Arial";
    ctx.fillStyle = "black";
    const x = startX + index * (lineWidth + gap) + 12;
    ctx.fillText(letter, x, startY - 20);
  }

  writeWrongLetter(letter, errorsLeft) {
    const ctx = this.context;
    ctx.font = "40px Arial";
    ctx.fillStyle = "red";
    const x = 700;
    const y = 100 + (10 - errorsLeft) * 45;
    ctx.fillText(letter.toUpperCase(), x, y);
  }

  drawHangman(errorsLeft) {
    const ctx = this.context;
    ctx.lineWidth = 4;
    switch (errorsLeft) {
      case 9: ctx.beginPath(); ctx.moveTo(100, 500); ctx.lineTo(300, 500); ctx.stroke(); break;
      case 8: ctx.beginPath(); ctx.moveTo(150, 500); ctx.lineTo(150, 100); ctx.stroke(); break;
      case 7: ctx.beginPath(); ctx.moveTo(150, 100); ctx.lineTo(350, 100); ctx.stroke(); break;
      case 6: ctx.beginPath(); ctx.moveTo(350, 100); ctx.lineTo(350, 150); ctx.stroke(); break;
      case 5: ctx.beginPath(); ctx.arc(350, 190, 40, 0, Math.PI * 2); ctx.stroke(); break;
      case 4: ctx.beginPath(); ctx.moveTo(350, 230); ctx.lineTo(350, 350); ctx.stroke(); break;
      case 3: ctx.beginPath(); ctx.moveTo(350, 260); ctx.lineTo(300, 310); ctx.stroke(); break;
      case 2: ctx.beginPath(); ctx.moveTo(350, 260); ctx.lineTo(400, 310); ctx.stroke(); break;
      case 1: ctx.beginPath(); ctx.moveTo(350, 350); ctx.lineTo(300, 430); ctx.stroke(); break;
      case 0: ctx.beginPath(); ctx.moveTo(350, 350); ctx.lineTo(400, 430); ctx.stroke(); break;
    }
  }

  gameOver() {
    const img = new Image();
    img.src = './images/gameover.png';
    img.onload = () => this.context.drawImage(img, 100, 50, 400, 400);
  }

  winner() {
    const img = new Image();
    img.src = './images/awesome.png';
    img.onload = () => this.context.drawImage(img, 100, 50, 400, 400);
  }
}
