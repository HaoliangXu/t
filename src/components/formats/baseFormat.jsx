import React from 'react';
import FlatButton from "material-ui/lib/flat-button.js";
import EditTActions from "../../actions/editTActions.js";
import {Card, CardTitle, CardText, CardHeader} from "material-ui/lib/card/index.js";
import MenuItem from 'material-ui/lib/menus/menu-item.js';
import IconButton from "material-ui/lib/icon-button.js";

/*
 * Title: BaseFormat
 * Description: The base format to produce more real formats
 * @params this._iconButtonElement The icon button
 * @params this._basicIconMenu The basic menu items to be added to format menu
 */

export default class BaseFormat extends React.Component{
  constructor( props ){
    super( props );
    this._iconButtonElement = <IconButton iconClassName="muidocs-icon-custom-github" tooltip="Config"/>
    //Show only on edit mode
    this._basicIconMenu = [
      <MenuItem
        onTouchTap={this._onMoveUp.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText="Move up" />,
      <MenuItem
        onTouchTap={this._onMoveDown.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText="Move down" />,
      <MenuItem
        onTouchTap={this._onCopyGroup.bind( this, this.props.groupData, this.props.groupIndex, this.props.stageIndex )}
        primaryText="Copy" />,
      <MenuItem
        onTouchTap={this._onRemoveGroup.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText="Remove" />
    ];
  }

  _onMoveUp( groupIndex, stageIndex ){
    EditTActions.moveGroupUp( groupIndex, stageIndex );
  }

  _onMoveDown( groupIndex, stageIndex ){
    EditTActions.moveGroupDown( groupIndex, stageIndex );
  }
  
  _onCopyGroup( groupData, groupIndex, stageIndex ){
    EditTActions.copyGroup( groupData, groupIndex, stageIndex );
  }

  _onRemoveGroup( groupIndex, stageIndex ){
    EditTActions.removeGroup( groupIndex, stageIndex );
  }
}
