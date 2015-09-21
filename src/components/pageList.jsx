import React from 'react';
import Mui from 'material-ui';
import PageListStore from "../stores/pageListStore.js";
import AppActions from "../actions/appActions.js";
import Comm from "../services/communicate.js"
var List = Mui.List;
var ListItem = Mui.ListItem;
var ListDivider = Mui.ListDivider;

//TODO remove this theme manager when React 0.14 released, aka the parent-based context takes effect
var ThemeManager = new Mui.Styles.ThemeManager();

export default class PageList extends React.Component{

  constructor(props){
    super(props);
    this._generateListComponents = this._generateListComponents.bind(this);
  }

  _onItemClick(itemIndex, listIndex){
    AppActions.waitComm();
    Comm.reqT(this.props.content.lists[listIndex].listItems[itemIndex].id);
  }
  //
  _generateListComponents(list, listIndex){
    var items = [];
    if (list.listItems.length) {
      items = list.listItems.map(function(item, itemIndex){
        return <ListItem primaryText={item.itemName} onClick={this._onItemClick.bind(this, itemIndex, listIndex)} key={"item" + itemIndex} />;
      }.bind(this));
    }
    return <List subtitle={list.listName} key={"list" + listIndex}>
      {items}
    </List>;
  }

  render(){
    return (
      <div>
        {this.props.content.lists.map(this._generateListComponents)}
      </div>
    );
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

}

PageList.childContextTypes = {
  muiTheme: React.PropTypes.object
};
