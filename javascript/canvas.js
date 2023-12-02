class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    // ... your code goes here
    this.secretWord = secretWord;
  }

  createBoard() {
    // ... your code goes here
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    this.context.lineWidth = 2;
  }

  drawLines() {
    // ... your code goes here
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
    // ... your code goes here
    const lineWidth = 50;
    const initialX = 100;
    const initialY = 580;

    this.context.font = '30px Arial';
    this.context.fillText(letter, initialX + index * lineWidth, initialY);
  }

  writeWrongLetter(letter, errorsLeft) {
    // ... your code goes here
    const initialX = 400;
    const initialY = 100;
    const step = 40;

    this.context.font = '30px Arial';
    this.context.fillText(letter, initialX - (6 - errorsLeft) * step, initialY);
  }

  drawHangman(errorsLeft) {
    // ... your code goes here
    drawHangman(errorsLeft) { switch (errorsLeft) {
      case 6:
        // Draw the hangman's head
        this.context.beginPath();
        this.context.arc(250, 200, 50, 0, Math.PI * 2);
        this.context.stroke();
        break;
      case 5:
        // Draw the hangman's body
        this.context.moveTo(250, 250);
        this.context.lineTo(250, 400);
        this.context.stroke();
        break;
      case 4:
        // Draw the left arm
        this.context.moveTo(250, 250);
        this.context.lineTo(200, 300);
        this.context.stroke();
        break;
      case 3:
        // Draw the right arm
        this.context.moveTo(250, 250);
        this.context.lineTo(300, 300);
        this.context.stroke();
        break;
      case 2:
        // Draw the left leg
        this.context.moveTo(250, 400);
        this.context.lineTo(200, 500);
        this.context.stroke();
        break;
      case 1:
        // Draw the right leg
        this.context.moveTo(250, 400);
        this.context.lineTo(300, 500);
        this.context.stroke();
        break;
    }
    }
  }

  gameOver() {
    // ... your code goes here
    this.context.font = '40px Arial';
    this.context.fillText('Game Over', 400, 300);
  }

  winner() {
    // ... your code goes here
    this.context.font = '40px Arial';
    this.context.fillText('You Win!', 400, 300);
  }
}