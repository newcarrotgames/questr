var SPRITEINDICES = {
    BREAD: 2569,
    RAT: 4089,
    CAT: 5418,
    DOG: 4153,
    SNAKE: 4006
};

/**
 * SpriteSheet
 * @param src URL to the complete sprite sheet
 * @param w Number of sprites wide (eg w=10, image width is 320, so tile width is 32)
 * @param h Number of sprites high (eg h=5, image width is 160, so tile height is 16)
 * @constructor Creates a new SpriteSheet object
 */
function SpriteSheet(src, w, h, callback) {
    this.f = [];
    this.ready = false;
    var self = this;
    var img = new Image();

    img.onload = function() {
        let iw = this.width;
        let ih = this.height;
        let sw = iw / w;
        let sh = ih / h;
        let t = sw * sh;
        for (let i = 0; i < t; i++) {
            let c = document.createElement('canvas');
            let cx = c.getContext('2d');
            c.width = w;
            c.height = h;
            cx.drawImage(img, i % sw * w,  Math.floor(i / sw) * h, w, h, 0, 0, w, h);
            self.f.push(c);
        }
        self.ready = true;
        if (callback)
            callback();
    };
    img.src = src;
}