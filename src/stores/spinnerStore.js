import BaseStore from './BaseStore';
import AppConstants from "../actions/appActions.js"

var showSpinner = false;

class SpinnerStore extends BaseStore {

  constructor() {
    super();
    this.subscribe( function( payload ){
      console.log( "dispatching action " + payload.action.actionType + " to spinnerStore" );
      switch ( payload.action.actionType ) {
        case AppConstants.SHOW_SPINNER:
          showSpinner = true;
          SpinnerStore.emitChange();
          break;
        case AppConstants.HIDE_SPINNER:
          showSpinner = false;
          SpinnerStore.emitChange();
          break;
        //When page load, the spinner reloads, hence set showSpinner to false as default
        case AppConstants.LOAD_PAGE:
          showSpinner = false;
          break;
        default:
          // no op

      }
    });
  }

  get showSpinner(){
    return showSpinner;
  }

}

export default new SpinnerStore();
