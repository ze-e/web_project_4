// Let's find the form in the DOM
let form = document.querySelector('.popup__form');

// Next is the form submit handler, though
// it won't submit anywhere just yet
function formSubmitHandler (evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
                          // Having done so, we can define our own way of submitting the form.
                          // We'll explain it in more detail later.

    // Let's find the form fields in the DOM
    let nameInput = form.querySelector('.popup__input-name');
    let descriptionInput = form.querySelector('.popup__input-description');


    // Get the values of each field from the corresponding value property
    let name = nameInput.value;
    let description = descriptionInput.value;
    // Select elements where the field values will be entered
    let profileName = document.querySelector('.profile__name');
    let profileDescription = document.querySelector('.profile__description');


    // Insert new values using the textContent property of the querySelector() method
    profileName.textContent = name;
    profileDescription.textContent = description;

    console.log(`name: ${profileName.textContent} description: ${profileDescription.textContent}`)
}

// Connect the handler to the form:
// it will watch the submit event
form.addEventListener('submit', formSubmitHandler);