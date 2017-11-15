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
}

btnRestart.onclick = function() {
    menuMain.style.display = "none";
    requestPreloads();
    entityManager.initPlayers();
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
      cat : './sprite/Cat_Black_Frame.png'
    };
    console.log('preloading');
    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    // Makes character sprite scale
    var cat = g_images.cat;
    cat.scale = consts.CHARACTER_SCALING;
    cat.width = cat.width / consts.CHARACTER_FRAMES;
    cat.height = cat.height;
    console.log(cat.width ,cat.height)
    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
