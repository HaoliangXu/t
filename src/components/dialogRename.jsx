import React from 'react';
import Dialog from 'material-ui/lib/dialog.js';
import TextField from 'material-ui/lib/text-field.js';
import AppActions from '../actions/appActions.js';

export default class DialogRename extends React.Component{
  constructor(props){
    super(props);
    this._onDialogCancel = this._onDialogCancel.bind(this);
    this._onDialogSubmit = this._onDialogSubmit.bind(this);
    this.show = this.show.bind(this);
    this.standardActions = [
      {text: 'Yep', onTouchTap: this._onDialogSubmit, ref: 'submit'},
      {text: 'Nay', onTouchTap: this._onDialogCancel}
    ];
  }

  show(){
    this.refs.dialog.setState({
      open: true
    });
  }

  dismiss(){
    this.refs.dialog.setState({
      open: false
    });
  }

  _onDialogSubmit(){
    console.log('on dialog submit');
    AppActions.changeGroupName(
      this.refs.inputName.getValue(),
      this.props.groupIndex,
      this.props.stageIndex
    );
  }

  _onDialogCancel(){
    console.log('on dialog cancel');
    this.dismiss();
  }

  render(){
    return (
      <Dialog
        title='Give it an other name'
        actions={this.standardActions}
        actionFocus='submit'
        ref='dialog'>
        <form role='form'>
          <div className='form-group'>
            <TextField
              type='text'
              hintText={''}
              defaultValue={this.props.currentName}
              ref='inputName'
              fullWidth={true}
              />
          </div>
        </form>
      </Dialog>
    );
  }
}
