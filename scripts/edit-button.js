let editButton = document.querySelector('.profile__edit-button');
  
  editButton.addEventListener('click', () => {
    let popup = document.querySelector('.popup');
    popup.classList.toggle('popup_state_opened');
    //fixme: added an unopened class, because display:none is overwriting diplay:flex in popup_opened
    popup.classList.toggle('popup_state_unopened');

    console.log(`${popup.classList}`);
    }
  );
