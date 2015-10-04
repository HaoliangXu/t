//import when from 'when';
import AppConstants from '../constants/authConstants';
import AppActions from '../actions/authActions';
import Comm from "./communicate.js";

var _players = [];

class PlayersService {

  //If login intensely without other actions to do, then send a empty req, not undefined.
  addPlayer(){

  }


  requestPlayer( tid ){
    return _players[tid];
  }



  //Save players data to this service.
  savePlayers(){

  }

  reqPlayerListJson(){

  }
}

export default new PlayersService()
