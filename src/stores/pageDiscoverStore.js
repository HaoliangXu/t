/*
 * Title: pageDiscover store
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

var CHANGE_EVENT = "change";
var lists = {};

var PageDiscoverStore = assign({}, EventEmitter.prototype, {

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
  },

});

AppDispatcher.register(function(payload) {
  console.log("dispatching action " + payload.action.actionType + " to pageDiscoverStore");
  switch(payload.action.actionType) {
    case AppConstants.UPDATE_DISCOVER:
      break;
    case AppConstants.SHOW_SPINNER:

      break;
    default:
      // no op
  }
});

export default PageDiscoverStore;
