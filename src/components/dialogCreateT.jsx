import React from 'react';
import Mui from 'material-ui';
var Dialog = Mui.Dialog;
var CardText = Mui.CardText;
var CardTitle = Mui.CardTitle;

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
    this.standardActions = [
      { text: 'Do it', onClick: this._onDialogSubmit, ref: 'submit' },
      { text: 'Nay', onClick: this._onDialogCancel}
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
        title="Create A New Tournament"
        actions={this.standardActions}
        actionFocus="submit"
        ref="dialog">
        The actions in this window are created from the json that's passed in.
      </Dialog>
    );
  }
}
