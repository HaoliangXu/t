import React from 'react';
import Mui from 'material-ui';
import Title from './title.jsx';//import title component
import CardResults from './cardResults.jsx';
var ThemeManager = new Mui.Styles.ThemeManager();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tData : {}
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
        <section className="t">
          {function(input){
            var output = [];
            for (var key in input) {
              output.push(React.createElement(CardResults,{"className": "cards", "cData":JSON.stringify(input.key), "key":key}));
            }
            return output
          }(this.state.tData.show)}
        </section>
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};
