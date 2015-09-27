/*
 * Title: Router class
 * Description: A fake route manager lib
 * It reponses route params, set route params, controls history, maintaince app states
 * TODO make it real
 */

//Load router lib, get address at the beginning of the app.
var currentRoute = "";

var Router = {
  //Parse the route, return the parsed data
  parseCurrentRoute: function(){
    return{
      "page": "discover",
      "params": {
        //'pageSource': 'template',
        "default": true,
        "userID": 0,
        "keywords": "",
        "kinds": "",
        "location": "",
        "tier": ""
      },
    };
  }
};

export default Router;
