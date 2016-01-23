import React from 'react';
import Dialog from 'material-ui/lib/dialog.js';
import TextField from 'material-ui/lib/text-field.js';
import AuthActions from '../actions/authActions.js';
import AppActions from '../actions/appActions.js';
import DialogAuthStore from '../stores/dialogAuthStore.js';
import Comm from '../services/communicate.js';

var preventDismissEvent = false;

export default class DialogAuth extends React.Component{
  constructor(props){
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onDialogCancelSignup = this._onDialogCancelSignup.bind(this);
    this._onDialogCancelLogin = this._onDialogCancelLogin.bind(this);
    this._onDialogLogin = this._onDialogLogin.bind(this);
    this._onDialogShowSignup = this._onDialogShowSignup.bind(this);
    this._onSignup = this._onSignup.bind(this);
    this.loginActions = [
      {text: 'Login', onTouchTap: this._onDialogLogin, ref: 'login'},
      {text: 'Signup', onTouchTap: this._onDialogShowSignup, ref: 'showSignup'},
      {text: 'Cancel', onTouchTap: this._onDialogCancelLogin}
    ];
    this.signupActions = [
      {text: 'Signup', onTouchTap: this._onSignup, ref: 'signup'},
      {text: 'Cancel', onTouchTap: this._onDialogCancelSignup}
    ];
  }

  componentDidMount(){
    DialogAuthStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    DialogAuthStore.removeChangeListener(this._onChange);
  }

  show(){
    this.refs.dialogRepeatPassword.setState({
      open: false
    });
    this.refs.dialog.setState({
      open: true
    });
    setTimeout(function(){
      this.refs.txtEmail.setValue('');
      this.refs.txtPassword.setValue('');
      this.refs.txtEmail.focus();
    }.bind(this));
  }

  dismiss(){
    this.refs.dialogRepeatPassword.setState({
      open: false
    });
    this.refs.dialog.setState({
      open: false
    });
  }

  render(){
    return (
      <div>
        <Dialog
          actions={this.loginActions}
          actionFocus='login'
          ref='dialog'
          onRequestClose={this._onDismiss}>
          <form role='form'>
            <p ref='tips'>Login or Signup</p>
            <div className='form-group'>
              <TextField
                onEnterKeyDown={this._onDialogLogin}
                onBlur={this._validateEmail.bind(this)}
                type='text' hintText='Email' ref='txtEmail' fullWidth={true} />
              <br />
              <TextField
                onEnterKeyDown={this._onDialogLogin}
                type='password' hintText='Password' ref='txtPassword' fullWidth={true} />
            </div>
          </form>
        </Dialog>
        <Dialog
          title='Repeat your password to sign up'
          actions={this.signupActions}
          actionFocus='signup'
          ref='dialogRepeatPassword'
          onRequestClose={this._onDismiss}>
          <form role='form'>
            <p ref='tips'>Tips:</p>
            <div className='form-group'>
              <TextField
                onEnterKeyDown={this._onDialogShowSignup}
                type='password'
                hintText='Repeate Password'
                ref='txtRepeatePassword'
                fullWidth={true} />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }

  _validateEmail(){
    /*TODO Be more responsible
    let email = this.refs.txtEmail.getValue();

    if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)){
      AppActions.showNotice('Invalid email address');
    }
    */
  }

  _onDialogLogin(){
    console.log('on dialog login');
    let email = this.refs.txtEmail.getValue();
    let password = this.refs.txtPassword.getValue();

    //Email and password validation
    if (!/^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)){
      AppActions.showNotice('Invalid email address');
      return;
    }
    if (!/^(?=.{6,16}$)(?![0-9]+$)[\.$#@^&0-9a-zA-Z_-]+$/.test(password)){
      AppActions.showNotice('Illegal password');
      return;
    }
    AppActions.showSpinner();
    Comm.reqLogin(email, password);
  }

  _onDialogShowSignup(){
    let email = this.refs.txtEmail.getValue();
    let password = this.refs.txtPassword.getValue();
    //Email and password validation
    if (!/^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)){
      AppActions.showNotice('Invalid email address');
      return;
    }
    if (!/^(?=.{6,16}$)(?![0-9]+$)[\.$#@^&0-9a-zA-Z_-]+$/.test(password)){
      AppActions.showNotice('Illegal password');
      return;
    }
    this.refs.dialogRepeatPassword.setState({
      open: true
    });
    setTimeout(function(){
      this.refs.txtRepeatePassword.setValue('');
      this.refs.txtRepeatePassword.focus();
    }.bind(this));
  }

  _onSignup(){
    let email = this.refs.txtEmail.getValue();
    let password = this.refs.txtPassword.getValue();
    let repeatePassword = this.refs.txtRepeatePassword.getValue();
    if (password !== repeatePassword){
      AppActions.showNotice('Password doesn\'t match');
      this.refs.dialogRepeatPassword.setState({
        open: false
      });
      return;
    }
    Comm.reqSignup(email, password);
  }

  _onDialogCancelLogin(){
    console.log('on dialog cancel');
    this.dismiss();
  }

  _onDialogCancelSignup(){
    this.refs.dialogRepeatPassword.setState({
      open: false
    });
  }

  _onDismiss(){
    if (preventDismissEvent){
      return;
    }
    AuthActions.dismissLogin();
  }

  _onChange(){
    //Check if there is msg to show
    if (DialogAuthStore.msg.type !== ''){
      console.log(DialogAuthStore.msg.text);
      //TODO Show the msg on the dialog
      return;
    }
    if (DialogAuthStore.showDialog){
      this.show();
      return;
    } else {
      preventDismissEvent = true;
      this.dismiss();
      preventDismissEvent = false;
    }
  }
}
