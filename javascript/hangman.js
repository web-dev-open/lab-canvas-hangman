class Hangman {
    constructor(words) {
        this.words = words;
        // ... your code goes here
        this.secretWord = this.pickWord();
        this.letters = [];
        this.guessedLetters = '';
        this.errorsLeft = 10;
    }

    pickWord() {
        // ... your code goes here
        return this.words[Math.floor(Math.random() * this.words.length)];

    }

    checkIfLetter(keyCode) {
        // ... your code goes here
        return (keyCode >= 65 && keyCode <= 90);
    }

    checkClickedLetters(letter) {
        // ... your code goes here
        return !this.letters.includes(letter);
    }

    addCorrectLetter(letter) {
        // ... your code goes here
        this.letters.push(letter);
        this.guessedLetters += letter;

    }

    addWrongLetter(letter) {
        // ... your code goes here
        if (!this.letters.includes(letter)) {
            this.letters.push(letter);
            this.errorsLeft--;
        }
    }

    checkGameOver() {
        // ... your code goes here
        return this.errorsLeft <= 0;
    }

    checkWinner() {
        // ... your code goes here
        return this.secretWord.split('').every(char => this.guessedLetters.includes(char));
    }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
    startGameButton.addEventListener('click', event => {
        hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);

        // HINT (uncomment when start working on the canvas portion of the lab)
        hangman.secretWord = hangman.pickWord();
        hangmanCanvas = new HangmanCanvas(hangman.secretWord);

        // ... your code goes here
        hangmanCanvas.createBoard();


    });
}

document.addEventListener('keydown', (e) => {
    // React to user pressing a key
    const pressedKey = e.key.toLowerCase();
    if (hangman.checkIfLetter(pressedKey) && !hangman.checkClickedLetters(pressedKey)) {
        if (hangman.secretWord.includes(pressedKey)) {
            hangman.addCorrectLetter(pressedKey);
            hangmanCanvas.writeCorrectLetter(hangman.secretWord.indexOf(pressedKey));
            if (hangman.checkWinner()) {
                hangmanCanvas.winner();
            }
        } else {
            hangman.addWrongLetter(pressedKey);
            hangmanCanvas.writeWrongLetter(pressedKey, hangman.errorsLeft);
            if (hangman.checkGameOver()) {
                hangmanCanvas.gameOver();
            }
        }
    }
    // ... your code goes here

});