import AppConstants from '../constants/authConstants';
import AppActions from '../actions/authActions';
import Comm from './communicate.js';

var _players = [];
var lastTid = 0;

class PlayersService {
  //Add random players with names like 'Player N'
  addInitialPlayers(players, NumOfPlayers){
    _players = players;
    for (var i = 0; i < NumOfPlayers; i++) {
      _players[i] = {
        iconUrl: '',
        name: 'Player ' + (i + 1),
        type: '',
        pid: null,
        tid: lastTid++,
        notes: ''
      };
    }
  }

  clearPlayers(){
    _players = [];
  }

  addRandomPlayer(index){
    var player = {
      iconUrl: '',
      name: 'Player ' + (lastTid + 1),
      type: '',
      pid: null,
      tid: lastTid++,
      notes: ''
    };
    _players.splice(index, 0, player);
      console.log(index, _players);
  }

  deletePlayer(tid){
    if (_players.length === 2) {
      return;
    }
    var index = _players.findIndex((item)=>{
      if (item.tid === tid){
        return true;
      } else {
        return false;
      }
    });
    _players.splice(index, 1);
  }

  removePlayerByIndex(index){
    if (_players.length === 2) {
      return;
    }
    _players.splice(index, 1);
  }

  reqPlayerByIndex(index){
    return _players[index];
  }

  updatePlayer(tid, player){
    _players[tid].name = player.name;
    _players[tid].notes = player.notes;
  }

  //Save players data to this service.
  savePlayers(){

  }

  reqPlayerList(){
    return _players;
  }
}

export default new PlayersService();
