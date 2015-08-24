var initState = {
  'page': 't',
  'pageSource': 'template',
  'userID': 0
};
import Model from './model.js';

main();

function main() {
  let model = new Model(initState);
  model.start();
}
