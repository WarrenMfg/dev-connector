import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.populateRecruiterLogin = this.populateRecruiterLogin.bind(this);
  }

  componentDidMount() {
    // if logged in and try to go to '/login' route
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps) {
    // when isAuthenticated changes from false to true, reroute to /dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  populateRecruiterLogin() {
    this.setState({ email: 'great@javascript.com', password: 'webdev' });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;


    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center">Login to your devConnector account</p>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name='email'
                  placeholder='Email Address'
                  value={this.state.email}
                  error={errors.email}
                  type='email'
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name='password'
                  placeholder='Password'
                  value={this.state.password}
                  error={errors.password}
                  type='password'
                  onChange={this.onChange}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>

              <div style={{ cursor: 'pointer' }} onClick={this.populateRecruiterLogin}>
                <p className="text-center" style={{ marginBottom: 0 }}>Recruiters, click here to browse with this account.</p>
                <p className="text-center" style={{ marginBottom: 0 }}>Email Address: great@javascript.com | Password: webdev</p>
                <p className="text-center">Note, this account does not fulfill server requests.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// subscribe to store updates only with what this component needs
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// dispatch => bindActionCreators(mapDispatchToProps, dispatch)
const mapDispatchToProps = {
  loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);