import {Popup} from './Popup.js';

class PopupWithImage extends Popup {

  open(link, name){
  //open card in modal window
    const image = this._selector.querySelector('.popup__image');
    image.src = link;
    image.alt = name;
    this._selector.querySelector('.popup__image-caption').textContent = name;
    super.open();
  }
}

export {PopupWithImage}