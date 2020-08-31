class Api{
  constructor({baseUrl, token}){
    this.baseUrl = baseUrl;
    this.token = token;
  }
  
  /* HELPER FUNCTIONS */
  loading(isLoading, element, originalText){
    if(isLoading){
      element.textContent = "Loading..."
    }
    else{
      element.textContent = originalText;
    }
  }

  /* API FUNCTIONS */
  getUser(){
    return fetch(`${this.baseUrl}/users/me`,{
      headers: {
        authorization: this.token
        }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
    .catch((err) => {
      console.log(err);
      });
  }
  
  getInitialCards(){
    return fetch(`${this.baseUrl}/cards`,{
      headers: {
        authorization: this.token
        }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
    .catch((err) => {
      console.log(err);
      });
  }

  editProfile({name, about, element, originalText}){
    this.loading(true, element, originalText);
    return fetch(`${this.baseUrl}/users/me`,{
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
    .catch((err) => {
      console.log(err);
      })
    .finally(() => {
      this.loading(false, element, originalText);
    });
  }

  editAvatar({link, element, originalText}){
    this.loading(true, element, originalText);
    return fetch(`${this.baseUrl}/users/me/avatar`,{
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          avatar: link
        })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`editAvatar Error: ${res.statusText}`);
    })
    .catch((err) => {
      console.log(err);
      })
    .finally(() => {
      this.loading(false, element, originalText);
    });
  }

  addCard({name, link, element, originalText}){
    this.loading(true, element, originalText);
    return fetch(`${this.baseUrl}/cards`,{
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
    .catch((err) => {
      console.log(err);
      })
    .finally(() => {
      this.loading(false, element, originalText);
    });
  }

  deleteCard({cardId}){
    return fetch(`${this.baseUrl}/cards/${cardId}`,{
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`Error: ${res.statusText}`);
    })
    .catch((err) => {
      console.log(err);
      });
  }

  addLike({cardId}){
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{
      method: "PUT",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`editLikes Error: ${res.statusText}`);
    })
    .catch((err) => {
      console.log(err);
      });
  }

  deleteLike({cardId}){
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
        }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject(`editLikes Error: ${res.statusText}`);
    })
    .catch((err) => {
      console.log(err);
      });
  }

////
}

export {Api};