var Render = function (es, view) {
	this.es = es;
	this.view = view;
	this.canvas = document.getElementById("canvas");
	this.context = canvas.getContext("2d");
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	this.run = function () {
		this.context.clearRect(
			0,
			0,
			this.canvas.width,
			this.canvas.height);
		for (let i = 0; i !== this.es.length; i++) {
			es[i].render(this.context, this.view);
		}
	}
};