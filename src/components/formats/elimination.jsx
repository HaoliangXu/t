import React from 'react';
import BaseFormat from './baseFormat.jsx';
import {Card, CardTitle, CardText, CardHeader} from 'material-ui/lib/card/index.js';
import Dialog from 'material-ui/lib/dialog.js';
import FlatButton from 'material-ui/lib/flat-button.js';
import IconMenu from 'material-ui/lib/menus/icon-menu.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';

import DialogGroupPlayers from '../dialogGroupPlayers.jsx';
import eliminationStyles from '../../utils/eliminationStyles.js';


export default class Elimination extends BaseFormat{
  constructor(props){
    super(props);
    this._iconMenu = this.props.editMode ? <IconMenu style={{'float': 'left'}} openDirection='bottom-right' iconButtonElement={this._iconButtonElement}>
      {this._basicIconMenu}
      <MenuItem
        onTouchTap={this._onEditInfo} primaryText='Edit Info' />
      <MenuItem
        onTouchTap={this._onShowDialogPlayers} primaryText='Players' />
    </IconMenu> : null;
  }

  render() {
    return (
      <div className='group'>
        <Card>
          <CardTitle
            title={<div>
              {this._iconMenu}
              <span>{this.props.groupData.name}</span>
            </div>}
            subtitle={this.props.groupData.status} />
          <div>
            {this._generateMatches()}
          </div>
        </Card>
        <DialogGroupPlayers
          ref='dialogGroupPlayers'
          groupPlayers={this.props.groupData.players}
          groupName={this.props.groupData.name}
          groupIndex={this.props.groupIndex}
          stageIndex={this.props.stageIndex}
        />
        {this.dialogEditInfo}
      </div>
    );
  }

  _onShowDialogPlayers(){
    this.refs.dialogGroupPlayers.show();
  }

  _generateMatches(){
    var size = this.props.groupData.matches.length;
    return eliminationStyles[size].matches.map((position, index)=>{

      return <FlatButton
        style={{position: 'relative', left: position[0], top: position[1]}}
        key={'em' + index}>
        <div>asdf</div>
        <div>asdf</div>
      </FlatButton>;
    })
  }
}
