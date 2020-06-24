/* popup handler */

function popupHandler(evt){
    evt.preventDefault();

    const popup = document.querySelector('.popup');
    popup.classList.toggle('popup_state_opened');
}

//add handler to edit button and close button
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', popupHandler);

const closeButton = document.querySelector('.popup__close');
closeButton.addEventListener('click', popupHandler);


/*   submit handler  */

const form = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.


    // Let's find the form fields in the DOM
    const nameInput = form.querySelector('.popup__input-name');
    const descriptionInput = form.querySelector('.popup__input-description');


    // Get the values of each field from the corresponding value property
    const name = nameInput.value;
    const description = descriptionInput.value;
    // Select elements where the field values will be entered
    const profileName = document.querySelector('.profile__name');
    const profileDescription = document.querySelector('.profile__description');


    // Insert new values using the textContent property of the querySelector() method
    profileName.textContent = name;
    profileDescription.textContent = description;

    //close window after changing values
    popupHandler(evt);
}

// Connect the handler to the form:
// it will watch the submit event
form.addEventListener('submit', formSubmitHandler);