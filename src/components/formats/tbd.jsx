import BaseFormat from './baseFormat.jsx';
import React from 'react';
import {Card, CardTitle, CardText, CardHeader} from 'material-ui/lib/card/index.js';
import FlatButton from 'material-ui/lib/flat-button.js';
import EditTActions from '../../actions/editTActions.js';
import {newTBD, newStage, newGroupDual} from '../../utils/appConfig.js';

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
            <FlatButton label='Elimination' onTouchTap={this._onSelectFormat.bind(this, 'elimination')} />
            <br />
            <FlatButton label='Double Elimination' onTouchTap={this._onSelectFormat.bind(this, 'doubleElimination')} />
            <br />
            <FlatButton label='Group Dual' onTouchTap={this._onSelectFormat.bind(this, 'groupDual')} />
            <br />
            <FlatButton label='Round Robin' onTouchTap={this._onSelectFormat.bind(this, 'roundRobin')} />
          </div>
        </Card>
      </div>
    );
  }

  _onSelectFormat(formatType, p){
    var format;
    switch (formatType) {
      case 'elimination':
        switch (number) {
          case 4:
            break;
          case 8:
            break;
          case 16:
            break;
          case 32:
            break;
          case 64:
            break;
        }
        break;
      case 'groupDual':
        format = newGroupDual(this.props.groupIndex);
        break;
    }
    EditTActions.setGroupFormat(format, this.props.groupIndex, this.props.stageIndex);
  }

}
