class Api{
  constructor({baseUrl, headers, body, method}){
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.token = this.headers.authorization;
    this.body = body;
    this.method = method;
  }

  getUser(path, User){
    return fetch(`${this.baseUrl}/${path}`,{
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
      //save data into a new User object
      const sessionUser = new User(data.name,data.about);
      //write user data to page
      sessionUser.writeUserInfo();
    }
      )
    .catch((err) => {
      console.log(err);
      });
  }

  getCards(path, User){
    return fetch(`${this.baseUrl}/${path}`,{
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
      //save data into a new User object
      const sessionUser = new User(data.name,data.about);
      //write user data to page
      sessionUser.writeUserInfo();
    }
      )
    .catch((err) => {
      console.log(err);
      });
  }
}


export {Api};