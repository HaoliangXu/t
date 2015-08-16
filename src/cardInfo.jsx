import React from 'react';
import Mui from 'material-ui';
var Card = Mui.Card;
var CardText = Mui.CardText;
var CardTitle = Mui.CardTitle;

export default class CardInfo extends React.Component{
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
        <CardTitle
            expandable={true}
            title="Information"
            showExpandableButton={true} />
        <CardText expandable={true}>{JSON.stringify(this.state.cData)}</CardText>
      </Card>
    );
  }
}
