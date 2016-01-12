import AuthActions from '../actions/authActions';

var _authState = {
  username: '',
  email: '',
  id: '',
  iconUrl: '',
  //0: read only, 1: logged in, 2: able to create T, 3: admin
  authLevel: 0
};

//currentReq = {authLevel: level, callback: callback}
var currentReq = {
  authLevel: 1,
  callback: null
};

class AuthService{

  //CAUTION If login intensely without other actions to do,
  //then send a null as callback, not undefined.
  //
  //Description: If not loggedin, save the request to currentReq,
  //    then show login dialog. After logged in, call requestAuth again to execute the callback
  //    If logged in and authLevel is not enough, then throw a warning.
  requestAuth(req){
    if (req) {
      currentReq = req;
    }

    if (_authState.authLevel === 0){
      if (currentReq.callback !== null){
        console.log('WARNING: [Not Logged in] You need to login to do it.');
      }
      AuthActions.showLogin();
      return;
    }
    if (_authState.authLevel >= currentReq.authLevel){
      if (typeof currentReq.callback === 'function'){
        //TODO validation callback. maybe undefined.
        currentReq.callback();
      };
      currentReq = null;
      return;
    }
    //TODO Handle Warning
    currentReq = null;
    console.log('WARNING: [Low AuthLevel] Try logout and login with a higher authlevel account.');
  }

  loginCancel(){
    //TODO Handle Warning
    currentReq = null;
    console.log('WARNING: [Login Cancelled]');
  }

  loginFail(){
    currentReq = null;
    console.log('WARNING: [Login Failed]');
  }

  loginSuccess(res){
    _authState = res;
    this.requestAuth();
  }

  logoutSuccess(){
    _authState = {
      username: 'test',
      email: '',
      id: '',
      iconUrl: '',
      authLevel: 0
    }
  }

  get authState(){
    return _authState;
  }
}

export default new AuthService();
