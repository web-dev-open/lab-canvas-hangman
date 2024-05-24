class HangmanCanvas {

  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.ctx = document.getElementById('hangman').getContext('2d');
    this.ctx.lineWidth = 4;
    this.ctx.font = '40px arial';
    this.secretWord = secretWord;
    this.hangmanShape = ['base','pole','top','rope','head', 'body', 'leftLeg', 'rightLeg', 'leftArm', 'rightArm']
  }

  createBoard() {
    this.ctx.clearRect(0,0,1200, 780);
    this.drawLines();

  }

  drawLines() {
    const x = 300;

    for (let i = 0; i < this.secretWord.length; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x + i * 52, 600 );
      this.ctx.lineTo(x + i * 52 + 40, 600);
      this.ctx.stroke();

    }
  }

  writeCorrectLetter(index) {
    const x = 300 + index * 50;

    this.ctx.fillText(this.secretWord[index], x, 600);
  }

  writeWrongLetter(letter, errorsLeft) {
    const x = 700 + (10 - errorsLeft) * 40;
    this.ctx.fillText(letter, x, 200);
  }

  drawHangman(errorsLeft) {
    
      switch (errorsLeft) {
        case 'bottom':
          this.ctx.beginPath();
          this.ctx.moveTo(150, 500);
          this.ctx.lineTo(250, 500);
          this.ctx.stroke();
          break;
        case 'pole':
          this.ctx.beginPath();
          this.ctx.moveTo(150, 500);
          this.ctx.lineTo(200, 100);
          this.ctx.stroke();
          break;
        case 'top':
          this.ctx.beginPath();
          this.ctx.moveTo(200, 100);
          this.ctx.lineTo(400, 100);
          this.ctx.stroke();
          break;
        case 'rope':
          this.ctx.beginPath();
          this.ctx.moveTo(400, 100);
          this.ctx.lineTo(400, 160);
          this.ctx.stroke();
          break;
        case 'head':
          this.ctx.beginPath();
          this.ctx.arc(400, 190, 30, 0, Math.PI * 2);
          this.ctx.stroke();
          break;
        case 'body':
          this.ctx.beginPath();
          this.ctx.moveTo(400, 220);
          this.ctx.lineTo(400, 350);
          this.ctx.stroke();
          break;
        case 'leftArm':
          this.ctx.beginPath();
          this.ctx.moveTo(400, 220);
          this.ctx.lineTo(350, 270);
          this.ctx.stroke();
          break;
        case 'rightArm':
          this.ctx.beginPath();
          this.ctx.moveTo(400, 220);
          this.ctx.lineTo(450, 270);
          this.ctx.stroke();
          break;
        case 'leftLeg':
          this.ctx.beginPath();
          this.ctx.moveTo(400, 350);
          this.ctx.lineTo(350, 400);
          this.ctx.stroke();
          break;
        case 'rightLeg':
          this.ctx.beginPath();
          this.ctx.moveTo(400, 350);
          this.ctx.lineTo(450, 400);
          this.ctx.stroke();
          break;
      }
  
}
  gameOver() {

    this.ctx.clearRect(0, 0, 1200, 740);
    const gameOverimg = new Image();
    gameOverimg.src = './images/gameover.png';
    gameOverimg.onload = () => {
      this.ctx.drawImage(gameOverimg, 100, 200);
    };

  }

  winner() {
    this.ctx.clearRect(0, 0, 1200, 740);
    const winnerimg = new Image();
    winnerimg.src = './images/awesome.png';
    winnerimg.onload = () => {
      this.ctx.drawImage(winnerimg, 100, 200);
    };

  }
}
