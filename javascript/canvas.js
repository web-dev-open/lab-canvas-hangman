// This is the canvas setup, a layout by Nathan Chan 

class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }

  createBoard() {
    this.context.clearRect(0, 0, 1200, 800); // Clear the canvas with correct dimensions
    this.drawLines();
  }

  drawLines() {
    const startX = 300; // Adjusted startX to be 50 pixels to the right of the base
    const startY = 600;
    const lineWidth = 50;
    const lineSpacing = 10;

    this.context.beginPath();
    this.context.strokeStyle = '#000';
    this.context.lineWidth = 2;

    for (let i = 0; i < this.secretWord.length; i++) {
      const x = startX + i * (lineWidth + lineSpacing);
      this.context.moveTo(x, startY);
      this.context.lineTo(x + lineWidth, startY);
    }
    
    this.context.stroke();
  }

  writeCorrectLetter(index) {
    const startX = 300; // Adjusted startX to be 50 pixels to the right of the base
    const startY = 590;
    const lineWidth = 50;
    const lineSpacing = 10;

    this.context.font = '48px Arial';
    this.context.fillStyle = '#000';
    const x = startX + index * (lineWidth + lineSpacing) + 15;
    this.context.fillText(this.secretWord[index].toUpperCase(), x, startY);
  }

  writeWrongLetter(letter, errorsLeft) {
    const startX = 600;
    const startY = 100;
    const letterSpacing = 40; // Adjusted spacing between wrong letters

    this.context.font = '36px Arial';
    this.context.fillStyle = '#000';
    const x = startX + (10 - errorsLeft) * letterSpacing;
    this.context.fillText(letter.toUpperCase(), x, startY);
  }

  drawHangman(errorsLeft) {
    const parts = [
      () => this.drawBase(),
      () => this.drawVerticalLine(),
      () => this.drawHorizontalLine(),
      () => this.drawRope(),
      () => this.drawHead(),
      () => this.drawBody(),
      () => this.drawLeftArm(),
      () => this.drawRightArm(),
      () => this.drawLeftLeg(),
      () => this.drawRightLeg()
    ];
  
    const index = 9 - errorsLeft;
  
    if (index >= 0 && index < parts.length) {
      parts[index](); // Call the function at the correct index
    } else {
      console.error(`Invalid index: ${index}`); // Handle invalid index
    }
  }

  drawBase() {
    const baseWidth = 150; // Width of the base
    const baseHeight = 50; // Height of the base
  
    console.log('Drawing base');
    this.context.beginPath();
    this.context.moveTo(100, 600); // Starting point of the triangle
    this.context.lineTo(250, 600); // Bottom-right corner
    this.context.lineTo(175, 550); // Top of the triangle
    this.context.closePath(); // Closes the path back to the starting point
  
    this.context.strokeStyle = '#000'; // Set stroke color to black
    this.context.lineWidth = 2; // Set line width
    this.context.stroke(); // Draw the path
  }

  drawVerticalLine() {
    this.context.beginPath();
    this.context.moveTo(175, 550);
    this.context.lineTo(175, 100);
    this.context.stroke();
  }

  drawHorizontalLine() {
    this.context.beginPath();
    this.context.moveTo(175, 100);
    this.context.lineTo(400, 100);
    this.context.stroke();
  }

  drawRope() {
    this.context.beginPath();
    this.context.moveTo(400, 100);
    this.context.lineTo(400, 150);
    this.context.stroke();
  }

  drawHead() {
    this.context.beginPath();
    this.context.arc(400, 180, 30, 0, Math.PI * 2);
    this.context.stroke();
  }

  drawBody() {
    this.context.beginPath();
    this.context.moveTo(400, 210);
    this.context.lineTo(400, 350);
    this.context.stroke();
  }

  drawLeftArm() {
    this.context.beginPath();
    this.context.moveTo(400, 250);
    this.context.lineTo(350, 300);
    this.context.stroke();
  }

  drawRightArm() {
    this.context.beginPath();
    this.context.moveTo(400, 250);
    this.context.lineTo(450, 300);
    this.context.stroke();
  }

  drawLeftLeg() {
    this.context.beginPath();
    this.context.moveTo(400, 350);
    this.context.lineTo(350, 450);
    this.context.stroke();
  }

  drawRightLeg() {
    this.context.beginPath();
    this.context.moveTo(400, 350);
    this.context.lineTo(450, 450);
    this.context.stroke();
  }

  gameOver() {
    console.log('Game over method called'); // Debugging line
    const img = new Image();
    img.src = 'images/gameover.png';
    img.onload = () => {
      this.context.drawImage(img, 200, 100, 600, 400);
    };
  }

  winner() {
    const img = new Image();
    img.src = 'images/awesome.png';
    img.onload = () => {
      this.context.drawImage(img, 200, 100, 600, 400);
    };
  }
}