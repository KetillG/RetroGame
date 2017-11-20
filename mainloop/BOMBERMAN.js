"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// HTML elements selected
var btnNewGame = document.getElementById("btn-newgame");
var btnInstructions =document.getElementById("btn-instructions");
var btnAbout = document.getElementById("btn-about");
var btnRestart = document.getElementById("btn-gameover");
var btnsBack = document.querySelectorAll(".btn-back");

var btn1Player = document.getElementById("btn-1player");
var btn2Player = document.getElementById("btn-2player");

var btn0Opponent = document.getElementById("btn-0opponent");
var btn1Opponent = document.getElementById("btn-1opponent");
var btn2Opponent = document.getElementById("btn-2opponent");
var btn3Opponent = document.getElementById("btn-3opponent");
var btnBackOpponent = document.getElementById("btn-back-opponent");

var btnsScoreboard = document.querySelectorAll(".btn-scoreboard");
var btnPause = document.getElementById("btn-pause");
var btnMute = document.getElementById("btn-mute");
var btnQuit = document.getElementById("btn-quit");

var menuContainers = document.querySelectorAll(".menu-container");
var menuMain = document.getElementById("main-container");
var menuInstructions = document.getElementById("instructions-container");
var menuAbout = document.getElementById("about-container");
var menuGameOver = document.getElementById("gameover-container");
var menuScoreboard = document.getElementById("scoreboard-container").querySelector(".players-list");
var menuPlayers = document.getElementById("player-container");
var menuOpponents = document.getElementById("opponent-container");
var menuPause = document.getElementById("pause-container");


// On click handlers
let numPlayers = 0;

btnInstructions.onclick = function() {
  menuMain.style.display = "none";
  menuInstructions.style.display = "flex";
}

btnAbout.onclick = function() {
  menuMain.style.display = "none";
  menuAbout.style.display = "flex";
}

btnNewGame.onclick = function() {
    menuMain.style.display = "none";
    menuPlayers.style.display = "flex";
}

btn1Player.onclick = function() {
    playersChosen(1);
}

btn2Player.onclick = function() {
    playersChosen(2);
}

btn0Opponent.onclick = function() {
    showScoreboardButtons();
    play(numPlayers,0)
}

btn1Opponent.onclick = function() {
    showScoreboardButtons();
    play(numPlayers,1)
}

btn2Opponent.onclick = function() {
    showScoreboardButtons();
    play(numPlayers,2)
}

btn3Opponent.onclick = function() {
    showScoreboardButtons();
    play(numPlayers,3)
}

btnBackOpponent.onclick = function() {
    menuPlayers.style.display = "flex";
    menuOpponents.style.display = "none";
}

btnRestart.onclick = function() {
    for (var j = 0; j < menuContainers.length; j++) {
        menuContainers[j].style.display = "none";
    }
    menuMain.style.display = "flex";
    // "new" spatial manage
    spatialManager.restart();
    // Clear entityManager
    entityManager.deferredSetup();
    entityManager.restartEntityManager();
    // New board
    entityManager.init();
}

btnPause.onclick = function() {
    keys[keyCode('P')] = true;
}

btnMute.onclick = function() {
    muteSound();
}

btnQuit.onclick = function() {
    hideScoreboardButtons();
    quitGame();
    g_isGameStarted = true;
}

// Play function takes in num human and num computers
function play (human, computer) {
    // hardcoded values, should be refactored
    const playerPos = [[1.5,1.5],[10.5,10.5],[10.5,1.5],[1.5,10.5]];
    const playerCode = [
        [
            'W'.charCodeAt(0),
            'S'.charCodeAt(0),
            'A'.charCodeAt(0),
            'D'.charCodeAt(0),
            220
        ],
        [38,40,37,39,'O'.charCodeAt(0)]];
    const images = [g_images.catBlack,g_images.catWhite,g_images.catRed,g_images.catBrown]

    // For each human
    for (let index = 0; index < human; index++) {
        const pos = playerPos.shift();
        const keycode = playerCode.shift();
        const image = images.shift();
        entityManager.initPlayer(
            pos[0],
            pos[1],
            keycode,
            "red",
            new Sprite(image),
            index
        );
    }
    // For each computer
    for (let index = 0; index < computer; index++) {
        const pos = playerPos.shift();
        const image = images.shift();
        entityManager.initAI(
            pos[0],
            pos[1],
            "red",
            new Sprite(image),
            index
        );
    }


    scoreboard.init();
    scoreboard.start(entityManager.getPlayers());

    g_isGameStarted = false;
}
// Sets how many human players
function playersChosen(nrOfPlayers) {
    menuPlayers.style.display = "none";
    menuOpponents.style.display = "flex";
    var noOpponent = document.getElementById("btn-0opponent");
    var moreOpponent = document.getElementById("btn-3opponent");

    if(nrOfPlayers === 1) {
        noOpponent.style.display = "none";
        moreOpponent.style.display = "inline";
    } else if(nrOfPlayers === 2) {
        noOpponent.style.display = "inline";
        moreOpponent.style.display = "none";
    }

    numPlayers = nrOfPlayers;
}

// Shows the scoreboard
function showScoreboardButtons() {
    menuScoreboard.style.display = "flex";
    menuOpponents.style.display = "none";

    for(var i = 0; i < btnsScoreboard.length; i++) {
        btnsScoreboard[i].style.display = "inline";
    }
}

// Hides the scoreboard
function hideScoreboardButtons() {
    for(var i = 0; i < btnsScoreboard.length; i++) {
        btnsScoreboard[i].style.display = "none";
    }
}

// Adds event listener to each back button
for (var i = 0; i < btnsBack.length; i++) {
    btnsBack[i].onclick = function() {
     for (var j = 0; j < menuContainers.length; j++) {
       menuContainers[j].style.display = "none";
     }
     menuMain.style.display = "flex";
   }
}

// Game over function
function gameOver(playerName) {
    menuGameOver.style.display = "flex";
    menuScoreboard.style.display = "none";
    hideScoreboardButtons();
    const players = entityManager.getPlayers();
    const winner = players.filter(player => {
        if(player.lives > 0) return player
    });
    const winnerMsg = winner[0] ? winner[0].name + ' won!' : 'Tie!';
    document.getElementById("winner").innerHTML = winnerMsg;

    g_isGameStarted = true;
}

// Quits the game
function quitGame() {
    menuGameOver.style.display = "flex";
    menuScoreboard.style.display = "none";
    document.getElementById("winner").innerHTML = 'Game quit :(';
    g_isGameStarted = true;
}

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    scoreboard.update(du);
    entityManager.update(du);
}

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);
}

// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
      catBlack : './sprite/Cat_Black_Frame.png',
      catBlack2 : './sprite/Cat_Black_Frame.png',
      catWhite : './sprite/Cat_White_Frame.png',
      catWhite2 : './sprite/Cat_White_Frame.png',
      catRed : './sprite/Cat_Red_Frame.png',
      catRed2 : './sprite/Cat_Red_Frame.png',
      catBrown : './sprite/Cat_Brown_Frame.png',
      catBrown2 : './sprite/Cat_Brown_Frame.png',
      explosion: './sprite/Explosion.png',
      brick0: './sprite/Brick_0.png',
      brick1: './sprite/Brick_1_test.png',
      brick2: './sprite/Brick_2_test.png',
      bombNew: './sprite/Bomb2.png',
      powerupBomb: './sprite/Powerup_Bomb.png',
      powerupFire: './sprite/Powerup_Fire.png',
      powerupSpeed: './sprite/Powerup_Fast.png',
    };
    console.log('preloading');
    Page.resizeCanvas();
    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
    // Size of a single brick
    const brickSize = consts.LOGICAL_WIDTH / (board.length + 2);
    // Inits the sprites
    // Characters
    const CHARACTER_TO_BRICK_RATIO = 0.4;
    initSprites(g_images.catWhite, CHARACTER_TO_BRICK_RATIO, brickSize, 6);
    initSprites(g_images.catBlack, CHARACTER_TO_BRICK_RATIO, brickSize, 6);
    initSprites(g_images.catRed, CHARACTER_TO_BRICK_RATIO, brickSize, 6);
    initSprites(g_images.catBrown, CHARACTER_TO_BRICK_RATIO, brickSize, 6);

    // Powerup
    const POWERUP_TO_BRICK_RATIO = 0.6;
    initSprites(g_images.powerupBomb, POWERUP_TO_BRICK_RATIO, brickSize);
    initSprites(g_images.powerupFire, POWERUP_TO_BRICK_RATIO, brickSize);
    initSprites(g_images.powerupSpeed, POWERUP_TO_BRICK_RATIO, brickSize);

    // Brick 0
    initSprites(g_images.brick0, 1, brickSize);

    // Brick 1
    initSprites(g_images.brick1, 1, brickSize);

    // Brick 2
    initSprites(g_images.brick2, 1, brickSize);

    // Bomb
    const BOMB_TO_BRICK_RATIO = 0.6;
    initSprites(g_images.bombNew, BOMB_TO_BRICK_RATIO, brickSize);

    // Fire
    const FIRE_TO_BRICK_RATIO = 0.9;
    initSprites(g_images.explosion, FIRE_TO_BRICK_RATIO, brickSize, consts.BOMB_FRAMES_X, consts.BOMB_FRAMES_Y);

    scoreboard.init();

    entityManager.init();

    main.init();
}

// Scales the sprite correctly
function initSprites(sprite, ratio, brickSize, xFrames = 1, yFrames = 1) {
    const bombScale = ratio * brickSize / ( sprite.width / xFrames );
    sprite.scale = bombScale;
    sprite.width = sprite.width / xFrames;
    sprite.height = sprite.height / yFrames;
}

// Kick it off
requestPreloads();
