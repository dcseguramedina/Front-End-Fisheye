// Launch open modal event
const contactBtn = document.getElementById("contact_button")
const modalBg = document.getElementById("contact_modal")

contactBtn.addEventListener("click", displayModal)

function displayModal() {    
	modalBg.style.display = "block"
	const firstElement = document.getElementById("firstName")
	firstElement.focus()
}

// Launch close modal event
const closeBtn = document.getElementById("close_button")
const submitBtn = document.getElementById("submit_button")

closeBtn.addEventListener("click", closeModal)
submitBtn.addEventListener("click", closeModal)

// Launch close modal event with escape key
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
	  closeModal()
	}
})

function closeModal() {    
	modalBg.style.display = "none"
}

// IMPLEMENT FORM ONPUTS //
class Field {
	constructor(docName, regex, docErrorMsg, errorMsg) {
	  this.docName = docName
	  this.regex = regex
	  this.docErrorMsg = docErrorMsg
	  this.errorMsg = errorMsg
	}
	// Add an event to check the inputs 
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
const submit = document.getElementById("submit")

submit.addEventListener("submit", (event) => {
  	event.preventDefault() 
	document.forms[0].reset()
})
