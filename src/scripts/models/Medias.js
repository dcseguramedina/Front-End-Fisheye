// Index to handle lightbox
let currentMediaIndex = 0

class Medias {
  constructor (id, photographerId, title, source, likes, date, price) {
    this.id = id
    this.photographerId = photographerId
    this.title = title
    this.source = source
    this.likes = likes
    this.date = date
    this.price = price
  }

  displayMedias () {
    const gallerySection = document.querySelector('.photographer_gallery_medias')

    // Create an "article" tag dedicated to a media
    const mediaArticle = document.createElement('article')
    mediaArticle.className = 'gallery_image'
    mediaArticle.setAttribute('aria-label', 'Galerie d\'images du photographe')
    mediaArticle.setAttribute('data-date', this.date)
    mediaArticle.setAttribute('data-likes', this.likes)
    mediaArticle.setAttribute('data-source', this.source)
    mediaArticle.setAttribute('data-title', this.title)
    mediaArticle.setAttribute('data-is-img', this instanceof ImageMedia)
    gallerySection.appendChild(mediaArticle)

    // Create an "a" tag to make the link to a media
    const mediaLink = document.createElement('a')
    mediaLink.className = 'media_link'
    mediaLink.href = ''
    mediaLink.setAttribute('aria-label', `Lien vers la vue rapprochée de l'œuvre intitulé ${this.title} qui compte avec ${this.likes} likes`)
    mediaArticle.appendChild(mediaLink)

    // Get the media source from ImageMedia or VideoMedia (subclass) depending on the data content
    mediaLink.appendChild(this.getSource())

    // Launch open lightbox event
    mediaLink.addEventListener('click', (e) => {
      e.preventDefault()
      this.displayLightbox()
      const firstElement = document.querySelector('.lightbox_media')
      firstElement.focus()
    })

    // Create a "span" tag for each media info
    const mediaInfo = document.createElement('span')
    mediaArticle.appendChild(mediaInfo)

    // Create a "h3" tag for each media title
    const mediaTitle = document.createElement('h3')
    mediaTitle.textContent = this.title
    mediaInfo.appendChild(mediaTitle)

    // Create a "div" tag for the likes ans the icon
    const mediaLikesInfo = document.createElement('div')
    mediaInfo.appendChild(mediaLikesInfo)

    // Create a "p" tag for each media likes
    const mediaLikes = document.createElement('p')
    mediaLikes.className = 'number_of_likes'
    mediaLikes.setAttribute('aria-label', 'likes')
    mediaLikes.textContent = this.likes
    mediaLikesInfo.appendChild(mediaLikes)

    const mediaLikesBtn = document.createElement('button')
    mediaLikesBtn.className = 'likes_icon'
    mediaLikesBtn.setAttribute('type', 'button')
    mediaLikesBtn.setAttribute('data-liked', 'unliked')
    mediaLikesBtn.setAttribute('aria-label', 'Cliquez pour liker ce media')
    mediaLikesInfo.appendChild(mediaLikesBtn)

    // Create a "I" tag for the icon
    const mediaLikesIcon = document.createElement('i')
    mediaLikesIcon.classList.add('fa-solid')
    mediaLikesIcon.classList.add('fa-heart')
    mediaLikesBtn.appendChild(mediaLikesIcon)
  }

  displayLightbox () {
    const lightboxBg = document.getElementById('lightbox_modal')
    lightboxBg.style.display = 'block'

    const lightboxSlide = document.querySelector('.lightbox_media')
    lightboxSlide.setAttribute('aria-label', `Vue rapprochée de l'œuvre intitulé ${this.title}`)

    // Get the lightbox source from ImageMedia or VideoMedia (subclass) depending on the data content
    lightboxSlide.appendChild(this.getLightboxSource())

    // Create a "h3" tag for each media title
    const imageTitle = document.createElement('h3')
    imageTitle.className = 'slide_title'
    imageTitle.textContent = this.title
    lightboxSlide.appendChild(imageTitle)

    // START OF LIGHTBOX CONTROLS //
    // Launch close lightbox event
    const close = document.getElementById('close_lightbox')
    close.addEventListener('click', (e) => {
      e.preventDefault()
      lightboxSlide.innerHTML = ''
      lightboxBg.style.display = 'none'
    })

    // Launch close lightbox event with escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        lightboxSlide.innerHTML = ''
        lightboxBg.style.display = 'none'
      }
    })

    // Launch next lightbox event
    const showNext = document.getElementById('right')
    showNext.addEventListener('click', (e) => {
      e.preventDefault()
      this.navigateLightbox(1)
    })

    // Launch prev lightbox event
    const showPrevious = document.getElementById('left')
    showPrevious.addEventListener('click', (e) => {
      e.preventDefault()
      this.navigateLightbox(-1)
    })

    // Navigate through images with arrow keys
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        // right arrow key
        e.preventDefault()
        this.navigateLightbox(1)
      } else if (e.key === 'ArrowLeft') {
        // left arrow key
        e.preventDefault()
        this.navigateLightbox(-1)
      }
    })
    // END OF LIGHTBOX CONTROLS //
  }

  navigateLightbox (direction) {
    const galleryMedias = document.querySelector('.photographer_gallery_medias')
    const items = galleryMedias.childNodes
    const itemsList = Array.from(items).filter(item => item.nodeType === 1)

    currentMediaIndex += direction
    if (currentMediaIndex < 0) {
      currentMediaIndex = itemsList.length - 1
    } else if (currentMediaIndex >= itemsList.length) {
      currentMediaIndex = 0
    }

    const currentMedia = itemsList[currentMediaIndex]
    this.updateLightbox(currentMedia)
  }

  updateLightbox (currentMedia) {
    const source = currentMedia.getAttribute('data-source')
    const title = currentMedia.getAttribute('data-title')
    const isImage = currentMedia.getAttribute('data-is-img')

    // Set the image source and title based on the current image index
    if (isImage === 'true') {
      // Get the original element
      const slideSource = document.querySelector('.slide_source')
      // Create a new element with a img tag name
      const slideChangeToImage = document.createElement('img')
      // Replace the original element with the new one
      slideSource.parentNode.replaceChild(slideChangeToImage, slideSource)
      slideChangeToImage.className = 'slide_source'
      slideChangeToImage.src = source
      slideChangeToImage.alt = title
    } else {
      // Get the original element
      const slideSource = document.querySelector('.slide_source')
      // Create a new element with a video tag name
      const slideChangeToVideo = document.createElement('video')
      // Replace the original element with the new one
      slideSource.parentNode.replaceChild(slideChangeToVideo, slideSource)
      slideChangeToVideo.className = 'slide_source'
      slideChangeToVideo.src = source
      slideChangeToVideo.controls = true
    }
    const slideTitle = document.querySelector('.slide_title')
    slideTitle.textContent = title
  }
}

class ImageMedia extends Medias {
  // eslint-disable-next-line no-useless-constructor
  constructor (id, photographerId, title, source, likes, date, price) {
    super(id, photographerId, title, source, likes, date, price)
  }

  getSource () {
    const mediaImage = document.createElement('img')
    mediaImage.className = 'media_source'
    mediaImage.src = this.source
    mediaImage.alt = this.title

    return mediaImage
  }

  getLightboxSource () {
    const imageSource = document.createElement('img')
    imageSource.className = 'slide_source'
    imageSource.src = this.source
    imageSource.alt = this.title

    return imageSource
  }
}

class VideoMedia extends Medias {
  // eslint-disable-next-line no-useless-constructor
  constructor (id, photographerId, title, source, likes, date, price) {
    super(id, photographerId, title, source, likes, date, price)
  }

  getSource () {
    const mediaVideo = document.createElement('video')
    mediaVideo.className = 'media_source'
    mediaVideo.controls = true
    mediaVideo.src = this.source

    return mediaVideo
  }

  getLightboxSource () {
    const videoSource = document.createElement('video')
    videoSource.className = 'slide_source'
    videoSource.controls = true
    videoSource.src = this.source

    return videoSource
  }
}

export {
  ImageMedia,
  VideoMedia
}
