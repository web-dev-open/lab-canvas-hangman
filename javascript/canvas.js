
class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }

  createBoard() {
    this.context.clearRect(0, 0, 600, 400);  // Clear the canvas
    this.drawLines();  // Draw lines for each letter in the secret word
  }

  drawLines() {
    const startX = 100;
    const startY = 350;
    const lineWidth = 50;

    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(startX + i * lineWidth, startY);
      this.context.lineTo(startX + i * lineWidth + 30, startY);
      this.context.stroke();
    }
  }

  writeCorrectLetter(letter) {
    if (!letter) return;  // Avoid undefined issues
    const startX = 105;
    const startY = 340;
    const lineWidth = 50;

    for (let i = 0; i < this.secretWord.length; i++) {
      if (this.secretWord[i] === letter) {
        this.context.font = '30px Arial';
        this.context.fillText(letter.toUpperCase(), startX + i * lineWidth, startY);
      }
    }
  }

  writeWrongLetter(letter, errorsLeft) {
    if (!letter) return;  // Avoid undefined issues
    const startX = 400;
    const startY = 50;

    this.context.font = '30px Arial';
    this.context.fillText(letter.toUpperCase(), startX + (10 - errorsLeft) * 30, startY);
  }

  drawHangman(errorsLeft) {
    // Basic hangman drawing based on errors left (for demo)
    const steps = [
      () => { this.context.beginPath(); this.context.moveTo(200, 300); this.context.lineTo(400, 300); this.context.stroke(); },  // base
      () => { this.context.beginPath(); this.context.moveTo(300, 300); this.context.lineTo(300, 50); this.context.stroke(); },   // pole
      () => { this.context.beginPath(); this.context.moveTo(300, 50); this.context.lineTo(400, 50); this.context.stroke(); },    // top bar
      () => { this.context.beginPath(); this.context.moveTo(400, 50); this.context.lineTo(400, 100); this.context.stroke(); },  // rope
      () => { this.context.beginPath(); this.context.arc(400, 120, 20, 0, Math.PI * 2); this.context.stroke(); },             // head
      () => { this.context.beginPath(); this.context.moveTo(400, 140); this.context.lineTo(400, 200); this.context.stroke(); }, // body
      () => { this.context.beginPath(); this.context.moveTo(400, 150); this.context.lineTo(380, 180); this.context.stroke(); }, // left arm
      () => { this.context.beginPath(); this.context.moveTo(400, 150); this.context.lineTo(420, 180); this.context.stroke(); }, // right arm
      () => { this.context.beginPath(); this.context.moveTo(400, 200); this.context.lineTo(380, 230); this.context.stroke(); }, // left leg
      () => { this.context.beginPath(); this.context.moveTo(400, 200); this.context.lineTo(420, 230); this.context.stroke(); }, // right leg
    ];

    if (errorsLeft <= 10 && errorsLeft > 0) {
      steps[10 - errorsLeft]();
    }
  }

  gameOver() {
    alert("Game Over! The word was: " + this.secretWord);
  }

  winner() {
    alert("You Won! The word was: " + this.secretWord);
  }
}
