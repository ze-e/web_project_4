class UserInfo{
  constructor(username, userjob, userId){
    this._username = username;
    this._userjob = userjob;
    this._userId = userId;
  }

  getUserInfo(){
    const userInfo = {
      name : this._username,
      job: this._userjob,
      id: this._userId
    };
    return userInfo;
  }

  setUserInfo(name, job){
    this._username = name;
    this._userjob = job;
  }

  writeUserInfo(){
    const _profileName = document.querySelector('.profile__name');
    const _profileDescription = document.querySelector('.profile__description'); 
    _profileName.textContent = this._username;
    _profileDescription.textContent = this._userjob; 
  }

}

export {UserInfo}