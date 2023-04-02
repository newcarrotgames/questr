/**
 * Basic builder pattern implementation for Questr
 * @constructor Creates internal object to builder to modify and return?
 */
function Builder() {
	this.obj = {};
}

/**
 * Builds builder?
 * @returns {*}
 */
Builder.prototype.build = function() {
	if (this.finalize !== undefined)
		this.finalize();
	let _obj = this.obj;
	this.obj = {};
	return _obj;
};