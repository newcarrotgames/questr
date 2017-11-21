let Input = function() {
  console.log("input constructor called");
  this.handlers = [];
  document.addEventListener('keydown', (event) => {
    for (let i = 0; i !== this.handlers.length; i++)
      this.handlers[i](event);
  }, false);
  // document.addEventListener('keyup', (event) => {
  //   for (let i = 0; i !== this.handlers.length; i++)
  //     this.handlers[i](event);
  // }, false);
  this.registerInputHandler = function(handler) {
    console.log("registering input handler", handler);
    this.handlers.push(handler);
  }
};