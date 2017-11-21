function Location(x, y) {
	this.x = x;
	this.y = y;

	this.getRandomCloseLocation = function(proximity) {
		if (proximity >= 1) {
			let rx = 0;
			let ry = 0;
			do {
				rx = UTIL.nrnd(proximity);
				ry = UTIL.nrnd(proximity);
			} while (rx === 0 && ry === 0);
			return new Location(this.x + rx, this.y + ry)
		} else {
			throw new Exception("proximity is less than 1")
		}
	};

	this.clone = function() {
		return new Location(this.x, this.y);
	};

	this.copy = function(location) {
		this.x = location.x;
		this.y = location.y;
	}
}