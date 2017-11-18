document.addEventListener('DOMContentLoaded', () => {
    Page.init();
  });

let Page = (() => {

    let init = () => {
        resizeCanvas();
    }

    // ======================
    // Bind Event listeners
    // ======================

    // Resize canvas, and bind to resize event
    let resizeCanvas = () => {
        wWidth = window.innerWidth - 30 - document.getElementById('scoreboard-container').offsetWidth;
        wHeight = window.innerHeight;

        wWidth = Math.min(wWidth, wHeight);
        wHeight = wWidth;

        g_ctx.canvas.width  = wWidth;
        g_ctx.canvas.height = wHeight;

        consts.RENDER_SCALE_WIDTH = ctx.canvas.width / consts.LOGICAL_WIDTH;
        consts.RENDER_SCALE_HEIGHT = ctx.canvas.height / consts.LOGICAL_HEIGHT;
    };

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    return {
        init,
        resizeCanvas,
    };

})();
