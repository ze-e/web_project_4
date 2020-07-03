/* DOM ELEMENTS */
//assigning all DOM elements at the beginning optimizes performance

//popup handler
const popup_editProfile = document.querySelector('.popup_type_edit-profile');
const popup_addCard = document.querySelector('.popup_type_add-card');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add-button');


//form handlers
const form = document.querySelector('.popup__form_type_edit-profile');
const nameInput = document.querySelector('.popup__input-name');
const descriptionInput = document.querySelector('.popup__input-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const formAddCard = document.querySelector('.popup__form_type_add-card');
const cardNameInput = document.querySelector('.popup__input-card-name');
const cardDescriptionInput = document.querySelector('.popup__input-card-description');

/* MODAL FORMS */

/* popup handlers */

/*FIXME: Tried to consolidate the popuphandler 
and addcardhandler into one function, using evt.target, but it was unresponsive
consider refactoring in the future
*/

function popupHandler(evt){

    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
    popup_editProfile.classList.toggle('popup_state_opened');

}

function addCardHandler(evt){

    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
    popup_addCard.classList.toggle('popup_state_opened');

}

//add handlers to buttons
editButton.addEventListener('click', popupHandler);
closeButton.addEventListener('click', popupHandler);
addButton.addEventListener('click', addCardHandler);


/*   form handlers  */
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

function addCardSubmitHandler (evt) {
    evt.preventDefault(); 

    // Get the values of each field from the corresponding value property
    const name = cardNameInput.value;
    const description = cardNameInput.value;

    // Insert new values using the textContent property of the querySelector() method
    //profileName.textContent = name;
    //profileDescription.textContent = description;

    //close window after changing values
    addCardHandler(evt);

}

// Connect the handler to the form:
// it will watch the submit event
form.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', addCardSubmitHandler);

/* CARDS */
/*populate initial cards */

const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

/* old card elements: 

      <div class="element">
        <img class="element__image" src="./images/element/yosemite.jpg" alt="yosemite">
        <div class="element__text">
          <h3 class="element__title">Yosemite Valley</h3>
          <button class="element__like-button"></button>
        </div>
      </div>

      <div class="element">
        <img class="element__image" src="./images/element/lake_louise.jpg" alt="lake-louise">
        <div class="element__text">
          <h3 class="element__title">Lake Louise</h3>
          <button class="element__like-button"></button>
        </div>
      </div>

      <div class="element">
        <img class="element__image" src="./images/element/bald_mountains.jpg" alt="bald-mountains">
        <div class="element__text">
          <h3 class="element__title">Bald Mountains</h3>
          <button class="element__like-button"></button>
        </div>
      </div>

      <div class="element">
        <img class="element__image" src="./images/element/latemar.jpg" alt="latemar">
        <div class="element__text">
          <h3 class="element__title">Latemar</h3>
          <button class="element__like-button"></button>
        </div>
      </div>

      <div class="element">
        <img class="element__image" src="./images/element/vanois.jpg" alt="vanois">
        <div class="element__text">
          <h3 class="element__title">Vanois National Park</h3>
          <button class="element__like-button"></button>
        </div>
      </div>

      <div class="element">
        <img class="element__image" src="./images/element/lago_di_braies.jpg" alt="lago-di-braies">
        <div class="element__text">
          <h3 class="element__title">Lago di Braies</h3>
          <button class="element__like-button"></button>
      </div>
      </div>
      */