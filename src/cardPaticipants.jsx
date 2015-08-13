import React from 'react';
import Mui from 'material-ui';
var Card = Mui.Card;
var CardText = Mui.CardText;

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
      <Card style={{margin:10}}>
        <CardText>{JSON.stringify(this.state.cData)}</CardText>
      </Card>
    );
  }
}
