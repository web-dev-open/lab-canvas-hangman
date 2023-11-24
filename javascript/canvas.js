// *******************************
// Iteration No. 2: Draw in Canvas
// *******************************

// Exporting the hangmanCanvas class
export class HangmanCanvas {
  constructor(secretWord) {
    // Getting the Canvas context
    this.context = document.getElementById("hangman").getContext("2d");

    // ... your code goes here
    // Storing the secred word
    this.secretWord = secretWord;
  }

  /* 
  createBoard() - Yhe method that should clear the canvas, so every time we start the game 
  we have a clean one. This method also should call the next one we will define, the drawLines().
  */
  createBoard() {
    // ... your code goes here
    // Clearing the Canvas for a new game
    this.context.clearRect(0, 0, 1200, 800);

    // Drawing the lines for each letter in the secret word
    this.drawLines();
  }

  /*
  drawLines() - the method that should draw one line for each letter of the secret word. 
  At this point we know the secret word the user has to guess.
  */
  drawLines() {
    // ... your code goes here
    // Draw line of each letter in the secret word
    for (let i = 0; i < this.secretWord.length; i++) {
      // Drawing a line for each letter, leave space between them
      this.context.beginPath();
      this.context.moveTo(400 + i * 50, 700);
      this.context.lineTo(450 + i * 50, 700);
      this.context.stroke();
      this.context.closePath();
    }
  }

  /*
  writeCorrectLetter(index) and writeWrongLetter(letter, errorsLeft) - the methods that should write 
  the letter on which the user has just clicked, on the appropriate part of the canvas. After checking 
  if the letter was not already clicked, we should write it on our board. If the secret word includes 
  the letter, we should write it in the position where it belongs, and if the letter is not included 
  in the secret word, we should write it on the top right corner, so that the user knows which letters 
  were already clicked.
  */
  writeCorrectLetter(index) {
    // ... your code goes here
    // Wirte the correct letter on the canvas in its right position
    const letter = this.secretWord[index];
    this.context.font = "30px Tahoma";
    this.context.fillText(letter, 400 + index * 50, 690);
  }

  writeWrongLetter(letter, errorsLeft) {
    // ... your code goes here
    // Writing the wrong letter and indicate it in the top right corner, indicated errors left
    const xOffset = 800 - errorsLeft * 30;
    const yOffset = 50;
    this.context.font = "30px Tahoma";
    this.context.fillText(letter, xOffset, yOffset);
  }

  /* 
  drawHangman(errorsLeft) - the method that should draw the hangman. You will see that the drawing is composed 
  of multiple lines and one circle. Go ahead and experiment, you will see it is pretty straightforward.
  */
  drawHangman(errorsLeft) {
    // ... your code goes here
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
        this.context.lineTo(150, 350);
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
        this.context.moveTo(150, 400);
        this.context.lineTo(100, 450);
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
        // Draw the righ foot
        this.context.beginPath();
        this.context.moveTo(200, 550);
        this.context.lineTo(250, 580);
        this.context.stroke();
        this.context.closePath();
        break;
      case 1:
        // Dreaw the left eye
        this.context.beginPath();
        this.context.arc(140, 190, 5, 0, Math.PI * 2);
        this.context.fillStyle = "blue";
        this.context.fill();
        this.context.closePath();
        break;
      case 0:
        // Draw the Righ eye
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

  gameOver() {
    // ... your code goes here
    // Display "Game Over =(" message on Canvas
    this.context.font = "40px Tahoma";
    this.context.fillText("Game Over =(", 500, 400);
  }

  winner() {
    // ... your code goes here
    // Displays "You Win!! =)"
    this.context.font = "40px Tahoma";
    this.context.fillText("You Win!! =)", 500, 400);
  }
}
