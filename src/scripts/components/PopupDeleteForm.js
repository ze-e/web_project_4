import { Popup } from './Popup.js';

class PopupDeleteForm extends Popup {
  constructor(selector){
    super(selector);
    this.callback;
  }

  open({callback}){
    this.callback = callback;
    super.open();
  }

  deleteCard(){
    this.callback();
    super.close();
  }

  setEventListeners(){
    super.setEventListeners();
    const _form = this._selector.querySelector('.popup__form');
    _form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.deleteCard();
    });
  }

}

export {PopupDeleteForm}