import getData from "../services/data.services.js"
import Photographer from "../models/Photographer.js"
import MediaFactory from "../factories/MediasFactory.js"

let getPhotographerId = () => {
    return parseInt(new URL(window.location.href).searchParams.get("id"), 10)
}

const photographerId = getPhotographerId()
const data = await getData()
const factory = new MediaFactory()

displayPhotographerPage(data)

function displayPhotographerPage(data) {    
    const photographers = data.photographers    
    const photographerInfo = photographers.find((p) => p.id === photographerId)

    const medias = data.medias
    const mediasInfo = medias.filter((m) => m.photographerId === photographerId)
    const mediasLikes = mediasInfo.map((l) => l.likes)

    // Use reduce() method to find the total of likes
    let totalOfLikes = mediasLikes.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    },0)

    let photographer = new Photographer(
        photographerInfo.name,
        photographerInfo.id,
        photographerInfo.city,
        photographerInfo.country,
        photographerInfo.tagline,
        photographerInfo.price,
        photographerInfo.portrait,
        totalOfLikes

    )
    photographer.displayHeaderInfo()
    photographer.displayAside()
    displayGalley(mediasInfo)    
}

function displayGalley(mediasInfo) {
    for(let info of mediasInfo) {
        let media = factory.buildMedia(
            info.id,
            info.photographerId,
            info.title,
            info.image ? `../../assets/medias/${info.image}` : `../../assets/medias/${info.video}`,
            info.likes,
            info.date,
            info.price,
            info.image ? 'image' : 'video'
        )
        media.displayMedias()
    }
    // Add filter par default - popularity
    sortMedias()
}

function filterGallery() {
    const filter = document.getElementById("filter")
    
    filter.addEventListener("click", (e) => {
        e.preventDefault()
        sortMedias()   
    })
}
filterGallery()

function sortMedias() {
    const option = filter.options[filter.selectedIndex].value
    const gallery = document.querySelector(".photographer_gallery_medias")
    const items = gallery.childNodes    
    const itemsList = []

    for (let i in items) {
        if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
            itemsList.push(items[i])
        }
    }

    itemsList.sort(function(a, b) {
        switch(option) {
            case "title":
                return (a.getAttribute('data-title') < b.getAttribute('data-title')) ? -1 : 1
    
            case "date":
                return (b.getAttribute('data-date') < a.getAttribute('data-date')) ? -1 : 1
    
            default:
                return (parseInt(b.getAttribute('data-likes')) < parseInt(a.getAttribute('data-likes'))) ? -1 : 1
        }
    })

    for (let i = 0; i < itemsList.length; ++i) {
        gallery.appendChild(itemsList[i])
    }
}

function handleLikes() {
    const totalOfLikes = document.querySelector(".total_of_likes")
    const likesIcon = document.querySelectorAll(".likes_icon")

    // Launch add likes event
    likesIcon.forEach((icon) => icon.addEventListener("click", (e) => {
        e.preventDefault()
        if (e.target.getAttribute('data-liked') === "unliked") {
            e.target.previousSibling.textContent++
            totalOfLikes.textContent++
            e.target.setAttribute("data-liked", "liked")
        }          
    }))
}
handleLikes()
