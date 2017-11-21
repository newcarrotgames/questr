var TerrainGenerator = {
	generate: function(world) {
		UTIL.forYX(world.height, world.width, (x, y) => {
			let value = noise.perlin2(x / 100, y / 100);
			world.data[y][x].height = Math.floor(Math.abs(value) * 128) * 2; // height of terrain at this point
		})
	}
};