// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function Sprite(image) {
    this.image = image;

    this.scale = image.scale;
    this.width = this.scale * image.width;
    this.height = this.scale * image.height;
    
    this.scaleX = 1;
    this.scaleY = 1;
}

Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image,
                  x, y);
};

Sprite.prototype.drawFrameCenteredAt = function (ctx, cx, cy, rotation, frame) {
    if (rotation === undefined) rotation = 0;

    var w = this.width / this.scale;
    var h = this.height / this.scale;
    
    ctx.save();
    ctx.translate(cx*consts.RENDER_SCALE_WIDTH, cy*consts.RENDER_SCALE_HEIGHT);
    ctx.rotate(rotation);
    ctx.scale(
        this.scale * consts.RENDER_SCALE_WIDTH, 
        this.scale * consts.RENDER_SCALE_HEIGHT
    );
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(
        this.image,
        w * frame,
        0,
        w,
        h,
        0.5 * -w,
        0.5 * -h,
        w,
        h
    );

    ctx.restore();
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;

    var w = this.width / this.scale;
    var h = this.height / this.scale;
    
    ctx.save();
    ctx.translate(cx*consts.RENDER_SCALE_WIDTH, cy*consts.RENDER_SCALE_HEIGHT);
    ctx.rotate(rotation);
    ctx.scale(
        this.scale * consts.RENDER_SCALE_WIDTH, 
        this.scale * consts.RENDER_SCALE_HEIGHT
    );
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(
        this.image,
        0.5 * -w,
        0.5 * -h
    );

    ctx.restore();
};

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen width"
    var sw = g_canvas.width;

    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);

    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen height"
    var sh = g_canvas.height;

    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);

    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
};
