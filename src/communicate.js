//a fake lib to talk to the server
//TODO make it real

export default class Communicate {

  constructor(){
    this.ajax = reqwest;
  }

  //request tournament json
  reqTData(tName, callback, errHandler) {

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

  reqTList(params, callback, errHandler) {
    //if no keywords, then send hot tournaments list
    if (!params.keywords) {
      let list = {
        "hot": [
          {
            name: "demo T",
            id: "1",
            pic: "",
            kind: "",
            location: ""
          },
          {
            name: "demo T 2",
            id: "2",
            pic: "",
            kind: "",
            location: ""
          }
        ]
      };
      window.setTimeout(callback, 200, list);
    }
  }

  login(){//TODO just lonin as sheldon and give some fake data

  }

  logout(){

  }


}
