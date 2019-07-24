import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/App';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
    palette: {
      primary: indigo,
      secondary: blue // Indigo is probably a good match with pink
    }
  });
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
<Provider store={store}>
    <App />
</Provider>
</MuiThemeProvider>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
