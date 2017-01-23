import utils from './utils';

/**
 * @class
 * @name Shield
 * @description Handles the shield that is displayed at start of game
 * */
class Shield {
	constructor() {
		this._shield = document.getElementById('shield');
	}

	/**
	 * @function
	 * @name hide
	 * @description Hide the shield, timer is required for animation reasons
	 * */
	hide() {
		utils.addClass(this._shield, 'transparent');
		setTimeout(() => {
			utils.addClass(this._shield, 'hidden');
		}, 500);
	}

	/**
	 * @function
	 * @name display
	 * @description Display the shield, timer is required for animation reasons
	 * */
	display() {
		utils.removeClass(this._shield, 'hidden');
		setTimeout(() => {
			utils.removeClass(this._shield, 'transparent');
		}, 0);
	}
}

export default Shield;
