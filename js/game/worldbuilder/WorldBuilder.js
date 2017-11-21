/**
 * Main world builder object. Contains world game data and runs builders on that data.
 * TODO: should builders create types or objects?
 * @constructor
 */
function WorldBuilder() {
	Builder.call(this);
	this.obj.data = [];

	// this will create a runMethod for each world,
	// but there should be only one method in obj's prototype
	this.obj.runGenerator = function (generator) {
		generator.generate(this);
	};

	this.obj.render = function (ctx, view) {
		UTIL.forYX(this.height, this.width, function(x, y) {
			let offX = x + view.x;
			let offY = y + view.y;
			if (!UTIL.inside(
					[offX, offY],
					[0, 0, this.height, this.width]))
				return;
			let w = this.data[offY][offX];
			if (w.height < this.seaLevel) {
				color = "#0000" + UTIL.hex(Math.floor(w.height / 5) + 128, 2);
			} else {
				color = "#00" + UTIL.hex(w.height, 2) + "00";
			}
			ctx.fillStyle = color;
			ctx.fillRect(
				x * view.size,
				y * view.size,
				view.size,
				view.size);
		}.bind(this));
	};
}

WorldBuilder.prototype = Object.create(Builder.prototype);
WorldBuilder.prototype.constructor = WorldBuilder;

/**
 * Set width, height, and depth of the world object and initializes world data.
 * @param width
 * @param height
 * @param depth
 * @returns {WorldBuilder}
 */
WorldBuilder.prototype.withDimensions = function (width, height, depth) {
	this.obj.width = width;
	this.obj.height = height;
	this.obj.depth = depth;
	UTIL.forYX(height, width, (x, y) => {
		if (!this.obj.data[y])
			this.obj.data[y] = [];
		this.obj.data[y][x] = {};
	});
	return this;
};

/**
 * Set
 * @param seaLevel
 * @returns {WorldBuilder}
 */
WorldBuilder.prototype.withSeaLevel = function (seaLevel) {
	this.obj.seaLevel = seaLevel;
	return this;
};

/**
 * Sets world's event service and subscribe to MOVE event
 * @param eventService
 * @returns {WorldBuilder}
 */
WorldBuilder.prototype.withEventService = function (eventService) {
	this.obj.eventService = eventService;

	// TODO: sub here? If not, where?
	eventService.registerEventType("MOVE");
	eventService.subscribe("MOVE", function (event) {
		event.target.location = event.data;
	});
	return this;
};