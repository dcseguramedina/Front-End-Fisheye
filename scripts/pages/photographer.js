import Photographer from "../models/Photographer.js"
import MediaFactory from "../factories/MediasFactory.js";

let getPhotographerId = () => {
    return parseInt(new URL(window.location.href).searchParams.get("id"), 10);
};
const photographerId = getPhotographerId()

async function getData() {
    try {
        const response = await fetch('../../data/photographers.json')
        const data = await response.json()
        getPhotographerInfo(data)
        getMediasInfo(data)
    }
    catch (error) {
        alert(`Une erreur s'est produite. Veuillez réessayer`);
    }
}
getData()

function getPhotographerInfo(data) {
    const photographers = data.photographers        
    const photographerInfo = photographers.find((p) => p.id === photographerId)

    let photographer = new Photographer(
        photographerInfo.name,
        photographerInfo.id,
        photographerInfo.city,
        photographerInfo.country,
        photographerInfo.tagline,
        photographerInfo.price,
        photographerInfo.portrait
    )
    photographer.displayHeaderInfo()

    photographer.displayAside()
}

function getMediasInfo(data) {
    const medias = data.medias
    const mediasInfo = medias.filter((m) => m.photographerId === photographerId)

    let media = new MediaFactory()

    for(let info of mediasInfo) {
        media = new MediaFactory(
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
}