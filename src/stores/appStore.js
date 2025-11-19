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
import assign from 'object-assign';
import Router from '../services/router.js';

var CHANGE_EVENT = 'change';
var page = 'vacancy';
var pageData = {};

var AppStore = assign({}, EventEmitter.prototype, {

  getPage: function(){
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
      Router.nextPage(page);
      AppStore.emitChange();
      break;
    case AppConstants.LAST_PAGE:
      console.log('dispatching action ' + payload.action.actionType + ' to appStore');
      pageData = Router.lastPage();
      page = pageData.page;
      AppStore.emitChange();
      break;
    case AppConstants.SWITCH_PAGE:
      console.log('dispatching action ' + payload.action.actionType + ' to appStore');
      page = payload.action.page;
      Router.switchPage(page);
      AppStore.emitChange();
      break;
    case AppConstants.UPDATE_HISTORY_CONTENT:
      console.log('dispatching action ' + payload.action.actionType + ' to appStore');
      //TEST: the content may change automatically without updates while LOAD_PAGE, because it is a reference. Not sure.
      Router.loadPage(payload.action.content);
      break;
    case AppConstants.SHOW_SPINNER:
      break;
    default:
      // no op
  }
});

export default AppStore;
