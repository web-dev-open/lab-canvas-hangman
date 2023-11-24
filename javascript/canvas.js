// *******************************
// Iteration No. 2: Draw in Canvas
// *******************************

// Exporting the hangmanCanvas class
export class HangmanCanvas {
  constructor(secretWord) {
    // Getting the Canvas context
    this.context = document.getElementById("hangman").getContext("2d");

    // Storing the secret word
    this.secretWord = secretWord;
  }

  drawHearts(errorsLeft) {
    const heartEmoji = "❤️";
    const heartSize = 30;
    const heartsX = 20;
    const heartsY = 50;

    // Clearing previous hearts
    this.context.clearRect(heartsX, heartsY, 300, heartSize);

    // Drawing hearts based on errors left
    for (let i = 0; i < errorsLeft; i++) {
      this.context.font = `${heartSize}px Arial`;
      this.context.fillText(heartEmoji, heartsX + i * (heartSize + 5), heartsY);
    }
  }

  /* 
  createBoard() - The method that should clear the canvas, so every time we start the game 
  we have a clean one. This method also should call the next one we will define, drawLines().
  */
  createBoard() {
    // Clearing the Canvas for a new game
    this.context.clearRect(0, 0, 1200, 800);

    // Drawing the lines for each letter in the secret word
    this.drawLines();
  }

  /* 
  drawLines() - The method that should draw one line for each letter of the secret word. 
  At this point, we know the secret word the user has to guess.
  */
  drawLines() {
    // Draw line for each letter in the secret word
    for (let i = 0; i < this.secretWord.length; i++) {
      // Drawing a line for each letter, leave space between them
      this.context.beginPath();
      this.context.moveTo(400 + i * 50 + 10, 700);
      this.context.lineTo(450 + i * 50 - 10, 700);
      this.context.stroke();
      this.context.closePath();
    }
  }

  /* 
  writeCorrectLetter(index) - The method that should write 
  the letter on which the user has just clicked, on the appropriate part of the canvas. 
  After checking if the letter was not already clicked, we should write it on our board. 
  If the secret word includes the letter, we should write it in the position where it belongs, 
  and if the letter is not included in the secret word, we should write it on the top right corner, 
  so that the user knows which letters were already clicked.
  */
  writeCorrectLetter(index) {
    // Write the correct letter on the canvas in its right position
    const letter = this.secretWord[index];
    this.context.font = "30px Tahoma";
    this.context.fillStyle = "red"; // Set text color to red
    this.context.fillText(letter, 400 + index * 50 + 20, 690);
  }

  /* 
  writeWrongLetter(letter, errorsLeft) - The method that should write 
  the wrong letter and indicate it in the top right corner, indicated errors left.
  */
  writeWrongLetter(letter, errorsLeft) {
    // Writing the wrong letter and indicate it in the top right corner, indicated errors left
    const xOffset = 800 - errorsLeft * 30;
    const yOffset = 50;
    this.context.font = "30px Tahoma";
    this.context.fillStyle = "black"; // Set text color to black
    this.context.fillText(letter, xOffset, yOffset);
  }

  /* 
  drawHangman(errorsLeft) - The method that should draw the hangman. 
  You will see that the drawing is composed of multiple lines and one circle. 
  Go ahead and experiment; you will see it is pretty straightforward.
  */
  drawHangman(errorsLeft) {
    // Drawing in a switch-case statement the Hangman based on the errors left
    switch (errorsLeft) {
      case 9:
        // Draw the head
        this.context.beginPath();
        this.context.arc(150, 200, 50, 0, Math.PI * 2);
        this.context.stroke();
        this.context.closePath();
        break;
      case 8:
        // Drawing the body
        this.context.beginPath();
        this.context.moveTo(150, 250);
        this.context.lineTo(150, 450);
        this.context.stroke();
        this.context.closePath();
        break;
      case 7:
        // Drawing the left arm
        this.context.beginPath();
        this.context.moveTo(150, 300);
        this.context.lineTo(100, 350);
        this.context.stroke();
        this.context.closePath();
        break;
      case 6:
        // Drawing the right arm
        this.context.beginPath();
        this.context.moveTo(150, 300);
        this.context.lineTo(200, 350);
        this.context.stroke();
        this.context.closePath();
        break;
      case 5:
        // Drawing the left leg
        this.context.beginPath();
        this.context.moveTo(150, 450);
        this.context.lineTo(100, 550);
        this.context.stroke();
        this.context.closePath();
        break;
      case 4:
        // Draw the right leg
        this.context.beginPath();
        this.context.moveTo(150, 450);
        this.context.lineTo(200, 550);
        this.context.stroke();
        this.context.closePath();
        break;
      case 3:
        // Draw the left foot
        this.context.beginPath();
        this.context.moveTo(100, 550);
        this.context.lineTo(50, 580);
        this.context.stroke();
        this.context.closePath();
        break;
      case 2:
        // Draw the right foot
        this.context.beginPath();
        this.context.moveTo(200, 550);
        this.context.lineTo(250, 580);
        this.context.stroke();
        this.context.closePath();
        break;
      case 1:
        // Draw the left eye
        this.context.beginPath();
        this.context.arc(140, 190, 5, 0, Math.PI * 2);
        this.context.fillStyle = "blue";
        this.context.fill();
        this.context.closePath();
        break;
      case 0:
        // Draw the Right eye
        this.context.beginPath();
        this.context.arc(160, 190, 5, 0, Math.PI * 2);
        this.context.fillStyle = "green";
        this.context.fill();
        this.context.closePath();
        break;
      default:
        break;
    }
  }

  /* 
  gameOver() - The method that should display "Game Over =(" image on Canvas.
  */
  gameOver() {
    // Display "Game Over =(" image on Canvas
    const gameOverImage = new Image();
    gameOverImage.src = "images/gameover.png";
    this.context.drawImage(gameOverImage, 400, 200);
  }

  /* 
  winner() - The method that should display "You Win!! =)".
  */
  winner() {
    // Display "You Win!! =)" image on Canvas
    const winnerImage = new Image();
    winnerImage.src = "images/awesome.png";
    this.context.drawImage(winnerImage, 400, 200);
  }
}
