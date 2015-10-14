import AppDispatcher from '../dispatchers/appDispatcher.js';
import EditTConstants from '../constants/editTConstants.js';

export default {

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

  addGroup: function( group, groupIndex, stageIndex ){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.ADD_GROUP,
      group: group,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  addStage: function( stage, stageIndex ){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.ADD_STAGE,
      stage: stage,
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
  },

  saveT: function(){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.SAVE_T
    });
  }
};
