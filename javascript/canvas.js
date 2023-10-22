class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById("hangman").getContext("2d");
    this.secretWord = secretWord;
    this.errorsLeft = 10;
    this.correctGuesses = "";
    this.wrongGuesses = "";
    this.positions = {
      base: [60, 360, 250, 360],
      pole: [125, 360, 125, 100],
      top: [120, 100, 175, 100],
      rope: [170, 100, 170, 150],
      head: [170, 150, 150, 170, 190, 170],
      body: [170, 170, 170, 250],
      leftArm: [170, 180, 140, 220],
      rightArm: [170, 180, 200, 220],
      leftLeg: [170, 250, 140, 290],
      rightLeg: [170, 250, 200, 290],
    };

    this.createBoard();
  }

  createBoard() {
    this.context.clearRect(0, 0, 800, 1200);
  }

  drawLines() {
    for (let i = 0; i < this.secretWord.length; i++) {
      const x = 300 + i * 50;
      const y = 400;
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.lineTo(x + 40, y);
      this.context.stroke();
    }
  }

  writeCorrectLetter(index) {
    const x = 310 + index * 50;
    const y = 390;
    this.context.font = "30px Arial";
    this.context.fillText(this.secretWord[index], x, y);
  }

  writeWrongLetter(letter, errorsLeft) {
    const x = 600 + (10 - errorsLeft) * 30;
    const y = 100;
    this.context.font = "30px Arial";
    this.context.fillText(letter, x, y);
  }

  drawHangman(errorsLeft) {
    const errorCount = 10 - errorsLeft;
    const positions =
      this.positions[Object.keys(this.positions)[errorCount - 1]];
    this.context.beginPath();
    this.context.moveTo(positions[0], positions[1]);
    for (let i = 2; i < positions.length; i += 2) {
      this.context.lineTo(positions[i], positions[i + 1]);
    }
    this.context.stroke();
  }

  gameOver() {
    this.context.clearRect(0, 0, 800, 1200);
    this.context.font = "60px Arial";
    this.context.fillText("Game Over!", 250, 200);
  }

  winner() {
    this.context.clearRect(0, 0, 800, 1200);
    this.context.font = "60px Arial";
    this.context.fillText("You Win!", 250, 200);
  }
}

if (typeof module !== "undefined") {
  module.exports = HangmanCanvas;
}
