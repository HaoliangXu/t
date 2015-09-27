import AppDispatcher from '../dispatchers/appDispatcher.js';
import AuthConstants from "../constants/authConstants.js";

export default {

  //Show login dialog
  showLogin: function(callback) {
    AppDispatcher.handleViewAction({
      actionType: AuthConstants.SHOW_LOGIN
    });
  },

  dismissLogin: function(){
    AppDispatcher.handleViewAction({
      actionType: AuthConstants.DISMISS_LOGIN
    });
  },

  loginFail: function(){
    AppDispatcher.handleServerAction({
      actionType: AuthConstants.LOGIN_FAIL
    });
  },

  loginSuccess: function(res){
    console.log("loginSuccess");
    AppDispatcher.handleServerAction({
      actionType: AuthConstants.LOGIN_SUCCESS,
      res: res
    });
  },
/*
  loginUser: (jwt) => {
    var savedJwt = localStorage.getItem('jwt');

    AppDispatcher.dispatch({
      actionType: LOGIN_USER,
      jwt: jwt
    });

    if (savedJwt !== jwt) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

      RouterContainer.get().transitionTo(nextPath);
      localStorage.setItem('jwt', jwt);
    }
  },

  logoutUser: () => {
    RouterContainer.get().transitionTo('/login');
    localStorage.removeItem('jwt');
    AppDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
  */
};
