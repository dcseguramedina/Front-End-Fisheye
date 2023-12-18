import Photographer from "../models/Photographer.js"

let photographer = new Photographer()

async function getData() {
    try {
        const response = await fetch('../../data/photographers.json')
        const data = await response.json()
        getPhotographers(data)
    }
    catch (error) {
        alert(`Une erreur s'est produite. Veuillez réessayer`);
    }
}
getData()   

function getPhotographers(data) {
    const photographersInfo = data.photographers

    for(let info of photographersInfo) {
        photographer = new Photographer(
            info.name,
            info.id,
            info.city,
            info.country,
            info.tagline,
            info.price,
            info.portrait
        )
        photographer.displayCardInfo()
    }
}
