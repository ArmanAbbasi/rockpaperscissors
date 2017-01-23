export default {
	/**
	 * @function
	 * @name updateAriaLiveUpdate
	 * @param {String} text The text to be read by a screen reader
	 * @description Any text sent, will be read out load by a screen reader
	 * */
	updateAriaLiveUpdate(text) {
		if (typeof text !== 'string' || !text.length) { return; }
		let liveAlertEl = document.getElementById('ariaUpdate');

		if (!liveAlertEl) {
			const container = document.createElement('div');
			container.innerHTML = '<p id="ariaUpdate" role="alert" aria-live="polite" class="aria-live-region"></p>';
			liveAlertEl = container.firstChild;
			document.body.appendChild(container.firstChild);
		}

		setTimeout(() => {
			liveAlertEl.textContent = text;
		}, 100);
	}
}
