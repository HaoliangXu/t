import AppDispatcher from '../dispatchers/appDispatcher.js';
import AuthConstants from '../constants/authConstants.js';

export default {

  // Show login dialog
  showLogin: function(){
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
    AppDispatcher.handleServerAction({
      actionType: AuthConstants.LOGIN_SUCCESS,
      res: res
    });
  },

  logoutSuccess: function(){
    AppDispatcher.handleServerAction({
      actionType: AuthConstants.LOGOUT_SUCCESS
    });
  }
};
