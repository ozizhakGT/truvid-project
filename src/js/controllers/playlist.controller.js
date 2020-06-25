import {videoListContainer} from "../elements";

class PlaylistController {

    static renderPlaylist(videos) {
        videoListContainer.innerHTML = '';

        videos.forEach((video, i) => videoListContainer.insertAdjacentHTML('beforeend',
            `
        <div class="video__item ${i === 0 ? 'video__highlight' : ''}" data-id="${i}">
             <img class="play-icon" src="https://www.pngrepo.com/download/226602/play-play-button.png" alt="play icon">
            <img class="video__item--preview" src="${video.thumbnail}" alt="${video.name}">
        </div>
        `));
    }

    // TODO: need check shuffle behavior ! ! !
    static highlightSelectedVideo(index) {
        document.querySelector('.video__highlight').classList.remove('video__highlight')
        const selectedVideo = Array.from(videoListContainer.children).find(video => parseInt(video.dataset.id) === index);

        if (selectedVideo) {
            selectedVideo.classList.add('video__highlight');
        }
    }
}

export default PlaylistController;