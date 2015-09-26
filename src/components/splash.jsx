/*
 * Title: The splash screen
 * Description: Show once app starts, hide when data loaded, may contain ads, introductions in the future
 * @show
 * @
 * @render
 */
import React from 'react';
import SplashStore from "../stores/splashStore.js";
import Comm from "../services/communicate.js";

export default class Splash extends React.Component {

  constructor() {
    super();
    this._appReady = this._appReady.bind(this);
    this.state = SplashStore.getSplashState();
  }

  componentDidMount(){
    SplashStore.addChangeListener(this._appReady);
  }

  //Trigger once app data is loaded, if splash is in non-intro mode then end splash
  _appReady(){
    SplashStore.removeChangeListener(this._appReady);
    //If intro mode, do nothing
    if (this.state.mode !== "non-intro") return;
    this._endSplash();
  }

  //Turn to next page
  _nextPage(){
  }

  //Turn to last page
  _lastPage(){

  }
  //Invoke end splash event, when Enter button is clicked, or when app data is loaded in non-intro mode
  _endSplash(){
    var divSplash = document.getElementById("splash");
    SplashStore.unregisterDispatcher();
    React.unmountComponentAtNode(divSplash);
    divSplash.parentNode.removeChild(divSplash);
  }

  render(){
    return <div>
      <h1>{this.state.content}</h1>
    </div>;
  }
}
