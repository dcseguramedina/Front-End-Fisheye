// Launch open lightbox event
const gallery = document.querySelectorAll(".gallery_image");
console.log(gallery)


gallery.forEach((i)=> i.addEventListener("click", (e) => {
    console.log('hello from lauch')
    e.preventDefault()
    createLightbox()
    displayLightbox()
}))


