class Popup{
  constructor(selector){
    this._selector = document.querySelector(selector);
  }

  open(){
    this._selector.classList.add('popup_state_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }
  close(){
    this._selector.classList.remove('popup_state_opened');
    document.removeEventListener("keydown", this._handleEscClose);
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
    //close button
    const _closeButton = this._selector.querySelector('.popup__close');
    _closeButton.addEventListener('click', this.close);
    
    //click outside container 
    this._selector.addEventListener("click",  (event) => {
          if(event.target === this._selector){
            this.close;
          }
      });
  }
}

export {Popup}