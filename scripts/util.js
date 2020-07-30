const openModalImage = (event, link, name) => {
  //open card in modal window
  const popupImage = document.querySelector('.popup_type_image');
  const image = popupImage.querySelector('.popup__image');
  image.src = link;
  image.alt = name;

  popupImage.querySelector('.popup__image-caption').textContent = name;
  popupHandler(event, popupImage);
}

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

//close modal when escape is pressed
const escapeHandler = () => {
  if ((event.key) === "Escape") {
      const popupElements = Array.from(document.querySelectorAll(".popup"));
      popupElements.forEach((popupElement) => {
          popupElement.classList.remove("popup_state_opened");
      });
  }
}

export {popupHandler, openModalImage, escapeHandler};