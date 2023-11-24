// Importing the canvas.js
import { HangmanCanvas } from "./canvas.js";

// *******************************
// Iteration No. 1: The Game Logic
// *******************************

/* 
Creating the Handman class
The Hangman class has a constructor method and it expects an array of words as the single parameter.
*/
class Hangman {
  constructor(words) {
    // words - an array to store all the words that could be given to a player to guess.
    this.words = words;

    // secretWord - Stores the word that has been picked as a secret word for the current game.
    // Every time a new game starts, a random word from the this.words array needs to be picked as the secret word.
    this.secretWord = this.pickWord();

    // letters - an array in which we will store the letters that the user has already picked while trying to guess the secret word.
    this.letters = [];

    // guessedLetters - A string to store the letters user chose and guessed.
    // We will use this to know when the user has won.
    this.guessedLetters = "";

    // errorsLeft - The initial/start value should be 10,
    // and it should decrease every time a user picks a letter that doesn't appear in the word they need to guess.
    this.errorsLeft = 10;
  }

  // pickWord() - A method that returns a random word from the array of words.
  pickWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  /* 
    checkIfLetter(keyCode) - A method that returns true or false depending on the keyCode of the 
    key pressed by the user: if the keyCode corresponds to a character from a-z, it should return 
    true, otherwise, it should return false.
    */
  checkIfLetter(keyCode) {
    // If the keyCode corresponds to a character from a-z, return true, otherwise, return false.
    return (
      (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)
    );
  }

  /* 
    checkClickedLetters(letter) - A method that should check if the letter passed as an argument has already been pressed. 
    It should return true if it was not or false in the opposite case.
    */
  checkClickedLetters(letter) {
    // Check if the letter has already been pressed. Return true if it was not, false otherwise.
    return !this.letters.includes(letter);
  }

  /* 
    addCorrectLetter(letter) - A method that should add the passed letter to the guessedLetters property. 
    This could be a good place to check if the user won.
    */
  addCorrectLetter(letter) {
    // Add the letter to the guessedLetters property.
    this.guessedLetters += letter;
    // Check if the user won.
    return this.checkWinner();
  }

  /* 
    addWrongLetter(letter) - A method that should subtract one from the variable errorsLeft. 
    It also should push this letter in the array of letters if the letter is not there already.
    */
  addWrongLetter(letter) {
    // If the letter is not part of the secret word, subtract one from errorsLeft
    // and push the letter to the array of letters.
    if (!this.secretWord.includes(letter)) {
      this.errorsLeft--;
      this.letters.push(letter);
    }
    // Check if the game is over.
    return this.checkGameOver();
  }

  /* 
    checkGameOver() - A method that checks if the user has any errors left. 
    If the number of errors is greater than 0, the method should return false (the game continues). 
    In the opposite case, if there are no more errors left, the method should return true.
    */
  checkGameOver() {
    // Check if the user has any errors left. Return false if the number of errors is greater than 0, true otherwise.
    return this.errorsLeft <= 0;
  }

  // checkWinner() - A method that should check if the user won and return the corresponding boolean value.
  checkWinner() {
    // Check if the user won by comparing the secret word letters with the guessed letters.
    return this.secretWord
      .split("")
      .every((letter) => this.guessedLetters.includes(letter));
  }
}

// Creating the variable to make this work
let hangman;
let hangmanCanvas;

const startGameButton = document.getElementById("start-game-button");

if (startGameButton) {
  startGameButton.addEventListener("click", (event) => {
    console.log("Button clicked");
    // Initialize Hangman and HangmanCanvas
    hangman = new Hangman([
      "node",
      "javascript",
      "react",
      "miami",
      "paris",
      "amsterdam",
      "lisboa",
      "Guadalajara",
      "Goku",
    ]);
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    // Create the method to call the canvas
    hangmanCanvas.createBoard();
    console.log("If you see me, the game has started.");
  });
}

document.addEventListener("keydown", (event) => {
  // React to user pressing a key
  // ... (your existing code)

  // Check if the game has started - if the object exists
  if (hangman) {
    // Getting the key pressed
    const keyCode = event.keyCode;

    // convert the entered letter into lowercase
    const letter = String.fromCharCode(keyCode).toLocaleLowerCase();

    // Check if the pressed key is a valid letter and hasn't guessed.
    if (hangman.checkIfLetter(keyCode) && hangman.checkClickedLetters(letter)) {
      // Check if that letter is part of the secret word
      if (hangman.secretWord.includes(letter)) {
        // If the correct letter is added, check if the player won
        if (hangman.addCorrectLetter(letter)) {
          console.log("You won!!");
          hangmanCanvas.winner(); // Display "You Win!! =)" image
        } else {
          hangmanCanvas.writeCorrectLetter(
            hangman.guessedLetters.indexOf(letter)
          ); // Update the correct letter on the canvas
        }
      } else {
        // If the wrong letter is added, check if the player has lost
        if (hangman.addWrongLetter(letter)) {
          console.log("Game Over =(");
          hangmanCanvas.gameOver(); // Display "Game Over =(" image
        } else {
          hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft + 1); // Update the wrong letter on the canvas
          hangmanCanvas.drawHangman(hangman.errorsLeft); // Draw the hangman
        }
      }

      // Updating the current gaming status
      console.log("Guessed Letters: ", hangman.guessedLetters);
      console.log("Errors left: ", hangman.errorsLeft);

      // Draw the hearts on the canvas
      hangmanCanvas.drawHearts(hangman.errorsLeft);
    }
  }
});
