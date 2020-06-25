/* asign DOM elements */
//assigning all DOM elements at the beginning optimizes performance

//popup handler
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');

//form handler
const form = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input-name');
const descriptionInput = document.querySelector('.popup__input-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');



/* popup handler */

function popupHandler(evt){
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
    popup.classList.toggle('popup_state_opened');
}

//add handler to edit button and close button
editButton.addEventListener('click', popupHandler);
closeButton.addEventListener('click', popupHandler);


/*   form handler  */
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    // Get the values of each field from the corresponding value property
    const name = nameInput.value;
    const description = descriptionInput.value;

    // Insert new values using the textContent property of the querySelector() method
    profileName.textContent = name;
    profileDescription.textContent = description;

    //close window after changing values
    popupHandler(evt);
}

// Connect the handler to the form:
// it will watch the submit event
form.addEventListener('submit', formSubmitHandler);