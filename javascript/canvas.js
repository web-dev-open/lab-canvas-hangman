class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
    this.lettersGuessed = [];
    this.errorsLeft = 10;
    this.canvasWidth = 1200;
    this.canvasHeight = 800;
    this.hangmanParts = [
      { x: 400, y: 500, width: 100, height: 10 }, // Base
      { x: 400, y: 150, width: 100, height: 10 }, // Top bar
      { x: 450, y: 150, width: 10, height: 250 }, // Vertical post
      { x: 450, y: 200, width: 10, height: 100 }, // Head
      { x: 450, y: 250, width: 10, height: 100 }, // Body
      { x: 430, y: 300, width: 40, height: 10 }, // Left arm
      { x: 470, y: 300, width: 40, height: 10 }, // Right arm
      { x: 430, y: 350, width: 40, height: 10 }, // Left leg
      { x: 470, y: 350, width: 40, height: 10 } // Right leg
    ];
  }

  createBoard() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawLines();
  }

  drawLines() {
    this.context.lineWidth = 5;
    this.context.strokeStyle = 'black';
    this.context.beginPath();
    this.context.moveTo(400, 500);
    this.context.lineTo(400, 150);
    this.context.stroke();
    this.context.moveTo(450, 150);
    this.context.lineTo(450, 200);
    this.context.stroke();
  }

  writeCorrectLetter(index) {
    this.context.font = '40px Arial';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'green';
    this.context.fillText(this.secretWord[index], 400 + 50 * (index + 1), 550);
  }

  writeWrongLetter(letter) {
    this.context.font = '30px Arial';
    this.context.textAlign = 'left';
    this.context.textBaseline = 'top';
    this.context.fillStyle = 'red';
    this.context.fillText(letter, 100, 100 + 30 * this.lettersGuessed.length);
  }

  drawHangman() {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.hangmanParts[this.errorsLeft - 1].x, this.hangmanParts[this.errorsLeft - 1].y, this.hangmanParts[this.errorsLeft - 1].width, this.hangmanParts[this.errorsLeft - 1].height);
  }

  gameOver() {
    this.context.font = '60px Arial';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'red';
    this.context.fillText('Game Over!', this.canvasWidth / 2, this.canvasHeight / 2);
  }

  winner() {
    this.context.font = '60px Arial';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'green';
    this.context.fillText('You Win!', this.canvasWidth / 2, this.canvasHeight / 2);
  }
}