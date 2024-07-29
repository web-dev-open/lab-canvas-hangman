class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById("hangman").getContext("2d");
    this.secretWord = secretWord;
    this.width = this.context.canvas.width;
    this.height = this.context.canvas.height;
    this.correctLetters = [];
    this.wrongLetters = [];
    this.createBoard();
  }

  createBoard() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.drawLines();
  }

  drawLines() {
    const lineSpacing = 20;
    const startX = 50;
    const startY = this.height - 50;

    this.context.beginPath();
    this.context.lineWidth = 5;
    this.context.strokeStyle = "white";

    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.moveTo(startX + i * lineSpacing, startY);
      this.context.lineTo(startX + i * lineSpacing + 15, startY);
    }

    this.context.stroke();
    this.context.closePath();
  }

  writeCorrectLetter(index) {
    const lineSpacing = 20;
    const startX = 50;
    const startY = this.height - 50;
    this.context.font = "bold 20px Arial";
    this.context.fillStyle = "white";

    this.context.fillText(
      this.secretWord[index],
      startX + index * lineSpacing,
      startY - 10
    );
  }

  writeWrongLetter(letter, errorsLeft) {
    const startX = 50;
    const startY = 30;

    if (!this.wrongLetters.includes(letter)) {
      this.wrongLetters.push(letter);
      this.context.font = "bold 20px Arial";
      this.context.fillStyle = "red";
      this.context.fillText(
        letter,
        startX + (this.wrongLetters.length - 1) * 30,
        startY
      );
    }

    this.drawHangman(errorsLeft);
  }

  drawHangman(errorsLeft) {
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.strokeStyle = "white";

    this.context.moveTo(100, this.height - 100);
    this.context.lineTo(150, this.height - 100);
    this.context.lineTo(150, this.height - 150);
    this.context.lineTo(200, this.height - 150);
    this.context.stroke();

    if (errorsLeft <= 9) {
      this.context.beginPath();
      this.context.arc(175, this.height - 130, 15, 0, Math.PI * 2, true);
      this.context.stroke();
    }
    if (errorsLeft <= 8) {
      this.context.beginPath();
      this.context.moveTo(175, this.height - 115);
      this.context.lineTo(175, this.height - 70);
      this.context.stroke();
    }
    if (errorsLeft <= 7) {
      this.context.beginPath();
      this.context.moveTo(175, this.height - 105);
      this.context.lineTo(150, this.height - 90);
      this.context.stroke();
    }
    if (errorsLeft <= 6) {
      this.context.beginPath();
      this.context.moveTo(175, this.height - 105);
      this.context.lineTo(200, this.height - 90);
      this.context.stroke();
    }
    if (errorsLeft <= 5) {
      this.context.beginPath();
      this.context.moveTo(175, this.height - 70);
      this.context.lineTo(150, this.height - 40);
      this.context.stroke();
    }
    if (errorsLeft <= 4) {
      this.context.beginPath();
      this.context.moveTo(175, this.height - 70);
      this.context.lineTo(200, this.height - 40);
      this.context.stroke();
    }
    if (errorsLeft <= 3) {
      this.context.beginPath();
      this.context.moveTo(150, this.height - 40);
      this.context.lineTo(145, this.height - 35);
      this.context.stroke();
    }
    if (errorsLeft <= 2) {
      this.context.beginPath();
      this.context.moveTo(200, this.height - 40);
      this.context.lineTo(205, this.height - 35);
      this.context.stroke();
    }
    if (errorsLeft <= 1) {
      this.context.beginPath();
      this.context.moveTo(150, this.height - 90);
      this.context.lineTo(145, this.height - 85);
      this.context.stroke();
    }
    if (errorsLeft <= 0) {
      this.context.beginPath();
      this.context.moveTo(200, this.height - 90);
      this.context.lineTo(205, this.height - 85);
      this.context.stroke();
    }
    this.context.closePath();
  }

  gameOver() {
    this.context.font = "bold 30px Arial";
    this.context.fillStyle = "red";
    this.context.fillText("Game Over", this.width / 2 - 80, this.height / 2);
  }

  winner() {
    this.context.font = "bold 30px Arial";
    this.context.fillStyle = "green";
    this.context.fillText("You Win!", this.width / 2 - 80, this.height / 2);
  }
}
