import React from 'react';
import EditTActions from '../../actions/editTActions.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';
import IconButton from 'material-ui/lib/icon-button.js';
import Menu from 'material-ui/lib/svg-icons/navigation/menu.js';

/*
 * Title: BaseFormat
 * Description: The base format to produce more real formats
 * @params this._iconButtonElement The icon button
 * @params this._basicIconMenu The basic menu items to be added to format menu
 */

export default class BaseFormat extends React.Component{
  constructor( props ){
    super( props );
    this._iconButtonElement = <IconButton><Menu /></IconButton>;
    //Show only on edit mode
    this._basicIconMenu = [
      <MenuItem
        onTouchTap={this._onMoveUp.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText='Move up' key='menuItem1' />,
      <MenuItem
        onTouchTap={this._onMoveDown.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText='Move down' key='menuItem2' />,
      <MenuItem
        onTouchTap={this._onCopyGroup.bind( this, this.props.groupData, this.props.groupIndex, this.props.stageIndex )}
        primaryText='Copy' key='menuItem3' />,
      <MenuItem
        onTouchTap={this._onRemoveGroup.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText='Remove' key='menuItem4' />
    ];
  }

  _onMoveUp(groupIndex, stageIndex){
    EditTActions.moveGroupUp(groupIndex, stageIndex);
  }

  _onMoveDown(groupIndex, stageIndex){
    EditTActions.moveGroupDown(groupIndex, stageIndex);
  }

  _onCopyGroup(groupData, groupIndex, stageIndex){
    //Deep copy groupData, to break the reference chain
    groupData = JSON.parse(JSON.stringify(groupData));
    EditTActions.copyGroup(groupData, groupIndex, stageIndex);
  }

  _onRemoveGroup(groupIndex, stageIndex){
    EditTActions.removeGroup(groupIndex, stageIndex);
  }
}
