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
      cat : 'https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg'
    };
    console.log('preloading');
    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    // Makes character sprite scale
    var cat = g_images.cat;
    cat.scale = consts.CHARACTER_SCALING;
    cat.width = cat.width * cat.scale;
    cat.height = cat.height * cat.scale;
    
    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
