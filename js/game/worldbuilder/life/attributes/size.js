function SizeBuilder() {
	Builder.call(this);

	this.withMass = function(mass) {
		this.obj.mass = mass;
	};

	this.withVolume = function(volume) {
		this.obj.volume = volume;
	};

	this.withLength = function(length) {
		this.obj.length = length;
	};

	this.withWidth = function(width) {
		this.obj.width = width;
	};

	this.finalize = function() {
		this.obj.density = mass / volume;
	};
}