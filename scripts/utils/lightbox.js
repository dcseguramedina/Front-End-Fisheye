// Launch open lightbox event
const mediaLink = document.querySelectorAll(".media_link");
console.log(mediaLink)

mediaLink.forEach((link)=> link.addEventListener("click", (e) => {
    console.log('hello from lauch')
    e.preventDefault()
    createLightbox()
    displayLightbox()
})) 

const mediaSources = document.querySelectorAll(".media_source");
console.log(mediaSources)

const mediasSource = Array.from(mediaSources);
console.log(mediasSource)


