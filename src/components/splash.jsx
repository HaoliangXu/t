/*
 * Title: The splash screen
 * Description: Show once app starts, hide when data loaded, may contain ads, introductions in the future
 * @show
 * @
 * @render
 */
import React from 'react';
import ReactDOM from 'react-dom';
import SplashStore from '../stores/splashStore.js';

export default class Splash extends React.Component{

  constructor(){
    super();
    this._timesUp = false;
    this._appReady = false;
    this._onAppReady = this._onAppReady.bind(this);
    this.state = SplashStore.getSplashState();
  }

  componentDidMount(){
    setTimeout(this._endTiming.bind(this), 3000);
    SplashStore.addChangeListener(this._onAppReady);
  }

  //Trigger once app data is loaded, if splash is in non-intro mode then end splash
  _onAppReady(){
    SplashStore.removeChangeListener(this._onAppReady);
    this._appReady = true;
    //If intro mode, do nothing
    if (this.state.mode !== 'non-intro') return;
    this._endSplash();
  }

  //Turn to next page
  _nextPage(){
  }

  //Turn to last page
  _lastPage(){

  }

  _endTiming(){
    this._timesUp = true;
    this._endSplash();
  }

  //Invoke end splash event, when Enter button is clicked, or when app data is loaded in non-intro mode
  _endSplash(){
    if (!this._timesUp || !this._appReady){
      return;
    }
    var divSplash = document.getElementById('splash');
    SplashStore.unregisterDispatcher();
    ReactDOM.unmountComponentAtNode(divSplash);
    divSplash.parentNode.removeChild(divSplash);
  }

  render(){
    return <div id="splashContent">
      <h1>{this.state.content}</h1>
      <h2>Track your tournaments here</h2>
    </div>;
  }
}
