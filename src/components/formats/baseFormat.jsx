import React from 'react';
import EditTActions from '../../actions/editTActions.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';
import IconButton from 'material-ui/lib/icon-button.js';
import Menu from 'material-ui/lib/svg-icons/navigation/menu.js';
import Dialog from 'material-ui/lib/dialog.js';
import DatePicker from 'material-ui/lib/date-picker/date-picker.js';
import TextField from 'material-ui/lib/text-field.js';

import DialogGroupPlayers from '../dialogGroupPlayers.jsx';

/*
 * Title: BaseFormat
 * Description: The base format to produce more real formats
 * @params this._iconButtonElement The icon button
 * @params this._basicIconMenu The basic menu items to be added to format menu
 */

export default class BaseFormat extends React.Component{
  constructor( props ){
    super( props );
    this._iconButtonElement = <IconButton><Menu /></IconButton>;
    //Show only on edit mode
    this._basicIconMenu = [
      <MenuItem
        onTouchTap={this._onMoveUp.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText='Move up' key='menuItem1' />,
      <MenuItem
        onTouchTap={this._onMoveDown.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText='Move down' key='menuItem2' />,
      <MenuItem
        onTouchTap={this._onCopyGroup.bind( this, this.props.groupData, this.props.groupIndex, this.props.stageIndex )}
        primaryText='Copy' key='menuItem3' />,
      <MenuItem
        onTouchTap={this._onRemoveGroup.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText='Remove' key='menuItem4' />
    ];
    this._onDialogCancel = this._onDialogCancel.bind(this);
    this._onDialogSubmit = this._onDialogSubmit.bind(this);
    this._onShowDialogPlayers = this._onShowDialogGroupPlayers.bind(this);
    this._onEditInfo = this._onEditInfo.bind(this);
    this.dialogInfoActions = [
      {text: 'Do it', onTouchTap: this._onDialogSubmit, ref: 'submit'},
      {text: 'Nay', onTouchTap: this._onDialogCancel}
    ];
    this._dialogEditInfo = <Dialog
      title='Edit Group Info'
      actions={this.dialogInfoActions}
      actionFocus='submit'
      ref='dialogEditInfo'>
      <form role='form'>
        <div className='form-group'>
          <TextField type='text' defaultValue={this.props.groupData.name} hintText='Group Name (Required)' ref='name' fullWidth={true} />
          <TextField type='text' defaultValue={this.props.groupData.status} hintText='Status' ref='status' fullWidth={true} />
          <TextField type='text' defaultValue={this.props.groupData.location} hintText='Location' ref='location' fullWidth={true} />              Start Time
          <DatePicker defaultValue={this.props.groupData.when} ref='date' />
        </div>
      </form>
    </Dialog>;
    this._dialogGroupPlayers = <DialogGroupPlayers
      ref='dialogGroupPlayers'
      groupPlayers={this.props.groupData.players}
      groupName={this.props.groupData.name}
      groupIndex={this.props.groupIndex}
      stageIndex={this.props.stageIndex}
    />;
  }

  _onShowDialogGroupPlayers(){
    this.refs.dialogGroupPlayers.show();
  }

  _onMoveUp(groupIndex, stageIndex){
    EditTActions.moveGroupUp(groupIndex, stageIndex);
  }

  _onMoveDown(groupIndex, stageIndex){
    EditTActions.moveGroupDown(groupIndex, stageIndex);
  }

  _onCopyGroup(groupData, groupIndex, stageIndex){
    //Deep copy groupData, to break the reference chain
    groupData = JSON.parse(JSON.stringify(groupData));
    EditTActions.copyGroup(groupData, groupIndex, stageIndex);
  }

  _onRemoveGroup(groupIndex, stageIndex){
    EditTActions.removeGroup(groupIndex, stageIndex);
  }

  //Methods of dialogEditInfo
  _onEditInfo(){
    this.refs.dialogEditInfo.setState({
      open: true
    });
  }

  _onDialogSubmit(){
    var groupInfo = [
      this.refs.name.getValue(),
      this.refs.status.getValue(),
      this.refs.location.getValue(),
      this.refs.date.getDate()
    ];
    this.refs.dialogEditInfo.setState({
      open: false
    });
    EditTActions.editGroupInfo(
      groupInfo,
      this.props.groupIndex,
      this.props.stageIndex
    );
  }

  _onDialogCancel(){
    this.refs.dialogEditInfo.setState({
      open: false
    });
  }
}
