import React from 'react';

export default class PageCalendar extends React.Component{
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
