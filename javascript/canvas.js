class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
    this.createBoard(); // Initialize canvas with a clean board
  }

  createBoard() {
    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines();
  }

  drawLines() {
    this.context.beginPath();
    this.context.lineWidth = 5;
    this.context.strokeStyle = 'black';
    let x = 500;
    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.moveTo(x, 650);
      this.context.lineTo(x + 50, 650);
      x += 60;
    }
    this.context.stroke();
  }

  writeCorrectLetter(index) {
    this.context.font = '40px Arial';
    this.context.fillStyle = 'black';
    this.context.fillText(this.secretWord[index], 500 + (index * 60), 640);
  }

  writeWrongLetter(letter, errorsLeft) {
    this.context.font = '30px Arial';
    this.context.fillStyle = 'red';
    this.context.fillText(letter, 500 + ((10 - errorsLeft) * 30), 700);
  }

  drawHangman(errorsLeft) {
    // Draw Hangman based on errorsLeft
    this.context.beginPath();
    this.context.lineWidth = 5;
    this.context.strokeStyle = 'black';
    
    if (errorsLeft < 10) { // Head
      this.context.arc(700, 200, 20, 0, Math.PI * 2, true);
    }
    if (errorsLeft < 9) { // Body
      this.context.moveTo(700, 220);
      this.context.lineTo(700, 300);
    }
    if (errorsLeft < 8) { // Right Arm
      this.context.moveTo(700, 230);
      this.context.lineTo(740, 270);
    }
    if (errorsLeft < 7) { // Left Arm
      this.context.moveTo(700, 230);
      this.context.lineTo(660, 270);
    }
    if (errorsLeft < 6) { // Right Leg
      this.context.moveTo(700, 300);
      this.context.lineTo(740, 350);
    }
    if (errorsLeft < 5) { // Left Leg
      this.context.moveTo(700, 300);
      this.context.lineTo(660, 350);
    }
    
    this.context.stroke();
  }

  gameOver() {
    this.context.font = '50px Arial';
    this.context.fillStyle = 'red';
    this.context.fillText('Game Over', 500, 400);
  }

  winner() {
    this.context.font = '50px Arial';
    this.context.fillStyle = 'green';
    this.context.fillText('You Win!', 500, 400);
  }
}
