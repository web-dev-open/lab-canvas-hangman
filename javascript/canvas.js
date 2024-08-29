class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById("hangman").getContext("2d");
    this.secretWord = secretWord;
  }
  createBoard() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
    this.context.lineWidth = 2;
  }
  drawLines() {
    const wordLength = this.secretWord.length;
    const lineWidth = 50;
    const initialX = 100;
    const initialY = 600;
    for (let i = 0; i < wordLength; i++) {
      this.context.beginPath();
      this.context.moveTo(initialX + i * lineWidth, initialY);
      this.context.lineTo(initialX + i * lineWidth + 40, initialY);
      this.context.stroke();
    }
  }
  writeCorrectLetter(index) {
    const lineWidth = 50;
    const initialX = 100;
    const initialY = 580;
    this.context.font = "30px Arial";
    this.context.fillText(letter, initialX + index * lineWidth, initialY);
  }
  writeWrongLetter(letter, errorsLeft) {
    const initialX = 400;
    const initialY = 100;
    const step = 40;

    this.context.font = "30px Arial";
    this.context.fillText(letter, initialX - (6 - errorsLeft) * step, initialY);
  }
  drawHangman(errorsLeft) {
    switch (errorsLeft) {
      case 6:
        this.context.beginPath();
        this.context.arc(250, 200, 50, 0, Math.PI * 2);
        this.context.stroke();
        break;
      case 5:
        this.context.moveTo(250, 250);
        this.context.lineTo(250, 400);
        this.context.stroke();
        break;
      case 4:
        this.context.moveTo(250, 250);
        this.context.lineTo(200, 300);
        this.context.stroke();
        break;
      case 3:
        this.context.moveTo(250, 250);
        this.context.lineTo(300, 300);
        this.context.stroke();
        break;
      case 2:
        this.context.moveTo(250, 400);
        this.context.lineTo(200, 500);
        this.context.stroke();
        break;
      case 1:
        this.context.moveTo(250, 400);
        this.context.lineTo(300, 500);
        this.context.stroke();
        break;
    }
  }
  gameOver() {
    this.context.font = "40px Arial";
    this.context.fillText("Game Over", 400, 300);
  }
  winner() {
    this.context.font = "40px Arial";
    this.context.fillText("You Win!", 400, 300);
  }
}
window.HangmanCanvas = HangmanCanvas;
