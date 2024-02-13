export default async function getData() {
    try {
        const response = await fetch('../../data/photographers.json')
        const data = await response.json()
        return data
    }
    catch (error) {
        alert(`Une erreur s'est produite. Veuillez réessayer`)
    }
}
