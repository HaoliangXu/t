import L from './i18n.js';
import React from 'react';
import Mui from 'material-ui';
import Title from './title.jsx';//import title component
import CardInfo from './cardInfo.jsx';
import CardPaticipants from './cardPaticipants.jsx';
import CardResults from './cardResults.jsx';

//set mui theme, see material-ui docs
var ThemeManager = new Mui.Styles.ThemeManager();

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.cardArray = {
      "info": CardInfo,
      "paticipants": CardPaticipants,
      "results": CardResults
    };
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  generateParts(input, cards){
    var output = [];
    for (var key in input) {
      output.push(React.createElement(cards[key], {cData:input,"key":key}));
    }
    return output;
  }

  render() {
    console.log(this.state);
    return (
      <div className="appBox">
        <Title name={L(this.state.tData.name)}/>
        <section className="t">
          {this.generateParts(this.state.tData.toShow, this.cardArray)}
        </section>
      </div>
    );
  }
}

View.childContextTypes = {
  muiTheme: React.PropTypes.object
};
