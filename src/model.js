import React from 'react';
import View from './view.jsx';
import Comm from './communicate.js';

export default class Model {

  constructor(initState){
    this.comm = new Comm();
    this.appState = {
      'page': initState.page,
      'pageSource': initState.pageSource
    };
  }

  start(){
    if (this.appState.page === 't') {
      this.comm.reqT(this.appState.pageSource, this.tJsonHandler.bind(this), this.errHandler.bind(this));
    }
    this.view = React.render(<View page={this.appState.page}/>, document.getElementById('app'));
  }

  tJsonHandler(res){
    this.view.setState({
      tData: res
    });
  }

  errHandler(err, msg){
      console.log(msg);
  }
}
