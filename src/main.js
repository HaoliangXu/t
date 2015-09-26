import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
//Needed for onTouchTap
//TODO Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

import Splash from "./components/splash.jsx";
import App from "./components/app.jsx";

main();

function main() {
  React.render(<Splash />, document.getElementById("splash"));
  React.render(<App />, document.getElementById('app'));
}
