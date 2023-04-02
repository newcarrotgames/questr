function Dog(location, eventService) {
	new EntityBuilder(this)
		.withName("Dog")
		.withSpeed(1000)
		.withLocation(location)
		.withSprite(sheet.f[SPRITEINDICES.DOG])
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