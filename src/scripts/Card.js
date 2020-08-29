//I have no idea how to attach this form to the eventListener without importing it here
//if I pass the form in the constructor as I did for Popup and Api, 
//I cannot create the form callback because the card object has not been created and I cannot
//access its methods

import {PopupWithForm as Form} from './PopupWithForm.js';

class Card{
  constructor(data, selector = "#card", {Popup, Api}){
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._liked = false;
    this._id = data._id;
    this._owner = data.owner._id;
    this._selector = selector;
    this.popup = Popup;
    this.api = Api;
    return this.createCard();
  }

  /* EVENT HANDLERS */

  _setEventListeners(_elements){

    //add _openModalImage to image
    _elements.imageElement.addEventListener('click', (event) => {
      this.handleCardClick();
    });

    //add eventListener to like button
    _elements.likeButton.addEventListener('click', (event) => {
      this._handleLike(_elements);
    });

    //add eventListener to delete button
    _elements.deleteButton.addEventListener('click', (event) => {
      this.handleDeleteClick(_elements);
    });
  }

  handleCardClick(){
    this.popup.open(this._link, this._name);
  }

    //delete form
  handleDeleteClick(_elements){
    const confirmDeletePopup = new Form('.popup_type_delete', {callback: () =>{
      this.deleteCard(_elements);
      confirmDeletePopup.close();
      }
    });
    confirmDeletePopup.open();
  }

  deleteCard(_elements){
    this.api.deleteCard({
      cardId: this._id,
      method: "DELETE",
      callback: (data) =>{
        _elements.deleteButton.closest('.element').remove();
      }
    })
  }

  //like methods
  _handleLike(_elements){
    !this._liked ? this._addLike(_elements) : this._removeLike(_elements);
  }

  _addLike(_elements){
    this.api.editLikes({
      method: "PUT",
      cardId: this._id,
      callback: (data) => {
        _elements.likes.textContent = data.likes.length;
        _elements.likeButton.classList.add('element__like-button_state_liked');
        this._liked = true;
      }
    });
  }

  _removeLike(_elements){
    this.api.editLikes({
      cardId: this._id,      
      method: "DELETE",
      callback: (data) => {
        _elements.likes.textContent = data.likes.length;
        _elements.likeButton.classList.remove('element__like-button_state_liked');
        this._liked = false;
      }
    });
  }

/* OWNER PERMISSIONS */
_setOwnerPermissions(_elements){
  //remove delete button if currentuser does not equal the owner
  this.api.getUser({
    callback: (data) => {
      const currentUser = data._id;
      if (currentUser != this._owner){
        _elements.deleteButton.remove();
      }
    }
  });

  //set initial like state
  const selfLike = this._likes.find((item) => item._id == this._owner);
    if(selfLike){
      _elements.likeButton.classList.add('element__like-button_state_liked');
      this._liked = true;
    }
}

 
/* FUNCTIONS */

_getTemplate() {
  const _cardElement = document
    .querySelector(this._selector)
    .cloneNode(true)
    .content;

  return _cardElement;
}

  createCard() {
    //clone template
    this._element = this._getTemplate();

    //query elements and save them in the _elements object
    const _elements = {};
    _elements.imageElement = this._element.querySelector('.element__image');
    _elements.textElement = this._element.querySelector('.element__title');
    _elements.likeButton = this._element.querySelector('.element__like-button');
    _elements.likes = this._element.querySelector('.element__likes-display');
    _elements.element = this._element.querySelector('.element');
    _elements.deleteButton = this._element.querySelector('.element__delete-button');

    //populate elements with data
    _elements.element.classList.add(this._id);
    _elements.textElement.textContent = this._name;
    _elements.imageElement.src = this._link;
    _elements.imageElement.alt = this._name;
    _elements.likes.textContent = this._likes.length;

    //add event listners 
    this._setEventListeners(_elements);  

    //set user permissions
    this._setOwnerPermissions(_elements);  

    return this._element;
  }
  
}

export {Card};