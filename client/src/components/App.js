import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import jwtDecode from 'jwt-decode';
import store from '../store';
import { setCurrentUser } from '../utils/utils';
import { clearCurrentProfile } from '../actions/profileActions';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';


// Check for token
if (localStorage.token) {
  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  // time currentTime is later than exp
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    //
    store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = '/login';
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/"component={Landing} />

        <div>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
