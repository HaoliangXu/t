import L from './i18n.js';
import React from 'react';
import Mui from 'material-ui';
import MainBar from './mainBar.jsx';//import title component
import PageT from './pageT.jsx';
let List = Mui.List;
let ListDivider = Mui.ListDivider;

//set mui theme, see material-ui docs
var ThemeManager = new Mui.Styles.ThemeManager();

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    console.log(nextState);
    this.refs.pageT.setState({'cData':nextState.tData.toShow});
    return false;
  }

  render() {
    return (
      <div className="appBox">
        <MainBar name={L(this.state.tData.name)} />
        <List>
          <PageT ref="pageT"/>
        </List>
        <ListDivider />
        <List>
          qwer
        </List>
      </div>
    );
  }
}

View.childContextTypes = {
  muiTheme: React.PropTypes.object
};
