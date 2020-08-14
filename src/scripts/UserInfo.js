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

  writeUserInfo(){
    const _profileName = document.querySelector('.profile__name');
    const _profileDescription = document.querySelector('.profile__description'); 
    _profileName.textContent = this._username;
    _profileDescription.textContent = this._userjob; 
  }

}

export {UserInfo}