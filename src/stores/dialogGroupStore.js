/*
 * Title: The model of the app manager, it holds app status
 * Description:
 * @start
 * @errHandler
 * @
 */

import AppDispatcher from "../dispatcher/appDispatcher";
import {EventEmitter} from "events";
import AppConstants from "../constants/appConstants";
import Router from "../services/router.js";
import Comm from "../services/communicate.js";
import assign from "object-assign";

//dialogs = ["createT", "listFilter", "TPaticipants", "TInfo"];
var dialogState = {
  show: "createT"
};

var CHANGE_EVENT = "change";

var DialogGroupStore = assign({}, EventEmitter.prototype, {

  getDialogState: function() {
    return dialogState;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  subscribe: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  unsubscribe: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  switch(payload.action.actionType) {
    case AppConstants.CREATE_T:
      console.log("dispatching action " + payload.action.actionType + " to dialogStore");
      dialogState = {
        show: "createT",
      };
      DialogGroupStore.emitChange();
      break;

    default:
      // no op
  }
});

export default DialogGroupStore;
