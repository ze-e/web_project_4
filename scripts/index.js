/* MODAL FORMS */

/* asign DOM elements */
//assigning all DOM elements at the beginning optimizes performance

//popup handler
const popup_editProfile = document.querySelector('.popup_type_edit-profile');
const popup_addCard = document.querySelector('.popup_type_add-card');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add-button');


//form handlers
const form = document.querySelector('.popup__form_type_edit-profile');
const nameInput = document.querySelector('.popup__input-name');
const descriptionInput = document.querySelector('.popup__input-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const formAddCard = document.querySelector('.popup__form_type_add-card');
const cardSubmitButton = document.querySelector('.popup__card-submit');
const cardNameInput = document.querySelector('.popup__input-card-name');
const cardURLInput = document.querySelector('.popup__input-card-url');


/* popup handlers */

/*FIXME: Tried to consolidate the popuphandler 
and addcardhandler into one function, using evt.target, but it was unresponsive
consider refactoring in the future
*/

function popupHandler(evt){

    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
    popup_editProfile.classList.toggle('popup_state_opened');

}

function cardPopUpHandler(evt){

    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
    popup_addCard.classList.toggle('popup_state_opened');

}

//add handlers to buttons
editButton.addEventListener('click', popupHandler);
closeButton.addEventListener('click', popupHandler);
addButton.addEventListener('click', cardPopUpHandler);


/*   form handlers  */
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    // Get the values of each field from the corresponding value property
    const name = nameInput.value;
    const description = descriptionInput.value;

    // Insert new values using the textContent property of the querySelector() method
    profileName.textContent = name;
    profileDescription.textContent = description;

    //close window after changing values
    popupHandler(evt);

}


// Connect the handler to the form:
// it will watch the submit event
form.addEventListener('submit', formSubmitHandler);
cardSubmitButton.addEventListener('click', addCardHandler);


/* CARDS */

/* asign DOM elements */
const cardGrid = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card");

/* initial cards */

const cardList = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

renderCards(cardList);

function renderCards(cards){
    //clear cards
    cardGrid.innerHTML= '';

    //add cards
    cards.forEach( (item, index) => {
        const newCard = cardTemplate.cloneNode(true).content;
        newCard.querySelector(".element__title").textContent = item.name;
        if(item.link !== undefined){
            newCard.querySelector(".element__image").src = item.link;
            newCard.querySelector(".element__image").alt = item.name + "-img";
        }
        else{
            newCard.querySelector(".element__image").src = './images/element/default.jpg';
            newCard.querySelector(".element__image").alt = "default-img"; 
        }

        //add eventListener to like button
        const likeButton = newCard.querySelector('.element__like-button');
        likeButton.addEventListener('click', evt => {
            evt.target.classList.toggle('.element__like-button_state_liked');
        });

        //add eventListener to delete button
        const deleteButton = newCard.querySelector('.element__delete-button');
        deleteButton.addEventListener('click', evt => {
            cardList.splice(index, 1);
            renderCards(cardList);
        });

        cardGrid.appendChild(newCard);
    })
}

function addCardHandler (evt) {
    evt.preventDefault(); 
    // Get the values of each field from the corresponding value property
    const cardName = cardNameInput.value;
    const cardURL = cardURLInput.value;

    // Insert new values using the textContent property of the querySelector() method
    profileName.textContent = cardName;
    profileDescription.textContent = cardURL;

    //create new card object and add it to the array
    const newCard = {};
    newCard.name = cardName;
    newCard.cardURL = cardURL;
    cardList.unshift(newCard);
    renderCards(cardList);

    //close window after changing values
    cardPopUpHandler(evt);
}
