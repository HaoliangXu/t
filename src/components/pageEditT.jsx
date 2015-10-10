import React from 'react';
import AppBar from 'material-ui/lib/app-bar.js';
import RaisedButton from 'material-ui/lib/raised-button.js';
import MainButtonGroup from './mainButtonGroup.jsx';
import PageEditTStore from '../stores/pageEditTStore.js';

//Import Group Creators
import TBD from './formats/tbd.jsx';
import Elimination from './formats/elimination.jsx';
import GroupDual from './formats/groupDual.jsx';

import Comm from '../services/communicate.js';
import AppActions from '../actions/appActions.js';
import EditTActions from '../actions/editTActions.js';

export default class PageEditT extends React.Component{
  constructor( props ){
    super( props );
    this.state = {
      //TODO Determine whether ask to save before leaving
      modified: false,
      Tjson: {}
    };
    this._onChange = this._onChange.bind( this );
    this._onSave = this._onSave.bind(this);
  }

  componentDidMount(){
    PageEditTStore.addChangeListener( this._onChange );
  }

  componentWillUnmount(){
    PageEditTStore.removeChangeListener( this._onChange );
  }

  render(){
    var stageLength = this.state.Tjson.stages ? this.state.Tjson.stages.length : 0;
    return (
      <div>
        <AppBar
          title={this.state.Tjson.name}
          style={{height: '10rem'}}
          zDepth={2}
          onLeftIconButtonTouchTap={this._onShowTMenu}
          onRightIconButtonTouchTap={this._onToggleT}
          iconClassNameRight='muidocs-icon-navigation-expand-more' />
        {this._generateT( this.state.Tjson )}
        <RaisedButton onTouchTap={this._onAddNewStage.bind(this, stageLength)}
          secondary={true} style={{'width': '100%'}} label='Add A New Stage' />
        <RaisedButton onTouchTap={this._onSave}
          primary={true} style={{'width': '50%', 'marginTop': '3rem'}} label='Save' />
        <RaisedButton onTouchTap={this._onDiscard}
          primary={true} style={{'width': '50%', 'marginTop': '3rem'}} label='Discard' />
        <MainButtonGroup page='editT' />
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
  }

  _onToggleT(){
    console.log('on toggle T');
  }

  _onShowTMenu(){
    console.log('on show t menu');
  }

  _generateT( Tjson ){
    //Check whether page is loaded, if not, skip generateT.
    if ( !Tjson.stages ) {
      return undefined;
    }
    let output = Tjson.stages.map( function( stage, stageIndex ){
      let stageItem = stage.groups.map( function( group, groupIndex ){
        let groupItem;
        let props = {
          groupData: group,
          stageIndex: stageIndex,
          groupIndex: groupIndex,
          editMode: true,
          key: groupIndex + '.' + stageIndex
        };
        switch ( group.format ) {
          //Group format to be decided, for user to select.
          case 'tbd':
            groupItem = <TBD {...props} key={groupIndex + '.' + stageIndex} />;//TODO Solve key warning
            break;
          case 'elimination':
            groupItem = <Elimination {...props} key={groupIndex + '.' + stageIndex} />;
            break;
          case 'groupDual':
            groupItem = <GroupDual {...props} key={groupIndex + '.' + stageIndex} />;
            break;
        }
        return groupItem;
      });
      return <div className='stage' key={'stage.' + stageIndex}>
        <AppBar title={stage.name}
          iconClassNameRight='muidocs-icon-navigation-expand-more' />
        {stageItem}
        <RaisedButton
          onTouchTap={this._onAddNewGroup.bind( this, stage.groups.length, stageIndex )}
          style={{'width': '96%', 'margin': '2% 2% 0 2%'}} label='Add A New Group' />
      </div>;
    }.bind(this));
    return output;
  }

  _onAddNewGroup( groupIndex, stageIndex ){
    var group = {
      format: 'tbd'
    };
    EditTActions.addGroup( group, groupIndex, stageIndex );
  }

  _onAddNewStage( stageIndex ){
    var stage = {
      'name': 'Stage ' + (stageIndex + 1),
      'groups': [
        {
          'format': 'tbd'
        }
      ]
    };
    EditTActions.addStage( stage, stageIndex );
  }

  _onChange(){
    window.setTimeout( AppActions.hideSpinner, 0 );
    if ( PageEditTStore.flags.rerender ) {
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
