import BaseStore from './BaseStore';
import AppConstants from '../constants/appConstants.js'

var mainMenuState = {
  triggerShow: false,
  user: {}
};

class MainMenuStore extends BaseStore{

  constructor(){
    super();
    this.subscribe(function(payload){
      switch (payload.action.actionType) {
        case AppConstants.SHOW_MAINMENU:
          console.log( 'dispatching action ' + payload.action.actionType + ' to MainMenuStore' );
          mainMenuState.triggerShow = true;
          this.emitChange();
          mainMenuState.triggerShow = false;
          break;
        default:
          // no op

      }
    }.bind(this));
  }

  get mainMenuState(){
    return mainMenuState;
  }

}

export default new MainMenuStore();
