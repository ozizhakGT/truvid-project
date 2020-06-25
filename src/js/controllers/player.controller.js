import {playerEl, videoTitleEl, videoDescriptionEl, videoCurrentTimeEl} from "../elements";

// player controller
class PlayerController {

    static renderVideo(video) {
        playerEl.src = video.file;
        playerEl.poster = video.thumbnail;
        videoTitleEl.innerText = video.title;
        videoDescriptionEl.innerText = video.description;
    }

    static play(btn) {
        if (btn.dataset.mode === 'pause') {
            playerEl.play().then(res => {
                btn.innerText = 'Pause';

                btn.dataset.mode = 'play';
            })
                .catch(err => console.error(err));
        }
    }

    static pause(btn) {
        if (btn.dataset.mode === 'play') {
            playerEl.pause();

            btn.innerText = 'Play';
            btn.dataset.mode = 'pause';
        }
    }

    // built timestamp player
    static getCurrentTime(video) {
        const seconds = (Math.floor(video.currentTime) % 60).toString().padStart(2, "0");
        const minutes = Math.floor(video.currentTime / 60).toString().padStart(2, "0");

        // TODO: do dynamic hours changes ! ! !
        videoCurrentTimeEl.innerText = `00:${minutes}:${seconds}`;
    }

}

export default PlayerController;