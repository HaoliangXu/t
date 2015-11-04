import BaseStore from './BaseStore';
import AppConstants from '../constants/appConstants.js';
import EditTConstants from '../constants/editTConstants.js';

//TODO Directly save payload.action.content and pass it to component
var _match = {};
var _flags = {
  editMode: false
};

class PageMatchStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(function(payload){
      switch (payload.action.actionType) {
        case AppConstants.LOAD_PAGE:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageMatchStore' );
          if (payload.action.content.page !== 'match') {
            break;
          }
          _match = payload.action.content.match;
          _flags.editMode = payload.action.content.editMode;
          this.emitChange();
          break;
        default:
          // no op
      }
    }.bind(this));
  }

  get match(){
    return _match;
  }

  get editMode(){
    return _flags.editMode;
  }
}

export default new PageMatchStore();
