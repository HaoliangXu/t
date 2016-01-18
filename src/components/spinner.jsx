import React from 'react';
import SpinnerStore from '../stores/SpinnerStore.js';
import CircularProgress from 'material-ui/lib/circular-progress';

export default class Spinner extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      show: SpinnerStore.showSpinner
    };
    this._onChange = this._onChange.bind(this);
    this._spinnerPage = <div className='spinner'><div className='spinnerPosition'>
      <CircularProgress mode='indeterminate' size={1.5} />
    </div></div>;
  }

  componentDidMount(){
    SpinnerStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    SpinnerStore.removeChangeListener(this._onChange);
  }

  render(){
    //return this._spinnerPage;
    return this.state.show ? this._spinnerPage : null;
  }

  _onChange(){
    this.setState({
      show: SpinnerStore.showSpinner
    });
  }

}
