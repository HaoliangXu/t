import BaseStore from './BaseStore';
import AuthConstants from '../constants/authConstants.js';
import Auth from '../services/auth.js';

//Indicate whether to show the spinner.
var _showDialog = false;
//TODO Flags are better way to config component updating
/*
var _flags = {
  showDialog: false;
  showSpinner: false;
  rerender: false;
  tips: false;
}
*/
var _msg = {
  type: '',
  text: ''
};

class DialogAuthStore extends BaseStore {

  constructor(){
    super();
    this.subscribe(function(payload){
      switch (payload.action.actionType) {
        case AuthConstants.SHOW_LOGIN:
          _showDialog = true;
          this.emitChange();
          break;
        case AuthConstants.LOGIN_SUCCESS:
          _showDialog = false;
          Auth.loginSuccess(payload.action.res);
          this.emitChange();
          break;
        case AuthConstants.LOGIN_FAIL:
          //TODO handle error text
          _msg.type = 'Error';
          _msg.text = 'Login failed, try other username or password.';
          this.emitChange();
          _msg.type = '';
          Auth.loginFail();
          break;
        case AuthConstants.DISMISS_LOGIN:
          Auth.loginCancel();
          break;
        default:
          // no op

      }
    }.bind(this));
  }

  get showDialog(){
    return _showDialog;
  }

  get msg(){
    return _msg;
  }

}

export default new DialogAuthStore();
