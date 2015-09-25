import BaseStore from './BaseStore';
import AppConstants from "../constants/appConstants.js"

var pageContent = {};

class PageViewTStore extends BaseStore {

  constructor() {
    super();
    this.subscribe( function( payload ){
      console.log( "dispatching action " + payload.action.actionType + " to pageViewTStore" );
      switch ( payload.action.actionType ) {
        //When page load, the spinner reloads, hence set showSpinner to false as default
        case AppConstants.LOAD_PAGE:
          pageContent = payload.action.content;
          this.emitChange();
          break;
        default:
          // no op
      }
    }.bind(this));
  }

  get pageContent(){
    return pageContent;
  }

}

export default new PageViewTStore();
