import React from 'react';
import AppActions from '../actions/appActions.js';
import PageDiscoverStore from '../stores/pageDiscoverStore.js';
import MainButtonGroup from './mainButtonGroup.jsx';
import Spinner from './spinner.jsx';
import Comm from '../services/communicate.js';
import List from 'material-ui/lib/lists/list.js';
import ListItem from 'material-ui/lib/lists/list-item.js';

export default class PageDiscover extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      page: 'discover',
      lists: []
    };
    this._onChange = this._onChange.bind(this);
    this._generateListComponents = this._generateListComponents.bind(this);
  }

  componentDidMount(){
    var params = PageDiscoverStore.getParams();

    //Only when it is not the starting of the app
    //TODO Could be more elegant to do this job
    if ((typeof params.default) !== 'undefined'){
      Comm.reqTList(params);
    }

    PageDiscoverStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    PageDiscoverStore.removeChangeListener(this._onChange);
  }

  render(){
    return (
      <div>
        {this.state.lists.map(this._generateListComponents)}
        <MainButtonGroup page='discover'/>
        <Spinner />
      </div>
    );
  }

  _onItemClick(itemIndex, listIndex){
    AppActions.nextPage('editT');
    AppActions.showSpinner();
    Comm.reqT(this.state.lists[listIndex].listItems[itemIndex].id);
  }

  _generateListComponents(list, listIndex){
    var items = [];
    if ( list.listItems.length ) {
      items = list.listItems.map(function(item, itemIndex){
        return <ListItem primaryText={item.itemName} onClick={this._onItemClick.bind(this, itemIndex, listIndex)} key={'item' + itemIndex} />;
      }.bind( this ));
    }
    return <List subtitle={list.listName} key={'list' + listIndex}>
      {items}
    </List>;
  }

  _onChange(){
    setTimeout(AppActions.hideSpinner);
    let newState = {
      page: 'discover',
      lists: PageDiscoverStore.getLists()
    }
    this.setState(newState);
    setTimeout(function(){
      AppActions.updateHistoryContent(newState);
    });
  }
}
