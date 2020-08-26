class Api{
  constructor({address, token},callback){
    this.address = address;
    this.token = token;
    this.callback = callback;
    return this.getResponse();
  }

  getResponse(){
    return fetch(this.address,{
      headers: {
        authorization: this.token
        }
    })
    .then((res)=>{
      if(res.ok){
        this.callback;
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  loadUser(){
    console.log(session);
    console.log(`name:${session.name},about:${session.about}`);
    const sessionUser = new User(session.name,session.about);
    sessionUser.writeUserInfo();
  }
}


export {Api};