/**
 * This object handles the world "grid". It builds the basic terrain data from perlin noise.
 * @param width
 * @param height
 * @param size
 * @param seaLevel
 * @constructor
 */
var Tiles = function (width, height, size, seaLevel, eventService) {
	this.size = size;
	this.seaLevel = seaLevel;
	this.view = new View(size, width / 2, height / 2);
	this.width = width;
	this.height = height;
	this.map = [];
	this.eventService = eventService;
	for (let y = 0; y < this.height; y++) {
		this.map[y] = [];
		for (let x = 0; x < this.width; x++) {
			let value = noise.perlin2(x / 100, y / 100);
			this.map[y][x] = Math.floor(Math.abs(value) * 128) * 2;
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

	// register MOVE event
	this.eventService.registerEventType("MOVE");

	// and subscribe to it
	this.eventService.subscribe("MOVE", function (event) {
		event.target.location = event.data;
	});
};