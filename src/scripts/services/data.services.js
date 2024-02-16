export default async function getData() {
    try {
        const response = await fetch('../src/data/photographers.json')
        const data = await response.json()
        console.log(data)
        return data
    }
    catch (error) {
        alert(`Une erreur s'est produite. Veuillez réessayer`)
    }
}
