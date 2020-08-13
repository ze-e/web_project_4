import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {Section} from "./Section.js";
import {PopupWithForm as Form} from "./PopupWithForm.js";

/* SETTINGS */
const settings = {  
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
}

/* FORMS */
/* add editButton and editform */
const _editButton =  document.querySelector('.profile__edit-button');
const _editForm = new Form('.popup_type_edit-profile',{
    callback : () => {
        //query elements
        const _profileName = document.querySelector('.profile__name');
        const _profileDescription = document.querySelector('.profile__description');

        //set element text content to form values
        const _inputValues = _editForm._getInputValues();
        _profileName.textContent = _inputValues.name;
        _profileDescription.textContent = _inputValues.description;

        _editForm.close();
    }
});

//attach new form to edit button
_editButton.addEventListener('click', (event) => {
    _editForm.open();
});

/* addCard button and form */
const _addCardButton = document.querySelector('.profile__add-button');
const _addCardForm = new Form('.popup_type_add-card',{
    callback : () => {
        event.preventDefault(); 
        // Get the values of each field from the corresponding value property
        const _cardName = document.querySelector('.profile__name');
        const _cardLink = document.querySelector('.profile__description');
    
        //create new card object and add it to the grid
        const _newCard = {};
        _newCard.name = _cardName;
        _newCard.link = _cardLink;
    
        const _newCardList = new Section({
            items : [_newCard],
            renderer : (item) => {
                const _card = new Card(item, "#card");
                _newCardList.addItem(_card.createCard());
            }
        }, ".elements");

        //render card list and close the form
        _newCardList.renderItems();
        _addCardForm.close();
    }
});

//attach new form to add button
_addCardButton.addEventListener('click', (event) => {
    _addCardForm.open();
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
