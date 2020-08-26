class Api{
  constructor({baseUrl, headers, body, method}){
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.body = body;
    this.method = method;
  }

  getUser({User}){
    return fetch(this.address,{
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

  getInitialCards(){
    return fetch(this.address,{
      method: this.method,
      headers: {
        authorization: this.token,
        "Content-Type" : this.headers.contentType
        },
      body: JSON.stringify({
          name: this.headers.name,
          about: this.headers.about
        })
      })
    .then((res)=>{
      if(res.ok){
        console.log(`res:${res}`);
        this.callback;
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
      });
  }
}


export {Api};