import React from 'react';
import Card from 'material-ui/lib/card/card.js';
import CardText from 'material-ui/lib/card/card-text.js';

export default class CardPaticipants extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cData: {}
    };
  }

  componentWillMount(){
    this.setState({cData: this.props.cData});
  }

  render(){
    return (
      <Card className="card">
        <CardText expandable={true}>{JSON.stringify(this.state.cData)}</CardText>
      </Card>
    );
  }
}
