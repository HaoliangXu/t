import React from 'react';
import MainButtonGroup from './mainButtonGroup.jsx';
import Spinner from './spinner.jsx';

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
        <MainButtonGroup page='discover'/>
        <Spinner />
      </div>
    );
  }
}
