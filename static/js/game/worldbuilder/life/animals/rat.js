function Rat(location, eventService) {
	new EntityBuilder(this)
		.withName("Rat")
		.withSpeed(2000)
		.withLocation(location)
		.withSprite(sheet.f[SPRITEINDICES.RAT])
		.withBrain({
			memory: {lastTs: new Date().getTime() + UTIL.rnd(this.speed)},
			currentAction: {},
			think: (function (ts) {
				let e = ts - this.brain.memory.lastTs;
				if (e > this.speed) {
					let loc = new Location(
						this.location.x + UTIL.nrnd(1),
						this.location.y + UTIL.nrnd(1));
					this.eventService.publish(new Event("MOVE", this, loc));
					this.brain.memory.lastTs = ts;
				}
			}).bind(this)
		})
		.withEventService(eventService)
		.build();
}