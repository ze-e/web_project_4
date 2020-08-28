class Card{
  constructor(data, selector = "#card", Popup, Api){
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._liked = false;
    this._id = data._id;
    this._selector = selector;
    this.popup = Popup;
    this.api = Api;
    return this.createCard();
  }

  /* EVENT HANDLERS */

  _setEventListeners(_elements) {
    //add _openModalImage to image
    _elements.imageElement.addEventListener('click', (event) => {
      this.handleCardClick();
    });

    //add eventListener to like button
    _elements.likeButton.addEventListener('click', (event) => {
      this._handleLike(_elements);
    });

    //add eventListener to delete button
    _elements.deleteButton.addEventListener('click', (event) => {
      _elements.deleteButton.closest('.element').remove();
    });   
  }

  handleCardClick(){
    this.popup.open(this._link, this._name);
  }

  //like methods
  _handleLike(_elements){
    !this._liked ? this._addLike(_elements) : this._removeLike(_elements);
  }

  _addLike(_elements){
    this.api.editLikes({
      method: "PUT",
      contentType: "application/json",
      cardId: this._id,
      callback: (data) => {
        _elements.likes.textContent = data.likes.length;
        _elements.likeButton.classList.add('element__like-button_state_liked');
        this._liked = !this._liked;
      }
    });
  }

  _removeLike(_elements){
    this.api.editLikes({
      method: "DELETE",
      contentType: "application/json",
      cardId: this._id,
      callback: (data) => {
        _elements.likes.textContent = data.likes.length;
        _elements.likeButton.classList.remove('element__like-button_state_liked');
        this._liked = !this._liked;
      }
    });

  }
  
/* FUNCTIONS */

_getTemplate() {
  const _cardElement = document
    .querySelector(this._selector)
    .cloneNode(true)
    .content;

  return _cardElement;
}

  createCard() {
    //clone template
    this._element = this._getTemplate();

    //query elements and save them in the _elements object
    const _elements = {};
    _elements.imageElement = this._element.querySelector('.element__image');
    _elements.textElement = this._element.querySelector('.element__title');
    _elements.likeButton = this._element.querySelector('.element__like-button');
    _elements.likes = this._element.querySelector('.element__likes-display');
    _elements.deleteButton = this._element.querySelector('.element__delete-button');
    _elements.element = this._element.querySelector('.element');

    //populate elements with data
    _elements.element.classList.add(this._id);
    _elements.textElement.textContent = this._name;
    _elements.imageElement.src = this._link;
    _elements.imageElement.alt = this._name;
    _elements.likes.textContent = this._likes.length;

    //add event listners 
    this._setEventListeners(_elements);    

    return this._element;
  }

  
}

export {Card};