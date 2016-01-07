import React from 'react';
import AppBar from 'material-ui/lib/app-bar.js';
import Dialog from 'material-ui/lib/dialog.js';
import TextField from 'material-ui/lib/text-field.js';
import DatePicker from 'material-ui/lib/date-picker/date-picker.js';
import IconMenu from 'material-ui/lib/menus/icon-menu.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';
import IconButton from 'material-ui/lib/icon-button.js';
import PeopleSvg from 'material-ui/lib/svg-icons/social/people.js';
import ExpandMore from 'material-ui/lib/svg-icons/navigation/expand-more.js';
import Menu from 'material-ui/lib/svg-icons/navigation/menu.js';
import RaisedButton from 'material-ui/lib/raised-button.js';

//Import Group Creators
import TBD from './formats/tbd.jsx';
import {newTBD} from '../utils/appConfig.js';
import Elimination from './formats/elimination.jsx';
import RoundRobin from './formats/roundRobin.jsx';
import EditTActions from '../actions/editTActions.js';

export default class Stage extends React.Component{
  constructor(props){
    super(props);
    this._onDialogInfoSubmit = this._onDialogInfoSubmit.bind(this);
    this._onDialogInfoCancel = this._onDialogInfoCancel.bind(this);
    this._onShowDialogInfo = this._onShowDialogInfo.bind(this);
    this._TInfoDialogActions = [
      {text: 'Yep', onTouchTap: this._onDialogInfoSubmit, ref: 'submit'},
      {text: 'Cancel', onTouchTap: this._onDialogInfoCancel}
    ];
    this._addNewGroupButton = this.props.editMode ? <RaisedButton
      onTouchTap={this._onAddNewGroup.bind(this, this.props.stageData.groups.length, this.props.stageIndex)}
      style={{'width': '96%', 'margin': '2% 2% 0 2%'}} label='Add A New Group' /> : null;
  }

  render(){
    return (
      <div className='stage'>
        <AppBar title={this.props.stageData.name}
          iconElementRight={
            <IconButton onTouchTap={this._onToggleStage.bind(this, this.props.stageIndex)}>
              <ExpandMore />
            </IconButton>
          }
          iconElementLeft= {this.props.editMode ? <IconMenu iconButtonElement={
              <IconButton><Menu /></IconButton>
              }
              openDirection="bottom-right">
              <MenuItem onTouchTap={this._onRemoveStage.bind(this, this.props.stageIndex)} primaryText="Delete" />
              <MenuItem primaryText="Rename" />
              <MenuItem onTouchTap={this._onShowDialogInfo} primaryText="Info" />
            </IconMenu> : null}
        />
        <div style={{display: this.props.stageData.expand ? 'block' : 'none'}}>
          {this._generateGroups(this.props.stageData)}
          {this._addNewGroupButton}
        </div>
        <Dialog
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          title='Edit Stage Info'
          actions={this._TInfoDialogActions}
          actionFocus='submit'
          ref='stageInfoDialog'>
          <form role='form'>
            <div className='form-group'>
              <TextField type='text' defaultValue={this.props.stageData.name} hintText='Group Name (Required)' ref='name' fullWidth={true} />
              <TextField type='text' defaultValue={this.props.stageData.status} hintText='Status' ref='status' fullWidth={true} />
              <TextField type='text' defaultValue={this.props.stageData.location} hintText='Location' ref='location' fullWidth={true} />
              <DatePicker defaultValue={this.props.stageData.startAt} ref='date' />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }

  _onDialogInfoSubmit(){
    var stageInfo = [
      this.refs.name.getValue(),
      this.refs.status.getValue(),
      this.refs.location.getValue(),
      this.refs.date.getDate()
    ];
    window.setTimeout(EditTActions.editStageInfo.bind(
      this,
      stageInfo,
      this.props.stageIndex
    ));
    this.refs.stageInfoDialog.setState({
      open: false
    });
  }

  _onDialogInfoCancel(){
    this.refs.stageInfoDialog.setState({
      open: false
    });
  }

  _onShowDialogInfo(){
    this.refs.stageInfoDialog.setState({
      open: true
    });
  }

  _onToggleStage(stageIndex){
    EditTActions.toggleStage(stageIndex);
  }

  _generateGroups(stageData){
    //Check whether page is loaded, if not, skip generateT.
    if (!stageData.groups) {
      return undefined;
    }
    let stageItem = stageData.groups.map(function(group, groupIndex){
      let groupItem;
      let props = {
        groupData: group,
        groupIndex: groupIndex,
        stageIndex: this.props.stageIndex,
        editMode: this.props.editMode
      };
      switch (group.format){
        //Group format to be decided, for user to select.
        case 'tbd':
          groupItem = <TBD {...props} key={'g' + groupIndex} />;
          break;
        case 'elimination':
          groupItem = <Elimination {...props} key={'g' + groupIndex} />;
          break;
        case 'roundRobin':
          groupItem = <RoundRobin {...props} key={'g' + groupIndex} />;
          break;
        case 'doubleElimination':
          groupItem = <Elimination {...props} key={'g' + groupIndex} />;
          break;
      }
      return groupItem;
    }.bind(this));
    return stageItem;
  }

  _onRemoveStage(stageIndex){
    EditTActions.removeStage(stageIndex);
  }

  _onAddNewGroup(groupIndex, stageIndex){
    var group = newTBD();
    EditTActions.addGroup(group, groupIndex, stageIndex );
  }
}
