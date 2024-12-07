class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }

  /**
   * Clears the canvas and prepares it for a new game.
   */
  createBoard() {
    this.context.clearRect(0, 0, 800, 500); // Clear the canvas
    this.context.font = '48px Arial';
    this.context.fillStyle = 'black';
    this.drawLines(); // Draw lines for the secret word
  }

  /**
   * Draws one line for each letter in the secret word.
   */
  drawLines() {
    const lineWidth = 50;
    const gap = 20;
    const startX = 200;
    const startY = 450;

    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(startX + i * (lineWidth + gap), startY);
      this.context.lineTo(startX + i * (lineWidth + gap) + lineWidth, startY);
      this.context.stroke();
    }
  }

  /**
   * Writes a correct letter in the appropriate position.
   * @param {number} index - Index of the letter in the secret word
   */
  writeCorrectLetter(index) {
    const lineWidth = 50;
    const gap = 20;
    const startX = 200;
    const startY = 440;

    const x = startX + index * (lineWidth + gap) + 10;
    const y = startY;

    this.context.fillText(this.secretWord[index], x, y);
  }

  /**
   * Writes a wrong letter and displays remaining attempts.
   * @param {string} letter - The wrong letter guessed by the user
   * @param {number} errorsLeft - Remaining attempts
   */
  writeWrongLetter(letter, errorsLeft) {
    const startX = 500;
    const startY = 100;
    const gap = 40;

    // Write wrong letter
    this.context.fillText(letter, startX + (10 - errorsLeft) * gap, startY);

    // Draw hangman
    this.drawHangman(errorsLeft);
  }

  /**
   * Draws the hangman figure based on the remaining errors.
   * @param {number} errorsLeft - Remaining attempts
   */
  drawHangman(errorsLeft) {
    const parts = [
      () => this.context.fillRect(150, 400, 100, 10), // Base
      () => this.context.fillRect(190, 100, 10, 300), // Pole
      () => this.context.fillRect(190, 100, 150, 10), // Beam
      () => this.context.fillRect(330, 100, 10, 50), // Rope
      () => {
        // Head
        this.context.beginPath();
        this.context.arc(335, 180, 30, 0, Math.PI * 2);
        this.context.stroke();
      },
      () => this.context.fillRect(330, 210, 10, 100), // Body
      () => this.context.fillRect(330, 310, 40, 10), // Right Arm
      () => this.context.fillRect(290, 310, 40, 10), // Left Arm
      () => this.context.fillRect(330, 310, 10, 80), // Right Leg
      () => this.context.fillRect(290, 310, 10, 80), // Left Leg
    ];

    // Draw the corresponding part
    const partIndex = 10 - errorsLeft;
    if (parts[partIndex]) parts[partIndex]();
  }

  /**
   * Displays the "Game Over" screen.
   */
  gameOver() {
    this.context.clearRect(0, 0, 800, 500); // Clear the canvas
    this.context.font = '60px Arial';
    this.context.fillStyle = 'red';
    this.context.fillText('Game Over!', 250, 250);
  }

  /**
   * Displays the "Winner" screen.
   */
  winner() {
    this.context.clearRect(0, 0, 800, 500); // Clear the canvas
    this.context.font = '60px Arial';
    this.context.fillStyle = 'green';
    this.context.fillText('You Win!', 250, 250);
  }
}
