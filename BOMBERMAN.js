"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

// HTML elements
var btnNewGame = document.getElementById("btn-newgame");
var btnInstructions =document.getElementById("btn-instructions");
var btnAbout = document.getElementById("btn-about");
var btnRestart = document.getElementById("btn-gameover");
var btnsBack = document.querySelectorAll(".btn-back");
var menuContainers = document.querySelectorAll(".menu-container");
var menuMain = document.getElementById("main-container");
var menuInstructions = document.getElementById("instructions-container");
var menuAbout = document.getElementById("about-container");
var menuGameOver = document.getElementById("gameover-container");

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
  entityManager.initPlayers();
  // reset everything
}

btnRestart.onclick = function() {
    menuMain.style.display = "none";
}

for (var i = 0; i < btnsBack.length; i++) {
   btnsBack[i].onclick = function() {
     for (var j = 0; j < menuContainers.length; j++) {
       menuContainers[j].style.display = "none";
     }
     menuMain.style.display = "flex";
   }
}

function gameOver(playerName) {
    menuGameOver.style.display = "flex";
    document.getElementById("winner").innerHTML = playerName + ' lost!';
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
      catWhite : './sprite/Cat_White_Frame.png',
      explosion: './sprite/Explosion.png',
      brick0: './sprite/Brick_0.png',
      brick1: './sprite/Brick_1_test.png',
      brick2: './sprite/Brick_2_test.png',
      bombNew: './sprite/Bomb2.png',
    };
    console.log('preloading');
    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {
    // Should rewrite this
    // Makes character sprite scale
    var catBlack = g_images.catBlack;
    catBlack.scale = consts.CHARACTER_SCALING;
    catBlack.width = catBlack.width / consts.CHARACTER_FRAMES;

    // Makes character sprite scale
    var catWhite = g_images.catWhite;
    catWhite.scale = consts.CHARACTER_SCALING;
    catWhite.width = catWhite.width / consts.CHARACTER_FRAMES;

    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
