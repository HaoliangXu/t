/*
 * Title: The model of the app manager, it holds app status
 * Description:
 * @start
 * @errHandler
 * @
 */

import AppDispatcher from '../dispatchers/appDispatcher.js';
import {EventEmitter} from 'events';
import AppConstants from '../constants/appConstants.js';
import AppActions from '../actions/appActions.js';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';
var page = 'vacancy';
var pageData = {};
//Record history of page the user open, for opening to last page by click 'back' button.
var _historyChain = [];
var HistoryStore = function(){
  this.nextPage = function( pageName ){
    _historyChain.unshift({
      page: pageName,
      content: {}
    });
  };
  this.lastPage = function(){
    if ( _historyChain.length > 1 ) {
      _historyChain.shift();
    }
    return _historyChain[0];
  };
  this.switchPage = function( pageName ){
    _historyChain = [{
      page: pageName,
      content: {}
    }];
  };
  this.loadPage = function( content, index = 0 ){
    _historyChain[index].content = content;
  };
};
var historyStore = new HistoryStore();

var AppStore = assign({}, EventEmitter.prototype, {

  getPage: function() {
    return page;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  switch(payload.action.actionType) {
    case AppConstants.NEXT_PAGE:
      console.log('dispatching action ' + payload.action.actionType + ' to appStore');
      page = payload.action.page;
      historyStore.nextPage( page );
      AppStore.emitChange();
      break;
    case AppConstants.LAST_PAGE:
      console.log('dispatching action ' + payload.action.actionType + ' to appStore');
      pageData = historyStore.lastPage();
      console.log(pageData);
      page = pageData.page;
      AppStore.emitChange();
      //TODO setTimeout is not a good logic for this action
      //More importantly, a store should not trigger any actions.
      window.setTimeout(AppActions.loadPage.bind( undefined, pageData.content ), 0);
      window.setTimeout(AppActions.updateHistoryContent.bind( undefined, pageData.content ), 0);
      break;
    case AppConstants.SWITCH_PAGE:
      page = payload.action.page;
      historyStore.switchPage( page );
      AppStore.emitChange();
      break;
    case AppConstants.UPDATE_HISTORY_CONTENT:
      //TEST: the content may change automatically without updates while LOAD_PAGE, because it is a reference. Not sure.
      if ( _historyChain[0].page === payload.action.content.page ){
        historyStore.loadPage( payload.action.content );
      }
      console.log(payload.action.content);
      break;
    case AppConstants.SHOW_SPINNER:
      break;


    default:
      // no op
  }
});

export default AppStore;
