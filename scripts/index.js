import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {Section} from "./Section.js";
import {PopupWithForm as EditForm} from "./PopupWithForm.js";

/* settings */
const settings = {  
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

/*   form handlers  */
/*
const formSubmitHandler = (event) => {
    event.preventDefault(); 

    // Get the values of each field from the corresponding value property
    const name = nameInput.value;
    const description = descriptionInput.value;

    // Insert new values using the textContent property of the querySelector() method
    profileName.textContent = name;
    profileDescription.textContent = description;

    //close window after changing values
    popupHandler(event, popupEditProfile);
}


// Connect the handler to the form:
// it will watch the submit event
form.addEventListener('submit', formSubmitHandler);
*/

//add editButton and editform
const _editButton =  document.querySelector('.profile__edit-button');
const editForm = new EditForm('.popup_type_edit-profile',{
    callback : () => {
        //query elements
        const profileName = document.querySelector('.profile__name');
        const profileDescription = document.querySelector('.profile__description');

        //set element text content to form values
        const _inputValues = editForm._getInputValues();
        profileName.textContent = _inputValues.name;
        profileDescription.textContent = _inputValues.description;

        editForm.close();
    }
});

_editButton.addEventListener('click', (event) => {
    editForm.open();
  });

/* CARDS */

/* initial cards */

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

//call addNewCard for each item in the initial card array
const cardList = new Section({
    items : initialCards,
    renderer : (item) => {
        const card = new Card(item, "#card");
        cardList.addItem(card.createCard());
    }
}, ".elements");
cardList.renderItems();
/*
const addCardHandler = (event) => {
    event.preventDefault(); 
    // Get the values of each field from the corresponding value property
    const cardName = cardNameInput.value;
    const cardLink = cardURLInput.value;

    //create new card object and add it to the grid
    const newCard = {};
    newCard.name = cardName;
    newCard.link = cardLink;

    const newCardList = new Section({
        items : [newCard],
        renderer : (item) => {
            const card = new Card(item, "#card");
            newCardList.addItem(card.createCard());
        }
    }, ".elements");
    newCardList.renderItems();

    //close window after changing values
    popupHandler(event, popupAddCard);
}

//add handler to card submit button
cardSubmitButton.addEventListener('click', addCardHandler);
*/

/* FORM VALIDATION */
//validate fields on edit form
//const editFormValidator = new FormValidator(settings,form);
//editFormValidator.enableValidation();

//validate fields on addCard form
//const addCardValidator = new FormValidator(settings,formAddCard);
//addCardValidator.enableValidation();
