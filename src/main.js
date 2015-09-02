var initState = {
  "page": "discover",
  "params": {
    //'pageSource': 'template',
    "userID": 0,
    "keywords": "",
    "kinds": "",
    "location": "",
    "tier": ""
  },
};
import Model from "./model.jsx";

main();

function main() {
  let model = new Model(initState);
  model.start();
}
