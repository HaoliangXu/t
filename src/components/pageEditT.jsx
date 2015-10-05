import React from 'react';
import Mui from 'material-ui';
import RaisedButton from "material-ui/lib/raised-button.js"
import MainButtonGroup from './mainButtonGroup.jsx';
import PageEditTStore from "../stores/pageEditTStore.js";
//Import Group Creators
import TBD from "./formats/tbd.jsx";
import Elimination from "./formats/elimination.jsx";
import GroupDual from "./formats/groupDual.jsx";

import AppActions from "../actions/appActions.js";
import EditTActions from "../actions/editTActions.js";

var AppBar = Mui.AppBar;
var Paper = Mui.Paper;
var Card = Mui.Card;
var CardText = Mui.CardText;
var CardTitle = Mui.CardTitle;
var CardHeader = Mui.CardHeader;

export default class PageEditT extends React.Component{
  constructor( props ){
    super( props );
    this.state = {
      //TODO Determine whether ask to save before leaving
      modified: false,
      Tjson: {}
    };
    this._onChange = this._onChange.bind( this );
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
          style={{height: "10rem"}}
          zDepth={2}
          iconClassNameRight="muidocs-icon-navigation-expand-more" />
        {this._generateT( this.state.Tjson )}
        <RaisedButton onTouchTap={this._onAddNewStage.bind(this, stageLength)}
          secondary={true} style={{"width": "100%"}} label="Add A New Stage" />
        <MainButtonGroup page="editT" />
      </div>
    );
  }

  _generateT( Tjson ){
    //Check whether page is loaded, if not, skip generateT.
    if ( !Tjson.stages ) return;
    var output = Tjson.stages.map( function( stage, stageIndex ){
      var stageItem = stage.groups.map( function( group, groupIndex ){
        var groupItem;
        var props = {
          groupData: group,
          stageIndex: stageIndex,
          groupIndex: groupIndex,
          editMode: true,
          key: groupIndex + "." + stageIndex
        };
        switch ( group.format ) {
          //Group format to be decided, for user to select.
          case "tbd":
            groupItem = <TBD {...props} key={groupIndex + "." + stageIndex} />;//TODO Solve key warning
            break;
          case "elimination":
            groupItem = <Elimination {...props} />;
            break;
          case "groupDual":
            groupItem = <GroupDual {...props} />;
            break;
        }
        return groupItem;
      }.bind(this));
      return <div className="stage">
        <AppBar title={stage.name}
          iconClassNameRight="muidocs-icon-navigation-expand-more" />
        {stageItem}
        <RaisedButton
          onTouchTap={this._onAddNewGroup.bind( this, stage.groups.length, stageIndex )}
          style={{"width": "96%", "margin": "2% 2% 0 2%"}} label="Add A New Group" />
      </div>;
    }.bind(this));
    return output;
  }

  _onAddNewGroup( groupIndex, stageIndex ){
    var group = {
      "format": "tbd"
    };
    EditTActions.addGroup( group, groupIndex, stageIndex );
  }

  _onAddNewStage( stageIndex ){
    var stage = {
      "name": "",
      "groups": [
        {
          "format": "tbd"
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
    }
  }

}
