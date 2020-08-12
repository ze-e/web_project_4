class Popup{
  constructor(selector){
    this._selector = document.querySelector(selector);
  }

  open(){
    this._selector.classList.addClass('popup_state_opened');
    document.addEventListener("keydown", _handleEscClose);
  }
  close(){
    this._selector.classList.removeClass('popup_state_opened');
    document.removeEventListener("keydown", _handleEscClose);
  }

  _handleEscClose(){
    if ((event.key) === "Escape") {
        const popupElements = Array.from(document.querySelectorAll(".popup"));
        popupElements.forEach((popupElement) => {
            popupElement.classList.remove("popup_state_opened");
        });
    }
  }

  setEventListeners(){
    this._selector.querySelector('.popup__close')
    ._closeButton.addEventListener('click', this.close);
  }

}

export {Popup}