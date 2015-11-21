import React from 'react';
import Dialog from 'material-ui/lib/dialog.js';
import TextField from 'material-ui/lib/text-field.js';
import DatePicker from 'material-ui/lib/date-picker/date-picker.js';
import AppActions from '../actions/appActions.js';
import {newT} from '../utils/appConfig.js';

import PlayersService from '../services/players.js';

export default class DialogCreateT extends React.Component{
  constructor(props){
    super(props);
    this._onDialogCancel = this._onDialogCancel.bind(this);
    this._onDialogSubmit = this._onDialogSubmit.bind(this);
    this.show = this.show.bind(this);
    this.standardActions = [
      { text: 'Do it', onTouchTap: this._onDialogSubmit, ref: 'submit' },
      { text: 'Nay', onTouchTap: this._onDialogCancel}
    ];
  }

  show(){
    this.refs.dialog.show();
  }

  dismiss(){
    this.refs.dialog.dismiss();
  }

  _onDialogSubmit(){
    console.log('on dialog submit');
    var playerNumber = Number(this.refs.Players.getValue());
    var anewT = newT();
    anewT.name = this.refs.TName.getValue();
    anewT.game = this.refs.GameType.getValue();
    anewT.location = this.refs.Location.getValue();
    if (!playerNumber || playerNumber < 2){
      playerNumber = 2;
    }
    PlayersService.addInitialPlayers(anewT.players, playerNumber);
    AppActions.nextPage('editT');
    setTimeout(AppActions.loadPage.bind(undefined, {page: 'editT', Tjson: anewT, editMode: true, modified: false}));
  }

  _onDialogCancel(){
    console.log('on dialog cancel');
    this.dismiss();
  }

  render(){
    return (
      <Dialog
        title='Create Tournament'
        actions={this.standardActions}
        actionFocus='submit'
        ref='dialog'>
        <form role='form'>
          <div className='form-group'>
            <TextField type='text' hintText='Tournament Name (Required)' ref='TName' fullWidth={true} />
            <TextField type='text' hintText='Game Type (Required)' ref='GameType' fullWidth={true} />
            <TextField type='text' hintText='Location' ref='Location' fullWidth={true} />
            <TextField type='text' hintText='Number of Players' ref='Players' fullWidth={true} /><br /><br />
            Start Date
            <DatePicker
              onChange={this._handleChange} ref='Date' />
          </div>
        </form>
      </Dialog>
    );
  }
}
