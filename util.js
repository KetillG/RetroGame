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

  drawLine: function (ctx, xS, yS, xE, yE, style) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = style;

    ctx.lineWidth=20;
    ctx.beginPath();
    ctx.moveTo(xS * consts.RENDER_SCALE_WIDTH, yS * consts.RENDER_SCALE_HEIGHT);
    ctx.lineTo(xE * consts.RENDER_SCALE_WIDTH, yE * consts.RENDER_SCALE_HEIGHT);
    ctx.stroke();

    ctx.strokeStyle = oldStyle;
},
    playBombSound: function(bomb){
        bomb.currentTime = 1.5;
        bomb.play();
    }



};
