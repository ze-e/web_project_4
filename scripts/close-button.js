let closeButton = document.querySelector('.popup__close');
  
  closeButton.addEventListener('click', () =>{
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_state_opened');

    //fixme: added an unopened class, because display:none is overwriting diplay:flex in popup_opened
    popup.classList.add('popup_state_unopened');

    console.log(`${popup.classList}`);
    }
  );