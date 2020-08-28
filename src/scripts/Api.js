class Api{
  constructor({baseUrl, token}){
    this.baseUrl = baseUrl;
    this.token = token;
  }

  getUser({callback}){
    return fetch(`${this.baseUrl}/users/me`,{
      headers: {
        authorization: this.token
        }
    })
    .then((res) => {
      if(res.ok){
        console.log(`getUser:${res.status}`);
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then( (data) => {  
      callback(data);
    })
    .catch((err) => {
      console.log(err);
      });
  }
  
  getInitialCards({callback}){
    return fetch(`${this.baseUrl}/cards`,{
      headers: {
        authorization: this.token
        }
    })
    .then((res) => {
      if(res.ok){
        console.log(`getInitialCards:${res.status}`);
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {  
      callback(data);
    })
    .catch((err) => {
      console.log(err);
      });
  }

  editProfile({method, contentType, name, about, callback}){
    return fetch(`${this.baseUrl}/users/me`,{
      method: method,
      headers: {
        authorization: this.token,
        "Content-Type": contentType
        },
        body: JSON.stringify({
          name: name,
          about: about
        })
    })
    .then((res) => {
      if(res.ok){
        console.log(`editProfile:${res.status}`);
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {  
      callback(data);
    })
    .catch((err) => {
      console.log(err);
      });
  }

  addCard({method, contentType, name, link, callback}){
    return fetch(`${this.baseUrl}/cards`,{
      method: method,
      headers: {
        authorization: this.token,
        "Content-Type": contentType
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
    })
    .then((res) => {
      if(res.ok){
        console.log(`addCard:${res.status}`);
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {  
      callback(data);
    })
    .catch((err) => {
      console.log(err);
      });
  }

  editLikes({method, contentType, cardId, callback}){
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`,{
      method: method,
      headers: {
        authorization: this.token,
        "Content-Type": contentType
        }
    })
    .then((res) => {
      if(res.ok){
        console.log(`addLike:${res.status}`);
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {  
      callback(data);
    })
    .catch((err) => {
      console.log(err);
      });
  }

////
}

export {Api};