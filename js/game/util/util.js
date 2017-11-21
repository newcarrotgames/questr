/**
 * Arbitrary low level tasks helper
 */
var UTIL = {
	/**
	 * Returns number in hexadecimal format for web colors
	 * @param num Number to convert
	 * @param len String length to return (for zero padding)
	 * @returns {string}
	 */
	hex: function (num, len) {
		let str = Math.floor(num).toString(16);
		return ("0".repeat(len - str.length) + str)
			.toUpperCase();
	},

	/**
	 * Returns floored n / d
	 * @param n Numerator
	 * @param d Denominator
	 * @returns {number}
	 */
	div: function (n, d) {
		return Math.floor(n / d);
	},

	/**
	 * Generates a random number between 0 and max - 1
	 * @param max Maximum value to return
	 * @returns {number}
	 */
	rnd: function (max) {
		return Math.floor(
			Math.random() * max);
	},

	/**
	 * Generate a random number between -max and max
	 * @param max Maximum positive or negative value to return
	 * @returns {number}
	 */
	nrnd: function (max) {
		return Math.floor(Math.random() *
			(max * 2 + 1)) - max;
	},

	/**
	 * Generates a random number between max / 2 and max
	 * @param max Maximum value to return
	 * @returns {number}
	 */
	hrnd: function (max) {
		let hmax = max / 2;
		return Math.floor(
			Math.random() * hmax) + hmax;
	}
};