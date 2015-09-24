/*
 * Title: The model of the app manager, it holds app status
 * Description:
 * @start
 * @errHandler
 * @
 */

import AppDispatcher from "../dispatchers/appDispatcher.js";
import {EventEmitter} from "events";
import AppConstants from "../constants/appConstants";
import Comm from "../services/communicate.js";
import assign from "object-assign";

var END_SPLASH = "end_splash";
var splashState = Comm.reqSplash();
//Flag indicates app is ready to show, splash screen may unmount.
var appReady = false;

var SplashStore = assign({}, EventEmitter.prototype, {
  unregisterDispatcher: function(){
    AppDispatcher.unregister(this.dispatcherIndex);
  },

  getSplashState: function() {
    return splashState;
  },

  emitEndSplash: function(){
    this.emit(END_SPLASH);
  },

  /**
   * @param {function} callback
   */
  subscribe: function(callback) {
    this.on(END_SPLASH, callback);
  },

  /**
   * @param {function} callback
   */
  unsubscribe: function(callback) {
    this.removeListener(END_SPLASH, callback);
  }
});

SplashStore.dispatcherIndex = AppDispatcher.register(function(payload) {
  console.log("dispatching actions to splashStore");
  switch(payload.action.actionType) {
    case AppConstants.LOAD_PAGE:
      appReady = true;
      if (splashState.mode !== "non-intro") break;
      SplashStore.emitEndSplash();
      break;

    default:
      // no op
  }
});

export default SplashStore;
