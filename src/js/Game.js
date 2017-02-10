import utils from './utils';
import store from './store';
import aria from './aria';

/**
 * @class
 * @name Game
 * @description Sets up Game and its components.
 * */
class Game {
    constructor() {
        this.pcVsPc = null;
        this.player1 = document.getElementById('player1');
        this.player2 = document.getElementById('player2');

        store.getShapes((resp) => {
            this.attackMovesArr = resp;
            this.init();
        });
    }

    /**
     * @function
     * @name displayPlayerAttackMove
     * @param {String} playerId Id of player attacking
     * @param {String} type Type of attack
     * @description Display the attack chosen by given player
     * */
    displayPlayerAttackMove(playerId = 'player1', type) {
        utils.addClass(this[playerId], type);
    }

    /**
     * @function
     * @name reset
     * @description Reset the game
     * */
    reset() {
        this.clearAttackMoveIcons();
        this.clearScores();
        utils.removeClass(document.getElementById('game'), 'hidden');
        aria.updateAriaLiveUpdate('Game was reset.');
    }

    /**
     * @function
     * @name clearAttackMoveIcons
     * @description Clear attack images from view
     * */
    clearAttackMoveIcons() {
        utils.removeClass(this.player1, 'rock', 'paper', 'scissors');
        utils.removeClass(this.player2, 'rock', 'paper', 'scissors');
    }

    /**
     * @function
     * @name getComputerAttackChoice
     * @returns {Object} The attack details
     * @description Get a randomized attack for the PC
     * */
    getComputerAttackChoice() {
        const randomIdx = ~~(Math.random() * this.attackMovesArr.length);
        return this.attackMovesArr[randomIdx];
    }

    /**
     * @function
     * @name startPcVsPcGame
     * @description Initiate a PC vs PC game, with a 1 sec delay between each move
     * */
    startPcVsPcGame() {
        if (this.pcVsPc) {
            this.stopPcVsPcGame();
        }

        this.pcVsPc = setInterval(() => {
            this.setPlayerAttackChoice(this.getComputerAttackChoice());
        }, 2000);
    }

    /**
     * @function
     * @name stopPcVsPcGame
     * @description Stop any active PC vs PC game
     * */
    stopPcVsPcGame() {
        clearInterval(this.pcVsPc);
        this.clearScores();
        this.clearAttackMoveIcons();
    }

    /**
     * @function
     * @name decideWinnerAndScore
     * @param {Object} player1 The first player attack details
     * @param {Object} player2 The second player attack details
     * @description Given the details of two attackers, decide which is the winner
     * */
    decideWinnerAndScore(player1, player2) {
        if (player1.name === player2.name) {
            aria.updateAriaLiveUpdate(`${player1.name} doesn't beat ${player2.name}, You tied!`);
            return undefined;
        }

        if (player1.beats === player2.name) {
            store.incrementPlayer1Score();
            aria.updateAriaLiveUpdate(`${player1.name} beats ${player2.name}, You win!`);
        } else {
            store.incrementPlayer2Score();
            aria.updateAriaLiveUpdate(`${player2.name} beats ${player1.name}, You lose!`);
        }

        this.updateScores();
    }

    /**
     * @function
     * @name updateScores
     * @description Updates scores in view
     * */
    updateScores() {
        const score1El = document.getElementById('score1');
        const score2El = document.getElementById('score2');

        score1El.textContent = store.getPlayer1Score();
        score2El.textContent = store.getPlayer2Score();
    }

    /**
     * @function
     * @name setPlayerAttackChoice
     * @param {Object} attachMovePlayer1 The first player attack details
     * @description Set a first player attack move to trigger a counter attack by PC,
     * the 200ms delay makes it more pleasant.
     * */
    setPlayerAttackChoice(attachMovePlayer1) {
        const attachMovePlayer2 = this.getComputerAttackChoice();
        this.clearAttackMoveIcons();
        this.displayPlayerAttackMove('player1', attachMovePlayer1.name);

        setTimeout(() => {
            this.displayPlayerAttackMove('player2', attachMovePlayer2.name);
        }, 200);

        this.decideWinnerAndScore(attachMovePlayer1, attachMovePlayer2);
    }

    /**
     * @function
     * @name playerSelectedAttackMove
     * @param {Event} e User click event
     * @description Triggered when user click on an attack button
     * */
    playerSelectedAttackMove(e) {
        e.preventDefault();
        const target = e.currentTarget;
        const type = target.getAttribute('data-type');
        const chosenObj = this.attackMovesArr.filter((item) => {
            return type === item.name;
        });

        this.setPlayerAttackChoice(chosenObj[0]);
    }

    /**
     * @function
     * @name switchBetweenHumanAndComputerPlayer
     * @description Switch to PC vs PC or Human vs PC gaming
     * */
    switchBetweenHumanAndComputerPlayer() {
        const toggleBtn = document.getElementById('switchPlayers');
        let isCurrentPlayerHuman = store.setIsCurrentlyHumanPlayer(!store.getIsCurrentlyHumanPlayer());

        utils.toggleClass(toggleBtn, 'human');
        toggleBtn.setAttribute('aria-label', isCurrentPlayerHuman ? 'Switch to PC vs PC game' : 'Switch to You vs PC game');

        if (isCurrentPlayerHuman) {
            this.stopPcVsPcGame();
            aria.updateAriaLiveUpdate('You vs PC mode on.');
        } else {
            this.clearScores();
            this.clearAttackMoveIcons();
            this.startPcVsPcGame();
            aria.updateAriaLiveUpdate('PC vs PC mode on.');
        }

        this.togglePlayerControlsVisibility();
    }

    /**
     * @function
     * @name addPlayerControlsToView
     * @description Parse and bind the attach buttons in view
     * */
    addPlayerControlsToView(container) {
        this.attackMovesArr.forEach((item) => {
            const btn = document.createElement('button');
            utils.addClass(btn, 'btn');
            btn.setAttribute('data-type', item.name);
            btn.setAttribute('aria-label', item.name);
            btn.innerHTML = `<img class="small" src="${item.imagePath}" alt="" />`;
            btn.addEventListener('click', this.playerSelectedAttackMove.bind(this));
            container.appendChild(btn);
        });
    }

    /**
     * @function
     * @name clearScores
     * @description Clear any scores from view
     * */
    clearScores() {
        const score1El = document.getElementById('score1');
        const score2El = document.getElementById('score2');

        score1El.textContent = store.setPlayer1Score(0);
        score2El.textContent = store.setPlayer2Score(0);
    }

    /**
     * @function
     * @name togglePlayerControlsVisibility
     * @description Toggle visibility of attack move buttons from view
     * */
    togglePlayerControlsVisibility() {
        const controls = document.getElementById('controls');

        utils.toggleClass(controls, 'hidden');
    }

    /**
     * @function
     * @name init
     * @description Initialises controls once data is received
     * */
    init() {
        this.addPlayerControlsToView(document.getElementById('controls'));
    }
}

export default Game;
