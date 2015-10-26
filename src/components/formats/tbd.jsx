import BaseFormat from './baseFormat.jsx';
import React from 'react';
import {Card, CardTitle, CardText, CardHeader} from 'material-ui/lib/card/index.js';
import FlatButton from 'material-ui/lib/flat-button.js';
import EditTActions from '../../actions/editTActions.js';

import IconMenu from 'material-ui/lib/menus/icon-menu.js';

export default class TBD extends BaseFormat{
  constructor(props){
    super(props);
    this._iconMenu = this.props.editMode ? <IconMenu style={{'float': 'left'}} openDirection='bottom-right' iconButtonElement={this._iconButtonElement}>
      {this._basicIconMenu}
    </IconMenu> : null;
  }

  render() {
    return (
      <div className='group tbd'>
        <Card>
          <CardTitle
            title={<div>
              {this._iconMenu}
              <span>Select Format</span>
            </div>}
            subtitle='Choose one below' />
          <div className='buttons'>
            <FlatButton label='Elimination' onTouchTap={this._onSelectFormat.bind( this, 'elimination')} />
            <br />
            <FlatButton label='Double Elimination' onTouchTap={this._onSelectFormat.bind( this, 'doubleElimination')} />
            <br />
            <FlatButton label='Group Dual' onTouchTap={this._onSelectFormat.bind( this, 'groupDual')} />
            <br />
            <FlatButton label='Round Robin' onTouchTap={this._onSelectFormat.bind( this, 'roundRobin')} />
          </div>
        </Card>
      </div>
    );
  }

  _onSelectFormat(format, p){
    //TODO second param, numer
    EditTActions.setGroupFormat(format, 4, this.props.groupIndex, this.props.stageIndex);
  }

}
