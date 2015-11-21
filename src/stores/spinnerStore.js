import BaseStore from './BaseStore';
import AppConstants from '../constants/appConstants.js';

//Indicate whether to show the spinner.
var _showSpinner = false;

class SpinnerStore extends BaseStore{

  constructor(){
    super();
    this.subscribe(function(payload){
      switch (payload.action.actionType){
        case AppConstants.SHOW_SPINNER:
          _showSpinner = true;
          this.emitChange();
          break;
        case AppConstants.HIDE_SPINNER:
          _showSpinner = false;
          this.emitChange();
          break;
        //When page load, the spinner reloads, hence set _showSpinner to false as default
        case AppConstants.LOAD_PAGE:
          _showSpinner = false;
          this.emitChange();
          break;
        default:
          // no op

      }
    }.bind(this));
  }

  get showSpinner(){
    return _showSpinner;
  }

}

export default new SpinnerStore();
