import React from 'react';
import MainMenuStore from '../stores/mainMenuStore.js';
import AppActions from '../actions/appActions.js';
import Auth from '../services/auth.js';
import LeftNav from 'material-ui/lib/left-nav.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';
import DialogAuth from './dialogAuth.jsx';
import Comm from '../services/communicate.js';

export default class MainMenu extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      menuItems: MainMenuStore.mainMenuState.menuItems
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    MainMenuStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    MainMenuStore.removeChangeListener(this._onChange);
  }

  render(){
    return (
      <div>
        <LeftNav ref='leftNav' disableSwipeToOpen={true} docked={false}
          menuItems={this.state.menuItems} onChange={this._onItemChange}/>
        <DialogAuth />
      </div>
    );
  }

  open(){
    this.refs.leftNav.open();
  }

  close(){
    this.refs.leftNav.close();
  }

  _onItemChange(e, index, payload){
    switch (payload.route){
      case 'login':
        Auth.requestAuth({
          authLevel: 1,
          callback: null
        });
        break;
      case 'logout':
        Comm.reqLogout();
        break;
      default:

    }
    /*
    AppActions.switchPage(payload.route);
    AppActions.showSpinner();
    Comm.reqPage({
      page: payload.route,
      params: {
        default: true
      }
    });
    */
  }

  _onChange(){
    var state = MainMenuStore.mainMenuState;
    if (state.triggerShow){
      this.open();
      return;
    }
    this.setState(state);
  }

}
