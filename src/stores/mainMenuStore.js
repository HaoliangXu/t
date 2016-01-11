import BaseStore from './BaseStore';
import AppConstants from '../constants/appConstants.js'
import AuthConstants from '../constants/authConstants.js';
import DialogAuthStore from '../stores/dialogAuthStore.js';
import Auth from '../services/auth.js';
import AppDispatcher from '../dispatchers/appDispatcher.js';

var _mainMenuState = {
  triggerShow: false,
  user: {},
  menuItems: [
    {route: 'currentUser', text: 'Guest'},
    {route: 'login', text: 'Login'},
    {route: 'discover', text: 'Discover'},
    {route: 'calendar', text: 'Calendar'},
    {route: 'likes', text: 'Likes'},
    {route: 'msg', text: 'Messages'},
    {route: 'forums', text: 'Forums'},
    {route: 'settings', text: 'Settings'},
    {route: 'about', text: 'About'}
  ]
};

class MainMenuStore extends BaseStore{

  constructor(){
    super();
    this.subscribe(function(payload){
      switch (payload.action.actionType) {
        case AppConstants.SHOW_MAINMENU:
          console.log('dispatching action ' + payload.action.actionType + ' to MainMenuStore');
          _mainMenuState.triggerShow = true;
          this.emitChange();
          _mainMenuState.triggerShow = false;
          break;
        case AuthConstants.LOGIN_SUCCESS:
          AppDispatcher.waitFor([DialogAuthStore._dispatchToken]);
          _mainMenuState.menuItems[0].text = Auth.authState.username;
          _mainMenuState.menuItems[1] = {route: 'logout', text: 'Logout'};
          this.emitChange();
          break;
        case AuthConstants.LOGOUT_SUCCESS:
          Auth.logoutSuccess();
          _mainMenuState.menuItems[0].text = 'Guest';
          _mainMenuState.menuItems[1] = {route: 'login', text: 'Login'};
          this.emitChange();
          break;
        default:
          // no op

      }
    }.bind(this));
  }

  get mainMenuState(){
    return _mainMenuState;
  }

}

export default new MainMenuStore();
