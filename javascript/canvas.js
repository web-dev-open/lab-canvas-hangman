class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
    this.createBoard();
  }

  createBoard() {
    this.context.clearRect(0, 0, 800, 1200);
    this.drawLines();
  }

  drawLines() {
    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(400 + i * 50, 700);
      this.context.lineTo(450 + i * 50, 700);
      this.context.stroke();
      this.context.closePath();
    }
  }

  writeCorrectLetter(index) {
    this.context.font = '30px Arial';
    this.context.fillText(this.secretWord[index], 400 + index * 50, 680);
  }

  writeWrongLetter(letter, errorsLeft) {
    this.context.font = '30px Arial';
    this.context.fillText(letter, 700 - (10 - errorsLeft) * 30, 100);
  }

  drawHangman(errorsLeft) {
    const ctx = this.context;

    // Clear the canvas
    ctx.clearRect(0, 0, 800, 800);

    // Drawing logic (unchanged)
  }

  gameOver() {
    const imageElement = document.createElement('img');
    imageElement.src = 'images/gameover.png';  // Update with the correct relative path
    imageElement.alt = 'Game Over Image';
    document.body.appendChild(imageElement);
  }

  winner() {
    const imageElement = document.createElement('img');
    imageElement.src = 'images/awesome.png';  // Update with the correct relative path
    imageElement.alt = 'Winner Image';
    document.body.appendChild(imageElement);
  }
}

