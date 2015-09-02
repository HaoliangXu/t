import React from 'react';
import Mui from 'material-ui';
var Card = Mui.Card;
var CardText = Mui.CardText;
var CardTitle = Mui.CardTitle;

export default class PageList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listData: {}
    };
  }

  render(){
    return (
      <div>
        {JSON.stringify(this.state.listData)}
      </div>
    );
  }
}
