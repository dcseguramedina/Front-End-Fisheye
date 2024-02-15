
// DOM Elements (modal)
const contactBtn = document.querySelector(".contact_button")
const modalBg = document.getElementById("contact_modal")
const closeBtn = document.querySelector(".close_button")
const close = document.querySelector(".submit_button")

// Launch open modal event
contactBtn.addEventListener("click", displayModal)

// Display modal form
function displayModal() {    
	modalBg.style.display = "block"
	const firstElement = document.getElementById("firstName")
	firstElement.focus()
}

// Launch close modal event
closeBtn.addEventListener("click", closeModal)
close.addEventListener("click", closeModal)

// Launch close modal event with escape key
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
	  closeModal()
	}
})

// Close modal form
function closeModal() {    
	modalBg.style.display = "none"
}

// Implement form inputs
// Create field class in order to simplify field's validation
class Field {
	// Define details
	constructor(docName, regex, docErrorMsg, errorMsg) {
	  this.docName = docName
	  this.regex = regex
	  this.docErrorMsg = docErrorMsg
	  this.errorMsg = errorMsg
	}
	// Define methods
	// Add an event to listen to the changes and check the inputs 
	addEvent() {
	  this.docName.addEventListener("focusout", (event) => {
		event.preventDefault()
		console.log(this.docName.value)
		this.checkField()
	  })
	}
	// Check the field and display an error message if needed
	checkField() {
	  let valid = this.regex.test(this.docName.value)
	  if (valid === false) {
		this.docName.style.border = "4px dashed #901C1C"
		this.docErrorMsg.textContent = this.errorMsg
		return false
	  } else {
		this.docName.style.border = "none"
		this.docErrorMsg.textContent = ""
		return true
	  }
	}
  }
  
// Create field object (firstName, lastName, email)
// Add eventListener (firstName, lastName, email)
let firstName = new Field(
	document.getElementById("firstName"),
	new RegExp(/^(?=.*[A-Za-z].*[a-zA-Z])[A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/),
	document.getElementById("firstNameErrorMsg"),
	`Veuillez entrer un prénom valide`
)
firstName.addEvent()

let lastName = new Field(
	document.getElementById("lastName"),
	new RegExp(/^(?=.*[A-Za-z].*[a-zA-Z])[A-Za-z\é\è\ê\ë\ï\œ\-\s]+$/),
	document.getElementById("lastNameErrorMsg"),
	`Veuillez entrer un nom valide`
)
lastName.addEvent()

let email = new Field(
	document.getElementById("email"),
	new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+[@]{1}[A-Za-z0-9.-]+\.[\w-]{2,4}$/),
	document.getElementById("emailErrorMsg"),
	`Veuillez entrer une adresse mail valide`
)
email.addEvent()

// Add eventListener (message)
const message = document.getElementById("message")
message.addEventListener("focusout", (event) => {
	event.preventDefault()
	console.log(message.value)
})

// Implement submit btn  
// Recover the DOM element for the "submitBtn"
const submitBtn = document.getElementById("submitBtn")

// // Listen to the click and check the inputs
submitBtn.addEventListener("submit", (event) => {
  	event.preventDefault() 
	document.forms[0].reset()
})
