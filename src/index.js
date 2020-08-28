//css
import "./pages/index.css";

//js
import {Card} from "./scripts/Card.js";
import {FormValidator} from "./scripts/FormValidator.js";
import {Section} from "./scripts/Section.js";
import {PopupWithForm as Form} from "./scripts/PopupWithForm.js";
import {PopupWithImage as PopupImage} from "./scripts/PopupWithImage.js";
import {UserInfo as User} from "./scripts/UserInfo";
import {Api} from "./scripts/Api.js";
//settings
import {settings} from "./scripts/settings.js";
import {groupId, token} from "./scripts/config.js";

//elements
import{
    editButton,
    addCardButton,
    cardName,
    cardLink
} from "./scripts/elements.js"

/* CREATE API CONNECTION */
const api = new Api({
    baseUrl : `https://around.nomoreparties.co/v1/${groupId}`,
    token : token
});
/* LOAD USER */
api.getUser({
    callback: (data) => {
      //save data into a new User object
      const user = new User(data.name, data.about);
      //write user data to page
      user.writeUserInfo();
    }
});

/* CARDS */

//popup
const popupImage = new PopupImage('.popup_type_image');
const popupDelete = new Form('.popup_type_delete');

//add initial cards
api.getInitialCards({
    callback: (data) => {
        {   
            const cardList = new Section({
                items : data,
                renderer : (item) => {
                    const card = new Card(item, 
                        "#card", 
                        {
                            Popup: popupImage,
                            PopupDelete: popupDelete,
                            Api: api
                        });
                    cardList.addItem(card);
                }
            }, ".elements");
            cardList.renderItems();
        }
      }
    }
);

/* FORMS */
/* add editButton and editform */

const editForm = new Form(settings.editForm,{
    callback : () => {
        
        //save our form values
        const inputValues = editForm.getFormInfo();

        api.editProfile({
            method: "PATCH",
            contentType: "application/json",
            name : inputValues.name,
            about: inputValues.description,
            callback: (data) => {
                //save data into a new User object
                const user = new User(data.name, data.about);
                //write user data to page
                user.writeUserInfo();
            }
        });

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
        api.addCard({
            method: "POST",
            contentType: "application/json",
            name: cardName.value,
            link: cardLink.value,
            callback: (data) => {
                //create new card object and add it to the grid
                const newCard = data;
            
                const newCardList = new Section({
                    items : [newCard],
                    renderer : (item) => {
                        const card = new Card(item, "#card", popupImage, api);
                        newCardList.addItem(card);
                    }
                }, ".elements");

                //render card list and close the form
                newCardList.renderItems();
                addCardForm.close();
            }
        });
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