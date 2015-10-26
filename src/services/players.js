import AppConstants from '../constants/authConstants';
import AppActions from '../actions/authActions';
import Comm from './communicate.js';

var _players = [];

class PlayersService {
  //Add random players with names like 'Player N'
  addInitialPlayers(players, NumOfPlayers){
    _players = players;
    for (var i = 0; i < NumOfPlayers; i++) {
      _players[i] = {
        name: 'Player ' + (i + 1),
        pid: null,
        tid: i,
        notes: []
      };
    }
  }

  clearPlayers(){
    _players = [];
  }

  addPlayer(){

  }


  requestPlayer(tid){
    return _players[tid];
  }



  //Save players data to this service.
  savePlayers(){

  }

  reqPlayerListJson(){

  }
}

export default new PlayersService();
