import React from 'react';
import FlatButton from "material-ui/lib/flat-button.js";
import EditTActions from "../../actions/editTActions.js";
import {Card, CardTitle, CardText, CardHeader} from "material-ui/lib/card/index.js";
import IconMenu from 'material-ui/lib/menus/icon-menu.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';
import IconButton from "material-ui/lib/icon-button.js";

export default class TBD extends React.Component{
  constructor( props ){
    super(props);
  }

  _onTouchTap( format, p ){
    //TODO second param, numer
    EditTActions.setGroupFormat( format, 4, this.props.groupIndex, this.props.stageIndex );
  }

  render() {
    var iconButtonElement = <IconButton iconClassName="muidocs-icon-custom-github" tooltip="Config"/>
    //Show only on edit mode
    var iconMenu = this.props.editMode ?
    <IconMenu style={{"float": "left"}} openDirection="bottom-right" iconButtonElement={iconButtonElement}>
      <MenuItem
        onTouchTap={this._onMoveUp.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText="Move up" />
      <MenuItem
        onTouchTap={this._onMoveDown.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText="Move down" />
      <MenuItem
        onTouchTap={this._onCopyGroup.bind( this, this.props.groupData, this.props.groupIndex, this.props.stageIndex )}
        primaryText="Copy" />
      <MenuItem
        onTouchTap={this._onRenameGroup.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText="Rename" />
      <MenuItem
        onTouchTap={this._onRemoveGroup.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText="Remove" />
    </IconMenu> : null;
    return (
      <div className="group tbd">
        <Card>
          <CardTitle subtitle="Select anyone below"
            title={<div>
              <span>Choose Format</span>
              {iconMenu}
            </div>} />
          <div className="buttons">
            <FlatButton label="Elimination" onTouchTap={ this._onTouchTap.bind( this, "elimination" )}/>
            <br />
            <FlatButton label="Double Elimination" onTouchTap={ this._onTouchTap.bind( this, "doubleElimination" )}/>
            <br />
            <FlatButton label="Group Dual" onTouchTap={ this._onTouchTap.bind( this, "groupDual" )}/>
            <br />
            <FlatButton label="Round Robin" onTouchTap={ this._onTouchTap.bind( this, "roundRobin" ) }/>
          </div>
        </Card>
      </div>
    );
  }

  _onMoveUp( groupIndex, stageIndex ){
    console.log("move up group");
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

  _onRenameGroup( groupIndex, stageIndex ){
    //EditTActions.removeGroup( groupIndex, stageIndex );
  }

}
