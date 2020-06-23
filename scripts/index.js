/* popup handler */

function popupHandler(){
    let popup = document.querySelector('.popup');
    popup.classList.toggle('popup_state_opened');
    //console.log(`${popup.classList}`);
}

//add handler to edit button and close button
let editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', popupHandler);

let closeButton = document.querySelector('.popup__close');
closeButton.addEventListener('click', popupHandler);


/*   submit handler  */

let form = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.


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

    //close window after changing values
    popupHandler();
}

// Connect the handler to the form:
// it will watch the submit event
form.addEventListener('submit', formSubmitHandler);