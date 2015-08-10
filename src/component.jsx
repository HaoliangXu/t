import React from 'react';
import Mui from 'material-ui';
import Title from './title.jsx';
//var RaisedButton = Mui.RaisedButton;
var ThemeManager = new Mui.Styles.ThemeManager();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showData : ""
    };
  }

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
          <h1>asdf</h1>
          <p>{this.state.showData}</p>
        </section>
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};
