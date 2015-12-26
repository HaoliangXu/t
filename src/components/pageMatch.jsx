import React from 'react';
//import Card from 'material-ui/lib/card/card.js';
import {Table, TableHeader, TableRowColumn, TableHeaderColumn, TableBody, TableRow} from 'material-ui/lib/table/index.js';
import Dialog from 'material-ui/lib/dialog.js';
import DatePicker from 'material-ui/lib/date-picker/date-picker.js';
import TextField from 'material-ui/lib/text-field.js';
import RaisedButton from 'material-ui/lib/raised-button.js';
import PageMatchStore from '../stores/pageMatchStore.js';
import MainButtonGroup from './mainButtonGroup.jsx';
import AppActions from '../actions/appActions.js';
import EditTActions from '../actions/editTActions.js';
import {newMatch, newGameOfMatch} from '../utils/appConfig.js';
import PlayersService from '../services/players.js';

var editingGameIndex = -1;

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
    this._onRemoveMatch = this._onRemoveMatch.bind(this);
    this._onDialogMatchInfo = this._onDialogMatchInfo.bind(this);
    this._onDialogCancel = this._onDialogCancel.bind(this);
    this._onDialogSubmit = this._onDialogSubmit.bind(this);
    this.dialogInfoActions = [
      {text: 'Do it', onTouchTap: this._onDialogSubmit, ref: 'submit'},
      {text: 'Nay', onTouchTap: this._onDialogCancel}
    ];
    this._onDialogRemoveGame = this._onDialogRemoveGame.bind(this);
    this._onDialogGameCancel = this._onDialogGameCancel.bind(this);
    this._onDialogGameSubmit = this._onDialogGameSubmit.bind(this);
    this.dialogGameActions = [
      {text: 'Remove', onTouchTap: this._onDialogRemoveGame},
      {text: 'Do it', onTouchTap: this._onDialogGameSubmit, ref: 'submitGame'},
      {text: 'Nay', onTouchTap: this._onDialogGameCancel}
    ];
    this._onAddGame = this._onAddGame.bind(this);
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
            adjustForCheckbox={false}
            displaySelectAll={false}>
            <TableRow
              onTouchTap={this._onDialogMatchInfo}>
              <TableHeaderColumn style={{textAlign: 'center'}}>{player1 ? player1.name : ''}</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center'}}>V.S.</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center'}}>{player1 ? player1.name : ''}</TableHeaderColumn>
            </TableRow>
            <TableRow
              onTouchTap={this._onDialogMatchInfo}>
              <TableHeaderColumn style={{textAlign: 'center'}}>{this.state.match.players[0].points}</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center'}}>:</TableHeaderColumn>
              <TableHeaderColumn style={{textAlign: 'center'}}>{this.state.match.players[1].points}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            displayRowCheckbox={false}>
            {this._generateGames()}
            <TableRow key={'pt-1'} onTouchTap={this._onAddGame}>
              <TableRowColumn  style={{textAlign: 'center'}} colSpan={3}>Add A Game</TableRowColumn>
            </TableRow>;
          </TableBody>
        </Table>
        <RaisedButton onTouchTap={this._onRemoveMatch}
          primary={true} style={{'width': '100%', 'marginTop': '3rem'}} label='Remove This Match' />
        <Dialog
          title='Edit Match Info'
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
              <DatePicker defaultValue={this.state.match.startAt} ref='date' />
            </div>
          </form>
        </Dialog>
        <Dialog
          title='Edit Game'
          actions={this.dialogGameActions}
          actionFocus='submitGame'
          ref='dialogGame'>
          <form role='form'>
            <div className='form-group'>
              <TextField type='text' hintText='Left Player' ref='leftProperty' fullWidth={true} />
              <TextField type='text' hintText='Notes' ref='set' fullWidth={true} />
              <TextField type='text' hintText='Left Player' ref='rightProperty' fullWidth={true} />
            </div>
          </form>
        </Dialog>
        <MainButtonGroup page='match' back={this._onBack.bind(this)}/>
      </div>
    );
  }

  _onBack(){
    let match = JSON.parse(JSON.stringify(this.state.match));
    let matches = JSON.parse(JSON.stringify(this.state.groupMatches));
    matches[this.state.matchIndex] = match;
    AppActions.lastPage();
    setTimeout(EditTActions.editMatches.bind(
      undefined,
      matches,
      this.state.groupIndex,
      this.state.stageIndex
    ));
  }

  _generateGames(){
    return this.state.match.games.map((game, index)=>{
      return <TableRow key={'pt' + index} onTouchTap={this._onDialogGame.bind(this, index)}>
        <TableRowColumn style={{textAlign: 'center'}}>{game.leftProperty}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{game.set}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{game.rightProperty}</TableRowColumn>
      </TableRow>;
    })
  }

  _onAddGame(){
    let match = JSON.parse(JSON.stringify(this.state.match));
    match.games.push(newGameOfMatch());
    EditTActions.editMatch(
      match
    );
  }

  _onDialogMatchInfo(){
    this.refs.dialogEditInfo.setState({
      open: true
    });
  }

  _onDialogSubmit(){
    this.refs.dialogEditInfo.setState({
      open: false
    });
    let match = JSON.parse(JSON.stringify(this.state.match));
    match.players[0].tid = this.refs.name1.value;
    match.players[1].tid = this.refs.name2.value;
    match.players[0].points = this.refs.points1.getValue();
    match.players[1].points = this.refs.points2.getValue();
    match.startAt = this.refs.date.getDate();
    EditTActions.editMatch(
      match
    );
  }

  _onDialogCancel(){
    this.refs.dialogEditInfo.setState({
      open: false
    });
  }

  _onDialogGame(index){
    editingGameIndex = index;
    this.refs.dialogGame.setState({
      open: true
    });
    setTimeout(()=>{
      this.refs.leftProperty.setValue(this.state.match.games[index].leftProperty);
      this.refs.set.setValue(this.state.match.games[index].set);
      this.refs.rightProperty.setValue(this.state.match.games[index].rightProperty);
    });
  }

  _onDialogRemoveGame(){
    this.refs.dialogGame.setState({
      open: false
    });
    let match = JSON.parse(JSON.stringify(this.state.match));
    match.games.splice(editingGameIndex, 1);
    editingGameIndex = -1;
    EditTActions.editMatch(
      match
    );
  }

  _onDialogGameSubmit(){
    this.refs.dialogGame.setState({
      open: false
    });
    let match = JSON.parse(JSON.stringify(this.state.match));
    match.games[editingGameIndex].leftProperty = this.refs.leftProperty.getValue();
    match.games[editingGameIndex].set = this.refs.set.getValue();
    match.games[editingGameIndex].rightProperty = this.refs.rightProperty.getValue();
    editingGameIndex = -1;
    EditTActions.editMatch(
      match
    );
  }

  _onDialogGameCancel(){
    this.refs.dialogGame.setState({
      open: false
    });
    editingGameIndex = -1;
  }

  _onRemoveMatch(){
    let matches = JSON.parse(JSON.stringify(this.state.groupMatches));
    matches.splice(this.state.matchIndex, 1);
    AppActions.lastPage();
    setTimeout(EditTActions.editMatches.bind(
      undefined,
      matches,
      this.state.groupIndex,
      this.state.stageIndex
    ));
  }

  _onChange(){
    let newState = PageMatchStore.pageContent;
    this.setState(newState);
    setTimeout(function(){
      AppActions.updateHistoryContent(newState);
    });
  }
}
