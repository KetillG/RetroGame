// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {

  // CANVAS OPS
  // ==========

  clearCanvas: function (ctx) {
      var prevfillStyle = ctx.fillStyle;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = prevfillStyle;
  },

  strokeCircle: function (ctx, x, y, r) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
  },

  fillCircle: function (ctx, x, y, r) {
      ctx.beginPath();
      ctx.arc(x * consts.RENDER_SCALE_WIDTH, 
              y * consts.RENDER_SCALE_HEIGHT,
              r * consts.RENDER_SCALE_WIDTH
              , 0, Math.PI * 2);
      ctx.fill();
  },

  fillBox: function (ctx, x, y, w, h, style) {
      var oldStyle = ctx.fillStyle;
      ctx.fillStyle = style;
    //   ctx.fillRect(x, y, w, h);
        ctx.fillRect(
            x * consts.RENDER_SCALE_WIDTH,
            y * consts.RENDER_SCALE_HEIGHT,
            w * consts.RENDER_SCALE_WIDTH,
            h * consts.RENDER_SCALE_HEIGHT
        );
      ctx.fillStyle = oldStyle;
  },



};
