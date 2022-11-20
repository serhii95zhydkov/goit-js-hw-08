import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("iframe");

const player = new Player(iframe);

const STORAGE_TIME_KEY = "videoplayer-current-time";

player.on("play", function () {
    console.log("played the video!");
});

player.getVideoTitle().then(function(title) {
    console.log("title:", title);
});

player.on("timeupdate", throttle(onSaveCurrentTime, 1000));

function onSaveCurrentTime(e) {
    localStorage.setItem(STORAGE_TIME_KEY, e.seconds);
}; 

player.setCurrentTime(localStorage.getItem(STORAGE_TIME_KEY) || 0);