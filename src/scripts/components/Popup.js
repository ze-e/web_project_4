class Popup{
  constructor(selector){
    this._selector = document.querySelector(selector);
    this.setEventListeners();
  }

  open(){
    this._selector.classList.add('popup_state_opened');
    //use escape button to close window
    document.addEventListener("keydown", (event) =>{
      if ((event.key) === "Escape") {
        this.close();
      }
    });
  }
  close(){
    this._selector.classList.remove('popup_state_opened');
    //use escape button to close window
    document.removeEventListener("keydown", (event) =>{
      if ((event.key) === "Escape") {
        this.close();
      }
    });
  }

  setEventListeners(){
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