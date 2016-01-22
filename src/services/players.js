import AppConstants from '../constants/authConstants';
import AppActions from '../actions/authActions';
import Comm from './communicate.js';

var _players = [];
var lastSn = 0;

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
        sn: lastSn++,
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
      name: 'Player ' + (lastSn + 1),
      type: '',
      pid: null,
      sn: lastSn++,
      notes: ''
    };
    _players.splice(index, 0, player);
      console.log(index, _players);
  }

  deletePlayer(sn){
    if (_players.length === 2) {
      return;
    }
    var index = _players.findIndex((item)=>{
      if (item.sn === sn){
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

  reqPlayerBySn(sn){
    return _players.find((item)=>{
      return item.sn == sn;//TODO Don't know why '===' doesn't work properly.
    });
  }

  updatePlayer(sn, player){
    _players[sn].name = player.name;
    _players[sn].notes = player.notes;
  }

  //Save players data to this service.
  savePlayers(){

  }

  reqPlayerList(){
    return _players;
  }
}

export default new PlayersService();
