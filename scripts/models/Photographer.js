export default class Photographer {
    
    constructor(name, id, city, country, tagline, price, portrait) {
        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    }

    displayData() {
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

        //Create a "strong" tag for each photographe
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
}