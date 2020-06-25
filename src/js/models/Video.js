import {playerEl} from "../elements";

/**
 * Video model (blue print for any video that append to playlist);
* */
class Video {
    constructor(title, file, description, thumbnail) {
        this.title = title;
        this.file = file;
        this.description = description;
        this.thumbnail = thumbnail;
    }
}

export default Video;