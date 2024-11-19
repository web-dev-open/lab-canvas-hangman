class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
    this.createBoard();
    // ... your code goes here
  }

  createBoard() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.drawLines();
    // ... your code goes here
  }

  drawLines() {
    const xStart = 50;
    const yStart = canvas.height - 50;
    const lineLength = 40;

    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(xStart + i * lineLength, yStart);
      this.context.lineTo(xStart + i * lineLength + lineLength, yStart);
      this.context.stroke();
      this.context.closePath();
    // ... your code goes here
  }
}

  writeCorrectLetter(index) {
    const xStart = 50;
    const yStart = canvas.height - 50;

    this.context.fillText(this.secretWord[index], xStart + index * 40, yStart - 10);
    // ... your code goes here
  }

  writeWrongLetter(letter, errorsLeft) {
    const xStart = canvas.width - 150;
    const yStart = canvas.height - (errorsLeft * 20);

    this.context.fillText(letter, xStart, yStart);
    // ... your code goes here
  }

  drawHangman(errorsLeft) {
    console.log(`Drawing hangman with ${errorsLeft} errors left.`);
    // ... your code goes here
  }

  gameOver() {
    console.log("Game Over");
    // ... your code goes here
  }

  winner() {
    console.log("You've won!");
    // ... your code goes here
  }
}
