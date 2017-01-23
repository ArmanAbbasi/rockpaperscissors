/**
 * @class
 * @name MusicControls
 * @param {String} musicPath Path to music file
 * @description All the music controls, like play, stop, volume controls
 * */
class MusicControls {
	constructor(musicPath = 'audio/bg_music.mp3') {
		this.musicFilePath = musicPath;
	}

	/**
	 * @function
	 * @name play
	 * @description Start background audio if it's supported by the browser
	 * */
	play() {
		if (window.Audio) {
			this.bgMusic = new Audio(this.musicFilePath);
			this.bgMusic.play();
			this.setVolume(0.05);
		}
	}

	/**
	 * @function
	 * @name stop
	 * @description Stop background audio if it's already playing
	 * */
	stop() {
		if (this.bgMusic) {
			this.bgMusic.pause();
		}
	}

	/**
	 * @function
	 * @name setVolume
	 * @param {Number} volume The volume, a value between 0 and 1.
	 * @description Set the volume of the audio
	 * */
	setVolume(volume = 0.1) {
		if (this.bgMusic) {
			this.bgMusic.volume = volume;
		}
	}
}

export default MusicControls;
