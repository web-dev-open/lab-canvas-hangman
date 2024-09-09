class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    // ... your code goes here
    this.secretWord = secretWord;
    this.lineWidth = 50;
  }

  createBoard() {
    // ... your code goes here
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.drawLines();
  }

  drawLines() {
    // ... your code goes here
    const wordLength = this.secretWord.length;
    const initialX = 300;
    const initialY = 700;
    for (let i = 0; i < wordLength; i++) {
      this.context.beginPath();
      this.context.moveTo(initialX + i * this.lineWidth + 20, initialY);
      this.context.lineTo(initialX + i * this.lineWidth + this.lineWidth, initialY);
      this.context.stroke();
    }
  }

  writeCorrectLetter(index) {
    // ... your code goes here
    const initialX = 300;
    const initialY = 700;
    const spacing = 20;

    this.context.font = '48px Arial';
    this.context.fillStyle = 'black';
    const letterX = initialX + index * this.lineWidth + spacing;
    this.context.fillText(this.secretWord[index], letterX, initialY - 10);
  }

  writeWrongLetter(letter, errorsLeft) {
    // ... your code goes here
    const initialX = 800;
    const initialY = 200;

    this.context.font = '48px Arial';
    this.context.fillStyle = 'black';
    this.context.fillText(letter, initialX + (10 - errorsLeft) * this.lineWidth, initialY);
  }

  drawHangman(errorsLeft) {
    // ... your code goes here
    this.context.lineWidth = 5;
    this.context.strokeStyle = 'black';

    // drawing hangman based on the errors left
    switch (errorsLeft) {
      case 9: // Drawing the base
        this.context.beginPath();
        this.context.moveTo(100, 700);
        this.context.lineTo(200, 700);
        this.context.lineTo(150, 650);
        this.context.lineTo(100, 700);
        this.context.stroke();
        break;
      case 8: //Draw the pole
        this.context.beginPath();
        this.context.moveTo(150, 650);
        this.context.lineTo(150, 200);
        this.context.stroke();
        break;
      case 7: // Draw the top bar
        this.context.beginPath();
        this.context.moveTo(150, 200);
        this.context.lineTo(350, 200);
        this.context.stroke();
        break;
      case 6: // draw rope
        this.context.beginPath();
        this.context.moveTo(350, 200);
        this.context.lineTo(350, 250);
        this.context.stroke();
        break;
      case 5: // draw head
        this.context.beginPath();
        this.context.arc(350, 275, 25, 0, Math.PI * 2);
        this.context.stroke();
        break;
      case 4: // draw body
        this.context.beginPath();
        this.context.moveTo(350, 300);
        this.context.lineTo(350, 400);
        this.context.stroke();
        break;
      case 3: // draw left arm
        this.context.beginPath();
        this.context.moveTo(350, 325);
        this.context.lineTo(300, 350);
        this.context.stroke();
        break;
      case 2: // draw right arm
        this.context.beginPath();
        this.context.moveTo(350, 325);
        this.context.lineTo(400, 350);
        this.context.stroke();
        break;
      case 1: // draw left leg
        this.context.beginPath();
        this.context.moveTo(350, 400);
        this.context.lineTo(300, 450);
        this.context.stroke();
        break;
      case 0: // draw right leg
        this.context.beginPath();
        this.context.moveTo(350, 400);
        this.context.lineTo(400, 450);
        this.context.stroke();
        break;
    }
  }

  gameOver() {
    // ... your code goes here
    const img = new Image();
    img.src = './images/gameover.png';
    img.onload = () => {
      this.context.drawImage(img, 300, 300, 600, 300);
    };
  }

  winner() {
    // ... your code goes here
    const img = new Image();
    img.src = './images/awesome.png';
    img.onload = () => {
      this.context.drawImage(img, 300, 300, 600, 300);
    };
  }
}
