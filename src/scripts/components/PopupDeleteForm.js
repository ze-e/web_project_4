import {PopupWithForm} from './PopupWithForm.js';

class PopupDeleteForm extends PopupWithForm {
  constructor(selector, {callback}){
    super(selector, callback);
  }

  setCard(card){
    this.card = card;
  }
}

export {PopupDeleteForm}