import React from 'react'
import Mui from 'material-ui'
var Toolbar = Mui.Toolbar;
var ToolbarGroup = Mui.ToolbarGroup;
var ToolbarSeparator = Mui.ToolbarSeparator;
var RaisedButton = Mui.RaisedButton;
var FloatingActionButton = Mui.FloatingActionButton;

var style = {
  margin: "2em"
};
/*  An over all map of page properties can save some switches, maybe with better performance
 *  But it makes code harder to maintaince.
var pageProperty = {
  "discover": {
    mainButtonFunc: {

    },
    mainButtonAvatar: {

    },
    pageComponent:{

    },
    commRequest:{

    }
  }
}
*/
export default class MainBar extends React.Component {
  constructor(props){
    super(props);
    this._onClickButton1 = this._onBackClick;
    this._onClickButton4 = this._onMenuClick;
    this.selectButtons(props.page);
  }

  componentWillUpdate(newProps, newState){
    this.selectButtons(newProps.page);
  }

  //When page changes, decide which button to use. TODO add avatar selection.
  selectButtons(page){
    switch (page){
      case "discover", "calendar", "vacancy":
        this._onClickButton2 = this._onCreateClick;
        this._onClickButton3 = this._onFilterClick;
        break;
      case "viewT", "createT":
        this._onClickButton2 = this._onLikeClick;
        this._onClickButton3 = this._onShareClick;
    }
  }
  _onBackClick(e){
    console.log("back clicked");
  }
  _onLikeClick(e){
    console.log("like clicked");

  }
  _onShareClick(e){
    console.log("share clicked");

  }
  _onMenuClick(e){
    console.log("menu clicked");

  }
  _onCreateClick(e){
    console.log("create clicked");

  }
  _onFilterClick(e){
    console.log("filter clicked");

  }
  render() {
    return <div className="mainBar">
          <ToolbarGroup key={0} float="left">
            <FloatingActionButton iconClassName="muidocs-icon-action-grade" style={style} secondary={true}
              onClick={this._onClickButton1} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <FloatingActionButton iconClassName="muidocs-icon-action-thumb-up" style={style} secondary={true}
              onClick={this._onClickButton2} />
            <FloatingActionButton iconClassName="muidocs-icon-action-stars" style={style} secondary={true}
              onClick={this._onClickButton3} />
            <FloatingActionButton iconClassName="muidocs-icon-action-home" style={style} secondary={true}
              onClick={this._onClickButton4} />
          </ToolbarGroup>
      </div>;
  }
}
