/*
 * Title: The model of the app manager, it holds app status
 * Description:
 * @start
 * @errHandler
 * @
 */

import AppDispatcher from '../dispatchers/appDispatcher.js';
import {EventEmitter} from 'events';
import AppConstants from '../constants/appConstants';
import Comm from '../services/communicate.js';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';
var splashState = Comm.reqSplash();
//Flag indicates app is ready to show, splash screen may unmount.
var appReady = false;

var SplashStore = assign({}, EventEmitter.prototype,{
  unregisterDispatcher: function(){
    AppDispatcher.unregister(this.dispatcherIndex);
  },

  getSplashState: function(){
    return splashState;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

SplashStore.dispatcherIndex = AppDispatcher.register(function(payload){
  switch(payload.action.actionType){
    case AppConstants.LOAD_PAGE:
      appReady = true;
      if (splashState.mode !== 'non-intro'){
        break;
      }
      SplashStore.emitChange();
      break;

    default:
      // no op
  }
});

export default SplashStore;
