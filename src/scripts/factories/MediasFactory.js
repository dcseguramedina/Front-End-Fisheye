import { ImageMedia, VideoMedia } from "../models/Medias.js";

export default class MediaFactory {
    constructor() {}

    buildMedia(id, photographerId, title, source, likes, date, price, type = 'image') {
        if (type === 'image') {
            return new ImageMedia(id, photographerId, title, source, likes, date, price) 
        // Otherwise return the video format
        } else if (type === 'video') {
            return new VideoMedia(id, photographerId, title, source, likes, date, price) 
        // Send an error if the format is not recognized
        } else {
            throw `Format de type inconnu`
        }
    }
}
