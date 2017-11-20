"use strict";
// The scoreboard
var scoreboard = {
    // Private values
    _players: [],
    _playersDOM: [],
    _sprite: [],

    // Starts the scoreboard
    start: function (players) {
        this._players = players;
        for (let index = 0; index < 4; index++) {
            const domItem = this._playersDOM[index]
            domItem.style.display = 'flex';
            if(!players[index]) {
                domItem.style.display = 'none';
            }
        }
    },

    // Update the scoreboard
    update: function (du) {
        const MAX_PLAYERS = 4;
        // Updates each player
        for (let index = 0; index < MAX_PLAYERS; index++) {
            const STAT_COUNT = 4;
            const statBoxes = this._playersDOM[index].querySelector('.player-score').children;
            statBoxes[0].children[1].innerHTML = 0;
            // If player exists then update the player
            if(this._players[index]) {
                const canvasP = this._playersDOM[index].querySelector('.playerCTX');
                const ctxP = canvasP.getContext("2d");
                this.drawPlayer(this._players[index], canvasP, ctxP,index);

                const stats = Object.values(this._players[index].getStats());
                for (let i = 0; i < STAT_COUNT; i++) {
                    statBoxes[i].children[1].innerHTML = stats[i];
                }
            }

            for (let i = 0; i < STAT_COUNT; i++) {
                statBoxes[i].children[1].style.fontSize = consts.SCOREBOARD_FONT_SIZE;
            }

            for(let i=0; i < btnsScoreboard.length; i++) {
                btnsScoreboard[i].style.fontSize = consts.BUTTON_FONT_SIZE;
            }
        }
    },
    // Draws the cat on scoreboard
    drawPlayer(player,canvasP ,ctxP,index) {
        ctxP.clearRect(0, 0, canvasP.width, canvasP.height);
        var test =  new Sprite(this._sprite[index])
        test.drawFrameCenteredAtExtra(
            ctxP,
            0,
            0,
            0,
            Math.floor(0.8 * player.timeAlive / 6) % 6 ,
            0,
        );
    },
    // Inits the scoreboard
    init: function () {
        const scoreboard = document.getElementById('scoreboard-container');
        const playerDivs = scoreboard.querySelector('.players-list')
        this._playersDOM.push(...playerDivs.children);
        this._sprite = [g_images.catBlack2,g_images.catWhite2,g_images.catRed2,g_images.catBrown2];
    }

}
