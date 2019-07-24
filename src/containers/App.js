import React, { Component } from 'react';
import Header from './Header';
import List from './List';
import Filter from './Filter';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify-redux';
import 'react-toastify/dist/ReactToastify.css';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import Login from './Login';

class App extends Component {

  componentDidMount() {
    loadProgressBar({ parent: '#content' });
  }

  render() {
    const { auth } = this.props;
    
    if (!auth.isLoggedIn) {
      return (
        <Login />
      );
    }

    return (
      <div className="App">
        <Header />
        <div id="content">
          <Filter />
          <List />
          <ToastContainer autoClose={2000} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ auth: state.auth })

export default connect(mapStateToProps, null)(App)
