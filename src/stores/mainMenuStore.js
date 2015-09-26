import BaseStore from './BaseStore';
import AppConstants from "../constants/appConstants.js"

var mainMenuState = {
  show: false,
  user: {}
}

class MainMenuStore extends BaseStore {

  constructor() {
    super();
    this.subscribe( function( payload ){
      console.log( "dispatching action " + payload.action.actionType + " to MainMenuStore" );
      switch ( payload.action.actionType ) {
        case AppConstants.TOGGLE_MAINMENU:
          mainMenuState.show = mainMenuState.show ? false : true ;
          MainMenuStore.emitChange();
        default:
          // no op

      }
    }.bind( this ));
  }

  get mainMenuState(){
    return mainMenuState;
  }

}

export default new MainMenuStore();
