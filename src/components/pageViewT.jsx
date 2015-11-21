import React from 'react';
import MainButtonGroup from './mainButtonGroup.jsx';
import PageViewTStore from '../stores/pageViewTStore.js';
import AppActions from '../actions/appActions.js';

export default class PageViewT extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      content: {}
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    PageViewTStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    PageViewTStore.removeChangeListener(this._onChange);
  }

  render(){
    return (
      <div>
        {JSON.stringify(this.state.content.T)}
        <MainButtonGroup page='viewT' />
      </div>
    );
  }

  _onChange(){
    setTimeout(AppActions.hideSpinner);
    let newState = {
      page: 'viewT',
      content: PageViewTStore.pageContent
    };
    this.setState(newState);
    setTimeout(function(){
      AppActions.updateHistoryContent(newState);
    });
  }

}
