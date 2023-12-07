import Photographer from "../models/Photographer.js"

let photographer = new Photographer()

async function getPhotographers() {
    try {
        const response = await fetch('../../data/photographers.json')
        const data = await response.json()
        const photographers = data.photographers

        for(let details of photographers) {
            photographer = new Photographer(
                details.name,
                details.id,
                details.city,
                details.country,
                details.tagline,
                details.price,
                details.portrait
            )

            photographer.displayData()
        }
    }
    catch (error) {
        alert(`Une erreur s'est produite. Veuillez réessayer`);
    }
}

getPhotographers()   
