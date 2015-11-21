import BaseStore from './BaseStore';
import AppConstants from '../constants/appConstants.js';
import EditTConstants from '../constants/editTConstants.js';

var _flags = {
  // TODO Indecates whether the T is edited, to determine to save T or not when leaving.
  modified: false,
  editMode: false
};
var Tjson;

class PageEditTStore extends BaseStore {

  constructor(){
    super();
    this.subscribe(function(payload){
      switch (payload.action.actionType){
        case AppConstants.LOAD_PAGE:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          if (payload.action.content.page !== 'editT'){
            break;
          }
          Tjson = payload.action.content.Tjson;
          _flags.editMode = payload.action.content.editMode;
          _flags.modified = payload.action.content.modified;
          this.emitChange();
          break;
        case EditTConstants.ADD_STAGE:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          //Add stage into Tjson
          Tjson.stages.splice(payload.action.stageIndex, 0, payload.action.stage);
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.REMOVE_STAGE:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          Tjson.stages.splice(
            payload.action.stageIndex, 1
          );
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.TOGGLE_STAGE:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          Tjson.stages[payload.action.stageIndex].expand = !Tjson.stages[payload.action.stageIndex].expand;
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.SET_GROUP_FORMAT:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          Tjson.stages[payload.action.stageIndex].groups[payload.action.groupIndex] = payload.action.format
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.ADD_GROUP:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          //Add group into Tjson
          Tjson.stages[payload.action.stageIndex].groups.splice(
            payload.action.groupIndex, 0, payload.action.group
          );
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.REMOVE_GROUP:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          Tjson.stages[payload.action.stageIndex].groups.splice(
            payload.action.groupIndex, 1
          );
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.MOVE_GROUP_UP:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          if (!payload.action.groupIndex) {
            break;
          }
          let groups1 = Tjson.stages[payload.action.stageIndex].groups;
          let swap1 = groups1[payload.action.groupIndex - 1];
          groups1[payload.action.groupIndex - 1] = groups1[payload.action.groupIndex];
          groups1[payload.action.groupIndex] = swap1;
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.MOVE_GROUP_DOWN:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          if (payload.action.groupIndex >= groups2.length - 1) {
            break;
          }
          let groups2 = Tjson.stages[payload.action.stageIndex].groups;
          let swap2 = groups2[payload.action.groupIndex + 1];
          groups2[payload.action.groupIndex + 1] = groups2[payload.action.groupIndex];
          groups2[payload.action.groupIndex] = swap2;
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.COPY_GROUP:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          Tjson.stages[payload.action.stageIndex].groups.splice(
            payload.action.groupIndex, 0, payload.action.groupData
          );
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.EDIT_GROUP_INFO:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          let group = Tjson.stages[payload.action.stageIndex].groups[payload.action.groupIndex];
          [group.name, group.status, group.location, group.when] = payload.action.groupInfo;
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.CHANGE_GROUP_PLAYERS:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          Tjson.stages[payload.action.stageIndex].groups[payload.action.groupIndex].players = payload.action.groupPlayers;
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.EDIT_SCOREBOARD:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          Tjson.stages[payload.action.stageIndex].groups[payload.action.groupIndex].scores = payload.action.scores;
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.EDIT_MATCHES:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          Tjson.stages[payload.action.stageIndex].groups[payload.action.groupIndex].matches = payload.action.matches;
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.EDIT_STAGE_INFO:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          let stage = Tjson.stages[payload.action.stageIndex];
          [stage.name, stage.status, stage.location, stage.when] = payload.action.stageInfo;
          _flags.modified = true;
          this.emitChange();
          break;
        case EditTConstants.EDIT_T_INFO:
          console.log( 'dispatching action ' + payload.action.actionType + ' to PageEditTStore' );
          [Tjson.name, Tjson.game, Tjson.status, Tjson.location, Tjson.brief, Tjson.when] = payload.action.TInfo;
          _flags.modified = true;
          this.emitChange();
          break;
        default:
          // no op

      }
    }.bind(this));
  }

  get modified(){
    return _flags.modified;
  }

  get editMode(){
    return _flags.editMode;
  }

  get Tjson(){
    return Tjson;
  }
}

export default new PageEditTStore();
