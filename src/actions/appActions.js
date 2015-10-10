import AppDispatcher from '../dispatchers/appDispatcher.js';
import AppConstants from '../constants/appConstants.js';
var AppActions = {

  /**
  * @param  {JSON} page content
   *
   */
  loadPage: function(content) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.LOAD_PAGE,
      content: content
    });
  },

  /**
   * Switch to a page and clear historyChain.
   * @param  {string} page The name of the page to show
   */
  switchPage: function(page) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SWITCH_PAGE,
      page: page
    });
  },

  /**
   * @param  {String} page The name of the page to show
   */
  nextPage: function(page) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.NEXT_PAGE,
      page: page
    });
  },

  /**
   * Navigate to last page.
   */
  lastPage: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LAST_PAGE
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  showSpinner: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SHOW_SPINNER
    });
  },

  hideSpinner: function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.HIDE_SPINNER
    });
  },

  showNotice: function(notice){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SHOW_NOTICE,
      notice: notice
    });
  },

//////////////////////////////////////////////
//  Menu actionS
////////////////////////////////////////////
  showMainMenu: function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SHOW_MAINMENU
    });
  },


  hideMainMenu: function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.HIDE_MAINMENU
    });
  },

  updateHistoryContent: function(content){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_HISTORY_CONTENT,
      content: content
    });
  }
};

export default AppActions;
