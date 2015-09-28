import React from 'react';
import Mui from 'material-ui';
import MainButtonGroup from './mainButtonGroup.jsx';
import PageEditTStore from "../stores/pageEditTStore.js";
import AppActions from "../actions/appActions.js";
var Card = Mui.Card;
var CardText = Mui.CardText;
var CardTitle = Mui.CardTitle;

export default class PageEditT extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      content: {}
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    PageEditTStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    PageEditTStore.removeChangeListener(this._onChange);
  }

  render(){
    return (
      <div>
        {JSON.stringify(this.state.content.T)}
        <MainButtonGroup page="viewT" />
      </div>
    );
  }

  _onChange(){
    window.setTimeout(AppActions.hideSpinner, 0);
    this.setState({
      content: PageEditTStore.pageContent
    });
  }

}
