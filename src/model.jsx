import React from 'react';
import View from './view.jsx';
import Comm from './communicate.js';

export default class Model {

  constructor(initState){
    this.comm = new Comm();
    this.appState = {
      'page': initState.page,
      'params': initState.params,
      'userID': initState.userID
    };
  }

  start(){
    switch (this.appState.page){
      case 'createT':
        break;
      case 'viewT':
        this.comm.reqTData(this.appState.params.pageSource, this.tJsonHandler.bind(this), this.errHandler.bind(this));
        break;
      case 'match':
        break;
      case 'calendar':
        break;
      case 'likes':
        break;
      //Default page 'discover'
      default:
        this.comm.reqTList(this.appState.params, this.listJsonHandler.bind(this), this.errHandler.bind(this));
    }
    this.view = React.render(<View page={this.appState.page} tData={{}}/>, document.getElementById('app'));
  }

  tJsonHandler(res){
    this.view.setState({
      "tData": res
    });
  }

  listJsonHandler(res) {
    this.view.setState({
      "listData": res
    });
  }

  errHandler(err, msg){//TODO need a powerful error handler
      console.log(msg);
  }


}
