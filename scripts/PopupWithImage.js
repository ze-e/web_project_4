import {Popup} from './Popup.js';

class PopupWithImage extends Popup {
  open(link, name){
  //open card in modal window
    const image = this._selector.querySelector('.popup__image');
    image.src = link;
    image.alt = name;
    this._selector.querySelector('.popup__image-caption').textContent = name;
    
    console.log(this._selector);
    this._selector.classList.add('popup_state_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }
}

export {PopupWithImage}