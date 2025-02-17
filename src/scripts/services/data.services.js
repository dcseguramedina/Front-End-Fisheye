// Use JavaScript's native Fetch API to retrieve data

export default async function getData () {
  try {
    const response = await fetch('src/data/photographers.json')
    const data = await response.json()
    return data
  } catch (error) {
    alert('Une erreur s\'est produite. Veuillez réessayer')
  }
}
