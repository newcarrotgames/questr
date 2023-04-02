let debugDiv =
	document.getElementById('debug-text');

function debug(msg) {
	debugDiv.innerHTML +=
		"<strong>" + msg + "</strong><br/>";
	debugDiv.scrollTop = debugDiv.scrollHeight;
}

document.querySelector('#debug-clear-button')
	.addEventListener("click", function () {
		debugDiv.innerHTML = "";
	});

document.querySelector('#debug-hide-button')
	.addEventListener("click", function () {
		document.querySelector('#debug').style.display = 'none';
		document.querySelector('#debug-show-button').style.display = 'block';
	});

document.querySelector('#debug-show-button')
	.addEventListener("click", function () {
		document.querySelector('#debug-show-button').style.display = 'none';
		document.querySelector('#debug').style.display = 'block';
	});

let sheet;
let initDialogMessage = "Welcome to <strong>Questr</strong>!<br/><br/>" +
	"I'm developing this here in the hopes of creating a system " +
	"capable of procedurally generating interesting RPGish quests!" +
	"<br/><br/>Ohhhh boy!";

(function () {
	console.clear();
	noise.seed(Math.random());

	// load tileset
	sheet = new SpriteSheet("/static/img/rpg.png", 32, 32, start);

	function start() {
		console.log("starting start");
		let events = new EventService();
		let t = new Tiles(1000, 1000, 32, 64, events);
		let town = new TownBuilder();
		t.runBuilder(town);
		let i = new Input();
		let pc = new Player(t, i, town.center.x, town.center.y, sheet.f[3863], events);
		t.view.x = town.center.x - Math.floor(t.view.halfWidth);
		t.view.y = town.center.y - Math.floor(t.view.halfHeight);
		let es = [t, pc];

		// for (let i = 0; i < 10; i++) {
		// 	var a;
		// 	switch (i % 5) {
		// 		case 0:
		// 			a = new Rat(
		// 				pc.location.getRandomCloseLocation(10),
		// 				events);
		// 			break;
		// 		case 1:
		// 			a = new Snake(
		// 				pc.location.getRandomCloseLocation(10),
		// 				events);
		// 			break;
		// 		case 2:
		// 			a = new Dog(
		// 				pc.location.getRandomCloseLocation(10),
		// 				events);
		// 			break;
		// 		case 3:
		// 			a = new Cat(
		// 				pc.location.getRandomCloseLocation(10),
		// 				events);
		// 			break;
		// 		case 4:
		// 			a = new Bread(
		// 				pc.location.getRandomCloseLocation(10),
		// 				events);
		// 			break;
		// 	}
		// 	es.push(a);
		// }

		let r = new Render(es, t.view);
		let FPS = 30;
		setInterval(function () {
			let ts = new Date().getTime();
			r.run();
			es.forEach((e) => {
				if(e.update)
					e.update(ts);
			});
		}, 1000 / FPS);
		new Dialog(initDialogMessage);
	}
})();