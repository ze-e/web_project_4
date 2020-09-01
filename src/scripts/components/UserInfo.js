class UserInfo{
  constructor(username, userjob, userId, avatar){
    this._username = username;
    this._userjob = userjob;
    this._userId = userId;
    this._avatar = avatar;
  }

  getUserInfo(){
    const userInfo = {
      name : this._username,
      job: this._userjob,
      id: this._userId,
      avatar: this._avatar
    };
    return userInfo;
  }

  setUserInfo({name = this._username, job = this._userjob, userId = this._userId, avatar = this._avatar}){
    this._username = name;
    this._userjob = job;
    this._userId = userId;
    this._avatar = avatar;

    this.writeUserInfo();
  }

  writeUserInfo(){
    const _profileName = document.querySelector('.profile__name');
    const _profileDescription = document.querySelector('.profile__description');
    const _avatar = document.querySelector('.profile__image'); 
    _profileName.textContent = this._username;
    _profileDescription.textContent = this._userjob; 
    _avatar.src = this._avatar;
  }

}

export {UserInfo}