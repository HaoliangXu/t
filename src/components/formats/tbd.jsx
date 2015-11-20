import BaseFormat from './baseFormat.jsx';
import React from 'react';
import {Card, CardTitle, CardText, CardHeader} from 'material-ui/lib/card/index.js';
import Dialog from 'material-ui/lib/dialog.js';
import FlatButton from 'material-ui/lib/flat-button.js';
import EditTActions from '../../actions/editTActions.js';
import {
  newTBD,
  newStage,
  newRoundRobin,
  newElimination,
  newDoubleElimination
} from '../../utils/appConfig.js';

import IconMenu from 'material-ui/lib/menus/icon-menu.js';

//To save the current format type when on dialog.
var _currentFormatType;

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
            <FlatButton label='Elimination' onTouchTap={this._onSelectEliminationSize.bind(this, 'elimination')} />
            <br />
            <FlatButton
              label='Double Elimination'
              onTouchTap={this._onSelectDoubleEliminationSize.bind(this, 'doubleElimination')} />
            <br />
            <FlatButton label='Group Dual' onTouchTap={this._onSelectFormat.bind(this, 'groupDual', 4)} />
            <br />
            <FlatButton label='Round Robin' onTouchTap={this._onSelectFormat.bind(this, 'roundRobin', 2)} />
          </div>
        </Card>
        <Dialog
          title='Select Size'
          ref='dialogSizeOfElimination'>
          <FlatButton label='2' onTouchTap={this._onSelectFormat.bind(this, undefined, 2)} />
          <FlatButton label='4' onTouchTap={this._onSelectFormat.bind(this, undefined, 4)} />
          <FlatButton label='8' onTouchTap={this._onSelectFormat.bind(this, undefined, 8)} />
          <FlatButton label='16' onTouchTap={this._onSelectFormat.bind(this, undefined, 16)} />
          <FlatButton label='32' onTouchTap={this._onSelectFormat.bind(this, undefined, 32)} />
        </Dialog>
        <Dialog
          title='Select Size'
          ref='dialogSizeOfDoubleElimination'>
          <FlatButton label='4' onTouchTap={this._onSelectFormat.bind(this, undefined, 4)} />
          <FlatButton label='8' onTouchTap={this._onSelectFormat.bind(this, undefined, 8)} />
          <FlatButton label='16' onTouchTap={this._onSelectFormat.bind(this, undefined, 16)} />
        </Dialog>
      </div>
    );
  }

  _onSelectEliminationSize(formatType){
    _currentFormatType = formatType;
    this.refs.dialogSizeOfElimination.show();
  }

  _onSelectDoubleEliminationSize(formatType){
    _currentFormatType = formatType;
    this.refs.dialogSizeOfDoubleElimination.show();
  }

  _onSelectFormat(formatType, size){
    if (!formatType){
      formatType = _currentFormatType;
    }
    var format;
    switch (formatType){
      case 'elimination':
        format = newElimination(this.props.groupIndex, formatType, size);
        break;
      case 'roundRobin':
        format = newRoundRobin(this.props.groupIndex, 2, 1);
        break;
      case 'groupDual':
        format = newRoundRobin(this.props.groupIndex, 4, 4);
        break;
      case 'doubleElimination':
        format = newDoubleElimination(this.props.groupIndex, formatType, size);
        break;
    }
    EditTActions.setGroupFormat(format, this.props.groupIndex, this.props.stageIndex);
    _currentFormatType = undefined;
  }
}
