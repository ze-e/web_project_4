class Api{
  constructor(options){
    this.options = options;
  }

  getUser(){
    return;
  }

  getCards(){
    fetch(options.url)
      .then((res)=>{
        if(res.ok){
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editProfile(){
    return;
  }

  editAvatar(){
    return;
  }

  addCard(){
    return;
  }

  getLikes(){
    return;
  }

  addLike(){
    return;
  }

  removeLike(){
    return;
  }

  deleteCard(){
    return;
  }
}