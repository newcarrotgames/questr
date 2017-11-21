function Builder() {
	this.obj = {};
	this.build = function() {
		if (this.finalize !== undefined)
			this.finalize();
		let _obj = this.obj;
		this.obj = {};
		return _obj;
	}
}