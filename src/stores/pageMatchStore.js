import BaseStore from './BaseStore';
import AppConstants from '../constants/appConstants.js';
import EditTConstants from '../constants/editTConstants.js';

//TODO Directly save payload.action.content and pass it to component
var _pageContent;

class PageMatchStore extends BaseStore{

  constructor() {
    super();
    this.subscribe(function(payload){
      switch (payload.action.actionType){
        case AppConstants.LOAD_PAGE:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageMatchStore' );
          if (payload.action.content.page !== 'match') {
            break;
          }
          _pageContent = payload.action.content;
          this.emitChange();
          break;
        case EditTConstants.EDIT_MATCH:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageMatchStore' );
          _pageContent.match = payload.action.match;
          this.emitChange();
          break;
        default:
          // no op
      }
    }.bind(this));
  }

  get pageContent(){
    return _pageContent;
  }
}

export default new PageMatchStore();
