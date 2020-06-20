document.addEventListener("DOMContentLoaded", function(){
  let editButton = document.querySelector('.profile__edit-button');
  console.log(`${editButton.classList}`);
  
  editButton.addEventListener('click', function popupOpen(){
    let popup = document.querySelector('.popup');
    popup.classList.toggle('popup_unopened');
    popup.classList.toggle('popup_opened');
    console.log(`${popup.classList}`);
    }
  );
});
