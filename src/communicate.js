//a fake lib to talk to the server
//TODO make it real

export default class Communicate {

  constructor(){
    this.ajax = reqwest;
  }

  //request tournament json
  reqT(tName, callback, errHandler){

    this.ajax({
      url: './' + tName + '.json',//TODO diffs when not in dev mode
      //type: 'html',
      success: callback,/*function(resp) {
        appReact.setState({
          tData: resp
        });
      },*/
      error: errHandler
    });
  }

  login(){//TODO just lonin as sheldon and give some fake data

  }

  logout(){

  }


}
