document.addEventListener("DOMContentLoaded", function(){
  let closeButton = document.querySelector('.popup__close');
  console.log(`${closeButton.classList}`);
  
  closeButton.addEventListener('click', function popupOpen(){
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_unopened');
    console.log(`${popup.classList}`);
    }
  );
});
