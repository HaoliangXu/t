import React from 'react';
import View from './view.jsx';

var appReact;
reqwest({
  url: './template.json',
  //type: 'html',
  success: function(resp) {
    appReact.setState({
      tData: resp
    });
  },
  error: function(err, msg) {
    console.log(msg);
  }
});

main();

function main() {
  appReact = React.render(<View />, document.getElementById('app'));
}
