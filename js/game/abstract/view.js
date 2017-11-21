/**
 * Represents the visible area of the world
 * @param size The current tile size
 * @param x X center of view
 * @param y Y of top left corner
 * @constructor
 */
var View = function(size, x, y) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.zoom = 1.0;
  this.width = Math.floor(
    window.innerWidth / size);
  this.height = Math.floor(
    window.innerHeight / size);
  this.halfWidth = Math.floor(this.width / 2);
  this.halfHeight = Math.floor(this.height / 2);
  this.getOffsetX = function() {
    return this.x - this.halfWidth;
  };
  this.getOffsetY = function() {
    return this.y - this.halfHeight;
  };
};