import React from 'react';
import Dialog from 'material-ui/lib/dialog.js';
import TextField from 'material-ui/lib/text-field.js';
import DatePicker from 'material-ui/lib/date-picker/date-picker.js';
import {Table, TableHeader, TableRowColumn, TableHeaderColumn, TableBody, TableRow} from 'material-ui/lib/table/index.js';

import EditTActions from '../actions/editTActions.js';
import PlayersService from '../services/players.js';

export default class DialogGroupPlayers extends React.Component{
  constructor(props){
    super(props);
    this._onDialogSubmit = this._onDialogSubmit.bind(this);
    this._onRowSelection = this._onRowSelection.bind(this);
    this.dialogPlayersActions = [
      { text: 'Ok', onTouchTap: this._onDialogSubmit, ref: 'submit' },
    ];
  }

  render(){
    return (
      <Dialog
        title={this.props.groupName + ' Players'}
        actions={this.dialogPlayersActions}
        actionFocus='submit'
        ref='dialog'>
        <Table
          fixedHeader={true}
          multiSelectable={true}
          onRowSelection={this._onRowSelection}>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{width: '2rem'}}>No.</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false}>
            {this._generatePlayerList()}
          </TableBody>
        </Table>
      </Dialog>
    );
  }

  _generatePlayerList(){
    return PlayersService.reqPlayerList().map(function(item, index, list){
      return <TableRow key={'dp' + index} selected={
          this.props.groupPlayers.indexOf(item.tid) !== -1
        }>
        <TableRowColumn style={{width: '2rem'}}>{index + 1}</TableRowColumn>
        <TableRowColumn>{item.name}</TableRowColumn>
      </TableRow>;
    }.bind(this));
  }

  _onRowSelection(selectedRows){
    var groupPlayers = this.props.groupPlayers;
    var playerList = PlayersService.reqPlayerList();
    //Clear the array, then fill with updated player tid list
    groupPlayers.splice(0, groupPlayers.length);
    for (var i = 0; i < selectedRows.length; i++) {
      groupPlayers.push(playerList[selectedRows[i]].tid);
    }
  }

  _onDialogSubmit(){
    EditTActions.changeGroupPlayers(
      this.props.groupPlayers,
      this.props.groupIndex,
      this.props.stageIndex
    );
    this.refs.dialog.dismiss();
  }

  show(){
    this.refs.dialog.show();
  }
}
