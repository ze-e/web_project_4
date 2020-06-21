let closeButton = document.querySelector('.popup__close');
  
  closeButton.addEventListener('click', () =>{
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_unopened');

    console.log(`${popup.classList}`);
    }
  );