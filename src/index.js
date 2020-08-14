//css
import "./pages/index.css";

//js
import {Card} from "./scripts/Card.js";
import {FormValidator} from "./scripts/FormValidator.js";
import {Section} from "./scripts/Section.js";
import {PopupWithForm as Form} from "./scripts/PopupWithForm.js";
import {UserInfo as User} from "./scripts/UserInfo";

import {settings} from "./scripts/settings.js";
import {initialCards} from "./scripts/initialCards.js";

/* CARDS */
//add initial cards
const cardList = new Section({
    items : initialCards,
    renderer : (item) => {
        const _card = new Card(item, "#card");
        cardList.addItem(_card);
    }
}, ".elements");
cardList.renderItems();

/* FORMS */
/* add editButton and editform */
const _editButton =  document.querySelector('.profile__edit-button');
const editForm = new Form(settings.editForm,{
    callback : () => {
        
        //write our form values to the user object
        const inputValues = editForm.getFormInfo();
        const user = new User(inputValues.name,inputValues.description);
        const userInfo = user.getUserInfo();
       
        //query elements which we will update with our values
        const profileName = document.querySelector('.profile__name');
        const profileDescription = document.querySelector('.profile__description');
       
        //set element text content to the values from our user object
        profileName.textContent = userInfo.name;
        profileDescription.textContent = userInfo.job;

        editForm.close();
    }
});

//attach new form to edit button
_editButton.addEventListener('click', (event) => {
    editForm.open();
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
                _newCardList.addItem(_card);
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

/* FORM VALIDATION */
//validate fields on edit form
const editFormValidator = new FormValidator(document.querySelector(settings.editForm));
editFormValidator.enableValidation();

//validate fields on addCard form
const addCardValidator = new FormValidator(document.querySelector(settings.addForm));
addCardValidator.enableValidation();