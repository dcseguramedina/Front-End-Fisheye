import getData from "../services/data.services.js"
import Photographer from "../models/Photographer.js"

let photographer = new Photographer()

const data = await getData()

displayHomePage(data)

function displayHomePage(data) {
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
