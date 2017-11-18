const bombermanSoundtrack = new Audio("audio/BombermanSoundtrack.mp3");
console.log(bombermanSoundtrack);
bombermanSoundtrack.play();
bombermanSoundtrack.addEventListener("ended", function(){
     bombermanSoundtrack.currentTime = 0;
     bombermanSoundtrack.play();
});

const bombSounds = new Audio("audio/bombSounds.mp3");
