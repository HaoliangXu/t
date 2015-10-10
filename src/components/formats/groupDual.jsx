import BaseFormat from './baseFormat.jsx';
import React from 'react';

import {Card, CardTitle, CardText, CardHeader} from 'material-ui/lib/card/index.js';
import {Table, TableHeader, TableHeaderColumn, TableFooter, TableBody, TableRow, th} from 'material-ui/lib/table/index.js';
import IconMenu from 'material-ui/lib/menus/icon-menu.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';
import IconButton from 'material-ui/lib/icon-button.js';

import EditTActions from '../../actions/editTActions.js';
import {newTBD} from '../../utils/appConfig.js';


export default class GroupDual extends BaseFormat{
  constructor( props ){
    super( props );
    this._iconMenu = this.props.editMode ? <IconMenu style={{'float': 'left'}} openDirection='bottom-right' iconButtonElement={this._iconButtonElement}>
      {this._basicIconMenu}
      <MenuItem
        onTouchTap={this._onRenameGroup} primaryText='Rename' />
    </IconMenu> : null;
    this.state = {
      groupIndex: props.groupIndex,
      stageIndex: props.stageIndex,
      groupData: props.groupData.name ? props.groupData : newTBD( this.props.groupIndex + 1 )
    };
  }

  render() {
    return (
      <div className='groupDual group'>
        <Card>
          <div className='groupTitle'>
            {this._iconMenu}
            <span>{this.state.groupData.name}</span>
          </div>
          <table className='groupTable'>
            <tbody>
              <tr>
                <th colSpan='4'>Score</th>
              </tr>
              <tr>
                <td className='colNumber'>1.</td>
                <td className='playerName'>qwer</td>
                <td>3-0</td>
                <td>0-3</td>
              </tr>
              <tr>
                <td className='colNumber'>2.</td>
                <td className='playerName'>wafe</td>
                <td className='playerNumber'>323-202</td>
                <td className='playerNumber'>23-233</td>
              </tr>
              <tr>
                <td className='colNumber'>3.</td>
                <td className='playerName'>rtsxf</td>
                <td>3-0</td>
                <td>0-3</td>
              </tr>
              <tr>
                <td className='colNumber'>4.</td>
                <td className='playerName'>erwte</td>
                <td>3-0</td>
                <td>0-3</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <th colSpan='4'>Matches</th>
              </tr>
              <tr>
                <td className='colName'>asdfasdf</td>
                <td className='colPoints'>3</td>
                <td className='colPoints'>3</td>
                <td className='colName'>qwerqwer</td>
              </tr>
              <tr>
                <td className='colName'>asdfasdf</td>
                <td className='colPoints'>3</td>
                <td className='colPoints'>0</td>
                <td className='colName'>qwerqwer</td>
              </tr>
              <tr>
                <td className='colName'>asdfasdf</td>
                <td className='colPoints'>0</td>
                <td className='colPoints'>0</td>
                <td className='colName'>qwerqwer</td>
              </tr>
              <tr>
                <td className='colName'>asdfasdf</td>
                <td className='colPoints'>0</td>
                <td className='colPoints'>3</td>
                <td className='colName'>qwerqwer</td>
              </tr>
              <tr onTouchTap={this._onChangeMatchRow.bind(this, 5)}>
                <td className='colName'>asdfasdf</td>
                <td className='colPoints'>3</td>
                <td className='colPoints'>0</td>
                <td className='colName'>qwerqwer</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    );
  }

  _onRenameGroup( groupIndex, stageIndex ){
    //EditTActions.removeGroup( groupIndex, stageIndex );
  }

  _onChangeMatchRow(){
    console.log('change match row');
  }

  _onChangePlayerRow(){
    console.log('change player row');
  }
}
