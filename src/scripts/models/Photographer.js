export default class Photographer {
    
    constructor(name, id, city, country, tagline, price, portrait, likes) {
        this.name = name
        this.id = id
        this.city = city
        this.country = country
        this.tagline = tagline
        this.price = price
        this.portrait = portrait
        this.likes = likes
    }

    displayCardInfo() {
        const photographersSection = document.querySelector(".photographers_section")    
        
        //Create an "article" tag dedicated to a photographe
        const photographeArticle = document.createElement("article")
        photographeArticle.className = "photographer_details"
        photographeArticle.setAttribute('aria-label', 'Détails du photographe')
        photographersSection.appendChild(photographeArticle)

        //Create an "a" tag to make the link to a photographe
        const photoprapherLink = document.createElement("a")
        photoprapherLink.href = `./photographer.html?id=${this.id}`
        photoprapherLink.setAttribute('aria-label', `Image avec lien vers la page du photographe`)
        photographeArticle.appendChild(photoprapherLink)

        //Create an "img" tag for each photographe
        const photographeImage = document.createElement("img")
        photographeImage.src = `../../src/assets/photographers/${this.portrait}`
        photographeImage.alt = 'Portrait du photographe' + this.name   
        photoprapherLink.appendChild(photographeImage)

        //Create a "h2" tag for each photographe
        const photographeName = document.createElement("h2")        
        photographeName.textContent = this.name
        photoprapherLink.appendChild(photographeName)

        //Create a "h3" tag for each photographe
        const photographeLocation = document.createElement("h3")
        photographeLocation.textContent = this.city + ', ' + this.country
        photographeArticle.appendChild(photographeLocation)

        //Create a "span" tag for each photographe
        const photographeTagline = document.createElement("span")
        photographeTagline.textContent = this.tagline
        photographeArticle.appendChild(photographeTagline)

        //Create a "p" tag for each photographe
        const photographePrice = document.createElement("p")
        photographePrice.textContent = this.price + '€/jour'
        photographeArticle.appendChild(photographePrice)
    }

    displayHeaderInfo() {
        const photographeDetails = document.querySelector(".photographer_info")       

        // Create a "h1" tag for the name
        const photographeName = document.createElement("h1")        
        photographeName.textContent = this.name
        photographeDetails.appendChild(photographeName)

        // Create a "h2" tag for the location
        const photographeLocation = document.createElement("h2")
        photographeLocation.textContent = this.city + ', ' + this.country
        photographeDetails.appendChild(photographeLocation)
 
        // Create a "p" tag for the tagline
        const photographeTagline = document.createElement("p")
        photographeTagline.textContent = this.tagline
        photographeDetails.appendChild(photographeTagline)

        // Set the image attributs
        const photographeImage = document.querySelector(".photographer_portrait")        
        photographeImage.src = `../../src/assets/photographers/${this.portrait}`
        photographeImage.alt = 'Portrait du photographe ' + this.name
    }

    displayAside() {
        const main = document.querySelector("#main")
        
        // Create a "aside" tag to display likes and price
        const asideInfo = document.createElement("aside")
        main.appendChild(asideInfo)  

        // Create a "div" tag to contains likes and icon
        const likesInfo = document.createElement("div")
        asideInfo.appendChild(likesInfo)

        // Create a "p" tag for the total of likes
        const likes = document.createElement("p")
        likes.className = "total_of_likes"
        likes.textContent = this.likes
        likesInfo.appendChild(likes)     
        
        // Create a "i" tag for the like icon
        const likesIcon = document.createElement("i")
        likesIcon.classList.add('fa-solid')
        likesIcon.classList.add('fa-heart')
        likesInfo.appendChild(likesIcon)

        // Create a "p" tag for the price
        const price = document.createElement("p")
        price.textContent = this.price + '€/jour'
        asideInfo.appendChild(price)        
    }
}