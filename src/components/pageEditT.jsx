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
import PageEditTStore from '../stores/pageEditTStore.js';

import Comm from '../services/communicate.js';
import AppActions from '../actions/appActions.js';
import EditTActions from '../actions/editTActions.js';

export default class PageEditT extends React.Component{
  constructor( props ){
    super( props );
    this.state = {
      //TODO Determine whether ask to save before leaving
      modified: false,
      Tjson: {
        stages: []
      }
    };
    this._onChange = this._onChange.bind( this );
    this._onSave = this._onSave.bind(this);
    this._onDiscard = this._onDiscard.bind(this);
    this._onDialogCancel = this._onDialogCancel.bind(this);
    this.standardActions = [
      { text: 'Yep', onTouchTap: this._onDialogSubmit, ref: 'submit' },
      { text: 'Cancel', onTouchTap: this._onDialogCancel}
    ];
  }

  componentDidMount(){
    PageEditTStore.addChangeListener( this._onChange );
  }

  componentWillUnmount(){
    PageEditTStore.removeChangeListener( this._onChange );
  }

  render(){
    var stageLength = this.state.Tjson.stages.length;
    return (
      <div>
        <AppBar
          title={this.state.Tjson.name}
          zDepth={2}
          style={{'backgroundColor': '#ff4081', 'height': '10rem'}}
          iconElementRight={<IconButton onTouchTap={this._onShowTMenu}><PeopleSvg /></IconButton>}
          iconElementLeft={
            <IconMenu iconButtonElement={
              <IconButton><Menu /></IconButton>
              }
              openDirection="bottom-right">
              <MenuItem primaryText="Players" />
              <MenuItem primaryText="Info" />
            </IconMenu>
          } />
        {this.state.Tjson.stages.map(function(stage, stageIndex){
          return <Stage stageData={stage} stageIndex={stageIndex} key={'stage.' + stageIndex} />;
        })}
        <RaisedButton onTouchTap={this._onAddNewStage.bind(this, stageLength)}
          secondary={true} style={{'width': '100%'}} label='Add A New Stage' />
        <RaisedButton onTouchTap={this._onSave}
          primary={true} style={{'width': '50%', 'marginTop': '3rem'}} label='Save' />
        <RaisedButton onTouchTap={this._onDiscard}
          primary={true} style={{'width': '50%', 'marginTop': '3rem'}} label='Discard' />
        <Dialog
          title='Really want to leave without save?'
          actions={this.standardActions}
          actionFocus='submit'
          ref='dialog'>
        </Dialog>
        <MainButtonGroup page='editT' back={this._onDiscard}/>
      </div>
    );
  }

  _onSave(){
    console.log('on save T');
    AppActions.showSpinner();
    Comm.saveT(this.state.Tjson);
  }

  _onDiscard(){
    console.log('on discard T');
    if (!PageEditTStore.modifyFlag) {
      AppActions.lastPage();
      return;
    }
    this.refs.dialog.show();
  }

  _onDialogSubmit(){
    AppActions.lastPage();
  }

  _onDialogCancel(){
    this.refs.dialog.dismiss();
  }

  _onRemoveStage(stageIndex){
    EditTActions.removeStage(stageIndex);
  }

  _onAddNewStage(stageIndex){
    EditTActions.addStage(stageIndex);
  }

  _onChange(){
    window.setTimeout(AppActions.hideSpinner, 0);
    if (PageEditTStore.flags.rerender) {
      this.setState({
        Tjson: PageEditTStore.Tjson
      });
      window.setTimeout(function(){
        AppActions.updateHistoryContent({
          page: 'editT',
          Tjson: this.state.Tjson
        });
      }.bind(this), 0);
    }
  }

}
