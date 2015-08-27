import React from 'react'
import Mui from 'material-ui'
var AppBar = Mui.AppBar;

export default class MainBar extends React.Component {
  render() {
    return <div className="appTitle">
      <AppBar
          title={this.props.name}
          iconClassNameRight="muidocs-icon-navigation-expand-more" />
    </div>;
  }
}
