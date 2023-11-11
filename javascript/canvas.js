class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    // ... your code goes here
  }

  createBoard() {
    // ... your code goes here
  }

  drawLines() {
    // ... your code goes here
  }

  writeCorrectLetter(index) {
    // ... your code goes here
  }

  writeWrongLetter(letter, errorsLeft) {
    // ... your code goes here
  }

  drawHangman(errorsLeft) {
    // ... your code goes here
  }
  gameOver() {
    const img = new Image();
    img.src = 'images/gameover.png'; // Provide the path to your game over image
    img.onload = () => {
      this.context.drawImage(img, 200, 200);
    }
  }

  winner() {
    const img = new Image();
    img.src = 'images/awesome.png'; // Provide the path to your winner image
    img.onload = () => {
      this.context.drawImage(img, 200, 200);
    }
  }
  
}
class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }

  createBoard() {
    this.context.clearRect(0, 0, 800, 1200); // Clear the canvas
    this.drawLines();
  }

  drawLines() {
    const wordLength = this.secretWord.length;
    this.context.lineWidth = 2;

    for (let i = 0; i < wordLength; i++) {
      this.context.beginPath();
      this.context.moveTo(400 + i * 50, 700);
      this.context.lineTo(450 + i * 50, 700);
      this.context.stroke();
    }
  }

  writeCorrectLetter(index) {
    this.context.font = '40px Arial';
    this.context.fillStyle = 'black';
    this.context.fillText(this.secretWord[index], 400 + index * 50, 690);
  }

  writeWrongLetter(letter, errorsLeft) {
    this.context.font = '40px Arial';
    this.context.fillStyle = 'red';
    this.context.fillText(letter, 700 - errorsLeft * 40, 100);
  }

  drawHangman(errorsLeft) {
    this.context.lineWidth = 2;

    switch (errorsLeft) {
      case 9:
        // Draw the head
        this.context.beginPath();
        this.context.arc(400, 250, 50, 0, Math.PI * 2);
        this.context.stroke();
        break;

      case 8:
        // Draw the body
        this.context.moveTo(400, 300);
        this.context.lineTo(400, 500);
        this.context.stroke();
        break;

      case 7:
        // Draw the left arm
        this.context.moveTo(400, 350);
        this.context.lineTo(350, 400);
        this.context.stroke();
        break;

      // Add more cases to draw other parts of the hangman as the errors increase
    }
  }
}

// Example usage:
// Assuming that you've already created the `hangman` object with a secret word
const hangmanCanvas = new HangmanCanvas(hangman.secretWord);

// To create the initial board:
hangmanCanvas.createBoard();
