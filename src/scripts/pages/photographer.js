import getData from '../../scripts/services/data.services.js'
import Photographer from '../../scripts/models/Photographer.js'
import MediaFactory from '../../scripts/factories/MediasFactory.js'

const getPhotographerId = () => {
  return parseInt(new URL(window.location.href).searchParams.get('id'), 10)
}

const photographerId = getPhotographerId()
const data = await getData()
const factory = new MediaFactory()

displayPhotographerPage(data)

function displayPhotographerPage (data) {
  const photographers = data.photographers
  const photographerInfo = photographers.find((p) => p.id === photographerId)
  const medias = data.medias
  const mediasInfo = medias.filter((m) => m.photographerId === photographerId)
  const mediasLikes = mediasInfo.map((l) => l.likes)

  // Use reduce() method to find the total of likes
  const totalOfLikes = mediasLikes.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  }, 0)

  const photographer = new Photographer(
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

function displayGalley (mediasInfo) {
  // eslint-disable-next-line prefer-const
  for (let info of mediasInfo) {
    const media = factory.buildMedia(
      info.id,
      info.photographerId,
      info.title,
      info.image ? `../../src/assets/medias/${info.image}` : `../../src/assets/medias/${info.video}`,
      info.likes,
      info.date,
      info.price,
      info.image ? 'image' : 'video'
    )
    media.displayMedias()
  }
  // Add default filter - popularity
  sortMedias()
}

function filterGallery () {
  const filter = document.getElementById('filter')

  // Launch filter event
  filter.addEventListener('click', (e) => {
    e.preventDefault()
    sortMedias()
  })
}
filterGallery()

function sortMedias () {
  const option = filter.options[filter.selectedIndex].value
  // Get the list of medias from the DOM
  const gallery = document.querySelector('.photographer_gallery_medias')
  const items = gallery.childNodes
  const itemsList = []

  // eslint-disable-next-line prefer-const
  for (let i in items) {
    // get rid of the whitespace text nodes
    if (items[i].nodeType === 1) {
      itemsList.push(items[i])
    }
  }

  itemsList.sort(function (a, b) {
    switch (option) {
      case 'title':
        return (a.getAttribute('data-title') < b.getAttribute('data-title')) ? -1 : 1

      case 'date':
        return (b.getAttribute('data-date') < a.getAttribute('data-date')) ? -1 : 1

      default:
        return (parseInt(b.getAttribute('data-likes')) < parseInt(a.getAttribute('data-likes'))) ? -1 : 1
    }
  })

  for (let i = 0; i < itemsList.length; ++i) {
    gallery.appendChild(itemsList[i])
  }
}

// HANDLE LIKES //
const totalOfLikes = document.querySelector('.total_of_likes')
const likesIcon = document.querySelectorAll('.likes_icon')

// Launch add likes event
likesIcon.forEach((icon) => icon.addEventListener('click', (e) => {
  e.preventDefault()
  addLike(e)
}))

// Launch add likes event with enter key
likesIcon.forEach((icon) => icon.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addLike(e)
  }
}))

function addLike (e) {
  if (e.currentTarget.getAttribute('data-liked') === 'unliked') {
    e.currentTarget.previousSibling.textContent++
    totalOfLikes.textContent++
    e.currentTarget.setAttribute('data-liked', 'liked')
  }
}
