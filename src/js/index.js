import styles from '../styles/_base.scss';
import videos from '../static/db';
import {
    crazyModeBtn,
    nextVideoBtn,
    originalModeBtn,
    previousVideoBtn,
    shuffleModeBtn,
    playerEl,
    videoMode, playlistVideos
} from "./elements";
import Playlist from "./services/Playlist";
import PlaylistController from "./controllers/playlist.controller";
import PlayerController from "./controllers/player.controller";

// TODO: change Location to Playlist service!!!
const onVideoClick = () => {
    document.querySelectorAll('.video__item').forEach(video => {
        video.addEventListener('click', () => {
            const videoIndex = parseInt(video.dataset.id)
            PlayerController.renderVideo(playlistState.selectVideo(videoIndex));
            PlaylistController.highlightSelectedVideo(videoIndex);
        })
    })
}

// create playlist state instance
const playlistState = new Playlist();

window.addEventListener('DOMContentLoaded', () => {
    playlistState.addVideos(videos);

    // validate playlist is not empty
    if (!playlistState.isEmpty()) {
        playlistState.selectVideo(0);

        // built and render player and playlist
        PlayerController.renderVideo(playlistState.getSelectedVideo());
        PlaylistController.renderPlaylist(playlistState.getPlaylist());

        // Player events
        playerEl.addEventListener('loadeddata', () => {
            if(playlistState.getPlaylistMode() === 3) {
                playlistState.crazyModeRandomTime(playerEl);
            }
        })

        playerEl.addEventListener('timeupdate', ({target}) => {
            PlayerController.getCurrentTime(target);
            if (target.dataset.switchTime && parseInt(target.dataset.switchTime) === Math.round(target.currentTime)) {
                PlayerController.renderVideo(playlistState.getNextVideo(), videoMode);
            }
        });

        playerEl.addEventListener('ended', () => {
            PlayerController.renderVideo(playlistState.getNextVideo());

            PlaylistController.highlightSelectedVideo(playlistState.selectedVideoIndex);
        })

        videoMode.addEventListener('click', ({target}) => {
            target.dataset.mode === 'pause' ? PlayerController.play(target) : PlayerController.pause(target);
        })

        previousVideoBtn.addEventListener('click', () => {
            PlayerController.renderVideo(playlistState.getPrevVideo());

            PlaylistController.highlightSelectedVideo(playlistState.selectedVideoIndex);
        });

        nextVideoBtn.addEventListener('click', () => {
            PlayerController.renderVideo(playlistState.getNextVideo());

            PlaylistController.highlightSelectedVideo(playlistState.selectedVideoIndex);
        });


        // Playlist events
        onVideoClick()

        shuffleModeBtn.addEventListener('click',() => {
            PlaylistController.renderPlaylist(playlistState.shuffleMode());

            onVideoClick();
        });

        originalModeBtn.addEventListener('click', () => {playlistState.addVideos(videos)});

        crazyModeBtn.addEventListener('click', () => {
            // for Crazy mode
            playlistState.mode = 3;
        });
    }
});