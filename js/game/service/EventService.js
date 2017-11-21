/**
 * Object that accepts events?
 * @constructor
 */
function EventService() {
	var subs = {};

	this.registerEventType =
		function (name) {
			subs[name] = []
		};

	this.subscribe = function(type, handler) {
		subs[type].push(handler);
	};

	this.publish = function(event) {
		subs[event.type].forEach(function(handler) {
			handler(event);
		});
	};
}

function Event(type, target, data) {
	this.type = type;
	this.target = target;
	this.data = data;
}

