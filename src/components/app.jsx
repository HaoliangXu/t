/*
 * Title: app view component
 * Description: Description
 */
import L from '../services/i18n.js';
import React from 'react';
import Mui from 'material-ui';
import MainButtonGroup from './mainButtonGroup.jsx';
import PageViewT from './pageViewT.jsx';
import PageDiscover from "./pageDiscover.jsx";
import AppStore from "../stores/appStore.js";
import Comm from "../services/communicate.js";
import Router from "../services/router.js";

//Set mui theme, see material-ui docs
var ThemeManager = new Mui.Styles.ThemeManager();

export default class App extends React.Component {

  //Fetch data from router and server, set main view to splash screen as the app just started
  constructor(){
    super();
    this.state = {
      page: AppStore.getPage()
    };
    this._selectPage(this.state.page);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    AppStore.addChangeListener(this._onChange);
    Comm.reqPage(Router.parseCurrentRoute());
  }

  shouldComponentUpdate(newProps, newState){
    this._selectPage(newState.page);
    return true;
  }

  render() {
    return (
      <div className="appBox">
        {this.page}
      </div>
    );
  }

  //For Mui
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  //Once app data loaded, set main view to appbox and its contents, hide splash screen, show main view
  _onChange(){
    this.setState({
      page: AppStore.getPage()
    });
  }

  _selectPage(page){
    switch (page){
      case 'vacancy':
        this.page = "";
        break;
      case 'createT':
        this.page = <PageViewT mode="edit" />;
        break;
      case 'viewT':
        this.page = <PageViewT mode="view" />;
        break;
      case 'match':
        break;
      case 'calendar':
        break;
      case 'likes':
        break;
      //Default page 'discover'
      default:
        this.page = <PageDiscover />;
    }
  }
}

//For Mui
App.childContextTypes = {
  muiTheme: React.PropTypes.object
};
