// Image and video display management

/* eslint-disable no-useless-constructor */
import { ImageMedia, VideoMedia } from '../models/Medias.js'

export default class MediaFactory {
  constructor () {}

  buildMedia (id, photographerId, title, source, likes, date, price, type = 'image') {
    if (type === 'image') {
      return new ImageMedia(id, photographerId, title, source, likes, date, price)
    } else if (type === 'video') {
      return new VideoMedia(id, photographerId, title, source, likes, date, price)
    } else {
      throw new RangeError('Format de type inconnu')
    }
  }
}
