import AppDispatcher from "../dispatchers/appDispatcher.js";
import AppConstants from "../constants/appConstants.js";
var AppActions = {

  /**
   * @param  {json} content
   *
   */
  loadPage: function(content) {
    AppDispatcher.handleServerAction({
      actionType: AppConstants.LOAD_PAGE,
      content: content
    });
  },

  /**
   * @param  {string} page The name of the page to show
   * @param  {object} req the Comm request for the page content
   */
  switchPage: function(page) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SWITCH_PAGE,
      page: page
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  showSpinner: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.WAIT_COMM
    });
  },

  /**
   * create a new T, with showing a dialog first.
   */
  createT: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CREATE_T
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: AppConstants.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: AppConstants.TODO_DESTROY_COMPLETED
    });
  }

};

export default AppActions;
