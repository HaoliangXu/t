import React from 'react';
//import Card from 'material-ui/lib/card/card.js';
import {Table, TableHeader, TableRowColumn, TableHeaderColumn, TableBody, TableRow} from 'material-ui/lib/table/index.js';
import Dialog from 'material-ui/lib/dialog.js';
import DatePicker from 'material-ui/lib/date-picker/date-picker.js';
import TextField from 'material-ui/lib/text-field.js';
import PageMatchStore from '../stores/pageMatchStore.js';
import MainButtonGroup from './mainButtonGroup.jsx';
import EditTActions from '../actions/editTActions.js';
import {newMatch} from '../utils/appConfig.js';
import PlayersService from '../services/players.js';

export default class PageMatch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      match: newMatch(),
      editMode: false
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
    player1 = player1 ? player1 : {name: '', points: '0'};
    player2 = player2 ? player2 : {name: '', points: '0'};
    return (
      <div>
        <Table
          fixedHeader={true}
          selectable={false}>
          <TableHeader
            displaySelectAll={false}>
            <TableRow
              onTouchTap={this._onDialogMatchInfo}>
              <TableHeaderColumn>{player1.name}</TableHeaderColumn>
              <TableHeaderColumn>V.S.</TableHeaderColumn>
              <TableHeaderColumn>{player2.name}</TableHeaderColumn>
            </TableRow>
            <TableRow
              onTouchTap={this._onDialogMatchInfo}>
              <TableHeaderColumn>{player1.points}</TableHeaderColumn>
              <TableHeaderColumn>:</TableHeaderColumn>
              <TableHeaderColumn>{player2.points}</TableHeaderColumn>
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
              <TextField type='text' defaultValue={this.state.match.players[0].tid} hintText='Group Name (Required)' ref='name' fullWidth={true} />
              <TextField type='text' defaultValue={this.state.match.players[1].tid} hintText='Status' ref='status' fullWidth={true} />
              <TextField type='text' defaultValue={this.state.match.players[0].points} hintText='Location' ref='location' fullWidth={true} />              Start Time
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
    var groupInfo = [
      this.refs.name.getValue(),
      this.refs.status.getValue(),
      this.refs.location.getValue(),
      this.refs.date.getDate()
    ];
    this.refs.dialogEditInfo.dismiss();
    EditTActions.changeMatch(
      groupInfo,
      this.props.groupIndex,
      this.props.stageIndex
    );
  }

  _onDialogCancel(){
    this.refs.dialogEditInfo.dismiss();
  }

  _onChange(){
    let newState = {
      page: 'match',
      match: PageMatchStore.match,
      editMode: PageMatchStore.editMode
    };
    this.setState(newState);
    setTimeout(function(){
      AppActions.updateHistoryContent(newState);
    });
  }
}
