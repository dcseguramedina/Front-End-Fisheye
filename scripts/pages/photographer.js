import getData from "../services/data.services.js";
import Photographer from "../models/Photographer.js"
import MediaFactory from "../factories/MediasFactory.js";

let getPhotographerId = () => {
    return parseInt(new URL(window.location.href).searchParams.get("id"), 10);
};
const photographerId = getPhotographerId();
const data = await getData();
const factory = new MediaFactory();

displayPhotographerPage(data);

function displayPhotographerPage(data) {    
    const photographers = data.photographers;    
    const photographerInfo = photographers.find((p) => p.id === photographerId);

    const medias = data.medias;
    const mediasInfo = medias.filter((m) => m.photographerId === photographerId);
    const mediasLikes = mediasInfo.map((l) => l.likes);

    // Use reduce() method to find the total of likes
    let totalOfLikes = mediasLikes.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    },0);

    let photographer = new Photographer(
        photographerInfo.name,
        photographerInfo.id,
        photographerInfo.city,
        photographerInfo.country,
        photographerInfo.tagline,
        photographerInfo.price,
        photographerInfo.portrait,
        totalOfLikes

    );
    photographer.displayHeaderInfo();
    photographer.displayAside();
    displayGalley(mediasInfo);    
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
        );
        media.displayMedias();
    }
}

const filter = document.getElementById("filter")
console.log(filter)

filter.addEventListener("change", (e) => {
    console.log('hello from event')
    e.preventDefault()
    filterMedias()   
})

function filterMedias() {
    console.log('hello from filter')
    const option = filter.options[filter.selectedIndex].value
    console.log(option)

    const gallery = document.querySelector(".photographer_gallery_medias");
    console.log(gallery)

    const listToFilter = Array.from(gallery.children);
    console.log(listToFilter)

    listToFilter.sort((a, b) => {

          switch(option) {
              case "title":
                  return (a.title < b.title) ? -1 : 1;
      
              case "date":
                  return new Date(b.date) - new Date(a.date);
      
              default:
                  return b.likes - a.likes;
          }

          
    })
    console.log(listToFilter)
}


