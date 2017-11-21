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
	this.obj.runBuilder = function(builder) {
		builder.build(this);
	};

	this.obj.render = function (ctx) {
		for (let i = 0; i < this.view.height; i++) {
			let offY = i + this.view.y;
			if (offY < 0 || offY > this.height)
				continue;
			for (let j = 0; j < this.view.width; j++) {
				let offX = j + this.view.x;
				if (offX < 0 || offX > this.height)
					continue;
				let h = this.map[offY][offX];
				let s = this.structures[offY][offX];
				let color;
				if (s) {
					ctx.drawImage(sheet.f[920],
						j * this.size,
						i * this.size);
				} else {
					if (h < this.seaLevel) {
						color = "#0000" + UTIL.hex(Math.floor(h / 5) + 128, 2);
					} else {
						color = "#00" + UTIL.hex(h, 2) + "00";
					}
					ctx.fillStyle = color;
					ctx.fillRect(
						j * this.size,
						i * this.size,
						this.size,
						this.size);
				}
			}
		}
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
 * Sets world's event service
 * @param eventService
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