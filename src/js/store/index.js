import utils from './../utils';

let state = {
    isCurrentlyHumanPlayer: true,
    player1Score: 0,
    player2Score: 0,
    isMusicEnabled: true
};

/**
 * @description A simple store
 * */
export default {
    /**
     * @function
     * @name getShapes
     * @param {Function} callback This will be called when data has been received successfully
     * @returns {XMLHttpRequest} The http GET request
     * @description Get all the attack move shapes
     * */
    getShapes: (callback) => {
        if (typeof callback !== 'function') {
            throw new TypeError('Function argument expected');
        }
        const shapesPath = '/data/shapes.json';
        return utils.xhrGet(shapesPath, callback);
    },

    /**
     * @function
     * @name getIsCurrentlyHumanPlayer
     * @returns {Boolean} Whether current player is human
     * @description Is this currently a Human vs PC player or not
     * */
    getIsCurrentlyHumanPlayer: () => {
        return state.isCurrentlyHumanPlayer;
    },

    /**
     * @function
     * @name setIsCurrentlyHumanPlayer
     * @param {Boolean} isHuman Is this a human vs PC player
     * @returns {Boolean} Is this a human vs PC player
     * @description Set state for whether this is a Human vs PC or not
     * */
    setIsCurrentlyHumanPlayer: (isHuman) => {
        if (typeof isHuman !== 'boolean') {
            throw new TypeError('Boolean argument expected');
        }
        state.isCurrentlyHumanPlayer = isHuman;
        return state.isCurrentlyHumanPlayer;
    },

    /**
     * @function
     * @name incrementPlayer1Score
     * @description Increment player 1's score
     * */
    incrementPlayer1Score: () => {
        state.player1Score += 1;
    },

    /**
     * @function
     * @name incrementPlayer2Score
     * @description Increment player 2's score
     * */
    incrementPlayer2Score: () => {
        state.player2Score += 1;
    },

    /**
     * @function
     * @name getPlayer1Score
     * @returns {Number} Player 1's score
     * @description Get player 1's score
     * */
    getPlayer1Score: () => {
        return state.player1Score;
    },

    /**
     * @function
     * @name getPlayer2Score
     * @returns {Number} Player 2's score
     * @description Get player 2's score
     * */
    getPlayer2Score: () => {
        return state.player2Score;
    },

    /**
     * @function
     * @name setPlayer1Score
     * @param {Number} score The new score value to set
     * @returns {Number} The new score value
     * @description Set a new score for player 1
     * */
    setPlayer1Score: (score) => {
        if (typeof score !== 'number') {
            throw new TypeError('Number argument expected');
        }
        state.player1Score = score;
        return state.player1Score;
    },

    /**
     * @function
     * @name setPlayer2Score
     * @param {Number} score The new score value to set
     * @returns {Number} The new score value
     * @description Set a new score for player 2
     * */
    setPlayer2Score: (score) => {
        if (typeof score !== 'number') {
            throw new TypeError('Number argument expected');
        }
        state.player2Score = score;
        return state.player2Score;
    },

    /**
     * @function
     * @name getIsMusicEnabled
     * @returns {Boolean} Whether music is enabled
     * @description Check if music is currently enabled
     * */
    getIsMusicEnabled: () => {
        return state.isMusicEnabled;
    },

    /**
     * @function
     * @name setIsMusicEnabled
     * @param {Boolean} val Is music enabled?
     * @returns {Boolean} Whether music is enabled
     * @description Set whether music is currently enabled
     * */
    setIsMusicEnabled: (val) => {
        if (typeof val !== 'boolean') {
            throw new TypeError('Number argument expected');
        }
        state.isMusicEnabled = val;
        return state.isMusicEnabled;
    }
};
