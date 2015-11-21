import AuthActions from '../actions/authActions';

var authState = {
  valid: false,//Support time limited auth
  username: '',
  id: 0,
  iconUrl: '',
  //0: read only, 1: logged in, able to create T, 2: admin
  authLevel: 0
};

// Valid currentReq = {level: level, callback: callback}
var currentReq;

class AuthService{

  //If login intensely without other actions to do, then send a empty req, not undefined.
  requestAuth(req){
    if (req) {
      currentReq = req;
    }
    if (authState.valid === false) {
      console.log('WARNING: [Not Logged in]');
      AuthActions.showLogin();
      return;
    }
    if (authState.authLevel >= currentReq.level) {
      currentReq.callback();//TODO validation callback. maybe undefined.
      currentReq = undefined;
      return;
    }
    //TODO Handle Warning
    currentReq = undefined;
    console.log('WARNING: [Low AuthLevel] Try logout and login with a higher authlevel account.');
  }

  authFail(){
    //TODO Handle Warning
    currentReq = undefined;
    console.log('WARNING: [Login Cancelled]');
  }

  loginSuccess(res){
    authState = res;
    authState.valid = true;
    this.requestAuth();
  }
/*
  Login(username, password) {
    return this.handleAuth(when(request({
      url: LOGIN_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
      }
    })));
  }

  logout() {
    LoginActions.logoutUser();
  }

  signup(username, password, extra) {
    return this.handleAuth(when(request({
      url: SIGNUP_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
      }
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var jwt = response.id_token;
        LoginActions.loginUser(jwt);
        return true;
      });
  }
  */
}

export default new AuthService();
