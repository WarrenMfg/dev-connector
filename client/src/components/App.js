import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './common/PrivateRoute';
import jwtDecode from 'jwt-decode';
import store from '../store';
import { setCurrentUser } from '../utils/utils';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import Dashboard from './dashboard/Dashboard';
import CreateProfile from './dashboard/CreateProfile';
import EditProfile from './dashboard/EditProfile';
import AddExperience from './dashboard/AddExperience';
import AddEducation from './dashboard/AddEducation';
import Profiles from './profiles/Profiles';
import Profile from './profiles/Profile';
import NotFound from '../components/404/NotFound';
import Connect from './posts/Connect';
import Post from './posts/Post';


// Check for token on refresh
if (localStorage.token) {
  const decoded = jwtDecode(localStorage.token.split(' ')[1]);
  store.dispatch(setCurrentUser(decoded));
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <div>
          <Switch>
            <Route exact path="/"component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:slug" component={Profile} />

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <PrivateRoute exact path="/connect" component={Connect} />
            <PrivateRoute exact path="/post/:id" component={Post} />

            <Route exact path="/not-found" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
