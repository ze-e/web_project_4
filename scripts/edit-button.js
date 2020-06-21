let editButton = document.querySelector('.profile__edit-button');
  
  editButton.addEventListener('click', () => {
    let popup = document.querySelector('.popup');
    popup.classList.toggle('popup_opened');
    popup.classList.toggle('popup_unopened');

    console.log(`${popup.classList}`);
    }
  );
