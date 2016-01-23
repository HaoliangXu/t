import React from 'react';
import AppBar from 'material-ui/lib/app-bar.js';
import Dialog from 'material-ui/lib/dialog.js';
import IconMenu from 'material-ui/lib/menus/icon-menu.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';
import IconButton from 'material-ui/lib/icon-button.js';
import PeopleSvg from 'material-ui/lib/svg-icons/social/people.js';
import Menu from 'material-ui/lib/svg-icons/navigation/menu.js';
import RaisedButton from 'material-ui/lib/raised-button.js';

import Stage from './stage.jsx';
import MainButtonGroup from './mainButtonGroup.jsx';
import DialogTInfo from './dialogTInfo.jsx';
import PageEditTStore from '../stores/pageEditTStore.js';

import Comm from '../services/communicate.js';
import Auth from '../services/auth.js';
import AppActions from '../actions/appActions.js';
import EditTActions from '../actions/editTActions.js';
import {newStage} from '../utils/appConfig.js';

export default class PageEditT extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      page: 'editT',
      //TODO Determine whether ask to save before leaving
      modified: false,
      editMode: false,
      Tjson: {
        name: '',
        results: {
          stages: []
        },
        info: {}
      }
    };
    this._anchor = '';
    this._onTInfo = this._onTInfo.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onDiscard = this._onDiscard.bind(this);
    this._onDialogCancel = this._onDialogCancel.bind(this);
    this._backDialogActions = [
      {text: 'Yep', onTouchTap: this._onDialogSubmit, ref: 'submit'},
      {text: 'Cancel', onTouchTap: this._onDialogCancel}
    ];
  }

  componentDidMount(){
    function scrollTo(){
      var url = location.href;
      location.href = '#' + this._anchor;
    }
    setTimeout(scrollTo.bind(this));
    PageEditTStore.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    PageEditTStore.removeChangeListener(this._onChange);
  }

  render(){
    let _editMenuItem = <div></div>;
    let _editButtons = <div></div>;
    let _editInfoMenuItem = <div></div>;
    if (this.state.editMode){
      let _stageLength = this.state.Tjson.results.stages.length;
      let _saveButtonLable = this.state.Tjson.id ? 'Save' : 'Create';
      _editButtons = <div>
        <RaisedButton onTouchTap={this._onAddNewStage.bind(this, _stageLength)}
          secondary={true} style={{'width': '100%'}} label='Add A New Stage' />
        <RaisedButton onTouchTap={this._onSave}
          primary={true}
          style={{'width': '50%', 'marginTop': '2rem'}}
          label={_saveButtonLable} />
        <RaisedButton onTouchTap={this._onDiscard}
          primary={true}
          style={{'width': '50%', 'marginTop': '2rem'}}
          label='End Editing' />
      </div>;
      _editInfoMenuItem =
        <MenuItem onTouchTap={this._onTInfo} primaryText='Edit Info' />;
    } else {
      if (Auth.authState.id === this.state.Tjson.creatorId){
        _editMenuItem = <MenuItem onTouchTap={this._onEditT.bind(this)} primaryText='Edit' />
      }
    }
    return (
      <div>
        <AppBar
          title={this.state.Tjson.name + (this.state.editMode ? ' --(Edit Mode)' : '')}
          zDepth={2}
          style={{'backgroundColor': '#ff4081', 'height': '10rem'}}
          iconElementRight={<IconButton onTouchTap={this._onPagePlayer}><PeopleSvg /></IconButton>}
          iconElementLeft={<IconMenu iconButtonElement={
              <IconButton><Menu /></IconButton>
              }
              openDirection='bottom-right'>
              {_editMenuItem}
              {_editInfoMenuItem}
            </IconMenu>}
          />
        {this.state.Tjson.results.stages.map((stage, stageIndex)=>{
          return <Stage
            stageData={stage}
            stageIndex={stageIndex}
            editMode={this.state.editMode}
            key={'stage.' + stageIndex}
            />;
        })}
        {_editButtons}
        <Dialog
          title='Really want to leave without save?'
          actions={this._backDialogActions}
          actionFocus='submit'
          ref='dialogLeave'>
        </Dialog>
        <DialogTInfo Tjson={this.state.Tjson} ref='dialogTInfo' />
        <MainButtonGroup page='editT' back={this._onDiscard} />
      </div>
    );
  }

  _onPagePlayer(){
    AppActions.nextPage('players');
  }

  _onTInfo(){
    this.refs.dialogTInfo.show();
  }

  _onEditT(){
    AppActions.nextPage('editT');
    AppActions.showSpinner();
    AppActions.loadPage({
      page: 'editT',
      editMode: true,
      modified: false,
      Tjson: this.state.Tjson
    });
  }

  _onSave(){
    if (!this.state.Tjson.name){//TODO Need more validation
      AppActions.showNotice('Can\'t save unnamed tournament');
      return;
    }
    if (!this.state.editMode){
      AppActions.showNotice('Tournament is not modified');
      return;
    }
    AppActions.showSpinner();
    Comm.saveT(this.state.Tjson, this);
  }

  _onDiscard(){
    if (!PageEditTStore.modified) {
      AppActions.lastPage();
      return;
    }
    this.refs.dialogLeave.setState({
      open: true
    });
  }

  _onDialogSubmit(){
    AppActions.lastPage();
  }

  _onDialogCancel(){
    this.refs.dialogLeave.setState({
      open: false
    });
  }

  _onRemoveStage(stageIndex){
    EditTActions.removeStage(stageIndex);
  }

  _onAddNewStage(stageIndex){
    var stage = newStage(stageIndex);
    EditTActions.addStage(stage, stageIndex);
  }

  _onChange(){
    setTimeout(AppActions.hideSpinner);
    this._anchor = PageEditTStore.anchor;
    let newState = {
      page: 'editT',
      Tjson: PageEditTStore.Tjson,
      editMode: PageEditTStore.editMode,
      modified: PageEditTStore.modified
    };
    this.setState(newState);
    setTimeout(function(){
      AppActions.updateHistoryContent(newState);
    });
  }
}
