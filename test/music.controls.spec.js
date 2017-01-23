import { assert } from 'chai';
import MusicControls from '../src/js/MusicControls';

describe('MusicControls', () => {
	const musicControls = new MusicControls('/base/test/audio/bg_music.mp3');

	it('exports a constructor function before being initialised with new operator', () => {
		assert(MusicControls instanceof Function, 'MusicControls doesn\'t return constructor function');
	});

	it('created an instance when initialised with new operator', () => {
		assert(musicControls instanceof Object, 'Instance not created');
	});

	it('has a function to play the audio', () => {
		assert(musicControls.play instanceof Function, 'Play function not declared');
	});

	it('creates an Audio instance when play() called', (done) => {
		musicControls.play();
		assert(musicControls.bgMusic instanceof window.Audio, 'Audio instance not created');

		musicControls.bgMusic.addEventListener('durationchange', () => {
			assert(musicControls.bgMusic.duration === Infinity, 'Audio is playing');
			done();
		});
	});

	it('starts with expected volume', () => {
		musicControls.play();
		assert(musicControls.bgMusic.volume === 0.05, 'Not correct starting volume');
	});

	it('can change volume', () => {
		musicControls.play();
		assert(musicControls.setVolume instanceof Function, 'setVolume function not declared');
		musicControls.setVolume(0);
		assert(musicControls.bgMusic.volume === 0, 'Volume not changed');
	});

	it('can stop the audio', (done) => {
		musicControls.play();
		assert(!musicControls.bgMusic.paused, 'Audio is not playing, after calling play()');
		assert(musicControls.stop instanceof Function, 'stop() function not declared');

		setTimeout(() => {
			musicControls.stop();
			assert(musicControls.bgMusic.paused, 'Audio is not stop, after calling stop()');
			done();
		}, 500);
	});
});
