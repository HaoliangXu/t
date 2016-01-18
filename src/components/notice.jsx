import React from 'react';
import Snackbar from 'material-ui/lib/snackbar.js';
import NoticeStore from '../stores/noticeStore.js';

export default class Notice extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      notice: ''
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount(){
    NoticeStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    NoticeStore.removeChangeListener(this._onChange);
  }

  render(){
    return <Snackbar
      style={{zIndex: '20'}}
      message={this.state.notice}
      autoHideDuration={3000}
      ref='notice' />;
  }

  _onChange(){
    this.setState({
      notice: NoticeStore.notice
    });
    this.refs.notice.setState({
      open: true
    });
  }

}
