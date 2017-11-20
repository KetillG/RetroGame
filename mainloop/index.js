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
        const scoreboard = document.getElementById('scoreboard-container');

        wWidth = window.innerWidth - 30 - scoreboard.offsetWidth;
        wHeight = window.innerHeight - 20;

        wWidth = Math.min(wWidth, wHeight);
        wHeight = wWidth;

        g_ctx.canvas.width  = wWidth;
        g_ctx.canvas.height = wHeight;

        scoreboard.style.height = wHeight + 'px';
        scoreboard.style.width = wWidth * 0.3 + 'px';

        scoreboard.querySelector('.scoreHeader').style.fontSize = 0.04 * wWidth + 'px';

        consts.RENDER_SCALE_WIDTH = ctx.canvas.width / consts.LOGICAL_WIDTH;
        consts.RENDER_SCALE_HEIGHT = ctx.canvas.height / consts.LOGICAL_HEIGHT;
        consts.SCOREBOARD_FONT_SIZE = wWidth * 0.04 + 'px';
    };

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    return {
        init,
        resizeCanvas,
    };

})();
