let Player = function (tiles, input, x, y, img, events) {
	this.location = new Location(x, y);
	this.img = img;
	this.eventService = events;

	let playerInputHandler = (function(e) {
		let loc = this.location.clone();
		if (e.type === "keydown") {
			if (e.key === "ArrowLeft") {
				loc.x--;
			} else if (e.key === "ArrowRight") {
				loc.x++;
			} else if (e.key === "ArrowUp") {
				loc.y--;
			} else if (e.key === "ArrowDown") {
				loc.y++;
			}
		}
		this.eventService.publish(new Event("MOVE", this, loc));
	}).bind(this);

	input.registerInputHandler(playerInputHandler);

	this.render = function (ctx, view) {
		let sx = (this.location.x - view.x) * this.img.width;
		let sy = (this.location.y - view.y) * this.img.height;
		ctx.drawImage(this.img, sx, sy);
	};

	this.update = function () {

	};
};