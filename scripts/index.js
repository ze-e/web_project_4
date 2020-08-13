import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {Section} from "./Section.js";
import {PopupWithForm as Form} from "./PopupWithForm.js";
import {settings} from "./Settings.js";

/* FORMS */
/* add editButton and editform */
const _editButton =  document.querySelector('.profile__edit-button');
const _editForm = new Form(settings.editForm,{
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
const _addCardForm = new Form(settings.addForm,{
    callback : () => {
        event.preventDefault(); 
        // Get the values of each field from the corresponding value property
        const _cardName = document.querySelector('.popup__input-card-name');
        const _cardLink = document.querySelector('.popup__input-card-url');
    
        //create new card object and add it to the grid
        const _newCard = {};
        _newCard.name = _cardName.value;
        _newCard.link = _cardLink.value;
    
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

/* FORM VALIDATION */
//validate fields on edit form
const editFormValidator = new FormValidator(settings, document.querySelector(settings.editForm));
editFormValidator.enableValidation();

//validate fields on addCard form
const addCardValidator = new FormValidator(settings, document.querySelector(settings.addForm));
addCardValidator.enableValidation();
