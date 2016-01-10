import AuthActions from '../actions/authActions';

var _authState = {

  loggedIn: false,
  email: '',
  id: '',
  iconUrl: '',
  //0: read only, 1: logged in, 2: able to create T, 3: admin
  authLevel: 0
};

//currentReq = {level: level, callback: callback}
var currentReq;

class AuthService{

  //If login intensely without other actions to do, then send a empty req, not undefined.
  requestAuth(req){
    if (req) {
      currentReq = req;
    }

    if (_authState.loggedIn === false){
      console.log('WARNING: [Not Logged in]');
      AuthActions.showLogin();
      return;
    }

    if (_authState.authLevel >= currentReq.authLevel){
      currentReq.callback();//TODO validation callback. maybe undefined.
      currentReq = undefined;
      return;
    }
    //TODO Handle Warning
    currentReq = undefined;
    console.log('WARNING: [Low AuthLevel] Try logout and login with a higher authlevel account.');
  }

  loginCancel(){
    //TODO Handle Warning
    currentReq = undefined;
    console.log('WARNING: [Login Cancelled]');
  }

  loginFail(){
    currentReq = undefined;
    console.log('WARNING: [Login Failed]');
  }

  loginSuccess(res){
    _authState = res;
    _authState.loggedIn = true;
    this.requestAuth();
  }
}

export default new AuthService();
