let editButton = document.querySelector('.profile__edit-button');
  
  editButton.addEventListener('click', () => {
    let popup = document.querySelector('.popup');
    popup.classList.toggle('popup_state_opened');

    console.log(`${popup.classList}`);
    }
  );
