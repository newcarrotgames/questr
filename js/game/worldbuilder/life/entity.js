function EntityBuilder(obj) {
	Builder.call(this);
	console.log(this);
	if (obj) {
		this.obj = obj;
	}
	this.withName = function(name) {
		this.obj.name = name;
		return this;
	};

	this.withLocation = function (location) {
		this.obj.location = location;
		return this;
	};

	this.withSpeed = function (speed) {
		this.obj.speed = speed;
		return this;
	};

	this.withSprite = function (sprite) {
		this.obj.img = sprite;
		return this;
	};

	this.withSize = function (size) {
		this.obj.size = size;
		return this;
	};

	this.obj.updateHandlers = [];
	this.obj.attachUpdateHandler = function (handler) {
		this.updateHandlers.push(handler);
	};

	this.withBrain = function (brain) {
		this.obj.brain = brain;
		this.obj.attachUpdateHandler(brain.think);
		return this;
	};

	this.withEventService = function (eventService) {
		this.obj.eventService = eventService;
		return this;
	};

	this.obj.update = function (ts) {
		this.updateHandlers.forEach(function (handler) {
			handler(ts);
		})
	};

	this.finalize = function () {
		console.log("finalize");
		this.obj.render = function (ctx, view) {
			let sx = (this.location.x - view.x) * this.img.width;
			let sy = (this.location.y - view.y) * this.img.height;
			ctx.drawImage(this.img, sx, sy);
		};
	};
}

EntityBuilder.prototype = Object.create(Builder.prototype);