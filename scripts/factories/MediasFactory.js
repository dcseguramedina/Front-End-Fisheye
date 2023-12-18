export default class MediaFactory {
    constructor(id, photographerId, title, source, likes, date, price, type = 'image') {
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
        mediaArticle.ariaLabel = 'gallery image';
        //Attach the "article" tag to gallery
        gallerySection.appendChild(mediaArticle);

        //Create an "a" tag to make the link to a media
        const mediaLink = document.createElement("a");
        //Set the "a" tag and its "href" attribute
        mediaLink.href = ``;
        mediaLink.ariaLabel = 'image link to media';
        //Attach the "a" tag to the media
        mediaArticle.appendChild(mediaLink);

        mediaLink.appendChild(this.getSource());

        //Create a "span" tag for each media info
        const mediaInfo = document.createElement("span");
        //Attach the "span" tag to the media
        mediaArticle.appendChild(mediaInfo);

        //Create a "h3" tag for each media title
        const mediaTitle = document.createElement("h3");        
        mediaTitle.textContent = this.title;
        //Attach the "h2" tag to the media info
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
    }
}

class ImageMedia extends Medias {
    constructor(id, photographerId, title, source, likes, date, price) {
        super(id, photographerId, title, source, likes, date, price);
    }  
    
    getSource() {
        const mediaImage = document.createElement("img");
        mediaImage.src = this.source;
        mediaImage.alt = this.title;

        return mediaImage
    }
}

class VideoMedia extends Medias {
    constructor(id, photographerId, title, source, likes, date, price) {
        super(id, photographerId, title, source, likes, date, price);
    }

    getSource() {
         const mediaVideo = document.createElement("video");
         mediaVideo.controls = true;
         mediaVideo.src = this.source;

         return mediaVideo;
   }
}