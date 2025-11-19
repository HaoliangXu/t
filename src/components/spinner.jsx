import React from 'react';
import SpinnerStore from '../stores/SpinnerStore.js';

export default class Spinner extends React.Component{

  constructor( props ){
    super(props);
    this.state = {
      show: SpinnerStore.showSpinner
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    SpinnerStore.addChangeListener( this._onChange );
  }

  componentWillUnmount(){
    SpinnerStore.removeChangeListener( this._onChange );
  }

  render(){
    return (
      <div id='spinner'>

      </div>
    );
  }

  _onChange(){
    this.setState({
      show: SpinnerStore.showSpinner
    });
  }

}
