class HangmanCanvas {
    constructor(secretWord) {
        this.context = document.getElementById('hangman').getContext('2d');
        // ... your code goes here
        this.secretWord = secretWord;

    }

    createBoard() {
        // ... your code goes here
        if (this.secretWord) {
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            this.drawLines();
            const alphabet = 'abcdefghijklmnopqrstuvwxyz';

            const that = this; // Capture 'this' reference

            const handleKeyDown = function(event) {
                const pressedKey = event.key.toLowerCase();
                if (alphabet.includes(pressedKey)) {
                    if (hangman.checkClickedLetters(pressedKey)) {
                        if (hangman.secretWord.includes(pressedKey)) {
                            hangman.addCorrectLetter(pressedKey);
                            that.writeCorrectLetter(hangman.secretWord.indexOf(pressedKey)); // Use 'that' instead of 'this'
                            if (hangman.checkWinner()) {
                                that.winner(); // Use 'that' instead of 'this'
                            }
                        } else {
                            hangman.addWrongLetter(pressedKey);
                            that.writeWrongLetter(pressedKey, hangman.errorsLeft);
                            that.drawHangman(hangman.errorsLeft);
                            if (hangman.checkGameOver()) {
                                that.gameOver();
                            }
                        }
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);
        }
    }

    drawLines() {
        // ... your code goes here
        if (this.secretWord) {
            const wordLength = this.secretWord.length;
            const startX = 800;
            const startY = 500;
            const lineLength = 50;

            this.context.beginPath();
            this.context.lineWidth = 2;
            this.context.strokeStyle = 'black';

            for (let i = 0; i < wordLength; i++) {
                this.context.moveTo(startX + (i * lineLength + 10), startY);
                this.context.lineTo(startX + (i * lineLength) + lineLength, startY);
                this.context.stroke();
            }
            this.context.closePath();

        }
    }
    writeCorrectLetter(index) {
        // ... your code goes here
        const letter = this.secretWord[index];
        this.context.font = '40px Arial';
        this.context.fillStyle = 'black';
        let occurrences = this.secretWord.split(letter).length - 1;
        for (let i = 0; i < occurrences; i++) {
            this.context.fillText(letter, 815 + (index * 50) + (i * 50) + i * 50, 480);
        }
    }

    writeWrongLetter(letter, errorsLeft) {
        // ... your code goes here
        const startX = 800;
        const startY = 100;
        const step = 50;

        this.context.font = '30px Arial';
        this.context.fillStyle = 'red';
        this.context.fillText(letter, startX + (10 - errorsLeft) * step, startY);
    }

    drawHangman(errorsLeft) {
        // ... your code goes here
        const context = this.context;

        switch (errorsLeft) {
            case 9:
                // Base
                context.beginPath();
                context.moveTo(50, 700);
                context.lineTo(200, 700);
                context.stroke();
                context.closePath();
                break;
            case 8:
                // Vertical Pole
                context.beginPath();
                context.moveTo(125, 700);
                context.lineTo(125, 100);
                context.stroke();
                context.closePath();
                break;
            case 7:
                // Horizontal Pole
                context.beginPath();
                context.moveTo(125, 100);
                context.lineTo(300, 100);
                context.stroke();
                context.closePath();
                break;
            case 6:
                // Rope
                context.beginPath();
                context.moveTo(300, 100);
                context.lineTo(300, 150);
                context.stroke();
                context.closePath();
                break;
            case 5:
                // Head
                context.beginPath();
                context.arc(300, 175, 25, 0, Math.PI * 2);
                context.stroke();
                context.closePath();
                break;
            case 4:
                // Body
                context.beginPath();
                context.moveTo(300, 200);
                context.lineTo(300, 350);
                context.stroke();
                context.closePath();
                break;
            case 3:
                // Left Arm
                context.beginPath();
                context.moveTo(300, 225);
                context.lineTo(250, 275);
                context.stroke();
                context.closePath();
                break;
            case 2:
                // Right Arm
                context.beginPath();
                context.moveTo(300, 225);
                context.lineTo(350, 275);
                context.stroke();
                context.closePath();
                break;
            case 1:
                // Left Leg
                context.beginPath();
                context.moveTo(300, 350);
                context.lineTo(250, 400);
                context.stroke();
                context.closePath();
                break;
            case 0:
                // Right Leg
                context.beginPath();
                context.moveTo(300, 350);
                context.lineTo(350, 400);
                context.stroke();
                context.closePath();
                break;
            default:
                break;
        }
    }

    gameOver() {
        // ... your code goes here
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        const img = new Image();
        img.src = './images/gameover.png';
        img.onload = () => {
            this.context.drawImage(img, 300, 100, 600, 400);
        };
    }

    winner() {
        // ... your code goes here
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        const img = new Image();
        img.src = './images/awesome.png';
        img.onload = () => {
            this.context.drawImage(img, 300, 100, 600, 400);
        };
    }

}