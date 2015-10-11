import React from 'react';
import Card from 'material-ui/lib/card/card.js';
import CardText from 'material-ui/lib/card/card-text.js';
import CardTitle from 'material-ui/lib/card/card-title.js';

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
