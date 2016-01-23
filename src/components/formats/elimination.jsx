import React from 'react';
import BaseFormat from './baseFormat.jsx';
import {Card, CardTitle, CardText, CardHeader} from 'material-ui/lib/card/index.js';
import Dialog from 'material-ui/lib/dialog.js';
import RaisedButton from 'material-ui/lib/raised-button.js';
import IconMenu from 'material-ui/lib/menus/icon-menu.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';

import DialogGroupPlayers from '../dialogGroupPlayers.jsx';
import eliminationStyles from '../../utils/eliminationStyles.js';
import doubleEliminationStyles from '../../utils/doubleEliminationStyles.js';
import AppActions from '../../actions/appActions.js';
import PlayersService from '../../services/players.js';


export default class Elimination extends BaseFormat{
  constructor(props){
    super(props);
    if (this.props.groupData.format === 'elimination'){
      this._styles = eliminationStyles[this.props.groupData.matches.length + 1];
      return;
    }
    if (this.props.groupData.format === 'doubleElimination'){
      this._styles = doubleEliminationStyles[this.props.groupData.matches.length / 2 + 1];
      return;
    }
    //TODO emit error: Invalid Format
  }

  render(){
    let _iconMenu = this.props.editMode ? <IconMenu style={{'float': 'left'}} openDirection='bottom-right' iconButtonElement={this._iconButtonElement}>
      {this._basicIconMenu}
      <MenuItem
        onTouchTap={this._onEditInfo} primaryText='Edit Info' />
      <MenuItem
        onTouchTap={this._onShowDialogGroupPlayers} primaryText='Players' />
    </IconMenu> : null;
    this._dialogGroupPlayers = <DialogGroupPlayers
      ref='dialogGroupPlayers'
      groupPlayers={this.props.groupData.players}
      groupName={this.props.groupData.name}
      groupIndex={this.props.groupIndex}
      stageIndex={this.props.stageIndex}
    />;
    return (
      <div
        className='group'
        id={'G' + this.props.groupIndex + 'S' + this.props.stageIndex}>
        <Card>
          <CardTitle
            title={<div>
              {_iconMenu}
              <span>{this.props.groupData.name}</span>
            </div>}
            subtitle={this.props.groupData.status} />
          <div className='groupContent' style={{overflow: 'auto'}}>
            {this._generateMatches()}
          </div>
        </Card>
        {this._dialogEditInfo}
        {this._dialogGroupPlayers}
      </div>
    );
  }

  _generateMatches(){
    var matches = this.props.groupData.matches.map((match, index)=>{
      var position = this._styles.matches[index];
      var player1 = PlayersService.reqPlayerBySn(match.players[0].sn);
      var player2 = PlayersService.reqPlayerBySn(match.players[1].sn);
      if (match.players[0].sn !== -1 && !player1){
        match.players[0].sn = -1;//TODO not complete
      }
      if (match.players[1].sn !== -1 && !player2){
        match.players[1].sn = -1;//TODO not complete
      }
      //Group with ids like MxxGxxSxx for anchor use
      return <RaisedButton
        style={{
          fontSize: '0.7rem',
          width: '9rem',
          height: '3rem',
          margin: '1rem',
          textTransform: 'none',
          position: 'absolute',
          left: position[1] + 'rem',
          top: position[0] + 'rem'
        }}
        onTouchTap={this._onMatch.bind(this, index)}
        key={'em' + index}>
        <div className='buttonMatch'>
          <span className='buttonMatchPlayer'>{player1 ? player1.name : ''}</span>
          <span className='buttonMatchPoints'>{match.players[0].points}</span>
        </div>
        <div className='buttonMatch'>
          <span className='buttonMatchPlayer'>{player2 ? player2.name : ''}</span>
          <span className='buttonMatchPoints'>{match.players[1].points}</span>
        </div>
      </RaisedButton>;
    });
    return <div style={{
      position: 'relative',
      width: this._styles.container[0],
      height: this._styles.container[1]}}>
      {matches}
    </div>;
  }

  _onMatch(index){
    console.log('on turn match page');
    AppActions.nextPage('match');
    setTimeout(AppActions.loadPage.bind(
      undefined,
      {
        page: 'match',
        editMode: this.props.editMode,
        match: this.props.groupData.matches[index],
        matchIndex: index,
        groupIndex: this.props.groupIndex,
        stageIndex: this.props.stageIndex,
        //Below for refs use
        groupPlayers: this.props.groupData.players,
        groupMatches: this.props.groupData.matches
      }
    ));
    AppActions.showSpinner();
  }
}
