import React from 'react';
import AppActions from "../actions/appActions.js";
import PageDiscoverStore from "../stores/pageDiscoverStore.js";
import Mui from 'material-ui';
import MainBar from './mainBar.jsx';
import Spinner from "./spinner.jsx";
import Comm from "../services/communicate.js"
var List = Mui.List;
var ListItem = Mui.ListItem;
var ListDivider = Mui.ListDivider;

//TODO remove this theme manager when React 0.14 released, aka the parent-based context takes effect
var ThemeManager = new Mui.Styles.ThemeManager();

export default class PageDiscover extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      lists: []
    };
    this._onLoadContent = this._onLoadContent.bind(this);
    this._generateListComponents = this._generateListComponents.bind( this );
  }

  componentDidMount(){
    PageDiscoverStore.addChangeListener(this._onLoadContent);
  }

  componentWillUnmount(){
    PageDiscoverStore.removeChangeListener(this._onLoadContent);
  }

  render(){
    return (
      <div>
        {this.state.lists.map(this._generateListComponents)}
        <MainBar page="discover"/>
        <Spinner />
      </div>
    );
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  _onItemClick( itemIndex, listIndex ){
    AppActions.switchPage("viewT");
    Comm.reqT( this.state.lists[ listIndex ].listItems[ itemIndex ].id );
  }

  _generateListComponents( list, listIndex ){
    var items = [];
    if ( list.listItems.length ) {
      items = list.listItems.map(function( item, itemIndex ){
        return <ListItem primaryText={item.itemName} onClick={this._onItemClick.bind( this, itemIndex, listIndex )} key={"item" + itemIndex} />;
      }.bind( this ));
    }
    return <List subtitle={list.listName} key={"list" + listIndex}>
      {items}
    </List>;
  }

  _onLoadContent(){
    this.setState({
      lists: this._getLists()
    });
  }


  _getLists(){
    return PageDiscoverStore.getLists();
  }
}

PageDiscover.childContextTypes = {
  muiTheme: React.PropTypes.object
};
