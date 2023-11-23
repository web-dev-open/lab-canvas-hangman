// *******************************
// Iteration No. 1: The Game Logic
// *******************************

/* Creating the Handman class
   The Hangman class has constructor method and it expects an array of words as the single parameter.
*/
class Hangman {
  constructor(words) {
    // words - an array to store all the words that could be given to a player to guess.
    this.words = words;

    // ... your code goes here
    /*
      secretWord
      Stores the word that has been picked as a secret word for the current game. Every time a new game starts, 
      a random word from the this.words array needs to be picked as the secret word to be guessed by the player. 
      That is, when the class is instantiated, call the method pickWord() and save the result to the property secretWord.
    */
    this.secretWord = this.pickWord();

    // letters - an array in which we will store the letters that the user has already picked while trying to guess the secret word.
    this.letters = [];

    /*
    guessedLetters 
    A string to store the letters user chose and guessed. We will use this to know when the user has won.
    */
    this.guessedLetters = "";

    /*
    errorsLeft 
    The initial/start value should be 10, and it should decrease every time a user picks a letter that doesn't 
    appear in the word they need to guess.
    */
    this.errorsLeft = 10;
  }

  // pickWord() - A method that returns a random word from the array of words.
  pickWord() {
    // ... your code goes here
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  /*
  checkIfLetter(keyCode) - A method that returns true or false depending on the keyCode of the 
  key pressed by the user: if the keyCode corresponds to a character from a-z, it should return 
  true, otherwise, it should return false. You can use keycode.info (shttps://www.toptal.com/developers/keycode) 
  to find out which codes refer to each key.
  */
  checkIfLetter(keyCode) {
    // ... your code goes here
    // If letter is greater than 'a' and less than 'z'
    return (
      (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)
    );
  }

  /*
  checkClickedLetters(letter) - A method that should check if the letter passed as an argument has already been pressed. 
  It should return true if it was not or false in the opposite case.
  */
  checkClickedLetters(letter) {
    // ... your code goes here
    return !this.letters.includes(letter);
  }

  /*
  addCorrectLetter(letter) - A method that should add the passed letter to the guessedLetters property. 
  This could be a good place to check if the user won.
  */
  addCorrectLetter(letter) {
    // ... your code goes here
    this.guessedLetters += letter;
    return this.checkWinner;
  }

  /*
  addWrongLetter(letter) - A method that should subtract one from the variable errorsLeft. 
  It also should push this letter in the array of letters if the letter is not there already.
  */
  addWrongLetter(letter) {
    // ... your code goes here
    if (!this.secretWord.includes(letter)) {
      this.errorsLeft--;
      this.letters.push(letter);
    }
    return this.checkGameOver();
  }

  /*
  checkGameOver() - A method that checks if the user has any errors left. If the number of errors is greater than 0, 
  the method should return false (the game continues). In opposite case, if there is no more errors 
  left, the method should return true.
  */
  checkGameOver() {
    // ... your code goes here
    return this.errorsLeft <= 0;
  }

  // checkWinner() - A method that should check if the user won and return the corresponding boolean value.
  checkWinner() {
    // ... your code goes here
    return this.secretWord
      .split("")
      .every((letter) => this.guessedLetters.includes(this.letters));
  }
}

let hangman;

const startGameButton = document.getElementById("start-game-button");

if (startGameButton) {
  startGameButton.addEventListener("click", (event) => {
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

    // HINT (uncomment when start working on the canvas portion of the lab)
    // hangman.secretWord = hangman.pickWord();
    // hangmanCanvas = new HangmanCanvas(hangman.secretWord);

    // ... your code goes here
  });
}

document.addEventListener("keydown", (event) => {
  // React to user pressing a key
  // ... your code goes here
  // Check if the game has started - if the object exist
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
        }
      } else {
        // If the wrong letter is added, check if the player has lost
        if (hangman.addWrongLetter(letter)) {
          console.log("Game Over =(");
        }
      }

      // Updating the curreng gaming status
      console.log("Guessed Letters: ", hangman.guessedLetters);
      console.log("Errors left: ", hangman.errorsLeft);
    }
  }
});
