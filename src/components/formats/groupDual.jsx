import BaseFormat from './baseFormat.jsx';
import React from 'react';

import {Card, CardTitle} from 'material-ui/lib/card/index.js';
import Dialog from 'material-ui/lib/dialog.js';
import DatePicker from 'material-ui/lib/date-picker/date-picker.js';
import TextField from 'material-ui/lib/text-field.js';
//import {Table, TableHeader, TableHeaderColumn, TableFooter, TableBody, TableRow, th} from 'material-ui/lib/table/index.js';
import IconMenu from 'material-ui/lib/menus/icon-menu.js';
import MenuItem from 'material-ui/lib/menus/menu-item.js';

import EditTActions from '../../actions/editTActions.js';


export default class GroupDual extends BaseFormat{
  constructor( props ){
    super( props );
    this._onEditInfo = this._onEditInfo.bind(this);
    this._onDialogCancel = this._onDialogCancel.bind(this);
    this._onDialogSubmit = this._onDialogSubmit.bind(this);
    this._iconMenu = this.props.editMode ? <IconMenu style={{'float': 'left'}} openDirection='bottom-right' iconButtonElement={this._iconButtonElement}>
      {this._basicIconMenu}
      <MenuItem
        onTouchTap={this._onEditInfo} primaryText='Edit Info' />
      <MenuItem
        onTouchTap={this._onRenameGroup} primaryText='Generate' />
    </IconMenu> : null;
    this.state = {
      groupIndex: props.groupIndex,
      stageIndex: props.stageIndex,
      groupData: props.groupData
    };
    //Actions for  dialog
    this.standardActions = [
      { text: 'Do it', onTouchTap: this._onDialogSubmit, ref: 'submit' },
      { text: 'Nay', onTouchTap: this._onDialogCancel}
    ];
  }

  render() {
    return (
      <div className='groupDual group'>
        <Card>
          <CardTitle
            title={<div>
              {this._iconMenu}
              <span>{this.state.groupData.name}</span>
            </div>}
            subtitle={this.state.groupData.status} />
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
        <Dialog
          title='Edit Group Info'
          actions={this.standardActions}
          actionFocus='submit'
          ref='editInfoDialog'>
          <form role='form'>
            <div className='form-group'>
              <TextField type='text' defaultValue={this.state.groupData.name} hintText='Group Name (Required)' ref='name' fullWidth={true} />
              <TextField type='text' defaultValue={this.state.groupData.status} hintText='Status' ref='status' fullWidth={true} />
              <TextField type='text' defaultValue={this.state.groupData.location} hintText='Location' ref='location' fullWidth={true} />              Start Time
              <DatePicker
                onChange={this._handleChange} defaultValue={this.state.groupData.when} ref='date' />
            </div>
          </form>
        </Dialog>
      </div>
    );
  }

  _onEditInfo(){
    this.refs.editInfoDialog.show();
  }

  _onDialogSubmit(){
    console.log('on dialog submit');
    var groupInfo = [
      this.refs.name.getValue(),
      this.refs.status.getValue(),
      this.refs.location.getValue(),
      this.refs.date.getDate()
    ];
    window.setTimeout(EditTActions.editGroupInfo.bind(
      this,
      groupInfo,
      this.state.groupIndex,
      this.state.stageIndex
    ));
    this.refs.editInfoDialog.dismiss();
  }

  _onDialogCancel(){
    console.log('on dialog cancel');
    this.refs.editInfoDialog.dismiss();
  }

  _onChangeMatchRow(){
    console.log('change match row');
  }

  _onChangePlayerRow(){
    console.log('change player row');
  }
}
