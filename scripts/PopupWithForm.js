class PopupWithForm extends Popup {
  constructor({callback}){
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

  setEventListeners(){
      const _submitButton = this._selector.querySelector('.popup__submit');
      _submitButton.addEventListener("submit", this._callback);
    }
  
  close(){
    this._clearForm();
    super._close();
  }

  _clearForm(){
    const _inputList = this._selector.querySelectorAll('.popup__input');
    _inputList.forEach(input => {
      input.value = "";
    });
  }
}

export {PopupWithForm}