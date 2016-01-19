import React from 'react';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group.js';
import FloatingActionButton from 'material-ui/lib/floating-action-button.js';
import DialogCreateT from './dialogCreateT.jsx';
import AppActions from '../actions/appActions.js';
import Auth from '../services/auth.js';

import BackSvgIcon from 'material-ui/lib/svg-icons/navigation/arrow-back.js';
import AddSvgIcon from 'material-ui/lib/svg-icons/content/add.js';
import FavSvgIcon from 'material-ui/lib/svg-icons/action/favorite-border.js';
import ShareSvgIcon from 'material-ui/lib/svg-icons/social/share.js';
import FilterSvgIcon from 'material-ui/lib/svg-icons/content/filter-list.js';
import MenuSvgIcon from 'material-ui/lib/svg-icons/navigation/menu.js';


var style = {
  margin: '0.7rem'
};

var SecondIcon = AddSvgIcon;
var ThirdIcon = FilterSvgIcon;
/*  An over all map of page properties can save some switches, maybe with better performance
 *  But it makes code harder to maintaince.
var pageProperty = {
  'discover': {
    mainButtonFunc: {

    },
    mainButtonAvatar: {

    },
    pageComponent:{

    },
    commRequest:{

    }
  }
}
*/
export default class MainButtonGroup extends React.Component {
  constructor(props){
    super(props);
    if (props.back) {
      this._onClickButton1 = props.back;
    } else {
      this._onClickButton1 = this._onBackClick.bind(this);
    }
    this._onClickButton4 = this._onMenuClick.bind(this);
    this.selectButtons(props.page);
  }

  componentWillUpdate(newProps, newState){
    this.selectButtons(newProps.page);
  }

  //Once page changes, decide which button to use. TODO add avatar selection.
  selectButtons(page){
    switch (page){
      case 'discover':
      case 'calendar':
      case 'vacancy':
        SecondIcon = AddSvgIcon;
        ThirdIcon = FilterSvgIcon;
        this._onClickButton2 = this._onCreateTClick.bind(this);
        this._onClickButton3 = this._onFilterClick.bind(this);
        break;
      case 'viewT':
      case 'editT':
      case 'players':
      case 'match':
        SecondIcon = FavSvgIcon;
        ThirdIcon = ShareSvgIcon;
        this._onClickButton2 = this._onLikeClick.bind(this);
        this._onClickButton3 = this._onShareClick.bind(this);
        break;
    }
  }

  _onBackClick(){
    console.log('back clicked');
    AppActions.lastPage();
  }

  _onLikeClick(){
    console.log('like clicked');

  }

  _onShareClick(){
    console.log('share clicked');

  }

  _onMenuClick(){
    console.log('menu clicked');
    AppActions.showMainMenu();
  }

  _onCreateTClick(){
    console.log('create clicked');
    var callback = this.refs.dialogCreateT.show;
    Auth.requestAuth({
      authLevel: 2,
      callback: callback
    });
  }

  _onFilterClick(e){
    console.log('filter clicked');
  }

  render() {
    return (
      <div className='mainButtonGroup'>
        <ToolbarGroup float='right'>
          <FloatingActionButton style={style} secondary={true}
            onTouchTap={this._onClickButton1}>
            <BackSvgIcon />
          </FloatingActionButton>
          <FloatingActionButton style={style} secondary={true}
            onTouchTap={this._onClickButton2}>
            <SecondIcon />
          </FloatingActionButton>
          <FloatingActionButton style={style} secondary={true}
            onTouchTap={this._onClickButton3}>
            <ThirdIcon />
          </FloatingActionButton>
          <FloatingActionButton style={style} secondary={true}
            onTouchTap={this._onClickButton4}>
            <MenuSvgIcon />
          </FloatingActionButton>
        </ToolbarGroup>
        <DialogCreateT ref='dialogCreateT'/>
      </div>
    );
  }
}
