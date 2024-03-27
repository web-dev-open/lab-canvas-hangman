class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    // ... your code goes here
    this.secretWord = secretWord;
  }

  createBoard() {
    // ... your code goes here
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.drawLines();
  }

  drawLines() {
    // ... your code goes here
    let x = 50;
    let y = this.context.canvas.height - 50;
    const spaceBetweenLines = 20;

    this.context.lineWidth = 3;
    this.context.strokeStyle = 'black';

    this.secretWord.split('').forEach(() => {
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.lineTo(x + 50, y);
      this.context.stroke();
      x += 60;
    });
  }

  writeCorrectLetter(index) {
    // ... your code goes here
    const x = 55 + index * 60;
    const y = this.context.canvas.height - 70;

    this.context.font = '30px Arial';
    this.context.fillStyle = 'black';
    this.context.fillText(this.secretWord[index].toUpperCase(), x, y);
  }

  writeWrongLetter(letter, errorsLeft) {
    // ... your code goes here
    const x = 400 + (10 - errorsLeft) * 30;
    const y = 50;

    this.context.font = '30px Arial';
    this.context.fillStyle = 'red';
    this.context.fillText(letter.toUpperCase(), x, y);
  }

  drawHangman(errorsLeft) {
    // ... your code goes here
    switch (errorsLeft) {
      case 9:
        // Draw head
        this.context.beginPath();
        this.context.arc(400, 120, 50, 0, Math.PI * 2);
        this.context.stroke();
        break;
      case 8:
        // Draw body
        this.context.beginPath();
        this.context.moveTo(400, 170);
        this.context.lineTo(400, 350);
        this.context.stroke();
        break;
      case 7:
        // Draw left arm
        this.context.beginPath();
        this.context.moveTo(400, 200);
        this.context.lineTo(300, 250);
        this.context.stroke();
        break;
      case 6:
        // Draw right arm
        this.context.beginPath();
        this.context.moveTo(400, 200);
        this.context.lineTo(500, 250);
        this.context.stroke();
        break;
      case 5:
        // Draw left leg
        this.context.beginPath();
        this.context.moveTo(400, 350);
        this.context.lineTo(350, 450);
        this.context.stroke();
        break;
      case 4:
        // Draw right leg
        this.context.beginPath();
        this.context.moveTo(400, 350);
        this.context.lineTo(450, 450);
        this.context.stroke();
        break;
      case 3:
        // Draw left foot
        this.context.beginPath();
        this.context.moveTo(340, 480);
        this.context.lineTo(360, 480);
        this.context.stroke();
        break;
      case 2:
        // Draw right foot
        this.context.beginPath();
        this.context.moveTo(410, 480);
        this.context.lineTo(430, 480);
        this.context.stroke();
        break;
      case 1:
        // Draw left eye
        this.context.beginPath();
        this.context.arc(380, 110, 5, 0, Math.PI * 2);
        this.context.stroke();
        break;
      case 0:
        // Draw right eye
        this.context.beginPath();
        this.context.arc(420, 110, 5, 0, Math.PI * 2);
        this.context.stroke();
        break;
    }
  }

  gameOver() {
    // ... your code goes here
    const img = new Image();
    img.src = './images/gameover.png';
    img.onload = () => {
      this.context.drawImage(img, 150, 200, 300, 200);
    };
  }

  winner() {
    // ... your code goes here
    const img = new Image();
    img.src = './images/awesome.png';
    img.onload = () => {
      this.context.drawImage(img, 150, 200, 300, 200);
    };
  }
  }

