import React from 'react';
//import Mui from 'material-ui';
//var ListItem = Mui.ListItem;
//var AppActions = require('../actions/appActions');


export default class Elimination extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      content: props.content
    };
  }

  _generateMatches(number){

  }

  render() {
    //var todo = this.props.todo;
    return (
      <div>
        {JSON.stringify(this.props.content)}
      </div>
    );
  }

}
