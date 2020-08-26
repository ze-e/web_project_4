class Api{
  constructor({options}){
    this.address = options.address;
    this.token = options.token;
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