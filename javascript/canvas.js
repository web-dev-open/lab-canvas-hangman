
class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById("hangman").getContext("2d");
    this.secretWord = secretWord;
    this.canvasWidth = 1200;
    this.canvasHeight = 800;
    this.context.canvas.width = this.canvasWidth;
    this.context.canvas.height = this.canvasHeight;
  }

  createBoard() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // Clear the canvas
    this.drawLines(); // Draw the lines where the word letters will appear
  }

  drawLines() {
    const wordLength = this.secretWord.length;
    const lineWidth = 50;
    const lineGap = 30;
    for (let i = 0; i < wordLength; i++) {
      this.context.beginPath();
      this.context.moveTo(150 + (lineWidth + lineGap) * i, 400);
      this.context.lineTo(200 + (lineWidth + lineGap) * i, 400);
      this.context.stroke();
    }
  }

  writeCorrectLetter(index) {
    // Draw the correct letter at the appropriate position
    this.context.font = "40px Arial";
    this.context.fillText(this.secretWord[index], 150 + index * 80, 380);
  }

  writeWrongLetter(letter, errorsLeft) {
    // Display the wrong letter and remaining errors on the canvas
    this.context.font = "30px Arial";
    this.context.fillText(letter, 600 + errorsLeft * 40, 150);
  }

  drawHangman(errorsLeft) {
    const x = 150;
    const y = 300;
    switch (errorsLeft) {
      case 9:
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x, y + 200);
        this.context.stroke();
        break;
      case 8:
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x + 100, y);
        this.context.stroke();
        break;
      case 7:
        this.context.beginPath();
        this.context.moveTo(x + 100, y);
        this.context.lineTo(x + 100, y + 50);
        this.context.stroke();
        break;
      case 6:
        this.context.beginPath();
        this.context.arc(x + 100, y + 80, 30, 0, Math.PI * 2);
        this.context.stroke();
        break;
      case 5:
        this.context.beginPath();
        this.context.moveTo(x + 100, y + 110);
        this.context.lineTo(x + 100, y + 180);
        this.context.stroke();
        break;
      case 4:
        this.context.beginPath();
        this.context.moveTo(x + 70, y + 140);
        this.context.lineTo(x + 130, y + 140);
        this.context.stroke();
        break;
      case 3:
        this.context.beginPath();
        this.context.moveTo(x + 100, y + 180);
        this.context.lineTo(x + 70, y + 230);
        this.context.stroke();
        break;
      case 2:
        this.context.beginPath();
        this.context.moveTo(x + 100, y + 180);
        this.context.lineTo(x + 130, y + 230);
        this.context.stroke();
        break;
      case 1:
        this.context.beginPath();
        this.context.moveTo(x + 100, y + 220);
        this.context.lineTo(x + 70, y + 260);
        this.context.stroke();
        break;
      case 0:
        this.context.beginPath();
        this.context.moveTo(x + 100, y + 220);
        this.context.lineTo(x + 130, y + 260);
        this.context.stroke();
        break;
    }
  }
}
const words = ["javascript", "hangman", "canvas", "game"];
const hangman = new Hangman(words);
hangmanCanvas = new HangmanCanvas(hangman.secretWord);
hangmanCanvas.createBoard();

// Event listener for keypress to start the game loop
document.addEventListener("keydown", (event) => {
  if (hangman.checkIfLetter(event.keyCode)) {
    const letter = event.key.toLowerCase();
    if (hangman.checkClickedLetters(letter)) {
      if (hangman.secretWord.includes(letter)) {
        hangman.addCorrectLetter(letter);
        hangmanCanvas.writeCorrectLetter(hangman.secretWord.indexOf(letter));
      } else {
        hangman.addWrongLetter(letter);
        hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
        hangmanCanvas.drawHangman(hangman.errorsLeft);
      }
    }
  }

  if (hangman.checkGameOver()) {
    // Show game over message
    alert("Game Over!");
  }

  if (hangman.checkWinner()) {
    // Show winner message
    alert("You Win!");
  }
});
