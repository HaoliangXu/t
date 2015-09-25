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
import assign from "object-assign";

var CHANGE_EVENT = "change";
var page = "vacancy";

var AppStore = assign({}, EventEmitter.prototype, {

  getPage: function() {
    return page;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  switch(payload.action.actionType) {
    case AppConstants.SWITCH_PAGE:
      console.log("dispatching action " + payload.action.actionType + " to appStore");
      page = payload.action.page;
      AppStore.emitChange();
      break;
    case AppConstants.SHOW_SPINNER:
      break;


    default:
      // no op
  }
});

export default AppStore;
