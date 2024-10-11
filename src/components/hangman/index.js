/**
* Hangman in Vanilla Javascript
* @see https://github.com/jelofsson/hangman-js
* @author jelofsson
**/

var Hangman = function () {
    'use strict';

    /**
     * Constructor
     * @param {string} elId An ID used in this class and when rendering the DOM Elements
     */
    function Hangman(elId) {
        // DOM is ready
        this.elId = elId;
        // Possible words
        this.words      = [
            'PROGRAMMER', 'BRAINSTORM', 'CREATIVE', 'LOLLIPOP',
            'CULTURE', 'RAZORSHARP', 'SCREWDRIVER', 'TYPEWRITER'
        ];
        
        //Valor que necesito cambiar segun si es verdad o falso
        this.palabraGuardada = null;
    }

    /**
     * Resets the hangman game
     */
    Hangman.prototype.reset = function () {
        // Variables
        this.STOPPED        = false;
        this.MISTAKES       = 0;
        this.GUESSES        = [];
        // Select a random word from the list
        this.WORD           = this.words[Math.floor(Math.random() * this.words.length)];
        // DOM Elements
        this.hideElementByClass('h');
        this.showElementByIdWithContent(this.elId + "_guessbox", null);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());


        //this.WORD en esta variable se encuentra la frase seleccionada

        //Llamando funcion para agregar botones con letras random
        this.randomLetterForHangman()
    };

    /**
     * Logic after the user guessed on a letter
     *
     * @param {char} letter A letter guessed by our enduser
     */
    Hangman.prototype.guess = function (letter) {
        letter = letter.charAt(0).toUpperCase();

        // Check if game is stopped or the user already guessed on that letter
        if (this.STOPPED || this.GUESSES.indexOf(letter) > -1) {
            // Then we wont do anything
            return;
        }

        // Add the letter to our GUESSES array
        this.GUESSES.push(letter);
        // Update the word hint, and guessed letter list for the user
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
        this.showElementByIdWithContent(this.elId + "_guesses", this.GUESSES.join(''));

        this.palabraGuardada = this.WORD.indexOf(letter);
        // Check if our word does not contain the guessed letter
        if (this.WORD.indexOf(letter) < 0) {
            // Incorrect guess, increase our mistakes by one
            this.MISTAKES++;
            // Show next part of hangman character
            this.showElementByIdWithContent(this.elId + "_" + this.MISTAKES, null);

            //Me envia si la letra es correcta o incorrecta para poder cambiar color
            this.palabraGuardada = this.WORD.indexOf(letter);
            // Check if its Game Over
            if (this.MISTAKES === 3) {
                //this.showElementByIdWithContent(this.elId + "_end", "GAME OVER!<br/>The word was: " + this.WORD);
                document.getElementById("winner-hangman").innerText = "Perdiste"
                this.STOPPED = true;
            }
        } else if (this.WORD.indexOf(this.getGuessedfWord()) !== -1) {
            // Victory condition
            this.showElementByIdWithContent(this.elId + "_end", "You made it!<br/>The word was: " + this.WORD);
            alert("kalsndlkasndlk")
            document.getElementById("winner-hangman").innerText = "Lo Lograste!"
            this.STOPPED = true;
        }
    };
    Hangman.prototype.responseLetter = function() {
        return this.palabraGuardada;
    }
    Hangman.prototype.randomLetterForHangman = function (){

        //Mi codigo
        const letras = this.WORD.split("");
        // Letras aleatorias a agregar
        const letrasAleatorias = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        // Mezclar las letras aleatorias
        for (let i = letrasAleatorias.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 5));
            [letrasAleatorias[i], letrasAleatorias[j]] = [letrasAleatorias[j], letrasAleatorias[i]];
        }

        // Agregar las letras aleatorias a la palabra
        let palabraConLetrasAleatorias = [];
        for (let i = 0; i < letras.length; i++) {
            // Agregar una letra aleatoria cada 2 letras de la palabra
            if (i % 2 === 0 && letrasAleatorias.length > 0) {
                palabraConLetrasAleatorias.push(letrasAleatorias.pop());
            }
            palabraConLetrasAleatorias.push(letras[i]);
        }
        //this.phraseRandom = palabraConLetrasAleatorias;

        const containerLetter = document.querySelector("#letterAll");
        containerLetter.innerHTML = "";
        for(let i = 0; i < palabraConLetrasAleatorias.length; i++){
            containerLetter.insertAdjacentHTML('beforeend', `
                <button class="flex-1 text-2xl bg-azulBrillante3 text-backgroundAzulOscuro font-bold px-2" id="handleLetterRandom_${i}">${palabraConLetrasAleatorias[i] || "L"}</button>`)
        }
    }

    /**
     * Displays HTML element by id with the following content
     *
     * @param {string} elId     DOM ID
     * @param {HTML} content 
     */
    Hangman.prototype.showElementByIdWithContent = function (elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    };

    /**
     * Hides element by class
     *
     * @param {string} elClass DOM class
     */
    Hangman.prototype.hideElementByClass = function (elClass) {
        var elements = document.getElementsByClassName(elClass), i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    };

    /**
     * The word but only with letters the user has guessed so far is visible
     */
    Hangman.prototype.getGuessedfWord = function () {
        var result = "", i;
        for (i = 0; i < this.WORD.length; i++) {
            // Word characters
            result += (this.GUESSES.indexOf(this.WORD[i]) > -1) ?
                    `<span class="phraseSelect">${this.WORD[i]}</span>` : `<span class="phraseSelect px-4"></span>`;
        }

        return result;
    };

    /*document.querySelector("#handleLetterRandom").onClick = function(){
        this.inputLetterRandom()
    }*/

    // Create and return an instance of this class, its go time!
    return new Hangman('hangm');

}

export default Hangman