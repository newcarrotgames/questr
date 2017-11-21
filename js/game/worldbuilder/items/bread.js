function Bread(location, eventService) {
	new EntityBuilder(this)
		.withName("Bread")
		.withLocation(location)
		.withSprite(sheet.f[SPRITEINDICES.BREAD])
		.withEventService(eventService)
		.build();
}