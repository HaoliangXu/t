import React from 'react';
import Mui from 'material-ui';
import AppActions from "../actions/appActions.js";
import {newT} from "../utils/appConfig.js"
var Dialog = Mui.Dialog;
var CardText = Mui.CardText;
var CardTitle = Mui.CardTitle;
var TextField = Mui.TextField;
var DatePicker = Mui.DatePicker;
var TimePicker = Mui.TimePicker;

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
    console.log("on dialog submit");
    newT.name = this.refs.TName.value;
    newT.game = this.refs.GameType.value;
    newT.location = this.refs.Location.value;
    newT.startTime = this.refs.Time.getTime();
    console.log(newT);
    AppActions.nextPage("editT");
    AppActions.loadPage(newT);
  }

  _onDialogCancel(){
    console.log("on dialog cancel");
    this.dismiss();
  }

  render(){
    return (
      <Dialog
        title="Create Tournament"
        actions={this.standardActions}
        actionFocus="submit"
        ref="dialog">
        <form role="form">
          <div className="form-group">
            <TextField type="text" hintText="Tournament Name (Required)" ref="TName" fullWidth={true} />
            <TextField type="text" hintText="Game Type (Required)" ref="GameType" fullWidth={true} />
            <TextField type="text" hintText="Location" ref="Location" fullWidth={true} />
            <TextField type="text" hintText="Players" ref="Players" fullWidth={true} /><br /><br />
            Start Date
            <DatePicker
              onChange={this._handleChange} ref="Date" />
            Start Time
            <TimePicker format="ampm" ref="Time"/>
          </div>
        </form>
      </Dialog>
    );
  }
}
