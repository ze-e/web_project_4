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

  _setEventListeners(elements){

    //add _openModalImage to image
    elements.imageElement.addEventListener('click', (event) => {
      this.handleCardClick();
    });

    //add eventListener to like button
    elements.likeButton.addEventListener('click', (event) => {
      this.handleLike(elements);
    });

    //add eventListener to delete button
    elements.deleteButton.addEventListener('click', (event) => {
      this.handleDeleteClick(this, elements);
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

removeCard(elements){
  elements.deleteButton.closest('.element').remove();
}

  createCard() {
    //clone template
    this._element = this._getTemplate();

    //query elements and save them in the elements object
    const elements = {};
    elements.imageElement = this._element.querySelector('.element__image');
    elements.textElement = this._element.querySelector('.element__title');
    elements.likeButton = this._element.querySelector('.element__like-button');
    elements.likes = this._element.querySelector('.element__likes-display');
    elements.element = this._element.querySelector('.element');
    elements.deleteButton = this._element.querySelector('.element__delete-button');
    elements.loading = this._element.querySelector('.element__loading');

    //populate elements with data
    elements.element.classList.add(this._id);
    elements.textElement.textContent = this._name;
    elements.imageElement.src = this._link;
    elements.imageElement.alt = this._name;
    elements.likes.textContent = this._likes.length;

    //add event listners 
    this._setEventListeners(elements);  

    //set user permissions
    this.ownerFunctions(elements);

    return this._element;
  }
  
}

export {Card};