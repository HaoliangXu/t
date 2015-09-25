import BaseStore from './BaseStore';
import AppConstants from "../constants/appConstants.js"

var showSpinner = false;

class SpinnerStore extends BaseStore {

  constructor() {
    super();
    this.subscribe( function( payload ){
      console.log( "dispatching action " + payload.action.actionType + " to spinnerStore" );
      switch ( payload.action.actionType ) {
        case AppConstants.SHOW_SPINNER:
          showSpinner = true;
          this.emitChange();
          break;
        case AppConstants.HIDE_SPINNER:
          showSpinner = false;
          this.emitChange();
          break;
        //When page load, the spinner reloads, hence set showSpinner to false as default
        case AppConstants.LOAD_PAGE:
          showSpinner = false;
          this.emitChange();
          break;
        default:
          // no op

      }
    }.bind(this));
  }

  get showSpinner(){
    return showSpinner;
  }

}

export default new SpinnerStore();
