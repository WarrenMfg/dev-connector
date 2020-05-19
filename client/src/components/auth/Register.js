import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';


class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // if logged in and try to go to '/register' route
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your devConnector account</p>

              <form onSubmit={this.onSubmit} noValidate>
                <TextFieldGroup
                  name='userName'
                  placeholder='Username'
                  value={this.state.userName}
                  error={errors.userName}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  name='email'
                  placeholder='Email Address'
                  value={this.state.email}
                  error={errors.email}
                  type='email'
                  onChange={this.onChange}
                  info='This site uses Gravatar for profile images'
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

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
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
  registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));