//css
import "./pages/index.css";

//js
import {Card} from "./scripts/Card.js";
import {FormValidator} from "./scripts/FormValidator.js";
import {Section} from "./scripts/Section.js";
import {PopupWithForm as Form} from "./scripts/PopupWithForm.js";
import {PopupWithImage as PopupImage} from "./scripts/PopupWithImage.js";
import {UserInfo as User} from "./scripts/UserInfo";
import {Api} from "./scripts/Api.js"
//settings
import {settings} from "./scripts/settings.js";
//import {initialCards} from "./scripts/initialCards.js";

//elements
import{
    editButton,
    addCardButton,
    cardName,
    cardLink
} from "./scripts/elements.js"

/* CONNECT TO THE APP */
const api = new Api();
const user = api.getUser();
/* CARDS */
//popup
const popupImage = new PopupImage('.popup_type_image');
//add initial cards
const initialCards = () =>{
    try{
        return api.getCards();
    }
    catch(error){
        console.error("Could not load initial cards");
        return [];
    }
}

const cardList = new Section({
    items : initialCards,
    renderer : (item) => {
        const card = new Card(item, "#card", popupImage);
        cardList.addItem(card);
    }
}, ".elements");
cardList.renderItems();

/* FORMS */
/* add editButton and editform */
const editForm = new Form(settings.editForm,{
    callback : () => {
        
        //write our form values to the user object
        const inputValues = editForm.getFormInfo();
        const user = new User(inputValues.name,inputValues.description);
        user.writeUserInfo();
        editForm.close();
    }
});

//attach new form to edit button
editButton.addEventListener('click', (event) => {
    editForm.open();
});

/* addCard button and form */
const addCardForm = new Form(settings.addForm,{
    callback : () => {
        //create new card object and add it to the grid
        const newCard = {};
        newCard.name = cardName.value;
        newCard.link = cardLink.value;
    
        const newCardList = new Section({
            items : [newCard],
            renderer : (item) => {
                const card = new Card(item, "#card",popupImage);
                newCardList.addItem(card);
            }
        }, ".elements");

        //render card list and close the form
        newCardList.renderItems();
        addCardForm.close();
    }
});

//attach new form to add button
addCardButton.addEventListener('click', (event) => {
    addCardForm.open();
});

/* FORM VALIDATION */
//validate fields on edit form
const editFormValidator = new FormValidator(document.querySelector(settings.editForm));
editFormValidator.enableValidation();

//validate fields on addCard form
const addCardValidator = new FormValidator(document.querySelector(settings.addForm));
addCardValidator.enableValidation();