class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById("hangman").getContext("2d");
    this.secretWord = secretWord;
    this.lineSpacing = 10;
  }

  createBoard() {
    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines();
  }

  drawLines() { 
    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(200 + i * (50 + this.lineSpacing), 500);
      this.context.lineTo(250 + i * (50 + this.lineSpacing), 500);
      this.context.stroke();
      this.context.closePath();
    }
  }

  writeCorrectLetter(letter) {
    this.context.font = "48px serif";
    for (let i = 0; i < this.secretWord.length; i++) {
      if (this.secretWord[i].toUpperCase() === letter.toUpperCase()) {
        const textWidth = this.context.measureText(letter.toUpperCase()).width;
        const xPosition =
          200 + i * (50 + this.lineSpacing) + (50 - textWidth) / 2;
        const yPosition = 490;
        this.context.fillText(letter.toUpperCase(), xPosition, yPosition);
      }
    }
  }

  writeWrongLetter(letter, errorsLeft) {
    this.context.font = "48px serif";
    this.context.fillText(
      letter.toUpperCase(),
      200 + (10 - errorsLeft) * 50,
      200
    );
  }

  drawHangman(errorsLeft) {
    this.context.beginPath();
    switch (errorsLeft) {
      case 9:
        this.context.moveTo(150, 500);
        this.context.lineTo(150, 100);
        this.context.lineTo(400, 100);
        this.context.lineTo(400, 150);
        break;
      case 8:
        this.context.moveTo(400, 150);
        this.context.arc(400, 200, 50, 0, Math.PI * 2);
        break;
      case 7:
        this.context.moveTo(400, 250);
        this.context.lineTo(400, 400);
        break;
      case 6:
        this.context.moveTo(400, 400);
        this.context.lineTo(450, 450);
        break;
      case 5:
        this.context.moveTo(400, 400);
        this.context.lineTo(350, 450);
        break;
      case 4:
        this.context.moveTo(400, 300);
        this.context.lineTo(450, 350);
        break;
      case 3:
        this.context.moveTo(400, 300);
        this.context.lineTo(350, 350);
        break;
      case 2:
        this.context.moveTo(400, 200);
        this.context.lineTo(450, 250);
        break;
      case 1:
        this.context.moveTo(400, 200);
        this.context.lineTo(350, 250);
        break;
    }
    this.context.stroke();
    this.context.closePath();
  }

  gameOver() {
    this.context.font = "48px serif";
    this.context.fillText(`Secret word is : ${this.secretWord}`, 500, 300);
    const img = new Image();
    img.src = "./images/gameover.png";
    img.onload = () => {
      this.context.drawImage(img, 400, 400);
    };
  }

  winner() {
    const img = new Image();
    img.src = "./images/awesome.png";
    img.onload = () => {
      this.context.drawImage(img, 200, 200);
    };
  }
}
