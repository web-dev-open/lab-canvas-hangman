class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
    this.lineWidth = 50;
  }

  createBoard() {
    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines();
  }

  drawLines() {
    const startX = 300;
    const startY = 700;
    const spacing = 20;

    this.context.lineWidth = 5;
    this.context.strokeStyle = '#000';

    this.secretWord.split('').forEach((_, i) => {
      this.context.beginPath();
      this.context.moveTo(startX + i * (this.lineWidth + spacing), startY);
      this.context.lineTo(startX + i * (this.lineWidth + spacing) + this.lineWidth, startY);
      this.context.stroke();
    });
  }

  writeCorrectLetter(index) {
    const startX = 300;
    const startY = 700;
    const spacing = 20;

    this.context.font = '48px Arial';
    this.context.fillStyle = '#000';
    const letterX = startX + index * (this.lineWidth + spacing) + this.lineWidth / 4;
    this.context.fillText(this.secretWord[index], letterX, startY - 10);
  }

  writeWrongLetter(letter, errorsLeft) {
    const wrongLetterX = 800;
    const wrongLetterY = 200;
    
    this.context.font = '48px Arial';
    this.context.fillStyle = '#000';
    this.context.fillText(letter, wrongLetterX + (10 - errorsLeft) * 50, wrongLetterY);
  }

  drawHangman(errorsLeft) {
    this.context.lineWidth = 5;
    this.context.strokeStyle = '#000';

    // Draw hangman parts based on errorsLeft
    switch (errorsLeft) {
      case 9: // Draw base
        this.context.beginPath();
        this.context.moveTo(100, 700);
        this.context.lineTo(200, 700);
        this.context.lineTo(150, 650);
        this.context.closePath();
        this.context.stroke();
        break;
      case 8: // Draw pole
        this.context.beginPath();
        this.context.moveTo(150, 650);
        this.context.lineTo(150, 200);
        this.context.stroke();
        break;
      case 7: // Draw top bar
        this.context.beginPath();
        this.context.moveTo(150, 200);
        this.context.lineTo(350, 200);
        this.context.stroke();
        break;
      case 6: // Draw rope
        this.context.beginPath();
        this.context.moveTo(350, 200);
        this.context.lineTo(350, 250);
        this.context.stroke();
        break;
      case 5: // Draw head
        this.context.beginPath();
        this.context.arc(350, 275, 25, 0, Math.PI * 2);
        this.context.stroke();
        break;
      case 4: // Draw body
        this.context.beginPath();
        this.context.moveTo(350, 300);
        this.context.lineTo(350, 400);
        this.context.stroke();
        break;
      case 3: // Draw left arm
        this.context.beginPath();
        this.context.moveTo(350, 325);
        this.context.lineTo(300, 375);
        this.context.stroke();
        break;
      case 2: // Draw right arm
        this.context.beginPath();
        this.context.moveTo(350, 325);
        this.context.lineTo(400, 375);
        this.context.stroke();
        break;
      case 1: // Draw left leg
        this.context.beginPath();
        this.context.moveTo(350, 400);
        this.context.lineTo(300, 450);
        this.context.stroke();
        break;
      case 0: // Draw right leg
        this.context.beginPath();
        this.context.moveTo(350, 400);
        this.context.lineTo(400, 450);
        this.context.stroke();
        break;
      default:
        break;
    }
  }

  gameOver() {
    const img = new Image();
    img.src = './images/gameover.png';
    img.onload = () => {
      this.context.drawImage(img, 300, 300, 600, 300);
    };
  }

  winner() {
    const img = new Image();
    img.src = './images/awesome.png';
    img.onload = () => {
      this.context.drawImage(img, 300, 300, 600, 300);
    };
  }
}
