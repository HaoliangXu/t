import React from 'react';
import SpinnerStore from "../stores/SpinnerStore.js";
import Mui from 'material-ui';

let showSpinner = false

export default class PageDiscover extends React.Component{

  constructor( props ){
    super(props);
    this.state = {
      show: SpinnerStore.showSpinner
    };
    this._getState = this._getState.bind(this);
  }

  componentDidMount(){
    SpinnerStore.addChangeListener( this._getState );
  }

  componentWillUnmount(){
    SpinnerStore.removeChangeListener( this._getState );
  }

  render(){
    return (
      <div id="spinner">

      </div>
    );
  }

  _getState(){
    this.setState({
      show: SpinnerStore.showSpinner
    });
  }

}
