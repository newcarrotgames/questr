/**
 * Cuilds the basic terrain data from perlin noise.
 * @type {{build: TerrainBuilder.build}}
 */
var TerrainBuilder = {
	build: function(world) {
		UTIL.forYX(world.height, world.width, (x, y) => {
			let value = noise.perlin2(x / 100, y / 100);
			world.data[y][x].h = Math.floor(Math.abs(value) * 128) * 2; // height of terrain at this point
		})
	}
};