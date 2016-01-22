/*
 * Title: Router class
 * Description: A route manager lib
 * It reponses route params, set route params, controls history, maintaince app states
 * TODO make it real
 */
import AppActions from '../actions/appActions.js';
//Record history of page the user open, for opening to last page by click 'back' button.
var _historyChain = [];

class Router{
  //Parse the route, return the parsed data
  parseCurrentUrl(){
    return{
      'page': 'discover',
      'params': {
        'default': true,//Whether No params
        'keywords': '',
        'sport': '',
        'location': '',
        'tier': ''
      },
    };
  }

  nextPage(pageName){
    _historyChain.unshift({
      page: pageName,
      content: {}
    });
  }

  lastPage(){
    if (_historyChain.length > 1){
      _historyChain.shift();
    }
    setTimeout(AppActions.loadPage.bind(undefined, _historyChain[0].content));
    return _historyChain[0];
  }

  //Clear all history then create a history as first record
  switchPage(pageName){
    _historyChain = [{
      page: pageName,
      content: {}
    }];
  }

  loadPage(content, index = 0){
    if (_historyChain[index].page === content.page){
      _historyChain[index].content = content;
    }
  }
}

export default new Router;
