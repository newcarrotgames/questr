/**
 * Basic builder pattern implementation for Questr
 * @constructor Creates internal object to builder to modify and return?
 */
function Builder() {
	this.obj = {};
}

/**
 * Builder's prototype declaration
 * @type {{constructor: Builder, build: Builder.build}}
 */
Builder.prototype = {
	constructor: Builder,

	/**
	 * Calls finalize (if exists), resets and returns this builder's result
	 * TODO: finalize should create an object, Builder should build the type
	 * @returns {*}
	 */
	build: function() {
		if (this.finalize !== undefined)
			this.finalize();
		let _obj = this.obj;
		this.obj = {};
		return _obj;
	}
};