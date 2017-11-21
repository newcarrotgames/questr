/**
 * World builder object starting with dimensions
 * @constructor
 */
function WorldBuilder() {
	var world = {};

	this.withDimensions = function(width, height, depth) {
		world.width = width;
		world.height = height;
		world.depth = depth;
		return this;
	};

	this.build = function() {
		let tmp = world;
		world = {};
		return tmp;
	};

	this.runBuilder = function (builder) {
		builder.build(this);
	};
}