class Card{
  constructor(
    data, 
    selector = "#card", 
    {handleCardClick, 
    handleDeleteClick, 
    handleLike,
    ownerFunctions,
    setState}
    ){
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._liked = false;
    this._id = data._id;
    this._owner = data.owner._id;
    this._selector = selector;

    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLike = handleLike;
    this.ownerFunctions = ownerFunctions;
    this.setState = setState;
    return this.createCard();
  }

  /* EVENT HANDLERS */

  _setEventListeners(_elements){

    //add _openModalImage to image
    _elements.imageElement.addEventListener('click', (event) => {
      this.handleCardClick();
    });

    //add eventListener to like button
    _elements.likeButton.addEventListener('click', (event) => {
      this.handleLike(_elements);
    });

    //add eventListener to delete button
    _elements.deleteButton.addEventListener('click', (event) => {
      this.handleDeleteClick(this);
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

removeCard(){
  this._element.remove();
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
    _elements.element = this._element.querySelector('.element');
    _elements.deleteButton = this._element.querySelector('.element__delete-button');
    _elements.loading = this._element.querySelector('.element__loading');

    //populate elements with data
    _elements.element.classList.add(this._id);
    _elements.textElement.textContent = this._name;
    _elements.imageElement.src = this._link;
    _elements.imageElement.alt = this._name;
    _elements.likes.textContent = this._likes.length;

    //add event listners 
    this._setEventListeners(_elements);  

    //set user permissions
    this.ownerFunctions(_elements);

    return this._element;
  }
  
}

export {Card};