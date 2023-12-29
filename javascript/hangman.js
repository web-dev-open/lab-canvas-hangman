class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord=this.pickWord();
    this.letters=[];
    this.guessedLetters='';
    this.errorsLeft=10;
  }

  pickWord() {
  const randomIndex=Math.floor(Math.random()*this.words.length);
  return this.words[randomIndex];
  }

  checkIfLetter(keyCode) {
  return (keyCode>=65 && keyCode<=90) || (keyCode>=97 && keyCode<=122);
  }

  checkClickedLetters(letter) {
   return !this.letters.includes(letter);
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;

    if(this.checkWinner()){
      console.log('Congratulations! You won!');
    }
  }

  addWrongLetter(letter) {
    this.errorsLeft--;
    if(!this.letters.includes(letter)){
      this.letters.push(letter);
    }
    if(this.checkGameOver()){
      console.log('Game over! You lost. The word was:' +this.secretWord);

    }
  }

  checkGameOver() {
    return this.errorsLeft<=0;
  }

  checkWinner() {
    return this.guessedLetters.split('').every(letter=> this.secretWord.includes(letter));
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', event => {
    hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
  });
}

document.addEventListener('keydown', event => {
  const keyCode = event.keyCode;

  if (hangman.checkIfLetter(keyCode)) {
    const letter = String.fromCharCode(keyCode).toLowerCase();

    if (hangman.checkClickedLetters(letter)) {
      if (hangman.secretWord.includes(letter)) {
        hangman.addCorrectLetter(letter);

        const letterIndices = hangman.secretWord.split('').map((char, index) => char === letter ? index : -1).filter(index => index !== -1);
        letterIndices.forEach(index => hangmanCanvas.writeCorrectLetter(index));
      } else {
        hangman.addWrongLetter(letter);

        hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);

        hangmanCanvas.drawHangman(hangman.errorsLeft);
      }

      if (hangman.checkGameOver()) {
        hangmanCanvas.gameOver();
      } else if (hangman.checkWinner()) {
        hangmanCanvas.winner();
      }
    }
  }

});
