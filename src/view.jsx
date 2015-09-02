import L from './i18n.js';
import React from 'react';
import Mui from 'material-ui';
import MainBar from './mainBar.jsx';//import title component
import PageT from './pageT.jsx';
import PageList from "./pageList.jsx";
let List = Mui.List;
let ListDivider = Mui.ListDivider;
let CurrentPage

//set mui theme, see material-ui docs
var ThemeManager = new Mui.Styles.ThemeManager();

export default class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
    CurrentPage = this.selectPage(this.state.page);
  }

  selectPage(page) {
    switch (page) {
      case "viewT", "createT":
        return PageT;
      default:
        return PageList;
    }
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.refs.currentPage.setState({'listData':nextState.listData});
    return false;
  }

  render() {
    return (
      <div className="appBox">
        <MainBar name={L(this.state.tData.name)} />
        <List>
          <CurrentPage ref="currentPage"/>
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
