/**
 * This object handles the world "grid". It builds the basic terrain data from perlin noise.
 * @param width
 * @param height
 * @param size
 * @constructor
 */
var Tiles = function (width, height, size, eventService) {
	this.size = size;
	this.view = new View(size, width / 2, height / 2);
	this.width = width;
	this.height = height;
	this.map = [];
	this.eventService = eventService;
	for (let y = 0; y < this.height; y++) {
		this.map[y] = [];
		for (let x = 0; x < this.width; x++) {
			this.map[y][x] = 0;
		}
	}
	this.structures = [];
	for (let i = 0; i < this.height; i++)
		this.structures[i] = [];
	this.runBuilder = function (builder) {
		builder.build(this);
	};
	this.render = function (ctx) {
		for (let i = 0; i < this.view.height; i++) {
			let offY = i + this.view.y;
			if (offY < 0 || offY > this.height)
				continue;
			for (let j = 0; j < this.view.width; j++) {
				let offX = j + this.view.x;
				if (offX < 0 || offX > this.height)
					continue;
				let h = this.map[offY][offX];
				ctx.drawImage(sheet.f[920],
					j * this.size,
					i * this.size);
			}
		}
	};

	// register MOVE event
	this.eventService.registerEventType("MOVE");

	// and subscribe to it
	this.eventService.subscribe("MOVE", function (event) {
		debug();
		event.target.location = event.data;
	});
};