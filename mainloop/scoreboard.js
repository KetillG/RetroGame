"use strict";

var scoreboard = {
    _players: [],
    _playersDOM: [],


    start: function (players) {
        this._players = players;
        console.log('I am in start scoreboard')
        console.log(players)
    },

    update: function (du) {
        const MAX_PLAYERS = 4;
        for (let index = 0; index < MAX_PLAYERS; index++) {
            if(this._players[index]) {
                //
                if(index === 0) {
                    const canvasP = this._playersDOM[index].querySelector('.playerCTX');
                    const ctxP = canvasP.getContext("2d");
                    this.drawPlayer(this._players[index], canvasP, ctxP);
                }
                const stats = Object.values(this._players[index].getStats());
                const statBoxes = this._playersDOM[index].querySelector('.player-score').children;
                const STAT_COUNT = 4;
                for (let i = 0; i < STAT_COUNT; i++) {
                    statBoxes[i].children[1].innerHTML = stats[i];
                    statBoxes[i].children[1].style.fontSize = consts.SCOREBOARD_FONT_SIZE;
                }
            }
        }
    },
    drawPlayer(player,canvasP ,ctxP) {
        ctxP.clearRect(0, 0, canvasP.width, canvasP.height);
        var test =  new Sprite(g_images.catBlack2)
        test.drawFrameCenteredAtExtra(
            ctxP,
            0,
            0,
            0,
            Math.floor(0.8 * player.timeAlive / 6) % 6 ,
            0,
        );

    },

    init: function () {
        const scoreboard = document.getElementById('scoreboard-container');
        const playerDivs = scoreboard.querySelector('.players-list')
        this._playersDOM.push(...playerDivs.children);
    }

}
