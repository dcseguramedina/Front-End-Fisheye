export default class Photographer {
    
    constructor(name, id, city, country, tagline, price, portrait, likes) {
        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
        this.likes = likes
    }

    displayCardInfo() {
        const photographersSection = document.querySelector(".photographer_section")
    
        
        //Create an "article" tag dedicated to a photographe
        const photographeArticle = document.createElement("article");
        photographeArticle.ariaLabel = 'photographer details';
        //Attach the "article" tag to photographe's link
        photographersSection.appendChild(photographeArticle);

        //Create an "a" tag to make the link to a photographe
        const photoprapherLink = document.createElement("a");
        //Set the "a" tag and its "href" attribute
        photoprapherLink.href = `./photographer.html?id=${this.id}`;
        photoprapherLink.ariaLabel = `image link to photographer's page`;
        //Attach the "a" tag to photographe's section
        photographeArticle.appendChild(photoprapherLink);

        //Create an "img" tag for each photographe
        const photographeImage = document.createElement("img");
        photographeImage.src = `../../assets/photographers/${this.portrait}`;
        photographeImage.alt = 'portrait du photographer ' + this.name;
        //Attach the "img" tag to photographe's article
        photoprapherLink.appendChild(photographeImage);

        //Create a "h2" tag for each photographe
        const photographeName = document.createElement("h2");        
        photographeName.textContent = this.name;
        //Attach the "h2" tag to photographe's article
        photoprapherLink.appendChild(photographeName);

        //Create a "h3" tag for each photographe
        const photographeLocation = document.createElement("h3");
        photographeLocation.textContent = this.city + ', ' + this.country;
        //Attach the "h3" tag to photographe's article
        photographeArticle.appendChild(photographeLocation);

        //Create a "span" tag for each photographe
        const photographeTagline = document.createElement("span");
        photographeTagline.textContent = this.tagline;
        //Attach the "strong" tag to photographe's article
        photographeArticle.appendChild(photographeTagline);

        //Create a "p" tag for each photographe
        const photographePrice = document.createElement("p");
        photographePrice.textContent = this.price + '€/jour';
        //Attach the "p" tag to photographe's article
        photographeArticle.appendChild(photographePrice);
    }

    displayHeaderInfo() {
        const photographeDetails = document.querySelector(".photographer_info");        

        // Create a "h1" tag for the name
        const photographeName = document.createElement("h1");        
        photographeName.textContent = this.name;
        // Attach the "h1" tag to photographer details
        photographeDetails.appendChild(photographeName);

        // Create a "h2" tag for the location
        const photographeLocation = document.createElement("h2");
        photographeLocation.textContent = this.city + ', ' + this.country;
        // Attach the "h2" tag to photographer details
        photographeDetails.appendChild(photographeLocation);
 
        // Create a "p" tag for the tagline
        const photographeTagline = document.createElement("p");
        photographeTagline.textContent = this.tagline;
        // Attach the "p" tag to photographer details
        photographeDetails.appendChild(photographeTagline);

        const photographeImage = document.querySelector(".photographer_portrait");
        // Set the image attributs
        photographeImage.src = `../../assets/photographers/${this.portrait}`;
        photographeImage.alt = 'portrait du photographer ' + this.name;
    }

    displayAside() {
        const main = document.querySelector("#main");

        const asideInfo = document.createElement("aside");
        main.appendChild(asideInfo);  

        const likesInfo = document.createElement("div");
        asideInfo.appendChild(likesInfo);

        //Create a "p" tag for each media likes
        const likes = document.createElement("p");
        likes.textContent = this.likes;
        //Attach the "p" tag to the media info
        likesInfo.appendChild(likes);      
        
        const likesIcon = document.createElement("i");
        likesIcon.classList.add('fa-solid');
        likesIcon.classList.add('fa-heart');
        likesInfo.appendChild(likesIcon);

        //Create a "p" tag for each photographe
        const price = document.createElement("p");
        price.textContent = this.price + '€/jour';
        //Attach the "p" tag to photographe's article
        asideInfo.appendChild(price);
        
    }
}