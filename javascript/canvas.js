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
    this.drawLines();
  }

  drawLines() {
    const ctx = this.context;
    let startX = 50;
    const startY = 300;

    for (let i = 0; i < this.secretWord.length; i++) {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + 40, startY);
      ctx.stroke();
      startX += 50;
    }
  }

  writeCorrectLetter(index) {
    const ctx = this.context;
    const letter = this.secretWord[index];
    const x = 55 + index * 50;
    const y = 295;

    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(letter.toUpperCase(), x, y);
  }

  writeWrongLetter(letter, errorsLeft) {
    const ctx = this.context;
    const x = 600 - errorsLeft * 30;
    const y = 50;

    ctx.font = "25px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(letter.toUpperCase(), x, y);
  }

  drawHangman(errorsLeft) {
    const ctx = this.context;

    if (errorsLeft <= 10) {
      ctx.beginPath();
      ctx.moveTo(50, 350);
      ctx.lineTo(150, 350);
      ctx.stroke();
    }

    if (errorsLeft <= 9) {
      ctx.beginPath();
      ctx.moveTo(100, 350);
      ctx.lineTo(100, 50);
      ctx.stroke();
    }

    if (errorsLeft <= 8) {
      ctx.beginPath();
      ctx.moveTo(100, 50);
      ctx.lineTo(250, 50);
      ctx.stroke();
    }

    if (errorsLeft <= 7) {
      ctx.beginPath();
      ctx.moveTo(250, 50);
      ctx.lineTo(250, 80);
      ctx.stroke();
    }

    if (errorsLeft <= 6) {
      ctx.beginPath();
      ctx.arc(250, 100, 20, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (errorsLeft <= 5) {
      ctx.beginPath();
      ctx.moveTo(250, 120);
      ctx.lineTo(250, 200);
      ctx.stroke();
    }

    if (errorsLeft <= 4) {
      ctx.beginPath();
      ctx.moveTo(250, 140);
      ctx.lineTo(220, 170);
      ctx.stroke();
    }

    if (errorsLeft <= 3) {
      ctx.beginPath();
      ctx.moveTo(250, 140);
      ctx.lineTo(280, 170);
      ctx.stroke();
    }

    if (errorsLeft <= 2) {
      ctx.beginPath();
      ctx.moveTo(250, 200);
      ctx.lineTo(220, 250);
      ctx.stroke();
    }

    if (errorsLeft <= 1) {
      ctx.beginPath();
      ctx.moveTo(250, 200);
      ctx.lineTo(280, 250);
      ctx.stroke();
    }
  }

  gameOver() {
    const img = new Image();
    img.src = "images/gameover.png";
    img.onload = () => {
      this.context.drawImage(
        img,
        0,
        0,
        this.context.canvas.width,
        this.context.canvas.height
      );
    };
  }

  winner() {
    const img = new Image();
    img.src = "images/awesome.png";
    img.onload = () => {
      this.context.drawImage(
        img,
        0,
        0,
        this.context.canvas.width,
        this.context.canvas.height
      );
    };
  }
}
