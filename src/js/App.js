import MusicControls from './MusicControls';
import Shield from './Shield';
import Game from './Game';
import store from './store';
import utils from './utils';
import aria from './aria';

import '../css/main.scss';

/**
 * @class
 * @name Main
 * @description The entry point for this game, initialises Controls, Menu, Game and binds events
 * */
class Main {
	constructor() {
		this._musicControls = new MusicControls();
		this._shield = new Shield();
		this._game = new Game();

		if (store.getIsMusicEnabled()) {
			this._musicControls.play();
		}

		window.addEventListener('DOMContentLoaded', this.bindEvents.bind(this))
	}

	/**
	 * @function
	 * @name startGame
	 * @description Prepare a fresh game
	 * */
	startGame() {
		this._game.reset();
		this._shield.hide();
		aria.updateAriaLiveUpdate('Started game');
	}

	/**
	 * @function
	 * @name resetGame
	 * @description Reset the score and start over in the same game
	 * */
	resetGame() {
		this._game.reset();
		aria.updateAriaLiveUpdate('Reset game');
	}

	/**
	 * @function
	 * @name toggleHumanPcPlayer
	 * @description Toggle between Human vs PC and PC vs PC
	 * */
	toggleHumanPcPlayer() {
		this._game.switchBetweenHumanAndComputerPlayer();
	}

	/**
	 * @function
	 * @name toggleMusic
	 * @description Toggle on/off of background audio
	 * */
	toggleMusic(e) {
		store.setIsMusicEnabled(!store.getIsMusicEnabled());

		if (store.getIsMusicEnabled()) {
			this._musicControls.play();
			aria.updateAriaLiveUpdate('Playing background music');
		} else {
			this._musicControls.stop();
			aria.updateAriaLiveUpdate('Muted background music');
		}

		utils.toggleClass(e.currentTarget, 'unmute');
	}

	/**
	 * @function
	 * @name bindEvents
	 * @description Binds all relevant click events
	 * */
	bindEvents() {
		const startGameBtn = document.getElementById('startGame');
		const toggleCpuBtn = document.getElementById('switchPlayers');
		const resetBtn = document.getElementById('reset');
		const toggleMusicBtn = document.getElementById('toggleMusic');

		startGameBtn.addEventListener('click', this.startGame.bind(this));
		resetBtn.addEventListener('click', this.resetGame.bind(this));
		toggleCpuBtn.addEventListener('click', this.toggleHumanPcPlayer.bind(this));
		toggleMusicBtn.addEventListener('click', this.toggleMusic.bind(this));
	}
}

new Main();
