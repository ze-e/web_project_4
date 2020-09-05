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
    this._elements ={};
    return this.createCard();
  }

  /* EVENT HANDLERS */

  _setEventListeners(){

    //add _openModalImage to image
    this._elements.imageElement.addEventListener('click', (event) => {
      this.handleCardClick();
    });

    //add eventListener to like button
    this._elements.likeButton.addEventListener('click', (event) => {
      this.handleLike(this);
    });

    //add eventListener to delete button
    this._elements.deleteButton.addEventListener('click', (event) => {
      this.handleDeleteClick(this);
    });
  }


 
/* FUNCTIONS */

  getElements(){
    return this._elements;
  }

  _getTemplate() {
    const _cardElement = document
      .querySelector(this._selector)
      .cloneNode(true)
      .content;

    return _cardElement;
  }

  removeCard(){
    this._elements.deleteButton.closest('.element').remove();
  }

  createCard() {
    //clone template
    this._element = this._getTemplate();

    //query _elements and save them in the _elements object
    this._elements.imageElement = this._element.querySelector('.element__image');
    this._elements.textElement = this._element.querySelector('.element__title');
    this._elements.likeButton = this._element.querySelector('.element__like-button');
    this._elements.likes = this._element.querySelector('.element__likes-display');
    this._elements.element = this._element.querySelector('.element');
    this._elements.deleteButton = this._element.querySelector('.element__delete-button');
    this._elements.loading = this._element.querySelector('.element__loading');

    //populate _elements with data
    this._elements.element.classList.add(this._id);
    this._elements.textElement.textContent = this._name;
    this._elements.imageElement.src = this._link;
    this._elements.imageElement.alt = this._name;
    this._elements.likes.textContent = this._likes.length;

    //add event listners 
    this._setEventListeners();  

    //set user permissions
    this.ownerFunctions(this);

    return this._element;
  }
  
}

export {Card};