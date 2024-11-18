class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    // ... your code goes here
    this.secretWord = secretWord;

  }

  createBoard() {
    // ... your code goes here
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  this.drawLines();
  }

  drawLines() {
    // ... your code goes here
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
    // ... your code goes here
    const letter = this.secretWord[index].toUpperCase();
  const startX = 305 + index * 60; // Adjusted positions
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
    // ... your code goes here  
  }

  drawHangman(errorsLeft) {
    // ... your code goes here
    const ctx = this.context;

  switch (errorsLeft) {
    case 9:
      // Draw the base
      ctx.beginPath();
      ctx.moveTo(100, 700);
      ctx.lineTo(200, 700);
      ctx.lineTo(150, 650);
      ctx.closePath();
      ctx.stroke();
      break;
    // Continue adding cases for each errorLeft value
    // ...
    default:
      break;
  }
  }

  gameOver() {
    // ... your code goes here
    const img = new Image();
  img.src = './images/gameover.png';
  img.onload = () => {
    this.context.drawImage(img, 200, 100, 400, 400);
  };
  }

  winner() {
    // ... your code goes here
    const img = new Image();
    img.src = './images/awesome.png';
    img.onload = () => {
      this.context.drawImage(img, 200, 100, 400, 400);
    };
  }
}