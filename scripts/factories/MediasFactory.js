import getData from "../services/data.services.js";

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

let currentImageIndex = 0;

class Medias {
    
    constructor(id, photographerId, title, source, likes, date, price) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.source = source;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }

    displayMedias() {
        const gallerySection = document.querySelector(".photographer_gallery_medias")

        //Create an "article" tag dedicated to a media
        const mediaArticle = document.createElement("article");
        mediaArticle.className = "gallery_image";
        mediaArticle.ariaLabel = 'gallery image';
        mediaArticle.setAttribute("data-title", this.title);
        mediaArticle.setAttribute("data-date", this.date);
        mediaArticle.setAttribute("data-likes", this.likes);
        gallerySection.appendChild(mediaArticle);

        //Create an "a" tag to make the link to a media
        const mediaLink = document.createElement("a");
        mediaLink.className = "media_link";
        mediaLink.href = ``;
        mediaLink.ariaLabel = 'image link to media';
        mediaArticle.appendChild(mediaLink);

        mediaLink.appendChild(this.getSource());

        // Launch open lightbox event
        mediaLink.addEventListener("click", (e) => {
            e.preventDefault()
            this.displayLightbox()
        })

        //Create a "span" tag for each media info
        const mediaInfo = document.createElement("span");
        mediaArticle.appendChild(mediaInfo);

        //Create a "h3" tag for each media title
        const mediaTitle = document.createElement("h3");        
        mediaTitle.textContent = this.title;
        mediaInfo.appendChild(mediaTitle);

        const mediaLikesInfo = document.createElement("div");
        mediaInfo.appendChild(mediaLikesInfo);

        //Create a "p" tag for each media likes
        const mediaLikes = document.createElement("p");
        mediaLikes.textContent = this.likes;
        //Attach the "p" tag to the media info
        mediaLikesInfo.appendChild(mediaLikes);

        const mediaLikesIcon = document.createElement("i");
        mediaLikesIcon.classList.add('fa-solid');
        mediaLikesIcon.classList.add('fa-heart');
        mediaLikesInfo.appendChild(mediaLikesIcon);

        //  // Launch add likes event
        mediaLikesIcon.addEventListener("click", (e) => {
            e.preventDefault();
            mediaLikes.textContent++;             
            const totalOfLikes = document.querySelector(".total_of_likes");
            totalOfLikes.textContent++;
            e.target.removeEventListener('click', (e));                 
        })
    } 

    displayLightbox() {   
        const lightboxBg = document.getElementById("lightbox_modal") 
        lightboxBg.style.display = "block";

        const lightboxSlide = document.querySelector(".lightbox_media")
        lightboxSlide.appendChild(this.getLightboxSource())

         //Create a "h3" tag for each media title
         const imageTitle = document.createElement("h3"); 
         imageTitle.className = "slide_title"       
         imageTitle.textContent = this.title;
         lightboxSlide.appendChild(imageTitle);

        // Launch close lightbox event
        const close = document.getElementById("close_lightbox")
        close.addEventListener("click", (e) => {
            e.preventDefault()
            lightboxSlide.innerHTML = ''
            lightboxBg.style.display = "none";
        })

         // Launch prev/next lightbox event
         const showNext = document.getElementById("right")
         showNext.addEventListener("click", (e) => {
            console.log('right')
             e.preventDefault()
             this.navigateLightbox(1)
         })

          // Launch next lightbox event
          const showPrevious = document.getElementById("left")
          showPrevious.addEventListener("click", (e) => {
            console.log('left')
              e.preventDefault()
              this.navigateLightbox(-1)
          })
    }    

    async navigateLightbox(direction) {
        console.log('hello from navigate')

        let getPhotographerId = () => {
            return parseInt(new URL(window.location.href).searchParams.get("id"), 10);
        };
        const photographerId = getPhotographerId()
        
        const data = await getData()
      

        const medias = data.medias
        
        const mediasInfo = medias.filter((m) => m.photographerId === photographerId)
        console.log(mediasInfo)

    
        // Update the current index based on the navigation direction
        let currentImage = mediasInfo[currentImageIndex += direction ];
        console.log(currentImage)

        // Wrap around to the first/last image if necessary
        if (currentImageIndex < 0) {
            currentImageIndex = mediasInfo.length - 1;
        } else if (currentImageIndex >= mediasInfo.length) {
            currentImageIndex = 0;
        }    

        // Set the image source and title based on the current image index
        const slideSource = document.querySelector(".slide_source")
        slideSource.src = currentImage.image ? `../../assets/medias/${currentImage.image}` : `../../assets/medias/${currentImage.video}`; 
        slideSource.alt = currentImage.title;

        const slideTitle = document.querySelector(".slide_title");        
        slideTitle.textContent = currentImage.title;
    }
}

class ImageMedia extends Medias {
    constructor(id, photographerId, title, source, likes, date, price) {
        super(id, photographerId, title, source, likes, date, price);
    }  
    
    getSource() {
        const mediaImage = document.createElement("img");
        mediaImage.className = "media_source";
        mediaImage.src = this.source;
        mediaImage.alt = this.title;

        return mediaImage
    }

    getLightboxSource() {
        const imageSource = document.createElement("img");
        imageSource.className = "slide_source";
        imageSource.src = this.source;
        imageSource.alt = this.title;

        return imageSource
    }
}

class VideoMedia extends Medias {
    constructor(id, photographerId, title, source, likes, date, price) {
        super(id, photographerId, title, source, likes, date, price);
    }

    getSource() {
         const mediaVideo = document.createElement("video");
         mediaVideo.className = "media_source";
         mediaVideo.controls = true;
         mediaVideo.src = this.source;

         return mediaVideo;
    }

    getLightboxSource() {
        const videoSource = document.createElement("video");
        videoSource.className = "slide_source";
        videoSource.controls = true;
        videoSource.src = this.source;

        return videoSource
    }
}
