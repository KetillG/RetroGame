const bombermanSoundtrack = new Audio("audio/BombermanSoundtrack.mp3");

bombermanSoundtrack.play();

bombermanSoundtrack.addEventListener("ended", function(){
     bombermanSoundtrack.currentTime = 0;
     bombermanSoundtrack.play();
});

const bombSounds = new Audio("audio/bombSounds.mp3");


function muteSound() {
    bombermanSoundtrack.muted = !bombermanSoundtrack.muted;
    bombSounds.muted = !bombSounds.muted;
}
