let closeButton = document.querySelector('.popup__close');
  
  closeButton.addEventListener('click', () =>{
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_state_opened');

    console.log(`${popup.classList}`);
    }
  );