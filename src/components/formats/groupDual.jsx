import React from 'react';

import {Card, CardTitle, CardText, CardHeader} from "material-ui/lib/card/index.js";
import {Table, TableHeader, TableHeaderColumn, TableFooter, TableBody, TableRow, th} from "material-ui/lib/table/index.js";
import IconMenu from 'material-ui/lib/menus/icon-menu.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';
import IconButton from "material-ui/lib/icon-button.js";

import EditTActions from "../../actions/editTActions.js";


export default class GroupDual extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      groupIndex: props.groupIndex,
      stageIndex: props.stageIndex,
      groupData: props.groupData.name ? props.groupData : this._newGroupData()
    };
  }

  _newGroupData(){
    return {
      name: "Group " + (this.props.groupIndex + 1),
      format: "groupDual",
      when: "",
      location: "",
      links: {},
      scores: [
        {
          icon: "",
          tid: "",
          score: 0,
          points: 0,
          color: ""
        }
      ],
      matches: [
        {
          icon: "",
          note: "",
          players: [
            {
              tid: "",
              name: "",
              color: ""
            },
            {
              tid: "",
              name: "",
              color: ""
            }
          ]
        }
      ]
    };
  }

  render() {
    var iconButtonElement = <IconButton iconClassName="muidocs-icon-custom-github" tooltip="Config"/>
    //Show only on edit mode
    var iconMenu = this.props.editMode ?
    <IconMenu style={{"float": "left"}} openDirection="bottom-right" iconButtonElement={iconButtonElement}>
      <MenuItem onTouchTap={this._onMoveUp} primaryText="Move up" />
      <MenuItem onTouchTap={this._onMoveDown} primaryText="Move down" />
      <MenuItem onTouchTap={this._onCopyGroup} primaryText="Copy" />
      <MenuItem onTouchTap={this._onRenameGroup} primaryText="Rename" />
      <MenuItem
        onTouchTap={this._onRemoveGroup.bind( this, this.props.groupIndex, this.props.stageIndex )}
        primaryText="Remove" />
    </IconMenu> : null;
    return (
      <div className="groupDual group">
        <Card>
          <CardTitle subtitle={this.state.groupData.when}
            title={<div>
              <span>{this.state.groupData.name}</span>
              {iconMenu}
            </div>} />
            <table className="groupTable">
              <tr>
                <th colSpan={"4"}>Score</th>
              </tr>
              <tr>
                <td className="colNumber">1.</td>
                <td className="playerName">qwer</td>
                <td>3-0</td>
                <td>0-3</td>
              </tr>
              <tr>
                <td className="colNumber">2.</td>
                <td className="playerName">wafe</td>
                <td className="playerNumber">323-202</td>
                <td className="playerNumber">23-233</td>
              </tr>
              <tr>
                <td className="colNumber">3.</td>
                <td className="playerName">rtsxf</td>
                <td>3-0</td>
                <td>0-3</td>
              </tr>
              <tr>
                <td className="colNumber">4.</td>
                <td className="playerName">erwte</td>
                <td>3-0</td>
                <td>0-3</td>
              </tr>
            </table>
            <table>
              <tr>
                <th colSpan="4">Matches</th>
              </tr>
              <tr>
                <td className="colName">asdfasdf</td>
                <td className="colPoints">3</td>
                <td className="colPoints">3</td>
                <td className="colName">qwerqwer</td>
              </tr>
              <tr>
                <td className="colName">asdfasdf</td>
                <td className="colPoints">3</td>
                <td className="colPoints">0</td>
                <td className="colName">qwerqwer</td>
              </tr>
              <tr>
                <td className="colName">asdfasdf</td>
                <td className="colPoints">0</td>
                <td className="colPoints">0</td>
                <td className="colName">qwerqwer</td>
              </tr>
              <tr>
                <td className="colName">asdfasdf</td>
                <td className="colPoints">0</td>
                <td className="colPoints">3</td>
                <td className="colName">qwerqwer</td>
              </tr>
              <tr onTouchTap={this._onChangeMatchRow.bind(this, 5)}>
                <td className="colName">asdfasdf</td>
                <td className="colPoints">3</td>
                <td className="colPoints">0</td>
                <td className="colName">qwerqwer</td>
              </tr>
          </table>
        </Card>
      </div>
    );
  }

  _onMoveUp(){

  }

  _onMoveDown(){

  }
  _onCopyGroup(){

  }
  _onRemoveGroup( groupIndex, stageIndex ){
    EditTActions.removeGroup( groupIndex, stageIndex );
  }

  _onRenameGroup(){
    console.log("change group name");

  }

  _onChangeMatchRow(){
    console.log("change match row");
  }

  _onChangePlayerRow(){
    console.log("change player row");
  }
}
