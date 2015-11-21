import BaseStore from './BaseStore';
import AppConstants from '../constants/appConstants.js';

var pageContent = {};

class PageViewTStore extends BaseStore{

  constructor() {
    super();
    this.subscribe(function(payload){
      switch (payload.action.actionType){
        case AppConstants.LOAD_PAGE:
          console.log('dispatching action ' + payload.action.actionType + ' to pageViewTStore');
          if (payload.action.content.page !== 'viewT') {
            break;
          }
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
