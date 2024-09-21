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
    const xStart = 200;
    const yStart = 700;
    const lineLength = 50;

    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(xStart + i * (lineLength + 10), yStart);
      this.context.lineTo(xStart + i * (lineLength + 10) + lineLength, yStart);
      this.context.stroke();
      this.context.closePath();
    }
  }

  writeCorrectLetter(index) {
    // ... your code goes here
    const xStart = 200;
    const yStart = 700;
    const lineLength = 50;
    const xPosition = xStart + index * (lineLength + 10) + 15;
    const yPosition = yStart - 20;

    this.context.font = '48px Arial';
    this.context.fillText(this.secretWord[index].toUpperCase(), xPosition, yPosition);
  }

  writeWrongLetter(letter, errorsLeft) {
    // ... your code goes here
    this.context.font = '48px Arial';
    this.context.fillText(letter.toUpperCase(), 700 + (10 - errorsLeft) * 50, 200);
  }

  drawHangman(errorsLeft) {
    // ... your code goes here
    this.context.strokeStyle = '#000';
    this.context.lineWidth = 5;

    if (errorsLeft === 9) {
      this.context.beginPath();
      this.context.moveTo(100, 700);
      this.context.lineTo(200, 700);
      this.context.stroke();
    } else if (errorsLeft === 8) {
      this.context.lineTo(150, 650);
      this.context.stroke();
    } 
  }

  gameOver() {
    // ... your code goes here
    const img = new Image();
    img.src = './images/gameover.png';
    img.onload = () => {
      this.context.drawImage(img, 300, 100);
    };
  }

  winner() {
    // ... your code goes here
    const img = new Image();
    img.src = './images/awesome.png';
    img.onload = () => {
      this.context.drawImage(img, 300, 100);
    };
  }
  
}
