import Video from "../models/Video";

/**
* Playlist service.
 * this service will use on the main page and build a initial playlist state
 * @type selectedVideoIndex: number
 * @type videos: [Video]
 * @type mode: number (1: Original mode, 2: Shuffle Mode, 3: Crazy mode)
* */
class Playlist {
    constructor(selectedVideoIndex = 0, videos = [], mode = 1) {
        this.selectedVideoIndex = selectedVideoIndex;
        this.videos = videos;
        this.mode = mode;

        this.getNextVideo = this.getNextVideo.bind(this);
        this.getPrevVideo = this.getPrevVideo.bind(this);
        this.shuffleMode = this.shuffleMode.bind(this);
    }

    // add videos onload app or for original mode
    addVideos(videos) {
        this.videos = videos.map(({title, file, description, thumbnail}) => new Video(title, file, description, thumbnail))

        this.mode = 1;
    }

    // change current selected video (its cycled used, when finish list start from the first and same first to last)
    selectVideo(index) {
        this.selectedVideoIndex = (index % this.videos.length + this.videos.length) % this.videos.length;

        return this.getSelectedVideo();
    }

    getPlaylist() {
        return this.videos;
    }

    getSelectedVideo() {
        return this.videos[this.selectedVideoIndex];
    }

    getPlaylistMode() {
        return this.mode;
    }

    isEmpty() {
        return !this.videos.length;
    }

    getNextVideo() {
        this.selectedVideoIndex++;
        this.selectVideo(this.selectedVideoIndex);

        return this.getSelectedVideo();
    }

    getPrevVideo() {
        this.selectedVideoIndex--;
        this.selectVideo(this.selectedVideoIndex);

        return this.getSelectedVideo();
    }

    // Shuffle algorithm
    shuffleMode() {
        const array = this.getPlaylist();
        let currentIndex = array.length;
        let temporaryValue = null;
        let randomIndex = null;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        this.mode = 2;

        this.addVideos(array);

        return array;
    }

    // add new data set and as value the switch time
    crazyModeRandomTime(video) {
        video.dataset.switchTime = Math.floor(Math.random() * video.duration).toString();
    }
}

export default Playlist;