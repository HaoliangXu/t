/*
 * Title: app view component
 * Description: Description
 */
import L from '../services/i18n.js';
import React from 'react';
import Mui from 'material-ui';
import MainBar from './mainBar.jsx';
import PageT from './pageT.jsx';
import PageDiscover from "./pageDiscover.jsx";
import AppStore from "../stores/appStore.js";

//Set mui theme, see material-ui docs
var ThemeManager = new Mui.Styles.ThemeManager();

export default class App extends React.Component {

  //Fetch data from router and server, set main view to splash screen as the app just started
  constructor(){
    super();
    this.state = {
      pageState: AppStore.getPageState()
    };
    this._selectPage(this.state.pageState);
    this._onPageLoad = this._onPageLoad.bind(this);
  }

  componentDidMount(){
    AppStore.addChangeListener(this._onPageLoad);
  }

  shouldComponentUpdate(newProps, newState){
    this._selectPage(newState.pageState);
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

  //When app data loaded, set main view to appbox and its contents, hide splash screen, show main view
  _onPageLoad(){
    this.setState({
      pageState: AppStore.getPageState()
    });
  }

  _selectPage(content){
    switch (content.page){
      case 'vacancy':
        this.page = "";
        break;
      case 'createT':
        this.page = <PageT mode="edit" content={content} />;
        break;
      case 'viewT':
        this.page = <PageT mode="view" content={content} />;
        break;
      case 'match':
        break;
      case 'calendar':
        break;
      case 'likes':
        break;
      //Default page 'discover'
      default:
        this.page = <PageDiscover content={content} />;
    }
  }
}

//For Mui
App.childContextTypes = {
  muiTheme: React.PropTypes.object
};
