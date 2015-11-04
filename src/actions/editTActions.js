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

  removeGroup: function(groupIndex, stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.REMOVE_GROUP,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  moveGroupUp: function(groupIndex, stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.MOVE_GROUP_UP,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  moveGroupDown: function(groupIndex, stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.MOVE_GROUP_DOWN,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  copyGroup: function(groupData, groupIndex, stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.COPY_GROUP,
      groupData: groupData,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  editGroupInfo: function(groupInfo, groupIndex, stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.EDIT_GROUP_INFO,
      groupInfo: groupInfo,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  changeGroupPlayers: function(groupPlayers, groupIndex, stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.CHANGE_GROUP_PLAYERS,
      groupPlayers: groupPlayers,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  //TODO Could combine all group change actions to one action.
  //Then there will not be too many actions for scoreboard or matches,
  editScoreBoard: function(scores, groupIndex, stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.EDIT_SCOREBOARD,
      scores: scores,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  editMatches: function(matches, groupIndex, stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.EDIT_MATCHES,
      matches: matches,
      groupIndex: groupIndex,
      stageIndex: stageIndex
    });
  },

  editMatch: function(match){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.EDIT_MATCH,
      match: match
    });
  },

  editStageInfo: function(stageInfo, stageIndex){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.EDIT_STAGE_INFO,
      stageInfo: stageInfo,
      stageIndex: stageIndex
    });
  },

  editTInfo: function(TInfo){
    AppDispatcher.handleViewAction({
      actionType: EditTConstants.EDIT_T_INFO,
      TInfo: TInfo
    });
  }
};
