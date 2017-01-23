/**
 * @description Utility functions
 * */
export default {
	/**
	 * @function
	 * @name xhrGet
	 * @params {String} url The URL to call for the GET request
	 * @params {Function} callback Function to call upon successful response
	 * @returns {XMLHttpRequest} The http GET request
	 * @description A simple GET helper, so we can get that JSON file.
	 * */
	xhrGet: (url, callback) => {
		if (!url || typeof url !== 'string') {
			throw new TypeError('{String} url is a required argument');
		}

		const http = new XMLHttpRequest();

		http.open('GET', url, true);
		http.setRequestHeader('Content-Type', 'application/json');
		http.onreadystatechange = () => {
			if (http.readyState === 4 && http.status === 200 && callback) {
				const resp = JSON.parse(http.responseText);
				callback(resp);
			}
		};

		http.send();

		return http;
	},
	/**
	 * @function
	 * @name addClass
	 * @params {Element} target The element on which className should be changed
	 * @params {String} className The className to add
	 * @description Given an Element and a className, it will add the className to the Element
	 * */
	addClass: (target, className) => {
		if (!target || !className) {
			throw new TypeError('Not all required arguments defined: ', arguments);
		}

		const expression = new RegExp('(?:^|\\s)' + className + '(?=\\s|$)');

		if (target instanceof HTMLCollection || target instanceof NodeList) {
			for (let i = 0, n = target.length; i < n; i += 1) {
				if (!expression.exec(target[i].className)) {
					target[i].className += (' ' + className);
				}
			}
		} else if (!expression.exec(target.className)) {
			target.className += (' ' + className);
		}

		return target;
	},
	/**
	 * @function
	 * @name toggleClass
	 * @params {Element} target The Element on which className should be changed
	 * @params {String} className The className to toggle on the Element
	 * @description Given an Element and a className, it will be toggled (added/removed)
	 * */
	toggleClass: (target, className) => {
		if (!target || !className) {
			throw new TypeError('Not all required arguments defined: ', arguments);
		}

		const expression = new RegExp('(?:^|\\s)' + className + '(?=\\s|$)');

		if (target instanceof HTMLCollection || target instanceof NodeList) {
			for (let i = 0, n = target.length; i < n; i += 1) {
				if (expression.exec(target[i].className)) {
					target[i].className = target[i].className.replace(expression, '');
				} else {
					target[i].className += (' ' + className);
				}
			}
		} else if (expression.exec(target.className)) {
			target.className = target.className.replace(expression, '');
		} else {
			target.className += (' ' + className);
		}

		return target;
	},
	/**
	 * @function
	 * @name removeClass
	 * @params {Element} target The Element on which className should be changed
	 * @params {String} classNames The className to remove from the Element
	 * @description Given an Element and a className, it will remove it from the Element
	 * */
	removeClass: (target, ...classNames) => {
		if (!target || !classNames) {
			throw new TypeError('Not all required arguments defined: ', arguments);
		}

		classNames.forEach((className) => {
			const expression = new RegExp('(?:^|\\s)' + className + '(?=\\s|$)');

			if (target instanceof HTMLCollection || target instanceof NodeList) {
				for (let i = 0, n = target.length; i < n; i += 1) {
					if (expression.exec(target[i].className)) {
						target[i].className = target[i].className.replace(expression, '');
					}
				}
			} else if (expression.exec(target.className)) {
				target.className = target.className.replace(expression, '');
			}
		});

		return target;
	}
};
