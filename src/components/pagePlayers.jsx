//TODO This method changes the original data, may cause bugs.
//Should create a new piece of data then take an action to save it to original data.

import React from 'react';
import AppBar from 'material-ui/lib/app-bar.js';
import Menu from 'material-ui/lib/svg-icons/navigation/menu.js';
import Prepend from 'material-ui/lib/svg-icons/editor/vertical-align-top.js';
import Append from 'material-ui/lib/svg-icons/editor/vertical-align-bottom.js';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close.js';
import IconMenu from 'material-ui/lib/menus/icon-menu.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';
import IconButton from 'material-ui/lib/icon-button.js';
import Dialog from 'material-ui/lib/dialog.js';
import TextField from 'material-ui/lib/text-field.js';
import {Table, TableHeader, TableRowColumn, TableHeaderColumn, TableBody, TableRow} from 'material-ui/lib/table/index.js';

import PlayersService from '../services/players.js';
import AppActions from '../actions/appActions.js';
import MainButtonGroup from './mainButtonGroup.jsx';
import PageEditTStore from '../stores/pageEditTStore.js';

//The id that popup dialog is editing.
let editingPlayerSn = -1;
let editMode = false;

export default class PagePlayers extends React.Component{

  constructor(props){
    super(props);
    editMode = PageEditTStore.editMode;
    this._onDialogInfoSubmit = this._onDialogInfoSubmit.bind(this);
    this._onDialogInfoCancel = this._onDialogInfoCancel.bind(this);
    this._dialogActions = [
      {text: 'Yep', onTouchTap: this._onDialogInfoSubmit, ref: 'submit'},
      {text: 'Cancel', onTouchTap: this._onDialogInfoCancel}
    ];

  }

  render(){
    let _editorsCollumn = editMode ? <TableHeaderColumn>Editors</TableHeaderColumn> : null;
    return <div>
      <AppBar
        title='Players'
        zDepth={2}
        style={{'backgroundColor': '#ff4081', 'height': '10rem'}}/>
      <Table
        className='pagePlayersTable'
        fixedHeader={true}>
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>No.</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            {_editorsCollumn}
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          deselectOnClickaway={true}
          showRowHover={true}>
          {this._generateTable()}
        </TableBody>
      </Table>
      <Dialog
        autoDetectWindowHeight={true}
        autoScrollBodyContent={true}
        title='Player Info'
        actions={this._dialogActions}
        ref='playerInfoDialog'>
        <form role='form'>
          <div className='form-group'>
            <TextField onEnterKeyDown={this._onDialogInfoSubmit} type='text' hintText='Player Name' ref='name' fullWidth={true} />
            <TextField onEnterKeyDown={this._onDialogInfoSubmit} type='text' hintText='Notes' ref='notes' fullWidth={true} />
          </div>
        </form>
      </Dialog>
      <MainButtonGroup page='players' />
    </div>;
  }

  _generateTable(){
    let list = PlayersService.reqPlayerList();
    return list.map((player, index)=>{
      let _editors = editMode ? <TableRowColumn>
          <IconButton onTouchTap={this._onAddBefore.bind(this, index)}><Prepend /></IconButton>
          <IconButton onTouchTap={this._onAddAfter.bind(this, index)}><Append /></IconButton>
          <IconButton onTouchTap={this._onDeletePlayer.bind(this, index)}><NavigationClose /></IconButton>
        </TableRowColumn> : null;
      return <TableRow key={'pt' + index}>
        <TableRowColumn>{index + 1}</TableRowColumn>
        <TableRowColumn onTouchTap={this._onShowInfo.bind(this, index)}>{player.name}</TableRowColumn>
        {_editors}
      </TableRow>;
    });
  }

  _onDialogInfoSubmit(){
    if (!this.refs.name.getValue){
      AppActions.showNotice('Player name is required');
      return;
    }
    this.refs.playerInfoDialog.setState({
      open: false
    });
    PlayersService.updatePlayer(
      editingPlayerSn,
      {
        name: this.refs.name.getValue(),
        notes: this.refs.notes.getValue()
      }
    );
    this.forceUpdate();
    editingPlayerSn = -1;
  }

  _onDialogInfoCancel(){
    this.refs.playerInfoDialog.setState({
      open: false
    });
  }

  _onShowInfo(index){
    if (!editMode){
      return;
    }
    var player = PlayersService.reqPlayerByIndex(index);
    editingPlayerSn = index;
    this.refs.playerInfoDialog.setState({
      open: true
    });
    setTimeout(function(){
      this.refs.name.setValue(player.name);
      this.refs.notes.setValue(player.notes);
      this.refs.name.focus();
    }.bind(this));
  }

  _onDeletePlayer(index){
    PlayersService.removePlayerByIndex(index);
    this.forceUpdate();
  }

  _onAddBefore(index){
    PlayersService.addRandomPlayer(index);
    this._onShowInfo(index);
  }

  _onAddAfter(index){
    index++;
    this._onAddBefore(index);
  }
}
