class Api{
  constructor({baseUrl, token}){
    this.baseUrl = baseUrl;
    this.token = token;
  }

  createUser({callback}){
    return fetch(`${this.baseUrl}/users/me`,{
      headers: {
        authorization: this.token
        }
    })
    .then((res) => {
      if(res.ok){
        console.log(`res:${res}`);
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
        console.log(`res:${res}`);
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

  editProfile({method, contentType, name, about, user, callback}){
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
        console.log(`res:${res}`);
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



//
}

export {Api};