/**
 * Builds towns
 * @type {{generate: TownGenerator.generate}}
 */
let TownGenerator = {
	generate: function(world) {
		this.townSize = 20;
		this.buildingSize = 8;

		// TODO: break this stuff down into helper methods
		let findGoodSpotForTown = function (world) {
			let yOff = Math.floor(world.height / 4);
			let yLen = Math.floor(world.height - world.height / 4);
			let xOff = Math.floor(world.width / 4);
			let xLen = Math.floor(world.width - world.width / 4);
			UTIL.forYX(yLen, xLen, (y, x) => {
				if (world.data[y + yOff][x + xOff].height >
					Math.floor(world.seaLevel * 1.5)) {
					return [x, y];
				}
			});
		};

		this.genBox = function (x, y, maxSize, townSize) {
			let bound = townSize / 2;
			let bx = x + UTIL.rnd(townSize) - bound;
			let by = y + UTIL.rnd(townSize) - bound;
			let w = UTIL.rnd(maxSize / 2) + maxSize / 2;
			let h = UTIL.rnd(maxSize / 2) + maxSize / 2;
			return {x: bx, y: by, width: w, height: h};
		};

		this.genBuildings = function (center, maxSize, townSize) {
			let buildings = [];
			let num = UTIL.rnd(maxSize / 2) + maxSize / 2;
			for (let i = 0; i < num; i++) {
				let box = this.genBox(
					center[0],
					center[1],
					maxSize,
					townSize);
				buildings.push(box);
			}
			return buildings;
		};

		this.writeBuildings = function (tiles, buildings) {
			buildings.forEach((building) => {
				UTIL.forYX(building.height, building.width, (y, x) => {
					tiles[y + building.y][x + building.x].structure = 1;
				});
			});
		};

		this.makeBuildings = function (tiles, center, maxSize, townSize) {
			let buildings = this.genBuildings(center, maxSize, townSize);
			this.writeBuildings(tiles, buildings);
		};

		// let center = findGoodSpotForTown(world);
		let center = [world.width / 2, world.height / 2];
		this.makeBuildings(world.data, center, this.buildingSize, this.townSize);
	}
};