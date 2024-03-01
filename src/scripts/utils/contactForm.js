// Later, the contact button will send a message to the photographer
// For now, it just display the contents of the form fields in the console logs

// Launch open modal event
const contactBtn = document.getElementById('contact_button')
const modalBg = document.getElementById('contact_modal')

contactBtn.addEventListener('click', displayModal)

function displayModal () {
  modalBg.style.display = 'block'
  const firstElement = document.getElementById('firstName')
  firstElement.focus()
}

// Launch close modal event
const closeBtn = document.getElementById('close_button')
const submitBtn = document.getElementById('submit_button')

closeBtn.addEventListener('click', closeModal)
submitBtn.addEventListener('click', closeModal)

// Launch close modal event with escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
})

function closeModal () {
  modalBg.style.display = 'none'
}

// IMPLEMENT FORM ONPUTS //
class FormField {
  constructor (docName, regex, docErrorMsg, errorMsg) {
    this.docName = docName
    this.regex = regex
    this.docErrorMsg = docErrorMsg
    this.errorMsg = errorMsg
  }

  // Add an event to check the inputs
  addEventToFormField () {
    this.docName.addEventListener('focusout', (e) => {
      e.preventDefault()
      console.log(this.docName.value)
      this.checkFormField()
    })
  }

  // Check the field and display an error message if needed
  checkFormField () {
    const valid = this.regex.test(this.docName.value)
    if (valid === false) {
      this.docName.style.border = '2px solid #901C1C'
      this.docErrorMsg.textContent = this.errorMsg
      return false
    } else {
      this.docName.style.border = 'none'
      this.docErrorMsg.textContent = ''
      return true
    }
  }
}

// Create field object (firstName, lastName, email)
// Add eventListener (firstName, lastName, email)
const firstName = new FormField(
  document.getElementById('firstName'),
  /^(?=.*[A-Za-z].*[a-zA-Z])[A-Za-zéèêëïœ\-\s]+$/,
  document.getElementById('firstNameErrorMsg'),
  'Veuillez entrer un prénom valide'
)
firstName.addEventToFormField()

const lastName = new FormField(
  document.getElementById('lastName'),
  /^(?=.*[A-Za-z].*[a-zA-Z])[A-Za-zéèêëïœ\-\s]+$/,
  document.getElementById('lastNameErrorMsg'),
  'Veuillez entrer un nom valide'
)
lastName.addEventToFormField()

const email = new FormField(
  document.getElementById('email'),
  /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+[@]{1}[A-Za-z0-9.-]+\.[\w-]{2,4}$/,
  document.getElementById('emailErrorMsg'),
  'Veuillez entrer une adresse mail valide'
)
email.addEventToFormField()

// Add eventListener (message)
const message = document.getElementById('message')
message.addEventListener('focusout', (e) => {
  e.preventDefault()
  console.log(message.value)
})

// Implement submit btn
const submit = document.getElementById('submit')

submit.addEventListener('submit', (e) => {
  e.preventDefault()
  document.forms[0].reset()
})
