class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById("hangman").getContext("2d");
    this.secretWord = secretWord;
  }

  createBoard() {
    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines();
  }

  drawLines() {
    this.context.beginPath();
    this.context.lineWidth = 3;
    this.context.strokeStyle = "#000";

    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.moveTo(200 + i * 60, 700);
      this.context.lineTo(250 + i * 60, 700);
    }
    this.context.stroke();
    this.context.closePath();
  }

  writeCorrectLetter(index) {
    const letter = this.secretWord[index].toUpperCase();
    this.context.font = "48px Arial";
    this.context.fillStyle = "#000";
    this.context.fillText(letter, 205 + index * 60, 690);
  }

  writeWrongLetter(letter, errorsLeft) {
    this.context.font = "36px Arial";
    this.context.fillStyle = "red";
    const wrongIndex = 10 - errorsLeft - 1; // position of wrong letter
    this.context.fillText(letter.toUpperCase(), 700 + wrongIndex * 40, 200);
  }

  drawHangman(errorsLeft) {
    const ctx = this.context;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;

    switch (errorsLeft) {
      case 9: // base
        ctx.beginPath();
        ctx.moveTo(150, 650);
        ctx.lineTo(300, 650);
        ctx.stroke();
        break;
      case 8: // vertical pole
        ctx.beginPath();
        ctx.moveTo(200, 650);
        ctx.lineTo(200, 200);
        ctx.stroke();
        break;
      case 7: // top bar
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.lineTo(400, 200);
        ctx.stroke();
        break;
      case 6: // rope
        ctx.beginPath();
        ctx.moveTo(400, 200);
        ctx.lineTo(400, 250);
        ctx.stroke();
        break;
      case 5: // head
        ctx.beginPath();
        ctx.arc(400, 280, 30, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case 4: // body
        ctx.beginPath();
        ctx.moveTo(400, 310);
        ctx.lineTo(400, 450);
        ctx.stroke();
        break;
      case 3: // left arm
        ctx.beginPath();
        ctx.moveTo(400, 350);
        ctx.lineTo(350, 400);
        ctx.stroke();
        break;
      case 2: // right arm
        ctx.beginPath();
        ctx.moveTo(400, 350);
        ctx.lineTo(450, 400);
        ctx.stroke();
        break;
      case 1: // left leg
        ctx.beginPath();
        ctx.moveTo(400, 450);
        ctx.lineTo(350, 520);
        ctx.stroke();
        break;
      case 0: // right leg
        ctx.beginPath();
        ctx.moveTo(400, 450);
        ctx.lineTo(450, 520);
        ctx.stroke();
        break;
    }
  }

  gameOver() {
    const img = new Image();
    img.src = "images/gameover.png";
    img.onload = () => {
      this.context.drawImage(img, 300, 200, 600, 400);
    };
  }

  winner() {
    const img = new Image();
    img.src = "images/awesome.png";
    img.onload = () => {
      this.context.drawImage(img, 300, 200, 600, 400);
    };
  }
}
