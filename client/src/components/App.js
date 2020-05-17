import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';


class App extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="App">
        <Navbar />

        <div>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/"component={Landing} />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
