import React from 'react';
//import Card from 'material-ui/lib/card/card.js';
import {Table, TableHeader, TableRowColumn, TableHeaderColumn, TableBody, TableRow} from 'material-ui/lib/table/index.js';
import Dialog from 'material-ui/lib/dialog.js';
import DatePicker from 'material-ui/lib/date-picker/date-picker.js';
import TextField from 'material-ui/lib/text-field.js';
import PageMatchStore from '../stores/pageMatchStore.js';
import MainButtonGroup from './mainButtonGroup.jsx';
import AppActions from '../actions/appActions.js';
import EditTActions from '../actions/editTActions.js';
import {newMatch} from '../utils/appConfig.js';
import PlayersService from '../services/players.js';

export default class PageMatch extends React.Component{
  constructor(props){
    super(props);
    this._onChange = this._onChange.bind(this);
    this.state = {
      page: 'match',
      match: newMatch(),
      editMode: false,
      matchIndex: 0,
      groupIndex: 0,
      stageIndex: 0,
      //Below for refs use
      groupPlayers: [],
      groupMatches: []
    };
    this._onDialogMatchInfo = this._onDialogMatchInfo.bind(this);
    this._onDialogCancel = this._onDialogCancel.bind(this);
    this._onDialogSubmit = this._onDialogSubmit.bind(this);
    this.dialogInfoActions = [
      {text: 'Do it', onTouchTap: this._onDialogSubmit, ref: 'submit'},
      {text: 'Nay', onTouchTap: this._onDialogCancel}
    ];
  }

  componentDidMount(){
    PageMatchStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    PageMatchStore.removeChangeListener(this._onChange);
  }

  render(){
    var player1 = PlayersService.reqPlayerByTid(this.state.match.players[0].tid);
    var player2 = PlayersService.reqPlayerByTid(this.state.match.players[1].tid);
    return (
      <div>
        <Table
          fixedHeader={true}
          selectable={false}>
          <TableHeader
            displaySelectAll={false}>
            <TableRow
              onTouchTap={this._onDialogMatchInfo}>
              <TableHeaderColumn>{player1 ? player1.name : ''}</TableHeaderColumn>
              <TableHeaderColumn>V.S.</TableHeaderColumn>
              <TableHeaderColumn>{player1 ? player1.name : ''}</TableHeaderColumn>
            </TableRow>
            <TableRow
              onTouchTap={this._onDialogMatchInfo}>
              <TableHeaderColumn>{this.state.match.players[0].points}</TableHeaderColumn>
              <TableHeaderColumn>:</TableHeaderColumn>
              <TableHeaderColumn>{this.state.match.players[1].points}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            displayRowCheckbox={false}>
            {this._generateGames()}
          </TableBody>
        </Table>
        <Dialog
          title='Edit Group Info'
          actions={this.dialogInfoActions}
          actionFocus='submit'
          ref='dialogEditInfo'>
          <form role='form'>
            <div className='form-group'>
              <select ref='name1' defaultValue={this.state.match.players[0].tid}>
                <option value={-1} key={'so' + -1}></option>
                {this.state.groupPlayers.map(function(tid, index){
                  return <option value={tid} key={'so' + index}>
                    {PlayersService.reqPlayerByTid(tid).name}
                  </option>
                })}
              </select>
              <select ref='name2' defaultValue={this.state.match.players[1].tid}>
                <option value={-1} key={'so' + -1}></option>
                {this.state.groupPlayers.map(function(tid, index){
                  return <option value={tid} key={'so' + index}>
                    {PlayersService.reqPlayerByTid(tid).name}
                  </option>
                })}
              </select>
              <TextField type='text' defaultValue={this.state.match.players[0].points} hintText='Left Player Points' ref='points1' fullWidth={true} />
              <TextField type='text' defaultValue={this.state.match.players[1].points} hintText='Right Player Points' ref='points2' fullWidth={true} />
              Start Time
              <DatePicker defaultValue={this.state.match.when} ref='date' />
            </div>
          </form>
        </Dialog>
        <MainButtonGroup page='match' />
      </div>
    );
  }

  _generateGames(){
    return this.state.match.games.map((game, index)=>{
      return <TableRow key={'pt' + index}>
        <TableRowColumn>{game.leftPoint}</TableRowColumn>
        <TableRowColumn>{game.set}</TableRowColumn>
        <TableRowColumn>{game.rightPoint}</TableRowColumn>
      </TableRow>;
    })
  }

  _onDialogMatchInfo(){
    console.log('show match info dialog');
    this.refs.dialogEditInfo.show();
  }

  _onDialogSubmit(){
    this.refs.dialogEditInfo.dismiss();
    let match = JSON.parse(JSON.stringify(this.state.match))
    match.players[0].tid = this.refs.name1.value;
    match.players[1].tid = this.refs.name2.value;
    match.players[0].points = this.refs.points1.getValue();
    match.players[1].points = this.refs.points2.getValue();
    match.when = this.refs.date.getDate();
    EditTActions.editMatch(
      match
    );
  }

  _onDialogCancel(){
    this.refs.dialogEditInfo.dismiss();
  }

  _onChange(){
    let newState = PageMatchStore.pageContent;
    this.setState(newState);
    setTimeout(function(){
      AppActions.updateHistoryContent(newState);
    });
  }
}
