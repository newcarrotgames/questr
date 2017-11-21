/**
 * Cuilds the basic terrain data from perlin noise.
 * @type {{build: TerrainBuilder.build}}
 */
var TownGenerator = {
	generate: function(world) {
		this.townSize = 20;
		this.buildingSize = 8;

		// TODO: break this stuff down into helper methods
		var findGoodSpotForTown = function (world) {
			var yOff = Math.floor(world.height / 4);
			var yLen = Math.floor(world.height - world.height / 4);
			var xOff = Math.floor(world.width / 4);
			var xLen = Math.floor(world.width - world.width / 4);
			for (var y = yOff; y < yLen; y++) {
				for (var x = xOff; x < xLen; x++) {
					if (world.map[y][x] > Math.floor(world.seaLevel * 1.5)) {
						return new Location(x, y);
					}
				}
			}
		};

		this.boxCheck = function (box1, box2) {
			return (box1.x < box2.x + box2.width &&
				box1.x + box1.width > box2.x &&
				box1.y < box2.y + box2.height &&
				box1.height + box1.y > box2.y);
		};

		this.genBox = function (x, y, maxSize, townSize) {
			var bound = townSize / 2;
			var bx = x + UTIL.rnd(townSize) - bound;
			var by = y + UTIL.rnd(townSize) - bound;
			var w = UTIL.rnd(maxSize / 2) + maxSize / 2;
			var h = UTIL.rnd(maxSize / 2) + maxSize / 2;
			return {x: bx, y: by, width: w, height: h};
		};

		this.canBuild = function (boxes, box) {
			for (var i = 0; i < boxes.length; i++) {
				if (this.boxCheck(boxes[i], box))
					return false;
			}
			return true;
		};

		this.genBuildings = function (center, maxSize, townSize) {
			var buildings = [];
			var num = UTIL.rnd(maxSize / 2) + maxSize / 2;
			for (var i = 0; i < num; i++) {
				var box = this.genBox(center.x, center.y, maxSize, townSize);
				if (this.canBuild(buildings, box))
					buildings.push(box);
			}
			return buildings;
		};

		this.writeBuildings = function (tiles, buildings) {
			for (var i = 0; i < buildings.length; i++) {
				var building = buildings[i];
				for (var y = 0; y < building.height; y++) {
					for (var x = 0; x < building.width; x++) {
						tiles[y + building.y][x + building.x] = 1;
					}
				}
			}
		};

		this.makeBuildings = function (tiles, center, maxSize, townSize) {
			var buildings = this.genBuildings(center, maxSize, townSize);
			this.writeBuildings(tiles, buildings);
		};

		this.build = function (map) {
			this.center = findGoodSpotForTown(world.data);
			this.makeBuildings(map.structures, this.center, this.buildingSize, this.townSize);
		};
	}
};