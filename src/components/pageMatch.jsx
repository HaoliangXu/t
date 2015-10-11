import React from 'react';
import Card from 'material-ui/card/card.js';
import CardTitle from 'material-ui/card/card-title.js';
import CardText from 'material-ui/card/card-text.js';

export default class PageMatch extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pageData: {}
    };
  }

  render(){
    return (
      <div>
        {JSON.stringify(this.state.pageData)}
      </div>
    );
  }
}
