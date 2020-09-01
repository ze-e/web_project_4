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
    avatar,
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
    if(isLoading){
        const previousText = element.textContent;
        element.textContent = "Loading...";
        console.log(element.textContent);
        return previousText;
      }
    else{ 
        element.textContent = originalText; 
      }
}

/* LOAD USER */
const sessionUser = api.getUser().then((data) => {
      //save data into a new User object
      const user = new User(data.name, data.about);
      //write user data to page
      user.writeUserInfo();
      return user;
});

/* CARDS */

//popup
const popupImage = new PopupImage('.popup_type_image');

//add initial cards
api.getInitialCards().then((data) => {
        {   
            const cardList = new Section({
                items : data,
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
                                    method: "PUT",
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
                              setOwnerPermissions:(_elements)=>{
                                //remove delete button if currentuser does not equal the owner
                                api.getUser({
                                }).then((data) => {
                                  const currentUser = data._id;
                                  if (currentUser != item.owner._id){
                                    _elements.deleteButton.remove();
                                  }
                              
                                  //remove loading status
                                  _elements.loading.remove();
                                })
                              },
                              setState(_elements){
                                const selfLike = item.likes.find((i) => i._id == item.owner._id);
                                if(selfLike){
                                _elements.likeButton.classList.add('element__like-button_state_liked');
                                item._liked = true;
                                }
                              }
                        });
                    cardList.addItem(card);
                }
            }, ".elements");
            cardList.renderItems();
        }
      }
);

/* FORMS */
/* add editButton and editform */

const editForm = new Form(settings.editForm,{
    callback : () => { 
        
        const originalText = loading(true, profileSubmit);   

        //save our form values
        const inputValues = editForm.getFormInfo();

        api.editProfile({
            name : inputValues.name,
            about: inputValues.description,
            element: profileSubmit,
            originalText: profileSubmit.textContent
        }).then((data)=> {
            //save data into a new User object
            const user = new User(data.name, data.about);
            //write user data to page
            user.writeUserInfo();
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
        const originalText = loading(true, addCardSubmit);
        api.addCard({
            name: cardName.value,
            link: cardLink.value,
            element: addCardSubmit,
            originalText: addCardSubmit.textContent
        }).then((data) => {
            //create new card object and add it to the grid
            const newCard = data;
        
            const newCardList = new Section({
                items : [newCard],
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
                                    method: "PUT",
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
                              setOwnerPermissions:(_elements)=>{
                                //remove delete button if currentuser does not equal the owner
                                api.getUser({
                                }).then((data) => {
                                  const currentUser = data._id;
                                  if (currentUser != item.owner._id){
                                    _elements.deleteButton.remove();
                                  }
                              
                                  //remove loading status
                                  _elements.loading.remove();
                                })                              
                              }, 
                              setState(_elements){
                                const selfLike = item.likes.find((i) => i._id == item.owner._id);
                                if(selfLike){
                                _elements.likeButton.classList.add('element__like-button_state_liked');
                                item._liked = true;
                                }
                              }                                   
                        });
                    newCardList.addItem(card);
                }
            }, ".elements");

            //render card list and close the form
            newCardList.renderItems();
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
        const originalText = loading(true, avatarSubmit);
        api.editAvatar({
            link: avatarLink.value,
            element: avatarSubmit,
            originalText: avatarSubmit.textContent
        }).then((data) => {
            avatar.src = data.avatar;
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