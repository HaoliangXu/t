import AppConstants from '../constants/authConstants';
import AppActions from '../actions/authActions';
import Comm from './communicate.js';

var _players = [];
var lastTid = 0;

class PlayersService {
  //Link _players to Tjson.players
  //Any changes to _players affects to Tjson.players
  linkPlayers(players){
    _players = players
  }

  appendRandomPlayers(players, NumOfPlayers){
    NumOfPlayers += players.length;
    for (var i = players.length; i < NumOfPlayers; i++) {
      players[i] = {
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

  reqPlayerByTid(tid){
    return _players.find((item)=>{
      return item.tid == tid;//TODO Don't know why '===' doesn't work properly.
    });
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
