import BaseStore from './BaseStore';
import AppConstants from '../constants/appConstants.js';

var _notice = '';

class NoticeStore extends BaseStore{

  constructor(){
    super();
    this.subscribe(function(payload){
      switch (payload.action.actionType){
        case AppConstants.SHOW_NOTICE:
          console.log( 'dispatching action ' + payload.action.actionType + ' to noticeStore' );
          _notice = payload.action.notice;
          this.emitChange();
          break;
        default:
          // no op

      }
    }.bind(this));
  }

  get notice(){
    return _notice;
  }

}

export default new NoticeStore();
