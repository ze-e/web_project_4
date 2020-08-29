import {Popup} from './Popup.js';

class PopupWithForm extends Popup {
  constructor(selector, {callback}){
    super(selector);
    this._callback = callback;
  }
  _getInputValues(){
    //returns an object of all form key value pairs
    const _formValues = {};
    const _inputList = this._selector.querySelectorAll('.popup__input');

    _inputList.forEach(input => {
      _formValues[input.name] = input.value;
    });
  
    return _formValues;
  }

  getFormInfo(){
    return this._getInputValues();
  }

  setEventListeners(){
      super.setEventListeners();
      const _submitButton = this._selector.querySelector('.popup__submit');
      _submitButton.addEventListener("click", (event) => {
        this._callback();
      });
    }
  
  close(){
    this._clearForm();
    super.close();
  }

  _clearForm(){
    const _inputList = this._selector.querySelectorAll('.popup__input');
    _inputList.forEach(input => {
      input.value = '';
    });
  }
}

export {PopupWithForm}