//css
import "./pages/index.css";

//js
import {Card} from "./scripts/components/Card.js";
import {FormValidator} from "./scripts/components/FormValidator.js";
import {Section} from "./scripts/components/Section.js";
import {PopupWithForm as Form} from "./scripts/components/PopupWithForm.js";
import {PopupWithImage as PopupImage} from "./scripts/components/PopupWithImage.js";
import {UserInfo as User} from "./scripts/components/UserInfo";
import {Api} from "./scripts/components/Api.js";

//settings
import {settings} from "./scripts/utils/settings.js";
import {groupId, token} from "./scripts/utils/config.js";

//elements
import{
    editButton,
    addCardButton,
    cardName,
    cardLink,
    avatarButton,
    avatarLink,
    profileSubmit,
    addCardSubmit,
    avatarSubmit
} from "./scripts/utils/elements.js"

/* CREATE API CONNECTION */
const api = new Api({
    baseUrl : `https://around.nomoreparties.co/v1/${groupId}`,
    token : token
});

/* show loading when api is running */
function loading(isLoading, element, originalText="Submit"){
  isLoading ? element.textContent = "Loading..." : element.textContent = originalText; 
}

/* LOAD USER */
//create a user
const sessionUser = new User();

//load user from server
api.getUser().then((data) => {
      //save data into user object
      sessionUser.setUserInfo({name: data.name, job: data.about, userId: data._id, avatar: data.avatar});
}).then(()=>{
  //add initial cards
  api.getInitialCards().then((data) => {
    {   
        cardRenderer.renderItems(data);
    }
  });

})

/* CARDS */

//popup
const popupImage = new PopupImage('.popup_type_image');

//card renderer
const cardRenderer = new Section({
  renderer : (item) => {
      const card = new Card(item, 
          "#card", 
          {
              handleCardClick:()=>{
                  popupImage.open(item.link, item.name);
              },
              handleDeleteClick:(_elements)=>{
                  const confirmDeletePopup = new Form('.popup_type_delete', {callback: () =>{
                  api.deleteCard({
                      cardId: item._id
                    }).then((data) =>{
                      _elements.deleteButton.closest('.element').remove();
                    })
                    confirmDeletePopup.close();
                    }
                  });
                  confirmDeletePopup.open();
                },
                handleLike:(_elements)=>{
                  if(!item._liked){
                    api.addLike({
                      cardId: item._id
                    }).then((data) => {
                      _elements.likes.textContent = data.likes.length;
                      _elements.likeButton.classList.add('element__like-button_state_liked');
                      item._liked = true;
                    })} else {
                      api.deleteLike({
                        cardId: item._id
                      }).then((data) => {
                        _elements.likes.textContent = data.likes.length;
                        _elements.likeButton.classList.remove('element__like-button_state_liked');
                        item._liked = false;
                      })
                  };
                }, 
                ownerFunctions:(_elements)=>{
                    const currentUser = sessionUser.getUserInfo().id;
                    if (currentUser != item.owner._id){
                      _elements.deleteButton.remove();
                    }
                
                    //remove loading status
                    _elements.loading.remove();

                    //show likes by current user
                      const selfLike = item.likes.find((i) => i._id == currentUser);
                      if(selfLike){
                        _elements.likeButton.classList.add('element__like-button_state_liked');
                        item._liked = true;
                      }
                },

          });
      cardRenderer.addItem(card);
  }
, selector: ".elements"});

/* FORMS */
/* add editButton and editform */

const editForm = new Form(settings.editForm,{
    callback : () => { 
        
        //handle loading
        const originalText = profileSubmit.textContent;
        loading(true, profileSubmit);   
        
        //save our form values
        const inputValues = editForm.getFormInfo();

        api.editProfile({
            name : inputValues.name,
            about: inputValues.description
        }).then((data)=> {
            //save data to User object
            sessionUser.setUserInfo({name: data.name, job: data.about});
        }).finally(() => {
            loading(false, profileSubmit, originalText);
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
        const originalText = addCardSubmit.textContent;
        loading(true, addCardSubmit);
        api.addCard({
            name: cardName.value,
            link: cardLink.value
        }).then((data) => {
            //create new card object and add it to the grid
            const newCard = data;
            //render card list and close the form
            cardRenderer.renderItems([newCard]);
            addCardForm.close();
        }).finally(
            loading(false, addCardSubmit, originalText)
            );
    }
});
    
//attach form to add button
addCardButton.addEventListener('click', (event) => {
    addCardForm.open();
});

/* avatar button and form */
const avatarForm = new Form(settings.avatarForm,{
    callback : () => {
        const originalText = avatarSubmit.textContent;
        loading(true, avatarSubmit);
        api.editAvatar({
            link: avatarLink.value
        }).then((data) => {
            sessionUser.setUserInfo({avatar: data.avatar});
            avatarForm.close();
        }).finally(() => {
            loading(false, avatarSubmit, originalText);
          });
    }
});

//attach form to avatar
avatarButton.addEventListener('click', (event) => {
    avatarForm.open();
});

/* FORM VALIDATION */
//validate fields on edit form
const editFormValidator = new FormValidator(document.querySelector(settings.editForm));
editFormValidator.enableValidation();

//validate fields on addCard form
const addCardValidator = new FormValidator(document.querySelector(settings.addForm));
addCardValidator.enableValidation();

//validate field on avatar form
const avatarValidator = new FormValidator(document.querySelector(settings.avatarForm));
avatarValidator.enableValidation();