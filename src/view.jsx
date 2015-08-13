import React from 'react';
import Mui from 'material-ui';
import Title from './title.jsx';//import title component
import CardInfo from './cardInfo.jsx';
import CardPaticipants from './cardPaticipants.jsx';
import CardResults from './cardResults.jsx';
var ThemeManager = new Mui.Styles.ThemeManager();

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tData : {}
    };
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

  render() {
    return (
      <div className="appBox">
        <Title />
        <section className="t">
          {function(input, cards){
            var output = [];
            for (var key in input) {
              output.push(React.createElement(cards[key], {cData:input[key],"key":key}));
            }
            return output;
          }(this.state.tData.toShow, this.cardArray)}
        </section>
      </div>
    );
  }
}

View.childContextTypes = {
  muiTheme: React.PropTypes.object
};
