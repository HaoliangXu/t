import React from 'react';
import Mui from 'material-ui';
import MainBar from './mainBar.jsx';
import PageViewTStore from "../stores/pageViewTStore.js";
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
    this._onLoadContent = this._onLoadContent.bind(this);
  }

  componentDidMount(){
    PageViewTStore.addChangeListener(this._onLoadContent);
  }

  componentWillUnmount(){
    PageViewTStore.removeChangeListener(this._onLoadContent);
  }

  render(){
    return (
      <div>
        {JSON.stringify(this.state.content.T)}
        <MainBar page="viewT" />
      </div>
    );
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  _onLoadContent(){
    console.log("asdf");
    console.log(PageViewTStore.pageContent);
    this.setState({
      content: PageViewTStore.pageContent
    });
  }

}

PageViewT.childContextTypes = {
  muiTheme: React.PropTypes.object
};
