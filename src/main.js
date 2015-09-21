import React from "react";
import Splash from "./components/splash.jsx";
import App from "./components/app.jsx";

main();

function main() {
  React.render(<App />, document.getElementById('app'));
  React.render(<Splash />, document.getElementById("splash"));
}
