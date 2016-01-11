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

function _unparseT(res){
  return {
    id : res.id,
    name: res.get('name'),
    sport: res.get('sport'),
    city: res.get('city'),
    geoPoint: res.get('geoPoint'),
    startAt: res.get('startAt'),
    finished: res.get('finished'),
    bgPic: res.get('bgPic'),
    info: res.get('info'),
    creatorId: res.get('creator').id,
    players: res.get('players'),
    results: res.get('results')
  };
}

function _unparseUser(user){
  return {
    username: user.get('username'),
    email: user.get('email'),
    id: user.id,
    iconUrl: user.get('icon') ? user.get('icon').url() : null,
    authLevel: user.get('emailVerified') ? 2 : 1
  };
}

/*
function _parseT(Tjson){
  return {
    name: Tjson.name,
    sport: Tjson.sport,
    city: Tjson.city,
    geoPoint: Tjson.geoPoint ? Parse.GeoPoint(Tjson.geoPoint) : null,
    startAt: Tjson.startAt,
    finished: Tjson.finished,
    bgPic: Tjson. bgPic,
    info: Tjson.info,
    creator: Parse.User.current(),
    players: Tjson.players,
    results: Tjson.results
  }
}
*/

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
  reqT: function(tID){
    console.log('request T');
    let quary = new Parse.Query('Tournament');
    quary.get(tID).then(
      function(result){
        AppActions.loadPage({
          page: 'editT',
          editMode: false,
          modified: false,
          Tjson: _unparseT(result)
        });
      },
      function(error){
        console.log('Error: ' + error.code + ' ' + error.message);
      }
    );
  },
  ///////////////////////////////////////////////////////////////////
  // View T methods
  reqTList: function(params){
    console.log('requesting discover list');
    let query = new Parse.Query('Tournament');
    query.select('name', 'sport', 'startAt');
    //if no keywords, then send hot tournaments list as default
    if (params.default) {
      query.find({
        success: function(results){
          let content = {
            page: 'discover',
            params: params,
            lists: [{
              listName: 'hot',
              listItems: []
            }]
          };
          for (var i in results){
            content.lists[0].listItems[i] = {
              itemName: results[i].get('name'),
              id: results[i].id,
              pic: '',
              sport: results[i].get('sport'),
              location: '',
              startAt: results[i].get('startAt')
            };
          }
          AppActions.loadPage(content);
        },
        error: function(error){
          console.log('Error: ' + error.code + ' ' + error.message);
        }
      });
    }
  },
///////////////////////////////////////////////////////////////////
// User management methods

/*
  //Return current user, if none logged in, return null
  currentUser: function(){
    let user = Parse.User.current();
    if (user){
      user = _unparseUser(user);
    } else {
      user = {
        username: '',
        email: '',
        id: '',
        iconUrl: '',
        //0: read only, 1: logged in, 2: able to create T, 3: admin
        authLevel: 0
      };
    }
    return user;
  }
*/
  reqSignup: function(email, password){
    var user = new Parse.User();
    user.signUp({
      username: email,
      password: password,
      email, email
    }).then(function(){
      AuthActions.showLogin();
      AppActions.showNotice('A verification email has been sent to your address');
    }, function(error){
      console.log('Error: ' + error.code + ' ' + error.message);
    });
  },

  reqLogin: function(email, password){
    Parse.User.logIn(email, password).then(
      function(user){
        console.log('Login Success!');
        let res = _unparseUser(user);
        AuthActions.loginSuccess(res);
      },
      function(error){
        console.log('ERROR: ', error);
        AppActions.showNotice(error.message);
      }
    );
  },

  reqLogout: function(){
    Parse.User.logOut().then(function(){
      AuthActions.logoutSuccess();
    }, function(error){
      console.log('Error: ' + error.code + ' ' + error.message);
    });
  },

  ///////////////////////////////////////////////////////////////////
  // Edit T methods
  saveT: function(Tjson){//TODO Add user permission validation

    //If Tjson has a valid id, update the existing T to server
    if (Tjson.id){
      return;
    }

    let currentUser = Parse.User.current();
    if (!currentUser){
      //Error, anonymous is not authorized to create T
      AppActions.showNotice('Please log in to create a tournament');

      return;
    }

    //Tjson doesn't have a valid id, create a new one on server
    let Tournament = Parse.Object.extend('Tournament');
    let newT = new Tournament();

    //TODO Access control to be finished
    //newT.setACL(Parse.User.current());

    newT.save({
      name: Tjson.name,
      sport: Tjson.sport,
      city: Tjson.city,
      geoPoint: Tjson.geoPoint ? Parse.GeoPoint(Tjson.geoPoint) : null,
      startAt: Tjson.startAt,
      finished: Tjson.finished,
      bgPic: Tjson. bgPic,
      info: Tjson.info,
      creator: Parse.User.current(),
      players: Tjson.players,
      results: Tjson.results
    }).then(function(result){
      console.log('Save success');
      AppActions.hideSpinner();
      AppActions.loadPage({
        page: 'editT',
        Tjson: _unparseT(result),
        editMode: false,
        modified: false
      });
      AppActions.showNotice('T saved');
    },
    function(error){
      console.log('Error: ' + error.code + ' ' + error.message);
    });
  }
};

export default Comm;
