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
                const stats =  this._players[index].getStats();
            }
        }
    },

    init: function () {
        const scoreboard = document.getElementById('scoreboard-container');
        const playerDivs = scoreboard.querySelector('.players-list')
        this._playersDOM.push(...playerDivs.children);
    }

}
