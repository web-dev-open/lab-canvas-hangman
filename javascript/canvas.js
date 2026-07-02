class HangmanCanvas {
  constructor(secretWord) {
    this.canvas = document.getElementById('hangman');
    this.context = this.canvas ? this.canvas.getContext('2d') : null;
    this.secretWord = secretWord;
  }

  createBoard() {
    if (!this.context) return;
    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines();
  }

  drawLines() {
    if (!this.context) return;
    this.context.lineWidth = 4;
    this.context.strokeStyle = 'black';
    
    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(250 + i * 70, 700);
      this.context.lineTo(300 + i * 70, 700);
      this.context.stroke();
    }
  }

  writeCorrectLetter(index) {
    if (!this.context) return;
    this.context.font = '40px Arial';
    this.context.fillStyle = 'black';
    this.context.fillText(this.secretWord[index].toUpperCase(), 260 + index * 70, 680);
  }

  writeWrongLetter(letter, errorsLeft) {
    if (!this.context) return;
    this.context.font = '40px Arial';
    this.context.fillStyle = 'red';
    const column = (10 - errorsLeft) % 5;
    const row = Math.floor((10 - errorsLeft) / 5);
    this.context.fillText(letter.toUpperCase(), 700 + column * 50, 200 + row * 60);
  }

  drawHangman(errorsLeft) {
    if (!this.context) return;
    this.context.lineWidth = 4;
    this.context.strokeStyle = 'black';
    this.context.beginPath();

    switch (errorsLeft) {
      case 9:
        this.context.moveTo(50, 700);
        this.context.lineTo(150, 700);
        this.context.lineTo(100, 650);
        this.context.closePath();
        break;
      case 8:
        this.context.moveTo(100, 650);
        this.context.lineTo(100, 150);
        break;
      case 7:
        this.context.moveTo(100, 150);
        this.context.lineTo(400, 150);
        break;
      case 6:
        this.context.moveTo(400, 150);
        this.context.lineTo(400, 220);
        break;
      case 5:
        this.context.arc(400, 250, 30, 0, Math.PI * 2);
        break;
      case 4:
        this.context.moveTo(400, 280);
        this.context.lineTo(400, 430);
        break;
      case 3:
        this.context.moveTo(400, 330);
        this.context.lineTo(350, 380);
        break;
      case 2:
        this.context.moveTo(400, 330);
        this.context.lineTo(450, 380);
        break;
      case 1:
        this.context.moveTo(400, 430);
        this.context.lineTo(350, 520);
        break;
      case 0:
        this.context.moveTo(400, 430);
        this.context.lineTo(450, 520);
        break;
    }
    this.context.stroke();
  }

  gameOver() {
    if (!this.context) return;
    const img = new Image();
    img.src = 'images/gameover.png';
    img.onload = () => this.context.drawImage(img, 300, 300, 500, 300);
  }

  winner() {
    if (!this.context) return;
    const img = new Image();
    img.src = 'images/awesome.png';
    img.onload = () => this.context.drawImage(img, 300, 250, 500, 350);
  }
}