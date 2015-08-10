import React from 'react';
import App from './component.jsx';

var appReact;
var originalData;
reqwest({
  url: './template.json',
  //type: 'html',
  success: function(resp) {
    originalData = JSON.stringify(resp);
    appReact.setState({
      showData: originalData
    });
    appReact.render();
  },
  error: function(err, msg) {
    console.log(msg);
  }
});

main();

function main() {
  appReact = React.render(<App showData={originalData}/>, document.getElementById('app'));
}
