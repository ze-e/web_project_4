
import {Card} from "./Card.js";

/* MODAL FORMS */

/* asign DOM elements */
//assigning all DOM elements at the beginning optimizes performance

//popup handler
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close_type_edit-profile');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.popup__close_type_add-card');
const closeImageButton = document.querySelector('.popup__close_type_image');


//form handlers
const form = document.querySelector('.popup__form_type_edit-profile');
const formAddCard = document.querySelector('.popup__form_type_add-card');

const nameInput = document.querySelector('.popup__input-name');
const descriptionInput = document.querySelector('.popup__input-description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const cardSubmitButton = document.querySelector('.popup__card-submit');
const cardNameInput = document.querySelector('.popup__input-card-name');
const cardURLInput = document.querySelector('.popup__input-card-url');

/* escape handler*/
//close modal when escape is pressed
const escapeHandler = () => {
    if ((event.key) === "Escape") {
        const popupElements = Array.from(document.querySelectorAll(".popup"));
        popupElements.forEach((popupElement) => {
            popupElement.classList.remove("popup_state_opened");
        });
    }
}

/* popup handlers */

const popupHandler = (event, modal) => {
    event.preventDefault(); // This line stops the browser from submitting the form in the default way.
    modal.classList.toggle('popup_state_opened');

    //if the modal is open, add an eventlistener that closes the modal when esc is pressed,
    //otherwise remove this event listener
    if(modal.classList.contains('popup_state_opened')){
        document.addEventListener("keydown", escapeHandler);
    }else{
        document.removeEventListener("keydown", escapeHandler);
    }
}


//add handlers to buttons
editButton.addEventListener('click',(event)=>{popupHandler(event,popupEditProfile)});
closeButton.addEventListener('click',(event)=>{popupHandler(event,popupEditProfile)});
addButton.addEventListener('click',(event)=>{popupHandler(event,popupAddCard)});
closeAddButton.addEventListener('click',(event)=>{popupHandler(event,popupAddCard)});
closeImageButton.addEventListener('click',(event)=>{popupHandler(event,popupImage)});


/*   form handlers  */
const formSubmitHandler = (event) => {
    event.preventDefault(); 

    // Get the values of each field from the corresponding value property
    const name = nameInput.value;
    const description = descriptionInput.value;

    // Insert new values using the textContent property of the querySelector() method
    profileName.textContent = name;
    profileDescription.textContent = description;

    //close window after changing values
    popupHandler(event, popupEditProfile);
    
}


// Connect the handler to the form:
// it will watch the submit event
form.addEventListener('submit', formSubmitHandler);


/* CARDS */

/* asign DOM elements */
const cardGrid = document.querySelector(".elements");
const cardTemplate = "#card";

/* initial cards */

const initialCards = [
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

/* MODAL IMAGE */


//call addNewCard for each item in the initial card array
initialCards.forEach( (item) => {
    //addNewCard(item);
    const card = new Card(item, cardTemplate);
    cardGrid.prepend(card.createCard());
})


const addCardHandler = (event) => {
    event.preventDefault(); 
    // Get the values of each field from the corresponding value property
    const cardName = cardNameInput.value;
    const cardLink = cardURLInput.value;

    // Insert new values using the textContent property of the querySelector() method
    cardName.textContent = cardName;
    cardLink.textContent = cardLink;

    //create new card object and add it to the array
    const newCard = {};
    newCard.name = cardName;
    newCard.link = cardLink;
    addNewCard(newCard);

    //close window after changing values
    popupHandler(event, popupAddCard);
    
}

//add handler to card submit button
cardSubmitButton.addEventListener('click', addCardHandler);

//close popup by clicking outside of the form
const popupContainers = Array.from(document.querySelectorAll('.popup'));
    popupContainers.forEach((popupContainer) => {
        popupContainer.addEventListener("click",  (event) => {
            if(event.target === popupContainer){
                popupHandler(event, popupContainer);
            }
        });
});

export {popupHandler, popupImage};