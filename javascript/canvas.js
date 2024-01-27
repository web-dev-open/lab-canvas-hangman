class HangmanCanvas {
  constructor(secretWord) {
    this.canvas = document.getElementById('hangmanCanvas');
    this.context = this.canvas.getContext('2d');
    this.secretWord = secretWord;
  }

  createBoard() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawLines();
  }

  drawLines() {
    const wordLength = this.secretWord.length;
    const lineWidth = 50; // Adjust as needed
    const lineHeight = 5; // Adjust as needed

    for (let i = 0; i < wordLength; i++) {
      this.context.beginPath();
      this.context.moveTo(i * lineWidth + 20, this.canvas.height - 20);
      this.context.lineTo((i + 1) * lineWidth - 20, this.canvas.height - 20);
      this.context.stroke();
    }
  }

  writeCorrectLetter(index) {
    const letter = this.secretWord[index];
    this.context.font = '20px Arial';
    this.context.fillStyle = 'black';
    this.context.fillText(letter, index * 50 + 30, this.canvas.height - 30);
  }

  writeWrongLetter(letter, errorsLeft) {
    const yPos = 50 + (10 - errorsLeft) * 20;
    this.context.font = '20px Arial';
    this.context.fillStyle = 'red';
    this.context.fillText(letter, 500, yPos);
  }

  drawHangman(errorsLeft) {
    const context = this.context;
  
    switch (errorsLeft) {
      case 9:
        // Draw head
        context.beginPath();
        context.arc(150, 60, 20, 0, Math.PI * 2);
        context.stroke();
        break;
  
      case 8:
        // Draw body
        context.moveTo(150, 80);
        context.lineTo(150, 120);
        context.stroke();
        break;
  
      // Continue with cases for other parts of the hangman...
      // Adjust coordinates and shapes as needed.
    }
  }

  gameOver() {
    <img src="images\gameover.png" alt="gameover"/>
  }
  
  winner() {
    <img src="images\awesome.png" alt="youwon"/>
  }
  
// Example usage:
// Uncomment the following lines in hangman.js to initialize HangmanCanvas
// hangman.secretWord = hangman.pickWord();
// hangmanCanvas = new HangmanCanvas(hangman.secretWord);
// hangmanCanvas.createBoard();
