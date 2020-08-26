class Api{
  constructor({address, token},{callback}){
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