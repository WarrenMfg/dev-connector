import React from 'react';
import { Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import store from '../store';
import { setCurrentUser } from '../utils/utils';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';


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

    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/"component={Landing} />

        <div>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
