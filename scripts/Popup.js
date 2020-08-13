class Popup{
  constructor(selector){
    this._selector = document.querySelector(selector);
    this.setEventListeners();
  }

  open(){
    this._selector.classList.add('popup_state_opened');
  }
  close(){
    this._selector.classList.remove('popup_state_opened');
  }

  _handleEscClose(){
    if ((event.key) === "Escape") {
      this.close();
    }
  }

  setEventListeners(){
    //escape button
    document.addEventListener("keydown", (event) => {this._handleEscClose()});

    //close button
    const _closeButton = this._selector.querySelector('.popup__close');
    _closeButton.addEventListener('click', (event) => {this.close()});
    
    //click outside container 
    this._selector.addEventListener("click",  (event) => {
          if(event.target === this._selector){
            this.close();
          }
      });
  }
}

export {Popup}