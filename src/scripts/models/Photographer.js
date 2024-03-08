export default class Photographer {
  constructor (name, id, city, country, tagline, price, portrait, likes) {
    this.name = name
    this.id = id
    this.city = city
    this.country = country
    this.tagline = tagline
    this.price = price
    this.portrait = portrait
    this.likes = likes
  }

  displayCardInfo () {
    const photographersSection = document.querySelector('.photographers_section')

    // Create an "article" tag dedicated to a photographe
    const photographerArticle = document.createElement('article')
    photographerArticle.className = 'photographer_details'
    photographersSection.appendChild(photographerArticle)

    // Create an "a" tag to make the link to a photographe
    const photographerLink = document.createElement('a')
    photographerLink.href = `photographer.html?id=${this.id}`
    photographerLink.setAttribute('aria-label', `Image avec lien vers la page du photographe ${this.name}`)
    photographerArticle.appendChild(photographerLink)

    // Create an "img" tag for each photographe
    const photographerImage = document.createElement('img')
    photographerImage.src = `src/assets/photographers/${this.portrait}`
    photographerImage.alt = 'Portrait du photographe' + this.name
    photographerLink.appendChild(photographerImage)

    // Create a "h2" tag for each photographe
    const photographerName = document.createElement('h2')
    photographerName.textContent = this.name
    photographerLink.appendChild(photographerName)

    // Create a "h3" tag for each photographe
    const photographerLocation = document.createElement('h3')
    photographerLocation.textContent = this.city + ', ' + this.country
    photographerArticle.appendChild(photographerLocation)

    // Create a "span" tag for each photographe
    const photographerTagline = document.createElement('span')
    photographerTagline.textContent = this.tagline
    photographerArticle.appendChild(photographerTagline)

    // Create a "p" tag for each photographe
    const photographerPrice = document.createElement('p')
    photographerPrice.textContent = this.price + '€/jour'
    photographerArticle.appendChild(photographerPrice)
  }

  displayHeaderInfo () {
    const photographerDetails = document.querySelector('.photographer_info')

    // Create a "h1" tag for the name
    const photographerName = document.createElement('h1')
    photographerName.textContent = this.name
    photographerDetails.appendChild(photographerName)

    // Create a "h2" tag for the location
    const photographerLocation = document.createElement('h2')
    photographerLocation.textContent = this.city + ', ' + this.country
    photographerDetails.appendChild(photographerLocation)

    // Create a "p" tag for the tagline
    const photographerTagline = document.createElement('p')
    photographerTagline.textContent = this.tagline
    photographerDetails.appendChild(photographerTagline)

    // Set the image attributs
    const photographerImage = document.querySelector('.photographer_portrait')
    photographerImage.src = `src/assets/photographers/${this.portrait}`
    photographerImage.alt = 'Portrait du photographe ' + this.name
  }

  displayAside () {
    const main = document.querySelector('#main')

    // Create an "aside" tag to display likes and price
    const asideInfo = document.createElement('aside')
    main.appendChild(asideInfo)

    // Create a "div" tag to contains likes and icon
    const likesInfo = document.createElement('div')
    asideInfo.appendChild(likesInfo)

    // Create a "p" tag for the total of likes
    const likes = document.createElement('p')
    likes.className = 'total_of_likes'
    likes.setAttribute('aria-label', `le travail de ce photographe compte avec ${this.likes} likes en total`)
    likes.textContent = this.likes
    likesInfo.appendChild(likes)

    // Create a "i" tag for the like icon
    const likesIcon = document.createElement('i')
    likesIcon.classList.add('fa-solid')
    likesIcon.classList.add('fa-heart')
    likesInfo.appendChild(likesIcon)

    // Create a "p" tag for the price
    const price = document.createElement('p')
    price.setAttribute('aria-label', `et sa tarif s'enlève à ${this.price} € par jour`)
    price.textContent = this.price + '€/jour'
    asideInfo.appendChild(price)
  }
}
