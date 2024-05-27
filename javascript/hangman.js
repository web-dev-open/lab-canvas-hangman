class Hangman {
  constructor(words) {
    this.words = words;
     this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;// ... your code goes here
  }

  pickWord() {
     const wlength = this.words.length;
    const index = Math.floor(Math.random()*wlength);
    const randomInd =  this.words[index];
    return randomInd;// ... your code goes here
  }

  checkIfLetter(keyCode) {
   
    if(keyCode >= 65 && keyCode <= 90){
      return true;
    }
    return false;
  } // ... your code goes here
  }

  checkClickedLetters(letter) {
    // ... your code goes here
    
    if(!this.letters.includes(letter)){
      return true;
    }
    return false;
  }// ... your code goes here
  }

  addCorrectLetter(letter) {
     this.guessedLetters += letter;
    if(this.checkWinner()){
      alert('You Won!');
      console.log('You Won!')
      return;
    }// ... your code goes here
  }

  addWrongLetter(letter) {
      this.errorsLeft--;
    if(!this.letters.includes('letter')){
      this.letters.push(letter);
    }
// ... your code goes here
  }

  checkGameOver() {
    if(this.errorsLeft === 0){
      return true;
    }
    return false;
   // ... your code goes here
  }

  checkWinner() {
    
    return (this.secretWord.split('').every(letter => this.guessedLetters.includes(letter)));
  // ... your code goes here
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    // HINT (uncomment when start working on the canvas portion of the lab)
    // hangman.secretWord = hangman.pickWord();
    // hangmanCanvas = new HangmanCanvas(hangman.secretWord);
 
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
    // ... your code goes here
  });
}

document.addEventListener('keydown', event => {
 
  if (!hangman.checkGameOver() && !hangman.checkWinner()) {
    if (hangman.checkIfLetter(e.which)) {
      if (hangman.checkClickedLetters(e.key)) {
        if (hangman.secretWord.includes(e.key)) {

          const indx = [];

          for(let i = 0; i < hangman.secretWord.length; i++) {
            if (hangman.secretWord[i] === e.key) indx.push(i);
          }

          indx.map(index => {
            hangman.addCorrectLetter(index);
            hangmanCanvas.writeCorrectLetter(index);
          })

        } else {
          // wrong letter
          hangman.addWrongLetter();
          hangmanCanvas.writeWrongLetter(e.key, hangman.errorsLeft);
          hangmanCanvas.drawHangman(hangmanCanvas.hangmanShape[10-hangman.errorsLeft])
        }

      } 
      else {
        alert('letter Repeated .Please enter new letter')
      }
    }
  } // React to user pressing a key
  // ... your code goes here
});
