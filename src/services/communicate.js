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
    token = ajax({
      url: './demoT.json',//TODO diffs when not in dev mode
      //type: 'html',
      success: function(resp){
        AppActions.loadPage({
          page: 'viewT',
          editMode: false,
          T: resp
        });
      },
      error: function(){

      }
    });
  },

  reqTList: function(params){
    console.log('requesting discover list');
    //if no keywords, then send hot tournaments list as default
    if (params.default) {
      let content = {
        'page': 'discover',
        lists: [
          {
            listName: 'Hot',
            listItems: [
              {
                itemName: 'demo T',
                id: 'asdf1',
                pic: '',
                kind: '',
                location: ''
              },
              {
                itemName: 'demo T 2',
                id: 'qwer2',
                pic: '',
                kind: '',
                location: ''
              }
            ]
          }
        ]
      };
      window.setTimeout(function(){
        AppActions.loadPage(content);
      });
    }
  },

  reqLogin: function(username, password){//TODO give some fake data
    var res = {
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

  saveT: function(Tjson){
    if (!Tjson.name){
      setTimeout(function(){
        console.log('save failed');
      }, 500);
    }
    setTimeout(function(){
      var T = Tjson;
      console.log('saved');
      AppActions.hideSpinner();
      AppActions.loadPage({
        page: 'editT',
        Tjson: T,
        editMode: false,
        modified: false
      });
      AppActions.showNotice('T saved');
    }, 500);
  }
};

export default Comm;
