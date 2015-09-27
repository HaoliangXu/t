import React from 'react';
import Mui from 'material-ui';
import AppActions from "../actions/appActions.js";
var Dialog = Mui.Dialog;
var CardText = Mui.CardText;
var CardTitle = Mui.CardTitle;
var TextField = Mui.TextField;

//Standard Actions
let TProperties = {
  name: "",
  game: "",
  paticipants: [],
  location: "",
  startTime: 0
};

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
            <TextField type="text" hintText="Tournament Name" fullWidth={true} />
            <br />
            <TextField type="text" hintText="Game Type" fullWidth={true} />
          </div>
        </form>
      </Dialog>
    );
  }
}
