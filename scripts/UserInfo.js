class UserInfo{
  constructor(username, userjob){
    this._username = username;
    this._userjob = userjob;
  }

  getUserInfo(){
    const userInfo = {
      name : this._username,
      job: this._userjob
    };
    return userInfo;
  }

  setUserInfo(name, job){
    this._username = name;
    this._userjob = job;
  }

}

export {UserInfo}