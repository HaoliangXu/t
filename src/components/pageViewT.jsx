import React from 'react';
import Mui from 'material-ui';
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
    window.setTimeout(AppActions.hideSpinner, 0);
    this.setState({
      content: PageViewTStore.pageContent
    });
    window.setTimeout(function(){
      AppActions.updateHistoryContent({
        page: 'viewT',
        content: this.state.content
      });
    }.bind(this), 0);
  }

}
