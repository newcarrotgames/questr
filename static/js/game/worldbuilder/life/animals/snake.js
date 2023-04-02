function Snake(location, eventService) {
	new EntityBuilder(this)
		.withName("Snake")
		.withSpeed(4000)
		.withLocation(location)
		.withSprite(sheet.f[SPRITEINDICES.SNAKE])
		.withBrain({
			memory: { lastTs: new Date().getTime() },
			currentAction: {},
			think: (function (ts) {
				let e = ts - this.brain.memory.lastTs;
				if (e > this.speed) {
					let loc = new Location(
						this.location.x + UTIL.nrnd(2),
						this.location.y + UTIL.nrnd(2));
					this.eventService.publish(new Event("MOVE", this, loc))
					this.brain.memory.lastTs = ts;
				}
			}).bind(this)
		})
		.withEventService(eventService)
		.build();
}