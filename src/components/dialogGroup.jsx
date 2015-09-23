import React from 'react';
import DialogGroupStore from "../stores/dialogGroupStore.js";
import Mui from 'material-ui';
import AppActions from "../actions/appActions.js";
import DialogCreateT from "./dialogCreateT.jsx";
var Dialog = Mui.Dialog;

export default class DialogGroup extends React.Component{
  constructor(props){
    super(props);
    this.showDialog = "";
  }

  componentWillMount(){
    DialogGroupStore.subscribe(this._onChange);
  }

  //For better performance, all components in this group will not re-render while appstore state changes.
  shouldComponentUpdate(){
    return false;
  }

  render(){
    return (
      <div>
        <DialogCreateT ref={"createT"}/>
      </div>
    );
  }

  _onChange(){
    this.showDialog = GroupStore.getDialogState().show;
    this.refs[this.showDialog].show();
  }
}
