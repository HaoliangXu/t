import React from 'react';
import Mui from 'material-ui';
import MainButtonGroup from './mainButtonGroup.jsx';
import PageViewTStore from "../stores/pageViewTStore.js";
import AppActions from "../actions/appActions.js";
var Card = Mui.Card;
var CardText = Mui.CardText;
var CardTitle = Mui.CardTitle;


//TODO remove this theme manager when React 0.14 released, aka the parent-based context takes effect
var ThemeManager = new Mui.Styles.ThemeManager();

export default class PageViewT extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      content: {}
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    PageViewTStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    PageViewTStore.removeChangeListener(this._onChange);
  }

  render(){
    return (
      <div>
        {JSON.stringify(this.state.content.T)}
        <MainButtonGroup page="viewT" />
      </div>
    );
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  _onChange(){
    window.setTimeout(AppActions.hideSpinner, 0);
    this.setState({
      content: PageViewTStore.pageContent
    });
  }

}

PageViewT.childContextTypes = {
  muiTheme: React.PropTypes.object
};
