import React from 'react';
import SpinnerStore from "../stores/SpinnerStore.js";
import Mui from 'material-ui';

let showSpinner = false

export default class PageDiscover extends React.Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    SpinnerStore.addChangeListener(this._onToggleSpinner);
  }

  render(){
    return (
      <div id="spinner">

      </div>
    );
  }

  _getState(){
  }

  _show(){

  }

  _hide(){

  }

  _onToggleSpinner(){
    if (showSpinner) {
      this.show();
    }
    else {
      this.hide();
    }
  }

}
