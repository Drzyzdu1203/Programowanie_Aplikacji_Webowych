var clapSound;
var boomSound;
var hihatSound;
var kickSound;
var openhatSound;
var rideSound;
var snareSound;
var tinkSound;
var tomSound;
var channel1 = [];
appStart();
function appStart() {
    window.addEventListener('keypress', onKeyDown);
    var btnPlayChannel1 = document.querySelector('#playChannel1');
    btnPlayChannel1.addEventListener('click', onPlayChannel1);
    getAudioTags();
}
function onPlayChannel1() {
    channel1.forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.time);
    });
}
function getAudioTags() {
    clapSound = document.querySelector('[data-sound="clap"]');
    boomSound = document.querySelector('[data-sound="boom"]');
    hihatSound = document.querySelector('[data-sound="hihat"]');
    kickSound = document.querySelector('[data-sound="kick"]');
    openhatSound = document.querySelector('[data-sound="openhat"]');
    rideSound = document.querySelector('[data-sound="ride"]');
    snareSound = document.querySelector('[data-sound="snare"]');
    tinkSound = document.querySelector('[data-sound="tink"]');
    tomSound = document.querySelector('[data-sound="tom"]');
}
function onKeyDown(ev) {
    var key = ev.key;
    var time = ev.timeStamp;
    channel1.push({ key: key, time: time });
    playSound(key);
    console.log(channel1);
}
function playSound(key) {
    switch (key) {
        case '7':
            clapSound.currentTime = 0;
            clapSound.play();
            break;

        case '8':
            boomSound.currentTime = 0;
            boomSound.play();
            break;

        case '9':
            hihatSound.currentTime = 0;
            hihatSound.play();
            break; 

        case '4':
            kickSound.currentTime = 0;
            kickSound.play();
            break;

        case '5':
            openhatSound.currentTime = 0;
            openhatSound.play();
            break;

        case '6':
            rideSound.currentTime = 0;
            rideSound.play();
            break; 

        case '1':
            snareSound.currentTime = 0;
            snareSound.play();
            break;

        case '2':
            tinkSound.currentTime = 0;
            tinkSound.play();
            break;

        case '3':
            tomSound.currentTime = 0;
            tomSound.play();
            break;             
    }
}
