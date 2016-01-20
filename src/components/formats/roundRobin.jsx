//TODO The method to clean group players may not be efficent enough.
//But now the method is: clean it when rendering scoreboard and matcheboard of each group
import BaseFormat from './baseFormat.jsx';
import React from 'react';

import {Card, CardTitle} from 'material-ui/lib/card/index.js';
import Dialog from 'material-ui/lib/dialog.js';
import TextField from 'material-ui/lib/text-field.js';
import SelectField from 'material-ui/lib/select-field.js';
import IconMenu from 'material-ui/lib/menus/icon-menu.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';

import AppActions from '../../actions/appActions.js';
import EditTActions from '../../actions/editTActions.js';
import PlayersService from '../../services/players.js';
import {newMatch, newScoreRow} from '../../utils/appConfig.js';

//Indicates which row DialogScore is showing
var editingScoreRow = -1;

export default class RoundRobin extends BaseFormat{
  constructor(props){
    super(props);
    this._generateMatches = this._generateMatches.bind(this);
    this._onDialogScoreCancel = this._onDialogScoreCancel.bind(this);
    this._onDialogScoreSubmit = this._onDialogScoreSubmit.bind(this);
    this._onAddPlayer = this._onAddPlayer.bind(this);
    this._onAddMatch = this._onAddMatch.bind(this);
    //Actions for  dialogs
    this.dialogScoreActions = [
      {text: 'Do it', onTouchTap: this._onDialogScoreSubmit, ref: 'scoreSubmit'},
      {text: 'Nay', onTouchTap: this._onDialogScoreCancel}
    ];
  }

  render(){
    let _iconMenu = this.props.editMode ?
      <IconMenu
        style={{'float': 'left'}}
        openDirection='bottom-right'
        iconButtonElement={this._iconButtonElement}>
      {this._basicIconMenu}
      <MenuItem
        onTouchTap={this._onEditInfo} primaryText='Edit Info' />
      <MenuItem
        onTouchTap={this._onShowDialogGroupPlayers} primaryText='Players' />
    </IconMenu> : null;
    //Group with ids like MxxGxxSxx for anchor use
    return (
      <div className='roundRobin group'
        id={'G' + this.props.groupIndex + 'S' + this.props.stageIndex}>
        <Card>
          <CardTitle
            title={<div>
              {_iconMenu}
              <span>{this.props.groupData.name}</span>
            </div>}
            subtitle={this.props.groupData.status} />
          <table className='groupContent'>
            <tbody>
              <tr>
                <th colSpan='4'>Score</th>
              </tr>
              {this._generateScores()}
              <tr>
                <td colSpan='4' onTouchTap={this._onAddPlayer}>Add A Player</td>
              </tr>
            </tbody>
          </table>
          <table className='groupContent'>
            <tbody>
              <tr>
                <th colSpan='4'>Matches</th>
              </tr>
              {this._generateMatches()}
              <tr>
                <td colSpan='4' onTouchTap={this._onAddMatch}>Add A Match</td>
              </tr>
            </tbody>
          </table>
        </Card>
        {this._dialogEditInfo}
        {this._dialogGroupPlayers}
        <Dialog
          title='Edit Player Score'
          actions={this.dialogScoreActions}
          actionFocus='scoreSubmit'
          ref='dialogScore'>
          <form role='form'>
            <div className='form-group'>
              <select ref='scoreRowTid'>
                <option value={-1} key={'so' + -1}></option>
                {this.props.groupData.players.map(function(tid, index){
                  return <option value={tid} key={'so' + index}>
                    {PlayersService.reqPlayerByTid(tid).name}
                  </option>
                })}
              </select>
              <TextField type='text' hintText='Score' ref='score' fullWidth={true} />
              <TextField type='text' hintText='Points' ref='points' fullWidth={true} />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }

  _onShowDialogScore(row){
    if (!this.props.editMode){
      return;
    }
    var scoreRow = this.props.groupData.scores[row];
    editingScoreRow = row;
    this.refs.dialogScore.setState({
      open: true
    });
    setTimeout(function(){
      this.refs.scoreRowTid.value = scoreRow.tid;
      this.refs.score.setValue(scoreRow.score);
      this.refs.points.setValue(scoreRow.points);
    }.bind(this));
  }

  _generateScores(){
    return this.props.groupData.scores.map((item, index)=>{
      var player = PlayersService.reqPlayerByTid(item.tid);
      //TODO not complete. When player is removed from T, then clear them from any group.
      //And there probably should be a overall remover of editT page for this situation.
      if (item.tid !== -1 && !player){
        item.tid = -1;
        this._removePlayerRef(item.tid);
      }
      let removeButton = this.props.editMode ?
        <td
          className='colNumber'
          onTouchTap={this._onRemoveScoreRow.bind(this, index)}>
          X
        </td> : null;
      return <tr key={'ts' + index} onTouchTap={this._onShowDialogScore.bind(this, index)}>
        {removeButton}
        <td className='playerName'>
          {player ? player.name : ''}
        </td>
        <td>{item.score}</td>
        <td>{item.points}</td>
      </tr>;
    });
  }

  _generateMatches(){
    return this.props.groupData.matches.map((match, index)=>{
      var player1 = PlayersService.reqPlayerByTid(match.players[0].tid);
      var player2 = PlayersService.reqPlayerByTid(match.players[1].tid);
      if (match.players[0].tid !== -1 && !player1){
        match.players[0].tid = -1;//TODO not complete
      }
      if (match.players[1].tid !== -1 && !player2){
        match.players[1].tid = -1;//TODO not complete
      }
      return <tr key={'tm' + index} onTouchTap={this._onPageMatch.bind(this, index)}>
        <td className='colName'>{player1 ? player1.name : ''}</td>
        <td className='colPoints'>{match.players[0].points}</td>
        <td className='colPoints'>{match.players[1].points}</td>
        <td className='colName'>{player2 ? player2.name : ''}</td>
      </tr>
    });
  }

  _onRemoveScoreRow(index, event){
    event.stopPropagation();
    var scores = JSON.parse(JSON.stringify(this.props.groupData.scores));
    scores.splice(index, 1);
    EditTActions.editScoreBoard(
      scores,
      this.props.groupIndex,
      this.props.stageIndex
    );
  }

  _removePlayerRef(tid){
    var players = this.props.groupData.players;
    //Could be more efficient
    var index = players.findIndex((item, index)=>{
      if (item.tid === tid){
        return true;
      } else {
        return false;
      }
    });
    players.splice(index, 1);
  }

  _onPageMatch(index){
    console.log('on turn match page');
    AppActions.nextPage('match');
    setTimeout(AppActions.loadPage.bind(
      this,
      {
        page: 'match',
        editMode: this.props.editMode,
        match: this.props.groupData.matches[index],
        matchIndex: index,
        groupIndex: this.props.groupIndex,
        stageIndex: this.props.stageIndex,
        //Below for refs use
        groupPlayers: this.props.groupData.players,
        groupMatches: this.props.groupData.matches
      }
    ));
    AppActions.showSpinner();
  }

  _onDialogScoreSubmit(){
    var scoreRow = {
      icon: '',
      tid: this.refs.scoreRowTid.value,
      score: this.refs.score.getValue(),
      points: this.refs.points.getValue(),
      color: 0,
      notes: ''
    };
    //Deep copy
    var scores = JSON.parse(JSON.stringify(this.props.groupData.scores));
    scores.splice(editingScoreRow, 1, scoreRow);
    editingScoreRow = -1;
    this.refs.dialogScore.setState({
      open: false
    });
    EditTActions.editScoreBoard(
      scores,
      this.props.groupIndex,
      this.props.stageIndex
    );
  }

  _onDialogScoreCancel(){
    editingScoreRow = -1;
    this.refs.dialogScore.setState({
      open: false
    });
  }

  _onAddPlayer(){
    var scoreRow = newScoreRow();
    var scores = JSON.parse(JSON.stringify(this.props.groupData.scores));
    scores.push(scoreRow);
    EditTActions.editScoreBoard(
      scores,
      this.props.groupIndex,
      this.props.stageIndex
    );
  }

  _onAddMatch(){
    var match = newMatch();
    var matches = JSON.parse(JSON.stringify(this.props.groupData.matches));
    matches.push(match);
    EditTActions.editMatches(
      matches,
      this.props.groupIndex,
      this.props.stageIndex
    );
  }
}
