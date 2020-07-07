/* MODAL FORMS */

/* asign DOM elements */
//assigning all DOM elements at the beginning optimizes performance

//popup handler
const popup_editProfile = document.querySelector('.popup_type_edit-profile');
const popup_addCard = document.querySelector('.popup_type_add-card');
const popup_image = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close_type_edit-profile');
const addButton = document.querySelector('.profile__add-button');
const closeAddButton = document.querySelector('.popup__close_type_add-card');
const closeImageButton = document.querySelector('.popup__close_type_image');


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

function popupHandler(evt, modal){

    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
    modal.classList.toggle('popup_state_opened');

}


//add handlers to buttons
editButton.addEventListener('click',()=>{popupHandler(event,popup_editProfile)});
closeButton.addEventListener('click',()=>{popupHandler(event,popup_editProfile)});
addButton.addEventListener('click',()=>{popupHandler(event,popup_addCard)});
closeAddButton.addEventListener('click',()=>{popupHandler(event,popup_addCard)});
closeImageButton.addEventListener('click',()=>{popupHandler(event,popup_image)});


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
    popupHandler(evt, popup_editProfile);

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

/* this renderCards function allows the script to easily accept an array of places from
a database or API, and manipulate them using normal array functions such as push, shift, etc. */

function renderCards(cards){
    //clear cards
    cardGrid.innerHTML= '';

    //add cards
    cards.forEach( (item, index) => {
        const newCard = cardTemplate.cloneNode(true).content;
        newCard.querySelector(".element__title").textContent = item.name;
        const cardImage = newCard.querySelector(".element__image");
        cardImage.style.backgroundImage = 'url(' + item.link + ')';
        //add eventListener to image
        cardImage.addEventListener('click',()=>{openModalImage(event,item)});

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
    const cardLink = cardURLInput.value;

    // Insert new values using the textContent property of the querySelector() method
    cardName.textContent = cardName;
    cardLink.textContent = cardLink;

    //create new card object and add it to the array
    const newCard = {};
    newCard.name = cardName;
    newCard.link = cardLink;
    cardList.unshift(newCard);
    renderCards(cardList);

    //close window after changing values
    popupHandler(evt, popup_addCard);
}

/* MODAL IMAGE */
function openModalImage(evt,item){
    const image = popup_image.querySelector('.popup__image');
    image.src = item.link;
    image.alt = item.name;

    popup_image.querySelector('.popup__image-caption').textContent = item.name;
    popupHandler(event,popup_image);
}

/* Don't display broken images */
function imgError(image){
    image.src = "./images/element/default.jpg";
}