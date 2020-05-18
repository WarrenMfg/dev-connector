import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';


class Navbar extends React.Component {
  handleLogout(e) {
    e.preventDefault();

    this.props.logoutUser();
    window.location.href = '/';
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            onClick={this.handleLogout.bind(this)}
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.userName}
              title="You must have a Gravatar connected to display an image"
              style={{ width: '25px', marginRight: '5px' }}
            />
            {' '}Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    );


    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">devConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers</Link>
              </li>
            </ul>

            {isAuthenticated ? authLinks : guestLinks}

          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

// subscribe to store updates only with what this component needs
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// dispatch => bindActionCreators(mapDispatchToProps, dispatch)
const mapDispatchToProps = {
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);