import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
//Needed for onTouchTap
//TODO Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

import Splash from './components/splash.jsx';
import MainMenu from './components/mainMenu.jsx';
import App from './components/app.jsx';
import Spinner from './components/spinner.jsx';

function main(){
  ReactDOM.render(<Splash />, document.getElementById('splash'));
  ReactDOM.render(<MainMenu />, document.getElementById('mainMenu'));
  ReactDOM.render(<App />, document.getElementById('app'));
  ReactDOM.render(<Spinner />, document.getElementById('spinner'));
}

main();
