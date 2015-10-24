import AppDispatcher from '../dispatchers/appDispatcher.js';
import EditTConstants from '../constants/editTConstants.js';

export default {

  addStage: function(stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.ADD_STAGE,
      stageIndex: stageIndex
    });
  },

  removeStage: function(stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.REMOVE_STAGE,
      stageIndex: stageIndex
    });
  },

  toggleStage: function(stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.TOGGLE_STAGE,
      stageIndex: stageIndex
    });
  },

  /*********************
   * @param String Type of the group to be set
   * @param Number Numer of players or matches (depends on type) in the group
   * @param Number Index of the group in its stage
   * @param Number Index of the stage of the T
   *********************/
  setGroupFormat: function( format, number, groupIndex, stageIndex ) {
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.SET_GROUP_FORMAT,
      format: format,
      number: number,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  addGroup: function(groupIndex, stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.ADD_GROUP,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  removeGroup: function( groupIndex, stageIndex ){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.REMOVE_GROUP,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  moveGroupUp: function( groupIndex, stageIndex ){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.MOVE_GROUP_UP,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  moveGroupDown: function( groupIndex, stageIndex ){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.MOVE_GROUP_DOWN,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  copyGroup: function( groupData, groupIndex, stageIndex ){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.COPY_GROUP,
      groupData: groupData,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  }
};
