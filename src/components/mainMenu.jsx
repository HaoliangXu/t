import React from 'react';
import MainMenuStore from "../stores/mainMenuStore.js";
import AppActions from "../actions/appActions.js";
import Mui from 'material-ui';
var LeftNav = Mui.LeftNav;
var MenuItem = Mui.MenuItem;

var menuItems = [
  { route: 'get-started', text: 'Get Started', onTouchTap: AppActions.lastPage},
  { route: 'customization', text: 'Customization' },
  { route: 'components', text: 'Components' },
  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  {
     type: MenuItem.Types.LINK,
     payload: 'https://github.com/callemall/material-ui',
     text: 'GitHub'
  },
  {
     text: 'Disabled',
     disabled: true
  },
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
      <LeftNav ref="leftNav" docked={false} menuItems={menuItems} onChange={this._onItemChange}/>
    );
  }

  open(){
    this.refs.leftNav.open();
  }

  close(){
    this.refs.leftNav.close();
  }

  _onItemChange(){
    console.log("change");
  }

  _onChange(){
    var state = MainMenuStore.mainMenustate;
    if (state.show) {
      this.open();
    } else {
      this.close();
    }
    this.setState(state);
  }

}
