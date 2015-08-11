import React from 'react';
import App from './component.jsx';

var appReact;
reqwest({
  url: './template.json',
  //type: 'html',
  success: function(resp) {
    appReact.setState({
      tData: resp
    });
    appReact.render();
  },
  error: function(err, msg) {
    console.log(msg);
  }
});

main();

function main() {
  appReact = React.render(<App />, document.getElementById('app'));
}
