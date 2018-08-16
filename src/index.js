import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import Register from './componentes/Register';
import {Router,Route,browserHistory} from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {purple600, purple300} from 'material-ui/styles/colors';

//Used for mobile applications
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette:{
        primary1Color: purple600,
        accent1Color: purple300
    }
});

//Responsible to manage the socket notifications
let notificationsList = [];
const listeners = [];

const addNotifications = data => {
  notificationsList = notificationsList.concat(data);
};

const clearNotifications = () => {
  notificationsList = [];
};

const addListener = object => {
  listeners.push(object);
};

const NotificationManager = {};
NotificationManager.setListener = addListener;
NotificationManager.clearNotifications = () => {
  clearNotifications();
  listeners.forEach(item => item.setNotifications(notificationsList));
};
NotificationManager.addNotifications = ( notifications ) => {
  addNotifications(notifications);
  listeners.forEach(item => item.setNotifications(notificationsList));
};
//////

ReactDOM.render(
  (
      <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Router history={browserHistory}>
              <Route path="/" component={Login} NotificationManager={NotificationManager} />
              <Route path="/register" component={Register}/>
              <Route path="/home" component={App} NotificationManager={NotificationManager}/>
              <Route path="/logout" component={Logout}/>
            </Router>
          </div>
      </MuiThemeProvider>
  ),
  document.getElementById('root')
);
