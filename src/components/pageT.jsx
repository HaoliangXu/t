import React from 'react';
import Mui from 'material-ui';
import MainBar from './mainBar.jsx';
var Card = Mui.Card;
var CardText = Mui.CardText;
var CardTitle = Mui.CardTitle;


//TODO remove this theme manager when React 0.14 released, aka the parent-based context takes effect
var ThemeManager = new Mui.Styles.ThemeManager();

export default class PageT extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        {JSON.stringify(this.props.content.T)}
        <MainBar page={this.props.content.page} />
      </div>
    );
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

}

PageT.childContextTypes = {
  muiTheme: React.PropTypes.object
};
