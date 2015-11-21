import Flux from 'flux';
let AppDispatcher = new Flux.Dispatcher();

AppDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'view',
    action: action
  });
};

AppDispatcher.handleServerAction = function(action) {
  this.dispatch({
    source: 'server',
    action: action
  });
};

export default AppDispatcher;
