import React from 'react';
import Mui from 'material-ui';
import Title from './title.jsx';
//var RaisedButton = Mui.RaisedButton;
var ThemeManager = new Mui.Styles.ThemeManager();

export default class App extends React.Component {


  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    return (
      <div className="appBox">
        <Title />
        <section>
          {this.props.originalData}
        </section>
      </div>
    );
  }

}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};
