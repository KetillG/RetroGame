"use strict";

var scoreboard = {
    _players: [],
    _playersDOM: [],


    start: function (players) {
        this._players = players;
    },

    update: function (du) {
        const MAX_PLAYERS = 4;
        for (let index = 0; index < MAX_PLAYERS; index++) {
            const stats =  this._players[i].getStats();
            console.log(stats);
        }
    },

    init: function () {

    }
    
}
