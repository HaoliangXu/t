import React from 'react';
import Dialog from 'material-ui/lib/dialog.js';
import TextField from 'material-ui/lib/text-field.js';
import AuthActions from '../actions/authActions.js';
import DialogAuthStore from '../stores/dialogAuthStore.js';
import Comm from '../services/communicate.js';

var preventDismissEvent = false;

export default class DialogAuth extends React.Component{
  constructor(props){
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onDialogCancel = this._onDialogCancel.bind(this);
    this._onDialogSubmit = this._onDialogSubmit.bind(this);
    this.standardActions = [
      { text: 'OK', onTouchTap: this._onDialogSubmit, ref: 'submit' },
      { text: 'Nay', onTouchTap: this._onDialogCancel}
    ];
  }

  componentDidMount(){
    DialogAuthStore.addChangeListener( this._onChange );
  }

  componentWillUnmount(){
    DialogAuthStore.removeChangeListener( this._onChange );
  }

  show(){
    this.refs.dialog.show();
  }

  dismiss(){
    this.refs.dialog.dismiss();
  }

  render(){
    return (
      <Dialog
        title='Login'
        actions={this.standardActions}
        actionFocus='submit'
        ref='dialog'
        onDismiss={this._onDismiss}>
        <form role='form'>
          <p ref='tips'>Tips:</p>
          <div className='form-group'>
            <TextField type='text' hintText='Username' ref='txtUsername' fullWidth={true} />
            <br />
            <TextField type='password' hintText='Password' ref='txtPassword' fullWidth={true} />
          </div>
        </form>
      </Dialog>
    );
  }

  _showSpinner(){

  }

  _onDialogSubmit(){
    console.log('on dialog submit');

    Comm.reqLogin(this.refs.txtUsername.getValue(), this.refs.txtPassword.getValue());
    this._showSpinner();//TODO show and hid spinner
  }

  _onDialogCancel(){
    console.log('on dialog cancel');
    this.dismiss();
  }

  _onDismiss(){
    if (preventDismissEvent) {
      return;
    }
    AuthActions.dismissLogin();
  }

  _onChange(){
    //Check if there is msg to show
    if ( DialogAuthStore.msg.type !== '' ) {
      console.log( DialogAuthStore.msg.text );
      return;
    }
    if ( DialogAuthStore.showDialog ) {
      this.show();
      return;
    } else {
      preventDismissEvent = true;
      this.dismiss();
      preventDismissEvent = false;
    }
  }
}
