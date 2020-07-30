import {popupHandler, openModalImage} from "./util.js"

class Card{
  constructor(data, selector = "#card"){
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  /* EVENT HANDLERS */


  _setEventListeners(_elements) {
    //add _openModalImage to image
    _elements.imageElement.addEventListener('click', (event) => {openModalImage(event, this._link, this._name)});

    //add eventListener to like button
    _elements.likeButton.addEventListener('click', (event) => {
        event.target.classList.toggle('element__like-button_state_liked');
    });

    //add eventListener to delete button
    _elements.deleteButton.addEventListener('click', (event) => {
        event.target.closest('.element').remove();
    });  
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
    _elements.imageElement = this._element.querySelector(".element__image");
    _elements.textElement = this._element.querySelector(".element__title");
    _elements.likeButton = this._element.querySelector('.element__like-button');
    _elements.deleteButton = this._element.querySelector('.element__delete-button');

    //populate elements with data
    _elements.textElement.textContent = this._name;
    _elements.imageElement.src = this._link;
    _elements.imageElement.alt = this._name;

    //add event listners
    this._setEventListeners(_elements);

    return this._element;
  }
}

export {Card};