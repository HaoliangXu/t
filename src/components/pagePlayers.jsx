import React from 'react';
import AppBar from 'material-ui/lib/app-bar.js';
import Menu from 'material-ui/lib/svg-icons/navigation/menu.js';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close.js';
import IconMenu from 'material-ui/lib/menus/icon-menu.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';
import IconButton from 'material-ui/lib/icon-button.js';
import {Table, TableHeader, TableRowColumn, TableHeaderColumn, TableBody, TableRow} from 'material-ui/lib/table/index.js';

import PlayersService from '../services/players.js';
import AppActions from '../actions/appActions.js';
import MainButtonGroup from './mainButtonGroup.jsx';
import Spinner from './spinner.jsx';

export default class PagePlayers extends React.Component{

  constructor( props ){
    super( props );
  }


  render(){
    return <div>
      <AppBar
        title='Players'
        zDepth={2}
        style={{'backgroundColor': '#ff4081', 'height': '10rem'}}
        iconElementRight={<IconButton><NavigationClose /></IconButton>}
        iconElementLeft={
          <IconMenu iconButtonElement={
            <IconButton><Menu /></IconButton>
            }
            openDirection="bottom-right">
            <MenuItem primaryText="Players" />
            <MenuItem onTouchTap={this._onTInfo} primaryText="Info" />
          </IconMenu>
        } />
      <Table
        fixedHeader={true}
        selectable={true}
        multiSelectable={true}>
        <TableHeader enableSelectAll={true}>
          <TableRow>
            <TableHeaderColumn tooltip='The ID'>No.</TableHeaderColumn>
            <TableHeaderColumn tooltip='The Name'>Name</TableHeaderColumn>
            <TableHeaderColumn tooltip='The Status'>Notes</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={true}
          showRowHover={true}>
          {this._generateTable()}
        </TableBody>
      </Table>
      <MainButtonGroup page='players' />
      <Spinner />
    </div>;
  }

  _generateTable(){
    var list = PlayersService.reqPlayerList();
    console.log(list);
    return list.map(function(row, index){
      return <TableRow key={'row' + index}>
        <TableRowColumn>{index + 1}</TableRowColumn>
        <TableRowColumn>{row.name}</TableRowColumn>
        <TableRowColumn>{row.notes}</TableRowColumn>
      </TableRow>;
    });
  }
}
