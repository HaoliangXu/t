//a fake lib to talk to the server
//TODO make it real
//reqT
//reqTList
//reqMatch
//saveT
//
import AppActions from '../actions/appActions.js';
import AuthActions from '../actions/authActions.js';
var ajax = reqwest;

//TODO Whenever to load a page, abort current request.
//     Active waiting mode (but by AppStore).
/*
var tokenPrototype = {
  reqObj: {},
  abort: function(){
  }.bind(this)
};
*/
var token = {};


var Comm = {

  //Decide which page to show, then request the data of that page.
  //Usually for applying new route
  //For params details look into route service
  reqPage: function(req){
    switch (req.page) {
      case 'viewT':
        this.reqT(req.params);
        break;
      case 'calendar':
        break;
      case 'likes':
        break;
      default:
        this.reqTList(req.params);
    }
  },

  //request splash data from local storage
  reqSplash: function(){
    return {
      'mode': 'non-intro',
      'content': 'Loading...'
    };
  },

  //request tournament json
  reqT: function(tID) {
    console.log('request T');
    let quary = new Parse.Query('Tournament');
    quary.get(tID, {
      success: function(result){
        AppActions.loadPage({
          page: 'viewT',
          editMode: false,
          T: result.get('tData')
        });
      },
      error: function(error){
        console.log(error);
      }
    });
  },

  reqTList: function(params){
    console.log('requesting discover list');
    let quary = new Parse.Query('Tournament');
    //if no keywords, then send hot tournaments list as default
    if (params.default) {
      quary.find({
        success: function(results){
          let content = {
            page: 'discover',
            params: params,
            lists: [{
              listName: 'Hot',
              listItems: []
            }]
          };
          for (var i in results){
            content.lists[0].listItems[i] = {
              itemName: results[i].get('tName'),
              id: results[i].id,
              pic: '',
              sport: results[i].get('tSport'),
              location: '',
              startAt: results[i].get('startAt')
            }
          }
          AppActions.loadPage(content);
        },
        error: function(error){
          console.log(error);
        }
      });
    }
  },

  reqLogin: function(username, password){
    Parse.User.logIn(username, password, {
      success: function(user){
        console.log('Login Success!');
        //AuthActions.loginSuccess(user);
      },
      error: function(error){
        console.log(error);
      }
    });
    let res = {
      username: username,
      id: '238u9ho23r',
      iconUrl: '',
      authLevel: 1
    };
    setTimeout(function(){
      console.log(username + ' has logged in');
      AuthActions.loginSuccess(res);
    }, 200);
  },

  reqLogout: function(){

  },

  saveT: function(Tjson){//TODO Add user permission validation
    //If Tjson has a valid id, update the existing T to server
    if (Tjson.id){
      return;
    }

    //Tjson doesn't have a valid id, create a new one on server
    let Tournament = Parse.Object.extend('Tournament');
    let newT = new Tournament();
    newT.set('tData', Tjson);
    newT.set('tName', Tjson.name);
    newT.set('tData', Tjson);
    newT.save(null, {
      success: function(result){
        console.log(result);
        AppActions.hideSpinner();
        AppActions.loadPage({
          page: 'editT',
          Tjson: result.get('tData'),
          editMode: false,
          modified: false
        });
        AppActions.showNotice('T saved');
      },
      error: function(error){
        console.log(error);
      }
    });
  }
};

export default Comm;
