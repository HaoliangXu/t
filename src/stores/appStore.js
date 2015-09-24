/*
 * Title: The model of the app manager, it holds app status
 * Description:
 * @start
 * @errHandler
 * @
 */

import AppDispatcher from "../dispatchers/appDispatcher.js";
import {EventEmitter} from "events";
import AppConstants from "../constants/appConstants.js";
import Router from "../services/router.js";
import Comm from "../services/communicate.js";
import assign from "object-assign";

Comm.reqPage(Router.parseCurrentRoute());
var PAGE_LOAD_EVENT = "pageLoad";
var pageState = {
  page: "vacancy"
};

var AppStore = assign({}, EventEmitter.prototype, {

  getPageState: function() {
    return pageState;
  },

  emitChange: function(){
    this.emit(PAGE_LOAD_EVENT);
  },

  /**
   * @param {function} callback
   */
  subscribe: function(callback) {
    this.on(PAGE_LOAD_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  unsubscribe: function(callback) {
    this.removeListener(PAGE_LOAD_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  switch(payload.action.actionType) {
    case AppConstants.LOAD_PAGE:
      console.log("dispatching action " + payload.action.actionType + " to appStore");
      pageState = payload.action.content;
      AppStore.emitChange();
      break;
    case AppConstants.WAIT_COMM:
      break;

    default:
      // no op
  }
});

export default AppStore;
