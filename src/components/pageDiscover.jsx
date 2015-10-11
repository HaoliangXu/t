import React from 'react';
import AppActions from '../actions/appActions.js';
import PageDiscoverStore from '../stores/pageDiscoverStore.js';
import MainButtonGroup from './mainButtonGroup.jsx';
import Spinner from './spinner.jsx';
import Comm from '../services/communicate.js';
import List from 'material-ui/lib/lists/list.js';
import ListItem from 'material-ui/lib/lists/list-item.js';

export default class PageDiscover extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      lists: []
    };
    this._onChange = this._onChange.bind(this);
    this._generateListComponents = this._generateListComponents.bind( this );
  }

  componentDidMount(){
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

  _onItemClick( itemIndex, listIndex ){
    AppActions.nextPage('viewT');
    AppActions.showSpinner();
    Comm.reqT( this.state.lists[ listIndex ].listItems[ itemIndex ].id );
  }

  _generateListComponents( list, listIndex ){
    var items = [];
    if ( list.listItems.length ) {
      items = list.listItems.map(function( item, itemIndex ){
        return <ListItem primaryText={item.itemName} onClick={this._onItemClick.bind( this, itemIndex, listIndex )} key={'item' + itemIndex} />;
      }.bind( this ));
    }
    return <List subtitle={list.listName} key={'list' + listIndex}>
      {items}
    </List>;
  }

  _onChange(){
    window.setTimeout(AppActions.hideSpinner, 0);
    this.setState({
      lists: this._getLists()
    });
    window.setTimeout(function(){
      AppActions.updateHistoryContent({
        page: 'discover',
        lists: this.state.lists
      });
    }.bind(this), 0);
  }


  _getLists(){
    return PageDiscoverStore.getLists();
  }
}
