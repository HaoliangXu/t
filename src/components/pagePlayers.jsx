//TODO This method changes the original data, may cause bugs.
//Should create a new piece of data then take an action to save it to original data.

import React from 'react';
import AppBar from 'material-ui/lib/app-bar.js';
import Menu from 'material-ui/lib/svg-icons/navigation/menu.js';
import TrendingUp from 'material-ui/lib/svg-icons/action/trending-up.js';
import TrendingDown from 'material-ui/lib/svg-icons/action/trending-down.js';
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

//The id that popup dialog is editing.
var editingPlayerTid = -1;

export default class PagePlayers extends React.Component{

  constructor(props){
    super(props);
    this._onDialogInfoSubmit = this._onDialogInfoSubmit.bind(this);
    this._onDialogInfoCancel = this._onDialogInfoCancel.bind(this);
    this._dialogActions = [
      {text: 'Yep', onTouchTap: this._onDialogInfoSubmit, ref: 'submit'},
      {text: 'Cancel', onTouchTap: this._onDialogInfoCancel}
    ];
  }

  render(){
    return <div>
      <AppBar
        title='Players'
        zDepth={2}
        style={{'backgroundColor': '#ff4081', 'height': '10rem'}}
        iconElementRight={<IconButton><NavigationClose /></IconButton>}
        iconElementLeft={
          <IconMenu iconButtonElement={
            <IconButton><Menu /></IconButton>
            }
            openDirection="bottom-right">
            <MenuItem primaryText="Info" />
          </IconMenu>
        } />
      <Table
        fixedHeader={true}
        multiSelectable={true}>
        <TableHeader enableSelectAll={true}>
          <TableRow>
            <TableHeaderColumn>No.</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Notes</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
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
        actionFocus='submit'
        ref='playerInfoDialog'>
        <form role='form'>
          <div className='form-group'>
            <TextField type='text' hintText='Player Name' ref='name' fullWidth={true} />
            <TextField type='text' hintText='Notes' ref='notes' fullWidth={true} />
          </div>
        </form>
      </Dialog>
      <MainButtonGroup page='players' />
    </div>;
  }

  _generateTable(){
    var list = PlayersService.reqPlayerList();
    return list.map((player, index)=>{
      return <TableRow key={'pt' + index}>
        <TableRowColumn>{index + 1}</TableRowColumn>
        <TableRowColumn onTouchTap={this._onShowInfo.bind(this, index)}>{player.name}</TableRowColumn>
        <TableRowColumn>{player.notes}</TableRowColumn>
        <TableRowColumn>
          <IconButton onTouchTap={this._onAddBefore.bind(this, index)}><TrendingUp /></IconButton>
          <IconButton onTouchTap={this._onAddAfter.bind(this, index)}><TrendingDown /></IconButton>
          <IconButton onTouchTap={this._onDeletePlayer.bind(this, index)}><NavigationClose /></IconButton>
        </TableRowColumn>
      </TableRow>;
    });
  }

  _onDialogInfoSubmit(){
    this.refs.playerInfoDialog.setState({
      open: false
    });
    PlayersService.updatePlayer(
      editingPlayerTid,
      {
        name: this.refs.name.getValue(),
        notes: this.refs.notes.getValue()
      }
    );
    this.forceUpdate();
    editingPlayerTid = -1;
  }

  _onDialogInfoCancel(){
    this.refs.playerInfoDialog.setState({
      open: false
    });
  }

  _onShowInfo(index){
    var player = PlayersService.reqPlayerByIndex(index);
    editingPlayerTid = index;
    this.refs.playerInfoDialog.setState({
      open: true
    });
    setTimeout(function(){
      this.refs.name.focus();
      this.refs.name.setValue(player.name);
      this.refs.notes.setValue(player.notes);
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
