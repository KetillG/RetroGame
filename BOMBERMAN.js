"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

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
      runar : "https://puu.sh/ygONV/b57ec88c65.png"
    };
    console.log(requiredImages);
    console.log('preloading');
    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {



    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
