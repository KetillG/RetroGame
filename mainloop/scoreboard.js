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
        var player1 = document.getElementById("player1");
        var player2 = document.getElementById("player2");
        var player3 = document.getElementById("player3");
        var player4 = document.getElementById("player4");

        _playersDOM.push(player1);
        _playersDOM.push(player2);
        _playersDOM.push(player3);
        _playersDOM.push(player4);

        console.log(player1);
    }

}
