import React from 'react';
import MainMenuStore from "../stores/mainMenuStore.js";
import AppActions from "../actions/appActions.js";
import Mui from 'material-ui';
import DialogAuth from "./dialogAuth.jsx";
import Comm from "../services/communicate.js";
//import rawTheme from "../myMuiTheme.js";

//Set mui theme, see material-ui docs
//var ThemeManager = Mui.Styles.ThemeManager;

var LeftNav = Mui.LeftNav;
var MenuItem = Mui.MenuItem;

var menuItems = [
  { route: 'discover', text: 'Discover' },
  { route: 'calendar', text: 'Calendar' },
  { route: 'likes', text: 'Likes' },
  { route: 'msg', text: 'Messages' },
  { route: 'forums', text: 'Forums' },
  { route: 'settings', text: 'Settings' },
  { route: 'about', text: 'About' },
  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://www.google.com',
     text: 'Disabled Link',
     disabled: true
  },
];

export default class MainMenu extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      show: MainMenuStore.showMenu
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    MainMenuStore.addChangeListener( this._onChange );
  }

  componentWillUnmount(){
    MainMenuStore.removeChangeListener( this._onChange );
  }

  render(){
    return (
      <div>
        <LeftNav ref="leftNav" disableSwipeToOpen={true} docked={false}
          menuItems={menuItems} onChange={this._onItemChange}/>
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

  //For Mui
//  getChildContext() {
//    return {
//      muiTheme: ThemeManager.getMuiTheme(rawTheme)
//    };
//  }

  _onItemChange( e, item, payload ){
    console.log("change");
    AppActions.switchPage(payload.route);
    AppActions.showSpinner();
    Comm.reqPage({
      page: payload.route,
      params: {
        default: true,
      }
    });
  }

  _onChange(){
    var state = MainMenuStore.mainMenuState;
    console.log(state);
    if (state.triggerShow) {
      this.open();
      return;
    }
    this.setState(state);
  }

}

//For Mui
//MainMenu.childContextTypes = {
//  muiTheme: React.PropTypes.object
//};
